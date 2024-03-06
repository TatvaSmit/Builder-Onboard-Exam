import Joi from "joi";
import { IdValidationMessages } from "../../common/helper/common-functions";

export const technologySchema = {
  create: {
    body: {
      name: Joi.string().min(3).max(20).required().messages({
        "string.base": "name should be string",
        "string.min": "name should have at lease 3 character",
        "string.max": "name should have at max 20 character",
        "any.required": "name is required",
      }),
    },
  },
  update: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      duration: Joi.number()
        .integer()
        .positive()
        .required()
        .messages(IdValidationMessages("duration")),
      no_of_questions: Joi.number()
        .integer()
        .positive()
        .required()
        .messages(IdValidationMessages("no_of_questions")),
    },
  },
};
