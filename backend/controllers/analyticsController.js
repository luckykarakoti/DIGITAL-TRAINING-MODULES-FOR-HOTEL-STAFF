import { store } from '../data/store.js';

export const getManagerAnalytics = (req, res) => {
  try {
    const analytics = store.getAnalytics();
    const staffList = store.getUsers();
    res.json({
      success: true,
      analytics,
      staffList
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuickCards = (req, res) => {
  try {
    const cards = store.getQuickCards();
    res.json({ success: true, count: cards.length, cards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

