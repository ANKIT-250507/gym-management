const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;

            next();

        } catch (error) {

            return res.status(401).json({
                message: "Invalid Token"
            });

        }

    }

    if (!token) {

        return res.status(401).json({
            message: "No Token, Authorization Denied"
        });

    }

};

const authorize = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};

module.exports = {
    protect,
    authorize
};