import React from 'react'
import {
  OrderBook,
  // OpenOrders,
  // DepthChart,
  // PriceChart,
  TradeHistory
} from '../../src'

import colors from '../../src/defaults/colors'

class DemoApp extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { bids: undefined, asks: undefined, trades: undefined }
    this.fetchOrderBook = this.fetchOrderBook.bind(this)
    this.fetchLatestTrades = this.fetchLatestTrades.bind(this)
    this.fetchInterval = setInterval(() => {
      this.fetchOrderBook()
      this.fetchLatestTrades()
    }, 12000)
  }

  fetchOrderBook () {
    window.fetch('https://api.gdax.com/products/ETH-USD/book?level=2')
      .then(resp => resp.json())
      .then(({ bids, asks }) => this.setState({ bids, asks }))
  }

  fetchLatestTrades () {
    window.fetch('https://api.gdax.com/products/ETH-USD/trades')
      .then(resp => resp.json())
      .then(trades => this.setState({ trades }))
  }

  componentWillMount () {
    this.fetchOrderBook()
    this.fetchLatestTrades()
  }

  componentWillUnMount () {
    window.clearInteval(this.fetchInterval)
  }

  render () {
    return (
      <div className='demo'>
        <OrderBook
          bids={this.state.bids}
          asks={this.state.asks}
          getSize={order => Number(order[1])}
          getPrice={order => Number(order[0])}
          onClickOrder={order => console.log(order)}
          style={{
            maxWidth: 'calc(50% - 5px)',
            borderStyle: 'solid',
            borderColor: colors.parentHoverBackground,
            borderWidth: '0 5px 0 0'
          }}
        />
        {/* <OpenOrders /> */}
        {/* <DepthChart /> */}
        {/* <PriceChart /> */}
        <TradeHistory
          trades={this.state.trades}
          style={{
            right: 0,
            maxWidth: '50%',
            position: 'absolute'
          }}
          onClickTrade={trade => console.log(trade)}
        />
        <style jsx global>{`
          html { line-height: 1.15em; }
          html, body, #root, .demo { height: 100%; }
          body { margin: 0; font-family: 'Open Sans', monospace; }
        `}</style>
      </div>
    )
  }
}

export default DemoApp
