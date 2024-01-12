import express from "express";
import userRouter from "./user-router";
import questionRouter from "./question-router";
import technologyRouter from "./technology-router";
import testRouter from "./test-router";
import testStatsRouter from "./test-stats-router";
import testPerformanceRouter from "./test-performance-router";

const mainRouter: express.Router = express.Router();
mainRouter.use("/user", userRouter);
mainRouter.use("/question", questionRouter);
mainRouter.use("/technology", technologyRouter);
mainRouter.use("/test", testRouter);
mainRouter.use("/test-stats", testStatsRouter);
mainRouter.use("/test-performance",testPerformanceRouter)

export default mainRouter;
