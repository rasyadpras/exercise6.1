const jwt = require('jsonwebtoken');
const { ResponseTemplate } = require('../template/response');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        let resp = ResponseTemplate(null, 'user unauthorized', null, 400);
        return res.status(400).json(resp);
    }

    try {
        const user = await jwt.verify(authorization, process.env.SECRET_KEY)
        req.user = user;
        next();
    } catch (error) {
        let resp = ResponseTemplate(null, 'user not authorized', error, 401);
        return res.status(401).json(resp);
    }
};