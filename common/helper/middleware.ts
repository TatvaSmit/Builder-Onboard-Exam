import { Request, Response, NextFunction } from "express";
import { baseController } from "./base.controller";
import { HttpStatusCode } from "./enum";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return baseController.getErrorResult(res, HttpStatusCode.BadRequest,'')
};

const getErrorInfo = (error:Error) => {
    const errorMessage = error.message;
    switch (errorMessage) {
        case "Unauthorized": break;
        case "Not Found": break;
    }
}