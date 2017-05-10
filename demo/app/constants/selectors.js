import { createSelector } from 'reselect'

export const selectError = state => state.get('error')

export const selectBook = state => state.get('book')
export const selectAsks = createSelector(selectBook, book => book.get('asks'))
export const selectBids = createSelector(selectBook, book => book.get('bids'))

export const selectTrades = state => state.get('trades')
