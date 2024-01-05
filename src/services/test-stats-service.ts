import { Request } from "express";
import { TestStats } from "../models/test_stats";
import { TestStatsRepository } from "../repository/test-stats.repository";

export class TestStatsService {
  public constructor(private readonly testStatsRepository: TestStatsRepository) {
    this.testStatsRepository = this.testStatsRepository;
  }

  public addTestStats = async (testStatsData: TestStats): Promise<TestStats> => {
    return this.testStatsRepository.addTestStats(testStatsData);
  };

  public updateTestStats = async (req: Request): Promise<[number]> => {
    const { id } = req.params;
    return this.testStatsRepository.updateTestStats(req.body, Number(id));
  };
}
