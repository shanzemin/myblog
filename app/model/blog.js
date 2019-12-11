'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const Blog = app.model.define('blog', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(255), allowNull: false },
    content: { type: STRING(255), allowNull: false },
    type: { type: INTEGER, defaultValue: 0 }
  })

  Blog.associate = function () {
    this.belongsTo(app.model.User)
  }

  return Blog
}
