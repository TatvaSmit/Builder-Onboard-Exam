enum UserRoles {
  Developer = "developer",
  Admin = "admin",
}

enum QuestionType {
  mcq = "mcq",
  subjective = "subjective",
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
  BadRequest = "bad request",
}

export { UserRoles, QuestionType, HttpStatusCode, HttpErrorType };
