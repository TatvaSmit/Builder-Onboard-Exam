import express from "express";
import { QuestionRepository } from "../repository/question.respository";
import { QuestionService } from "../services/question-service";
import { QuestionController } from "../controllers/question.controller";

const questionRouter: express.Router = express.Router();
const respository: QuestionRepository = new QuestionRepository();
const service: QuestionService = new QuestionService(respository);
const controller: QuestionController = new QuestionController(service);

questionRouter.get("/getAll", controller.getAllQuestions);
questionRouter.post("/create", controller.createQuestion);

export default questionRouter;
