import { Dialect } from "sequelize";
require('dotenv').config();

interface DbConfig {
  host: string;
  database: string;
  username: string;
  password: string;
  dialect: Dialect;
  port: number;
}

const DbConfiguration: DbConfig = {
  host: process.env.DB_HOST || "",
  database: process.env.DB_NAME || "",
  username: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  dialect: (process.env.DB_DIALECT as Dialect) || "",
  port: Number(process.env.DB_PORT || 3000),
};

export { DbConfiguration };
