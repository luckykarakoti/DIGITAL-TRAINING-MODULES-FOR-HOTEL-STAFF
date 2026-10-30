import express from 'express';
import { login, register, getCurrentUser, demoSwitch } from '../controllers/authController.js';
import { getModules, getModuleById, createModule, updateModule, deleteModule, getStaffRoles } from '../controllers/moduleController.js';
import { updateLessonProgress, submitQuiz } from '../controllers/progressController.js';
import { getScenarios, getScenarioById, submitScenarioDecision } from '../controllers/scenarioController.js';
import { getInspectionChallenge, submitInspection } from '../controllers/inspectionController.js';
import { getUserCertificates, verifyCertificate } from '../controllers/certificateController.js';
import { getManagerAnalytics, getQuickCards } from '../controllers/analyticsController.js';
import { protect, requireManager } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/auth/me', protect, getCurrentUser);
router.post('/auth/demo-switch', demoSwitch);

// Modules & Staff Roles
router.get('/roles', getStaffRoles);
router.get('/modules', getModules);
router.get('/modules/:id', getModuleById);
router.post('/modules', protect, requireManager, createModule);
router.put('/modules/:id', protect, requireManager, updateModule);
router.delete('/modules/:id', protect, requireManager, deleteModule);

// Training Progress & Quizzes
router.post('/progress/lesson', protect, updateLessonProgress);
router.post('/progress/quiz', protect, submitQuiz);

// Interactive Scenarios
router.get('/scenarios', getScenarios);
router.get('/scenarios/:id', getScenarioById);
router.post('/scenarios/decision', protect, submitScenarioDecision);

// Room Inspection Challenge
router.get('/inspection', getInspectionChallenge);
router.post('/inspection/submit', protect, submitInspection);

// Certificates
router.get('/certificates', protect, getUserCertificates);
router.get('/certificates/verify/:code', verifyCertificate);

// Manager Analytics & Dashboard
router.get('/analytics', protect, requireManager, getManagerAnalytics);
router.get('/quick-cards', getQuickCards);

export default router;

