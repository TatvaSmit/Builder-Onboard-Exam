import { Request } from "express";
import { Test } from "../models/test";
import { TestRepository } from "../repository/test.repository";

export class TestService {
  public constructor(private readonly testRepository: TestRepository) {
    this.testRepository = this.testRepository;
  }

  public addTest = async (testData: Test): Promise<Test> => {
    return await this.testRepository.addTest(testData);
  };

  public updateTest = async (req: Request): Promise<[number]> => {
    const { id } = req.params;
    return await this.testRepository.updateTest(req.body, Number(id));
  };
}
