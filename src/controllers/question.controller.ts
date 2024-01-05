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

  public createQuestion = async (req: Request, res: Response): Promise<Response> => {
    const question = await this.questionService.createQuestion(req.body);
    return baseController.getResult(res, HttpStatusCode.Created, question);
  };
}
