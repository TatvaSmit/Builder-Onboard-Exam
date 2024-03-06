import { Request } from "express";
import { User } from "../../src";

enum UserRoles {
  Developer = "developer",
  Admin = "admin",
}

enum ExamStatus {
  pending = "pending",
  completed = "completed",
}

enum HttpStatusCode {
  Created = 201,
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
  Conflict = 409,
  Forbidden = 403,
  Unauthorized = 401,
  ServerError = 500,
  DuplicateEntry = 409,
}

enum HttpErrorType {
  UserDoesnotExist = "Email is not registered",
  UserAlreadyRegistered = "User already registered with this email",
  BadRequest = "bad request",
  ServerError = "Server Error",
  TokenNotAddedInRequest = "Token Not Added In Request",
  UnauthorizedRole = "Unauthorized Role",
  AuthHeaderIsNotAdded = "AuthHeader Is Not Added",
  TokenIsExpiredOrInvalid = "Token Is Expired Or Invalid",
  ExamTimeUp = "Exam Time Up",
  NewPasswordCanTBeSameAsOld = "NewPassword Can'T Be Same As Old",
  TestStatsAlreadyExist = "TestStats Already Exist",
  TestQuestionsNotProvided = "Test Questions Not Provided",
  OptionArrayIsNotFormatted = "Option Array Is Not Formatted",
  AnswerShouldBeFromOptionProvided = "Answer Should Be From Option Provided",
  PasswordIncorrect = "Password is incorrect",
  DuplicateTechnologyName = "Entered Technology Already Exists",
}

interface IErrorResponse {
  statusCode: number;
  message: string;
}

interface IOptions {
  name: string;
}

interface UserRequest extends Request {
  user?: User;
}

export {
  UserRoles,
  HttpStatusCode,
  HttpErrorType,
  IErrorResponse,
  ExamStatus,
  IOptions,
  UserRequest,
};
