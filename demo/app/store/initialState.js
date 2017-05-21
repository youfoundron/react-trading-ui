import { Map, List } from 'immutable'
import SortedMap from 'immutable-sorted-map'
const comparePrice = (currKey, nextKey) => {
  const currPrice = Number(currKey)
  const nextPrice = Number(nextKey)
  if (currPrice < nextPrice) return -1
  if (currPrice > nextPrice) return 1
  return 0
}

export default Map({
  error: '',
  book: Map({
    asks: new SortedMap({}, comparePrice),
    bids: new SortedMap({}, comparePrice),
    getSize: book => book.count(),
    snapshot: null,
    queuedMessages: List([])
  }),
  trades: List([]),
  feedStatus: 3 // 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
})
