import { Technology } from "../models/technology";
import * as db from "../index";
import { WhereOptions } from "sequelize";

export class TechnologyRepository {
  public getAllTechnologies = async (): Promise<Technology[]> => {
    return await db.Technology.findAll();
  };

  public getTechnology = async (where: WhereOptions): Promise<Technology | null> => {
    return await db.Technology.findOne({ where });
  };

  public addTechnology = async (params: Technology): Promise<Technology> => {
    return await db.Technology.create(params as Technology | any);
  };

  public updateTechnology = async (params: Technology, id: number): Promise<[number]> => {
    return await db.Technology.update(params, { where: { id } });
  };
}
