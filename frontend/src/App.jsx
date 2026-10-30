import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { ModuleCatalog } from './components/ModuleCatalog';
import { ModuleViewer } from './components/ModuleViewer';
import { CertificatesGallery } from './components/CertificatesGallery';
import { ManagerDashboard } from './components/ManagerDashboard';
import { CertificateModal } from './components/CertificateModal';
import { Building2, ShieldCheck, HeartHandshake } from 'lucide-react';

function MainApp() {
  const { user, loading, isManager } = useAuth();
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'certificates' | 'manager'
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider">
            Loading The Lucky Hotel LMS...
          </p>
        </div>
      </div>
    );
  }

  // If not logged in, render the Staff / Director Login Page
  if (!user) {
    return (
      <LoginPage 
        onLoginSuccess={(loggedUser) => {
          if (loggedUser.role === 'manager') {
            setActiveTab('manager');
          } else {
            setActiveTab('modules');
          }
        }} 
      />
    );
  }

  // Handle opening a module
  const handleSelectModule = (mod) => {
    setSelectedModule(mod);
  };

  const handleBackToCatalog = () => {
    setSelectedModule(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-stone-800 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={selectedModule ? 'modules' : activeTab} 
        setActiveTab={(tab) => {
          setSelectedModule(null);
          setActiveTab(tab);
        }} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedModule ? (
          <ModuleViewer
            module={selectedModule}
            moduleId={selectedModule.id}
            onBack={handleBackToCatalog}
            onViewCertificate={(cert) => setActiveCertificate(cert)}
          />
        ) : (
          <>
            {activeTab === 'modules' && (
              <ModuleCatalog
                onSelectModule={handleSelectModule}
                onViewCertificate={(cert) => setActiveCertificate(cert)}
              />
            )}

            {activeTab === 'certificates' && (
              <CertificatesGallery
                onViewCertificate={(cert) => setActiveCertificate(cert)}
                onBrowseModules={() => setActiveTab('modules')}
              />
            )}

            {activeTab === 'manager' && (
              <ManagerDashboard
                onSelectModule={handleSelectModule}
              />
            )}
          </>
        )}
      </main>

      {/* Official Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Clean Hotel Footer */}
      <footer className="bg-white border-t border-stone-200 py-8 no-print font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-stone-900 flex items-center justify-center text-white text-xs font-extrabold tracking-wider">
                LH
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  THE LUCKY HOTEL
                </p>
                <p className="text-[11px] text-stone-500 font-normal">
                  Digital Training Modules for Hotel Staff • Flagship Property (TLH-01)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                Forbes Travel Guide Verified Standards
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-stone-600" />
                Hospitality Operations Academy
              </span>
            </div>

            <div className="text-[11px] text-stone-400">
              &copy; {new Date().getFullYear()} The Lucky Hotel. All rights reserved.
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

