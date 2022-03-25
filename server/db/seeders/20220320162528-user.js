const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'test',
      email: 'test@example.com',
      password: await bcrypt.hash(process.env.USER_PASS, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
