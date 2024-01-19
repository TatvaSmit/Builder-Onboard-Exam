import Joi from "joi";
import { IdValidationMessages } from "../../common/helper/common-functions";

const testPerformanceBody = {
  technology_id: Joi.number()
    .positive()
    .integer()
    .required()
    .messages(IdValidationMessages("technology_id")),
  start_time: Joi.date().messages({
    "string.base": "start_time must be of type Date",
    "any.required": "start_time is required",
  }),
  end_time: Joi.date().messages({
    "string.base": "start_time must be of type Date",
    "any.required": "start_time is required",
  }),
  duration: Joi.number().integer().positive(),
  score: Joi.number().integer().positive(),
  user_id: Joi.number().integer().positive().required().messages(IdValidationMessages("user_id")),
  test_id: Joi.number().integer().positive().required().messages(IdValidationMessages("test_id")),
};

export const testPerformanceSchema = {
  create: {
    body: testPerformanceBody,
  },
  updateTestPerformance: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      technology_id: Joi.number()
        .positive()
        .integer()
        .required()
        .messages(IdValidationMessages("technology_id")),
      user_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages(IdValidationMessages("user_id")),
      test_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages(IdValidationMessages("test_id")),
    },
  },
};
