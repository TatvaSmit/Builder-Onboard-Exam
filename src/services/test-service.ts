import { Request } from "express";
import { Test } from "../models/test";
import { TestRepository } from "../repository/test.repository";

export class TestService {
  public constructor(private readonly testRepository: TestRepository) {
    this.testRepository = testRepository;
  }

  public getAllTest = async (): Promise<Test[]> => {
    return await this.testRepository.getAllTest();
  };

  public getTest = async (req: Request): Promise<Test | null> => {
    const { id } = req.params;
    return this.testRepository.getTest(Number(id));
  };

  public addTest = async (params: Test | any): Promise<Test> => {
    const { name, technology_id, duration, score }: Test = params;
    return await this.testRepository.addTest(
      { name, technology_id, duration, score } as Test,
      params.questions
    );
  };
}
