import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  Sparkles,
  Info,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Layers,
  Activity
} from 'lucide-react';
import { DiagramSpec, DiagramNode, DiagramFlowStep } from '../types/diagram';
import { ttsService } from '../services/TTSService';

interface EducationalDiagramProps {
  spec: DiagramSpec;
  className?: string;
  initialSelectedNodeId?: string;
}

export const EducationalDiagram: React.FC<EducationalDiagramProps> = ({
  spec,
  className = '',
  initialSelectedNodeId
}) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBloodFlow, setShowBloodFlow] = useState(true);
  
  // Interactive Node Selection
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(
    initialSelectedNodeId
      ? spec.nodes.find((n) => n.id === initialSelectedNodeId) || spec.nodes[0] || null
      : spec.nodes[0] || null
  );

  // Flow Stepper State
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [isPlayingFlow, setIsPlayingFlow] = useState(false);
  const flowTimerRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const viewBox = spec.viewBox || { minX: 0, minY: 0, width: 800, height: 520 };

  // Handle Zoom In / Out / Reset
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.6));
  const handleResetZoom = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse Wheel Zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only zoom if ctrlKey is held or hovered directly over svg canvas
      if (e.target && (e.target as HTMLElement).closest('svg')) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.15 : -0.15;
        setScale((prev) => Math.min(Math.max(prev + delta, 0.6), 2.5));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Mouse & Touch Pan Handling
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'svg' || target.tagName === 'path' || target.tagName === 'rect' || target.classList.contains('pan-surface')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Pan & Pinch Zoom
  const touchStartRef = useRef<{ dist: number; panX: number; panY: number; touchX: number; touchY: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      touchStartRef.current = {
        dist,
        panX: pan.x,
        panY: pan.y,
        touchX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        touchY: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    } else if (e.touches.length === 2 && touchStartRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = dist / touchStartRef.current.dist;
      setScale((prev) => Math.min(Math.max(prev * (ratio > 1 ? 1.03 : 0.97), 0.6), 2.5));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartRef.current = null;
  };

  // Speech TTS for selected part
  const speakSelectedPart = () => {
    if (!selectedNode) return;
    const text = `${selectedNode.label}. ${selectedNode.details?.functionHinglish || selectedNode.details?.functionEn || selectedNode.sublabel || ''}. ${selectedNode.details?.ncertNote ? 'Exam tip: ' + selectedNode.details.ncertNote : ''}`;
    ttsService.play(text);
  };

  // Flow Stepper Navigation
  const steps = spec.flowSteps || [];
  
  const handleNextStep = () => {
    if (!steps.length) return;
    const nextIdx = currentStepIndex === null ? 0 : (currentStepIndex + 1) % steps.length;
    setCurrentStepIndex(nextIdx);
    highlightStepNodes(steps[nextIdx]);
  };

  const handlePrevStep = () => {
    if (!steps.length) return;
    const prevIdx = currentStepIndex === null || currentStepIndex === 0 ? steps.length - 1 : currentStepIndex - 1;
    setCurrentStepIndex(prevIdx);
    highlightStepNodes(steps[prevIdx]);
  };

  const highlightStepNodes = (step: DiagramFlowStep) => {
    if (step.highlightNodeIds && step.highlightNodeIds.length > 0) {
      const targetNode = spec.nodes.find((n) => n.id === step.highlightNodeIds![0]);
      if (targetNode) setSelectedNode(targetNode);
    }
  };

  // Auto-play flow loop
  useEffect(() => {
    if (isPlayingFlow && steps.length > 0) {
      flowTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          const next = prev === null ? 0 : (prev + 1) % steps.length;
          highlightStepNodes(steps[next]);
          return next;
        });
      }, 3000);
    } else {
      if (flowTimerRef.current) clearInterval(flowTimerRef.current);
    }
    return () => {
      if (flowTimerRef.current) clearInterval(flowTimerRef.current);
    };
  }, [isPlayingFlow, steps]);

  // Diagram Icon detector
  const getDiagramIcon = () => {
    const t = spec.title.toLowerCase();
    if (t.includes('heart') || t.includes('cardiac') || t.includes('circulation')) return '🫀';
    if (t.includes('nephron') || t.includes('kidney')) return '🩺';
    if (t.includes('cell')) return '🔬';
    if (t.includes('lens') || t.includes('ray') || t.includes('optics')) return '🔍';
    if (t.includes('distribution') || t.includes('bell') || t.includes('curve')) return '📊';
    if (t.includes('dna') || t.includes('gene')) return '🧬';
    return '📐';
  };

  const isHeartDiagram = spec.title.toLowerCase().includes('heart') || spec.diagramType === 'anatomical';

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50 to-white shadow-md overflow-hidden font-sans ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none border-none p-4 sm:p-6 overflow-y-auto bg-slate-950 text-white'
          : className
      }`}
    >
      {/* 1. Header Bar: Title, Simplified Badge, Zoom, Fullscreen */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 px-5 py-3.5 bg-white/90 backdrop-blur-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xl shrink-0">
              {getDiagramIcon()}
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
              {spec.title}
            </h3>
            {spec.isSimplified && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-3 w-3" />
                NCERT Verified
              </span>
            )}
          </div>
          {spec.subtitle && (
            <p className="text-xs text-slate-500 font-medium line-clamp-1">
              {spec.subtitle}
            </p>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 shadow-2xs">
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1.5 hover:bg-white text-slate-700 hover:text-blue-600 rounded-lg transition-all"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom & Pan"
              className="px-2 py-1 hover:bg-white text-[11px] font-bold text-slate-700 rounded-lg transition-all"
            >
              <RotateCcw className="h-3 w-3 inline mr-1" />
              Reset
            </button>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1.5 hover:bg-white text-slate-700 hover:text-blue-600 rounded-lg transition-all"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all shadow-2xs"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Secondary Action Bar: Blood Flow Toggle & Auto-Play */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 bg-slate-50 border-b border-slate-200/70 text-xs">
        {/* Blood Flow Animation Toggle */}
        <button
          onClick={() => setShowBloodFlow(!showBloodFlow)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shadow-2xs ${
            showBloodFlow
              ? 'bg-rose-600 text-white shadow-rose-200'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
          }`}
        >
          <span className="text-sm">{showBloodFlow ? '●' : '○'}</span>
          <span>{showBloodFlow ? 'Blood Flow Active' : 'Show Blood Flow'}</span>
          {showBloodFlow && (
            <Activity className="h-3.5 w-3.5 animate-pulse ml-0.5" />
          )}
        </button>

        {/* Stepper info / Auto-play */}
        {steps.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
              Sequence: {steps.length} steps
            </span>
            <button
              onClick={() => setIsPlayingFlow(!isPlayingFlow)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                isPlayingFlow
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              {isPlayingFlow ? (
                <>
                  <Pause className="h-3.5 w-3.5" /> Pause Flow
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" /> Step Animation
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 3. Main Diagram Canvas & Interactive Sidebar */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 items-start">
        {/* SVG Diagram Canvas */}
        <div
          className={`lg:col-span-8 relative bg-slate-900 rounded-2xl border border-slate-800 p-2 sm:p-4 overflow-hidden flex flex-col items-center justify-center min-h-[400px] select-none pan-surface ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Grid / Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Hint Overlay */}
          <div className="absolute top-2.5 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/90 text-[10px] font-bold text-slate-300 border border-slate-700 backdrop-blur-xs pointer-events-none">
            <Info className="h-3 w-3 text-blue-400" />
            <span>Tap any structure to learn more</span>
          </div>

          <svg
            ref={svgRef}
            viewBox={`${viewBox.minX || 0} ${viewBox.minY || 0} ${viewBox.width} ${viewBox.height}`}
            className="w-full h-auto max-h-[480px] drop-shadow-2xl transition-transform duration-75"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: 'center center'
            }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="deoxFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="oxFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>

              {/* Marker Arrows */}
              <marker
                id="arrow-blue"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
              <marker
                id="arrow-red"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker
                id="arrow-neutral"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>

              {/* Glow Filter for Active Elements */}
              <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Base Regions & Anatomical Silhouettes */}
            {spec.regions?.map((reg) => (
              <path
                key={reg.id}
                d={reg.pathD}
                fill={reg.fill}
                stroke={reg.stroke || '#0f172a'}
                strokeWidth={reg.strokeWidth ?? 3}
                opacity={reg.opacity ?? 0.9}
                className="transition-all duration-300"
              />
            ))}

            {/* 2. Connections & Pathways (Arrows, Flow Pipes) */}
            {spec.connections?.map((conn) => {
              const strokeColor =
                conn.color ||
                (conn.type === 'oxygenated_blood'
                  ? '#ef4444'
                  : conn.type === 'deoxygenated_blood'
                  ? '#3b82f6'
                  : conn.type === 'ray'
                  ? '#38bdf8'
                  : '#94a3b8');

              let d = '';
              if (conn.pathD) {
                d = conn.pathD;
              } else if (conn.points && conn.points.length >= 2) {
                d = `M ${conn.points[0].x} ${conn.points[0].y} ` +
                  conn.points.slice(1).map((pt) => `L ${pt.x} ${pt.y}`).join(' ');
              }

              const isCurrentStepHighlighted =
                currentStepIndex !== null &&
                steps[currentStepIndex]?.step === conn.stepNumber;

              return (
                <g key={conn.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={
                      isCurrentStepHighlighted ? 6 : conn.strokeWidth || 3.5
                    }
                    strokeDasharray={
                      showBloodFlow && (conn.animatedFlow || conn.type?.includes('blood'))
                        ? '6,6'
                        : conn.strokeDasharray || (conn.type === 'dashed' ? '5,5' : undefined)
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={
                      conn.arrowEnd !== false
                        ? conn.type === 'oxygenated_blood'
                          ? 'url(#arrow-red)'
                          : conn.type === 'deoxygenated_blood'
                          ? 'url(#arrow-blue)'
                          : 'url(#arrow-neutral)'
                        : undefined
                    }
                    className={
                      showBloodFlow && (conn.animatedFlow || isCurrentStepHighlighted || conn.type?.includes('blood'))
                        ? 'animate-pulse'
                        : ''
                    }
                  />
                  {conn.label && (
                    <text
                      x={(conn.points?.[0]?.x || 0 + (conn.points?.[1]?.x || 0)) / 2}
                      y={(conn.points?.[0]?.y || 0 + (conn.points?.[1]?.y || 0)) / 2 - 8}
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* 3. Leader Lines for Non-Overlapping Labels */}
            {spec.labels?.map((lbl) => (
              <g key={lbl.id} className="opacity-90">
                {/* Leader line segment */}
                <path
                  d={`M ${lbl.targetX} ${lbl.targetY} L ${lbl.x} ${lbl.y}`}
                  fill="none"
                  stroke={lbl.color || '#64748b'}
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                />
                {/* Target hotspot dot */}
                <circle
                  cx={lbl.targetX}
                  cy={lbl.targetY}
                  r="3.5"
                  fill={lbl.color || '#38bdf8'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                {/* Text box label at border */}
                <text
                  x={lbl.x}
                  y={lbl.y - 4}
                  fill="#f8fafc"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor={lbl.side === 'left' ? 'end' : lbl.side === 'right' ? 'start' : 'middle'}
                  className="select-none pointer-events-none"
                >
                  {lbl.text}
                </text>
                {lbl.subtext && (
                  <text
                    x={lbl.x}
                    y={lbl.y + 8}
                    fill="#94a3b8"
                    fontSize="8.5"
                    textAnchor={lbl.side === 'left' ? 'end' : lbl.side === 'right' ? 'start' : 'middle'}
                    className="select-none pointer-events-none"
                  >
                    {lbl.subtext}
                  </text>
                )}
              </g>
            ))}

            {/* 4. Interactive Nodes / Hotspots */}
            {spec.nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isStepTarget =
                currentStepIndex !== null &&
                steps[currentStepIndex]?.highlightNodeIds?.includes(node.id);

              return (
                <g
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(node);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Circle / Rect / Capsule Shape */}
                  {node.shape === 'circle' ? (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? (node.r || 26) + 4 : node.r || 22}
                      fill={node.color || '#3b82f6'}
                      stroke={isSelected ? '#fef08a' : '#ffffff'}
                      strokeWidth={isSelected ? 4 : 2}
                      filter={isSelected || isStepTarget ? 'url(#activeGlow)' : undefined}
                      className="transition-all duration-200"
                    />
                  ) : node.shape === 'ellipse' ? (
                    <ellipse
                      cx={node.x}
                      cy={node.y}
                      rx={node.rx || 20}
                      ry={node.ry || 80}
                      fill={node.color || '#06b6d4'}
                      stroke={isSelected ? '#fef08a' : '#ffffff'}
                      strokeWidth={isSelected ? 4 : 2}
                      filter={isSelected ? 'url(#activeGlow)' : undefined}
                      className="transition-all duration-200"
                    />
                  ) : (
                    <rect
                      x={node.x - (node.width || 120) / 2}
                      y={node.y - (node.height || 36) / 2}
                      width={node.width || 120}
                      height={node.height || 36}
                      rx={node.shape === 'capsule' ? (node.height || 36) / 2 : 8}
                      fill={node.color || '#1e293b'}
                      stroke={isSelected ? '#fef08a' : '#475569'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter={isSelected || isStepTarget ? 'url(#activeGlow)' : undefined}
                      className="transition-all duration-200"
                    />
                  )}

                  {/* Node Label Text */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    fill="#ffffff"
                    fontSize={node.fontSize || (node.shape === 'circle' ? 11 : 10)}
                    fontWeight="bold"
                    textAnchor="middle"
                    className="select-none pointer-events-none drop-shadow-sm"
                  >
                    {node.label.length > 22 && node.shape !== 'circle'
                      ? `${node.label.slice(0, 20)}…`
                      : node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Node Chips Selector */}
          <div className="flex flex-wrap gap-1.5 mt-3 justify-center max-w-full overflow-x-auto py-1 z-10">
            {spec.nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  selectedNode?.id === node.id
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-yellow-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {node.label.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Right / Bottom Column: Detailed Inspection & Flow Stepper */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Inspected Element Card */}
          {selectedNode ? (
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/60 p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
                <span className="text-[11px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  Structure Details
                </span>
                <button
                  onClick={speakSelectedPart}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all shadow-xs"
                >
                  <Volume2 className="h-3 w-3" />
                  <span>Listen</span>
                </button>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {selectedNode.label}
                </h4>
                {selectedNode.sublabel && (
                  <p className="text-xs font-semibold text-blue-800 mt-0.5">
                    {selectedNode.sublabel}
                  </p>
                )}
              </div>

              {/* Function & Concept */}
              {(selectedNode.details?.functionHinglish || selectedNode.details?.functionEn) && (
                <div className="p-2.5 rounded-xl bg-white border border-blue-100 text-xs font-medium text-slate-800 leading-relaxed">
                  <strong className="text-blue-900 block mb-0.5">💡 Function:</strong>
                  {selectedNode.details.functionHinglish || selectedNode.details.functionEn}
                </div>
              )}

              {/* NCERT Exam Tip */}
              {(selectedNode.details?.ncertNote || selectedNode.details?.clinicalSignificance) && (
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-semibold text-amber-900 leading-relaxed flex items-start gap-2">
                  <BookOpen className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong className="block text-amber-950 mb-0.5">📖 Exam Tip:</strong>
                    <span>{selectedNode.details.ncertNote || selectedNode.details.clinicalSignificance}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
              Click any element in the diagram to view its function and exam notes.
            </div>
          )}

          {/* Flow Stepper Section (If steps are defined) */}
          {steps.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                  <Layers className="h-4 w-4 text-blue-600" />
                  <span>Sequential Blood Flow ({steps.length} Steps)</span>
                </div>
              </div>

              {currentStepIndex !== null && (
                <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
                    <span>
                      Step {steps[currentStepIndex].step} of {steps.length}: {steps[currentStepIndex].title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {steps[currentStepIndex].description}
                  </p>
                </div>
              )}

              {/* Prev / Next Controls */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center justify-center gap-1 shadow-xs"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="px-5 py-2 bg-slate-100/70 border-t border-slate-200 text-center text-[11px] text-slate-500 font-medium">
        Tap any structure to learn more.
      </div>
    </div>
  );
};
