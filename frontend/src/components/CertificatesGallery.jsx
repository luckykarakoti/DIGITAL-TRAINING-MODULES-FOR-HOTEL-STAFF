import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  Calendar, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';

export const CertificatesGallery = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getCertificates(user?.id);
        if (res.success && res.certificates) {
          setCertificates(res.certificates);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;
    setIsVerifying(true);
    try {
      const res = await api.verifyCertificate(verifyCode.trim());
      setVerificationResult(res);
      if (res.success && res.certificate) {
        setSelectedCert(res.certificate);
      }
    } catch (err) {
      setVerificationResult({ success: false, message: 'Verification lookup error' });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
            <Award className="w-4 h-4 text-stone-700" />
            <span>Corporate Transcripts & Verified Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans font-bold text-slate-900">
            Accredited Hospitality Diplomas & Certificates
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Official Forbes Travel Guide certified credentials. Each diploma is cryptographically logged with a digital verification code recognized by luxury hotel audit boards.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3">
          <div className="text-2xl font-bold font-mono text-slate-900">
            {certificates.length}
          </div>
          <div className="text-xs text-slate-500">
            Verified Diplomas on Record
          </div>
        </div>
      </div>

      {/* Verification Lookup Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 hotel-shadow space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Audit Registry: Verify Certificate Authenticity</span>
        </h3>

        <form onSubmit={handleVerify} className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Enter Verification Code (e.g. GLP-FD-9981-VERIFIED)"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={isVerifying || !verifyCode.trim()}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all disabled:opacity-40"
          >
            {isVerifying ? 'Searching Registry...' : 'Verify Credential'}
          </button>
        </form>

        {verificationResult && (
          <div className={`p-3 rounded-lg border text-xs ${
            verificationResult.success 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {verificationResult.success ? (
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Authentic! Awarded to {verificationResult.certificate.userName} for {verificationResult.certificate.moduleTitle}.</span>
              </div>
            ) : (
              <span>{verificationResult.message}</span>
            )}
          </div>
        )}
      </div>

      {/* Certificates Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Sparkles className="w-8 h-8 mx-auto mb-3 animate-spin text-stone-600" />
          <p>Loading employee transcripts...</p>
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Certificates Issued Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Complete your role's training modules and pass the 80% certification examination to earn accredited diplomas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.certificateId}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 hotel-shadow transition-all group relative space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800">
                  {cert.score}% Score
                </span>
              </div>

              <div>
                <span className="text-xs text-stone-800 font-bold uppercase tracking-wider block mb-1">
                  {cert.badgeTitle}
                </span>
                <h3 className="text-base font-bold text-slate-900 font-sans font-bold leading-snug">
                  {cert.moduleTitle}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Recipient:</span>
                  <strong className="text-slate-800">{cert.userName} ({cert.userDepartment})</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Issued Date:</span>
                  <span className="text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {cert.issuedDate}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>Credential ID:</span>
                  <span className="text-slate-700">{cert.certificateId}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-stone-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Official Diploma</span>
                </button>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}

    </div>
  );
};
