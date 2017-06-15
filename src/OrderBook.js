import R from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Defaults
import * as util from './defaults/util'
import * as getters from './defaults/getters'

// Components
import TradingUIParent from './components/TradingUIParent'
import TradingUIHeader from './components/TradingUIHeader'
import TradingUIContentWrapper from './components/TradingUIContentWrapper'
import TradingUIStickyContent from './components/TradingUIStickyContent'
import TradingUITableHead from './components/TradingUITableHead'
import TradingUITableHeading from './components/TradingUITableHeading'
import TradingUIScrollingContent from './components/TradingUIScrollingContent'
import TradingUIOrderTable from './components/TradingUIOrderTable'
import TradingUIOrder from './components/TradingUIOrder'
import PrettySize from './components/PrettySize'
import PrettyPrice from './components/PrettyPrice'
import PrettyPosition from './components/PrettyPosition'
import Spread from './components/Spread'
import Spinner from './components/Spinner'

// Normalize Array to have first and last methods
Array.prototype.first = function () { return this[0] } // eslint-disable-line no-extend-native
Array.prototype.last = function () { return this[this.length - 1] } // eslint-disable-line no-extend-native

const unsafePropNames = [
  'asks', 'bids', 'depth', 'headerText', 'spreadText', 'showSizeBar',
  'sizeLabel', 'priceLabel', 'positionLabel', 'onClickOrder',
  'sizeBarMaxWidth', 'sizeBarMaxSize', 'sizeBarUnitSize',
  'getSize', 'getPrice', 'getPosition',
  'sizeFormat', 'priceFormat', 'positionFormat', 'spreadFormat',
  'renderSize', 'renderPrice', 'renderPosition'
]

class OrderBook extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { hasOrders: false, hasCentered: false }
    this.scroller = null
    this.centerSpread = this.centerSpread.bind(this)
    this.centerSpreadOnResize = this.centerSpreadOnResize.bind(this)
    window.addEventListener('resize', this.centerSpreadOnResize)
  }

  componentWillUpdate (nextProps, nextState) {
    if (!nextState.hasOrders && util.hasReceivedOrderBook(nextProps)) {
      return this.setState({hasOrders: true})
    }
    if (this.scroller && nextState.hasOrders && !nextState.hasCentered) {
      return this.setState({hasCentered: true}, this.centerSpread)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.centerSpreadOnResize)
  }

  centerSpread () {
    this.scroller.scrollTop = (this.scroller.scrollHeight - this.scroller.clientHeight) / 2
  }

  centerSpreadOnResize () {
    if (!this.state.hasCentered) {
      return this.centerSpread()
    }
  }

  render () {
    const {
      asks, bids, depth, headerText, spreadText, showSizeBar,
      sizeLabel, priceLabel, positionLabel, onClickOrder,
      sizeBarMaxWidth, sizeBarMaxSize, sizeBarUnitSize,
      getSize, getPrice, getPosition,
      sizeFormat, priceFormat, positionFormat, spreadFormat,
      renderSize, renderPrice, renderPosition
    } = this.props
    const safeProps = R.omit(unsafePropNames, this.props)
    const visibleAsks = asks.slice(0, depth).reverse()
    const visibleBids = bids.slice(0, depth)
    const spread = this.state.hasOrders ? getPrice(visibleAsks.last()) - getPrice(visibleBids.first()) : undefined
    const dataConfigs = [
      {propName: 'size', format: sizeFormat, getter: getSize, renderer: renderSize},
      {propName: 'price', format: priceFormat, getter: getPrice, renderer: renderPrice},
      {propName: 'position', format: positionFormat, getter: getPosition, renderer: renderPosition}
    ]
    return (
      <TradingUIParent {...safeProps}>
        {/* UI HEADER */}
        <TradingUIHeader>{headerText}</TradingUIHeader>
        <TradingUIContentWrapper>
          <TradingUIStickyContent>
            {/* TABLE COLUMN HEADERS */}
            <TradingUITableHead>
              {showSizeBar ? <TradingUITableHeading style={{width: sizeBarMaxWidth}} /> : null}
              <TradingUITableHeading>{sizeLabel}</TradingUITableHeading>
              <TradingUITableHeading>{priceLabel}</TradingUITableHeading>
              <TradingUITableHeading>{positionLabel}</TradingUITableHeading>
            </TradingUITableHead>
          </TradingUIStickyContent>
          <TradingUIScrollingContent scrollerRef={c => { this.scroller = ReactDOM.findDOMNode(c) }} >
            {/* ASKS TABLE */}
            <TradingUIOrderTable
              style={{marginTop: '4em'}}
              showSizeBar={showSizeBar}
              headerLabels={[sizeLabel, priceLabel, positionLabel]}
            >
              {visibleAsks.map(order =>
                <TradingUIOrder
                  key={getPrice(order)}
                  side='sell'
                  order={order}
                  size={getSize(order)}
                  onClick={onClickOrder}
                  dataConfigs={dataConfigs}
                  showSizeBar={showSizeBar}
                  sizeBarMaxSize={sizeBarMaxSize}
                  sizeBarUnitSize={sizeBarUnitSize}
                  sizeBarMaxWidth={sizeBarMaxWidth}
                />
              )}
            </TradingUIOrderTable>
            {/* SPREAD MARKER */}
            <Spread
              spread={spread}
              className={!this.state.hasOrders ? 'hide' : ''}
              label={spreadText}
              format={spreadFormat}
              onClick={this.centerSpread}
            />
            {/* BIDS TABLE */}
            <TradingUIOrderTable
              style={{marginBottom: '6em'}}
              showSizeBar={showSizeBar}
              headerLabels={[sizeLabel, priceLabel, positionLabel]}
            >
              {visibleBids.map(order =>
                <TradingUIOrder
                  key={getPrice(order)}
                  side='buy'
                  order={order}
                  size={getSize(order)}
                  onClick={onClickOrder}
                  dataConfigs={dataConfigs}
                  showSizeBar={showSizeBar}
                  sizeBarMaxSize={sizeBarMaxSize}
                  sizeBarUnitSize={sizeBarUnitSize}
                  sizeBarMaxWidth={sizeBarMaxWidth}
                />
              )}
            </TradingUIOrderTable>
            {/* LOADING SPINNER */}
            <Spinner hide={this.state.hasOrders} />
          </TradingUIScrollingContent>
        </TradingUIContentWrapper>
      </TradingUIParent>
    )
  }
}

