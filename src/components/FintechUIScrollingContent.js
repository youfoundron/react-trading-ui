import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

const Container = glamorous.div({
  width: '100%',
  height: '100%',
  position: 'relative'
})

const Scrollable = glamorous.div({
  width: '100%',
  height: '100%'
})

const Scroller = glamorous.div({
  // top: 0,
  // left: 0,
  // bottom: -15,
  // right: -15,
  width: '100%',
  height: '100%',
  overflow: 'scroll',
  position: 'absolute',
  '&::-webkit-scrollbar': { display: 'none' }
})

const FintechUIScrollingContent = ({children, ...props}) => (
  <Container {...props}>
    <Scrollable>
      <Scroller hidden-scrollbars>
        {children}
      </Scroller>
    </Scrollable>
  </Container>
)

FintechUIScrollingContent.propTypes = {
  children: PropTypes.node.isRequired
}

export default FintechUIScrollingContent
