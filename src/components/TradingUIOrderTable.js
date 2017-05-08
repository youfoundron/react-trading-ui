import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

const Table = glamorous.table({
  width: '100%',
  borderCollapse: 'collapse'
})

const HiddenTableHead = glamorous.thead({
  visibility: 'hidden'
})

const HiddenTableFoot = glamorous.tfoot({
  visibility: 'hidden'
})

const TradingUIOrderTable = ({showSizeBar, headerLabels, children, ...props}) => (
  <Table {...props}>
    <HiddenTableHead>
      <tr>
        { showSizeBar ? <th /> : null }
        { headerLabels.map((label, i) => <th key={i}>{label}</th>) }
      </tr>
    </HiddenTableHead>
    <tbody>
      {children}
    </tbody>
    <HiddenTableFoot>
      <tr>
        { showSizeBar ? <td /> : null }
        { headerLabels.map((label, i) => <td key={i}>{label}</td>) }
      </tr>
    </HiddenTableFoot>
  </Table>
)

TradingUIOrderTable.propTypes = {
  children: PropTypes.node,
  showSizeBar: PropTypes.bool,
  headerLabels: PropTypes.array
}

TradingUIOrderTable.defaultProps = {
  showSizeBar: true,
  headerLabels: []
}

export default TradingUIOrderTable
