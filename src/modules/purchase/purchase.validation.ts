import { validate, Joi } from "express-validation";

export const createPurchaseValidation = validate({
  body: Joi.object({
    flashSaleEvent: Joi.string().required(), // FlashSaleEvent ID
    quantity: Joi.number().required(),
  }),
});

export const updatePurchaseValidation = validate({
  body: Joi.object({
    quantity: Joi.number(),
  }),
});
