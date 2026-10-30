import { store } from '../data/store.js';

export const updateLessonProgress = (req, res) => {
  try {
    const userId = req.user?.id || 'usr_01';
    const { moduleId, lessonId, isCompleted } = req.body;

    if (!moduleId || !lessonId) {
      return res.status(400).json({ message: 'moduleId and lessonId are required' });
    }

    const user = store.getUserById(userId);
    const module = store.getModuleById(moduleId);

    if (!user || !module) {
      return res.status(404).json({ message: 'User or Module not found' });
    }

    const totalLessons = module.lessons ? module.lessons.length : 1;
    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    const progressPercent = Math.min(100, Math.round(((lessonIndex + 1) / totalLessons) * 100));

    let inProgress = user.inProgressModules || [];
    const existingIndex = inProgress.findIndex(p => p.moduleId === moduleId);

    if (existingIndex >= 0) {
      inProgress[existingIndex] = {
        moduleId,
        progress: Math.max(inProgress[existingIndex].progress || 0, progressPercent),
        currentLessonId: lessonId
      };
    } else {
      inProgress.push({
        moduleId,
        progress: progressPercent,
        currentLessonId: lessonId
      });
    }

    // Award +50 XP for completing lesson
    const newXp = (user.xp || 0) + 50;
    const newLevel = Math.floor(newXp / 500) + 1;

    const updatedUser = store.updateUser(userId, {
      inProgressModules: inProgress,
      xp: newXp,
      level: newLevel
    });

    res.json({
      success: true,
      message: 'Lesson progress saved',
      progress: progressPercent,
      xpGained: 50,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitQuiz = (req, res) => {
  try {
    const userId = req.user?.id || 'usr_01';
    const { moduleId, answers } = req.body; // answers: { "q1": 1, "q2": 1, ... }

    const user = store.getUserById(userId);
    const module = store.getModuleById(moduleId);

    if (!user || !module) {
      return res.status(404).json({ message: 'User or Module not found' });
    }

    if (!module.quiz || !module.quiz.questions) {
      return res.status(400).json({ message: 'Module does not have a quiz configured' });
    }

    const questions = module.quiz.questions;
    let correctCount = 0;
    const results = questions.map(q => {
      const selectedAnswer = answers ? answers[q.id] : undefined;
      const isCorrect = selectedAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        questionText: q.question,
        selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const passingScore = module.quiz.passingScore || 80;
    const passed = scorePercentage >= passingScore;

    let certificate = null;
    let newBadge = null;
    let xpGained = passed ? 250 : 50;

    let updatedCompleted = [...(user.completedModules || [])];
    let updatedBadges = [...(user.badges || [])];
    let inProgress = (user.inProgressModules || []).filter(p => p.moduleId !== moduleId);

    if (passed) {
      if (!updatedCompleted.includes(moduleId)) {
        updatedCompleted.push(moduleId);
      }

      // Check badge
      const badgeTitle = module.certification?.badgeTitle || `${module.title} Expert`;
      const hasBadge = updatedBadges.some(b => b.title === badgeTitle);
      if (!hasBadge) {
        newBadge = {
          id: `badge_${Date.now()}`,
          title: badgeTitle,
          icon: module.icon || "Award",
          unlockedAt: new Date().toISOString().split('T')[0]
        };
        updatedBadges.push(newBadge);
      }

      // Issue Certificate
      certificate = store.issueCertificate({
        userId: user.id,
        userName: user.name,
        userDepartment: user.department,
        moduleId: module.id,
        moduleTitle: module.title,
        badgeTitle: module.certification?.badgeTitle || "Certified Specialist",
        score: scorePercentage
      });
    }

    const newXp = (user.xp || 0) + xpGained;
    const newLevel = Math.floor(newXp / 500) + 1;

    const updatedUser = store.updateUser(userId, {
      completedModules: updatedCompleted,
      inProgressModules: inProgress,
      badges: updatedBadges,
      xp: newXp,
      level: newLevel
    });

    res.json({
      success: true,
      passed,
      score: scorePercentage,
      passingScore,
      correctCount,
      totalQuestions: questions.length,
      xpGained,
      results,
      certificate,
      newBadge,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

