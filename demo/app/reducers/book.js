import types from '../constants/actionTypes'
import initialState from '../store/initialState'
import { selectBook } from '../constants/selectors'

const defaultState = selectBook(initialState)

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.BOOK_SUCCESS :
      return state
        .set('asks', action.payload.asks)
        .set('bids', action.payload.bids)

    // case types.SOCKET_MESSAGE :
    //   return action.payload

    default:
      return state
  }
}
