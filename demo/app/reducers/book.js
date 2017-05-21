import types from '../constants/actionTypes'
import initialState from '../store/initialState'
import { selectBook } from '../constants/selectors'

const defaultState = selectBook(initialState)

const seedBook = payload => prevBook => payload.reduce(
  (newBook, [price, size, numOrders]) =>
    newBook.set(price, {price, size, numOrders})
    , prevBook
)

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.BOOK_SUCCESS :
      return state
        .update('asks', seedBook(action.payload.asks))
        .update('bids', seedBook(action.payload.bids))
        .set('snapshot', action.payload.snapshot)

    // case types.SOCKET_MESSAGE :
    //   return state.get('snapshot')
    //     ? state
    //     : state.update('queuedMessages', queue => queue.push(action.payload))

    default:
      return state
  }
}
