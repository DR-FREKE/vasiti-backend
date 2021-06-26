"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_name: Sequelize.STRING(225),
      product_description: Sequelize.STRING(500), //could be more than this
      show: Sequelize.BOOLEAN(true),
      seller_id: Sequelize.INTEGER(11),
      date_uploaded: Sequelize.DATE,
      date_edited: Sequelize.DATE,
      product_varieties: Sequelize.JSON,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("products");
  },
};
