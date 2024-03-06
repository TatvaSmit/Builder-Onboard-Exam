import express, { RequestHandler } from "express";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user-service";
import { UserController } from "../controllers/user.controller";
import { celebrate } from "celebrate";
import { userSchema } from "../validation-schemas/user-schema";
import expressAsyncHandler from "express-async-handler";
import { validateTokenHandler } from "../../common/helper/middleware";

const { register, login, resetPassword } = userSchema;
const userRouter: express.Router = express.Router();
const repository: UserRepository = new UserRepository();
const service: UserService = new UserService(repository);
const controller: UserController = new UserController(service);

userRouter.post(
  "/create",
  celebrate(register),
  expressAsyncHandler(controller.registerUser as RequestHandler)
);
userRouter.post(
  "/login",
  celebrate(login),
  expressAsyncHandler(controller.loginUser as RequestHandler)
);
userRouter.put(
  "/reset-password",
  celebrate(resetPassword),
  expressAsyncHandler(controller.resetPassword as RequestHandler)
);
userRouter.use(validateTokenHandler);
userRouter.get("/getUserDetails", expressAsyncHandler(controller.getUserDetails as RequestHandler));
export default userRouter;
