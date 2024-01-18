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
}

enum HttpErrorType {
  UserDoesnotExist = "Email is not registered",
  UserAlreadyRegistered = "User already registered with this email",
  BadRequest = "bad request",
  ServerError = "Server Error",
  TokenNotAddedInRequest = "TokenNotAddedInRequest",
  UnauthorizedRole = "UnauthorizedRole",
  AuthHeaderIsNotAdded = "AuthHeaderIsNotAdded",
  TokenIsExpiredOrInvalid = "TokenIsExpiredOrInvalid",
  ExamTimeUp = "ExamTimeUp",
  NewPasswordCanTBeSameAsOld = "NewPasswordCanTBeSameAsOld",
  TestStatsAlreadyExist = "TestStatsAlreadyExist",
  TestQuestionsNotProvided = "TestQuestionsNotProvided",
  OptionArrayIsNotFormatted = "OptionArrayIsNotFormatted",
  AnswerShouldBeFromOptionProvided = "AnswerShouldBeFromOptionProvided",
}

interface IErrorResponse {
  statusCode: number;
  message: string;
}

export { UserRoles, HttpStatusCode, HttpErrorType, IErrorResponse, ExamStatus };
