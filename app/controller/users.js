'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async index () {
    const { ctx } = this
    const users = await ctx.service.user.list({})
    ctx.success(users)
  }

  async show () {
    const { ctx } = this
    const users = await ctx.service.user.one({ id: ctx.params.id })
    ctx.success(users)
  }

  async create () {
    const { ctx } = this
    const users = await ctx.service.user.create(ctx.request.body)
    ctx.success(users)
  }

  async update () {
    const { ctx } = this
    const users = await ctx.service.user.update({ id: ctx.params.id }, ctx.request.body)
    ctx.success(users)
  }

  async destroy () {
    const { ctx } = this
    const users = await ctx.service.user.destory({ id: ctx.params.id })
    ctx.success(users)
  }

  async login () {
    const { ctx } = this
    ctx.success('login')
  }
}

module.exports = UserController
