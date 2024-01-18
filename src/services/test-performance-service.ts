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

export class TestPerformanceService {
  private readonly testStatsRepository: TestStatsRepository;
  public constructor(private readonly testPerformanceRepository: TestPerformanceRepository) {
    this.testPerformanceRepository = this.testPerformanceRepository;
    this.testStatsRepository = new TestStatsRepository();
  }

  public addTestPerformance = async (
    testData: TestPerformance
  ): Promise<TestPerformance | Error> => {
    // Handled case where user tries to re-attempt the test or some how logged out so re starting the test
    const testPerformanceId = _.get(testData, "id", null);
    if (testPerformanceId) {
      const testPerformance = await this.testPerformanceRepository.getTestPerformance({
        where: { id: testPerformanceId },
      });
      const isExamPending = _.eq(
        _.get(testPerformance, "status", ExamStatus.pending),
        ExamStatus.pending
      );
      if (testPerformance) {
        const startTime = _.get(testPerformance, "start_time", "");
        const duration = _.get(testPerformance, "duration", 0);
        const endTime = _.get(testPerformance, "end_time", "");
        const formattedStartTime = new Date(startTime);
        const formattedEndTime = new Date(endTime);
        if (
          getTimeStamps(formattedEndTime) >=
          getTimeStamps(formattedStartTime) + convertToMilliseconds(duration)
        ) {
          return ThrowError(HttpErrorType.ExamTimeUp);
        }
      } else {
        return ThrowError(HttpErrorType.ServerError);
      }
    }
    const params = { ...testData, start_time: new Date() };
    const test_id = _.get(testData, "id", 0);
    const user_id = _.get(testData, "user_id", 0);
    const start_time = _.get(params, "start_time", new Date());
    const duration = _.get(testData, "duration", 0);
    const testPerformance = await this.testPerformanceRepository.addTestPerformance(params as any);
    const test_performance_id = _.get(testData, "id", 0);
    await ExamSessions.create({ user_id, test_id, start_time, duration, test_performance_id });
    return testPerformance;
  };

  public updateTestPerformance = async (req: Request): Promise<[number] | Error> => {
    const { id } = req.params;
    const { user_id, test_id, start_time, status } = req.body;
    if (!_.eq(status, ExamStatus.completed)) {
      const testStats = await this.testStatsRepository.getTestStats({
        where: { user_id: Number(user_id), test_id: Number(test_id) },
      });
      let score = 0;
      const end_time = new Date();
      const duration = _.ceil(
        (getTimeStamps(end_time) - getTimeStamps(new Date(start_time))) / (1000 * 60)
      );
      if (testStats) {
        _.forEach(testStats, (element: TestStats) => {
          const { selected_answer, correct_answer } = element;
          if (selected_answer === correct_answer) {
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
