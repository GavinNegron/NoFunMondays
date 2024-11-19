//Validation
const Joi = require('@hapi/joi');

//Register Validation
exports.registerValidation = data => {
    const schema = Joi.object({
        username: Joi
            .string()
            .min(4)
            .max(20)
            .required()
            .messages({
                'string.base': "Username contains invalid characters!",
                'string.empty': "Please fill out all fields!",
                'string.min': "Username must be more than 4 characters long!",
                'string.max': "Username must be less than 20 characters long!"
            }),
        email: Joi
            .string()
            .required()
            .email()
            .messages({
                'string.base': "Email contains invalid characters!",
                'string.empty': "Please fill out all fields!",
                'string.email': "Email is not valid!"
            }),
        password: Joi
            .string()
            .min(10)
            .max(40)
            .required()
            .messages({
                'string.empty': "Please fill out all fields!",
                'string.min': "Password must be more than 10 characters long!",
                'string.max': "Password must be less than 40 characters long!"
            }),
        'confirm_password': Joi
        .string()
        .min(10)
        .max(40)
        .required()
        .messages({
            'string.empty': "Please fill out all fields!",
            'string.min': "Password must be more than 10 characters long!",
            'string.max': "Password must be less than 40 characters long!"
        }),    
    });
    return schema.validate(data);
}

//Login Validation
exports.loginValidation = data => {
    const schema = Joi.object({
        email: Joi
            .string()
            .required()
            .email()
            .messages({
                'string.empty': "Please fill out all fields!",
                'string.email': "Email or password is not valid!"
            }),
        password: Joi
            .string()
            .required()
            .messages({
                'string.empty': "Please fill out all fields!",
                'string.email': "Email or password is not valid!"
            }),
    })
    return schema.validate(data);
};

exports.newPasswordValidate = data => {
    const schema = Joi.object({
        password: Joi
            .string()
            .min(10)
            .max(40)
            .required()
            .messages({
                'string.empty': "Please fill out all fields!",
                'string.min': "Password must be more than 10 characters long!",
                'string.max': "Password must be less than 40 characters long!"
            }),
        'confirm_password': Joi
        .string()
        .min(10)
        .max(40)
        .required()
        .messages({
            'string.empty': "Please fill out all fields!",
            'string.min': "Password must be more than 10 characters long!",
            'string.max': "Password must be less than 40 characters long!"
        }),    
    });
    return schema.validate(data);
};