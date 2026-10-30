import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'development-only-change-this-secret-32-chars';

export const protect = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required. Please log in.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: 'Session expired or invalid. Please log in again.' });
  }
};

export const requireManager = (req, res, next) => {
  if (req.user && ['manager', 'admin'].includes(req.user.role)) return next();
  return res.status(403).json({ message: 'Access denied: Manager or Administrator clearance required' });
};
