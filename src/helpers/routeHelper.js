import Joi from 'joi';

export const validateBody = schema => {
    return (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).json({
                message: 'Error occured',
                error: result.error
            });
        }

        if (!req.value) {
            req.value = {};
        }
        req.value.body = result.value;
        next();
    };
};
export const authSchema = Joi.object().keys({
    username: Joi.string()
        .required()
        .min(6)
        .max(30),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
        .min(6)
        .max(30)
});
