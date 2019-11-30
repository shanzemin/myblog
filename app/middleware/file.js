'use strict'

const path = require('path')
const fse = require('fs-extra')

module.exports = dir => {
  return async function (ctx, next) {
    let filePath = path.join(path.resolve(__dirname, '../../'), dir)
    fse.ensureDirSync(filePath)
    for (const file of ctx.request.files) {
      const name = path.basename(file.filepath)
      filePath = path.join(filePath, name)
      fse.moveSync(file.filepath, filePath)
      file.filepath = filePath
      file.url = /.*?uploads\/(.*)/.exec(filePath)[1] // 相对文件路径
    }
    await next()
  }
}
