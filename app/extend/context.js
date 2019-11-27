'use strict'

module.exports = {
  success (data = null, code = 200) {
    this.body = {
      message: 'success',
      data
    }
    this.status = code
  },
  failure (msg = null, code = 500) {
    this.body = {
      message: msg
    }
    this.status = code
  }
}
