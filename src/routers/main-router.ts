import express from "express";
import userRouter from "./user-router";
import questionRouter from "./question-router";

const mainRouter: express.Router = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/question", questionRouter);

export default mainRouter;
