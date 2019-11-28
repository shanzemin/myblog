'use strict'

module.exports = {
  success (data = null, code = 200) {
    this.body = {
      code,
      data
    }
    this.status = code
  },
  failure (msg = null, code = 500) {
    this.body = {
      code,
      message: msg
    }
    this.status = code
  }
}
