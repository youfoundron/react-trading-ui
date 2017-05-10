import { fromJS } from 'immutable'

export default fromJS({
  error: '',
  book: {
    asks: [],
    bids: []
  }),
  trades: [],
  feedStatus: 3 // 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
})
