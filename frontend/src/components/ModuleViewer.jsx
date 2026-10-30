import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { VideoPlayer } from './VideoPlayer';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PlayCircle, 
  BookOpen, 
  Clock, 
  Award, 
  ShieldCheck, 
  AlertCircle,
  FileCheck2,
  ChevronRight,
  RotateCcw,
  ListChecks,
  Check
} from 'lucide-react';

export const ModuleViewer = ({ module: initialModule, moduleId, onBack, onViewCertificate }) => {
  const { user, updateUserState } = useAuth();
  const [module, setModule] = useState(initialModule || null);
  const [loading, setLoading] = useState(!initialModule);
  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'quiz'
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState({});

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // Load module details if needed
  useEffect(() => {
    const fetchFullModule = async () => {
      const id = initialModule?.id || moduleId;
      if (!id) return;

      try {
        setLoading(true);
        const res = await api.getModuleById(id);
        if (res.success && res.module) {
          setModule(res.module);
        }
      } catch (err) {
        console.error('Failed to fetch module details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFullModule();
  }, [initialModule, moduleId]);

  // Sync user's completed lessons if available
  useEffect(() => {
    if (user && module) {
      if (user.completedModules?.includes(module.id)) {
        const allIds = module.lessons?.map(l => l.id) || [];
        setCompletedLessonIds(allIds);
      }
    }
  }, [user, module]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-500 text-xs font-medium">Loading training curriculum...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-stone-50 p-8 flex items-center justify-center font-sans">
        <div className="bg-white p-6 rounded-xl border border-stone-200 text-center max-w-md">
          <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-stone-800">Module could not be loaded.</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold"
          >
            Return to Modules
          </button>
        </div>
      </div>
    );
  }

  const currentLesson = module.lessons?.[currentLessonIndex] || null;
  const isLessonComplete = (lessonId) => completedLessonIds.includes(lessonId);
  const allLessonsDone = module.lessons?.every(l => completedLessonIds.includes(l.id));

  const handleToggleStep = (stepNumber) => {
    const key = `${currentLesson?.id}-${stepNumber}`;
    setCheckedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCompleteLesson = async () => {
    if (!currentLesson) return;

    if (!completedLessonIds.includes(currentLesson.id)) {
      setCompletedLessonIds(prev => [...prev, currentLesson.id]);
      try {
        await api.updateLessonProgress(module.id, currentLesson.id, true);
      } catch (err) {
        console.error('Failed to sync lesson progress:', err);
      }
    }

    // Advance to next lesson, or to the quiz if on the last lesson
    if (currentLessonIndex < (module.lessons?.length || 1) - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectQuizOption = (questionIndex, optionIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!module.quiz) return;

    const formattedAnswers = Object.entries(quizAnswers).map(([qIdx, ansIdx]) => ({
      questionIndex: parseInt(qIdx, 10),
      selectedOptionIndex: ansIdx
    }));

    setSubmittingQuiz(true);
    try {
      const res = await api.submitQuiz(module.id, formattedAnswers);
      if (res.success) {
        setQuizResult(res);
        if (res.passed) {
          // Update local user state
          if (user && !user.completedModules?.includes(module.id)) {
            updateUserState({
              completedModules: [...(user.completedModules || []), module.id],
              ceuCredits: (user.ceuCredits || 18.5) + (module.ceuCredits || 1.5)
            });
          }
        }
      }
    } catch (err) {
      console.error('Quiz submission error:', err);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 pb-20">
      
      {/* Top Header Navigation Strip */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Modules</span>
            </button>
            <div className="hidden sm:block border-l border-stone-200 pl-4">
              <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block">
                {module.courseCode || module.id} • {module.sopCode || 'SOP'}
              </span>
              <h2 className="text-xs font-bold text-stone-900 truncate max-w-md">
                {module.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
              <Award className="w-3.5 h-3.5 text-stone-500" />
              <span>{module.ceuCredits || 1.5} CEU Credits</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Learning Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Lesson Directory & Curriculum Progress */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm sticky top-32">
              
              <div className="pb-4 border-b border-stone-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  Curriculum Outline
                </span>
                <h3 className="text-sm font-bold text-stone-900 mt-1">
                  {module.title}
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {module.department} • {module.level || 'Foundational'}
                </p>
              </div>

              {/* Lesson Items */}
              <div className="space-y-2 mt-4">
                {module.lessons?.map((lesson, idx) => {
                  const isCurrent = activeTab === 'lesson' && currentLessonIndex === idx;
                  const isDone = isLessonComplete(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setActiveTab('lesson');
                        setCurrentLessonIndex(idx);
                      }}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                        isCurrent
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200/60'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isCurrent ? 'border-white/50 text-white' : 'border-stone-400 text-stone-600'
                          }`}>
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-white' : 'text-stone-900'}`}>
                          {lesson.title}
                        </p>
                        <span className={`text-[10px] font-medium mt-1 flex items-center gap-1 ${
                          isCurrent ? 'text-stone-300' : 'text-stone-500'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Final Knowledge Check Item */}
                {module.quiz && (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all mt-3 border ${
                      activeTab === 'quiz'
                        ? 'bg-stone-900 text-white shadow-sm border-stone-900'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <ShieldCheck className={`w-4 h-4 ${
                        quizResult?.passed ? 'text-emerald-400' : activeTab === 'quiz' ? 'text-stone-300' : 'text-stone-700'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold leading-tight ${activeTab === 'quiz' ? 'text-white' : 'text-stone-900'}`}>
                        Knowledge Assessment
                      </p>
                      <p className={`text-[10px] mt-0.5 ${activeTab === 'quiz' ? 'text-stone-300' : 'text-stone-500'}`}>
                        80% passing grade required for certificate
                      </p>
                    </div>
                  </button>
                )}
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <div className="flex justify-between text-[11px] text-stone-600 font-medium mb-1.5">
                  <span>Module Progress</span>
                  <span>
                    {Math.round(
                      ((completedLessonIds.length + (quizResult?.passed ? 1 : 0)) / 
                      ((module.lessons?.length || 1) + (module.quiz ? 1 : 0))) * 100
                    )}%
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-stone-900 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.round(
                        ((completedLessonIds.length + (quizResult?.passed ? 1 : 0)) / 
                        ((module.lessons?.length || 1) + (module.quiz ? 1 : 0))) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Active Content (Lesson or Quiz) */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            
            {activeTab === 'lesson' && currentLesson && (
              <div className="space-y-6">
                
                {/* Lesson Header Card */}
                <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      Lesson {currentLessonIndex + 1} of {module.lessons?.length || 1}
                    </span>
                    <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      Estimated Duration: {currentLesson.duration}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-3">
                    {currentLesson.title}
                  </h1>

                  {currentLesson.sopObjective && (
                    <div className="mt-3 p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                      <strong className="text-stone-900 font-semibold block mb-0.5">SOP Objective:</strong>
                      {currentLesson.sopObjective}
                    </div>
                  )}
                </div>

                {/* Training Video Demonstration & SOP Walkthrough */}
                <VideoPlayer
                  videoUrl={
                    currentLesson.videoUrl && !currentLesson.videoUrl.includes('mixkit.co')
                      ? currentLesson.videoUrl
                      : (module.staffRole === 'housekeeping'
                          ? 'https://www.youtube-nocookie.com/embed/2i3eU0vQ-pQ'
                          : module.staffRole === 'food-beverage'
                            ? 'https://www.youtube-nocookie.com/embed/w_O9tH30_uE'
                            : module.staffRole === 'kitchen'
                              ? 'https://www.youtube-nocookie.com/embed/f9cQ-Yq0Z2I'
                              : 'https://www.youtube-nocookie.com/embed/B3pb8y-0Cos')
                  }
                  thumbnail={module.thumbnail}
                  title={currentLesson.title}
                  department={module.department}
                  procedureSteps={currentLesson.procedureSteps}
                  standards={currentLesson.standards}
                  duration={currentLesson.duration}
                />

                {/* Core Hospitality Standards */}
                {currentLesson.standards && currentLesson.standards.length > 0 && (
                  <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-4 h-4 text-stone-700" />
                      <span>The Lucky Hotel Core Operating Standards</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {currentLesson.standards.map((std, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed bg-stone-50/80 p-3 rounded-lg border border-stone-200/60">
                          <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{std}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Step-by-Step SOP Checklist */}
                {currentLesson.procedureSteps && currentLesson.procedureSteps.length > 0 && (
                  <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-stone-700" />
                        <span>Step-by-Step Execution Sequence</span>
                      </h3>
                      <span className="text-[11px] text-stone-500 font-medium">
                        Click checkmark after reviewing step
                      </span>
                    </div>

                    <div className="space-y-3">
                      {currentLesson.procedureSteps.map((stepItem) => {
                        const isChecked = !!checkedSteps[`${currentLesson.id}-${stepItem.step}`];
                        return (
                          <div
                            key={stepItem.step}
                            onClick={() => handleToggleStep(stepItem.step)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                              isChecked
                                ? 'bg-stone-50 border-stone-400 text-stone-900'
                                : 'bg-white border-stone-200 hover:border-stone-300 text-stone-800'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 bg-white'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                            </div>

                            <div className="flex-1">
                              <p className={`text-xs font-bold ${isChecked ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                                Step {stepItem.step}: {stepItem.action}
                              </p>
                              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                                {stepItem.detail}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Supervisor Audit Criteria */}
                {currentLesson.auditChecklist && currentLesson.auditChecklist.length > 0 && (
                  <div className="bg-stone-50 rounded-xl border border-stone-200 p-5">
                    <h4 className="text-xs font-bold text-stone-900 mb-2 uppercase tracking-wider">
                      Supervisor Audit Checklist
                    </h4>
                    <p className="text-[11px] text-stone-500 mb-3">
                      Hotel departmental supervisors audit associates on the following points:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentLesson.auditChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center justify-between">
                  <div className="text-xs text-stone-500">
                    {isLessonComplete(currentLesson.id) ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Lesson marked as completed
                      </span>
                    ) : (
                      <span>Review the standards and proceed</span>
                    )}
                  </div>

                  <button
                    onClick={handleCompleteLesson}
                    className="px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <span>
                      {currentLessonIndex < (module.lessons?.length || 1) - 1
                        ? 'Complete & Continue Next'
                        : 'Proceed to Assessment'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* Quiz / Assessment View */}
            {activeTab === 'quiz' && module.quiz && (
              <div className="space-y-6">
                
                {/* Assessment Header */}
                <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      Hotel Certification Assessment
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      Required Grade: {module.quiz.passingScore || 80}%
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-stone-900 mt-3">
                    Knowledge Assessment: {module.title}
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    Answer all scenario questions accurately based on The Lucky Hotel standard operating procedures.
                  </p>
                </div>

                {/* Result Card if Submitted */}
                {quizResult && (
                  <div className={`p-6 rounded-xl border shadow-sm ${
                    quizResult.passed 
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                      : 'bg-rose-50/70 border-rose-300 text-rose-950'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {quizResult.passed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-rose-600" />
                          )}
                          <h3 className="text-lg font-bold">
                            {quizResult.passed ? 'Congratulations! You Passed' : 'Assessment Not Passed'}
                          </h3>
                        </div>
                        <p className="text-xs mt-1">
                          You scored <strong className="text-sm font-mono">{quizResult.score}%</strong> (Passing threshold is {module.quiz.passingScore || 80}%).
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {quizResult.passed ? (
                          quizResult.certificate && onViewCertificate && (
                            <button
                              onClick={() => onViewCertificate(quizResult.certificate)}
                              className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                            >
                              <Award className="w-4 h-4 text-stone-300" />
                              <span>View Certificate</span>
                            </button>
                          )
                        ) : (
                          <button
                            onClick={handleRetakeQuiz}
                            className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retake Assessment</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Questions List */}
                <div className="space-y-4">
                  {module.quiz.questions?.map((q, qIdx) => {
                    const selectedOpt = quizAnswers[qIdx];
                    const isSubmitted = !!quizResult;
                    const isCorrect = isSubmitted && selectedOpt === q.correctAnswer;

                    return (
                      <div key={q.id || qIdx} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                            Question {qIdx + 1} of {module.quiz.questions.length}
                          </span>
                          {isSubmitted && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-stone-900 mb-4">
                          {q.question}
                        </h4>

                        <div className="space-y-2">
                          {q.options?.map((opt, optIdx) => {
                            const isChosen = selectedOpt === optIdx;
                            return (
                              <button
                                key={optIdx}
                                disabled={isSubmitted}
                                onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                                className={`w-full text-left p-3.5 rounded-lg text-xs font-medium transition-all flex items-start gap-3 border ${
                                  isChosen
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 font-bold ${
                                  isChosen ? 'border-white text-white' : 'border-stone-400 text-stone-600'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="flex-1 mt-0.5">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Rationale displayed after submission */}
                        {isSubmitted && q.rationale && (
                          <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 leading-relaxed">
                            <strong className="text-stone-900 font-semibold block mb-0.5">SOP Rationale:</strong>
                            {q.rationale}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quiz Submission Button */}
                {!quizResult && (
                  <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      {Object.keys(quizAnswers).length} of {module.quiz.questions?.length || 0} questions answered
                    </span>

                    <button
                      onClick={handleSubmitQuiz}
                      disabled={submittingQuiz || Object.keys(quizAnswers).length < (module.quiz.questions?.length || 1)}
                      className="px-6 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold transition-colors shadow-sm"
                    >
                      {submittingQuiz ? 'Evaluating...' : 'Submit Assessment'}
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

