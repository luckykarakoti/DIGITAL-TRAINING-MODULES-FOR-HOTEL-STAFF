import React, { useState } from 'react';
import { useAuth, demoProfiles } from '../context/AuthContext';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  AlertCircle, 
  ShieldAlert, 
  Briefcase, 
  Award,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

export const LoginPage = ({ onLoginSuccess }) => {
  const { login, portalType, setPortalType } = useAuth();
  
  // Form fields
  const [identifier, setIdentifier] = useState('aiden.mercer@luckyhotel.com');
  const [password, setPassword] = useState('password123');
  const [selectedProperty, setSelectedProperty] = useState('THE LUCKY HOTEL • Main Property (TLH-01)');
  const [department, setDepartment] = useState('Front Desk & Reception');
  const [ndaChecked, setNdaChecked] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isDirector = portalType === 'director';

  const handleSwitchPortal = (type) => {
    setPortalType(type);
    setErrorMessage('');
    if (type === 'director') {
      setIdentifier('director@luckyhotel.com');
      setPassword('password123');
    } else {
      setIdentifier('aiden.mercer@luckyhotel.com');
      setPassword('password123');
    }
  };

  const handleQuickLogin = async (profile) => {
    setIdentifier(profile.email);
    setPassword('password123');
    setLoading(true);
    setErrorMessage('');
    const res = await login(profile.email, 'password123', profile.role === 'manager' ? 'manager' : undefined);
    setLoading(false);
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess(res.user);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your Employee ID or Hotel Email');
      return;
    }

    if (isDirector && !ndaChecked) {
      setErrorMessage('Please acknowledge the Executive Compliance & Training Records agreement.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    const res = await login(identifier.trim(), password, isDirector ? 'manager' : undefined);
    setLoading(false);
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess(res.user);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans transition-colors duration-200 ${
      isDirector ? 'bg-stone-900 text-stone-100' : 'bg-stone-50 text-stone-900'
    }`}>
      
      {/* Top Subtle Strip */}
      <div className={`text-xs py-2 px-4 border-b ${
        isDirector 
          ? 'bg-stone-950 border-stone-800 text-stone-400' 
          : 'bg-white border-stone-200 text-stone-500'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className={`w-3.5 h-3.5 ${isDirector ? 'text-stone-300' : 'text-stone-700'}`} />
            <span className="font-semibold tracking-wide">THE LUCKY HOTEL</span>
            <span className="text-stone-400">•</span>
            <span className="text-[11px]">Staff Operations & Learning Platform (TLH-01)</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              SSO & Identity Active
            </span>
            <span className="text-stone-400">|</span>
            <span className="font-mono text-stone-500">LMS-SECURE-ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        
        {/* Portal Switcher Tabs */}
        <div className="mb-6 flex justify-center">
          <div className={`p-1 rounded-2xl border flex items-center gap-1.5 shadow-sm ${
            isDirector ? 'bg-stone-950 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <button
              type="button"
              onClick={() => handleSwitchPortal('staff')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                !isDirector
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Hotel Staff & Associates Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchPortal('director')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isDirector
                  ? 'bg-stone-100 text-stone-900 font-bold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Director & Management Portal</span>
            </button>
          </div>
        </div>

        {/* The Login Card with Subtle Styling */}
        <div className={`rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
          isDirector 
            ? 'bg-stone-950/90 border-stone-800 text-white' 
            : 'bg-white border-stone-200 text-stone-900'
        }`}>
          
          {/* Card Header Strip */}
          <div className={`p-6 sm:p-8 border-b ${
            isDirector 
              ? 'bg-stone-950 border-stone-800' 
              : 'bg-stone-50/80 border-stone-200'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border inline-block ${
                  isDirector 
                    ? 'bg-stone-800 text-stone-300 border-stone-700' 
                    : 'bg-stone-100 text-stone-700 border-stone-200'
                }`}>
                  {isDirector ? 'Directorate Clearance Level 4' : 'Shift Associate Sign-In'}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {isDirector ? 'Director of Quality & Training Sign-In' : 'Hotel Staff Learning Portal'}
                </h1>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDirector ? 'text-stone-400' : 'text-stone-500'
                }`}>
                  {isDirector 
                    ? 'THE LUCKY HOTEL — Quality assurance metrics, training analytics, and SOP curriculum administration.'
                    : 'THE LUCKY HOTEL — Access your role training modules, shift checklists, and accredited diplomas.'
                  }
                </p>
              </div>

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                isDirector 
                  ? 'bg-stone-800 border-stone-700 text-stone-200' 
                  : 'bg-stone-900 text-stone-100 border-stone-800'
              }`}>
                <span className="font-extrabold text-sm tracking-tighter">LH</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Staff-only: Property & Department selection */}
              {!isDirector ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Hotel Location
                    </label>
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-stone-900 font-medium"
                    >
                      <option value="Main Property">THE LUCKY HOTEL • Main Property (TLH-01)</option>
                      <option value="Resort Branch">THE LUCKY HOTEL • Beachfront Resort</option>
                      <option value="City Boutique">THE LUCKY HOTEL • City Center Boutique</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Assigned Department Track
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-stone-900 font-medium"
                    >
                      <option value="Front Desk & Reception">Front Desk & Reception</option>
                      <option value="Housekeeping & Rooms">Housekeeping & Rooms</option>
                      <option value="F&B Service & Banquets">F&B Service & Banquets</option>
                      <option value="Culinary & Kitchen">Culinary & Kitchen</option>
                      <option value="Concierge & Valet">Concierge & Valet</option>
                      <option value="Security & Safety">Security & Loss Prevention</option>
                      <option value="Bar & Mixology">Bar & Mixology</option>
                      <option value="Spa & Wellness">Spa & Wellness</option>
                    </select>
                  </div>
                </div>
              ) : (
                /* Director notice */
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block font-semibold mb-0.5">
                      Director Credentials Required:
                    </strong>
                    Access to property compliance audits, staff certifications, and module authoring tools.
                  </div>
                </div>
              )}

              {/* Identifier Input */}
              <div>
                <label className={`block font-semibold mb-1 ${isDirector ? 'text-stone-300' : 'text-stone-700'}`}>
                  {isDirector ? 'Director Email or Executive ID *' : 'Employee ID or Hotel Email *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder={isDirector ? 'director@luckyhotel.com or EMP-1002' : 'aiden.mercer@luckyhotel.com or EMP-4109'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={`w-full rounded-xl pl-9 pr-4 py-2 font-medium transition-all focus:outline-none ${
                      isDirector
                        ? 'bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:border-stone-400'
                        : 'bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className={`block font-semibold mb-1 ${isDirector ? 'text-stone-300' : 'text-stone-700'}`}>
                  Password / PIN *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-xl pl-9 pr-9 py-2 font-medium transition-all focus:outline-none ${
                      isDirector
                        ? 'bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:border-stone-400'
                        : 'bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Director Governance Checkbox */}
              {isDirector && (
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="nda"
                    checked={ndaChecked}
                    onChange={(e) => setNdaChecked(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5 rounded border-stone-700 bg-stone-900 text-stone-600 focus:ring-stone-400 cursor-pointer"
                  />
                  <label htmlFor="nda" className="text-[11px] text-stone-400 leading-relaxed cursor-pointer">
                    I verify that audit compliance records and staff evaluation data are handled with confidentiality.
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isDirector
                      ? 'bg-stone-100 hover:bg-stone-200 text-stone-900 disabled:opacity-50'
                      : 'bg-stone-900 hover:bg-stone-800 text-white disabled:opacity-50'
                  }`}
                >
                  <span>{loading ? 'Authenticating...' : isDirector ? 'Sign In to Management Portal' : 'Sign In to Staff Learning Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>

            {/* Quick Demo Logins with subtle cards */}
            <div className={`pt-4 border-t ${isDirector ? 'border-stone-800' : 'border-stone-100'} space-y-2.5`}>
              <div className="flex items-center justify-between text-[11px]">
                <span className={`font-semibold uppercase tracking-wider ${
                  isDirector ? 'text-stone-400' : 'text-stone-500'
                }`}>
                  1-Click Fast Sign-In:
                </span>
                <span className="text-stone-400">Click to test immediately</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {demoProfiles
                  .filter(p => isDirector ? p.role === 'manager' : p.role === 'staff')
                  .map((p) => (
                    <button
                      key={p.email}
                      type="button"
                      onClick={() => handleQuickLogin(p)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 group ${
                        isDirector
                          ? 'bg-stone-900 hover:bg-stone-800 border-stone-800 text-stone-200 col-span-3'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                        isDirector ? 'bg-stone-800 text-stone-200' : 'bg-stone-200 text-stone-800'
                      }`}>
                        {p.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-xs truncate">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">
                          {p.position}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Subtle Footer */}
      <div className={`text-[11px] py-4 text-center border-t ${
        isDirector ? 'bg-stone-950 border-stone-900 text-stone-500' : 'bg-white border-stone-200 text-stone-400'
      }`}>
        <p>
          © 2026 THE LUCKY HOTEL. All standard operating procedures and training material are property of The Lucky Hotel.
        </p>
      </div>

    </div>
  );
};
