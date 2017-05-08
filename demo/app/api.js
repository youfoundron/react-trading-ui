import serialize from './utils/serialize'

const baseUrl = 'https://api.gdax.com/products'

export const fetchBook = ({productId, ...params}) =>
  window.fetch(`${baseUrl}/${productId}/book?${serialize(params)}`)
    .then(resp => resp.json())

export const fetchTrades = ({productId, ...params}) =>
  window.fetch(`${baseUrl}/${productId}/trades?${serialize(params)}`)
    .then(resp => resp.json())
