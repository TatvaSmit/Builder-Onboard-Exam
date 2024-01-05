import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { QuestionType } from "../../common/helper/enum";

class Question extends Model {
  id!: number;
  question!: string;
  options?: string;
  question_type!: string;
  answer!: string;
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
        allowNull:false
    },
    options: {
      type: DataTypes.STRING,
      allowNull:true
    }
  },
  { sequelize, modelName: "question", tableName: "question" }
);


export { Question };