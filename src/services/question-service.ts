import { Question } from "../models/question";
import { QuestionRepository } from "../repository/question.respository";

export class QuestionService {
  public constructor(private readonly questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository;
  }

  public getAllQuestions = async (): Promise<Question[]> => {
    return await this.questionRepository.getAllQuestions();
  };

  public createQuestion = async (questionData: Question): Promise<Question> => {
    return await this.questionRepository.createQuestion(questionData);
  };
}
