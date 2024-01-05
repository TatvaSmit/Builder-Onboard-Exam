import { Request, Response } from "express";
import { baseController } from "../../common/helper/base.controller";
import { HttpStatusCode } from "../../common/helper/enum";
import { TechnologyService } from "../services/technology-service";

export class TechnologyController {
  public constructor(private readonly technologyService: TechnologyService) {
    this.technologyService = this.technologyService;
  }

  public getAllTechnologies = async (req: Request, res: Response): Promise<Response> => {
    const technologies = await this.technologyService.getAllTechnologies();
    return baseController.getResult(res, HttpStatusCode.Ok, technologies);
  };

  public addNewTechnology = async (req: Request, res: Response): Promise<Response> => {
    const technology = await this.technologyService.addNewTechnology(req.body);
    return baseController.getResult(res, HttpStatusCode.Created, technology);
  };
}
