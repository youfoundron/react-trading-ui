import { css } from 'glamor'
import glamorous from 'glamorous'

import colors from '../defaults/colors'

const loadingAnimation = css.keyframes({
  '0%, 80%, 100%': {
    boxShadow: '0 0',
    height: '4em'
  },
  '40%': {
    boxShadow: '0 -2em',
    height: '5em'
  }
})

const Spinner = glamorous.div({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 'auto',
  position: 'absolute',
  color: colors.textHighContrast,
  textIndent: '-9999em',
  fontSize: '11px',
  transform: 'translateZ(0)',
  '&, &::before, &::after': {
    width: '1em',
    height: '4em',
    background: colors.textHighContrast,
    animation: `${loadingAnimation} 1s infinite ease-in-out`
  },
  '&': {
    animationDelay: '-0.16s'
  },
  '&::before, &::after': {
    position: 'absolute',
    top: 0,
    content: '""'
  },
  '&::before': {
    left: '-1.5em',
    animationDelay: '-0.32s'
  },
  '&::after': {
    left: '1.5em'
  }
}, ({hide}) => ({
  display: hide ? 'none' : 'static'
}))

export default Spinner
