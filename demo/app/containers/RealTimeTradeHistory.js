import React from 'react'

import collect from '../utils/collect'
import TradeHistory from '../../../src/TradeHistory'
import {selectTrades} from '../constants/selectors'

class RealTimeTradeHistory extends React.Component {
  componentWillMount () {
    this.props.fetchTrades()
  }

  render () {
    return (
      <TradeHistory
        trades={this.props.trades}
        getTimeStamp={order => order.time}
        style={{
          right: 0,
          maxWidth: '50%',
          position: 'absolute'
        }}
      />
    )
  }
}

export default collect(
  [selectTrades, 'trades'],
  [['actions', 'fetchTrades']]
)(RealTimeTradeHistory)
