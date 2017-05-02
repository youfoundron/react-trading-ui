import PropTypes from 'prop-types'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const FintechUIHeader = glamorous.div({
  fontSize: '1.5rem',
  padding: '.8rem',
  textTransform: 'uppercase',
  fontFamily: 'sans-serif',
  background: colors.headerBackground
})

FintechUIHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export default FintechUIHeader
