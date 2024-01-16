import Joi from "joi";
import { EMAILREGEX, PASSWORDREGX } from "../../common/helper/constant";

export const userSchema = {
  register: {
    body: {
      first_name: Joi.string().min(3).max(20).required().messages({
        "string.min": "first name should have at least 3 characters",
        "string.max": "first name should have at max 20 characters",
        "any.required": "first name is required",
      }),
      last_name: Joi.string().min(3).max(10).required().messages({
        "string.min": "last name should have at least 3 characters",
        "string.max": "last name should have at max 20 characters",
        "any.required": "last name is required",
      }),
      role: Joi.string().min(3).max(10).required().messages({
        "string.min": "role should have at least 3 characters",
        "string.max": "role should have at max 10 characters",
        "any.required": "role is required",
      }),
      email: Joi.string().regex(EMAILREGEX).required().max(100).messages({
        "string.pattern.base": "email is not valid",
        "any.required": "email is required",
      }),
      password: Joi.string().regex(PASSWORDREGX).required().max(100).messages({
        "string.pattern.base": "password is not valid",
        "any.required": "password is required",
      }),
    },
  },
  login: {
    body: {
      email: Joi.string().regex(EMAILREGEX).required().max(100).messages({
        "string.pattern.base": "email is not valid",
        "any.required": "email is required",
      }),
      password: Joi.string().regex(PASSWORDREGX).required().max(100).messages({
        "string.pattern.base": "password is not valid",
        "any.required": "password is required",
      }),
    },
  },
};
