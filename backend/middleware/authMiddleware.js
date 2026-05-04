const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({
            message: "Token failed",
        });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({
            message: "Admin access only",
        });
    }
};

// Export both functions
module.exports = { protect, adminOnly };