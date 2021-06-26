import Joi from "joi";

export const validateProduct = (data) => {
  const schema = Joi.object({
    product_name: Joi.string().required().messages({
      "string.required": "product_name is required",
      "string.base": "product_name must be a string",
    }),
    product_description: Joi.string().required().messages({
      "string.required": "product_description is required",
      "string.base": "product_description must be a string",
    }),
    product_varieties: Joi.array()
      .items({
        size: Joi.string().required(),
        color: Joi.string().required(),
        quantity: Joi.string().required(),
        images: Joi.array().required(),
        price: Joi.string().required(),
      })
      .required(),
    show: Joi.boolean().required(),
  });

  return schema.validate(data);
};

export const validateUpdateProduct = (data) => {
  const schema = Joi.object({
    product_name: Joi.string().required().messages({
      "string.required": "product_name is required",
      "string.base": "product_name must be a string",
    }),
    product_description: Joi.string().required().messages({
      "string.required": "product_description is required",
      "string.base": "product_description must be a string",
    }),
    show: Joi.boolean().required(),
  });

  return schema.validate(data);
};
