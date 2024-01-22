import { Request } from "express";
import { Question } from "../models/question";
import { QuestionRepository } from "../repository/question.respository";
import _ from "lodash";
import { ThrowError } from "../../common/helper/common-functions";
import { HttpErrorType } from "../../common/helper/enum";
import { WhereOptions } from "sequelize";

export class QuestionService {
  public constructor(private readonly questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository;
  }

  public getAllQuestions = async (): Promise<Question[]> => {
    return await this.questionRepository.getAllQuestions();
  };

  public getQuestion = async (req: Request): Promise<Question | null> => {
    const { id } = req.params;
    const where = { id } as WhereOptions;
    return await this.questionRepository.getQuestion(where);
  };

  public createQuestion = async (questionData: Question): Promise<Question | Error> => {
    const options = _.get(questionData, "options", []);
    const answer = _.trim(_.get(questionData, "answer", ""));
    const isAnswerInTheArray = _.some(options, { name: answer });
    if (!isAnswerInTheArray) {
      return ThrowError(HttpErrorType.AnswerShouldBeFromOptionProvided);
    }
    return await this.questionRepository.addQuestion(questionData);
  };

  public updateQuestion = async (req: Request): Promise<[number]> => {
    const id = _.get(req, "params.id", 0);
    const questionData = _.get(req, "body", {});
    return await this.questionRepository.updateQuestion(questionData, Number(id));
  };

  public deleteQuestion = async (req: Request): Promise<number> => {
    const { id } = req.params;
    return await this.questionRepository.deleteQuestion(Number(id));
  };
}
