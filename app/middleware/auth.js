'use strict'
module.exports = (options, app) => {
  return async function (ctx, next) {
    const authToken = ctx.header.authorization
    if (!authToken) {
      return next()
    }
    const token = ctx.header.authorization.replace('Bearer ', '')
    try {
      const data = app.jwt.verify(token)
      const user = await ctx.service.user.one({ id: data.id })
      ctx.state.user = user
      if (!user) {
        ctx.failure('无效token', 401)
        return
      }
      await next()
    } catch (error) {
      console.log(error)
      ctx.failure('无效token', 401)
    }
  }
}
