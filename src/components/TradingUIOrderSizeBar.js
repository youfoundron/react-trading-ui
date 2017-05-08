import glamorous from 'glamorous'
import colors from '../defaults/colors'

const TradingUIOrderSizeBar = glamorous.td({
  padding: 0,
  boxSizing: 'border-box'
}, ({showSizeBar, side, size, sizeBarMaxWidth, sizeBarMaxSize, sizeBarUnitSize}) => {
  const totalUnits = sizeBarMaxSize / sizeBarUnitSize
  const numUnits = Math.floor(size / sizeBarUnitSize)
  const percentSize = numUnits >= totalUnits ? 1 : numUnits / totalUnits
  const sizeBarWidth = percentSize * sizeBarMaxWidth
  return {
    width: sizeBarMaxWidth,
    borderColor: side === 'buy' ? colors.buySecondary : colors.sellSecondary,
    borderStyle: showSizeBar ? 'solid' : 'none',
    borderWidth: `0 0 0 ${1 + sizeBarWidth}px`
  }
})

export default TradingUIOrderSizeBar
