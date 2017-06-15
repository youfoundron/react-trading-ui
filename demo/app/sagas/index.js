import { takeEvery } from 'redux-saga/effects'
import types from '../constants/actionTypes'
import feedSaga from './feedSaga'
import bookSaga from './bookSaga'
// import tradesSaga from './tradesSaga'

export default function * () {
  yield takeEvery(types.FEED_CONNECT, feedSaga)
  yield takeEvery(types.BOOK_REQUEST, bookSaga)
  // yield takeEvery(types.TRADES_REQUEST, tradesSaga)
}
