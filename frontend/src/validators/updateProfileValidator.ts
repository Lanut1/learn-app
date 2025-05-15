import Joi from "joi";

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  username: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  dob: Joi.date().allow(null, ""),
  address: Joi.string().allow(null, ""),
  specialization: Joi.string().allow(null, ""),
});
