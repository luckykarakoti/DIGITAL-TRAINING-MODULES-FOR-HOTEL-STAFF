import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { ModuleCatalog } from './components/ModuleCatalog';
import { ModuleViewer } from './components/ModuleViewer';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { RoomInspectionView } from './components/RoomInspectionView';
import { EmergencyCardsView } from './components/EmergencyCardsView';
import { CertificatesGallery } from './components/CertificatesGallery';
import { ManagerDashboard } from './components/ManagerDashboard';
import { Sparkles, Building2, ShieldCheck, GraduationCap } from 'lucide-react';

const MainContent = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('modules');
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchModules = async () => {
    try {
      const res = await api.getModules();
      if (res.success && res.modules) {
        setModules(res.modules);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleSelectModule = (mod) => {
    setSelectedModule(mod);
  };

  const handleBackToCatalog = () => {
    setSelectedModule(null);
    fetchModules();
  };

  const handleModuleCreated = (newMod) => {
    setModules(prev => [newMod, ...prev]);
  };

  const handleLoginSuccess = (loggedInUser) => {
    if (loggedInUser?.role === 'manager') {
      setActiveTab('manager');
    } else {
      setActiveTab('modules');
    }
  };

  // If user is not logged in, show the dedicated login experience!
  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedModule(null);
      }} />

      <main className="flex-1">
        {loading ? (
          <div className="py-32 text-center text-slate-500">
            <Sparkles className="w-8 h-8 mx-auto mb-3 animate-spin text-stone-700" />
            <h2 className="text-lg font-bold font-sans font-bold text-slate-800">Connecting to THE LUCKY HOTEL � Staff LMS...</h2>
            <p className="text-xs text-slate-400 mt-1">Retrieving hotel staff standard operating procedures</p>
          </div>
        ) : (
          <>
            {activeTab === 'modules' && (
              selectedModule ? (
                <ModuleViewer
                  module={selectedModule}
                  onBack={handleBackToCatalog}
                  onModuleUpdated={fetchModules}
                />
              ) : (
                <ModuleCatalog
                  modules={modules}
                  onSelectModule={handleSelectModule}
                />
              )
            )}

            {activeTab === 'scenarios' && <ScenarioSimulator />}
            {activeTab === 'inspection' && <RoomInspectionView />}
            {activeTab === 'emergency' && <EmergencyCardsView />}
            {activeTab === 'certificates' && <CertificatesGallery />}
            {activeTab === 'manager' && (
              <ManagerDashboard onModuleCreated={handleModuleCreated} />
            )}
          </>
        )}
      </main>

      {/* Enterprise Hospitality Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-stone-300 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-sans font-bold font-bold text-sm text-slate-900 block">
                  THE LUCKY HOTEL • Quality & Training Directorate
                </span>
                <span className="text-[11px] text-slate-400">
                  Global Standard Operating Procedures (SOP) & Forbes Five-Star Learning Management System
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Forbes Accredited Center
              </span>
              <span>•</span>
              <span className="font-mono text-slate-400">Enterprise LMS v3.2</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>
              © 2026 THE LUCKY HOTEL. All standard operating procedures, audit checklists, and training media are confidential corporate property.
            </p>
            <div className="flex items-center gap-4">
              <span>Full-Stack MERN Architecture (Node.js • Express • React • MongoDB)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
