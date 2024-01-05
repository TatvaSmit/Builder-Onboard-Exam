import { Request, Response } from "express";
import { baseController } from "../../common/helper/base.controller";
import { HttpStatusCode } from "../../common/helper/enum";
import { TestStatsService } from "../services/test-stats-service";

export class TestStatsController {
  public constructor(private readonly testStatsService: TestStatsService) {
    this.testStatsService = testStatsService;
  }

  public addTestStats = async (req: Request, res: Response): Promise<Response> => {
    const testStats = await this.testStatsService.addTestStats(req.body);
    return baseController.getResult(res, HttpStatusCode.Created, testStats);
  };

  public updateStats = async (req: Request, res: Response): Promise<Response> => {
    const updateCount = await this.testStatsService.updateTestStats(req);
    return baseController.getResult(res, HttpStatusCode.Ok, updateCount);
  };
}
