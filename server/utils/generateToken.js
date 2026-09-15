const jwt = require('jsonwebtoken');
// Creates a signed JWT containing the user's id.
// This token is what the frontend will send back on every future request
// to prove "I am this logged-in user."

const generateTokens = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};
module.exports = generateTokens;