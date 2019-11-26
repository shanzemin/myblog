'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    let users = await ctx.service.user.list({})
    ctx.body = users;
  }
}

module.exports = UserController;
