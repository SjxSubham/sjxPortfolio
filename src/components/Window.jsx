import { useState, useRef, useEffect, useCallback } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';

const Window = ({
  id,
  title,
  icon,
  children,
  isActive,
  isMinimized,
  isMaximized,
  zIndex,
  defaultPosition,
  defaultSize = { width: 700, height: 500 },
  minSize = { width: 400, height: 300 },
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
}) => {
  const [position, setPosition] = useState(
    defaultPosition || {
      x: 80 + Math.random() * 200,
      y: 40 + Math.random() * 100,
    }
  );
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [preMaxPos, setPreMaxPos] = useState(null);
  const [preMaxSize, setPreMaxSize] = useState(null);
  const [isAppearing, setIsAppearing] = useState(true);
  const windowRef = useRef(null);
  const resizeDir = useRef(null);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsAppearing(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Dragging logic
  const handleMouseDown = useCallback(
    (e) => {
      if (isMaximized) return;
      e.preventDefault();
      onFocus?.();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [isMaximized, position, onFocus]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = Math.max(0, e.clientY - dragOffset.y);
        setPosition({ x: newX, y: newY });
      }
      if (isResizing && resizeDir.current) {
        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;
        const dir = resizeDir.current;
        let newW = resizeStart.current.w;
        let newH = resizeStart.current.h;
        let newX = resizeStart.current.px;
        let newY = resizeStart.current.py;

        if (dir.includes('e')) newW = Math.max(minSize.width, resizeStart.current.w + dx);
        if (dir.includes('w')) {
          newW = Math.max(minSize.width, resizeStart.current.w - dx);
          newX = resizeStart.current.px + (resizeStart.current.w - newW);
        }
        if (dir.includes('s')) newH = Math.max(minSize.height, resizeStart.current.h + dy);
        if (dir.includes('n')) {
          newH = Math.max(minSize.height, resizeStart.current.h - dy);
          newY = resizeStart.current.py + (resizeStart.current.h - newH);
        }

        setSize({ width: newW, height: newH });
        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, isResizing, dragOffset, minSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    resizeDir.current = null;
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleResizeStart = (dir) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();
    setIsResizing(true);
    resizeDir.current = dir;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
      px: position.x,
      py: position.y,
    };
  };

  const handleMaximize = () => {
    if (isMaximized) {
      if (preMaxPos) setPosition(preMaxPos);
      if (preMaxSize) setSize(preMaxSize);
      onRestore?.();
    } else {
      setPreMaxPos({ ...position });
      setPreMaxSize({ ...size });
      onMaximize?.();
    }
  };

  const handleDoubleClickTitle = () => {
    handleMaximize();
  };

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 48px)',
        zIndex: zIndex || 10,
      }
    : {
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex: zIndex || 10,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col rounded-lg overflow-hidden shadow-2xl transition-shadow duration-200 select-none
        ${isActive ? 'shadow-black/50 ring-1 ring-purple-500/30' : 'shadow-black/30 ring-1 ring-white/5'}
        ${isAppearing ? 'animate-windowOpen' : ''}
        ${isMaximized ? 'rounded-none' : ''}
      `}
      style={{
        ...windowStyle,
        backdropFilter: 'blur(20px)',
        transition: isDragging || isResizing ? 'none' : 'top 0.2s, left 0.2s, width 0.2s, height 0.2s',
      }}
      onMouseDown={() => onFocus?.()}
    >
      {/* Title bar */}
      <div
        className={`flex items-center justify-between h-10 px-3 shrink-0 cursor-default select-none
          ${isActive
            ? 'bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border-b border-purple-500/20'
            : 'bg-[#1a1a1a] border-b border-white/5'
          }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClickTitle}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="text-sm shrink-0">{icon}</span>}
          <span className={`text-xs font-medium truncate ${isActive ? 'text-white/90' : 'text-white/40'}`}>
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/50 hover:text-yellow-400 transition-colors"
            title="Minimize"
          >
            <Minus size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/50 hover:text-green-400 transition-colors"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? <Square size={11} /> : <Maximize2 size={12} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-red-500/80 text-white/50 hover:text-white transition-colors"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window body */}
      <div className="flex-1 overflow-auto bg-[#0d1117]/95 text-white/90 text-sm">
        {children}
      </div>

      {/* Resize handles (only when not maximized) */}
      {!isMaximized && (
        <>
          {/* Edges */}
          <div className="absolute top-0 left-2 right-2 h-1 cursor-n-resize" onMouseDown={handleResizeStart('n')} />
          <div className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize" onMouseDown={handleResizeStart('s')} />
          <div className="absolute top-2 left-0 bottom-2 w-1 cursor-w-resize" onMouseDown={handleResizeStart('w')} />
          <div className="absolute top-2 right-0 bottom-2 w-1 cursor-e-resize" onMouseDown={handleResizeStart('e')} />
          {/* Corners */}
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={handleResizeStart('nw')} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={handleResizeStart('ne')} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={handleResizeStart('sw')} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={handleResizeStart('se')} />
        </>
      )}

      <style>{`
        @keyframes windowOpen {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-windowOpen {
          animation: windowOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Window;
