import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { IOptions } from "../../common/helper/enum";

class Question extends Model {
  id!: number;
  question!: string;
  options!: Array<IOptions>;
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
    options: {
      type: DataTypes.JSON,
      get() {
        const optionsString = this.getDataValue("options");
        return optionsString ? JSON.parse(optionsString) : [];
      },
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
// Question has relation with Technology

// Question.hasMany(TestStats, { foreignKey: "question_Id" });
// TestStats.belongsTo(Question, { foreignKey: "question_Id" });
export { Question };
