import R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import * as util from './defaults/util'
import * as getters from './defaults/getters'

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
import PrettyTimeStamp from './components/PrettyTimeStamp'
import Spinner from './components/Spinner'

const unsafePropNames = [
  'trades', 'length', 'headerText', 'showSizeBar',
  'sizeLabel', 'priceLabel', 'timeStampLabel', 'onClickTrade',
  'sizeBarMaxWidth', 'sizeBarMaxSize', 'sizeBarUnitSize',
  'getSize', 'getSide', 'getPrice', 'getTimeStamp',
  'sizeFormat', 'priceFormat', 'timeStampFormat',
  'renderSize', 'renderPrice', 'renderTimeStamp'
]

class TradeHistory extends React.Component {
  render () {
    const {
      trades, length, headerText, showSizeBar,
      sizeLabel, priceLabel, timeStampLabel, onClickTrade,
      sizeBarMaxWidth, sizeBarMaxSize, sizeBarUnitSize,
      getSize, getSide, getPrice, getTimeStamp,
      sizeFormat, priceFormat, timeStampFormat,
      renderSize, renderPrice, renderTimeStamp
    } = this.props
    const safeProps = R.omit(unsafePropNames, this.props)
    const hasTrades = util.hasReceivedTrades(this.props)
    console.log({hasTrades, trades})
    const visibleTrades = trades.slice(0, length)
    const dataConfigs = [
      {propName: 'size', format: sizeFormat, getter: getSize, renderer: renderSize},
      {propName: 'price', format: priceFormat, getter: getPrice, renderer: renderPrice},
      {propName: 'timeStamp', format: timeStampFormat, getter: getTimeStamp, renderer: renderTimeStamp}
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
              <FintechUITableHeading>{timeStampLabel}</FintechUITableHeading>
            </FintechUITableHead>
          </FintechUIStickyContent>
          <FintechUIScrollingContent>
            {/* TRADE TABLE */}
            <FintechUIOrderTable
              style={{margin: '1em 0 2em 0'}}
              showSizeBar={showSizeBar}
              headerLabels={[sizeLabel, priceLabel, timeStampLabel]}
            >
              {visibleTrades.map((trade, i) =>
                <FintechUIOrder
                  key={i}
                  order={trade}
                  side={getSide(trade)}
                  size={getSize(trade)}
                  onClick={onClickTrade}
                  dataConfigs={dataConfigs}
                  showSizeBar={showSizeBar}
                  sizeBarMaxSize={sizeBarMaxSize}
                  sizeBarUnitSize={sizeBarUnitSize}
                  sizeBarMaxWidth={sizeBarMaxWidth}
                />
              )}
            </FintechUIOrderTable>
            <Spinner hide={hasTrades} />
          </FintechUIScrollingContent>
        </FintechUIContentWrapper>
      </FintechUIParent>
    )
  }
}

TradeHistory.propTypes = {
  trades: PropTypes.array,
  length: PropTypes.number,
  sizeBarMaxWidth: PropTypes.number,
  sizeBarMaxSize: PropTypes.number,
  sizeBarUnitSize: PropTypes.number,
  showSizeBar: PropTypes.bool,
  headerText: PropTypes.string,
  sizeLabel: PropTypes.string,
  priceLabel: PropTypes.string,
  timeStampLabel: PropTypes.string,
  getSize: PropTypes.func,
  getSide: PropTypes.func,
  getPrice: PropTypes.func,
  getTimeStamp: PropTypes.func,
  sizeFormat: PropTypes.string,
  priceFormat: PropTypes.string,
  timeStampFormat: PropTypes.string,
  renderSize: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  renderPrice: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  renderTimeStamp: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  onClickTrade: PropTypes.func,
  onScrollBottom: PropTypes.func
}

TradeHistory.defaultProps = {
  trades: [],
  length: Infinity,
  sizeBarMaxWidth: 50,
  sizeBarMaxSize: 1000,
  sizeBarUnitSize: 50,
  showSizeBar: true,
  headerText: 'Trades',
  sizeLabel: 'Trade Size',
  priceLabel: 'Price (USD)',
  timeStampLabel: 'Time',
  getSize: getters.getSize,
  getSide: getters.getSide,
  getPrice: getters.getPrice,
  getTimeStamp: getters.getTimeStamp,
  sizeFormat: '0.00000000',
  priceFormat: '00.00',
  timeStampFormat: 'HH:mm:ss',
  renderSize: PrettySize,
  renderPrice: PrettyPrice,
  renderTimeStamp: PrettyTimeStamp
}

export default TradeHistory
