import scopeTypes from 'scope-types'

const appTypes = [
  'BOOK_REQUEST',
  'BOOK_SUCCESS',
  'BOOK_FAILURE',
  'TRADES_REQUEST',
  'TRADES_SUCCESS',
  'TRADES_FAILURE',
  'FEED_CONNECT'
]

const feedTypes = [
  'SOCKET_OPEN',
  'SOCKET_CLOSE',
  'SOCKET_ERROR',
  'SOCKET_MESSAGE'
]

export default {
  ...scopeTypes(appTypes),
  ...scopeTypes(feedTypes, 'Feed')
}