OrderBook.propTypes = {
  asks: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  bids: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  depth: PropTypes.number,
  sizeBarMaxWidth: PropTypes.number,
  sizeBarMaxSize: PropTypes.number,
  sizeBarUnitSize: PropTypes.number,
  showSizeBar: PropTypes.bool,
  headerText: PropTypes.string,
  spreadText: PropTypes.string,
  sizeLabel: PropTypes.string,
  priceLabel: PropTypes.string,
  positionLabel: PropTypes.string,
  getSize: PropTypes.func,
  getPrice: PropTypes.func,
  getPosition: PropTypes.func,
  sizeFormat: PropTypes.string,
  priceFormat: PropTypes.string,
  positionFormat: PropTypes.string,
  spreadFormat: PropTypes.string,
  renderSize: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  renderPrice: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  renderPosition: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  onClickOrder: PropTypes.func
}

OrderBook.defaultProps = {
  asks: [],
  bids: [],
  depth: Infinity,
  showSizeBar: true,
  sizeBarMaxWidth: 50,
  sizeBarMaxSize: 1000,
  sizeBarUnitSize: 50,
  headerText: 'Order Book',
  spreadText: 'USD SPREAD',
  sizeLabel: 'Market Size',
  priceLabel: 'Price (USD)',
  positionLabel: 'My Position',
  getSize: getters.getSize,
  getPrice: getters.getPrice,
  getPosition: getters.getPosition,
  sizeFormat: '0.00000000',
  priceFormat: '00.00',
  positionFormat: '0.00000000',
  spreadFormat: '0.00',
  renderSize: PrettySize,
  renderPrice: PrettyPrice,
  renderPosition: PrettyPosition
}

export default OrderBook
