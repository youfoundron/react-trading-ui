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

const FintechUIOrderTable = ({showSizeBar, sizeLabel, priceLabel, positionLabel, children, ...props}) => (
  <Table {...props}>
    <HiddenTableHead>
      <tr>
        { showSizeBar ? <th /> : null }
        <th>{sizeLabel}</th>
        <th>{priceLabel}</th>
        <th>{positionLabel}</th>
      </tr>
    </HiddenTableHead>
    <tbody>
      {children}
    </tbody>
    <HiddenTableFoot>
      <tr>
        { showSizeBar ? <td /> : null }
        <td>{sizeLabel}</td>
        <td>{priceLabel}</td>
        <td>{positionLabel}</td>
      </tr>
    </HiddenTableFoot>
  </Table>
)

FintechUIOrderTable.propTypes = {
  children: PropTypes.node
}

export default FintechUIOrderTable
