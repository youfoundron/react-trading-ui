import { createSelector } from 'reselect'

export const selectError = state => state.get('error')

export const selectBook = state => state.get('book')
export const selectAsks = createSelector(
  selectBook,
  book => book.get('asks').toArray()
)
export const selectBids = createSelector(
  selectBook,
  book => book.get('bids').toArray().reverse()
)

export const selectTrades = state => state.get('trades')
export const selectFeedStatus = state => state.get('feedStatus')
