import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { QuestionType } from "../../common/helper/enum";
import { Technology } from "./technology";
import { Test } from "./test";
import { TestStats } from "./test_stats";
import { TestQuestions } from "./test_questions";

class Question extends Model {
  id!: number;
  question!: string;
  options?: string;
  question_type!: string;
  answer!: string;
  technology_id!: number;
}

Question.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.ENUM(QuestionType.mcq, QuestionType.subjective),
      allowNull: false,
    },
    options: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer: {
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
  },
  { sequelize, modelName: "question", tableName: "question" }
);

// Question.hasMany(TestStats, { foreignKey: "question_Id" });
// TestStats.belongsTo(Question, { foreignKey: "question_Id" });
export { Question };
