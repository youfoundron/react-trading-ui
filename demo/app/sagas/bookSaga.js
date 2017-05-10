import { call, put } from 'redux-saga/effects'
import { fetchBook } from '../api'
import types from '../constants/actionTypes'

export default function * (action) {
  try {
    const book = yield call(fetchBook, action.payload)
    yield put({type: types.BOOK_SUCCESS, payload: book})
  } catch (err) {
    yield put({type: types.BOOK_FAILURE, payload: err.message})
  }
}
