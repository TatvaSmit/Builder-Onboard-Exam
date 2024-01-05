import { Response, Request } from "express";
import { QuestionService } from "../services/question-service";
import { baseController } from "../../common/helper/base.controller";
import { HttpStatusCode } from "../../common/helper/enum";

export class QuestionController {
  public constructor(private readonly questionService: QuestionService) {
    this.questionService = questionService;
  }

  public getAllQuestions = async (req: Request, res: Response): Promise<Response> => {
    const questions = await this.questionService.getAllQuestions();
    return baseController.getResult(res, HttpStatusCode.Ok, questions);
  };

  public getQuestion = async (req: Request, res: Response): Promise<Response> => {
    const question = await this.questionService.getQuestion(req);
    return baseController.getResult(res, HttpStatusCode.Ok, question);
  };

  public createQuestion = async (req: Request, res: Response): Promise<Response> => {
    const question = await this.questionService.createQuestion(req.body);
    return baseController.getResult(res, HttpStatusCode.Created, question);
  };

  public updateQuestion = async (req: Request, res: Response): Promise<Response> => {
    const countUpdated = await this.questionService.updateQuestion(req);
    return baseController.getResult(res, HttpStatusCode.Ok, countUpdated);
  };

  public deleteQuestion = async (req: Request, res: Response): Promise<Response> => {
    const countDeleted = await this.questionService.deleteQuestion(req);
    return baseController.getResult(res, HttpStatusCode.Ok, countDeleted);
  };
}
