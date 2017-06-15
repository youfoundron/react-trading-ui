import { combineReducers } from 'redux-immutable'

import error from './error'
import book from './book'
// import trades from './trades'
import feedStatus from './feedStatus'

export default combineReducers({
  error,
  book,
  // trades,
  feedStatus
})
