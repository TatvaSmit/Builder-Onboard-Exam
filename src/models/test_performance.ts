import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";
import { Technology } from "./technology";
import { Test } from "./test";

class TestPerformance extends Model {
  id!: number;
  technology_id!: number;
  start_time!: Date;
  end_time?: Date;
  duration?: number;
  score?: number;
  user_id!: number;
  test_id!: number;
}

TestPerformance.init(
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
    technology_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "technology",
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      // defaultValue: null,
    },
    duration: {
      type: DataTypes.INTEGER,
      // defaultValue: 0,
    },
    score: {
      type: DataTypes.INTEGER,
      // defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "test_performance",
    tableName: "test_performance",
  }
);

export { TestPerformance };
