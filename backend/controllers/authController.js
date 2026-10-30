import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { store } from '../data/store.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.warn('[Auth] JWT_SECRET is missing or shorter than 32 characters. Set a strong secret in backend/.env.');
}
const signingSecret = JWT_SECRET || 'development-only-change-this-secret-32-chars';

const generateToken = (user) => jwt.sign(
  { id: user.id, email: user.email, role: user.role, name: user.name },
  signingSecret,
  { expiresIn: '7d' }
);

export const login = async (req, res) => {
  try {
    const { email, employeeId, identifier, password, expectedRole } = req.body;
    const loginId = email || employeeId || identifier;
    if (!loginId || !password) {
      return res.status(400).json({ message: 'Employee ID/email and password are required' });
    }
    const user = store.getUserByEmail(loginId);
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
    if (expectedRole === 'manager' && !['manager', 'admin'].includes(user.role)) {
      return res.status(403).json({ message: 'This portal requires manager credentials.' });
    }
    const token = generateToken(user);
    const { password: _password, ...safeUser } = user;
    return res.json({ success: true, token, user: safeUser });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, department, position } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (store.getUserByEmail(email)) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = store.addUser({
      name: name.trim(), email: email.trim().toLowerCase(), password: passwordHash,
      department: department || 'Front Office', position: position || 'Hospitality Associate', role: 'staff'
    });
    const token = generateToken({ ...newUser, role: 'staff' });
    return res.status(201).json({ success: true, token, user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

export const getCurrentUser = (req, res) => {
  const user = store.getUserById(req.user?.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ success: true, user });
};

export const demoSwitch = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Demo account switching is disabled in production.' });
  }
  const { email } = req.body;
  const user = store.getUserByEmail(email || 'aiden.mercer@luckyhotel.com');
  if (!user) return res.status(404).json({ message: 'Demo profile not found' });
  const token = generateToken(user);
  const { password: _password, ...safeUser } = user;
  return res.json({ success: true, token, user: safeUser });
};
