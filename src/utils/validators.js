const Joi = require('joi');

module.exports.loginSchema = Joi.object({
    credential: Joi.alternatives().try(
        Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .messages({
                'string.email': `Enter correct email format`,
            }),
        Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .messages({
                'string.alphanum': `Username must only contain alphanumeric characters`,
                'string.min': `Username should be at least 3 characters long`,
                'string.max': `Username cannot exceed 30 characters`,
            })
    ).required(),
    passcode: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': `Password should contain at least 8 characters`,
            'any.required': `Password field is required`,
        }),
});
