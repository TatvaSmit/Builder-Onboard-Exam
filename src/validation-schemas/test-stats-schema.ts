import Joi from "joi";
import { IdValidationMessages } from "../../common/helper/common-functions";

const testStatsBody = {
  selected_answer: Joi.string().required().messages({ "any.required": "selected_answer is required" }),
  technology_id: Joi.number()
    .positive()
    .integer()
    .required()
    .messages(IdValidationMessages("technology_id")),
  test_id: Joi.number().positive().integer().required().messages(IdValidationMessages("test_id")),
  user_id: Joi.number().positive().integer().required().messages(IdValidationMessages("user_id")),
  question_id: Joi.number()
    .positive()
    .integer()
    .required()
    .messages(IdValidationMessages("question_id")),
};

export const testStatsSchema = {
  create: {
    body: testStatsBody,
  },
  updateTestStats: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: testStatsBody,
  },
};
