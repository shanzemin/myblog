'use strict'

const bcrypt = require('bcryptjs')

exports.compare = (str, hash) => {
  return bcrypt.compareSync(str, hash)
}

exports.toWhere = query => {
  const limit = +query.limit || 10
  const offset = +query.offset || 0
  const sort = query.sort || 'createdAt'
  const order = query.order || 'desc'
  delete query.limit
  delete query.offset
  delete query.sort
  delete query.order
  const ret = { limit, offset, order: [[sort, order]], where: query }
  return ret
}
