import express from "express";
import { TestRepository } from "../repository/test.repository";
import { TestService } from "../services/test-service";
import { TestController } from "../controllers/test.controller";

const testRouter: express.Router = express.Router();

const respository: TestRepository = new TestRepository();
const service: TestService = new TestService(respository);
const controller: TestController = new TestController(service);

testRouter.post("/create", controller.addTest);
testRouter.put("/update/:id", controller.updateTest);

export default testRouter;
