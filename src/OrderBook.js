import R from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Defaults
import * as util from './defaults/util'
import * as getters from './defaults/getters'

// Components
import FintechUIParent from './components/FintechUIParent'
import FintechUIHeader from './components/FintechUIHeader'
import FintechUIContentWrapper from './components/FintechUIContentWrapper'
import FintechUIStickyContent from './components/FintechUIStickyContent'
import FintechUITableHead from './components/FintechUITableHead'
import FintechUITableHeading from './components/FintechUITableHeading'
import FintechUIScrollingContent from './components/FintechUIScrollingContent'
import FintechUIOrderTable from './components/FintechUIOrderTable'
import FintechUIOrder from './components/FintechUIOrder'
import PrettySize from './components/PrettySize'
import PrettyPrice from './components/PrettyPrice'
import PrettyPosition from './components/PrettyPosition'
import Spread from './components/Spread'
import Spinner from './components/Spinner'

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
    if (!this.state.hasScrolled) {
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
    const visibleAsks = asks.reverse().slice(0, depth)
    const visibleBids = bids.slice(0, depth)
    const spread = this.state.hasOrders ? getPrice(R.last(visibleAsks)) - getPrice(R.head(visibleBids)) : undefined
    const dataConfigs = [
      {propName: 'size', format: sizeFormat, getter: getSize, renderer: renderSize},
      {propName: 'price', format: priceFormat, getter: getPrice, renderer: renderPrice},
      {propName: 'position', format: positionFormat, getter: getPosition, renderer: renderPosition}
    ]
    return (
      <FintechUIParent {...safeProps}>
        {/* UI HEADER */}
        <FintechUIHeader>{headerText}</FintechUIHeader>
        <FintechUIContentWrapper>
          <FintechUIStickyContent>
            {/* TABLE COLUMN HEADERS */}
            <FintechUITableHead>
              {showSizeBar ? <FintechUITableHeading style={{width: sizeBarMaxWidth}} /> : null}
              <FintechUITableHeading>{sizeLabel}</FintechUITableHeading>
              <FintechUITableHeading>{priceLabel}</FintechUITableHeading>
              <FintechUITableHeading>{positionLabel}</FintechUITableHeading>
            </FintechUITableHead>
          </FintechUIStickyContent>
          <FintechUIScrollingContent scrollerRef={c => { this.scroller = ReactDOM.findDOMNode(c) }} >
            {/* ASKS TABLE */}
            <FintechUIOrderTable
              style={{marginTop: '4em'}}
              showSizeBar={showSizeBar}
              headerLabels={[sizeLabel, priceLabel, positionLabel]}
            >
              {visibleAsks.map((order, i) =>
                <FintechUIOrder
                  key={i}
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
            </FintechUIOrderTable>
            {/* SPREAD MARKER */}
            <Spread
              spread={spread}
              className={!this.state.hasOrders ? 'hide' : ''}
              label={spreadText}
              format={spreadFormat}
              onClick={this.centerSpread}
            />
            {/* BIDS TABLE */}
            <FintechUIOrderTable
              style={{marginBottom: '6em'}}
              showSizeBar={showSizeBar}
              headerLabels={[sizeLabel, priceLabel, positionLabel]}
            >
              {visibleBids.map((order, i) =>
                <FintechUIOrder
                  key={i}
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
            </FintechUIOrderTable>
            {/* LOADING SPINNER */}
            <Spinner hide={this.state.hasOrders} />
          </FintechUIScrollingContent>
        </FintechUIContentWrapper>
      </FintechUIParent>
    )
  }
}

OrderBook.propTypes = {
  asks: PropTypes.array,
  bids: PropTypes.array,
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
