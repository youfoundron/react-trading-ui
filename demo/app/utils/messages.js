/* eslint-disable eqeqeq, camelcase */
const getBookKey = side => side === 'buy' ? 'bids' : 'asks'
const orderIsEmpty = ({size}) => size == 0
const isMarketOrder = ({price}) => price === null

const keyPathFactory = ({side, price}) => (
  [getBookKey(side), price]
)

const notSetValueFactory = ({price}) => ({
  price,
  size: '0.00'
})

const updaterFactory = sizeChange => order => {
  order.size = String(Number(order.size) + Number(sizeChange))
  return order
}

const seedBook = payload => prevBook => payload.reduce(
  (newBook, [price, size]) =>
    newBook.set(price, {price, size})
  , prevBook
)

// https://docs.gdax.com/#open
const applyOpenMessage = (state, order) => {
  const keyPath = keyPathFactory(order)
  const notSetValue = notSetValueFactory(order)
  const updater = updaterFactory(order.remaining_size)
  return state.updateIn(keyPath, notSetValue, updater)
}

// https://docs.gdax.com/#done
const applyDoneMessage = (state, order) => {
  // if (isMarketOrder(order)) return state
  // const keyPath = keyPathFactory(order)
  // const notSetValue = notSetValueFactory(order)
  // const updater = updaterFactory(order.remaining_size) // remaining_size
  return state
}

// https://docs.gdax.com/#match
const applyMatchMessage = (state, order) => {
  const keyPath = keyPathFactory(order)
  const notSetValue = notSetValueFactory(order)
  const updater = updaterFactory(-order.size)
  const updatedOrder = updater(state.getIn(keyPath, notSetValue))
  return orderIsEmpty(updatedOrder)
    ? state.deleteIn(keyPath)
    : state.setIn(keyPath, updatedOrder)
}

// https://docs.gdax.com/#change
const applyChangeMessage = (state, order) => {
  if (isMarketOrder(order)) return state
  const keyPath = keyPathFactory(order)
  const notSetValue = notSetValueFactory(order)
  const updater = updaterFactory(order.new_funds - order.old_funds)
  return state.updateIn(keyPath, notSetValue, updater)
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
