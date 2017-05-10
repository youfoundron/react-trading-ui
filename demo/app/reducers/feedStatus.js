import types from '../constants/actionTypes'
import initialState from '../store/initialState'
import { selectFeedStatus } from '../constants/selectors'

const defaultState = selectFeedStatus(initialState)

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FEED_CONNECT : return 0
    case types.SOCKET_OPEN : return 1
    case types.SOCKET_CLOSE : return 3
    default : return state
  }
}
