'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255), 
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    confirmPassword: {
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(255), 
      defaultValue: 'Admin'
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: 'active',
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
