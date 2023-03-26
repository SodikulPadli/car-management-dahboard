'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init({
    car_name: DataTypes.STRING,
    car_type: DataTypes.STRING,
    rental_price: DataTypes.INTEGER,
    car_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};