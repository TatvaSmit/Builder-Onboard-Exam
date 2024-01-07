import { Technology } from "../models/technology";
import * as db from "../index";

export class TechnologyRepository {
  public getAllTechnologies = async (): Promise<Technology[]> => {
    return await db.Technology.findAll();
  };

  public addTechnology = async (params: Technology): Promise<Technology> => {
    return await db.Technology.create(params as Technology | any);
  };
}
