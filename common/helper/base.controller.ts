import { Response } from "express";
import { HttpStatusCode } from "./enum";

class BaseController {
  public getResult<T>(res: Response, code: HttpStatusCode, data: T): Response {
    return res.status(code).json(data);
  }

  public getErrorResult(
    res: Response,
    code: HttpStatusCode,
    key: string,
    message?: string
  ): Response {
    return res.status(code).json({ key, message });
  }
}

export const baseController = new BaseController();
