import path from 'path'
import { readdir } from 'fs'
import makeRule from 'webpack-make-rule'

const srcDir = path.resolve(__dirname, 'src')
const libDir = path.resolve(__dirname, 'lib')

const entryReducer = fileNames =>
  fileNames.reduce((entries, fileName) => {
    const {base, name, ext} = path.parse(fileName)
    if (ext) entries[name] = path.resolve(srcDir, base)
    return entries
  }, {})

const dynamicEntry = () => new Promise(
  (resolve, reject) =>
    readdir(srcDir, (err, files) => err
      ? reject(err)
      : resolve(entryReducer(files))
    )
  )

export default {
  entry: dynamicEntry,
  output: {
    path: libDir,
    filename: '[name].js'
  },
  module: {
    rules: [
      makeRule(/\.jsx?$/, 'babel-loader')
    ]
  }
}
