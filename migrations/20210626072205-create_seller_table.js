"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("sellers", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      seller_name: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("sellers");
  },
};
