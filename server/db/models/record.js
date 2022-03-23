const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ident }) {
      Record.belongsTo(Ident, { foreignKey: 'identId' });
    }
  }
  Record.init({
    identId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    lat: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    lon: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    speed: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    device_timestamp: {
      type: DataTypes.DATE,
    },
    server_timestamp: {
      type: DataTypes.DATE,
    },
    direction: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};
