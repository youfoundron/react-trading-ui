import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const TradingUIStickyContent = glamorous.div({
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  position: 'absolute',
  background: colors.parentBackground
})

TradingUIStickyContent.propTypes = {
  children: PropTypes.node.isRequired
}

export default TradingUIStickyContent
