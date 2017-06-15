/* eslint-disable eqeqeq, camelcase */
import { Map } from 'immutable-sorted'

const getSnapshotOrderPrice = order => order[0]
const getSnapshotOrderSize = order => order[1]
const getSnapshotOrderId = order => order[2]

const getEntriesKey = side => side === 'buy' ? 'bids' : 'asks'
const isMarketOrder = message => message.price == null
const isEmptyEntry = entry => (
  !(entry
    .get('orderSizesById')
    .reduce((totalSize, orderSize) => totalSize + Number(orderSize), 0)
  )
)

const keyPathFactory = ({side, price, order_id, maker_order_id}) => (
  [getEntriesKey(side), price, 'orderSizesById', order_id || maker_order_id]
)

const bookEntryFactory = order => Map({
  price: getSnapshotOrderPrice(order)
})

const bookEntryUpdaterFactory = order => entry => (
  entry
    .set('price', getSnapshotOrderPrice(order))
    .setIn(
      ['orderSizesById', getSnapshotOrderId(order)],
      getSnapshotOrderSize(order)
    )
)

const notSetValueFactory = message => Map({
  price: message.price,
  orderSizesById: Map()
})

const updaterFactory = (message, sizeChange) => entry => (
  entry
    .set('price', message.price)
    .updateIn(
      ['orderSizesById', message.order_id || message.maker_order_id],
      size => String(Number(size) + Number(sizeChange))
    )
)

const seedBook = payload => prevBook => payload.reduce(
  (newBook, snapshotOrder) => {
    const key = getSnapshotOrderPrice(snapshotOrder)
    const notSetValue = bookEntryFactory(snapshotOrder)
    const updater = bookEntryUpdaterFactory(snapshotOrder)
    return newBook.update(key, notSetValue, updater)
  }, prevBook
)

// https://docs.gdax.com/#open
const applyOpenMessage = (state, message) => {
  const keyPath = keyPathFactory(message)
  const notSetValue = notSetValueFactory(message)
  return state.setIn(keyPath, notSetValue, message.remaining_size)
}

// https://docs.gdax.com/#done
const applyDoneMessage = (state, message) => {
  if (isMarketOrder(message)) return state
  const keyPath = keyPathFactory(message)
  const notSetValue = notSetValueFactory(message)
  const resultState = message.remaining_size == 0
    ? state.deleteIn(keyPath)
    : state.setIn(keyPath, notSetValue, message.remaining_size)
  const resultEntry = resultState.get(message.price) || notSetValue
  return isEmptyEntry(resultEntry)
    ? state.delete(message.price)
    : resultState
}

// https://docs.gdax.com/#match
const applyMatchMessage = (state, message) => {
  const key = message.price
  const keyPath = keyPathFactory(message)
  const notSetValue = notSetValueFactory(message)
  const updater = updaterFactory(message, -message.size)
  const resultState = message.size == state.getIn(keyPath)
    ? state.deleteIn(keyPath)
    : state.update(key, Map(), updater)
  const resultEntry = resultState.get(message.price) || notSetValue
  return isEmptyEntry(resultEntry)
    ? state.delete(message.price)
    : resultState
}

// https://docs.gdax.com/#change
const applyChangeMessage = (state, message) => {
  if (isMarketOrder(message)) return state
  const key = message.price
  // const notSetValue = notSetValueFactory(message)
  const updater = updaterFactory(message, message.new_size - message.old_size)
  return state.update(key, updater)
}

export const applyMessage = (state, message) => {
  switch (message.type) {
    case 'open' : return applyOpenMessage(state, message)
    case 'done' : return applyDoneMessage(state, message)
    case 'match' : return applyMatchMessage(state, message)
    case 'change' : return applyChangeMessage(state, message)
    default : return state
  }
}

export const applyQueuedMessages = (state, {asks, bids, sequence}) => {
  const messages = state
    .get('queuedMessages')
    .filter(m => m.sequence > sequence)

  const book = state
    .update('asks', seedBook(asks))
    .update('bids', seedBook(bids))

  return messages
    .reduce(applyMessage, book)
    .set('hasReceivedSnapshot', true)
    .update('queuedMessages', queue => queue.clear())
}

export const queueMessage = (state, message) => (
  state.update(
    'queuedMessages',
    queue => queue.unshift(message)
  )
)
