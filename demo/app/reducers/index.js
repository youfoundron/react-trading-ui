import types from '../constants/actionTypes'
import initialState from '../store/initialState'

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case (types.BOOK_SUCCESS):
      return state
        .set('asks', action.payload.asks)
        .set('bids', action.payload.bids)
    case (types.BOOK_FAILURE):
      return state.set('error', action.payload)

    case (types.TRADES_SUCCESS):
      return state.set('trades', action.payload)
    case (types.TRADES_FAILURE):
      return state.set('error', action.payload)
    default:
      return state
  }
}

export default rootReducer
