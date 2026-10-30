import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Award, 
  CheckCircle2, 
  PlayCircle, 
  AlertCircle,
  Building2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

export const ModuleCatalog = ({ onSelectModule, onViewCertificate }) => {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const staffRoleFilters = [
    { id: 'all', label: 'All Hotel Staff', count: null },
    { id: 'front-desk', label: 'Front Desk & Reception', code: 'FO' },
    { id: 'housekeeping', label: 'Housekeeping & Rooms', code: 'HK' },
    { id: 'food-beverage', label: 'F&B Service & Dining', code: 'FB' },
    { id: 'kitchen', label: 'Culinary & Stewarding', code: 'CUL' },
    { id: 'concierge-valet', label: 'Concierge & Valet', code: 'CON' },
    { id: 'security', label: 'Safety & Security', code: 'SEC' },
    { id: 'bartending', label: 'Bar & Mixology', code: 'BAR' },
    { id: 'spa-wellness', label: 'Spa & Wellness', code: 'SPA' }
  ];

  const typeOptions = [
    'All',
    'Mandatory Onboarding',
    'Forbes Quality Standards',
    'Core Operational SOP',
    'Guest Recovery',
    'Safety & Compliance'
  ];

  const fetchModules = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedRole !== 'all') filters.staffRole = selectedRole;
      if (selectedType !== 'All') filters.type = selectedType;
      if (searchQuery.trim()) filters.search = searchQuery.trim();

      const res = await api.getModules(filters);
      if (res.success) {
        setModules(res.modules || []);
      }
    } catch (err) {
      console.error('Failed to load modules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [selectedRole, selectedType, searchQuery]);

  // Helper to determine user's progress for a given module
  const getModuleStatus = (module) => {
    if (!user) return { status: 'not-started', progress: 0 };

    if (user.completedModules?.includes(module.id)) {
      return { status: 'completed', progress: 100 };
    }

    const inProgress = user.inProgressModules?.find(m => m.moduleId === module.id);
    if (inProgress) {
      return { status: 'in-progress', progress: inProgress.progress || 35, dueDate: inProgress.dueDate };
    }

    return { status: 'not-started', progress: 0 };
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20 font-sans">
      
      {/* Hero Banner: Clean font, The Lucky Hotel, subtle aesthetic */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-stone-600" />
                <span>THE LUCKY HOTEL</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Digital Training Modules for Hotel Staff
              </h1>
              <p className="text-stone-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                Standard operating procedures, quality benchmarks, and role-specific certifications designed for luxury hospitality staff.
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-left">
                <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Assigned Staff</p>
                <p className="text-sm font-bold text-stone-900">{user?.name || 'Staff Associate'}</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-left">
                <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Your Progress</p>
                <p className="text-sm font-bold text-stone-900">
                  {user?.completedModules?.length || 0} Modules Completed
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-left">
                <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Credits Earned</p>
                <p className="text-sm font-bold text-stone-900">
                  {user?.ceuCredits || 18.5} CEU
                </p>
              </div>
            </div>
          </div>

          {/* Department Role Filter Tabs */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
              Filter by Role:
            </span>
            {staffRoleFilters.map(role => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {role.code && (
                    <span className={`text-[10px] font-mono px-1 rounded ${
                      isSelected ? 'bg-stone-800 text-stone-200' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {role.code}
                    </span>
                  )}
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Search & Secondary Type Filter */}
        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search modules, SOP codes, or topics..."
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800 placeholder-stone-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs text-stone-500 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-stone-400 w-full sm:w-auto"
            >
              {typeOptions.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <span className="text-xs text-stone-500 font-medium pl-2 hidden sm:inline">
              Showing <strong className="text-stone-900">{modules.length}</strong> modules
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500 text-xs font-medium">Loading training modules...</p>
          </div>
        ) : modules.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-900">No training modules found</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting your role filter or search criteria to view available hotel courses.
            </p>
            <button
              onClick={() => { setSelectedRole('all'); setSelectedType('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Grid of Training Modules */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => {
              const statusInfo = getModuleStatus(m);
              const isCompleted = statusInfo.status === 'completed';
              const isInProgress = statusInfo.status === 'in-progress';

              return (
                <div
                  key={m.id}
                  onClick={() => onSelectModule(m)}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-44 overflow-hidden bg-stone-100">
                    <img
                      src={m.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"}
                      alt={m.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[10px] font-mono font-bold tracking-wider border border-white/20">
                        {m.courseCode || m.id}
                      </span>

                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[11px] font-semibold backdrop-blur-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Certified</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-white/90 text-stone-800 text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm border border-stone-200">
                          {m.type?.split(' ')[0] || 'Standard'}
                        </span>
                      )}
                    </div>

                    {/* Department pill at bottom of image */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-stone-300 inline-block" />
                        {m.department}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[11px] text-stone-500 font-medium">
                        <span>{m.level || 'Foundational'}</span>
                        <span>•</span>
                        <span>{m.sopCode || 'SOP-LH'}</span>
                      </div>

                      <h3 className="text-base font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
                        {m.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                        {m.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100">
                      
                      {/* Course Metadata Strip */}
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          {m.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                          {m.lessonsCount || m.lessons?.length || 3} Lessons
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-stone-700">
                          <Award className="w-3.5 h-3.5 text-stone-400" />
                          {m.ceuCredits || 1.5} CEU
                        </span>
                      </div>

                      {/* Progress Bar (if in-progress or completed) */}
                      {isInProgress && (
                        <div className="mb-3">
                          <div className="flex justify-between text-[11px] text-stone-600 font-medium mb-1">
                            <span>In Progress</span>
                            <span>{statusInfo.progress}%</span>
                          </div>
                          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-stone-800 h-full rounded-full transition-all" 
                              style={{ width: `${statusInfo.progress}%` }} 
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      {isCompleted ? (
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                          </span>
                          <span className="text-xs font-semibold text-stone-900 group-hover:underline flex items-center gap-1">
                            Review Module
                            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                          </span>
                        </div>
                      ) : isInProgress ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectModule(m);
                          }}
                          className="w-full py-2.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Resume Lesson</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectModule(m);
                          }}
                          className="w-full py-2.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-stone-200"
                        >
                          <PlayCircle className="w-4 h-4 text-stone-700" />
                          <span>Start Training Module</span>
                        </button>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};

