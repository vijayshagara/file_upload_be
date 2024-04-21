'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255), 
      },
      password: {
        type: Sequelize.STRING(255), 
      },
      confirmPassword: {
        type: Sequelize.STRING(255), 
      },
      role:{
        type: Sequelize.STRING(255), 
      },
      status: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
