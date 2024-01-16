import { HttpErrorType } from "./enum";

const ThrowError = (errorType: HttpErrorType, message?: string): Promise<Error> => {
  const error = new Error(errorType);
  error.name = errorType;
  if (message) {
    error.message = message;
  }
  return Promise.reject(error);
};

const IdValidationMessages = (key: string) => {
  return {
    "string.base": `${key} should be number`,
    "string.positive": `${key} must be positive integer`,
    "string.integer": `${key} must be integer`,
    "any:required": `${key} is required`,
  };
};

export { ThrowError, IdValidationMessages };
