const jwt = require("jsonwebtoken");

const signJwt = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
}

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Erreur lors de la vérification du JWT :", error);
        return null;
    }
}

module.exports = {
    signJwt,
    verifyJwt
};