import * as db from "../index";
import { Test } from "../models/test";
import { TestQuestions } from "../models/test_questions";

export class TestRepository {
  public getAllTest = async (): Promise<Test[]> => {
    return await db.Test.findAll({
      attributes: ["id", ["name", "test_name"], "technology_id", "duration"],
      include: {
        model: db.Question,
        attributes: ["id", "question", "options"],
        through: { attributes: [] }, //This will prevent include junction table data
      },
    });
  };

  public getTest = async (test_id: number): Promise<Test | null> => {
    return await db.Test.findByPk(test_id, {
      attributes: ["id", ["name", "test_name"], "technology_id", "duration"],
      include: {
        model: db.Question,
        attributes: ["id", "question", "options"],
        through: { attributes: [] }, //This will prevent include junction table data
      },
    });
  };

  public addTest = async (params: Test, questions: any): Promise<Test> => {
    const test = await Test.create(params as Test | any);
    await TestQuestions.bulkCreate(
      questions.map((element: { id: number }) => ({
        test_id: test.dataValues.id,
        question_id: element.id,
      }))
    );
    return test;
  };
}
