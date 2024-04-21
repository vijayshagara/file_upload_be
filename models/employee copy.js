'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class NewEmployee extends Model {
    static associate(models) {
      // define association here
    }
  }

  NewEmployee.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'NewEmployee',
  });

  return NewEmployee;
};
