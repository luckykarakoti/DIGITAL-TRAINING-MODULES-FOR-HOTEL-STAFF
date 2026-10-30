import { seedUsers, seedModules, seedScenarios, seedRoomInspection, seedQuickCards, seedStaffRoles } from './seedData.js';

// In-Memory operational store
class HotelDataStore {
  constructor() {
    this.staffRoles = JSON.parse(JSON.stringify(seedStaffRoles));
    this.users = JSON.parse(JSON.stringify(seedUsers));
    this.modules = JSON.parse(JSON.stringify(seedModules));
    this.scenarios = JSON.parse(JSON.stringify(seedScenarios));
    this.roomInspection = JSON.parse(JSON.stringify(seedRoomInspection));
    this.quickCards = JSON.parse(JSON.stringify(seedQuickCards));
    this.certificates = [
      {
        certificateId: "GLP-CERT-2026-001",
        userId: "usr_01",
        userName: "Aiden Mercer",
        userDepartment: "Front Desk & Reception",
        moduleId: "FO-101",
        courseCode: "FO-101",
        moduleTitle: "Luxury Check-In Sequence & VIP Reception Protocol",
        badgeTitle: "Certified Front Desk Specialist",
        score: 100,
        issuedDate: "2026-10-20",
        expiryDate: "2027-10-20",
        verificationCode: "GLP-FD-9981-VERIFIED",
        hotel: "THE LUCKY HOTEL"
      },
      {
        certificateId: "GLP-CERT-2026-002",
        userId: "usr_01",
        userName: "Aiden Mercer",
        userDepartment: "Front Desk & Reception",
        moduleId: "FO-102",
        courseCode: "FO-102",
        moduleTitle: "PBX & Telephone Etiquette: The 3-Ring Benchmark",
        badgeTitle: "Five-Star Telephone Communications Specialist",
        score: 95,
        issuedDate: "2026-10-24",
        expiryDate: "2027-10-24",
        verificationCode: "GLP-PBX-3342-VERIFIED",
        hotel: "THE LUCKY HOTEL"
      }
    ];
  }

  // Staff roles catalog
  getStaffRoles() {
    return this.staffRoles;
  }

  // User methods
  getUsers() {
    return this.users.map(({ password, ...u }) => u);
  }

  getUserById(id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  }

  getUserByEmail(identifier) {
    if (!identifier) return null;
    const q = identifier.trim().toLowerCase();
    return this.users.find(u => 
      u.email.toLowerCase() === q || 
      (u.employeeId && u.employeeId.toLowerCase() === q) ||
      u.id.toLowerCase() === q || (q.includes('manager') && u.role === 'manager') || (q.includes('director') && u.role === 'manager')
    );
  }

  updateUser(id, updates) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updates };
    const { password, ...safeUser } = this.users[index];
    return safeUser;
  }

  addUser(userData) {
    const newUser = {
      id: `usr_${Date.now().toString(36)}`,
      ceuCredits: 0,
      completedModules: [],
      inProgressModules: [],
      hotel: "THE LUCKY HOTEL",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80",
      ...userData
    };
    this.users.push(newUser);
    const { password, ...safeUser } = newUser;
    return safeUser;
  }

  // Modules methods
  getModules(filter = {}) {
    let list = [...this.modules];
    if (filter.staffRole && filter.staffRole !== 'all') {
      list = list.filter(m => m.staffRole?.toLowerCase() === filter.staffRole.toLowerCase());
    }
    if (filter.department && filter.department !== 'All') {
      list = list.filter(m => m.department?.toLowerCase() === filter.department.toLowerCase());
    }
    if (filter.type && filter.type !== 'All') {
      list = list.filter(m => m.type?.toLowerCase() === filter.type.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.courseCode?.toLowerCase().includes(q) || 
        m.summary.toLowerCase().includes(q) || 
        m.department?.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getModuleById(id) {
    return this.modules.find(m => m.id === id || m.courseCode === id);
  }

  createModule(moduleData) {
    const id = moduleData.id || moduleData.courseCode || `MOD-${Date.now().toString(36).toUpperCase()}`;
    const newModule = {
      id,
      courseCode: moduleData.courseCode || id,
      level: "Foundational",
      duration: "25 min",
      type: "Mandatory Onboarding",
      thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      lessons: [],
      quiz: { passingScore: 80, questions: [] },
      ...moduleData
    };
    this.modules.push(newModule);
    return newModule;
  }

  updateModule(id, updates) {
    const index = this.modules.findIndex(m => m.id === id || m.courseCode === id);
    if (index === -1) return null;
    this.modules[index] = { ...this.modules[index], ...updates };
    return this.modules[index];
  }

  deleteModule(id) {
    const index = this.modules.findIndex(m => m.id === id || m.courseCode === id);
    if (index === -1) return false;
    this.modules.splice(index, 1);
    return true;
  }

  // Scenarios
  getScenarios() {
    return this.scenarios;
  }

  getScenarioById(id) {
    return this.scenarios.find(s => s.id === id);
  }

  // Room Inspection
  getRoomInspection() {
    return this.roomInspection;
  }

  // Quick SOP cards
  getQuickCards() {
    return this.quickCards;
  }

  // Certificates
  getCertificates(userId = null) {
    if (userId) {
      return this.certificates.filter(c => c.userId === userId);
    }
    return this.certificates;
  }

  getCertificateById(certId) {
    return this.certificates.find(c => c.certificateId === certId || c.verificationCode === certId);
  }

  issueCertificate(data) {
    const cert = {
      certificateId: `GLP-CERT-${Date.now().toString(36).toUpperCase()}`,
      issuedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      verificationCode: `GLP-VERIFY-${Math.floor(100000 + Math.random() * 900000)}`,
      hotel: "THE LUCKY HOTEL",
      ...data
    };
    this.certificates.unshift(cert);
    return cert;
  }

  // Analytics for Manager Dashboard
  getAnalytics() {
    const totalStaff = 84; // Realistic full luxury property count
    const totalModules = this.modules.length;
    const totalCertificates = this.certificates.length + 142;
    
    const roleStats = this.staffRoles.map(role => {
      const modulesInRole = this.modules.filter(m => m.staffRole === role.id).length;
      return {
        roleId: role.id,
        roleTitle: role.title,
        staffCount: role.staffCount,
        modulesCount: modulesInRole,
        complianceRate: Math.floor(82 + Math.random() * 14),
        overdueCount: Math.floor(Math.random() * 3)
      };
    });

    return {
      overview: {
        totalStaff,
        totalModules,
        overallComplianceRate: 89,
        activeTrainingHoursThisMonth: 1280,
        totalCertificatesIssued: totalCertificates
      },
      roleStats,
      complianceAlerts: [
        {
          id: "alert-1",
          severity: "high",
          title: "Allergen Management Recertification Due",
          message: "5 F&B Service staff members have annual Big-9 allergen safety compliance expiring in 7 days."
        },
        {
          id: "alert-2",
          severity: "medium",
          title: "Code Red Fire Evacuation Drill Simulation",
          message: "Night Housekeeping shift has achieved 94% completion of mandatory fire drill protocol."
        }
      ]
    };
  }
}

export const store = new HotelDataStore();
