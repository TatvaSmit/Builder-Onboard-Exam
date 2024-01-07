import * as db from "../index";
import { TestStats } from "../index";

export class TestStatsRepository {
  public addTestStats = async (params: TestStats): Promise<TestStats> => {
    return await db.TestStats.create(params as TestStats | any);
  };

  public updateTestStats = async (
    params: TestStats,
    test_stats_id: number
  ): Promise<[number]> => {
    return await db.TestStats.update(params, { where: { id: test_stats_id } });
  };
}
