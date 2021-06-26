import Sequelize from "sequelize";

const model = sequelize.define("Seller", {
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
});

export default model;
