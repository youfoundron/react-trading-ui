import React from 'react'
import ReactDOM from 'react-dom'
import {
  OrderBook
  // OpenOrders,
  // DepthChart,
  // PriceChart,
  // TradeHistory
} from '../src'

class DemoApp extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { bids: undefined, asks: undefined }
    this.fetchOrderBook = this.fetchOrderBook.bind(this)
    // this.fetchInterval = setInterval(this.fetchOrderBook, 12000)
  }

  fetchOrderBook () {
    window.fetch('https://api.gdax.com/products/ETH-USD/book?level=2')
      .then(resp => resp.json())
      .then(({ bids, asks }) => this.setState({ bids, asks }))
  }

  componentWillMount () {
    this.fetchOrderBook()
  }

  componentWillUnMount () {
    // window.clearInteval(this.fetchInterval)
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
        />
        {/* <OpenOrders /> */}
        {/* <DepthChart /> */}
        {/* <PriceChart /> */}
        {/* <TradeHistory /> */}
        <style jsx global>{`
          html { line-height: 1.15em; }
          html, body, #root, .demo { height: 100%; }
          body { margin: 0; font-family: 'Open Sans', monospace; }
        `}</style>
      </div>
    )
  }
}

ReactDOM.render(
  <DemoApp />,
  document.getElementById('root')
)
