import bcrypt from 'bcrypt';

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

export const authorization = (...roles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).send();
        for (const role of roles) {
            if (req.user.role === role) return next();
        }
        return res.status(403).send();
    };
};