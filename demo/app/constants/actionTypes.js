import scopeTypes from 'scope-types'

const types = [
  'BOOK_REQUEST',
  'BOOK_SUCCESS',
  'BOOK_FAILURE',
  'TRADES_REQUEST',
  'TRADES_SUCCESS',
  'TRADES_FAILURE'
]

export default {
  ...scopeTypes(types)
}
