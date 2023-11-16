const Joi = require('joi');
const { ResponseTemplate } = require('../template/response');

function checkUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
        address: Joi.string().required(),
        member_id: Joi.number()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let resp = ResponseTemplate(null, 'invalid request',error.details[0].message, 400)
        return res.status(400).json(resp);
    };
    next();
}

module.exports = {
    checkUser
}