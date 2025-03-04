import { validate, Joi } from "express-validation";

export const createProductValidation = validate({
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  }),
});

export const updateProductValidation = validate({
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
  }),
});
