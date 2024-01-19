import _ from "lodash";
import * as db from "../index";
import { TestStats } from "../index";

export class TestStatsRepository {
  public addTestStats = async (params: TestStats): Promise<TestStats> => {
    const { user_id, test_id, question_id, selected_answer } = params;
    if (selected_answer?.trim()) {
      params.is_skipped = false;
    }
    const testStats = await db.TestStats.findOne({ where: { user_id, test_id, question_id } });
    if (testStats) {
      const test_stats_id = _.get(testStats, "id", 0);
      await db.TestStats.update(params, { where: { id: test_stats_id } });
      return testStats;
    }
    return await db.TestStats.create(params as TestStats | any);
  };

  public updateTestStats = async (params: TestStats, test_stats_id: number): Promise<[number]> => {
    return await db.TestStats.update(params, { where: { id: test_stats_id } });
  };

  public getTestStats = async (where: any): Promise<TestStats[]> => {
    return await db.TestStats.findAll({ ...where });
  };
}
