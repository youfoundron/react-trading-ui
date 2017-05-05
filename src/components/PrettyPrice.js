import React from 'react'
import PropTypes from 'prop-types'
import Numeral from 'numeral'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const SidePrimary = glamorous.span(({side}) => ({
  color: side === 'buy' ? colors.buyPrimary : colors.sellPrimary
}))

const SideSecondary = glamorous.span(({side}) => ({
  color: side === 'buy' ? colors.buySecondary : colors.sellSecondary
}))

const NoSidePrimary = glamorous.span({
  color: colors.textMedContrast
})

const NoSideSecondary = glamorous.span({
  color: colors.textLowContrast
})

const PrettyPrice = ({price = 0, format, side}) => {
  const formattedSize = Numeral(price).format(format)
  // get digit arrays before and after decimal
  const [
    digitsBeforeDecimal,
    digitsAfterDecimal
  ] = formattedSize.split('.').map(str => str.split(''))
  // return colorized version of price
  return side
    ? <span>
      <SideSecondary key='dbd' side={side}>{digitsBeforeDecimal}.</SideSecondary>
      <SidePrimary key='dad' side={side}>{digitsAfterDecimal}</SidePrimary>
    </span>
    : <span>
      <NoSideSecondary key='_dbd' side={side}>{digitsBeforeDecimal}.</NoSideSecondary>
      <NoSidePrimary key='_dad' side={side}>{digitsAfterDecimal}</NoSidePrimary>
    </span>
}

PrettyPrice.propTypes = {
  price: PropTypes.number,
  format: PropTypes.string,
  side: PropTypes.oneOf(['buy', 'sell'])
}

PrettyPrice.defaultProps = {
  price: 0,
  format: '00.00'
}

export default PrettyPrice
