'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employee', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      employee_ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      employee_name: {
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      employee_email: {
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      employee_type: {
        type: Sequelize.STRING(20), 
        allowNull: false
      },
      employee_gender: {
        type: Sequelize.STRING(20), 
        allowNull: false
      },
      dob:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      employee_joinDate:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      employee_department:{
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      employee_designation:{
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      employee_grade:{
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      employee_level:{
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdByUser: {
        type: Sequelize.UUID,
        refrences: {
          model: "Users",
          key: "id",
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employee');
  }
};
