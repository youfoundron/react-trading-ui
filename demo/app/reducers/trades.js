import types from '../constants/actionTypes'
import initialState from '../store/initialState'
import { selectTrades } from '../constants/selectors'

const defaultState = selectTrades(initialState)

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.TRADES_SUCCESS :
      return action.payload

    // case types.SOCKET_MESSAGE :
    //   return action.payload

    default:
      return state
  }
}
