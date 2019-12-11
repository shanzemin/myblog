'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const Role = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(255), allowNull: false }
  })

  return Role
}