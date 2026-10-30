import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Subtitles, 
  Sparkles, 
  CheckCircle2, 
  Building2,
  Tv,
  ListOrdered
} from 'lucide-react';

export const VideoPlayer = ({ 
  videoUrl, 
  thumbnail, 
  title, 
  department, 
  procedureSteps = [], 
  standards = [], 
  duration = '5 min' 
}) => {
  // Parse duration into seconds (default ~150s if "5 min")
  const durationMatch = duration ? duration.match(/(\d+)/) : null;
  const totalSeconds = durationMatch ? parseInt(durationMatch[1], 10) * 30 : 150; // condensed for engaging demo

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [playerMode, setPlayerMode] = useState('simulation'); // 'simulation' | 'youtube'
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const timerRef = useRef(null);
  const containerRef = useRef(null);

  // Check if a valid YouTube link is available
  const isYouTube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
  const youtubeEmbedUrl = isYouTube 
    ? (videoUrl.includes('embed') 
        ? videoUrl 
        : `https://www.youtube-nocookie.com/embed/${videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop()}?autoplay=1&rel=0`)
    : null;

  // Active step calculated based on progress
  const stepCount = procedureSteps.length || 3;
  const activeStepIdx = Math.min(
    Math.floor((currentTime / totalSeconds) * stepCount),
    stepCount - 1
  );
  const activeStep = procedureSteps[activeStepIdx] || null;

  // Simulation timer loop
  useEffect(() => {
    if (isPlaying && playerMode === 'simulation') {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, totalSeconds, playerMode]);

  const handleTogglePlay = () => {
    if (currentTime >= totalSeconds) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(pos * totalSeconds);
    setCurrentTime(newTime);
  };

  const handleJumpToStep = (index) => {
    setSelectedMilestone(index);
    const stepDuration = totalSeconds / (procedureSteps.length || 1);
    setCurrentTime(Math.floor(index * stepDuration));
    setIsPlaying(true);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (currentTime / totalSeconds) * 100);

  return (
    <div 
      ref={containerRef}
      className="bg-stone-950 rounded-xl overflow-hidden border border-stone-800 shadow-md font-sans select-none"
    >
      {/* Top Video Header */}
      <div className="bg-stone-900/90 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between text-xs text-stone-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-stone-200">
            {department} • Training Video Demonstration
          </span>
        </div>

        <div className="flex items-center gap-2">
          {youtubeEmbedUrl && (
            <div className="flex items-center rounded-lg bg-stone-800 p-0.5 border border-stone-700 text-[11px]">
              <button
                onClick={() => { setPlayerMode('simulation'); setIsPlaying(true); }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  playerMode === 'simulation' ? 'bg-stone-950 text-white shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                Interactive SOP Demo
              </button>
              <button
                onClick={() => { setPlayerMode('youtube'); setIsPlaying(false); }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  playerMode === 'youtube' ? 'bg-stone-950 text-white shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                External Video Stream
              </button>
            </div>
          )}
          <span className="text-[11px] text-stone-400 font-mono">
            TLH HD 1080p
          </span>
        </div>
      </div>

      {/* Main Video Screen Area */}
      <div className="relative aspect-video w-full bg-stone-950 overflow-hidden flex items-center justify-center">
        
        {playerMode === 'youtube' && youtubeEmbedUrl ? (
          /* YouTube Embed View */
          <iframe
            src={youtubeEmbedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          /* Interactive SOP Simulation View (Guaranteed 100% working in any browser) */
          <div className="relative w-full h-full flex flex-col justify-between">
            
            {/* Visual Cinematic Background */}
            <div className="absolute inset-0 z-0">
              <img
                src={thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"}
                alt={title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105 filter brightness-75' : 'scale-100 filter brightness-50'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/70" />
            </div>

            {/* Top Overlay: Watermark and Live Trainer Indicator */}
            <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between">
              <div className="bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-stone-300" />
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  THE LUCKY HOTEL
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  SOP-SIMULATION
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-red-600/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  REC • 1080P
                </span>
              </div>
            </div>

            {/* Center: Play/Pause Big Button (when paused) */}
            {!isPlaying && (
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                <button
                  onClick={handleTogglePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 hover:bg-white text-stone-900 flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl pl-1 group"
                  aria-label="Play Training Video"
                >
                  <Play className="w-8 h-8 fill-stone-900 group-hover:scale-105 transition-transform" />
                </button>
                <div className="mt-4 bg-stone-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 max-w-md">
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {title}
                  </p>
                  <p className="text-[11px] text-stone-300 mt-0.5">
                    Click to start the interactive video demonstration & procedure walkthrough
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Overlay: Live Subtitles / Active Procedure Step Callout */}
            {showCaptions && activeStep && (
              <div className="relative z-10 px-4 sm:px-8 pb-3">
                <div className="bg-stone-900/90 backdrop-blur-md p-3.5 rounded-xl border border-white/15 max-w-2xl mx-auto shadow-2xl transition-all">
                  <div className="flex items-center gap-2 text-stone-400 text-[11px] mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    <span className="font-bold uppercase tracking-wider text-amber-300">
                      Phase {activeStep.step} of {procedureSteps.length}: {activeStep.action}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                    "{activeStep.detail}"
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Scrubbable Timeline & Interactive Step Markers */}
      {playerMode === 'simulation' && (
        <div className="bg-stone-900 px-4 pt-3 pb-2 border-t border-stone-800">
          
          {/* Progress bar scrubber */}
          <div 
            onClick={handleSeek}
            className="relative w-full h-2.5 bg-stone-800 rounded-full cursor-pointer overflow-hidden group mb-3"
            title="Click to seek"
          >
            <div 
              className="absolute top-0 bottom-0 left-0 bg-stone-200 transition-all rounded-full group-hover:bg-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-stone-300 text-xs">
            
            {/* Left Controls: Play/Pause, Rewind, Timer */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={() => setCurrentTime(0)}
                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs text-stone-300">
                {formatTime(currentTime)} <span className="text-stone-500">/</span> {formatTime(totalSeconds)}
              </span>
            </div>

            {/* Center: Procedure Milestone Shortcuts */}
            {procedureSteps.length > 0 && (
              <div className="hidden md:flex items-center gap-1.5">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold mr-1">
                  Step Jump:
                </span>
                {procedureSteps.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => handleJumpToStep(idx)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      activeStepIdx === idx
                        ? 'bg-stone-200 text-stone-900 font-bold'
                        : 'bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700'
                    }`}
                  >
                    Step {step.step}
                  </button>
                ))}
              </div>
            )}

            {/* Right Controls: Speed, Subtitles, Sound, Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : 1)}
                className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-[11px] font-mono text-stone-300 transition-colors"
                title="Playback Speed"
              >
                {playbackSpeed}x
              </button>

              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`p-1.5 rounded transition-colors ${
                  showCaptions ? 'text-white bg-stone-800' : 'text-stone-500 hover:text-stone-300'
                }`}
                title="Toggle Captions"
              >
                <Subtitles className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleToggleFullscreen}
                className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Footer Info Strip */}
      <div className="bg-stone-950 px-4 py-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
        <span className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-stone-500" />
          The Lucky Hotel • Five-Star Hospitality Standard Operating Procedure
        </span>
        <span className="text-stone-400">
          Module Demonstration: <strong className="text-stone-300">{title}</strong>
        </span>
      </div>

    </div>
  );
};
