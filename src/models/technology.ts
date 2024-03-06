import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Question } from "./question";
import { TestPerformance } from "./test_performance";

class Technology extends Model {
  id!: number;
  name!: string;
  duration!: string;
  no_of_questions!: string;
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
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
    no_of_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
  },
  { sequelize, modelName: "technology", tableName: "technology" }
);

Technology.hasMany(Question, { foreignKey: "technology_id" });
Technology.hasMany(TestPerformance, { foreignKey: "technology_id" });
Question.belongsTo(Technology, { foreignKey: "technology_id" });
export { Technology };
