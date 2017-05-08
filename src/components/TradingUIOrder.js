import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'
import TradingUIOrderSizeBar from './TradingUIOrderSizeBar'

const TradingUIOrderTableRow = glamorous.tr({
  fontSize: '.8em',
  fontWeight: 700,
  ':hover': {
    cursor: 'pointer',
    background: colors.parentHoverBackground
  }
})

const TradingUIOrderTableData = glamorous.td({
  textAlign: 'right',
  transform: 'translateX(-10%)'
})

const TradingUIOrder = ({showSizeBar, side, size, sizeBarMaxWidth, sizeBarMaxSize, sizeBarUnitSize, onClick, order, dataConfigs, ...props}) => {
  return (
    <TradingUIOrderTableRow {...props} onClick={e => {
      e.preventDefault()
      onClick(order, side)
    }}>
      <TradingUIOrderSizeBar {...{showSizeBar, side, size, sizeBarMaxWidth, sizeBarMaxSize, sizeBarUnitSize}} />
      {dataConfigs.map(({propName = 'data', format, getter, renderer}, i) =>
        <TradingUIOrderTableData key={i}>
          {renderer({ side, format, [propName]: getter(order) })}
        </TradingUIOrderTableData>
      )}
    </TradingUIOrderTableRow>
  )
}

TradingUIOrder.propTypes = {
  side: PropTypes.oneOf(['buy', 'sell']),
  showSizeBar: PropTypes.bool,
  dataConfigs: PropTypes.arrayOf(PropTypes.object)
}

TradingUIOrder.defaultProps = {
  side: 'buy',
  showSizeBar: true,
  dataConfigs: []
}

export default TradingUIOrder
