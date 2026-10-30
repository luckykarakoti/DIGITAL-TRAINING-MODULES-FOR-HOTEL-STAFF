import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Printer, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  FileText, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export const CertificatesGallery = ({ onViewCertificate, onBrowseModules }) => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.getCertificates(user?.id);
      if (res.success) {
        setCertificates(res.certificates || []);
      }
    } catch (err) {
      console.error('Failed to load certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [user]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;

    setVerifying(true);
    setVerificationResult(null);
    try {
      const res = await api.verifyCertificate(verifyCode.trim());
      setVerificationResult(res);
    } catch (err) {
      setVerificationResult({ valid: false, message: 'Verification lookup service unavailable' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20 font-sans">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-stone-600" />
                <span>THE LUCKY HOTEL</span>
              </div>
              <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Staff Certifications & Transcripts
              </h1>
              <p className="text-stone-600 text-sm max-w-2xl font-normal leading-relaxed">
                Official records of completed SOP training, hospitality competency, and accreditation credentials.
              </p>
            </div>

            {/* Staff Metric Strip */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-left">
                <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Active Credentials</p>
                <p className="text-sm font-bold text-stone-900">{certificates.length} Certified</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-left">
                <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">CEU Total</p>
                <p className="text-sm font-bold text-stone-900">{user?.ceuCredits || 18.5} Credits</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-left">
                <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Compliance Status</p>
                <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Audit Ready
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Certificate Verification Box */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
          <div className="max-w-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              <span>Digital Credential Verification Service</span>
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Verify the authenticity of any The Lucky Hotel diploma or training certificate using its unique verification code.
            </p>

            <form onSubmit={handleVerify} className="flex gap-2 mt-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  placeholder="Enter certificate verification code (e.g. TLH-FO-101-901)"
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
              <button
                type="submit"
                disabled={verifying || !verifyCode.trim()}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shrink-0"
              >
                {verifying ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>

            {/* Verification Result Notification */}
            {verificationResult && (
              <div className={`mt-3 p-3 rounded-lg border text-xs ${
                verificationResult.valid 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}>
                {verificationResult.valid ? (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Official Credential Verified:</strong> Issued to{' '}
                      <strong>{verificationResult.certificate?.userName}</strong> for{' '}
                      <strong>{verificationResult.certificate?.moduleTitle}</strong> on{' '}
                      {verificationResult.certificate?.issuedDate}.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Invalid or Unrecognized Code:</strong>{' '}
                      {verificationResult.message || 'No record matches this verification code in The Lucky Hotel LMS database.'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Certificates Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-stone-700" />
              <span>Earned Credentials ({certificates.length})</span>
            </h2>
            <span className="text-xs text-stone-500">
              Click any certificate to inspect or print
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-stone-500 text-xs font-medium">Loading credentials...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-10 text-center max-w-md mx-auto">
              <Award className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-stone-800">No certificates earned yet</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Complete all lessons and pass the final knowledge assessment (80%+) of any module to earn your official hotel diploma.
              </p>
              {onBrowseModules && (
                <button
                  onClick={onBrowseModules}
                  className="mt-4 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
                >
                  Browse Training Modules
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id || cert.certificateId}
                  onClick={() => onViewCertificate(cert)}
                  className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Monogram Strip */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                        {cert.certificateId || 'TLH-CERT'}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Score: {cert.score || 100}%
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        {cert.userDepartment || 'Hospitality Operations'}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                        {cert.moduleTitle}
                      </h3>
                      <p className="text-xs text-stone-600 mt-2">
                        Recipient: <strong className="text-stone-800">{cert.userName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {cert.issuedDate}
                      </span>
                      <span className="font-mono text-stone-400">
                        {cert.verificationCode}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCertificate(cert);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-stone-200"
                    >
                      <Printer className="w-3.5 h-3.5 text-stone-700" />
                      <span>View & Print Certificate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

