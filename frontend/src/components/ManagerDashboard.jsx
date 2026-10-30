import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  Users, 
  Award, 
  Clock, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  BookOpen, 
  X, 
  FileCheck2,
  Calendar
} from 'lucide-react';

export const ManagerDashboard = ({ onModuleCreated }) => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('front-desk');
  const [newDepartment, setNewDepartment] = useState('Front Desk & Reception');
  const [newType, setNewType] = useState('Mandatory Onboarding');
  const [newDuration, setNewDuration] = useState('20 min');
  const [newSummary, setNewSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const res = await api.getAnalytics();
      if (res.success) {
        setAnalyticsData(res.analytics);
        setStaffList(res.staffList || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    setIsSubmitting(true);
    try {
      const modulePayload = {
        title: newTitle.trim(),
        courseCode: newCourseCode.trim() || `GEN-${Math.floor(100 + Math.random() * 900)}`,
        staffRole: newStaffRole,
        department: newDepartment,
        type: newType,
        duration: newDuration,
        summary: newSummary.trim(),
        ceuCredits: 2.0,
        thumbnail: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        lessons: [
          {
            id: `lesson_${Date.now()}`,
            title: `${newTitle} Core SOP Execution`,
            duration: '10 min',
            sopObjective: 'Execute procedure in compliance with Forbes 5-Star benchmarks.',
            standards: ['Perform standard with pristine grooming, poise, and speed.'],
            procedureSteps: [
              { step: 1, action: 'Initial Preparation', detail: 'Inspect workstation and verify guest profile.' },
              { step: 2, action: 'Execution', detail: 'Follow standardized departmental checklist.' },
              { step: 3, action: 'Completion Log', detail: 'Record completed action in Opera PMS.' }
            ],
            auditChecklist: ['Was procedure completed within allocated standard time?']
          }
        ],
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: `q_${Date.now()}`,
              question: `What is the primary objective of ${newTitle}?`,
              options: [
                'Uphold hotel brand excellence with flawless personal accountability',
                'Rush the task to cut shift corners',
                'Wait for guest complaints before acting'
              ],
              correctAnswer: 0,
              explanation: 'Hospitality excellence requires proactive compliance.'
            }
          ]
        }
      };

      const res = await api.createModule(modulePayload);
      if (res.success) {
        setToastMessage('New Staff Training Course Published to LMS!');
        setTimeout(() => setToastMessage(null), 4000);
        setShowCreateModal(false);
        setNewTitle('');
        setNewSummary('');
        setNewCourseCode('');
        if (onModuleCreated) onModuleCreated(res.module);
        fetchAnalytics();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const overview = analyticsData?.overview || {};
  const roleStats = analyticsData?.roleStats || [];
  const complianceAlerts = analyticsData?.complianceAlerts || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <BarChart3 className="w-4 h-4 text-stone-700" />
            <span>Directorate of Training & Quality Standards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans font-bold text-slate-900">
            Property SOP Compliance & Audit Readiness
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Real-time departmental metrics, training certifications, and staff compliance matrices.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4 text-stone-300" />
          <span>Author New Staff Module</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-xl p-5 hotel-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Overall Audit Compliance</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">
            {overview.overallComplianceRate || 89}%
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Forbes Target: ≥ 85%
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 hotel-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Active Hotel Associates</span>
            <Users className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">
            {overview.totalStaff || 84}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across 8 hotel departments
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 hotel-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Training Hours Logged (Mo.)</span>
            <Clock className="w-4 h-4 text-stone-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">
            {overview.activeTrainingHoursThisMonth || 1280}h
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            +18% vs prior month
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 hotel-shadow">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Accredited Diplomas</span>
            <Award className="w-4 h-4 text-stone-700" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">
            {overview.totalCertificatesIssued || 144}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Verified corporate credentials
          </div>
        </div>

      </div>

      {/* Compliance Reminders */}
      {complianceAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Priority Compliance Flags
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceAlerts.map(alert => (
              <div key={alert.id} className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 font-bold block mb-0.5">
                    {alert.title}
                  </strong>
                  <span className="text-stone-800">{alert.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Department Breakdown Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow space-y-5">
        <h3 className="text-base font-bold text-slate-900">
          Departmental SOP Completion Matrix
        </h3>

        <div className="space-y-4">
          {roleStats.map((stat) => (
            <div key={stat.roleId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  {stat.roleTitle} ({stat.staffCount} Staff)
                </span>
                <div className="flex items-center gap-4 text-slate-500">
                  <span>{stat.modulesCount} Modules Active</span>
                  <span className="font-mono font-bold text-slate-900">{stat.complianceRate}% Certified</span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 rounded-full transition-all duration-500"
                  style={{ width: `${stat.complianceRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Roster */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Active Staff Associate Training Status
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="pb-3">Employee</th>
                <th className="pb-3">Employee ID</th>
                <th className="pb-3">Department & Role</th>
                <th className="pb-3">CEU Credits</th>
                <th className="pb-3 text-right">Completed Courses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 flex items-center gap-3">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[11px] text-slate-400">{s.email}</div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono font-semibold text-slate-700">
                    {s.employeeId || 'EMP-4109'}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    {s.position} ({s.department})
                  </td>
                  <td className="py-3 pr-4 font-mono font-bold text-emerald-700">
                    {s.ceuCredits || 18.5} CEU
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-slate-900">
                    {s.completedModules ? s.completedModules.length : 0} Courses
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Author New Module Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-lg font-bold font-sans font-bold">
                Author New Staff Training Course
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateModule} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Limousine Transfer & Baggage Handling"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CON-503"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Staff Role
                  </label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => {
                      setNewStaffRole(e.target.value);
                      const deptMap = {
                        'front-desk': 'Front Desk & Reception',
                        'housekeeping': 'Housekeeping & Rooms',
                        'food-beverage': 'F&B Service & Banquets',
                        'kitchen': 'Culinary & Stewarding',
                        'concierge-valet': 'Concierge & Guest Services',
                        'security': 'Safety, Security & Loss Prevention',
                        'bartending': 'Bar & Mixology',
                        'spa-wellness': 'Spa & Wellness'
                      };
                      setNewDepartment(deptMap[e.target.value] || 'Hotel Operations');
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  >
                    <option value="front-desk">Front Desk & Reception</option>
                    <option value="housekeeping">Housekeeping & Rooms</option>
                    <option value="food-beverage">F&B Service & Banquets</option>
                    <option value="kitchen">Culinary & Kitchen</option>
                    <option value="concierge-valet">Concierge & Valet</option>
                    <option value="security">Security & Loss Prevention</option>
                    <option value="bartending">Bar & Mixology</option>
                    <option value="spa-wellness">Spa & Wellness</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Compliance Classification
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                >
                  <option value="Mandatory Onboarding">Mandatory Onboarding</option>
                  <option value="Mandatory Compliance">Mandatory Compliance</option>
                  <option value="Skill Upgrade">Skill Upgrade</option>
                  <option value="Elective">Elective</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Course Summary & SOP Objectives *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail learning objectives, Forbes standards, and required competencies..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish to Staff Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
