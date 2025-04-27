import Joi from "joi";

const passwordValidation = Joi.string()
  .min(8)
  .required()
  .custom((value, helpers) => {
    if (!/[A-Z]/.test(value)) {
      return helpers.error("password.uppercase");
    }
    if (!/[a-z]/.test(value)) {
      return helpers.error("password.lowercase");
    }
    if (!/[0-9]/.test(value)) {
      return helpers.error("password.number");
    }
    if (!/[\W_]/.test(value)) {
      return helpers.error("password.special");
    }
    return value;
  })
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "password.uppercase": "Password must contain at least one uppercase letter",
    "password.lowercase": "Password must contain at least one lowercase letter",
    "password.number": "Password must contain at least one number",
    "password.special": "Password must contain at least one special character",
  });

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
