const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ident extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Record }) {
      Ident.hasMany(Record, { foreignKey: 'identId' });
    }
  }
  Ident.init({
    ident: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Ident',
  });
  return Ident;
};
