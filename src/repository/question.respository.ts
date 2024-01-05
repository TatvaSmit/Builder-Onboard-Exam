import * as db from "../index";
import { Question } from "../index";

export class QuestionRepository {
  public getAllQuestions = async (): Promise<Question[]> => {
    return await db.Question.findAll();
  };

  public createQuestion = async (questionData: Question): Promise<Question> => {
    return await db.Question.create(questionData as any);
  };
}
