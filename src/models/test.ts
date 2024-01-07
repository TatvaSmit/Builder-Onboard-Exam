import { DataTypes, Model } from "sequelize";
import { Question } from "../models/question";
import { sequelize } from "../models/index";

class Test extends Model {
  id!: number;
  technology_id!: number;
  // questions!: Question[];
  duration!: number;
}

Test.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    technology_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "technology",
        key: "id",
      },
    },
    // questions: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    // },
    duration: {
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

Test.hasMany(Question, {
  foreignKey: "technology_id",
  as: "question",
});

export { Test };
