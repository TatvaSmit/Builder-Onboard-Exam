import { Request, Response } from "express";
import { baseController } from "../../common/helper/base.controller";
import { HttpStatusCode } from "../../common/helper/enum";
import { TestService } from "../services/test-service";

export class TestController {
  public constructor(private readonly testService: TestService) {
    this.testService = testService;
  }

  public getAllTest = async (req: Request, res: Response): Promise<Response> => {
    const tests = await this.testService.getAllTest();
    return baseController.getResult(res, HttpStatusCode.Ok, tests);
  };

  public getTest = async (req: Request, res: Response): Promise<Response> => {
    const test = await this.testService.getTest(req);
    return baseController.getResult(res, HttpStatusCode.Ok, test);
  }

  public addTest = async (req: Request, res: Response): Promise<Response> => {
    const test = await this.testService.addTest(req.body);
    return baseController.getResult(res, HttpStatusCode.Ok, test);
  };
}
