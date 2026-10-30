import React, { useState } from 'react';
import { useAuth, demoProfiles } from '../context/AuthContext';
import { 
  Building2, 
  BookOpen, 
  MessageSquare, 
  SearchCheck, 
  ShieldAlert, 
  Award, 
  BarChart3, 
  ChevronDown, 
  UserCheck, 
  Menu, 
  X,
  FileCheck2,
  GraduationCap,
  LogOut
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, switchUser, logout, setPortalType, isManager } = useAuth();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'modules', label: 'Course Catalog & Staff Modules', icon: BookOpen },
    { id: 'scenarios', label: 'Guest Incident Simulator', icon: MessageSquare },
    { id: 'inspection', label: 'Suite Quality Audit', icon: SearchCheck },
    { id: 'emergency', label: 'Emergency SOP Cards', icon: ShieldAlert },
    { id: 'certificates', label: 'Transcripts & Diplomas', icon: Award },
    { id: 'manager', label: 'Director Operations Portal', icon: BarChart3, badge: 'Director' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 hotel-shadow font-sans">
      
      {/* Top Utility Strip with subtle colors */}
      <div className="bg-stone-900 text-stone-300 text-[11px] px-4 py-1.5 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-stone-200 font-medium tracking-wide">
              <Building2 className="w-3.5 h-3.5 text-stone-400" />
              THE LUCKY HOTEL • Flagship Property (TLH-01)
            </span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline text-stone-400 font-normal">
              Hospitality Standards & Operations Academy
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-stone-400">
              Department: <strong className="text-stone-200 font-medium">{user?.department || 'Hotel Operations'}</strong>
            </span>
            <span className="text-stone-400">
              ID: <strong className="text-stone-200 font-mono">{user?.employeeId || 'EMP-4109'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hotel Brand with Simple Modern Font */}
          <div 
            onClick={() => setActiveTab('modules')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-900 flex items-center justify-center text-stone-100 shadow-sm transition-transform group-hover:scale-105">
              <span className="font-extrabold text-sm tracking-tighter">LH</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-wider text-stone-900 uppercase">
                  THE LUCKY HOTEL
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                  STAFF LMS
                </span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium tracking-wide">
                Digital Training & Standard Operating Procedures
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 border border-stone-300 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-stone-200 text-stone-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Capsule & Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* CEU Credits Pill */}
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-700">
              <FileCheck2 className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-semibold">{user?.ceuCredits || 18.5} CEU</span>
            </div>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 transition-all text-left"
              >
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"}
                  alt={user?.name || "User"}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200"
                />
                <div>
                  <div className="text-xs font-semibold text-stone-900 leading-tight flex items-center gap-1">
                    {user?.name}
                    <ChevronDown className="w-3 h-3 text-stone-400" />
                  </div>
                  <div className="text-[10px] text-stone-500 leading-tight font-medium">
                    {user?.position}
                  </div>
                </div>
              </button>

              {/* Persona Switcher Dropdown */}
              {profileDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-white border border-stone-200 rounded-xl shadow-xl p-2 z-50 text-stone-800"
                  onMouseLeave={() => setProfileDropdown(false)}
                >
                  <div className="px-3 py-2 border-b border-stone-100 mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Switch Active Staff Member
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Test platform as different hotel employees or director
                    </p>
                  </div>

                  <div className="space-y-1">
                    {demoProfiles.map((p) => {
                      const isCurrent = user?.email === p.email;
                      return (
                        <button
                          key={p.email}
                          onClick={() => {
                            switchUser(p.email);
                            setProfileDropdown(false);
                            if (p.role === 'manager') setActiveTab('manager');
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors ${
                            isCurrent
                              ? 'bg-stone-100 border border-stone-300 text-stone-900 font-bold'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              {p.name}
                              {isCurrent && <UserCheck className="w-3.5 h-3.5 text-stone-800" />}
                            </div>
                            <div className="text-[10px] text-stone-500 font-normal">
                              {p.position} • <span className="font-mono text-stone-400">{p.employeeId}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            p.role === 'manager' 
                              ? 'bg-stone-800 text-white' 
                              : 'bg-stone-100 text-stone-700'
                          }`}>
                            {p.role === 'manager' ? 'Director' : 'Staff'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-stone-100 mt-1">
                    <button
                      onClick={() => {
                        setProfileDropdown(false);
                        setPortalType(isManager ? 'staff' : 'director');
                        logout();
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out / Switch Portal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Logout Button */}
            <button
              onClick={() => logout()}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 border border-stone-300'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-stone-700" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-1">
            <p className="text-[11px] font-bold text-stone-500 mb-2 uppercase tracking-wider">
              Switch Staff Member
            </p>
            <div className="flex flex-wrap gap-2">
              {demoProfiles.map((p) => (
                <button
                  key={p.email}
                  onClick={() => {
                    switchUser(p.email);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border ${
                    user?.email === p.email
                      ? 'bg-stone-100 text-stone-900 border-stone-300 font-bold'
                      : 'bg-white text-stone-600 border-stone-200'
                  }`}
                >
                  {p.name} ({p.department.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
