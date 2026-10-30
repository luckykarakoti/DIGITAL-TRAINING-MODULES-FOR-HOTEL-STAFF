import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  User, 
  ArrowRight, 
  ChevronRight, 
  ShieldAlert,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export const ScenarioSimulator = () => {
  const { updateUserState } = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [activeScenario, setActiveScenario] = useState(null);
  const [currentStageId, setCurrentStageId] = useState(1);
  const [satisfactionScore, setSatisfactionScore] = useState(60);
  const [selectedOption, setSelectedOption] = useState(null);
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getScenarios();
        if (res.success && res.scenarios.length > 0) {
          setScenarios(res.scenarios);
          setActiveScenario(res.scenarios[0]);
          setCurrentStageId(1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSelectScenario = (scen) => {
    setActiveScenario(scen);
    setCurrentStageId(1);
    setSatisfactionScore(60);
    setSelectedOption(null);
    setDecisionHistory([]);
    setIsCompleted(false);
  };

  const handleChooseOption = async (option) => {
    if (selectedOption) return;
    setSelectedOption(option);

    const newScore = Math.min(100, Math.max(0, satisfactionScore + option.scoreDelta));
    setSatisfactionScore(newScore);

    try {
      const res = await api.submitScenarioDecision(activeScenario.id, currentStageId, option.id);
      if (res.success) {
        setDecisionHistory(prev => [...prev, { stageId: currentStageId, option, response: res }]);
        
        if (!option.nextStageId) {
          setIsCompleted(true);
          if (newScore >= 70) {
            confetti({ particleCount: 90, spread: 60 });
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNextStage = () => {
    if (selectedOption && selectedOption.nextStageId) {
      setCurrentStageId(selectedOption.nextStageId);
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    setCurrentStageId(1);
    setSatisfactionScore(60);
    setSelectedOption(null);
    setDecisionHistory([]);
    setIsCompleted(false);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <Sparkles className="w-8 h-8 mx-auto mb-3 animate-spin text-stone-600" />
        <p>Loading guest incident simulators...</p>
      </div>
    );
  }

  const currentStage = activeScenario?.stages?.find(s => s.stageId === currentStageId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
          <MessageSquare className="w-4 h-4 text-stone-700" />
          <span>Interactive Guest Service Simulation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-sans font-bold text-slate-900">
          Frontline Guest Conflict Resolution Scenarios
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
          Practice empathetic de-escalation, Forbes Five-Star phraseology, and frontline empowerment budgeting in realistic hospitality crises.
        </p>

        {/* Scenario Selector Pills */}
        <div className="flex flex-wrap gap-2.5 mt-5 pt-4 border-t border-slate-100">
          {scenarios.map((scen) => (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(scen)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                activeScenario?.id === scen.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{scen.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                activeScenario?.id === scen.id ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-600'
              }`}>
                {scen.department.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeScenario && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Guest Dossier & Meter */}
          <div className="lg:col-span-1 space-y-4">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 hotel-shadow space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={activeScenario.guestAvatar}
                  alt={activeScenario.guestName}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-200 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {activeScenario.guestName}
                  </h3>
                  <div className="text-xs text-stone-700 font-semibold">
                    {activeScenario.guestRole}
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                    {activeScenario.difficulty}
                  </span>
                </div>
              </div>

              {/* Guest Satisfaction Gauge */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Guest Satisfaction:</span>
                  <span className={`font-mono font-bold text-sm ${
                    satisfactionScore >= 75 ? 'text-emerald-700' : satisfactionScore >= 45 ? 'text-stone-700' : 'text-rose-700'
                  }`}>
                    {satisfactionScore}%
                  </span>
                </div>
                
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      satisfactionScore >= 75
                        ? 'bg-emerald-600'
                        : satisfactionScore >= 45
                        ? 'bg-stone-700'
                        : 'bg-rose-600'
                    }`}
                    style={{ width: `${satisfactionScore}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  {satisfactionScore >= 80 ? 'Delighted & confident in hotel ownership' : satisfactionScore >= 50 ? 'Listening cautiously' : 'Severely displeased & frustrated'}
                </p>
              </div>

              {/* Scenario Briefing */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Incident Briefing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeScenario.scenarioSetup}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between text-xs text-slate-600">
              <span>Resolution Reward:</span>
              <span className="font-bold text-slate-900 font-mono">
                +{activeScenario.xpReward} XP
              </span>
            </div>
          </div>

          {/* Right 2 Columns: Decision Interface */}
          <div className="lg:col-span-2">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                  Incident Stage {currentStageId}
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Simulation</span>
                </button>
              </div>

              {/* Spoken Guest Grievance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed italic relative">
                <span className="text-stone-600 font-sans font-bold text-3xl absolute -top-2 left-2 pointer-events-none opacity-40">“</span>
                <p className="pl-4 font-sans font-bold">
                  {currentStage?.prompt}
                </p>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Your Operational & Verbal Action:
                </h4>

                {currentStage?.options.map((opt) => {
                  const isPicked = selectedOption?.id === opt.id;
                  let style = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';

                  if (selectedOption) {
                    if (opt.isBest) {
                      style = 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium';
                    } else if (isPicked && !opt.isBest) {
                      style = 'border-rose-400 bg-rose-50/60 text-rose-950';
                    } else {
                      style = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleChooseOption(opt)}
                      className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[10px] mt-0.5 ${
                          isPicked ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'border-slate-300 text-slate-600'
                        }`}>
                          {opt.id.slice(-1).toUpperCase()}
                        </div>
                        <div className="flex-1 leading-relaxed">
                          {opt.text}
                        </div>
                      </div>

                      {/* Feedback */}
                      {selectedOption && (isPicked || opt.isBest) && (
                        <div className={`mt-3 pt-3 border-t text-xs leading-relaxed ${
                          opt.isBest ? 'border-emerald-200 text-emerald-800' : 'border-rose-200 text-rose-800'
                        }`}>
                          <strong className="block mb-0.5">
                            {opt.isBest ? '✓ Forbes Five-Star Protocol Mastered:' : '⚠ Service Recovery Error:'}
                          </strong>
                          {opt.feedback}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Next Step / Complete */}
              {selectedOption && (
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  {selectedOption.nextStageId ? (
                    <button
                      onClick={handleNextStage}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <span>Proceed to Next Stage</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 w-full text-center space-y-2">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-slate-900 text-sm">Incident Successfully Resolved!</h4>
                      <p className="text-xs text-slate-600">
                        Final Guest Satisfaction Score: <strong className="font-mono text-emerald-700">{satisfactionScore}%</strong>. You earned +{activeScenario.xpReward} XP!
                      </p>
                      <button
                        onClick={handleReset}
                        className="mt-2 px-4 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Try Again to Achieve 100% Score
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
