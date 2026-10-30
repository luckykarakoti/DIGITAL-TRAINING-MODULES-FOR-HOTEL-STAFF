import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  SearchCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Award, 
  Bed, 
  Wine, 
  Clock, 
  Bath, 
  Sun 
} from 'lucide-react';

export const RoomInspectionView = () => {
  const [challenge, setChallenge] = useState(null);
  const [identifiedDefectIds, setIdentifiedDefectIds] = useState([]);
  const [inspectionResult, setInspectionResult] = useState(null);
  const [selectedInspectionZone, setSelectedInspectionZone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getInspectionData();
        if (res.success && res.challenge) {
          setChallenge(res.challenge);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleToggleDefect = (defectId) => {
    if (inspectionResult) return;
    setIdentifiedDefectIds(prev => 
      prev.includes(defectId) ? prev.filter(id => id !== defectId) : [...prev, defectId]
    );
  };

  const handleSubmitAudit = async () => {
    try {
      const res = await api.submitInspection(identifiedDefectIds);
      if (res.success) {
        setInspectionResult(res);
        if (res.score >= 80) {
          confetti({ particleCount: 100, spread: 70 });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setIdentifiedDefectIds([]);
    setInspectionResult(null);
    setSelectedInspectionZone(null);
  };

  if (loading || !challenge) {
    return (
      <div className="py-20 text-center text-slate-500">
        <Sparkles className="w-8 h-8 mx-auto mb-3 animate-spin text-stone-600" />
        <p>Loading luxury suite inspection challenge...</p>
      </div>
    );
  }

  const defects = challenge.defects || [];
  const foundCount = identifiedDefectIds.length;
  const totalCount = challenge.targetDefectsCount || 5;

  const inspectionStations = [
    {
      id: 'def-1',
      zoneName: 'King Master Bed & Pillows',
      icon: Bed,
      defect: defects.find(d => d.id === 'def-1')
    },
    {
      id: 'def-2',
      zoneName: 'Minibar & Crystal Glassware',
      icon: Wine,
      defect: defects.find(d => d.id === 'def-2')
    },
    {
      id: 'def-3',
      zoneName: 'Master Bathroom Chrome Vanity',
      icon: Bath,
      defect: defects.find(d => d.id === 'def-3')
    },
    {
      id: 'def-4',
      zoneName: 'Bedside Nightstand Clock & Tech',
      icon: Clock,
      defect: defects.find(d => d.id === 'def-4')
    },
    {
      id: 'def-5',
      zoneName: 'Panoramic Drapes & Sheers',
      icon: Sun,
      defect: defects.find(d => d.id === 'def-5')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
            <SearchCheck className="w-4 h-4 text-stone-700" />
            <span>Housekeeping & Quality Assurance Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans font-bold text-slate-900">
            Presidential Penthouse Suite 401 VIP Pre-Arrival Audit
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Spot-check Suite 401 before guest arrival. Identify all 5 critical Forbes Five-Star housekeeping and presentation infractions!
          </p>
        </div>

        {/* Audit Status Counter */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3">
            <div className="text-2xl font-bold font-mono text-slate-900">
              {foundCount}/{totalCount}
            </div>
            <div className="text-xs text-slate-500">
              Defects Flagged
            </div>
          </div>

          {!inspectionResult && (
            <button
              onClick={handleSubmitAudit}
              disabled={foundCount === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md disabled:opacity-40"
            >
              Submit Inspection Audit
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Result Alert */}
      {inspectionResult && (
        <div className={`p-5 rounded-2xl border ${
          inspectionResult.passed
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
            : 'bg-stone-100 border-stone-300 text-amber-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              inspectionResult.passed ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-white'
            }`}>
              {inspectionResult.passed ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-sm">
                Audit Result: {inspectionResult.score}% Accuracy (+{inspectionResult.xpGained} XP)
              </h3>
              <p className="text-xs mt-0.5">
                {inspectionResult.feedback}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Suite Stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inspectionStations.map((station) => {
          const Icon = station.icon;
          const isIdentified = identifiedDefectIds.includes(station.id);

          return (
            <div
              key={station.id}
              onClick={() => handleToggleDefect(station.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white hotel-shadow ${
                isIdentified
                  ? 'border-stone-600 bg-stone-100/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isIdentified ? 'bg-stone-800 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                  isIdentified
                    ? 'bg-stone-100 text-stone-800 border-stone-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {isIdentified ? 'Defect Flagged' : 'Click to Inspect'}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-1">
                {station.zoneName}
              </h3>

              {station.defect && (
                <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {station.defect.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 font-mono">
                    <span>{station.defect.standardReference}</span>
                    <span className="font-sans font-semibold text-stone-700">
                      Severity: {station.defect.severity}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
