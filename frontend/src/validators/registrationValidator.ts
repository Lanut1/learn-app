import Joi from "joi";
import { passwordValidation } from "./passwordValidator";

export const studentSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),
  dob: Joi.date().optional(),
  address: Joi.string().allow("").optional(),
  password: passwordValidation,
});

export const trainerSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),
  specialization: Joi.string().required().messages({
    "string.empty": "Specialization cannot be empty",
    "any.required": "Specialization is required",
  }),
  password: passwordValidation,
});
