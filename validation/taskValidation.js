const Joi = require("joi");

const taskValidationSchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  status: Joi.string().valid("pending", "in-progress", "completed"),
});

const taskStatusValidationSchema = Joi.object({
  status: Joi.string().valid("pending", "in-progress", "completed").required(),
});

module.exports = {
  taskValidationSchema,
  taskStatusValidationSchema,
};
