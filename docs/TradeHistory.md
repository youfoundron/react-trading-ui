# TradeHistory
The TradeHistory component is used to list a product's most recent trades.

## Properties
| Property | Type | Description |
| --- | --- | --- |
| `trades` | array | Array of trades. |
| `length` | number | Number of trades to show. |
| `onClickTrade` | function | Function called when a trade is clicked, first arg is the trade object, second arg is the side ("buy", "sell"). |
| `headerText` | string | Text for the component header. |
| `sizeLabel` | string | Text to label the size column of the trade list. |
| `priceLabel` | string | Text to label the price column of the trade list. |
| `timeStampLabel` | string | Text to label the timeStamp column of the trade list. |
| `sizeFormat` | string | [Numeral.js](http://numeraljs.com/#format) format string for a trade's size value. |
| `priceFormat` | string | [Numeral.js](http://numeraljs.com/#format) format string for a trade's price value. |
| `timeStampFormat` | string | [Moment.js](https://momentjs.com/docs/#/displaying/format/) format string for a trade's timeStamp value. |
| `getSize` | function | Function to get the size value from a trade. |
| `getPrice` | function | Function to get the price value from a trade. |
| `getTimeStamp` | function | Function to get the timeStamp value from a trade. |
| `sizeRenderer` | function | Function that renders the size of a trade. |
| `priceRenderer` | function | Function that renders the price of a trade. |
| `timeStampRenderer` | function | Function that renders the timeStamp of a trade. |
| `showSizeBar` | boolean | Flag for whether or not to show the size bar. |
| `sizeBarMaxSize` | number | Market size value for which the size bar is at full width. |
| `sizeBarMaxWidth` | number | Pixel value for the max width of the size bar. |
| `sizeBarUnitSize` | number | Quantity of market size value for which the size bar increments in width. |
