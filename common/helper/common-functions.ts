import _ from "lodash";
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

// const shuffleArray = (array: any) => {
//   let shuffledArray = array.slice();
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// };

const getRandomQuestions = (array: any, size: number) => {
  const shuffledQuestions = _.shuffle(array);
  const randomQuestions = _.slice(shuffledQuestions, 0, size);
  return randomQuestions;
};
export {
  ThrowError,
  IdValidationMessages,
  convertToMilliseconds,
  getTimeStamps,
  getRandomQuestions,
};
