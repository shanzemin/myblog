'use strict'

const BaseService = require('./base')

class UserService extends BaseService {
  constructor (ctx) {
    super(ctx, ctx.model.User)
  }
}

module.exports = UserService
