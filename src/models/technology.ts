import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Test } from "./test";
import { Question } from "./question";
import { TestPerformance } from "./test_performance";

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

Technology.hasMany(Question, { foreignKey: "technology_id" });
Technology.hasMany(TestPerformance, { foreignKey: "technology_id" });
Question.belongsTo(Technology, { foreignKey: "technology_id" });
export { Technology };
