import express, { RequestHandler } from "express";
import { TechnologyRepository } from "../repository/technology.repository";
import { TechnologyService } from "../services/technology-service";
import { TechnologyController } from "../controllers/technology.controller";
import { celebrate } from "celebrate";
import { technologySchema } from "../validation-schemas/technology-schema";
import { validateAdminUser, validateTokenHandler } from "../../common/helper/middleware";
import expressAsyncHandler from "express-async-handler";

const { create } = technologySchema;
const technologyRouter: express.Router = express.Router();
const repository: TechnologyRepository = new TechnologyRepository();
const service: TechnologyService = new TechnologyService(repository);
const controller: TechnologyController = new TechnologyController(service);

technologyRouter.get(
  "/getAll",
  validateTokenHandler,
  expressAsyncHandler(controller.getAllTechnologies as RequestHandler)
);
technologyRouter.post(
  "/create",
  validateTokenHandler,
  validateAdminUser,
  celebrate(create),
  expressAsyncHandler(controller.addNewTechnology as RequestHandler)
);

export default technologyRouter;
