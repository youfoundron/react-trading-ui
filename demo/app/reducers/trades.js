import { pick } from 'ramda'
import { List } from 'immutable'

import types from '../constants/actionTypes'
import initialState from '../store/initialState'
import { selectTrades } from '../constants/selectors'

const defaultState = selectTrades(initialState)
const sanitizeMessage = pick([
  'time',
  'price',
  'size',
  'side'
])

export default (state = defaultState, action) => {
  switch (action.type) {
    // case types.TRADES_SUCCESS :
    //   return List(action.payload)
    //
    // case types.SOCKET_MESSAGE :
    //   return action.payload.type === 'match'
    //     ? state.unshift(sanitizeMessage(action.payload))
    //     : state

    default:
      return state
  }
}
