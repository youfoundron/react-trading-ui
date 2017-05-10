import { Map } from 'immutable'

export default Map({
  error: '',
  book: Map({
    asks: [],
    bids: []
  }),
  trades: [],
  feedStatus: 3 // 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
})
