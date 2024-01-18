import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { ExamSessions } from "./exam_sessions";
import { ExamStatus } from "../../common/helper/enum";

class TestPerformance extends Model {
  id!: number;
  technology_id!: number;
  start_time?: Date;
  end_time?: Date;
  duration?: number;
  score?: number;
  user_id!: number;
  test_id!: number;
  status!: string;
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
    },
    end_time: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    score: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(ExamStatus.completed, ExamStatus.pending),
      defaultValue: ExamStatus.pending,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "test_performance",
    tableName: "test_performance",
  }
);

// It is the table which will store test wise performance, start time, end time, score and duration
// It has test id, user id, tech id
TestPerformance.hasOne(ExamSessions, { foreignKey: "test_performance_id" });
export { TestPerformance };
