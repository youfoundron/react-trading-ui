import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const FintechUIHeader = glamorous.header({
  fontSize: '1.5rem',
  padding: '.8rem',
  textTransform: 'uppercase',
  fontFamily: 'opensans, sans-serif',
  background: colors.headerBackground,
  position: 'relative'
})

FintechUIHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export default FintechUIHeader
