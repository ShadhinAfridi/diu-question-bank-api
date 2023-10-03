const { sign, verify } = require("jsonwebtoken");
const admin = require('firebase-admin');

module.exports.checkToken = (req, res, next) => {
  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Extract the ID token from the Authorization header
    idToken = req.headers.authorization.split(" ")[1];
  } else {
    // No ID token found in the Authorization header
    return res.status(401).json({ 
      success: 0,
      message: 'Access denied. Missing ID token.' 
    });
  }

  // Verify the ID token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // Additional processing or verification checks if needed
      next();
    })
    .catch((error) => {
      console.error('Error verifying ID token:', error);
      res.status(401).json({ 
        success: 0,
        message: 'Invalid ID token' 
      });
    });
};

module.exports.checkApi = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Get the API key from request headers

  // Compare the API key with the one in the environment variable
  if (apiKey === process.env.API_KEY) {
    next(); // Allow access to the API
  } else {
    res.status(401).json({ 
      success: 0,
      message: 'Unauthorized' 
    }); // Deny access
  }
};