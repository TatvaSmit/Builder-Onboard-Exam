import Joi from "joi";

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
};
