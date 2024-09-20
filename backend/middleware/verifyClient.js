//* Middleware to check if the user is a client

function verifyClient(req, res, next) {
    // Check if req.user exists and if their role is 'client'
    if (req.user && req.user.role === 'client') {
      return next(); 
    }
  
    return res.status(403).json({ error: "Access denied." });
  }
  
  module.exports = verifyClient;