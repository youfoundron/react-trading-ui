import { call, put, takeEvery } from 'redux-saga/effects'
import * as Api from '../api'
import types from './actionTypes'

function * fetchBook (action) {
  try {
    const book = yield call(Api.fetchBook, action.payload)
    yield put({type: types.BOOK_SUCCESS, payload: book})
  } catch (err) {
    yield put({type: types.BOOK_FAILURE, payload: err.message})
  }
}

function * fetchTrades (action) {
  try {
    const trades = yield call(Api.fetchTrades, action.payload)
    yield put({type: types.TRADES_SUCCESS, payload: trades})
  } catch (err) {
    yield put({type: types.TRADES_FAILURE, payload: err.message})
  }
}

function * sagas () {
  yield takeEvery(types.BOOK_REQUEST, fetchBook)
  yield takeEvery(types.TRADES_REQUEST, fetchTrades)
}

export default sagas
