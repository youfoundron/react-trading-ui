# OrderBook
The OrderBook component is used to list a product's buy and sell orders, organized by price level.

## Properties
| Property | Type | Description |
| --- | --- | --- |
| `asks` | array | Array of sell side orders. |
| `bids` | array | Array of buy side orders. |
| `depth` | number | Number of orders to show on either side of the spread. |
| `onClickOrder` | function | Function called when an order is clicked, first arg is the order object, second arg is the side ("buy", "sell"). |
| `headerText` | string | Text for the component header. |
| `spreadText` | string | Text for the spread. |
| `sizeLabel` | string | Text to label the size column of the book. |
| `priceLabel` | string | Text to label the price column of the book. |
| `positionLabel` | string | Text to label the position column of the book. |
| `sizeFormat` | string | [Numeral.js](http://numeraljs.com/#format) format string for an order's size value. |
| `priceFormat` | string | [Numeral.js](http://numeraljs.com/#format) format string for an order's price value. |
| `positionFormat` | string | [Numeral.js](http://numeraljs.com/#format) format string for an order's position value. |
| `spreadFormat` | string | [Numeral.js](http://numeraljs.com/#format) format string for the book's spread value. |
| `getSize` | function | Function to get the size value from an order. |
| `getPrice` | function | Function to get the price value from an order. |
| `getPosition` | function | Function to get the position value from an order. |
| `sizeRenderer` | function | Function that renders the size of an order. |
| `priceRenderer` | function | Function that renders the price of an order. |
| `positionRenderer` | function | Function that renders the position of an order. |
| `showSizeBar` | boolean | Flag for whether or not to show the size bar. |
| `sizeBarMaxSize` | number | Market size value for which the size bar is at full width. |
| `sizeBarMaxWidth` | number | Pixel value for the max width of the size bar. |
| `sizeBarUnitSize` | number | Quantity of market size value for which the size bar increments in width. |
