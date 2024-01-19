import { Request } from "express";
import { TestPerformance } from "../models/test_performance";
import { TestPerformanceRepository } from "../repository/test-performance.repository";
import { TestStatsRepository } from "../repository/test-stats.repository";
import _ from "lodash";
import { TestStats } from "../models/test_stats";
import {
  ThrowError,
  convertToMilliseconds,
  getTimeStamps,
} from "../../common/helper/common-functions";
import { ExamStatus, HttpErrorType } from "../../common/helper/enum";
import { ExamSessions } from "../models/exam_sessions";
import { TestRepository } from "../repository/test.repository";
import { WhereOptions } from "sequelize";

export class TestPerformanceService {
  private readonly testStatsRepository: TestStatsRepository;
  private readonly testRepository: TestRepository;
  public constructor(private readonly testPerformanceRepository: TestPerformanceRepository) {
    this.testPerformanceRepository = this.testPerformanceRepository;
    this.testStatsRepository = new TestStatsRepository();
    this.testRepository = new TestRepository();
  }

  public addTestPerformance = async (
    testPerformanceData: TestPerformance
  ): Promise<TestPerformance | Error> => {
    // Handled case where user tries to re-attempt the test or some how logged out so re starting the test
    const testPerformanceId = _.get(testPerformanceData, "id", null);
    if (testPerformanceId) {
      const where = { id: testPerformanceId } as WhereOptions;
      const testPerformance = await this.testPerformanceRepository.getTestPerformance(where);
      if (testPerformance) {
        const isExamPending = _.isEqual(
          _.get(testPerformance, "status", ExamStatus.pending),
          ExamStatus.pending
        );
        if (!isExamPending) {
          return ThrowError(HttpErrorType.ExamTimeUp);
        }
      } else {
        return ThrowError(HttpErrorType.ServerError);
      }
    }
    const params = { ...testPerformanceData, start_time: new Date() };
    const test_id = _.get(testPerformanceData, "test_id", 0);
    const testData = await this.testRepository.getTest(test_id);
    const user_id = _.get(testPerformanceData, "user_id", 0);
    const start_time = _.get(params, "start_time", new Date());
    const duration = _.get(testData, "duration", 0);
    let testPerformance = await this.testPerformanceRepository.addTestPerformance(params as any);
    const test_performance_id = _.get(testPerformance, "id", 0);
    await ExamSessions.create({ user_id, test_id, start_time, duration, test_performance_id });
    const formattedResponse = _.omit(testPerformance.dataValues, [
      "score",
      "duration",
      "start_time",
      "end_time",
    ]) as TestPerformance;
    return formattedResponse;
  };

  public updateTestPerformance = async (req: Request): Promise<[number] | Error> => {
    const { id } = req.params;
    const { user_id, test_id, status } = req.body;
    if (!_.isEqual(status, ExamStatus.completed)) {
      const testStats = await this.testStatsRepository.getTestStats({
        where: { user_id: Number(user_id), test_id: Number(test_id) },
      });
      const where = { id } as WhereOptions;
      const testPerformance = await this.testPerformanceRepository.getTestPerformance(where);
      const examSession = await ExamSessions.findOne({ where: { test_performance_id: id } });
      if (examSession) {
        await ExamSessions.destroy({ where: { test_performance_id: id } });
      }
      const start_time = _.get(testPerformance, "start_time", new Date());
      let score = 0;
      const end_time = new Date();
      const duration = _.ceil(
        (getTimeStamps(end_time) - getTimeStamps(new Date(start_time))) / (1000 * 60)
      );
      if (testStats) {
        _.forEach(testStats, (element: TestStats) => {
          const { selected_answer, correct_answer } = element;
          if (_.isEqual(selected_answer, correct_answer)) {
            score += 1;
          }
        });
      }
      return await this.testPerformanceRepository.updateTestPerformance(
        { score, duration, end_time, status: ExamStatus.completed, ...req.body },
        Number(id)
      );
    } else {
      return ThrowError(HttpErrorType.ExamTimeUp);
    }
  };
}
