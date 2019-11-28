'use strict'

module.exports = app => {
  app.role.failureHandler = function (ctx, action) {
    ctx.failure('无效token', 401)
  }

  app.role.use('auth', async ctx => {
    await ctx.service.auth.isAuthenticated()
    return true
  })
}
