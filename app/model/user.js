'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(255), allowNull: false }
  })

  return User
}
