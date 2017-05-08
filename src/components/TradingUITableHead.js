import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const FullWidthTable = glamorous.table({
  width: '100%',
  zIndex: 1,
  fontSize: '.8em',
  color: colors.textMedContrast,
  background: colors.parentBackground,
  borderBottom: `.5px solid ${colors.textMedContrast}`
})

const TradingUITableHead = ({children, ...props}) => (
  <FullWidthTable {...props}>
    <thead>
      <tr>
        {children}
      </tr>
    </thead>
  </FullWidthTable>
)

TradingUITableHead.propTypes = {
  children: PropTypes.node.isRequired
}

export default TradingUITableHead
