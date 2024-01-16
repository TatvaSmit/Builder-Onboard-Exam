import express, { RequestHandler } from "express";
import { QuestionRepository } from "../repository/question.respository";
import { QuestionService } from "../services/question-service";
import { QuestionController } from "../controllers/question.controller";
import { questionSchema } from "../validation-schemas/question-schema";
import { celebrate } from "celebrate";
import expressAsyncHandler from "express-async-handler";
import { validateAdminUser, validateTokenHandler } from "../../common/helper/middleware";

const { create, questionId, updateQuestion } = questionSchema;
const questionRouter: express.Router = express.Router();
const respository: QuestionRepository = new QuestionRepository();
const service: QuestionService = new QuestionService(respository);
const controller: QuestionController = new QuestionController(service);

questionRouter.get(
  "/getAll",
  validateTokenHandler,
  validateAdminUser,
  expressAsyncHandler(controller.getAllQuestions as RequestHandler)
);
questionRouter.get(
  "/getQuestion/:id",
  validateTokenHandler,
  celebrate(questionId),
  expressAsyncHandler(controller.getQuestion as RequestHandler)
);
questionRouter.post(
  "/create",
  validateTokenHandler,
  validateAdminUser,
  celebrate(create),
  expressAsyncHandler(controller.createQuestion as RequestHandler)
);
questionRouter.put(
  "/update/:id",
  celebrate(updateQuestion),
  expressAsyncHandler(controller.updateQuestion as RequestHandler)
);
questionRouter.delete(
  "/delete/:id",
  celebrate(updateQuestion),
  expressAsyncHandler(controller.deleteQuestion as RequestHandler)
);

export default questionRouter;
