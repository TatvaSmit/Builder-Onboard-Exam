import { Request } from "express";
import { TestPerformance } from "../models/test_performance";
import { TestPerformanceRepository } from "../repository/test-performance.repository";

export class TestPerformanceService {
  public constructor(private readonly testPerformanceRepository: TestPerformanceRepository) {
    this.testPerformanceRepository = this.testPerformanceRepository;
  }

  public addTestPerformance = async (testData: TestPerformance): Promise<TestPerformance> => {
    return await this.testPerformanceRepository.addTestPerformance(testData);
  };

  public updateTestPerformance = async (req: Request): Promise<[number]> => {
    const { id } = req.params;
    return await this.testPerformanceRepository.updateTestPerformance(req.body, Number(id));
  };
}
