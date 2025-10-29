const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware to verify JWT token for protected routes
 * Usage: Add as middleware to routes that require authentication
 * Example: router.post("/protected", verifyToken, controllerFunction)
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Check if authorization header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request object
    req.user = decoded;
    
    // Continue to next middleware/controller
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

/**
 * Generate access and refresh tokens
 * @param {Object} payload - Data to encode in token (e.g., username, id)
 * @returns {Object} - { accessToken, refreshToken }
 */
const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: '24h' // Token expires in 24 hours
  });
  
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: '7d' // Refresh token expires in 7 days
  });
  
  return { accessToken, refreshToken };
};

module.exports = { verifyToken, generateTokens };
