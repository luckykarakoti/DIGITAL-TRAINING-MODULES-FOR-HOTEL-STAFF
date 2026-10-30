import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth, demoProfiles } from '../context/AuthContext';
import { 
  Building2, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Award, 
  Plus, 
  BookOpen, 
  ShieldCheck, 
  FileText,
  X,
  Check
} from 'lucide-react';

export const ManagerDashboard = ({ onSelectModule }) => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);

  // New module form state
  const [newTitle, setNewTitle] = useState('');
  const [newDepartment, setNewDepartment] = useState('Front Desk & Reception');
  const [newRole, setNewRole] = useState('front-desk');
  const [newCourseCode, setNewCourseCode] = useState('FO-201');
  const [newDuration, setNewDuration] = useState('30 min');
  const [newLevel, setNewLevel] = useState('Intermediate');
  const [newSummary, setNewSummary] = useState('');
  const [newSopCode, setNewSopCode] = useState('SOP-FO-08');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const res = await api.getAnalytics();
      if (res.success) {
        setAnalytics(res.analytics);
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    setIsSubmitting(true);
    try {
      const moduleData = {
        id: newCourseCode.trim() || `MOD-${Date.now()}`,
        courseCode: newCourseCode.trim(),
        title: newTitle.trim(),
        department: newDepartment,
        staffRole: newRole,
        duration: newDuration,
        level: newLevel,
        type: 'Standard Operating Procedure',
        ceuCredits: 2.0,
        summary: newSummary.trim(),
        sopCode: newSopCode.trim(),
        thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        lessons: [
          {
            id: `${newCourseCode.toLowerCase()}-l1`,
            title: `Introduction & Objective: ${newTitle.trim()}`,
            duration: '10 min',
            sopObjective: newSummary.trim(),
            standards: [
              'Adhere to all The Lucky Hotel brand guidelines and safety requirements.',
              'Ensure continuous compliance with supervisor inspection standards.'
            ],
            procedureSteps: [
              { step: 1, action: 'Initial Preparation', detail: 'Inspect workstation and review guest service notes.' },
              { step: 2, action: 'Standard Execution', detail: 'Follow standardized procedural sequence without deviation.' }
            ]
          }
        ],
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q1',
              question: `What is the principal objective of ${newTitle.trim()} at The Lucky Hotel?`,
              options: [
                'Ensure Forbes Travel Guide five-star service compliance',
                'Minimize staff interactions with guests',
                'Expedite procedures by skipping verification steps',
                'None of the above'
              ],
              correctAnswer: 0,
              rationale: 'All operating procedures at The Lucky Hotel are benchmarked against 5-star service quality.'
            }
          ]
        }
      };

      const res = await api.createModule(moduleData);
      if (res.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setShowAddModuleModal(false);
          setSubmitSuccess(false);
          setNewTitle('');
          setNewSummary('');
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to author module:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-stone-600" />
                <span>THE LUCKY HOTEL</span>
              </div>
              <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Director Operations Portal
              </h1>
              <p className="text-stone-600 text-sm max-w-2xl font-normal leading-relaxed">
                Property-wide compliance monitoring, department SOP auditing, and curriculum management for hotel leadership.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModuleModal(true)}
                className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Author New Training Module</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Compliance Rate</span>
              <ShieldCheck className="w-4 h-4 text-stone-700" />
            </div>
            <p className="text-2xl font-extrabold text-stone-900 font-mono">
              {analytics?.overview?.overallComplianceRate || 89}%
            </p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              +4.2% above brand benchmark
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Staff Enrolled</span>
              <Users className="w-4 h-4 text-stone-700" />
            </div>
            <p className="text-2xl font-extrabold text-stone-900 font-mono">
              {analytics?.overview?.totalStaff || 84}
            </p>
            <p className="text-[11px] text-stone-500 font-medium mt-1">
              Across 8 operational divisions
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Training Hours This Month</span>
              <Clock className="w-4 h-4 text-stone-700" />
            </div>
            <p className="text-2xl font-extrabold text-stone-900 font-mono">
              {analytics?.overview?.activeTrainingHoursThisMonth || 1280} hrs
            </p>
            <p className="text-[11px] text-stone-500 font-medium mt-1">
              Digital modules & SOP reviews
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Credentials Issued</span>
              <Award className="w-4 h-4 text-stone-700" />
            </div>
            <p className="text-2xl font-extrabold text-stone-900 font-mono">
              {analytics?.overview?.totalCertificatesIssued || 144}
            </p>
            <p className="text-[11px] text-stone-500 font-medium mt-1">
              Verified by The Lucky Hotel
            </p>
          </div>
        </div>

        {/* Operational Alerts */}
        {analytics?.complianceAlerts && analytics.complianceAlerts.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Departmental Compliance Action Items
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analytics.complianceAlerts.map(alert => (
                <div key={alert.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{alert.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Department Compliance Matrix */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Department Performance & Completion Matrix
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Real-time training progress and compliance scores by hotel department
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-5">Department</th>
                  <th className="py-3 px-4">Staff Count</th>
                  <th className="py-3 px-4">Active Modules</th>
                  <th className="py-3 px-4">Compliance</th>
                  <th className="py-3 px-4">Overdue Items</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {analytics?.roleStats?.map(role => (
                  <tr key={role.roleId} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-stone-900">
                      {role.roleTitle}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 font-mono">
                      {role.staffCount} Associates
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 font-mono">
                      {role.modulesCount} Modules
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900">{role.complianceRate}%</span>
                        <div className="w-20 bg-stone-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-stone-900 h-full rounded-full" 
                            style={{ width: `${role.complianceRate}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {role.overdueCount > 0 ? (
                        <span className="text-amber-700 font-semibold">{role.overdueCount} Pending</span>
                      ) : (
                        <span className="text-emerald-700 font-semibold">0 Clean</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Profiles Roster */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-stone-900">
              Hotel Staff Roster & Training Profiles
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Inspect employee credentials, current progress, and assignable learning pathways
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoProfiles.map(p => (
              <div key={p.email} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-stone-500 font-semibold">
                      {p.employeeId}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      p.role === 'manager' ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {p.role === 'manager' ? 'Director' : 'Staff'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900">{p.name}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{p.position}</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">{p.department}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">Property: TLH-01</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Compliant
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Author New Module Modal */}
      {showAddModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-2xl shadow-xl p-6 text-stone-900">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-stone-700" />
                <h3 className="text-sm font-bold text-stone-900">Author New Training Module</h3>
              </div>
              <button
                onClick={() => setShowAddModuleModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">Module Published Successfully</h4>
                <p className="text-xs text-stone-500 mt-1">Available immediately in the staff course catalog.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateModule} className="space-y-4 mt-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Module Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. VIP Concierge Luggage Delivery Protocol"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Target Department</label>
                    <select
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400"
                    >
                      <option value="Front Desk & Reception">Front Desk & Reception</option>
                      <option value="Housekeeping & Rooms">Housekeeping & Rooms</option>
                      <option value="F&B Service & Banquets">F&B Service & Banquets</option>
                      <option value="Culinary & Stewarding">Culinary & Stewarding</option>
                      <option value="Concierge & Guest Services">Concierge & Guest Services</option>
                      <option value="Safety & Security">Safety & Security</option>
                      <option value="Bar & Mixology">Bar & Mixology</option>
                      <option value="Spa & Wellness">Spa & Wellness</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Course Code</label>
                    <input
                      type="text"
                      value={newCourseCode}
                      onChange={(e) => setNewCourseCode(e.target.value)}
                      placeholder="e.g. CON-201"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">SOP Reference Code</label>
                    <input
                      type="text"
                      value={newSopCode}
                      onChange={(e) => setNewSopCode(e.target.value)}
                      placeholder="e.g. SOP-CON-04"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Estimated Duration</label>
                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      placeholder="e.g. 25 min"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Executive Summary & Standards *</label>
                  <textarea
                    rows={3}
                    required
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Brief description of the mandatory procedures, standards, and learning objectives..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModuleModal(false)}
                    className="px-4 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-semibold shadow-sm"
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Module'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

