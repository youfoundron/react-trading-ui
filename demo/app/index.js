import React from 'react'
import {Provider} from 'react-redux'

import store from './store'
import RealTimeOrderBook from './containers/RealTimeOrderBook'
import RealTimeTradeHistory from './containers/RealTimeTradeHistory'

const App = () => (
  <Provider store={store}>
    <div className='app'>
      <RealTimeOrderBook />
      <RealTimeTradeHistory />
      <style jsx global>{`
        html { line-height: 1.15em; }
        html, body, #root, .demo { height: 100%; }
        body { margin: 0; font-family: 'Open Sans', monospace; }
      `}</style>
    </div>
  </Provider>
)

export default App
