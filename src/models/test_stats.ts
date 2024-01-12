import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";
import { Test } from "./test";
import { Question } from "./question";

class TestStats extends Model {
  id!: number;
  selected_answer?: string;
  correct_answer!: string;
  is_skipped?: boolean;
  test_id!: number;
  user_id!: number;
  question_id!: number;
}

TestStats.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    selected_answer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correct_answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_skipped: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    test_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "test",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "question",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "test_stats",
  }
);

export { TestStats };
