'use strict'

const Controller = require('egg').Controller

const path = require('path')
const pump = require('mz-modules/pump')
const uuid = require('node-uuid')
const fse = require('fs-extra')

class UserController extends Controller {
  async index () {
    const { ctx } = this
    const query = ctx.helper.toWhere(ctx.request.query)
    const users = await ctx.service.user.list(query)
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
    try {
      const token = await ctx.service.auth.auth()
      ctx.success(token)
    } catch (error) {
      ctx.failure(error.message)
    }
  }

  async upload () {
    const { ctx } = this
    ctx.success(ctx.request.files)
  }
}

module.exports = UserController
