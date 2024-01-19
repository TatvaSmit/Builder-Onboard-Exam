import { Sequelize } from "sequelize";
import { DbConfiguration } from "../../common/config/app-config";

export const sequelize = new Sequelize(
  DbConfiguration.database,
  DbConfiguration.username,
  DbConfiguration.password,
  {
    dialect: DbConfiguration.dialect,
    host: DbConfiguration.host,
    port: DbConfiguration.port,
    logging: console.log,
    define: {
      timestamps: false,
    },
  }
);
