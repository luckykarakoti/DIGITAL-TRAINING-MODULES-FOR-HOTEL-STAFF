import React from 'react';
import { Award, Printer, X, ShieldCheck } from 'lucide-react';

export const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-2xl shadow-xl p-6 sm:p-8 my-8 text-stone-900">
        
        {/* Header Controls (No-print) */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 no-print">
          <div className="flex items-center gap-2 text-stone-700 font-semibold text-xs tracking-wide">
            <Award className="w-4 h-4 text-stone-500" />
            <span>Official Hotel Training Credential</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Container */}
        <div 
          id="printable-certificate"
          className="mt-6 bg-[#FCFBF9] text-stone-900 rounded-xl p-8 sm:p-12 relative shadow-sm border border-stone-300 font-sans"
        >
          {/* Subtle Watermark Monogram */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-[180px] font-extrabold tracking-tighter">LH</span>
          </div>

          {/* Top Header */}
          <div className="text-center relative z-10 space-y-1">
            <div className="inline-flex items-center justify-center gap-2 text-stone-500 tracking-widest text-[11px] uppercase font-bold">
              <span>✦</span> THE LUCKY HOTEL <span>✦</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 uppercase pt-1">
              Certificate of Competency
            </h1>
            <p className="text-xs font-medium tracking-wider uppercase text-stone-500">
              Hospitality Standards & Operations Academy
            </p>
          </div>

          {/* Subtle Divider */}
          <div className="w-24 h-0.5 bg-stone-300 mx-auto my-5" />

          {/* Recipient Details */}
          <div className="text-center relative z-10 space-y-3 max-w-xl mx-auto my-5">
            <p className="text-xs uppercase tracking-widest text-stone-500">
              This official certification is awarded to
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight border-b border-stone-200 pb-2 inline-block px-8">
              {certificate.userName}
            </h2>
            <p className="text-xs text-stone-500">
              Department of <span className="font-semibold text-stone-800">{certificate.userDepartment || 'Hospitality Operations'}</span>
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
              For successfully demonstrating theoretical proficiency and standard operating procedure compliance in:
            </p>
            <div className="p-3 bg-stone-100/70 rounded-xl border border-stone-200">
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {certificate.moduleTitle}
              </h3>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                Designation: {certificate.badgeTitle || 'Certified Specialist'}
              </p>
            </div>
          </div>

          {/* Passing Score and Validation Badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 my-5 text-center text-xs">
            <div className="px-3.5 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-stone-800">
              <span className="font-bold text-sm block font-mono">{certificate.score || 100}%</span>
              <span className="text-[11px] text-stone-500">Score</span>
            </div>
            <div className="px-3.5 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-stone-800">
              <span className="font-bold text-sm block">{certificate.issuedDate}</span>
              <span className="text-[11px] text-stone-500">Issued</span>
            </div>
            <div className="px-3.5 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-stone-800">
              <span className="font-bold text-sm block font-mono">{certificate.certificateId}</span>
              <span className="text-[11px] text-stone-500">Credential ID</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-3 items-end pt-6 mt-6 border-t border-stone-200 text-center relative z-10 text-xs">
            <div>
              <p className="font-bold text-sm text-stone-800">Marcus Vance</p>
              <div className="w-24 h-px bg-stone-300 mx-auto my-1" />
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">
                Director of Training
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center p-1 bg-stone-100">
                <ShieldCheck className="w-6 h-6 text-stone-700" />
              </div>
              <p className="text-[9px] uppercase tracking-wider text-stone-500 font-bold mt-1">
                Official Seal
              </p>
            </div>

            <div>
              <p className="font-bold text-sm text-stone-800">Executive Office</p>
              <div className="w-24 h-px bg-stone-300 mx-auto my-1" />
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">
                THE LUCKY HOTEL
              </p>
            </div>
          </div>

          {/* Verification Code */}
          <div className="mt-5 pt-3 text-center text-[10px] text-stone-400 border-t border-dashed border-stone-200">
            Digital Certificate Verification Code: <span className="font-mono font-bold text-stone-600">{certificate.verificationCode}</span> • Verified Authentic by The Lucky Hotel LMS
          </div>
        </div>

      </div>
    </div>
  );
};
