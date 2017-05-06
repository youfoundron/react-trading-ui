export const hasReceivedOrderBook = ({ bids, asks }) =>
  Array.isArray(bids) &&
  Array.isArray(asks) &&
  bids.length > 0 &&
  asks.length > 0

export const hasReceivedTrades = ({ trades }) =>
  Array.isArray(trades) && trades.length > 0

export const countTrailingZeroes = numString => {
  let numZeroes = 0
  for (let digit of numString.split('').reverse()) {
    if (digit == 0) ++numZeroes // eslint-disable-line eqeqeq
    else return numZeroes
  }
  return numZeroes
}
