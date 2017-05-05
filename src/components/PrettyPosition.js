import React from 'react'
import glamorous from 'glamorous'

import colors from '../defaults/colors'
import PrettySize from './PrettySize'

const MedContrast = glamorous.span({
  color: colors.textMedContrast
})

const PrettyPosition = ({position, format, side}) =>
  position
  ? <PrettySize size={position} format={format} side={side} />
  : <MedContrast>-</MedContrast>

export default PrettyPosition
