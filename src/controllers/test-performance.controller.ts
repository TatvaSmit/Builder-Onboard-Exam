import { Request, Response } from "express";
import { TestPerformanceService } from "../services/test-performance-service";
import { baseController } from "../../common/helper/base.controller";
import { HttpStatusCode } from "../../common/helper/enum";

export class TestPerformanceController {
  public constructor(private readonly testPerformanceService: TestPerformanceService) {
    this.testPerformanceService = testPerformanceService;
  }

  public addTestPerformance = async (req: Request, res: Response): Promise<Response> => {
    const test = this.testPerformanceService.addTestPerformance(req.body);
    return baseController.getResult(res, HttpStatusCode.Created, test);
  };

  public updateTestPerformance = async (req: Request, res: Response) => {
    const updatedTest = await this.testPerformanceService.updateTestPerformance(req);
    return baseController.getResult(res, HttpStatusCode.Ok, updatedTest);
  };
}
