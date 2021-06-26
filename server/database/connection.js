import "babel-polyfill";
import dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    operatorsAliases: false,
  }
);

export default sequelize;
global.sequelize = sequelize;
