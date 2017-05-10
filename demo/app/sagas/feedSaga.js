import { eventChannel } from 'redux-saga'
import { call, take, put } from 'redux-saga/effects'
import { createFeed } from '../api'
import types from '../constants/actionTypes'

const connectFeed = ({productIds}) => eventChannel(
  emitter => {
    // subscribe
    const feed = createFeed()

    feed.onopen = e => {
      emitter({
        type: types.SOCKET_OPEN
      })
      feed.send(JSON.stringify({
        type: 'subscribe',
        product_ids: productIds
      }))
    }

    feed.onclose = e => emitter({
      type: types.SOCKET_CLOSE
    })

    feed.onerror = err => emitter({
      type: types.SOCKET_ERROR,
      payload: err
    })

    feed.onmessage = e => emitter({
      type: types.SOCKET_MESSAGE,
      payload: JSON.parse(e.data)
    })

    // unsubscribe
    return feed.close
  }
)

export default function * (action) {
  const channel = yield call(connectFeed, action.payload)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
