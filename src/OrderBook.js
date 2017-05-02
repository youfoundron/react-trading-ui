import React from 'react'
import PropTypes from 'prop-types'

class OrderBook extends React.Component {
  render () {
    return (
      <div>
        order book
      </div>
    )
  }
}

OrderBook.propTypes = {
  asks: PropTypes.array,
  bids: PropTypes.array
}

OrderBook.defaultProps = {
  asks: [],
  bids: []
}

export default OrderBook
