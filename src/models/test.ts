import { DataTypes, Model } from "sequelize";
import { Question } from "../models/question";
import { sequelize } from "../models/index";
import { TestPerformance } from "./test_performance";
import { TestStats } from "./test_stats";
import { ExamSessions } from "./exam_sessions";

class Test extends Model {
  id!: number;
  name!: string;
  technology_id!: number;
  duration!: number;
  score!: number;
}

Test.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technology_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "technology",
        key: "id",
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "test",
    tableName: "test",
  }
);

Test.hasOne(TestPerformance, { foreignKey: "test_id" });
Test.hasMany(TestStats, { foreignKey: "test_id" });
Test.hasMany(ExamSessions, { foreignKey: "test_id" });
Test.belongsToMany(Question, { through: "test_questions", foreignKey: "test_id" });
Question.belongsToMany(Test, { through: "test_questions", foreignKey: "question_id" });
TestStats.belongsTo(Test, { foreignKey: "test_id" });

export { Test };
