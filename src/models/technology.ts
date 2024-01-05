import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

class Technology extends Model {
  id!: number;
  name!: string;
}

Technology.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "technology", tableName: "technology" }
);

export { Technology };
