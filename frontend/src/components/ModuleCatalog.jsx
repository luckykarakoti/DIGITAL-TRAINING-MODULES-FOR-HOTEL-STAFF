import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Clock, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  FileCheck2, 
  ArrowRight, 
  Key, 
  Bed, 
  Utensils, 
  Flame, 
  Compass, 
  Shield, 
  Wine, 
  Sparkles,
  AlertCircle,
  Calendar
} from 'lucide-react';

export const ModuleCatalog = ({ modules, onSelectModule }) => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const staffRoles = [
    { id: 'all', title: 'All Hotel Staff', icon: BookOpen, count: modules.length },
    { id: 'front-desk', title: 'Front Desk & Reception', icon: Key, count: modules.filter(m => m.staffRole === 'front-desk').length },
    { id: 'housekeeping', title: 'Housekeeping & Rooms', icon: Bed, count: modules.filter(m => m.staffRole === 'housekeeping').length },
    { id: 'food-beverage', title: 'F&B Service & Banquets', icon: Utensils, count: modules.filter(m => m.staffRole === 'food-beverage').length },
    { id: 'kitchen', title: 'Culinary & Kitchen', icon: Flame, count: modules.filter(m => m.staffRole === 'kitchen').length },
    { id: 'concierge-valet', title: 'Concierge & Valet', icon: Compass, count: modules.filter(m => m.staffRole === 'concierge-valet').length },
    { id: 'security', title: 'Security & Safety', icon: Shield, count: modules.filter(m => m.staffRole === 'security').length },
    { id: 'bartending', title: 'Bar & Mixology', icon: Wine, count: modules.filter(m => m.staffRole === 'bartending').length },
    { id: 'spa-wellness', title: 'Spa & Wellness', icon: Sparkles, count: modules.filter(m => m.staffRole === 'spa-wellness').length }
  ];

  const types = ['All', 'Mandatory Onboarding', 'Mandatory Compliance', 'Skill Upgrade', 'Elective'];

  const filteredModules = modules.filter(m => {
    const matchesRole = selectedRole === 'all' || m.staffRole === selectedRole;
    const matchesType = selectedType === 'All' || m.type === selectedType;
    const matchesSearch = !searchTerm || (
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.courseCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesRole && matchesType && matchesSearch;
  });

  // User's assigned courses in progress
  const userInProgress = user?.inProgressModules || [];
  const inProgressCourses = modules.filter(m => userInProgress.some(p => p.moduleId === m.id || p.moduleId === m.courseCode));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Employee Greeting & Action Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
              Staff Learning Portal
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Employee: {user?.name} ({user?.position})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans font-bold text-slate-900">
            THE LUCKY HOTEL � Standard Operating Procedures (SOP)
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Standardized Forbes Travel Guide training modules mapped to each hotel staff role. Complete lessons, pass the compliance examination, and maintain property accreditation.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6 text-slate-700 text-xs">
          <div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {user?.completedModules?.length || 0}
            </div>
            <div className="text-slate-500 text-[11px]">Completed</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <div className="text-2xl font-bold text-stone-800 font-mono">
              {user?.inProgressModules?.length || 0}
            </div>
            <div className="text-slate-500 text-[11px]">In Progress</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <div className="text-2xl font-bold text-emerald-700 font-mono">
              {user?.ceuCredits || 18.5}
            </div>
            <div className="text-slate-500 text-[11px]">CEU Credits</div>
          </div>
        </div>
      </div>

      {/* Staff Roles Selection Grid (Real hotel departments) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Browse Training Modules by Staff Role
          </h2>
          <span className="text-xs text-slate-400">
            Select a department to view dedicated staff courses
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {staffRoles.slice(0, 5).map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-stone-200 text-stone-900' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{role.title}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {role.count} Modules
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {staffRoles.slice(5).map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-stone-200 text-stone-900' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{role.title}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {role.count} Modules
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 hotel-shadow flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by course code (FO-101), SOP name, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
          />
        </div>

        {/* Course Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Compliance Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-stone-900"
          >
            {types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Clear Filter if active */}
        {(selectedRole !== 'all' || selectedType !== 'All' || searchTerm) && (
          <button
            onClick={() => {
              setSelectedRole('all');
              setSelectedType('All');
              setSearchTerm('');
            }}
            className="text-xs text-stone-700 font-semibold hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Modules Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong>{filteredModules.length}</strong> accredited training modules
          {selectedRole !== 'all' && ` for ${staffRoles.find(r => r.id === selectedRole)?.title}`}
        </span>
      </div>

      {/* Modules Grid */}
      {filteredModules.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Modules Match Your Criteria</h3>
          <p className="text-xs text-slate-500">
            Please reset your role selection or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const isCompleted = user?.completedModules?.includes(module.id) || user?.completedModules?.includes(module.courseCode);
            const inProgress = user?.inProgressModules?.find(p => p.moduleId === module.id || p.moduleId === module.courseCode);

            // Badge color based on compliance type
            let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";
            if (module.type === "Mandatory Onboarding") {
              badgeStyle = "bg-rose-50 text-rose-700 border-rose-200";
            } else if (module.type === "Mandatory Compliance") {
              badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
            } else if (module.type === "Skill Upgrade") {
              badgeStyle = "bg-amber-50 text-amber-800 border-stone-200";
            }

            return (
              <div
                key={module.id}
                onClick={() => onSelectModule(module)}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden hotel-shadow hover:hotel-shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={module.thumbnail}
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                    {/* Course Code & Type Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900/90 text-white backdrop-blur-sm border border-slate-700">
                        {module.courseCode || module.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeStyle} backdrop-blur-sm`}>
                        {module.type}
                      </span>
                    </div>

                    {/* Department Tag & SOP Code */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                      <span className="font-medium text-slate-200">
                        {module.department}
                      </span>
                      {module.sopCode && (
                        <span className="font-mono text-stone-200 font-semibold text-[10px]">
                          {module.sopCode}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-sans font-bold text-base font-bold text-slate-900 group-hover:text-stone-700 transition-colors leading-snug">
                      {module.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {module.summary}
                    </p>

                    {/* Progress indicator if in progress */}
                    {inProgress && !isCompleted && (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-600">
                          <span className="font-semibold text-amber-700">In Progress ({inProgress.progress}%)</span>
                          {inProgress.dueDate && (
                            <span className="text-slate-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              Due: {inProgress.dueDate}
                            </span>
                          )}
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-stone-800 rounded-full"
                            style={{ width: `${inProgress.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Meta info strip */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {module.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {module.lessons?.length || 3} Lessons
                      </span>
                      <span className="flex items-center gap-1 text-slate-700 font-semibold font-mono">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                        {module.ceuCredits || 1.5} CEU
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  <div className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : inProgress
                      ? 'bg-stone-800 text-white hover:bg-stone-700 shadow-sm'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}>
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Certified • Review Standard</span>
                      </>
                    ) : inProgress ? (
                      <>
                        <span>Resume Lesson</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Start Training Course</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
