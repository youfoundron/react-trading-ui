import React from 'react'

import collect from '../utils/collect'
import OrderBook from '../../../src/OrderBook'
import colors from '../../../src/defaults/colors'
import {selectAsks, selectBids} from '../constants/selectors'

const orderBookStyles = {
  maxWidth: 'calc(100% - 5px)',
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
        depth={10}
        asks={this.props.asks}
        bids={this.props.bids}
        getPrice={entry => entry.get('price')}
        getSize={entry => entry
          .get('orderSizesById')
          .reduce((totalSize, orderSize) => totalSize + Number(orderSize), 0)
        }
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
