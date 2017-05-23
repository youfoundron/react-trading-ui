import types from '../constants/actionTypes'
import initialState from '../store/initialState'
import { selectBook } from '../constants/selectors'
import * as messages from '../utils/messages'

const defaultState = selectBook(initialState)

/* Book Balancing Logic:
 * https://docs.gdax.com/#real-time-order-book
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case types.BOOK_SUCCESS :
      return messages.applyQueuedMessages(state, action.payload)

    case types.SOCKET_MESSAGE :
      return state.get('hasReceivedSnapshot')
        ? messages.applyMessage(state, action.payload)
        : messages.queueMessage(state, action.payload)

    default:
      return state
  }
}
