
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

const errorHandler = (req, res, next) => {
    res.sendHTTPError = (status, message) => {
        res.status(status).json({ message })
    };
    next()
};

const requireAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.sendHTTPError(403, 'Token is not provided');
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendHTTPError(401, err.message)
        }
        req.userId = decoded._id;
        next()
    })
};


module.exports = {
    errorHandler,
    requireAuth
};
