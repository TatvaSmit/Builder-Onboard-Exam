import { Technology } from "../models/technology";
import { TechnologyRepository } from "../repository/technology.repository";

export class TechnologyService {
  public constructor(private readonly technologyRepository: TechnologyRepository) {
    this.technologyRepository = technologyRepository;
  }

  public getAllTechnologies = async (): Promise<Technology[]> => {
    return await this.technologyRepository.getAllTechnologies();
  };

  public addNewTechnology = async (technology: Technology): Promise<Technology> => {
    return await this.technologyRepository.addTechnology(technology);
  };
}
