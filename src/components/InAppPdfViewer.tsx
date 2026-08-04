import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Highlighter,
  Bookmark,
  ExternalLink,
  Sparkles,
  Award,
  AlertCircle,
  FileText,
  X,
  Check,
  Trash2,
  List,
  Layers,
  ArrowUpRight,
  Loader2,
  RefreshCw,
  PenTool,
  Pencil,
  Eraser,
  Underline,
  MousePointer,
  Undo2,
  Paintbrush
} from 'lucide-react';
import {
  getChapterHighlights,
  saveChapterHighlight,
  removeChapterHighlight,
  getLastReadPosition,
  saveLastReadPosition,
  getChapterDrawings,
  saveChapterDrawings,
  DrawingStroke,
  NcertHighlight
} from '../lib/ncertStorage';
import { findPyqsForNcertLine, PyqMatchResult } from '../lib/ncertPyqMatcher';
import { getNCERTChapterPdfInfo } from '../lib/ncertPdfMapping';

// Configure PDF.js worker
const pdfjsVersion = pdfjsLib.version || '6.2.108';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`;

interface InAppPdfViewerProps {
  pdfUrl: string;
  fallbackUrl: string;
  chapterId: string;
  chapterName: string;
  subjectName: string;
  classLevel: string;
  onClose?: () => void;
  onNavigateToPyqs?: (pyqId?: string) => void;
}

interface TextItemRender {
  str: string;
  left: number;
  top: number;
  width: number;
  height: number;
  fontSize: number;
}

export type AnnotationTool = 'cursor' | 'pen' | 'pencil' | 'highlighter' | 'eraser' | 'underline';

export const InAppPdfViewer: React.FC<InAppPdfViewerProps> = ({
  pdfUrl,
  fallbackUrl,
  chapterId,
  chapterName,
  subjectName,
  classLevel,
  onClose,
  onNavigateToPyqs
}) => {
  // PDF State
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Render Dimensions & Text Layer
  const [viewportDimensions, setViewportDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [textItems, setTextItems] = useState<TextItemRender[]>([]);

  // Annotation Toolkit State
  const [activeTool, setActiveTool] = useState<AnnotationTool>('cursor');
  const [activeColor, setActiveColor] = useState<string>('#3b82f6');
  const [activeStrokeWidth, setActiveStrokeWidth] = useState<number>(3);
  const [drawings, setDrawings] = useState<Record<number, DrawingStroke[]>>({});
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Resume Reading State
  const [resumePromptPage, setResumePromptPage] = useState<number | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchMatches, setSearchMatches] = useState<number[]>([]);
  const [currentMatchIdx, setCurrentMatchIdx] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Highlights State
  const [highlights, setHighlights] = useState<NcertHighlight[]>([]);
  const [showHighlightPanel, setShowHighlightPanel] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('');

  // PYQ Linking Popup
  const [pyqPopupMatches, setPyqPopupMatches] = useState<PyqMatchResult[]>([]);
  const [showPyqPopup, setShowPyqPopup] = useState<boolean>(false);
  const [popupAnchorText, setPopupAnchorText] = useState<string>('');

  // Page input jump state
  const [pageInputVal, setPageInputVal] = useState<string>('1');

  // DOM Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const currentStrokePoints = useRef<{ x: number; y: number }[]>([]);

  // Load Highlights & Drawings on mount
  useEffect(() => {
    const savedHls = getChapterHighlights(chapterId);
    setHighlights(savedHls);

    const savedDrawings = getChapterDrawings(chapterId);
    setDrawings(savedDrawings);

    const lastRead = getLastReadPosition(chapterId);
    if (lastRead && lastRead.page > 1) {
      setResumePromptPage(lastRead.page);
    }
  }, [chapterId]);

  // Sync page input value with current pageNum
  useEffect(() => {
    setPageInputVal(String(pageNum));
  }, [pageNum]);

  // Validate PDF text page 1 content
  const validatePdfDocument = async (doc: any) => {
    try {
      const firstPage = await doc.getPage(1);
      const textContent = await firstPage.getTextContent();
      const page1Text = textContent.items.map((i: any) => i.str || '').join(' ').toLowerCase();

      if (page1Text.includes('404') && (page1Text.includes('not found') || page1Text.includes('error'))) {
        throw new Error('NCERT PDF endpoint returned 404 Not Found.');
      }

      // Check subject alignment keyword
      const mapping = getNCERTChapterPdfInfo(subjectName, classLevel, chapterName);
      if (mapping.expectedSubjectKeyword) {
        const keyword = mapping.expectedSubjectKeyword.toLowerCase();
        const isSubjectRecognized =
          page1Text.includes(keyword) ||
          page1Text.includes(mapping.bookCode) ||
          page1Text.includes('ncert') ||
          page1Text.includes('chapter') ||
          page1Text.length > 50;

        if (!isSubjectRecognized) {
          console.warn('PDF Validation Warning: Page 1 text does not match expected subject keywords:', page1Text);
        }
      }
    } catch (err: any) {
      console.warn('PDF validation check note:', err);
      if (err.message?.includes('404')) {
        throw err;
      }
    }
  };

  // Load PDF Document with multi-level proxy and fallback
  const loadPdf = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    const tryLoadUrl = async (urlToLoad: string, isProxied: boolean) => {
      const finalUrl = isProxied ? `/api/pdf-proxy?url=${encodeURIComponent(urlToLoad)}` : urlToLoad;
      const task = pdfjsLib.getDocument({
        url: finalUrl,
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/cmaps/`,
        cMapPacked: true
      });
      const doc = await task.promise;
      await validatePdfDocument(doc);
      return doc;
    };

    // Candidate sequence:
    // 1. Primary pdfUrl via Proxy
    // 2. Primary pdfUrl Direct
    // 3. FallbackUrl via Proxy (if provided)
    // 4. Sample Fallback PDF via Proxy
    const candidates = [
      { url: pdfUrl, proxied: true },
      { url: pdfUrl, proxied: false },
    ];

    if (fallbackUrl && fallbackUrl !== pdfUrl) {
      candidates.push({ url: fallbackUrl, proxied: true });
      candidates.push({ url: fallbackUrl, proxied: false });
    }

    let lastError: any = null;
    for (const cand of candidates) {
      try {
        const doc = await tryLoadUrl(cand.url, cand.proxied);
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setIsLoading(false);
        return;
      } catch (err: any) {
        lastError = err;
        console.warn(`PDF load attempt failed for ${cand.url} (proxied=${cand.proxied}):`, err?.message || err);
      }
    }

    // If all attempts fail
    console.error('All PDF load attempts failed:', lastError);
    setLoadError(
      lastError?.message?.includes('404')
        ? 'The requested NCERT PDF file was not found on NCERT servers (404).'
        : 'Unable to connect to NCERT PDF servers. You can open the chapter directly on the NCERT portal below.'
    );
    setIsLoading(false);
  }, [pdfUrl, fallbackUrl, subjectName, classLevel, chapterName]);

  useEffect(() => {
    loadPdf();
  }, [loadPdf]);

  // Save Last Read Position
  const updatePageNumber = useCallback(
    (newPage: number) => {
      const validPage = Math.max(1, Math.min(totalPages || 1, newPage));
      setPageNum(validPage);
      saveLastReadPosition(chapterId, chapterName, validPage);
    },
    [chapterId, chapterName, totalPages]
  );

  // Render Page to Canvas & Extract Text Layer
  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      // Cancel any ongoing render task before starting a new one
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {
          // ignore cancellation error
        }
        renderTaskRef.current = null;
      }

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        setViewportDimensions({ width: viewport.width, height: viewport.height });

        const renderContext = {
          canvasContext: context,
          viewport
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        try {
          await renderTask.promise;
        } catch (renderErr: any) {
          if (renderErr?.name === 'RenderingCancelledException') {
            return;
          }
          throw renderErr;
        } finally {
          if (renderTaskRef.current === renderTask) {
            renderTaskRef.current = null;
          }
        }

        // Extract text items for selectable text layer
        try {
          const textContent = await page.getTextContent();
          if (textContent && Array.isArray(textContent.items)) {
            const items: TextItemRender[] = textContent.items
              .map((item: any) => {
                const str = item.str || '';
                if (!str.trim()) return null;

                const transform = item.transform || [1, 0, 0, 1, 0, 0];
                const tx = transform[4];
                const ty = transform[5];
                const fontHeight = Math.abs(transform[3]) || Math.abs(transform[0]) || 12;
                const itemWidth = item.width || (str.length * fontHeight * 0.5);

                const rect = [tx, ty, tx + itemWidth, ty + fontHeight];
                const [vX1, vY1, vX2, vY2] = viewport.convertToViewportRectangle(rect);

                const left = Math.min(vX1, vX2);
                const top = Math.min(vY1, vY2);
                const width = Math.max(Math.abs(vX2 - vX1), 4);
                const height = Math.max(Math.abs(vY2 - vY1), 8);

                return {
                  str,
                  left,
                  top,
                  width,
                  height,
                  fontSize: height
                };
              })
              .filter(Boolean) as TextItemRender[];

            setTextItems(items);
          }
        } catch (textErr) {
          console.warn('Text layer extraction warning:', textErr);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
      }
    },
    [pdfDoc, scale]
  );

  useEffect(() => {
    if (pdfDoc && pageNum <= totalPages) {
      renderPage(pageNum);
    }
    return () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {
          // ignore
        }
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, pageNum, scale, renderPage, totalPages]);

  // --------------------------------------------------------------------------
  // OVERLAY CANVAS ANNOTATIONS DRAWING LOGIC
  // --------------------------------------------------------------------------
  const drawingsRef = useRef<Record<number, DrawingStroke[]>>({});
  const rafIdRef = useRef<number | null>(null);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const eraserCursorRef = useRef<{ x: number; y: number } | null>(null);

  // Sync drawings ref to prevent closure stales
  useEffect(() => {
    drawingsRef.current = drawings;
  }, [drawings]);

  // Cancel drawing on page or chapter change
  useEffect(() => {
    setIsDrawing(false);
    currentStrokePoints.current = [];
    startPointRef.current = null;
    eraserCursorRef.current = null;
  }, [pageNum, chapterId]);

  // Helper: Point to Line Segment distance in canvas pixels
  const pointToSegmentDistance = (
    px: number,
    py: number,
    ax: number,
    ay: number,
    bx: number,
    by: number
  ) => {
    const l2 = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
    if (l2 === 0) return Math.hypot(px - ax, py - ay);
    let t = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = ax + t * (bx - ax);
    const projY = ay + t * (by - ay);
    return Math.hypot(px - projX, py - projY);
  };

  const drawOverlayCanvas = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    ctx.clearRect(0, 0, w, h);

    const pageStrokes = drawingsRef.current[pageNum] || drawings[pageNum] || [];

    const renderStroke = (s: DrawingStroke) => {
      if (!s.points || s.points.length === 0) return;
      ctx.save();
      ctx.beginPath();

      if (s.tool === 'pen') {
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = s.color || '#3b82f6';
        ctx.lineWidth = s.strokeWidth || 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      } else if (s.tool === 'pencil') {
        ctx.globalAlpha = 0.5;
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = s.color || '#64748b';
        ctx.lineWidth = Math.max(1, (s.strokeWidth || 2) * 0.75);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      } else if (s.tool === 'highlighter') {
        ctx.globalAlpha = 0.38;
        ctx.globalCompositeOperation = 'multiply';
        ctx.strokeStyle = s.color || '#facc15';
        ctx.lineWidth = Math.max(16, (s.strokeWidth || 4) * 3.5);
        ctx.lineCap = 'square';
        ctx.lineJoin = 'bevel';
      } else if (s.tool === 'underline') {
        ctx.globalAlpha = 0.9;
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = s.color || '#ef4444';
        ctx.lineWidth = Math.max(2, (s.strokeWidth || 3) * 0.9);
        ctx.lineCap = 'square';
      }

      ctx.moveTo(s.points[0].x * w, s.points[0].y * h);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x * w, s.points[i].y * h);
      }
      ctx.stroke();
      ctx.restore();
    };

    // Render completed strokes
    pageStrokes.forEach(renderStroke);

    // Render active live stroke
    if (isDrawing && currentStrokePoints.current.length > 0 && activeTool !== 'eraser' && activeTool !== 'cursor') {
      renderStroke({
        id: 'live',
        page: pageNum,
        tool: activeTool,
        color: activeColor,
        strokeWidth: activeStrokeWidth,
        points: currentStrokePoints.current
      });
    }

    // Render Eraser Cursor indicator
    if (activeTool === 'eraser' && eraserCursorRef.current) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        eraserCursorRef.current.x * w,
        eraserCursorRef.current.y * h,
        18,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }, [drawings, pageNum, isDrawing, activeTool, activeColor, activeStrokeWidth]);

  // Schedule rAF redraw for smooth 60fps rendering
  const scheduleRedraw = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      drawOverlayCanvas();
    });
  }, [drawOverlayCanvas]);

  useEffect(() => {
    scheduleRedraw();
  }, [drawOverlayCanvas, viewportDimensions, scheduleRedraw]);

  // Perform continuous real-time erasing at point (x, y)
  const performErasing = (x: number, y: number, canvas: HTMLCanvasElement) => {
    const w = canvas.width;
    const h = canvas.height;
    const px = x * w;
    const py = y * h;
    const ERASER_RADIUS = 22; // pixels

    const pageStrokes = drawingsRef.current[pageNum] || drawings[pageNum] || [];
    const remaining = pageStrokes.filter((s) => {
      if (!s.points || s.points.length === 0) return false;
      if (s.points.length === 1) {
        const p0x = s.points[0].x * w;
        const p0y = s.points[0].y * h;
        return Math.hypot(px - p0x, py - p0y) >= ERASER_RADIUS;
      }
      for (let i = 0; i < s.points.length - 1; i++) {
        const ax = s.points[i].x * w;
        const ay = s.points[i].y * h;
        const bx = s.points[i + 1].x * w;
        const by = s.points[i + 1].y * h;
        const dist = pointToSegmentDistance(px, py, ax, ay, bx, by);
        if (dist < ERASER_RADIUS) {
          return false; // Hit by eraser -> remove stroke
        }
      }
      return true;
    });

    if (remaining.length !== pageStrokes.length) {
      const updated = { ...drawingsRef.current, [pageNum]: remaining };
      drawingsRef.current = updated;
      setDrawings(updated);
      saveChapterDrawings(chapterId, updated);
      scheduleRedraw();
    }
  };

  // Pointer Handlers for drawing on overlay canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'cursor') return;
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }

    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    setIsDrawing(true);
    startPointRef.current = { x, y };

    if (activeTool === 'eraser') {
      eraserCursorRef.current = { x, y };
      performErasing(x, y, canvas);
      scheduleRedraw();
      return;
    }

    if (activeTool === 'underline') {
      currentStrokePoints.current = [{ x, y }, { x, y }];
    } else {
      currentStrokePoints.current = [{ x, y }];
    }

    scheduleRedraw();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    if (activeTool === 'eraser') {
      eraserCursorRef.current = { x, y };
      if (isDrawing) {
        performErasing(x, y, canvas);
      }
      scheduleRedraw();
      return;
    }

    if (!isDrawing) return;

    if (activeTool === 'underline' && startPointRef.current) {
      // Snap to straight horizontal line
      currentStrokePoints.current = [
        { x: startPointRef.current.x, y: startPointRef.current.y },
        { x, y: startPointRef.current.y }
      ];
    } else {
      currentStrokePoints.current.push({ x, y });
    }

    scheduleRedraw();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }
    }

    if (activeTool === 'eraser') {
      eraserCursorRef.current = null;
      setIsDrawing(false);
      scheduleRedraw();
      return;
    }

    if (!isDrawing) return;
    setIsDrawing(false);

    if (activeTool !== 'cursor' && currentStrokePoints.current.length > 1) {
      const newStroke: DrawingStroke = {
        id: `stroke-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        page: pageNum,
        tool: activeTool,
        color: activeColor,
        strokeWidth: activeStrokeWidth,
        points: [...currentStrokePoints.current]
      };
      const pageStrokes = drawingsRef.current[pageNum] || drawings[pageNum] || [];
      const updated = {
        ...drawingsRef.current,
        [pageNum]: [...pageStrokes, newStroke]
      };
      drawingsRef.current = updated;
      setDrawings(updated);
      saveChapterDrawings(chapterId, updated);
    }

    currentStrokePoints.current = [];
    startPointRef.current = null;
    scheduleRedraw();
  };

  const handleUndoLastStroke = () => {
    const pageStrokes = drawingsRef.current[pageNum] || drawings[pageNum] || [];
    if (pageStrokes.length === 0) return;
    const updatedStrokes = pageStrokes.slice(0, -1);
    const updated = { ...drawingsRef.current, [pageNum]: updatedStrokes };
    drawingsRef.current = updated;
    setDrawings(updated);
    saveChapterDrawings(chapterId, updated);
    scheduleRedraw();
  };

  const handleClearPageDrawings = () => {
    const updated = { ...drawingsRef.current, [pageNum]: [] };
    drawingsRef.current = updated;
    setDrawings(updated);
    saveChapterDrawings(chapterId, updated);
    scheduleRedraw();
  };

  // Handle Zoom
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const handleZoomReset = () => setScale(1.2);

  // Handle Page Input Direct Jump
  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(pageInputVal, 10);
    if (!isNaN(p)) {
      updatePageNumber(p);
    }
  };

  // Handle Search in PDF
  const handleSearch = async () => {
    if (!pdfDoc || !searchQuery.trim()) return;
    setIsSearching(true);
    const matches: number[] = [];
    const queryLower = searchQuery.toLowerCase().trim();

    for (let p = 1; p <= pdfDoc.numPages; p++) {
      try {
        const page = await pdfDoc.getPage(p);
        const textContent = await page.getTextContent();
        const textItemsStr = textContent.items.map((item: any) => item.str).join(' ');
        if (textItemsStr.toLowerCase().includes(queryLower)) {
          matches.push(p);
        }
      } catch (err) {
        // ignore page search error
      }
    }

    setSearchMatches(matches);
    setIsSearching(false);
    if (matches.length > 0) {
      setCurrentMatchIdx(0);
      updatePageNumber(matches[0]);
    }
  };

  const nextMatch = () => {
    if (searchMatches.length === 0) return;
    const nextIdx = (currentMatchIdx + 1) % searchMatches.length;
    setCurrentMatchIdx(nextIdx);
    updatePageNumber(searchMatches[nextIdx]);
  };

  const prevMatch = () => {
    if (searchMatches.length === 0) return;
    const prevIdx = (currentMatchIdx - 1 + searchMatches.length) % searchMatches.length;
    setCurrentMatchIdx(prevIdx);
    updatePageNumber(searchMatches[prevIdx]);
  };

  // Text Selection / Add Highlight
  const handleTextSelection = () => {
    if (activeTool !== 'cursor') return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const txt = selection.toString().trim();
      setSelectedText(txt);

      // Search matching PYQs for this selection
      const matches = findPyqsForNcertLine(chapterName, txt, subjectName.toLowerCase());
      if (matches.length > 0) {
        setPyqPopupMatches(matches);
        setPopupAnchorText(txt);
        setShowPyqPopup(true);
      }
    }
  };

  const addHighlight = (color: 'yellow' | 'green' | 'pink' | 'underline') => {
    if (!selectedText) return;
    const newHL = saveChapterHighlight(chapterId, {
      chapterId,
      page: pageNum,
      text: selectedText,
      color
    });
    setHighlights((prev) => [newHL, ...prev]);
    setSelectedText('');
  };

  const handleDeleteHighlight = (id: string) => {
    const updated = removeChapterHighlight(chapterId, id);
    setHighlights(updated);
  };

  return (
    <div className="flex flex-col h-[88vh] w-full bg-slate-950 rounded-[24px] border border-slate-800 text-white shadow-2xl overflow-hidden font-sans">
      {/* -------------------------------------------------------------------------- */}
      {/* TOP CONTROLS TOOLBAR */}
      {/* -------------------------------------------------------------------------- */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Title & Metadata */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white tracking-tight truncate max-w-xs sm:max-w-md">
              {chapterName}
            </h3>
            <p className="text-[11px] font-bold text-slate-400">
              NCERT {classLevel} • {subjectName}
            </p>
          </div>
        </div>

        {/* Page Navigation & Zoom Controls */}
        <div className="flex items-center gap-2 bg-slate-950/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => updatePageNumber(pageNum - 1)}
            disabled={pageNum <= 1}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 transition-all cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1">
            <input
              type="text"
              value={pageInputVal}
              onChange={(e) => setPageInputVal(e.target.value)}
              className="w-10 text-center text-xs font-black bg-slate-900 border border-slate-700 rounded-lg py-1 text-white focus:outline-none focus:border-emerald-500"
            />
            <span className="text-xs font-bold text-slate-400">/ {totalPages || '--'}</span>
          </form>

          <button
            onClick={() => updatePageNumber(pageNum + 1)}
            disabled={pageNum >= totalPages}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 transition-all cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Zoom Controls */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-[11px] font-extrabold text-slate-300 w-11 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleZoomReset}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Action Buttons: Highlights Drawer, Open Tab, Close */}
        <div className="flex items-center gap-2">
          {/* Highlights Drawer Toggle */}
          <button
            onClick={() => setShowHighlightPanel(!showHighlightPanel)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 border cursor-pointer ${
              showHighlightPanel
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Highlighter className="h-3.5 w-3.5" />
            <span>Highlights ({highlights.length})</span>
          </button>

          {/* External Tab Link */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
            title="Open PDF in new browser tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-all border border-rose-500/30 cursor-pointer"
              title="Close Reader"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* FULL ANNOTATION TOOLKIT TOOLBAR */}
      {/* -------------------------------------------------------------------------- */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 shadow-inner">
        {/* Tool Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          {/* Select / Cursor Mode */}
          <button
            onClick={() => setActiveTool('cursor')}
            className={`px-3 py-1.5 rounded-xl font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'cursor'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Select Text / Normal Cursor"
          >
            <MousePointer className="h-3.5 w-3.5" />
            <span>Select</span>
          </button>

          {/* Highlighter */}
          <button
            onClick={() => {
              setActiveTool('highlighter');
              if (!['#facc15', '#34d399', '#f472b6', '#60a5fa'].includes(activeColor)) {
                setActiveColor('#facc15');
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'highlighter'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Highlighter Tool"
          >
            <Highlighter className="h-3.5 w-3.5" />
            <span>Highlighter</span>
          </button>

          {/* Pen */}
          <button
            onClick={() => {
              setActiveTool('pen');
              if (['#facc15', '#34d399', '#f472b6'].includes(activeColor)) {
                setActiveColor('#ef4444');
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'pen'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Freehand Pen Tool"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>Pen</span>
          </button>

          {/* Pencil */}
          <button
            onClick={() => {
              setActiveTool('pencil');
              if (['#facc15', '#34d399', '#f472b6'].includes(activeColor)) {
                setActiveColor('#94a3b8');
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'pencil'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Pencil Tool (Lighter & Thinner Stroke)"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Pencil</span>
          </button>

          {/* Underline */}
          <button
            onClick={() => {
              setActiveTool('underline');
              if (['#facc15', '#34d399', '#f472b6'].includes(activeColor)) {
                setActiveColor('#ef4444');
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'underline'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Underline Tool"
          >
            <Underline className="h-3.5 w-3.5" />
            <span>Underline</span>
          </button>

          {/* Eraser */}
          <button
            onClick={() => setActiveTool('eraser')}
            className={`px-3 py-1.5 rounded-xl font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'eraser'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Eraser Tool (Click/Drag over drawings to erase)"
          >
            <Eraser className="h-3.5 w-3.5" />
            <span>Eraser</span>
          </button>
        </div>

        {/* Color Palette & Stroke Controls */}
        {activeTool !== 'cursor' && activeTool !== 'eraser' && (
          <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-2xl border border-slate-800">
            {/* Color options */}
            <div className="flex items-center gap-1.5">
              {activeTool === 'highlighter' ? (
                <>
                  {[
                    { color: '#facc15', name: 'Yellow' },
                    { color: '#34d399', name: 'Green' },
                    { color: '#f472b6', name: 'Pink' },
                    { color: '#60a5fa', name: 'Blue' }
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setActiveColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                        activeColor === c.color ? 'scale-125 border-white ring-2 ring-emerald-400' : 'border-black/30 hover:scale-110'
                      }`}
                      title={c.name}
                    />
                  ))}
                </>
              ) : (
                <>
                  {[
                    { color: '#ef4444', name: 'Red' },
                    { color: '#3b82f6', name: 'Blue' },
                    { color: '#10b981', name: 'Green' },
                    { color: '#f59e0b', name: 'Amber' },
                    { color: '#a855f7', name: 'Purple' },
                    { color: '#ffffff', name: 'White' }
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setActiveColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                        activeColor === c.color ? 'scale-125 border-black ring-2 ring-emerald-400' : 'border-slate-700 hover:scale-110'
                      }`}
                      title={c.name}
                    />
                  ))}
                </>
              )}
            </div>

            <div className="h-4 w-px bg-slate-800" />

            {/* Stroke Width Selector */}
            <div className="flex items-center gap-1 text-[10px] font-black">
              {[
                { label: 'Thin', width: 2 },
                { label: 'Med', width: 4 },
                { label: 'Thick', width: 8 }
              ].map((w) => (
                <button
                  key={w.width}
                  onClick={() => setActiveStrokeWidth(w.width)}
                  className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                    activeStrokeWidth === w.width
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Undo / Clear Page Drawings */}
        <div className="flex items-center gap-2">
          {(drawings[pageNum] || []).length > 0 && (
            <>
              <button
                onClick={handleUndoLastStroke}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all flex items-center gap-1 text-[11px] cursor-pointer"
                title="Undo last stroke on this page"
              >
                <Undo2 className="h-3.5 w-3.5" />
                <span>Undo</span>
              </button>
              <button
                onClick={handleClearPageDrawings}
                className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold border border-rose-500/30 transition-all flex items-center gap-1 text-[11px] cursor-pointer"
                title="Clear all drawings on this page"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Page</span>
              </button>
            </>
          )}

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-36 sm:w-48"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 transition-all shrink-0 cursor-pointer"
          >
            {isSearching ? '...' : 'Search'}
          </button>

          {searchMatches.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-200 bg-slate-800 px-2 py-0.5 rounded-xl shrink-0">
              <span>
                {currentMatchIdx + 1}/{searchMatches.length}
              </span>
              <button onClick={prevMatch} className="p-0.5 hover:text-emerald-400 cursor-pointer">
                ▲
              </button>
              <button onClick={nextMatch} className="p-0.5 hover:text-emerald-400 cursor-pointer">
                ▼
              </button>
            </div>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* RESUME READING BANNER */}
      {/* -------------------------------------------------------------------------- */}
      {resumePromptPage && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-4 py-2 flex items-center justify-between gap-3 text-xs text-emerald-200 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              You previously stopped reading at <strong className="text-white font-extrabold">Page {resumePromptPage}</strong>.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                updatePageNumber(resumePromptPage);
                setResumePromptPage(null);
              }}
              className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-[11px] hover:bg-emerald-400 transition-all shadow-sm cursor-pointer"
            >
              Resume Page {resumePromptPage}
            </button>
            <button
              onClick={() => setResumePromptPage(null)}
              className="text-slate-400 hover:text-slate-200 text-xs px-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MAIN VIEWPORT AREA */}
      {/* -------------------------------------------------------------------------- */}
      <div className="flex-1 flex overflow-hidden relative" ref={containerRef}>
        {/* PDF Canvas & Annotation Layer Container */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex flex-col items-center justify-start bg-slate-950">
          {isLoading && (
            <div className="my-auto text-center space-y-4 p-8">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-100">Fetching NCERT PDF Chapter...</p>
                <p className="text-xs text-slate-400">{chapterName}</p>
              </div>
            </div>
          )}

          {loadError && !isLoading && (
            <div className="my-auto w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <AlertCircle className="mx-auto h-10 w-10 text-amber-400" />
              <div className="space-y-1">
                <h4 className="font-black text-base text-white">NCERT PDF Load Warning</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{loadError}</p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={loadPdf}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry Loading</span>
                </button>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-all flex items-center gap-1.5"
                >
                  <span>Open Direct Link</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {!isLoading && !loadError && (
            <div
              className="relative shadow-2xl rounded-xl border border-slate-800 bg-white overflow-hidden transition-all duration-200 select-none"
              style={{
                width: viewportDimensions.width || 'auto',
                height: viewportDimensions.height || 'auto'
              }}
            >
              {/* PDF Rendered Canvas */}
              <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />

              {/* Text Layer Overlay for Selection & Highlighting */}
              <div
                className={`absolute inset-0 select-text overflow-hidden cursor-text selection:bg-amber-300 selection:text-slate-950 ${
                  activeTool === 'cursor' ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{
                  width: viewportDimensions.width,
                  height: viewportDimensions.height
                }}
                onMouseUp={handleTextSelection}
              >
                {textItems.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${item.left}px`,
                      top: `${item.top}px`,
                      width: `${item.width}px`,
                      height: `${item.height}px`,
                      fontSize: `${item.fontSize}px`,
                      lineHeight: 1,
                      color: 'transparent',
                      fontFamily: 'sans-serif',
                      whiteSpace: 'pre',
                      transformOrigin: '0 0'
                    }}
                  >
                    {item.str}
                  </span>
                ))}
              </div>

              {/* Annotation Overlay Canvas for Pen, Pencil, Highlighter, Eraser, Underline */}
              <canvas
                ref={overlayCanvasRef}
                width={viewportDimensions.width}
                height={viewportDimensions.height}
                className={`absolute inset-0 w-full h-full ${
                  activeTool === 'cursor'
                    ? 'pointer-events-none'
                    : 'pointer-events-auto cursor-crosshair'
                }`}
                style={{ touchAction: 'none' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>
          )}
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* RIGHT SIDE PANEL: SAVED HIGHLIGHTS DRAWER */}
        {/* -------------------------------------------------------------------------- */}
        {showHighlightPanel && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col p-4 space-y-4 overflow-y-auto shrink-0 animate-in slide-in-from-right-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Highlighter className="h-4 w-4 text-amber-400" />
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  Saved Highlights ({highlights.length})
                </h4>
              </div>
              <button
                onClick={() => setShowHighlightPanel(false)}
                className="text-slate-400 hover:text-white text-xs p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {highlights.length === 0 ? (
              <div className="text-center py-10 space-y-2 text-slate-500">
                <Highlighter className="h-8 w-8 mx-auto opacity-30" />
                <p className="text-xs font-bold text-slate-400">No text highlights saved yet.</p>
                <p className="text-[11px] text-slate-500">
                  Select text directly in the PDF page to highlight in Yellow, Green, or Pink.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {highlights.map((hl) => (
                  <div
                    key={hl.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 group hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            hl.color === 'green'
                              ? 'bg-emerald-400'
                              : hl.color === 'pink'
                              ? 'bg-pink-400'
                              : 'bg-yellow-400'
                          }`}
                        />
                        Page {hl.page}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updatePageNumber(hl.page)}
                          className="text-emerald-400 hover:underline font-bold cursor-pointer"
                        >
                          Jump
                        </button>
                        <button
                          onClick={() => handleDeleteHighlight(hl.id)}
                          className="text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      "{hl.text}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* POPUP: NCERT LINE-TO-PYQ LINKING */}
      {/* -------------------------------------------------------------------------- */}
      {showPyqPopup && pyqPopupMatches.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl rounded-[24px] border border-emerald-500/40 bg-slate-900 text-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="h-5 w-5" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white">
                  This NCERT line has appeared in NEET PYQs!
                </h4>
              </div>
              <button
                onClick={() => setShowPyqPopup(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-xl border border-slate-800">
              "{popupAnchorText}"
            </p>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {pyqPopupMatches.map((match, i) => (
                <div
                  key={match.pyq.id || i}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      NEET {match.pyq.year} • {match.pyq.chapterName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {match.confidenceText}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-200 leading-snug">
                    {match.pyq.question}
                  </p>

                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => {
                        setShowPyqPopup(false);
                        if (onNavigateToPyqs) {
                          onNavigateToPyqs(match.pyq.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Solve in 10-Yr PYQ Archive</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span>{pyqPopupMatches.length} matching PYQ(s) found in NEET Archive</span>
              <button
                onClick={() => setShowPyqPopup(false)}
                className="text-slate-300 hover:text-white font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
