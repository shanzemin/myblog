/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574759850450_3527'

  // add your middleware config here
  config.middleware = ['auth']

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0'
    }
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'myblog'
  }

  config.security = {
    csrf: false
  }

  config.console = {
    debug: true,
    error: true
  }

  config.passportLocal = {
    usernameField: 'user',
    passwordField: 'pass'
  }

  config.jwt = {
    secret: 'shanzm-secret'
  }

  config.token = {
    expiresIn: 60 * 60 * 24 * 30
  }

  config.multipart = {
    mode: 'file',
    fileExtensions: ['.txt', '.apk', '.epub', '.pdf', '.xlsx', '.xls', '.doc', '.docx', '.ppt', '.pptx'],
    fileSize: '100mb'
  }

  config.baseDir = 'uploads/'

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig
  }
}
