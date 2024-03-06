import { Request } from "express";
import { Test } from "../models/test";
import { TestRepository } from "../repository/test.repository";
import _ from "lodash";
import { ThrowError, getRandomQuestions } from "../../common/helper/common-functions";
import { ExamStatus, HttpErrorType, UserRequest } from "../../common/helper/enum";
import { QuestionRepository } from "../repository/question.respository";
import { Question } from "../models/question";
import { TechnologyRepository } from "../repository/technology.repository";
import { WhereOptions } from "sequelize";
import { TestPerformanceRepository } from "../repository/test-performance.repository";
import { TestPerformance } from "../models/test_performance";
import { TestPerformanceService } from "./test-performance-service";

export class TestService {
  public readonly questionRepository: QuestionRepository;
  public readonly technologyRepository: TechnologyRepository;
  public readonly testPerformanceRepository: TestPerformanceRepository;
  public readonly testPerformanceService: TestPerformanceService;
  public constructor(private readonly testRepository: TestRepository) {
    this.testRepository = testRepository;
    this.questionRepository = new QuestionRepository();
    this.technologyRepository = new TechnologyRepository();
    this.testPerformanceRepository = new TestPerformanceRepository();
    this.testPerformanceService = new TestPerformanceService(this.testPerformanceRepository);
  }

  public getAllTest = async (): Promise<Test[]> => {
    return await this.testRepository.getAllTest();
  };

  public getTest = async (req: Request): Promise<Test | null> => {
    const { id } = req.params;
    return this.testRepository.getTest(Number(id));
  };

  public addTest = async (req: UserRequest): Promise<Test | Error> => {
    // const questions = _.get(params, "questions", []);
    // if (_.isEmpty(questions)) {
    //   return ThrowError(HttpErrorType.TestQuestionsNotProvided);
    // }
    // const score = questions.length;

    const user = _.get(req, "user", {});
    const technology_id = _.get(req, "body.technology_id", "");
    const name = _.get(req, "body.name", "");
    const where = { id: technology_id } as WhereOptions;
    const technology = await this.technologyRepository.getTechnology(where);

    if (!technology) {
      return ThrowError(HttpErrorType.ServerError);
    }
    const duration = _.get(technology, "duration", 30);
    const no_of_questions = Number(_.get(technology, "no_of_questions", 30));
    // get questions based on technology
    const questions = await this.questionRepository.getAllQuestions({
      technology_id,
    });

    // shuffle questions
    const QuestionsArray = getRandomQuestions(questions, no_of_questions);
    let score = 0;
    _.forEach(QuestionsArray, (q: Question) => {
      score += q.points;
    });

    // create test
    const test = await this.testRepository.addTest(
      { name, technology_id, duration, score } as Test,
      QuestionsArray
    );
    const formattedTest = test.toJSON();
    const testPerformanceParams: any = {
      user_id: _.get(user, "id", 0),
      test_id: _.get(formattedTest, "id", 0),
      technology_id: Number(technology_id),
    };
    const testPerformance = await this.testPerformanceService.addTestPerformance(
      testPerformanceParams
    );
    // assigning test performance id so that user can update the status at the time of submission of this exam
    _.assign(formattedTest, { test_performance_id: _.get(testPerformance, "id", 0) });
    return formattedTest;
  };
}
