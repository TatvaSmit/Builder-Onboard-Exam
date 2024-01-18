import express, { RequestHandler } from "express";
import { TestPerformanceRepository } from "../repository/test-performance.repository";
import { TestPerformanceService } from "../services/test-performance-service";
import { TestPerformanceController } from "../controllers/test-performance.controller";
import { testPerformanceSchema } from "../validation-schemas/test-performance-schema";
import { celebrate } from "celebrate";
import expressAsyncHandler from "express-async-handler";
import { validateTokenHandler } from "../../common/helper/middleware";

const { create, updateTestPerformance } = testPerformanceSchema;
const testPerformanceRouter: express.Router = express.Router();
const respository: TestPerformanceRepository = new TestPerformanceRepository();
const service: TestPerformanceService = new TestPerformanceService(respository);
const controller: TestPerformanceController = new TestPerformanceController(service);

testPerformanceRouter.post(
  "/create",
  celebrate(create),
  expressAsyncHandler(controller.addTestPerformance as RequestHandler)
);
testPerformanceRouter.put(
  "/update/:id",
  celebrate(updateTestPerformance),
  expressAsyncHandler(controller.updateTestPerformance as RequestHandler)
);

export default testPerformanceRouter;
