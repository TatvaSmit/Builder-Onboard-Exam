import { Request } from "express";
import { TestStats } from "../models/test_stats";
import { TestStatsRepository } from "../repository/test-stats.repository";
import { TestPerformanceRepository } from "../repository/test-performance.repository";
import _ from "lodash";
import { ThrowError } from "../../common/helper/common-functions";
import { ExamStatus, HttpErrorType } from "../../common/helper/enum";
import { QuestionRepository } from "../repository/question.respository";
import { Op, WhereOptions } from "sequelize";
import { Question } from "../models/question";

export class TestStatsService {
  private readonly testPerformanceRepository: TestPerformanceRepository;
  private readonly questionRepository: QuestionRepository;
  public constructor(private readonly testStatsRepository: TestStatsRepository) {
    this.testStatsRepository = this.testStatsRepository;
    this.testPerformanceRepository = new TestPerformanceRepository();
    this.questionRepository = new QuestionRepository();
  }

  public addTestStats = async (testStatsData: TestStats): Promise<TestStats | Error> => {
    const testStatsId = _.get(testStatsData, "id", null);
    // if test stats already exist then don't create
    if (testStatsId) {
      return ThrowError(HttpErrorType.TestStatsAlreadyExist);
    }
    // Handled case where user tries to re-attempt the test
    const test_id = _.get(testStatsData, "test_id", 0);
    const user_id = _.get(testStatsData, "user_id", 0);
    const question_id = _.get(testStatsData, "question_id", 0);
    if (question_id) {
      const where = { id: question_id } as WhereOptions;
      const questionData = await Question.findOne({ where });
      const answer = _.get(questionData, "answer", "");
      _.assign(testStatsData, { correct_answer: answer });
    }
    if (test_id && user_id) {
      const where = { [Op.and]: [{ test_id }, { user_id }] } as WhereOptions;
      const testPerformance = await this.testPerformanceRepository.getTestPerformance(where);
      if (_.get(testPerformance, "status", ExamStatus.completed) === ExamStatus.completed) {
        return ThrowError(HttpErrorType.ExamTimeUp);
      }
    }
    const testStatsResponse = await this.testStatsRepository.addTestStats(testStatsData);
    const formattedTestStatsResponse = _.omit(testStatsResponse.toJSON(), [
      "is_skipped",
      "correct_answer",
    ]) as TestStats;
    return formattedTestStatsResponse;
  };

  public updateTestStats = async (req: Request): Promise<[number]> => {
    const id = _.get(req, "params.id", null);
    return this.testStatsRepository.updateTestStats(req.body, Number(id));
  };
}
