import { store } from '../data/store.js';

export const getInspectionChallenge = (req, res) => {
  try {
    const challenge = store.getRoomInspection();
    res.json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitInspection = (req, res) => {
  try {
    const { foundDefectIds } = req.body; // array of string IDs
    const challenge = store.getRoomInspection();
    const allDefects = challenge.defects || [];

    const correctIdentifications = allDefects.filter(d => (foundDefectIds || []).includes(d.id));
    const score = Math.round((correctIdentifications.length / allDefects.length) * 100);

    const userId = req.user?.id || 'usr_01';
    const user = store.getUserById(userId);

    let xpGained = correctIdentifications.length * 40;
    if (score === 100) xpGained += 100; // Perfect bonus!

    if (user) {
      const newXp = (user.xp || 0) + xpGained;
      const newLevel = Math.floor(newXp / 500) + 1;
      let badges = [...(user.badges || [])];
      if (score === 100 && !badges.some(b => b.title === 'Eagle Eye Suite Inspector')) {
        badges.push({
          id: 'badge_inspector',
          title: 'Eagle Eye Suite Inspector',
          icon: 'CheckCheck',
          unlockedAt: new Date().toISOString().split('T')[0]
        });
      }
      store.updateUser(userId, { xp: newXp, level: newLevel, badges });
    }

    res.json({
      success: true,
      score,
      identifiedCount: correctIdentifications.length,
      totalCount: allDefects.length,
      xpGained,
      passed: score >= 80,
      feedback: score === 100 
        ? "Flawless inspection! You met Forbes Five-Star luxury audit standards." 
        : `Identified ${correctIdentifications.length} of ${allDefects.length} room defects. Review the missed standards!`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

