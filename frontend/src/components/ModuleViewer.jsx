import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  FileCheck2, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight, 
  RotateCcw, 
  FileText,
  Play,
  Pause,
  Volume2,
  Maximize2,
  CheckSquare,
  HelpCircle
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';

export const ModuleViewer = ({ module, onBack, onModuleUpdated }) => {
  const { user, updateUserState } = useAuth();
  
  // State
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' or 'quiz'
  const [activeLessonSubtab, setActiveLessonSubtab] = useState('sop'); // 'sop', 'audit', 'liabilities'
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [checkedChecklist, setCheckedChecklist] = useState({});
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [earnedCertificate, setEarnedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const lessons = module.lessons || [];
  const currentLesson = lessons[currentLessonIndex];
  const isModuleCompleted = user?.completedModules?.includes(module.id) || user?.completedModules?.includes(module.courseCode);

  const handleToggleAuditItem = (idx) => {
    const key = `${currentLesson.id}_audit_${idx}`;
    setCheckedChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCompleteLesson = async () => {
    if (!currentLesson) return;
    try {
      const res = await api.updateLessonProgress(module.id, currentLesson.id, true);
      if (res.success) {
        setToastMessage(`Lesson Completed! +${res.xpGained} Experience Logged`);
        setTimeout(() => setToastMessage(null), 3000);
        if (res.user) updateUserState(res.user);

        if (currentLessonIndex < lessons.length - 1) {
          setCurrentLessonIndex(prev => prev + 1);
        } else {
          setActiveTab('quiz');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuizAnswerSelect = (questionId, optionIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.submitQuiz(module.id, quizAnswers);
      if (res.success) {
        setQuizResults(res);
        setQuizSubmitted(true);
        if (res.user) updateUserState(res.user);

        if (res.passed) {
          confetti({ particleCount: 110, spread: 70, origin: { y: 0.6 } });
          setToastMessage(`Examination Passed! Official Diploma Generated.`);
          setTimeout(() => setToastMessage(null), 4000);
          if (res.certificate) {
            setEarnedCertificate(res.certificate);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizResults(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Staff Course Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
            {module.courseCode || module.id}
          </span>
          <span>•</span>
          <span>{module.department}</span>
          <span>•</span>
          <span className="text-stone-700 font-semibold">{module.type}</span>
        </div>
      </div>

      {/* Course Title Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 hotel-shadow flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
              SOP Reference: {module.sopCode || 'SOP-GLH-01'}
            </span>
            {isModuleCompleted && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certified Record on File</span>
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-sans font-bold text-slate-900">
            {module.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {module.summary}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 border-l border-slate-200 pl-6">
          <div>
            <div className="font-bold text-slate-900 font-mono text-sm">{module.duration}</div>
            <div className="text-[11px] text-slate-400">Duration</div>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div>
            <div className="font-bold text-slate-900 font-mono text-sm">{lessons.length} Modules</div>
            <div className="text-[11px] text-slate-400">Lessons</div>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div>
            <div className="font-bold text-emerald-700 font-mono text-sm">{module.ceuCredits || 2.0} CEU</div>
            <div className="text-[11px] text-slate-400">Accredited</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Content Player + Course Syllabus Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 Columns: Video Player + SOP Tab View */}
        <div className="lg:col-span-3 space-y-6">
          
          {activeTab === 'lessons' && currentLesson && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hotel-shadow">
              
              {/* Realistic Video / Multimedia Lecture Player */}
              <div className="relative bg-slate-950 aspect-video flex flex-col justify-between overflow-hidden group">
                {/* Background Video Frame */}
                <img
                  src={module.thumbnail}
                  alt={currentLesson.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                
                {/* Top Video Overlay Bar */}
                <div className="relative z-10 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold bg-stone-800 px-2 py-0.5 rounded text-[10px]">
                      HD SOP LECTURE
                    </span>
                    <span className="font-semibold text-slate-200">
                      Lesson {currentLessonIndex + 1}: {currentLesson.title}
                    </span>
                  </div>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {currentLesson.duration}
                  </span>
                </div>

                {/* Big Center Play Button */}
                <div className="relative z-10 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                  >
                    {isPlayingVideo ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1 text-slate-900 fill-slate-900" />}
                  </button>
                </div>

                {/* Bottom Video Player Controls Bar */}
                <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white space-y-2">
                  {/* Progress scrubber bar */}
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                    <div className="w-2/5 h-full bg-stone-1000 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsPlayingVideo(!isPlayingVideo)}>
                        {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <Volume2 className="w-4 h-4 cursor-pointer" />
                      <span className="font-mono text-[11px] text-slate-400">03:42 / {currentLesson.duration}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">1080p HD</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">1.0x</span>
                      <Maximize2 className="w-4 h-4 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Tabs Under Video */}
              <div className="border-b border-slate-200 bg-slate-50 px-6 flex items-center gap-6 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setActiveLessonSubtab('sop')}
                  className={`py-3.5 border-b-2 flex items-center gap-2 ${
                    activeLessonSubtab === 'sop'
                      ? 'border-slate-900 text-slate-900 font-bold'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Standard Operating Manual</span>
                </button>

                <button
                  onClick={() => setActiveLessonSubtab('audit')}
                  className={`py-3.5 border-b-2 flex items-center gap-2 ${
                    activeLessonSubtab === 'audit'
                      ? 'border-slate-900 text-slate-900 font-bold'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Floor Audit Inspection Checklist</span>
                </button>

                <button
                  onClick={() => setActiveLessonSubtab('liabilities')}
                  className={`py-3.5 border-b-2 flex items-center gap-2 ${
                    activeLessonSubtab === 'liabilities'
                      ? 'border-slate-900 text-slate-900 font-bold'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Non-Negotiable Luxury Benchmarks</span>
                </button>
              </div>

              {/* Subtab Body */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* 1. Standard Operating Manual */}
                {activeLessonSubtab === 'sop' && (
                  <div className="space-y-6">
                    {currentLesson.sopObjective && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                        <strong className="text-slate-900 font-bold block mb-0.5">
                          Operational Objective:
                        </strong>
                        {currentLesson.sopObjective}
                      </div>
                    )}

                    {/* Step-by-Step Execution Sequence */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Standard Execution Sequence (Step-by-Step)
                      </h4>

                      <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                        {currentLesson.procedureSteps?.map((step, idx) => (
                          <div key={idx} className="p-4 flex items-start gap-3.5 text-xs">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                              {step.step || idx + 1}
                            </span>
                            <div className="flex-1 space-y-1">
                              <div className="font-bold text-slate-900 text-sm">
                                {step.action}
                              </div>
                              <p className="text-slate-600 leading-relaxed">
                                {step.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Floor Audit Inspection Checklist */}
                {activeLessonSubtab === 'audit' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-500">
                      Hotel Quality Auditors verify these criteria during unannounced inspections. Check each benchmark to test your understanding:
                    </div>

                    <div className="space-y-2.5">
                      {currentLesson.auditChecklist?.map((item, idx) => {
                        const isChecked = checkedChecklist[`${currentLesson.id}_audit_${idx}`];
                        return (
                          <div
                            key={idx}
                            onClick={() => handleToggleAuditItem(idx)}
                            className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Non-Negotiable Luxury Benchmarks */}
                {activeLessonSubtab === 'liabilities' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Mandatory Forbes Standards for This Procedure
                    </h4>

                    <div className="space-y-3">
                      {currentLesson.standards?.map((std, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs text-amber-950 flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{std}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Navigation Buttons */}
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <button
                    disabled={currentLessonIndex === 0}
                    onClick={() => setCurrentLessonIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40"
                  >
                    Previous Lesson
                  </button>

                  <button
                    onClick={handleCompleteLesson}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <span>
                      {currentLessonIndex === lessons.length - 1 ? 'Finish Lessons & Take Compliance Exam' : 'Verify Lesson & Proceed Next'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* Exam Tab */}
          {activeTab === 'quiz' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-200 pb-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                    Official Competency Examination
                  </span>
                  <h2 className="text-xl font-bold font-sans font-bold text-slate-900 mt-2">
                    {module.title} — Standard Certification Exam
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Passing Benchmark</span>
                  <span className="text-lg font-bold font-mono text-emerald-700">
                    {module.quiz?.passingScore || 80}%
                  </span>
                </div>
              </div>

              {/* Quiz Results Summary (if submitted) */}
              {quizSubmitted && quizResults && (
                <div className={`p-6 rounded-2xl border ${
                  quizResults.passed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        quizResults.passed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {quizResults.passed ? <Award className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-base font-bold">
                          {quizResults.passed ? 'Certification Granted!' : 'Passing Threshold Not Met'}
                        </h3>
                        <p className="text-xs">
                          Score Achieved: <strong className="font-mono text-sm">{quizResults.score}%</strong> ({quizResults.correctCount} of {quizResults.totalQuestions} questions correct)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {quizResults.passed && (
                        <button
                          onClick={() => setShowCertificateModal(true)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md"
                        >
                          <Award className="w-4 h-4" />
                          <span>View Official Certificate</span>
                        </button>
                      )}
                      <button
                        onClick={handleRetakeQuiz}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Exam</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {module.quiz?.questions?.map((q, qIndex) => {
                  const selectedAnswer = quizAnswers[q.id];
                  const result = quizResults?.results?.find(r => r.questionId === q.id);

                  return (
                    <div 
                      key={q.id} 
                      className={`p-5 rounded-xl border ${
                        quizSubmitted
                          ? result?.isCorrect
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : 'bg-rose-50/50 border-rose-300'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="font-bold text-slate-900 text-sm">
                          {qIndex + 1}. {q.question}
                        </span>
                        {quizSubmitted && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            result?.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {result?.isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = selectedAnswer === optIndex;
                          const isCorrect = optIndex === q.correctAnswer;

                          let style = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                          if (isSelected) {
                            style = 'bg-stone-100 border-stone-900 text-stone-900 font-semibold';
                          }
                          if (quizSubmitted) {
                            if (isCorrect) {
                              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                            } else if (isSelected && !isCorrect) {
                              style = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
                            }
                          }

                          return (
                            <div
                              key={optIndex}
                              onClick={() => handleQuizAnswerSelect(q.id, optIndex)}
                              className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-3 ${style}`}
                            >
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-stone-800 text-white border-stone-800 font-bold' : 'border-slate-400'
                              }`}>
                                {String.fromCharCode(65 + optIndex)}
                              </div>
                              <span className="flex-1">{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {quizSubmitted && result && (
                        <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                          <strong className="text-slate-900 block font-semibold mb-0.5">
                            Hotel SOP Explanation:
                          </strong>
                          {result.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              {!quizSubmitted && (
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    disabled={isSubmitting || Object.keys(quizAnswers).length < (module.quiz?.questions?.length || 1)}
                    onClick={handleSubmitQuiz}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md disabled:opacity-40"
                  >
                    <span>{isSubmitting ? 'Evaluating...' : 'Submit Answers & Finalize Credential'}</span>
                    <Award className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right 1 Column: Course Syllabus & Module Navigation */}
        <div className="lg:col-span-1 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 hotel-shadow space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Course Syllabus
            </h3>

            <div className="space-y-1.5">
              {lessons.map((lesson, idx) => {
                const isActive = activeTab === 'lessons' && currentLessonIndex === idx;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveTab('lessons');
                      setCurrentLessonIndex(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {idx < currentLessonIndex || isModuleCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border text-[10px] flex items-center justify-center font-mono ${
                          isActive ? 'border-amber-400 text-stone-300' : 'border-slate-400 text-slate-500'
                        }`}>
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{lesson.title}</div>
                      <div className={`text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                        {lesson.duration}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Exam button */}
              <button
                onClick={() => setActiveTab('quiz')}
                className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center gap-2.5 mt-2 border ${
                  activeTab === 'quiz'
                    ? 'bg-stone-800 text-white border-stone-800 font-bold shadow-sm'
                    : 'bg-stone-100 hover:bg-amber-100 text-stone-900 border-stone-200 font-semibold'
                }`}
              >
                <Award className="w-4 h-4 text-stone-700 shrink-0" />
                <div className="flex-1">
                  <div>Certification Exam</div>
                  <div className={`text-[10px] ${activeTab === 'quiz' ? 'text-amber-100' : 'text-stone-700'}`}>
                    80% required to pass
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Accreditation Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Accreditation</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Completing this course grants <strong>{module.ceuCredits || 2.0} CEU credits</strong> toward your annual luxury hospitality license.
            </p>
          </div>

        </div>

      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          certificate={earnedCertificate || {
            userName: user?.name || "Aiden Mercer",
            userDepartment: user?.department || module.department,
            moduleTitle: module.title,
            badgeTitle: `${module.courseCode} Certified Specialist`,
            score: quizResults?.score || 100,
            issuedDate: new Date().toISOString().split('T')[0],
            certificateId: `GLP-CERT-${Date.now().toString(36).toUpperCase()}`,
            verificationCode: `GLP-VERIFY-${Math.floor(100000 + Math.random() * 900000)}`
          }}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

    </div>
  );
};
