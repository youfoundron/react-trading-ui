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
    this.state = { bids: [], asks: [] }
    this.fetchOrderBook = this.fetchOrderBook.bind(this)
    // this.fetchInterval = setInterval(this.fetchOrderBook, 12000);
  }

  fetchOrderBook () {
    window.fetch('https://api.gdax.com/products/ETH-BTC/book?level=2')
      .then(resp => resp.json())
      .then(({ bids, asks }) => this.setState({ bids, asks }))
  }

  // componentWillUnMount() {
  //   clearInteval(this.fetchInterval);
  // }

  render () {
    return (
      <div className='demo'>
        <OrderBook
          bids={this.state.bids}
          asks={this.state.asks}
          getSize={order => order[1]}
          getPrice={order => order[0]}
          getPosition={order => order[2]}
          style={{maxWidth: 400}}
        />
        {/* <OpenOrders /> */}
        {/* <DepthChart /> */}
        {/* <PriceChart /> */}
        {/* <TradeHistory /> */}
        <style jsx global>{`
          html, body, #root, .demo { height: 100%; }
          body { margin: 0; }
        `}</style>
      </div>
    )
  }
}

ReactDOM.render(
  <DemoApp />,
  document.getElementById('root')
)
