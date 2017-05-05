import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const ThinLowContrast = glamorous.span({
  color: colors.textMedContrast,
  fontWeight: 400
})

const PrettyTimeStamp = ({time, format}) =>
  <ThinLowContrast>
    { format ? Moment(time).format(format) : time }
  </ThinLowContrast>

PrettyTimeStamp.propTypes = {
  time: PropTypes.number,
  format: PropTypes.string
}

export default PrettyTimeStamp
