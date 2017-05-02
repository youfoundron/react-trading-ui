import React from 'react'
import PropTypes from 'prop-types'

class PriceChart extends React.Component {
  render () {
    return (
      <div>
        price chart
      </div>
    )
  }
}

PriceChart.propTypes = {
  snapshots: []
}

PriceChart.defaultProps = {
  snapshots: PropTypes.array
}

export default PriceChart
