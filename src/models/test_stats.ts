import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Question } from "./question";

class TestStats extends Model {
  id!: number;
  selected_answer?: string;
  correct_answer?: string;
  is_skipped?: boolean;
  technology_id!: number;
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
    technology_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "technology",
        key: "id",
      },
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
    tableName: "test_stats",
  }
);

// This table shows question wise user input and its result,
// It has question id, user id, test id, tech id
TestStats.belongsTo(Question, { foreignKey: "question_id" });
export { TestStats };
