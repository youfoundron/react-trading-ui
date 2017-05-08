export default params =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')
