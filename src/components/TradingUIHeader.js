import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const TradingUIHeader = glamorous.header({
  fontSize: '1.5rem',
  padding: '.8rem',
  textTransform: 'uppercase',
  background: colors.headerBackground,
  position: 'relative',
  fontWeight: 'bold'
})

TradingUIHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export default TradingUIHeader
