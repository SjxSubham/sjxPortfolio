import { useState, useEffect, useRef } from 'react';

const bootLines = [
  { text: 'BIOS v3.14.159 — SubhamOS Kernel', delay: 0 },
  { text: 'Initializing hardware...', delay: 200 },
  { text: '[  OK  ] Mounted /dev/portfolio', delay: 400 },
  { text: '[  OK  ] Started Network Manager', delay: 600 },
  { text: '[  OK  ] Loading skill modules...', delay: 800 },
  { text: '         → react.ko loaded', delay: 950 },
  { text: '         → node.ko loaded', delay: 1050 },
  { text: '         → python.ko loaded', delay: 1150 },
  { text: '[  OK  ] Mounting /home/subham/projects', delay: 1350 },
  { text: '[  OK  ] Starting display server...', delay: 1600 },
  { text: '[  OK  ] Loading desktop environment...', delay: 1900 },
  { text: '', delay: 2100 },
  { text: '███████╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███╗   ███╗', delay: 2200 },
  { text: '██╔════╝██║   ██║██╔══██╗██║  ██║██╔══██╗████╗ ████║', delay: 2250 },
  { text: '███████╗██║   ██║██████╔╝███████║███████║██╔████╔██║', delay: 2300 },
  { text: '╚════██║██║   ██║██╔══██╗██╔══██║██╔══██║██║╚██╔╝██║', delay: 2350 },
  { text: '███████║╚██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║', delay: 2400 },
  { text: '╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝', delay: 2450 },
  { text: '', delay: 2500 },
  { text: '  Welcome to SubhamOS v2.0 — Full Stack Developer Environment', delay: 2600 },
  { text: '  Type "help" in the terminal to get started.', delay: 2800 },
  { text: '', delay: 3000 },
  { text: '  Starting desktop in 2s...', delay: 3200 },
];

const Boot = ({ onBootComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('booting'); // booting, complete
  const containerRef = useRef(null);

  useEffect(() => {
    const timers = [];

    bootLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
        setProgress(Math.min(100, ((index + 1) / bootLines.length) * 100));

        // Auto scroll
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(timer);
    });

    // Complete boot
    const completeTimer = setTimeout(() => {
      setPhase('complete');
    }, 4000);
    timers.push(completeTimer);

    const finishTimer = setTimeout(() => {
      onBootComplete?.();
    }, 5000);
    timers.push(finishTimer);

    return () => timers.forEach(clearTimeout);
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
        }}
      />

      {/* CRT vignette */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Terminal output */}
      <div
        ref={containerRef}
        className={`w-full max-w-3xl h-[70vh] overflow-y-auto px-6 py-4 font-mono text-sm transition-opacity duration-500 ${
          phase === 'complete' ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre leading-relaxed ${
              line.startsWith('[  OK  ]')
                ? 'text-green-400'
                : line.startsWith('         →')
                ? 'text-cyan-400'
                : line.includes('███')
                ? 'text-purple-400 font-bold'
                : line.includes('Welcome') || line.includes('Type')
                ? 'text-yellow-300'
                : line.includes('Starting desktop')
                ? 'text-green-300 animate-pulse'
                : 'text-green-500/80'
            }`}
            style={{
              animation: 'bootLineIn 0.15s ease-out forwards',
              textShadow: line.includes('███') ? '0 0 10px rgba(168,85,247,0.5)' : '0 0 5px rgba(0,255,65,0.3)',
            }}
          >
            {line || '\u00A0'}
          </div>
        ))}
        {phase === 'booting' && (
          <span className="inline-block w-2.5 h-5 bg-green-400 animate-pulse ml-0.5" />
        )}
      </div>

      {/* Progress bar */}
      <div className={`w-full max-w-3xl px-6 mt-4 transition-opacity duration-500 ${
        phase === 'complete' ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-green-500/60 text-xs font-mono">Loading SubhamOS</span>
          <span className="text-green-500/60 text-xs font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-green-900/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={() => onBootComplete?.()}
        className="absolute bottom-8 right-8 text-green-500/40 hover:text-green-400 text-xs font-mono border border-green-500/20 hover:border-green-500/50 px-3 py-1 rounded transition-all duration-300"
      >
        SKIP → [ESC]
      </button>

      <style>{`
        @keyframes bootLineIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Boot;
