'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userCount = await queryInterface.sequelize.query('select count(1) as count from users where name = "admin"')
    if (!userCount[0][0].count) {
      // 获取‘超级管理员’的id
      await queryInterface.bulkInsert('users', [{
        name: 'admin',
        password: bcrypt.hashSync('123456', 10),
        created_at: new Date(),
        updated_at: new Date()
      }], {})
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
