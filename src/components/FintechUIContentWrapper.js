import PropTypes from 'prop-types'
import glamorous from 'glamorous'

const FintechUIContentWrapper = glamorous.div({
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'absolute'
})

FintechUIContentWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default FintechUIContentWrapper
