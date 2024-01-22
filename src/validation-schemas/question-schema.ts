import Joi from "joi";
import { IdValidationMessages } from "../../common/helper/common-functions";

const questionBody = {
  question: Joi.string().min(10).required().messages({
    "string.base": "question must be string",
    "string.min": "question should have at least length of 10 character",
    "any.required": "question is required",
  }),
  options: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
    })
  ),
  answer: Joi.string().required().messages({
    "string.base": "answer must be of string",
    "any.required": "answer is required",
  }),
  technology_id: Joi.number()
    .positive()
    .integer()
    .required()
    .messages(IdValidationMessages("technology_id")),
};

export const questionSchema = {
  create: {
    body: questionBody,
  },
  questionId: {
    params: {
      id: Joi.number().positive().integer().required().messages(IdValidationMessages("id")),
    },
  },
  updateQuestion: {
    params: {
      id: Joi.number().positive().integer().required().messages(IdValidationMessages("id")),
    },
    body: questionBody,
  },
};
