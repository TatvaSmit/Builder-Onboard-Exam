import { Response } from "express";
import { HttpStatusCode } from "./enum";

class BaseController {
  public getResult<T>(res: Response, code: HttpStatusCode, data: T): Response {
    return res.status(code).json(data);
  }

  public getErrorResult(res: Response, code: HttpStatusCode, message?: string): Response {
    return res.status(code).json({ message });
  }
}

export const baseController = new BaseController();
