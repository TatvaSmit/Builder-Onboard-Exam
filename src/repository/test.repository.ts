import * as db from "../index";
import { Test } from "../models/test";

export class TestRepository {
  public addTest = async (params: Test): Promise<Test> => {
    return await db.Test.create(params as any);
  };

  public updateTest = async (params: Test, test_id: number): Promise<[number]> => {
    return await db.Test.update(params, { where: { id: test_id } });
  };
}
