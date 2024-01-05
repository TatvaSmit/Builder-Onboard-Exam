import express from "express";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user-service";
import { UserController } from "../controllers/user.controller";

const userRouter: express.Router = express.Router();

const repository: UserRepository = new UserRepository();
const service: UserService = new UserService(repository);
const controller: UserController = new UserController(service);

userRouter.post("/create", controller.registerUser);

export default userRouter;
