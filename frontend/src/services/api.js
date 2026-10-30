const API_BASE = '/api';

export const api = {
  // Auth
  async getCurrentUser() {
    const res = await fetch(`${API_BASE}/auth/me`);
    return res.json();
  },

  async login(identifier, password, expectedRole) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, email: identifier, password, expectedRole })
    });
    return res.json();
  },

  async switchDemoUser(email) {
    const res = await fetch(`${API_BASE}/auth/demo-switch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  // Staff Roles & Modules
  async getStaffRoles() {
    const res = await fetch(`${API_BASE}/roles`);
    return res.json();
  },

  async getModules(filters = {}) {
    const params = new URLSearchParams();
    if (filters.staffRole && filters.staffRole !== 'all') params.append('staffRole', filters.staffRole);
    if (filters.department && filters.department !== 'All') params.append('department', filters.department);
    if (filters.type && filters.type !== 'All') params.append('type', filters.type);
    if (filters.search) params.append('search', filters.search);

    const res = await fetch(`${API_BASE}/modules?${params.toString()}`);
    return res.json();
  },

  async getModuleById(id) {
    const res = await fetch(`${API_BASE}/modules/${id}`);
    return res.json();
  },

  async createModule(moduleData) {
    const res = await fetch(`${API_BASE}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(moduleData)
    });
    return res.json();
  },

  async updateModule(id, moduleData) {
    const res = await fetch(`${API_BASE}/modules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(moduleData)
    });
    return res.json();
  },

  async deleteModule(id) {
    const res = await fetch(`${API_BASE}/modules/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Progress & Quizzes
  async updateLessonProgress(moduleId, lessonId, isCompleted = true) {
    const res = await fetch(`${API_BASE}/progress/lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId, lessonId, isCompleted })
    });
    return res.json();
  },

  async submitQuiz(moduleId, answers) {
    const res = await fetch(`${API_BASE}/progress/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId, answers })
    });
    return res.json();
  },

  // Scenarios
  async getScenarios() {
    const res = await fetch(`${API_BASE}/scenarios`);
    return res.json();
  },

  async getScenarioById(id) {
    const res = await fetch(`${API_BASE}/scenarios/${id}`);
    return res.json();
  },

  async submitScenarioDecision(scenarioId, stageId, optionId) {
    const res = await fetch(`${API_BASE}/scenarios/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId, stageId, optionId })
    });
    return res.json();
  },

  // Room Inspection Challenge
  async getInspectionData() {
    const res = await fetch(`${API_BASE}/inspection`);
    return res.json();
  },

  async submitInspection(foundDefectIds) {
    const res = await fetch(`${API_BASE}/inspection/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foundDefectIds })
    });
    return res.json();
  },

  // Certificates
  async getCertificates(userId = null) {
    const url = userId ? `${API_BASE}/certificates?userId=${userId}` : `${API_BASE}/certificates`;
    const res = await fetch(url);
    return res.json();
  },

  async verifyCertificate(code) {
    const res = await fetch(`${API_BASE}/certificates/verify/${code}`);
    return res.json();
  },

  // Manager Analytics & Quick Cards
  async getAnalytics() {
    const res = await fetch(`${API_BASE}/analytics`);
    return res.json();
  },

  async getQuickCards() {
    const res = await fetch(`${API_BASE}/quick-cards`);
    return res.json();
  }
};

