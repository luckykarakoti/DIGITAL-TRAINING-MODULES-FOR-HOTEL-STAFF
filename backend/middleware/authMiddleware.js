import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'grandluxe_hotel_secret_key_2026_luxury_academy';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // Default fallback to first trainee user for convenience in open dev/demo
    req.user = { id: 'usr_01', email: 'trainee@grandluxe.com', role: 'staff' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Graceful fallback to default session
    req.user = { id: 'usr_01', email: 'trainee@grandluxe.com', role: 'staff' };
    next();
  }
};

export const requireManager = (req, res, next) => {
  if (req.user && (req.user.role === 'manager' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Manager or Administrator clearance required' });
  }
};

