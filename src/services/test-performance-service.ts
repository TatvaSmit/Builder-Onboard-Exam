import { Request } from "express";
import { TestPerformance } from "../models/test_performance";
import { TestPerformanceRepository } from "../repository/test-performance.repository";
import { TestStatsRepository } from "../repository/test-stats.repository";
import _ from "lodash";
export class TestPerformanceService {
  private readonly testStatsRepository: TestStatsRepository;
  public constructor(private readonly testPerformanceRepository: TestPerformanceRepository) {
    this.testPerformanceRepository = this.testPerformanceRepository;
    this.testStatsRepository = new TestStatsRepository();
  }

  public addTestPerformance = async (testData: TestPerformance): Promise<TestPerformance> => {
    const params = { ...testData, start_time: new Date() };
    return await this.testPerformanceRepository.addTestPerformance(params as any);
  };

  public updateTestPerformance = async (req: Request): Promise<[number]> => {
    const { id } = req.params;
    const { user_id, test_id, start_time } = req.body;
    const testStats = await this.testStatsRepository.getTestStats({
      where: { user_id: Number(user_id), test_id: Number(test_id) },
    });
    let score = 0;
    const end_time = new Date();
    const duration = _.ceil((end_time.getTime() - new Date(start_time).getTime()) / (1000 * 60));
    if (testStats) {
      _.forEach(testStats, (element) => {
        if (!element.is_skipped) score += 1;
      });
    }
    return await this.testPerformanceRepository.updateTestPerformance(
      { score, duration, end_time, ...req.body },
      Number(id)
    );
  };
}
