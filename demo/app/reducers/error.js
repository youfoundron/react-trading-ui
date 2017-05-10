import types from '../constants/actionTypes'
import initialState from '../store/initialState'
import { selectError } from '../constants/selectors'

const defaultState = selectError(initialState)

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.BOOK_FAILURE :
      return action.payload

    case types.TRADES_FAILURE :
      return action.payload

    case types.SOCKET_ERROR :
      return action.payload

    default:
      return state
  }
}
