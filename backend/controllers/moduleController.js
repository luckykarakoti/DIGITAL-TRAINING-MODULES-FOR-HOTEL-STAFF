import { store } from '../data/store.js';

export const getStaffRoles = (req, res) => {
  try {
    const roles = store.getStaffRoles();
    res.json({ success: true, count: roles.length, roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getModules = (req, res) => {
  try {
    const { department, difficulty, search, staffRole, type } = req.query;
    const modules = store.getModules({ department, difficulty, search, staffRole, type });
    res.json({
      success: true,
      count: modules.length,
      modules
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getModuleById = (req, res) => {
  try {
    const { id } = req.params;
    const module = store.getModuleById(id);
    if (!module) {
      return res.status(404).json({ message: 'Training module not found' });
    }
    res.json({ success: true, module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createModule = (req, res) => {
  try {
    const { title, department, summary, difficulty, duration, lessons, quiz } = req.body;
    if (!title || !department) {
      return res.status(400).json({ message: 'Title and department are required' });
    }

    const newModule = store.createModule(req.body);
    res.status(201).json({ success: true, module: newModule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateModule = (req, res) => {
  try {
    const { id } = req.params;
    const updated = store.updateModule(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json({ success: true, module: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteModule = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = store.deleteModule(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json({ success: true, message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

