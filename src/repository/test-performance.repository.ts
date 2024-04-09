import { WhereOptions } from "sequelize";
import * as db from "../index";
import { TestPerformance } from "../models/test_performance";

export class TestPerformanceRepository {
  public getTestPerformance = async (where: WhereOptions): Promise<TestPerformance | null> => {
    return await db.TestPerformance.findOne({ where });
  };

  public addTestPerformance = async (params: TestPerformance): Promise<TestPerformance> => {
    return await db.TestPerformance.create(params as TestPerformance | any);
  };

  public updateTestPerformance = async (params: TestPerformance, id: number): Promise<[number]> => {
    return await db.TestPerformance.update(params, { where: { id } });
  };
}
