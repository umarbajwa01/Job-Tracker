const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

// Protects a route — only requests with a valid JWT can proceed.
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expected format: "Authorization: Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Not authorized, no token provided', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user id to req, so later controllers know who's making the request.
    req.userId = decoded.id;
    next();
  } catch (err) {
    // jwt.verify throws automatically if the token is invalid or expired.
    // errorHandler.js already has specific handling for JsonWebTokenError / TokenExpiredError.
    next(err);
  }
};

module.exports = protect;