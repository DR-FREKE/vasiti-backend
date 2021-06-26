import Sequelize from "sequelize";

const model = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: Sequelize.STRING(225),
  product_description: Sequelize.STRING(500), //could be more than this
  show: Sequelize.BOOLEAN(true),
  product_varieties: Sequelize.JSON,
});

export default model;
