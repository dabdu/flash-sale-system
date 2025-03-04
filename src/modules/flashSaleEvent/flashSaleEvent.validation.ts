import { validate, Joi } from "express-validation";

export const createFlashSaleEventValidation = validate({
  body: Joi.object({
    product: Joi.string().required(), // Product ID as a string
    allocatedUnits: Joi.number().required(),
    saleStart: Joi.date().required(),
    saleEnd: Joi.date().required(),
  }),
});

export const updateFlashSaleEventValidation = validate({
  body: Joi.object({
    saleStart: Joi.date(),
    saleEnd: Joi.date(),
  }),
});
