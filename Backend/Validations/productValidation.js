const Joi = require('joi');

const productValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            'string.base': 'Product name must be a string.',
            'string.empty': 'Product name cannot be empty.',
            'string.min': 'Product name must be at least 3 characters long.',
            'any.required': 'Product name is required.',
        }),
        price: Joi.number().greater(0).required().messages({
            'number.base': 'Price must be a number.',
            'number.greater': 'Price must be greater than zero.',
            'any.required': 'Price is required.',
        }),
        description: Joi.string().required().messages({
            'string.base': 'Description must be a string.',
            'string.empty': 'Description cannot be empty.',
            'any.required': 'Description is required.',
        }),
        // image: Joi.string().uri().required().messages({
        //     'string.base': 'Image URL must be a string.',
        //     'string.uri': 'Image URL must be a valid URL.',
        //     'any.required': 'Image URL is required.',
        // }),
        stockLevel: Joi.number().integer().min(0).required().messages({
            'number.base': 'Stock level must be an integer.',
            'number.integer': 'Stock level must be an integer without decimals.',
            'number.min': 'Stock level cannot be negative.',
            'any.required': 'Stock level is required.',
        }),

        categoryId: Joi.optional()
    });

    const { error } = schema.validate(req.body);

    console.log(error)

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = productValidation;
