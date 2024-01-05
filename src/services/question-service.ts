import { Request } from "express";
import { Question } from "../models/question";
import { QuestionRepository } from "../repository/question.respository";

export class QuestionService {
  public constructor(private readonly questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository;
  }

  public getAllQuestions = async (): Promise<Question[]> => {
    return await this.questionRepository.getAllQuestions();
  };

  public getQuestion = async (req: Request): Promise<Question | null> => {
    const { id } = req.params;
    return await this.questionRepository.getQuestion(Number(id));
  };

  public createQuestion = async (questionData: Question): Promise<Question> => {
    return await this.questionRepository.addQuestion(questionData);
  };

  public updateQuestion = async (req: Request): Promise<[number]> => {
    const { id } = req.params;
    const questionData = req.body;
    return await this.questionRepository.updateQuestion(questionData, Number(id));
  };

  public deleteQuestion = async (req: Request): Promise<number> => {
    const { id } = req.params;
    return await this.questionRepository.deleteQuestion(Number(id));
  };
}
