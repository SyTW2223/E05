const Joi = require('@hapi/joi');

exports.schemaRegister = Joi.object({
    username: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required()
});