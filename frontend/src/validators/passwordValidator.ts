import Joi from "joi";

export const passwordValidation = Joi.string()
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
