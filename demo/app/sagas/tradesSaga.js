import { call, put } from 'redux-saga/effects'
import { fetchTrades } from '../api'
import types from '../constants/actionTypes'

export default function * (action) {
  try {
    const trades = yield call(fetchTrades, action.payload)
    yield put({type: types.TRADES_SUCCESS, payload: trades})
  } catch (err) {
    yield put({type: types.TRADES_FAILURE, payload: err.message})
  }
}
