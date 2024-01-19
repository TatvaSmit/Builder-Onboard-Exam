import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { TestPerformance } from "./test_performance";

class ExamSessions extends Model {
  id!: number;
  test_performance_id!: number;
  user_id!: number;
  test_id!: number;
  start_time!: Date;
  duration!: number;
}

ExamSessions.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    test_performance_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "test_performance",
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
    test_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "test",
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "exam_sessions",
    tableName: "exam_sessions",
  }
);

export { ExamSessions };
