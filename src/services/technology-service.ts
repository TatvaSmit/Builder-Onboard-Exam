import { Request } from "express";
import { Technology } from "../models/technology";
import { TechnologyRepository } from "../repository/technology.repository";
import _ from "lodash";
import { ThrowError } from "../../common/helper/common-functions";
import { HttpErrorType } from "../../common/helper/enum";
import { WhereOptions } from "sequelize";

export class TechnologyService {
  public constructor(private readonly technologyRepository: TechnologyRepository) {
    this.technologyRepository = technologyRepository;
  }

  public getAllTechnologies = async (): Promise<Technology[]> => {
    return await this.technologyRepository.getAllTechnologies();
  };

  public getTechnology = async (req: Request): Promise<Technology | null> => {
    const { id } = req.params;
    const where = { id } as WhereOptions;
    return this.technologyRepository.getTechnology(where);
  };

  public addNewTechnology = async (technology: Technology): Promise<Technology | Error> => {
    const technologyList = await this.getAllTechnologies();
    const isDuplicateName = _.filter(technologyList, (e: Technology) => {
      return _.toUpper(e.name) === _.toUpper(technology.name);
    });
    if (isDuplicateName.length) {
      return ThrowError(HttpErrorType.DuplicateTechnologyName);
    }
    return await this.technologyRepository.addTechnology(technology);
  };

  public updateTechnology = async (req: Request): Promise<[number]> => {
    const { id } = req.params;
    return await this.technologyRepository.updateTechnology(req.body, Number(id));
  };
}
