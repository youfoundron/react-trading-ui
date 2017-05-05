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

class FintechUIScrollingContent extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll () {
    console.log('scrolling')
  }

  render () {
    return (
      <Container {...this.props}>
        <Scrollable>
          <Scroller onsSroll={this.handleScroll} hidden-scrollbars>
            {this.props.children}
          </Scroller>
        </Scrollable>
      </Container>
    )
  }
}

FintechUIScrollingContent.propTypes = {
  children: PropTypes.node.isRequired
}

export default FintechUIScrollingContent
