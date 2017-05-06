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
  width: '100%',
  height: '100%',
  overflow: 'scroll',
  position: 'absolute',
  '&::-webkit-scrollbar': { display: 'none' }
})

const FintechUIScrollingContent = ({ref, children, ...props}) => (
  <Container {...props}>
    <Scrollable>;
      <Scroller ref={ref} id='foo' hidden-scrollbars>
        {children}
      </Scroller>
    </Scrollable>
  </Container>
)

FintechUIScrollingContent.propTypes = {
  children: PropTypes.node.isRequired
}

export default FintechUIScrollingContent
