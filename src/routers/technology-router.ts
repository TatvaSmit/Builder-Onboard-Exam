import express from "express";
import { TechnologyRepository } from "../repository/technology.repository";
import { TechnologyService } from "../services/technology-service";
import { TechnologyController } from "../controllers/technology.controller";

const technologyRouter: express.Router = express.Router();

const repository: TechnologyRepository = new TechnologyRepository();
const service: TechnologyService = new TechnologyService(repository);
const controller: TechnologyController = new TechnologyController(service);

technologyRouter.get("/getAll", controller.getAllTechnologies);

export default technologyRouter;
