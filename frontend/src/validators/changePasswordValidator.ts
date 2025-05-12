import Joi from "joi";
import { passwordValidation } from "./passwordValidator";

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
  }),
  newPassword: passwordValidation,
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirmation password is required",
    }),
});
