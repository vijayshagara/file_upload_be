'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Employee extends Model {
    static associate(models) {
      // define association here
    }
  }

  Employee.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    employee_ID:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    employee_name: {
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    employee_email: {
      type: DataTypes.STRING(255), 
      allowNull: false,
      unique: true,
    },
    employee_type: {
      type: DataTypes.STRING(20), 
      allowNull: false
    },
    employee_gender: {
      type: DataTypes.STRING(20), 
      allowNull: false
    },
    dob:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    employee_joinDate:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    employee_department:{
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    employee_designation:{
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    employee_grade:{
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    employee_level:{
      type: DataTypes.STRING(255), 
      allowNull: false
    },
    createdByUser: {
      type: DataTypes.UUID,
      refrences: {
        model: "Users",
        key: "id",
      },
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });

  return Employee;
};
