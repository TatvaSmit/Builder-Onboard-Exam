import Joi from "joi";
import { IdValidationMessages } from "../../common/helper/common-functions";

export const testSchema = {
  create: {
    body: {
      name: Joi.string().required().messages({
        "string.base": "name should be string",
        "any.required": "name is required",
      }),
      technology_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages(IdValidationMessages("technology_id")),
      duration: Joi.number()
        .integer()
        .positive()
        .required()
        .messages(IdValidationMessages("duration")),
      questions: Joi.array().items(
        Joi.object({
          id: Joi.number().integer().positive().required().messages(IdValidationMessages("id")),
        })
      ),
    },
  },
  singleID: {
    params: {
      id: Joi.number().integer().positive().required().messages(IdValidationMessages("id")),
    },
  },
};
