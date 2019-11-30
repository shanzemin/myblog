'use strict'

const bcrypt = require('bcryptjs')

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(255), allowNull: false },
    password: { type: STRING(255), allowNull: false },
    age: { type: INTEGER },
    avatar: { type: STRING(255) },
    mobile_phone: { type: INTEGER },
    province: { type: INTEGER },
    city: { type: INTEGER },
    area: { type: INTEGER },
    address: { type: STRING(255) }
  })

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, 10)
  })

  User.beforeUpdate(user => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  })

  return User
}
