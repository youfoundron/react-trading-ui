import React from 'react'
import PropTypes from 'prop-types'

class TradeHistory extends React.Component {
  render () {
    return (
      <div>
        trade history
      </div>
    )
  }
}

TradeHistory.propTypes = {
  trades: PropTypes.array
}

TradeHistory.defaultProps = {
  trades: []
}

export default TradeHistory
