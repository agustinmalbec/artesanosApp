import jwt from 'jsonwebtoken';
import environment from '../config/environment.config.js';
const generateToken = (user) => {
    return jwt.sign(user, environment.SECRET_KEY, { expiresIn: '1h' });
};

const authToken = (req, res, next) => {
    const authHeader = req.cookies.jwt;
    if (!authHeader) {
        return res.redirect('/login');
    }
    jwt.verify(authHeader, environment.SECRET_KEY, (err, credentials) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = credentials;
        next();
    });
};

export { generateToken, authToken };