import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { baseController } from "../../common/helper/base.controller";
import { HttpStatusCode } from "../../common/helper/enum";

export class UserController {
  public constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  public registerUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.userService.addUser(req.body);
    return baseController.getResult(res, HttpStatusCode.Ok, user);
  };

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.userService.loginUser(req.body);
    return baseController.getResult(res, HttpStatusCode.Ok, token);
  };

  public resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const updateCount = await this.userService.resetPassword(req.body);
    return baseController.getResult(res, HttpStatusCode.Ok, updateCount);
  };
}
