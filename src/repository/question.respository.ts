import { WhereOptions } from "sequelize";
import * as db from "../index";
import { Question } from "../index";

export class QuestionRepository {
  public getAllQuestions = async (): Promise<Question[]> => {
    return await db.Question.findAll({
      attributes: ["id", "question", "options", "technology_id"],
    });
  };

  public getQuestion = async (where: WhereOptions): Promise<Question | null> => {
    return await db.Question.findOne({
      where,
      attributes: ["id", "question", "options", "technology_id"],
    });
  };

  public addQuestion = async (params: Question): Promise<Question> => {
    return await db.Question.create(params as Question | any);
  };

  public updateQuestion = async (params: Question, question_id: number): Promise<[number]> => {
    return await db.Question.update(params, { where: { id: question_id } });
  };

  public deleteQuestion = async (question_id: number): Promise<number> => {
    return await db.Question.destroy({ where: { id: question_id } });
  };
}
