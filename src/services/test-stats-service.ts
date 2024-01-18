import { Request } from "express";
import { TestStats } from "../models/test_stats";
import { TestStatsRepository } from "../repository/test-stats.repository";
import { TestPerformanceRepository } from "../repository/test-performance.repository";
import _ from "lodash";
import { ThrowError } from "../../common/helper/common-functions";
import { HttpErrorType } from "../../common/helper/enum";
import { QuestionRepository } from "../repository/question.respository";

export class TestStatsService {
  private readonly testPerformanceRepository: TestPerformanceRepository;
  private readonly questionRepository: QuestionRepository;
  public constructor(private readonly testStatsRepository: TestStatsRepository) {
    this.testStatsRepository = this.testStatsRepository;
    this.testPerformanceRepository = new TestPerformanceRepository();
    this.questionRepository = new QuestionRepository();
  }

  public addTestStats = async (testStatsData: TestStats): Promise<TestStats | [number] | Error> => {
    const testStatsId = _.get(testStatsData, "id", null);
    // if test stats already exist then don't create
    if (testStatsId) {
      return ThrowError(HttpErrorType.TestStatsAlreadyExist);
    }
    // Handled case where user tries to re-attempt the test
    const test_id = _.get(testStatsData, "test_id", 0);
    const user_id = _.get(testStatsData, "user_id", 0);
    if (test_id && user_id) {
      const testPerformance = await this.testPerformanceRepository.getTestPerformance({
        where: { test_id, user_id },
      });
      if (_.get(testPerformance, "end_time", null)) {
        return ThrowError(HttpErrorType.ExamTimeUp);
      }
    }
    return this.testStatsRepository.addTestStats(testStatsData);
  };

  public updateTestStats = async (req: Request): Promise<[number]> => {
    const id = _.get(req, "param.id", null);
    let params = _.get(req, "body", {});
    const question_id = _.get(params, "question_id", 0);
    const questionData = await this.questionRepository.getQuestion(question_id);
    const answer = _.get(questionData, "answer", null);
    _.assign(params, { correct_answer: answer });
    return this.testStatsRepository.updateTestStats(req.body, Number(id));
  };
}
