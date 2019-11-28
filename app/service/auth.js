'use strict'

const Service = require('egg').Service

function passportAuth (app, ctx) {
  return new Promise(function (resolve, reject) {
    app.passport.authenticate('local', (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })(ctx)
  })
}

class AuthService extends Service {
  async auth () {
    const { ctx, app } = this
    const user = await passportAuth(app, ctx)
    const u = await ctx.service.user.one({ name: user.username })
    if (!u) {
      ctx.throw('用户不存在')
      return
    }
    if (!ctx.helper.compare(user.password, u.password)) {
      ctx.throw('密码错误')
      return
    }
    const token = app.jwt.sign({ id: u.id }, app.config.jwt.secret, { expiresIn: app.config.token.expiresIn })
    return { token }
  }

  async isAuthenticated () {
    const { ctx, app } = this
    const authToken = ctx.header.authorization
    if (!authToken) {
      ctx.failure('无效token', 401)
      return
    }
    const token = ctx.header.authorization.replace('Bearer ', '')
    try {
      const data = app.jwt.verify(token)
      const user = await ctx.service.user.one({ id: data.id })
      if (!user) {
        ctx.failure('无效token', 401)
        return
      }
      this.ctx.state.user = user
    } catch (error) {
      ctx.failure('无效token', 401)
    }
  }
}

module.exports = AuthService
