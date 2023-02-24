const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay un token en la peticion'
        });
    }

    try {
        const { admin } = jwt.verify(token, process.env.JWT_SECRET);

        /* req.username = admin.username;
        req.email = admin.email; */

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }

    next();
}

module.exports = {
    validateJWT
}