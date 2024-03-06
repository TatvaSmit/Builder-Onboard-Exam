import express, { RequestHandler } from "express";
import { QuestionRepository } from "../repository/question.respository";
import { QuestionService } from "../services/question-service";
import { QuestionController } from "../controllers/question.controller";
import { questionSchema } from "../validation-schemas/question-schema";
import { celebrate } from "celebrate";
import expressAsyncHandler from "express-async-handler";
import { validateAdminUser } from "../../common/helper/middleware";

const { create, questionId, updateQuestion } = questionSchema;
const questionRouter: express.Router = express.Router();
const respository: QuestionRepository = new QuestionRepository();
const service: QuestionService = new QuestionService(respository);
const controller: QuestionController = new QuestionController(service);

questionRouter.get(
  "/getQuestion/:id",
  celebrate(questionId),
  expressAsyncHandler(controller.getQuestion as RequestHandler)
);
questionRouter.get("/getAll", expressAsyncHandler(controller.getAllQuestions as RequestHandler));
questionRouter.use(validateAdminUser);
questionRouter.get(
  "/getFullQuestion/:id",
  celebrate(questionId),
  expressAsyncHandler(controller.getFullQuestion as RequestHandler)
);
questionRouter.post(
  "/create",
  celebrate(create),
  expressAsyncHandler(controller.createQuestion as RequestHandler)
);
questionRouter.put(
  "/update/:id",
  celebrate(updateQuestion),
  expressAsyncHandler(controller.updateQuestion as RequestHandler)
);
// questionRouter.delete(
//   "/delete/:id",
//   celebrate(questionId),
//   expressAsyncHandler(controller.deleteQuestion as RequestHandler)
// );

export default questionRouter;
