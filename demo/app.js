import React from 'react'
import ReactDOM from 'react-dom'
import {
  // OrderBook,
  // OpenOrders,
  // DepthChart,
  // PriceChart,
  // TradeHistory
} from '../src'

class DemoApp extends React.Component {
  render () {
    return (
      <div>
        <h1>Demo App</h1>
        {/* <OrderBook /> */}
        {/* <OpenOrders /> */}
        {/* <DepthChart /> */}
        {/* <PriceChart /> */}
        {/* <TradeHistory /> */}
      </div>
    )
  }
}

ReactDOM.render(
  <DemoApp />,
  document.getElementById('root')
)
