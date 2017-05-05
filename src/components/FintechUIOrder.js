import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'
import FintechUIOrderSizeBar from './FintechUIOrderSizeBar'

const FintechUIOrderTableRow = glamorous.tr({
  fontSize: '.8em',
  fontWeight: 700,
  ':hover': {
    cursor: 'pointer',
    background: colors.parentHoverBackground
  }
})

const FintechUIOrderTableData = glamorous.td({
  textAlign: 'right',
  transform: 'translateX(-10%)'
})

const FintechUIOrder = ({showSizeBar, side, size, sizeBarMaxWidth, sizeBarMaxSize, sizeBarUnitSize, onClick, order, dataConfigs, ...props}) => {
  return (
    <FintechUIOrderTableRow {...props} onClick={e => onClick(order, side)}>
      <FintechUIOrderSizeBar {...{showSizeBar, side, size, sizeBarMaxWidth, sizeBarMaxSize, sizeBarUnitSize}} />
      {dataConfigs.map(({propName = 'data', format, getter, renderer}, i) =>
        <FintechUIOrderTableData key={i}>
          {renderer({ side, format, [propName]: getter(order) })}
        </FintechUIOrderTableData>
      )}
    </FintechUIOrderTableRow>
  )
}

FintechUIOrder.propTypes = {
  side: PropTypes.oneOf(['buy', 'sell']),
  showSizeBar: PropTypes.bool,
  dataConfigs: PropTypes.arrayOf(PropTypes.object)
}

FintechUIOrder.defaultProps = {
  side: 'buy',
  showSizeBar: true,
  dataConfigs: []
}

export default FintechUIOrder
