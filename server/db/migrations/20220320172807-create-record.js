module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      identId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lat: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      lon: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      speed: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      device_timestamp: {
        type: Sequelize.DATE,
      },
      server_timestamp: {
        type: Sequelize.DATE,
      },
      direction: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Records');
  },
};
