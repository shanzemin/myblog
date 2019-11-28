'use strict'

const bcrypt = require('bcryptjs')

exports.compare = (str, hash) => {
  return bcrypt.compareSync(str, hash)
}
