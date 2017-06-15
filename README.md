# React Trading UI
A component library for trading applications.  

<img width="600" alt="react-trading-ui" src="https://cloud.githubusercontent.com/assets/4658359/25865418/759b0316-34b8-11e7-8592-4bb1b4d1e5f9.png">

### Disclaimer:  
There are some real performance issues with this right now and it is likely going to freeze up if you are trying to maintain a full order book in real-time.  
For level books or for just polling a full order book it should be more stable.

## Documentation
* [Getting Started](/docs/GettingStarted.md)
* [Order Book](/docs/OrderBook.md)
* [Trade History](/docs/TradeHistory.md)
* ~~[Depth Chart](/docs/DepthChart.md)~~
* ~~[Price Chart](/docs/PriceChart.md)~~

## Demo & Examples
Live demo: _coming soon..._

To run the example locally, clone this repo and run:  
```terminal
$ npm install
$ npm run start
```  
Then visit [localhost:3000](http://localhost:3000) in your browser.

## Installation
Using npm:  
`$ npm install --save react-trading-ui`  

Using yarn  
`$ yarn add react-trading-ui`

## Usage
```javascript
import {OrderBook, TradeHistory} from 'react-trading-ui'
import {connect} from 'react-redux'

const MyApp = ({book, trades}) => (
  <div className='my-app'>
    <OrderBook asks={book.asks} bids={book.bids} />
    <TradeHistory trades={trades} />
  </div>
)

export default connect(
  state => ({
    book: state.book,
    trades: state.trades
  })
)(MyApp)
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request!

## Acknowledgements
* [@coinbase](https://github.com/coinbase)
