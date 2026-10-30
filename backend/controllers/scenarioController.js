import { store } from '../data/store.js';

export const getScenarios = (req, res) => {
  try {
    const list = store.getScenarios();
    res.json({ success: true, count: list.length, scenarios: list });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScenarioById = (req, res) => {
  try {
    const scenario = store.getScenarioById(req.params.id);
    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }
    res.json({ success: true, scenario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitScenarioDecision = (req, res) => {
  try {
    const { scenarioId, stageId, optionId } = req.body;
    const scenario = store.getScenarioById(scenarioId);

    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }

    const stage = scenario.stages.find(s => s.stageId === stageId);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    const option = stage.options.find(o => o.id === optionId);
    if (!option) {
      return res.status(404).json({ message: 'Option not found' });
    }

    // Award bonus XP if best choice
    const userId = req.user?.id || 'usr_01';
    const user = store.getUserById(userId);
    let xpGained = option.isBest ? 100 : 25;
    if (user) {
      store.updateUser(userId, { xp: (user.xp || 0) + xpGained });
    }

    res.json({
      success: true,
      option,
      isBest: option.isBest,
      scoreDelta: option.scoreDelta,
      feedback: option.feedback,
      nextStageId: option.nextStageId || null,
      xpGained
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

