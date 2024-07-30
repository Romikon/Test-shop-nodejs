const Joi = require('joi');

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  sex: Joi.string().required(),
  age: Joi.number().required(),
  password: Joi.string().min(8).required()
});

const productsSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  weight_in_kg: Joi.number().required()
});

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value['body'] = value;
    next();
  };
};

module.exports = {
  validateRequest,
  registrationSchema,
  productsSchema
};
