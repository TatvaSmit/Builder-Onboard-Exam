import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";
import { Technology } from "./technology";
import { Test } from "./test";

class TestPerformance extends Model {
  name!: string;
  technology_id!: number;
  start_time!: Date;
  end_time!: Date;
  duration!: number;
  score!: number;
  user_id!: number;
}

TestPerformance.init(
  {
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
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "test_performance",
    tableName: "test_performance",
  }
);

// TestPerformance.belongsTo(Test, { foreignKey: "test_id" });
// TestPerformance.belongsTo(Technology, { foreignKey: "technology_id" });

export { TestPerformance };
