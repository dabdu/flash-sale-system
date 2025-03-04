import { validate, Joi } from "express-validation";

export const authUserValidation = validate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const updateUserValidation = validate({
  body: Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
});
