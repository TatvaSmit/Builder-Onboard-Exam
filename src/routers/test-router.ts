import express, { RequestHandler } from "express";
import { TestRepository } from "../repository/test.repository";
import { TestService } from "../services/test-service";
import { TestController } from "../controllers/test.controller";
import { testSchema } from "../validation-schemas/test-schema";
import { celebrate } from "celebrate";
import expressAsyncHandler from "express-async-handler";
import { validateAdminUser, validateTokenHandler } from "../../common/helper/middleware";

const { create, singleID } = testSchema;
const testRouter: express.Router = express.Router();
const respository: TestRepository = new TestRepository();
const service: TestService = new TestService(respository);
const controller: TestController = new TestController(service);

testRouter.get("/getAll", expressAsyncHandler(controller.getAllTest as RequestHandler));
testRouter.get(
  "/getTest/:id",
  celebrate(singleID),
  expressAsyncHandler(controller.getTest as RequestHandler)
);
testRouter.post(
  "/create",
  validateAdminUser,
  celebrate(create),
  expressAsyncHandler(controller.addTest as RequestHandler)
);

export default testRouter;
