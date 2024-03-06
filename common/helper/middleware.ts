import { Request, Response, NextFunction, RequestHandler } from "express";
import { baseController } from "./base.controller";
import { HttpErrorType, HttpStatusCode, IErrorResponse, UserRequest, UserRoles } from "./enum";
import jwt from "jsonwebtoken";
import { SecreteKey } from "../config/app-config";
import { ThrowError } from "./common-functions";
import expressAsyncHandler from "express-async-handler";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorResult = getErrorInfo(err);
  return baseController.getErrorResult(res, errorResult.statusCode, errorResult.message);
};

const getErrorInfo = (error: Error) => {
  console.log("UNCAUGHT ERROR ===========", error);
  const errorMessage = error.message;
  let errorResponse = {} as IErrorResponse;
  switch (errorMessage) {
    case HttpErrorType.UnauthorizedRole:
      errorResponse.message = "only admin can perform this action";
      errorResponse.statusCode = HttpStatusCode.Unauthorized;
      break;
    case HttpErrorType.TokenNotAddedInRequest:
      errorResponse.message = "token is required";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.TokenIsExpiredOrInvalid:
      errorResponse.message = "token is either expired or invalid";
      errorResponse.statusCode = HttpStatusCode.Unauthorized;
      break;
    case HttpErrorType.AuthHeaderIsNotAdded:
      errorResponse.message = "authorization header is missing in the request";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.UserAlreadyRegistered:
      errorResponse.message = "user with this email already exists";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.UserDoesnotExist:
      errorResponse.message = "account associated with provided email doesnot exist";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.ExamTimeUp:
      errorResponse.message = "exam time has been expired, your exam has been already submitted";
      errorResponse.statusCode = HttpStatusCode.Forbidden;
      break;
    case HttpErrorType.NewPasswordCanTBeSameAsOld:
      errorResponse.message = "old password and new password can't be the same";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.TestStatsAlreadyExist:
      errorResponse.message = "test stats is already exist";
      errorResponse.statusCode = HttpStatusCode.Conflict;
      break;
    case HttpErrorType.TestQuestionsNotProvided:
      errorResponse.message = "please provide questions array in the request body";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.OptionArrayIsNotFormatted:
      errorResponse.message = "each options should be separated with | (pipe)";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.AnswerShouldBeFromOptionProvided:
      errorResponse.message = "answer should match with the one of the provided options";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.PasswordIncorrect:
      errorResponse.message = "provided user password is invalid";
      errorResponse.statusCode = HttpStatusCode.BadRequest;
      break;
    case HttpErrorType.DuplicateTechnologyName:
      errorResponse.message = "Technology with the provided name already exists"
      errorResponse.statusCode = HttpStatusCode.DuplicateEntry
      break;
    default:
      HttpErrorType.ServerError;
      errorResponse.message = "Internal Server Error";
      errorResponse.statusCode = HttpStatusCode.ServerError;
  }
  return errorResponse;
};

const tokenVerifyRequestHandler = async (req: UserRequest, res: Response, next: NextFunction) => {
  let token: string;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return ThrowError(HttpErrorType.TokenNotAddedInRequest);
    }
    try {
      let decoded: any = jwt.verify(token, SecreteKey);
      req.user = decoded.user;
      next();
    } catch (error) {
      return ThrowError(HttpErrorType.TokenIsExpiredOrInvalid);
    }
  } else {
    return ThrowError(HttpErrorType.AuthHeaderIsNotAdded);
  }
};

const roleAuthorizationHandle = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { role } = req.user!;
  if (role === UserRoles.Admin) {
    next();
  } else {
    return ThrowError(HttpErrorType.UnauthorizedRole);
  }
};

const validateTokenHandler = expressAsyncHandler(tokenVerifyRequestHandler as RequestHandler);
const validateAdminUser = expressAsyncHandler(roleAuthorizationHandle as RequestHandler);
export { errorHandler, validateTokenHandler, validateAdminUser };
