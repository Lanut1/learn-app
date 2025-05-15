import Joi from "joi";
import { LoginCredentials } from "../types/auth.types";

export const loginSchema = Joi.object<LoginCredentials>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email address",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
