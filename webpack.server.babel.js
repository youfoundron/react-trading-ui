import path from 'path'
import makeRule from 'webpack-make-rule'

const demoDir = path.resolve(__dirname, 'demo')
const demoDist = path.resolve(demoDir, 'dist')

export default {
  entry: {
    app: path.resolve(demoDir, 'index.js'),
    html: path.resolve(demoDir, 'index.html'),
    favicon: path.resolve(demoDir, 'favicon.ico')
  },
  output: {
    path: demoDist,
    filename: '[name].js'
  },
  module: {
    rules: [
      makeRule(/\.(html|ico)$/, 'file-loader?name=[name].[ext]'),
      makeRule(/\.jsx?$/, ['react-hot-loader', 'babel-loader'])
    ]
  }
}
