const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        let token;

        // Get token from headers
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        // No token
        if (!token) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user data
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Token failed",
        });
    }
};

module.exports = protect;