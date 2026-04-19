module.exports = function(req, res, next) {
  const token = req.headers.authorization;
  
  // Simple auth - check for admin token in header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Check if it matches the admin password from .env
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (token !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  next();
};
