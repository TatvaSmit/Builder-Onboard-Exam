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
    "number.base": `${key} must be number`,
    "number.positive": `${key} must be positive integer`,
    "number.integer": `${key} must be integer`,
    "any.required": `${key} is required`,
  };
};

const convertToMilliseconds = (time: number) => {
  return time * 60 * 1000;
};

const getTimeStamps = (time: Date) => {
  return time.getTime();
};

export { ThrowError, IdValidationMessages, convertToMilliseconds, getTimeStamps };
