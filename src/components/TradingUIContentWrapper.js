import PropTypes from 'prop-types'
import glamorous from 'glamorous'

const TradingUIContentWrapper = glamorous.div({
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'absolute'
})

TradingUIContentWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default TradingUIContentWrapper
