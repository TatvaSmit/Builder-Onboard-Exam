import { Request } from "express";
import { Test } from "../models/test";
import { TestRepository } from "../repository/test.repository";
import _ from "lodash";
import { ThrowError } from "../../common/helper/common-functions";
import { HttpErrorType } from "../../common/helper/enum";

export class TestService {
  public constructor(private readonly testRepository: TestRepository) {
    this.testRepository = testRepository;
  }

  public getAllTest = async (): Promise<Test[]> => {
    return await this.testRepository.getAllTest();
  };

  public getTest = async (req: Request): Promise<Test | null> => {
    const { id } = req.params;
    return this.testRepository.getTest(Number(id));
  };

  public addTest = async (params: Test | any): Promise<Test | Error> => {
    const { name, technology_id, duration }: Test = params;
    const questions = _.get(params, "questions", []);
    if (_.isEmpty(questions)) {
      return ThrowError(HttpErrorType.TestQuestionsNotProvided);
    }
    const score = questions.length;
    return await this.testRepository.addTest(
      { name, technology_id, duration, score } as Test,
      questions
    );
  };
}
