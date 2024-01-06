import express from "express";
import { TestPerformanceRepository } from "../repository/test-performance.repository";
import { TestPerformanceService } from "../services/test-performance-service";
import { TestPerformanceController } from "../controllers/test-performance.controller";

const testRouter: express.Router = express.Router();

const respository: TestPerformanceRepository = new TestPerformanceRepository();
const service: TestPerformanceService = new TestPerformanceService(respository);
const controller: TestPerformanceController = new TestPerformanceController(service);

testRouter.post("/create", controller.addTestPerformance);
testRouter.put("/update/:id", controller.updateTestPerformance);

export default testRouter;
