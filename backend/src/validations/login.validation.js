const Joi = require('@hapi/joi');

exports.schemaLogin = Joi.object({
    username: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(4).max(1024).required(),
});