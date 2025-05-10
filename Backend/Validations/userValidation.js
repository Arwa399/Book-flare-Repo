const Joi = require('joi');

const userValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            'string.base': 'Username must be a string',
            'any.required': 'Username is required',
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email',
            'any.required': 'Email is required',
        }),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters',
                'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character',
                'any.required': 'Password is required',
            }),
            phone: Joi.string().pattern(/^[\d+]{7,15}$/).required().messages({
                'string.base': 'Phone must be a string',
                'string.empty': 'Phone is required',
                'string.pattern.base': 'Phone number is not valid',
                'any.required': 'Phone is required',
            }),            
        address: Joi.string().max(255).allow('').optional().messages({
            'string.base': 'Address must be a string',
            'string.max': 'Address must be at most 255 characters',
        }),
        role: Joi.string().valid('user', 'admin').when('test', { is: true, then: Joi.required() }),
        test: Joi.boolean().optional()
    });

    const { error } = schema.validate(req.body);


    console.log(error)
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = userValidation;
