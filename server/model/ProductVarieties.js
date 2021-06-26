import Sequelize from "sequelize";

const model = sequelize.define("ProductVarieties", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  size: Sequelize.STRING(225),
  color: Sequelize.STRING(225),
  quantity: Sequelize.STRING(225),
  images: Sequelize.ARRAY,
  price: Sequelize.STRING(),
  show: Sequelize.BOOLEAN(true),
  product_varieties: Sequelize.JSON,
});

export default model;
