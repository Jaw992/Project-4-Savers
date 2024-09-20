//* Middleware to check if the user is a relationship manager

function verifyManager(req, res, next) {
    // Check if req.user exists and if their role is 'relationship manager'
    if (req.user && req.user.role === 'relationship manager') {
      return next(); 
    }
  
    return res.status(403).json({ error: "Access denied. You do not have permission" });
  }
  
  module.exports = verifyManager;