import { Request, Response } from "express";
import { TestService } from "../services/test-service";
import { baseController } from "../../common/helper/base.controller";
import { HttpStatusCode } from "../../common/helper/enum";

export class TestController {
  public constructor(private readonly testService: TestService) {
    this.testService = testService;
  }

  public addTest = async (req: Request, res: Response): Promise<Response> => {
    const test = this.testService.addTest(req.body);
    return baseController.getResult(res, HttpStatusCode.Created, test);
  };

  public updateTest = async (req: Request, res: Response) => {
    const updatedTest = await this.testService.updateTest(req);
    return baseController.getResult(res, HttpStatusCode.Ok, updatedTest);
  };
}
