import jwt from 'jsonwebtoken';
import { store } from '../data/store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'grandluxe_hotel_secret_key_2026_luxury_academy';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const login = (req, res) => {
  try {
    const { email, employeeId, identifier, password, expectedRole } = req.body;
    const loginId = email || employeeId || identifier;
    if (!loginId) {
      return res.status(400).json({ message: 'Employee ID or Hotel Email is required' });
    }

    const user = store.getUserByEmail(loginId);
    if (!user) {
      return res.status(401).json({ message: 'User record not found. Please verify your Employee ID or Hotel Email.' });
    }

    // Role check if logging in through director portal
    if (expectedRole === 'manager' && user.role !== 'manager' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied: This portal requires Executive Management or Director credentials.' });
    }

    const token = generateToken(user);
    const { password: _, ...safeUser } = user;

    res.json({
      success: true,
      token,
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = (req, res) => {
  try {
    const { name, email, password, department, position, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const existing = store.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = store.addUser({
      name,
      email,
      password: password || 'password123',
      department: department || 'Front Office',
      position: position || 'Hospitality Associate',
      role: role || 'staff'
    });

    const token = generateToken(newUser);
    res.status(201).json({
      success: true,
      token,
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = store.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Demo quick-switch route for instant evaluator convenience
export const demoSwitch = (req, res) => {
  try {
    const { email } = req.body;
    const user = store.getUserByEmail(email || 'trainee@grandluxe.com');
    if (!user) {
      return res.status(404).json({ message: 'Demo profile not found' });
    }
    const token = generateToken(user);
    const { password: _, ...safeUser } = user;
    res.json({ success: true, token, user: safeUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

