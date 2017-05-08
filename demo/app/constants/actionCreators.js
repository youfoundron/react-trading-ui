import types from './actionTypes'

export const fetchBook = (productId = 'BTC-USD', level = 2) => ({
  type: types.BOOK_REQUEST,
  payload: { productId, level }
})

export const fetchTrades = (productId = 'BTC-USD') => ({
  type: types.TRADES_REQUEST,
  payload: { productId }
})
