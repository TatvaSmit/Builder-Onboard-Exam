import { DataTypes, Model } from "sequelize";
import { sequelize } from "../models/index";
import { Test } from "./test";
import { Question } from "./question";

// this is junction table for questions in particular test

class TestQuestions extends Model {
  id!: number;
  test_id!: number;
  question_id!: number;
}
TestQuestions.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    test_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Test,
        key: "id",
      },
    },
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Question,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "test_questions",
    tableName: "test_questions",
  }
);

// This is junction table for questions and test, because differnt test can have same question
// similarly, question can have more than one test related to them

TestQuestions.belongsTo(Test, { foreignKey: "test_id" });
TestQuestions.belongsTo(Question, { foreignKey: "question_id" });

export { TestQuestions };
