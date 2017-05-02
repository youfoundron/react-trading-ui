import React from 'react'
import PropTypes from 'prop-types'

class DepthChart extends React.Component {
  render () {
    return (
      <div>
        depth chart
      </div>
    )
  }
}

DepthChart.propTypes = {
  asks: PropTypes.array,
  bids: PropTypes.array
}

DepthChart.defaultProps = {
  asks: [],
  bids: []
}

export default DepthChart
