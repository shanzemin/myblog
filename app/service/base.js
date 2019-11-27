'use strict'

const Service = require('egg').Service

class BaseService extends Service {
  constructor (ctx, model) {
    super(ctx)
    this.model = model
  }

  async index (query, options = {}) {
    // options.order = [['updated_at', 'DESC'], ['id', 'DESC']]
    if (query.id && (typeof query.id === 'number')) {
      query.id = this.ctx.helper.toInt(query.id)
    }
    if (options.limit) {
      options.limit = this.ctx.helper.toInt(options.limit)
    }
    if (options.offset || options.offset === 0) {
      options.offset = this.ctx.helper.toInt(options.offset)
    }
    query = Object.assign({ where: query }, options)
    return this.model.findAndCountAll(query)
  }

  async detail (query, options = {}) {
    query = Object.assign({ where: query }, options)
    return this.model.findOne(query)
  }

  async list (query = {}) {
    return this.model.findAndCountAll(query)
  }

  async one (query) {
    return this.model.findOne({ where: query })
  }

  async info (query) {
    return this.model.findOne(query)
  }

  async create (data) {
    return this.model.create(data)
  }

  async upsert (data) {
    return this.model.upsert(data)
  }

  async update (query, data) {
    const { ctx } = this
    const entity = await this.model.findOne({ where: query })
    if (!entity) {
      ctx.throw('not found', 404)
      return
    }

    if (data.id) {
      delete data.id
    }
    return entity.update(data)
  }

  async findOrCreateOrUpdate (query, data) {
    const entity = await this.findOrCreate(query, data)
    if (data.id) {
      delete data.id
    }
    return entity.update(data)
  }

  async destory (query) {
    const { ctx } = this
    const entity = await this.model.findOne({ where: query })
    if (!entity) {
      ctx.throw('not found', 404)
      return
    }
    return entity.destroy()
  }

  async batchUpdate (query, data) {
    const entities = await this.model.findAll({ where: query })
    for (const entity of entities) {
      await entity.update(data)
    }
    return Promise.resolve('')
  }

  async batchDestory (query) {
    const entities = await this.model.findAll({ where: query })
    for (const entity of entities) {
      await entity.destroy()
    }
    return Promise.resolve('')
  }

  async paginate (query = {}, options = {}) {
    const { ctx } = this
    query.limit = ctx.helper.toInt(query.limit) || ctx.pagination.limit
    query.offset = ctx.helper.toInt(query.offset) || ctx.pagination.offset
    return this.model.findAndCountAll(query)
  }

  async count (query) {
    return this.model.count(query)
  }

  async countQ (query, options = {}) {
    query = Object.assign({ where: query }, options)
    return this.model.count(query)
  }

  async max (field, options = {}) {
    return this.model.max(field, options)
  }

  async findById (id) {
    return this.model.findById(id)
  }

  async findAll (query = {}) {
    return this.model.findAll(query)
  }

  async findAllQ (query, options = {}) {
    query = Object.assign({ where: query }, options)
    return this.model.findAll(query)
  }

  async findOrCreate (query, data) {
    if (data.id) {
      delete data.id
    }
    let ret = await this.one(query)
    if (!ret) {
      ret = await this.create(data)
    }
    return ret
    // return this.model.findOrCreate({ where: query, defaults: data })
  }
}

module.exports = BaseService
