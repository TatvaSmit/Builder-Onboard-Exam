import express, { RequestHandler } from "express";
import { TestStatsRepository } from "../repository/test-stats.repository";
import { TestStatsService } from "../services/test-stats-service";
import { TestStatsController } from "../controllers/test-stats.controller";
import { testStatsSchema } from "../validation-schemas/test-stats-schema";
import { celebrate } from "celebrate";
import expressAsyncHandler from "express-async-handler";
import { validateTokenHandler } from "../../common/helper/middleware";

const { create, updateTestStats } = testStatsSchema;
const testStatsRouter = express.Router();
const respository: TestStatsRepository = new TestStatsRepository();
const service: TestStatsService = new TestStatsService(respository);
const controller: TestStatsController = new TestStatsController(service);

testStatsRouter.post(
  "/create",
  celebrate(create),
  expressAsyncHandler(controller.addTestStats as RequestHandler)
);
testStatsRouter.put(
  "/update/:id",
  celebrate(updateTestStats),
  expressAsyncHandler(controller.updateStats as RequestHandler)
);

export default testStatsRouter;
