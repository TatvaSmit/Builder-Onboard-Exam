import express from "express";
import { TestStatsRepository } from "../repository/test-stats.repository";
import { TestStatsService } from "../services/test-stats-service";
import { TestStatsController } from "../controllers/test-stats.controller";

const testStatsRouter = express.Router();

const respository: TestStatsRepository = new TestStatsRepository();
const service: TestStatsService = new TestStatsService(respository);
const controller: TestStatsController = new TestStatsController(service);

testStatsRouter.post('/create',controller.addTestStats);
testStatsRouter.put('/update/:id',controller.updateStats)

export default testStatsRouter;