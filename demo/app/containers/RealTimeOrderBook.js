import React from 'react'

import collect from '../utils/collect'
import OrderBook from '../../../src/OrderBook'
import colors from '../../../src/defaults/colors'
import {selectAsks, selectBids} from '../constants/selectors'

const orderBookStyles = {
  maxWidth: 'calc(50% - 5px)',
  borderStyle: 'solid',
  borderColor: colors.parentHoverBackground,
  borderWidth: '0 5px 0 0'
}

class RealTimeOrderBook extends React.Component {
  componentWillMount () {
    this.props.fetchBook()
  }

  render () {
    return (
      <OrderBook
        asks={this.props.asks}
        bids={this.props.bids}
        getSize={order => Number(order[1])}
        getPrice={order => Number(order[0])}
        onClickOrder={order => console.log(order)}
        style={orderBookStyles}
      />
    )
  }
}

export default collect(
  [selectAsks, 'asks'],
  [selectBids, 'bids'],
  [['actions', 'fetchBook']]
)(RealTimeOrderBook)
