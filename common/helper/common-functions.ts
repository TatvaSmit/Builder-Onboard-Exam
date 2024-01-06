import { HttpErrorType } from "./enum";

const ThrowError = (errorType: HttpErrorType, message?: string): Promise<Error> => {
  const error = new Error(errorType);
  error.name = errorType;
  if (message) {
    error.message = message;
  }
  return Promise.reject(error);
};

export { ThrowError };
