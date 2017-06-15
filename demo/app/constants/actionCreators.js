import types from './actionTypes'

export const fetchBook = (productId = 'ETH-USD', level = 3) => ({
  type: types.BOOK_REQUEST,
  payload: { productId, level }
})

export const fetchTrades = (productId = 'ETH-USD') => ({
  type: types.TRADES_REQUEST,
  payload: { productId }
})

export const connectFeed = (productIds = ['ETH-USD']) => ({
  type: types.FEED_CONNECT,
  payload: { productIds }
})
