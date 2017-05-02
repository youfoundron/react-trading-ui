import React from 'react'
import PropTypes from 'prop-types'

class OpenOrders extends React.Component {
  render () {
    return (
      <div>
        open orders
      </div>
    )
  }
}

OpenOrders.propTypes = {
  asks: PropTypes.array,
  bids: PropTypes.array
}

OpenOrders.defaultProps = {
  asks: [],
  bids: []
}

export default OpenOrders
