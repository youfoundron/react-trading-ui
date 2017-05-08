import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const TradingUIParent = glamorous.div({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'absolute',
  color: colors.textHighContrast,
  background: colors.parentBackground
})

TradingUIParent.propTypes = {
  children: PropTypes.node.isRequired
}

export default TradingUIParent
