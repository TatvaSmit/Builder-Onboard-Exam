import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { QuestionType } from "../../common/helper/enum";
import { Technology } from "./technology";

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

Question.belongsTo(Technology, { foreignKey: "technology_id", as: "technology" });

export { Question };
