import React from 'react'

import collect from './utils/collect'
import RealTimeOrderBook from './containers/RealTimeOrderBook'
// import RealTimeTradeHistory from './containers/RealTimeTradeHistory'

class Root extends React.Component {
  componentWillMount () {
    this.props.connectFeed()
  }

  render () {
    return (
      <div className='root'>
        <RealTimeOrderBook />
        {/* <RealTimeTradeHistory /> */}
        <style jsx global>{`
          html { line-height: 1.15em; }
          html, body, #root, .demo { height: 100%; }
          body { margin: 0; font-family: 'Open Sans', monospace; }
        `}</style>
      </div>
    )
  }
}

export default collect(
  [['actions', 'connectFeed']]
)(Root)
