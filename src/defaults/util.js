const isArrayOrObject = coll =>
  Array.isArray(coll) || typeof coll === 'object'

const lengthOrSize = coll =>
  coll.length || coll.size

export const hasReceivedOrderBook = ({ bids, asks }) =>
  isArrayOrObject(bids) &&
  isArrayOrObject(asks) &&
  lengthOrSize(bids) > 0 &&
  lengthOrSize(asks) > 0

export const hasReceivedTrades = ({ trades }) =>
  isArrayOrObject(trades) && lengthOrSize(trades) > 0

export const countTrailingZeroes = numString => {
  let numZeroes = 0
  for (let digit of numString.split('').reverse()) {
    if (digit == 0) ++numZeroes // eslint-disable-line eqeqeq
    else return numZeroes
  }
  return numZeroes
}
