import React, { useState, useEffect } from 'react';
import {
  TelegramSyncService,
  TelegramPost,
  DEFAULT_TELEGRAM_CHANNEL
} from '../services/telegramSyncService';
import {
  Send,
  RefreshCw,
  Search,
  Filter,
  FileText,
  Video,
  FileCheck,
  Image as ImageIcon,
  BookOpen,
  Bookmark,
  Download,
  ExternalLink,
  Tag,
  CheckCircle2,
  Sparkles,
  Play,
  X,
  Edit3,
  Clock,
  Eye,
  Zap,
  Layers,
  SlidersHorizontal,
  Check
} from 'lucide-react';

export const TelegramNotesView: React.FC = () => {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [channelUsername, setChannelUsername] = useState<string>(
    TelegramSyncService.getChannelUsername()
  );
  
  // Navigation & Filtering
  const [activeSectionTab, setActiveSectionTab] = useState<'all' | 'video' | 'pdf' | 'image' | 'text'>('all');
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'physics' | 'chemistry' | 'biology' | 'uncategorized'>('all');
  const [selectedClass, setSelectedClass] = useState<'All' | 'Class 11' | 'Class 12'>('All');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Syncing State
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string>('');
  const [isChannelModalOpen, setIsChannelModalOpen] = useState<boolean>(false);
  const [channelInputVal, setChannelInputVal] = useState<string>(channelUsername);
  const [botTokenInputVal, setBotTokenInputVal] = useState<string>(
    TelegramSyncService.getBotToken()
  );

  // In-App Direct Media Modals
  const [pdfModalPost, setPdfModalPost] = useState<TelegramPost | null>(null);
  const [videoModalPost, setVideoModalPost] = useState<TelegramPost | null>(null);
  const [imageModalPost, setImageModalPost] = useState<TelegramPost | null>(null);
  
  // Manual Tag Edit Modal
  const [editTagPost, setEditTagPost] = useState<TelegramPost | null>(null);
  const [editSubject, setEditSubject] = useState<'physics' | 'chemistry' | 'biology' | 'uncategorized'>('uncategorized');
  const [editChapterName, setEditChapterName] = useState<string>('');
  const [editClassLevel, setEditClassLevel] = useState<'Class 11' | 'Class 12' | 'All'>('All');

  useEffect(() => {
    loadPosts();
    // Start periodic auto sync every 2 hours
    TelegramSyncService.startAutoSync(2);
    return () => {
      TelegramSyncService.stopAutoSync();
    };
  }, []);

  const loadPosts = () => {
    const list = TelegramSyncService.getStoredPosts();
    setPosts(list);
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncStatusMsg(`Syncing posts live from Telegram channel @${channelUsername}...`);
    
    const res = await TelegramSyncService.syncChannelPosts(channelUsername);
    setIsSyncing(false);

    if (res.success) {
      setSyncStatusMsg(`🟢 Sync successful! ${res.totalSyncedCount} posts total (${res.newPostsCount} new posts detected).`);
      loadPosts();
      setTimeout(() => setSyncStatusMsg(''), 5000);
    } else {
      setSyncStatusMsg(res.error || 'Sync updated using channel cache.');
      setTimeout(() => setSyncStatusMsg(''), 5000);
    }
  };

  const handleUpdateChannel = () => {
    if (!channelInputVal.trim()) return;
    const clean = channelInputVal.replace(/^@/, '').trim();
    TelegramSyncService.setChannelUsername(clean);
    TelegramSyncService.setBotToken(botTokenInputVal.trim());
    setChannelUsername(clean);
    setIsChannelModalOpen(false);
    handleSyncNow();
  };

  const handleToggleBookmark = (postId: string) => {
    const updated = TelegramSyncService.toggleBookmark(postId);
    setPosts(updated);
  };

  const handleOpenEditTag = (post: TelegramPost) => {
    setEditTagPost(post);
    setEditSubject(post.subjectId);
    setEditChapterName(post.chapterName);
    setEditClassLevel(post.classLevel);
  };

  const handleSaveTag = () => {
    if (!editTagPost) return;
    const updated = TelegramSyncService.updatePostCategory(
      editTagPost.id,
      editSubject,
      editChapterName.trim() || 'General Notes',
      editClassLevel
    );
    setPosts(updated);
    setEditTagPost(null);
  };

  // Derive unique chapter list for dropdown filter
  const availableChapters = Array.from(
    new Set(
      posts
        .filter((p) => selectedSubject === 'all' || p.subjectId === selectedSubject)
        .map((p) => p.chapterName)
        .filter(Boolean)
    )
  );

  // Filtered Posts
  const filteredPosts = posts.filter((post) => {
    // 1. Media Type / Section filter
    if (activeSectionTab !== 'all' && post.mediaType !== activeSectionTab) {
      return false;
    }
    // 2. Subject Filter
    if (selectedSubject !== 'all' && post.subjectId !== selectedSubject) {
      return false;
    }
    // 3. Class Filter
    if (selectedClass !== 'All' && post.classLevel !== 'All' && post.classLevel !== selectedClass) {
      return false;
    }
    // 4. Chapter Filter
    if (selectedChapter !== 'all' && post.chapterName !== selectedChapter) {
      return false;
    }
    // 5. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesCaption = post.caption.toLowerCase().includes(q);
      const matchesHashtags = post.hashtags.some((h) => h.toLowerCase().includes(q));
      const matchesChapter = post.chapterName.toLowerCase().includes(q);
      return matchesCaption || matchesHashtags || matchesChapter;
    }
    return true;
  });

  // Section metrics
  const totalVideoCount = posts.filter((p) => p.mediaType === 'video').length;
  const totalPdfCount = posts.filter((p) => p.mediaType === 'pdf').length;
  const totalImageCount = posts.filter((p) => p.mediaType === 'image').length;
  const totalTextCount = posts.filter((p) => p.mediaType === 'text').length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 text-slate-100 font-sans bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="rounded-[28px] bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-2xl space-y-6 relative overflow-hidden border border-cyan-800/40">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Send className="h-64 w-64 text-cyan-300" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-black text-cyan-300 border border-cyan-500/30">
                <Send className="h-3.5 w-3.5 text-cyan-400" />
                <span>TELEGRAM CHANNEL SYNC</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="h-3 w-3" />
                <span>@ContactAura_Bot ACTIVE</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2.5 py-1 text-[11px] font-bold text-purple-300 border border-purple-500/30">
                <Sparkles className="h-3 w-3" />
                <span>IN-APP DIRECT MEDIA PLAYER</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>My Telegram Notes Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-cyan-100/80 max-w-2xl leading-relaxed">
              Real-time sync from personal Telegram channel <strong className="text-white font-mono">@{channelUsername}</strong>. Auto-extracting video lectures, PDF handouts, diagram mindmaps, and formula notes with hashtag auto-categorization into NEET chapters.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => {
                setChannelInputVal(channelUsername);
                setIsChannelModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-200 border border-cyan-700/50 px-4 py-3 text-xs font-extrabold transition-all shadow-md active:scale-95"
            >
              <Edit3 className="h-4 w-4 text-cyan-400" />
              <span>Change Channel (@{channelUsername})</span>
            </button>

            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 text-xs font-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing Feed...' : 'Sync Channel Feed'}</span>
            </button>

            <a
              href={`https://t.me/s/${channelUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white px-4 py-3 text-xs font-bold transition-all border border-white/10"
            >
              <span>View Web Feed</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {syncStatusMsg && (
          <div className="rounded-xl bg-cyan-500/20 border border-cyan-500/40 p-3 text-xs text-cyan-200 font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>{syncStatusMsg}</span>
          </div>
        )}
      </div>

      {/* INDEPENDENT MEDIA SECTIONS TABS ("Har ek ka alag section") */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          onClick={() => setActiveSectionTab('all')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeSectionTab === 'all'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg font-black'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase">🌐 All Notes Feed</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeSectionTab === 'all' ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
              {posts.length}
            </span>
          </div>
          <span className="text-[10px] opacity-80">Full channel timeline</span>
        </button>

        <button
          onClick={() => setActiveSectionTab('video')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeSectionTab === 'video'
              ? 'bg-purple-500 text-slate-950 border-purple-300 shadow-lg font-black'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase flex items-center gap-1.5">
              <Video className="h-4 w-4" />
              <span>Video Lectures</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeSectionTab === 'video' ? 'bg-slate-950 text-purple-300' : 'bg-slate-800 text-slate-400'}`}>
              {totalVideoCount}
            </span>
          </div>
          <span className="text-[10px] opacity-80">In-app player & playback</span>
        </button>

        <button
          onClick={() => setActiveSectionTab('pdf')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeSectionTab === 'pdf'
              ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-lg font-black'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase flex items-center gap-1.5">
              <FileCheck className="h-4 w-4" />
              <span>PDF Notes</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeSectionTab === 'pdf' ? 'bg-slate-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
              {totalPdfCount}
            </span>
          </div>
          <span className="text-[10px] opacity-80">Direct PDF reader</span>
        </button>

        <button
          onClick={() => setActiveSectionTab('image')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeSectionTab === 'image'
              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg font-black'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4" />
              <span>Mindmaps</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeSectionTab === 'image' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
              {totalImageCount}
            </span>
          </div>
          <span className="text-[10px] opacity-80">Diagrams & Lightbox</span>
        </button>

        <button
          onClick={() => setActiveSectionTab('text')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
            activeSectionTab === 'text'
              ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg font-black'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span>Formula Notes</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeSectionTab === 'text' ? 'bg-slate-950 text-indigo-300' : 'bg-slate-800 text-slate-400'}`}>
              {totalTextCount}
            </span>
          </div>
          <span className="text-[10px] opacity-80">Quick revision text</span>
        </button>
      </div>

      {/* FILTER CONTROLS & SEARCH BAR */}
      <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Telegram notes by topic, hashtag (#Physics, #PDF), formula, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filters: Subject, Class, Chapter */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value as any);
                setSelectedChapter('all');
              }}
              className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-extrabold focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Subjects</option>
              <option value="physics">⚛️ Physics</option>
              <option value="chemistry">🧪 Chemistry</option>
              <option value="biology">🧬 Biology</option>
              <option value="uncategorized">📁 Uncategorized</option>
            </select>

            {/* Class Selector */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-extrabold focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Classes</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>

            {/* Chapter Selector */}
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-bold focus:outline-none focus:border-cyan-500 max-w-[200px] truncate"
            >
              <option value="all">All Chapters ({availableChapters.length})</option>
              {availableChapters.map((chap) => (
                <option key={chap} value={chap}>
                  {chap}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FEED RESULTS CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
          <span>Showing {filteredPosts.length} post(s) from @{channelUsername}</span>
          {selectedSubject !== 'all' && (
            <span className="text-cyan-400 uppercase tracking-wider font-extrabold text-[11px]">
              Filter Active: {selectedSubject}
            </span>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl bg-slate-900/60 p-12 border border-slate-800 text-center space-y-3">
            <Send className="h-12 w-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No Telegram posts matched your search filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try clearing search query or click "Sync Channel Feed" to fetch fresh updates from @{channelUsername}.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
                setSelectedClass('All');
                setSelectedChapter('all');
                setActiveSectionTab('all');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-extrabold text-xs hover:bg-cyan-500 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPosts.map((post) => {
              const isVideo = post.mediaType === 'video';
              const isPdf = post.mediaType === 'pdf';
              const isImage = post.mediaType === 'image';

              let subjectBadgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
              if (post.subjectId === 'physics') subjectBadgeColor = 'bg-cyan-950 text-cyan-300 border-cyan-800';
              else if (post.subjectId === 'chemistry') subjectBadgeColor = 'bg-purple-950 text-purple-300 border-purple-800';
              else if (post.subjectId === 'biology') subjectBadgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-800';
              else if (post.subjectId === 'uncategorized') subjectBadgeColor = 'bg-amber-950 text-amber-300 border-amber-800';

              return (
                <div
                  key={post.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-800/80 p-5 transition-all shadow-md flex flex-col justify-between space-y-4 relative group"
                >
                  <div className="space-y-3">
                    {/* Header Row: Subject Badge, Chapter Tag, Date, Bookmark */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border ${subjectBadgeColor}`}>
                          {post.subjectId}
                        </span>

                        <span className="text-[11px] font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 truncate max-w-[180px]">
                          {post.chapterName}
                        </span>

                        {post.classLevel !== 'All' && (
                          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-900">
                            {post.classLevel}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditTag(post)}
                          className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-all"
                          title="Manually Edit Chapter or Subject Tag"
                        >
                          <Tag className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleBookmark(post.id)}
                          className={`p-1.5 rounded-lg transition-all ${
                            post.isBookmarked
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-slate-950 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Bookmark className={`h-3.5 w-3.5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Media Preview Block (Video / PDF / Image) */}
                    {isVideo && (
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group-hover:border-purple-500/50 transition-all">
                        <img
                          src={post.thumbnailUrl || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'}
                          alt={post.chapterName}
                          className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                          <button
                            onClick={() => setVideoModalPost(post)}
                            className="p-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-xl transition-all hover:scale-110 flex items-center gap-2 font-black text-xs"
                          >
                            <Play className="h-5 w-5 fill-current" />
                            <span>Play In-App</span>
                          </button>
                        </div>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-mono">
                          🎥 Video Lecture
                        </span>
                      </div>
                    )}

                    {isPdf && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 truncate">
                          <div className="h-10 w-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800">
                            <FileCheck className="h-5 w-5" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-black text-white truncate">{post.fileName || 'Telegram Handout Notes.pdf'}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{post.fileSize || 'PDF Document'}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setPdfModalPost(post)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-1 shrink-0"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Open PDF</span>
                        </button>
                      </div>
                    )}

                    {isImage && (
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img
                          src={post.mediaUrl || post.thumbnailUrl}
                          alt={post.caption}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => setImageModalPost(post)}
                        />
                        <button
                          onClick={() => setImageModalPost(post)}
                          className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-white text-[10px] font-bold border border-slate-700 flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Full Mindmap</span>
                        </button>
                      </div>
                    )}

                    {/* Text Caption Content */}
                    <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                      {post.caption}
                    </p>

                    {/* Hashtags Row */}
                    {post.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.hashtags.map((tag, idx) => (
                          <span
                            key={idx}
                            onClick={() => setSearchQuery(`#${tag}`)}
                            className="text-[10px] text-cyan-400 bg-slate-950 hover:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-800 font-mono cursor-pointer transition-all"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Source Tag, Date, Actions */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1">
                      <Send className="h-3 w-3" />
                      <span>{post.sourceTag}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono">{post.date}</span>
                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-all"
                        title="Open in Telegram app"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL 1: IN-APP VIDEO PLAYER MODAL */}
      {videoModalPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 text-[10px] font-black border border-purple-800">
                  IN-APP VIDEO LECTURE
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
                  {videoModalPost.chapterName}
                </h3>
              </div>

              <button
                onClick={() => setVideoModalPost(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
                <iframe
                  src={videoModalPost.embedVideoUrl || 'https://www.youtube.com/embed/S2q8P_RkL0g'}
                  title={videoModalPost.chapterName}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="text-xs text-slate-200 font-serif leading-relaxed whitespace-pre-line">
                  {videoModalPost.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <span>Channel: @{videoModalPost.channelUsername}</span>
                  <span>Posted Date: {videoModalPost.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: IN-APP PDF VIEWER MODAL */}
      {pdfModalPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl h-[85vh] rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
              <div className="flex items-center gap-3 truncate">
                <div className="h-9 w-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div className="truncate">
                  <h3 className="text-xs sm:text-sm font-black text-white truncate">
                    {pdfModalPost.fileName || pdfModalPost.chapterName}
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-mono">In-App Direct PDF Reader Active 🟢</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfModalPost.downloadUrl || pdfModalPost.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-1"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={() => setPdfModalPost(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 w-full bg-slate-950 relative">
              {pdfModalPost.mediaUrl ? (
                <iframe
                  src={`/api/telegram/file-proxy?url=${encodeURIComponent(pdfModalPost.mediaUrl)}#toolbar=1`}
                  title={pdfModalPost.fileName || pdfModalPost.chapterName}
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center space-y-2">
                  <FileText className="h-12 w-12 text-slate-600" />
                  <p className="font-extrabold text-sm text-slate-200">PDF Attachment URL Not Available</p>
                  <p className="text-xs text-slate-400 max-w-md">This post message contains text notes without a direct PDF attachment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: IN-APP IMAGE LIGHTBOX MODAL */}
      {imageModalPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setImageModalPost(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={imageModalPost.mediaUrl || imageModalPost.thumbnailUrl}
                alt={imageModalPost.caption}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <p className="font-bold truncate max-w-md">{imageModalPost.caption}</p>
              <a
                href={imageModalPost.mediaUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1 shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Save High-Res Mindmap</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CHANGE CHANNEL MODAL */}
      {isChannelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Send className="h-4 w-4 text-cyan-400" />
                <span>Set Telegram Channel & Bot Credentials</span>
              </h3>
              <button
                onClick={() => setIsChannelModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Channel Username or Public Link</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs text-slate-500 font-mono">@</span>
                  <input
                    type="text"
                    value={channelInputVal}
                    onChange={(e) => setChannelInputVal(e.target.value)}
                    placeholder="ContactAura_Bot"
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Target Channel: <strong>@ContactAura_Bot</strong>
                </p>
              </div>

              <div className="space-y-1.5 border-t border-slate-800 pt-3">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>Telegram Bot Token (Optional)</span>
                </label>
                <input
                  type="password"
                  value={botTokenInputVal}
                  onChange={(e) => setBotTokenInputVal(e.target.value)}
                  placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Required if @ContactAura_Bot is private or restricts web scraping. Get your bot token from Telegram's <strong>@BotFather</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsChannelModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateChannel}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all"
              >
                Save & Sync Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: MANUAL TAG / REASSIGNMENT MODAL */}
      {editTagPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Tag className="h-4 w-4 text-cyan-400" />
                <span>Re-Categorize Post</span>
              </h3>
              <button
                onClick={() => setEditTagPost(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              "{editTagPost.caption}"
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Subject</label>
                <select
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-extrabold focus:outline-none focus:border-cyan-500"
                >
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="uncategorized">Uncategorized</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Class Level</label>
                <select
                  value={editClassLevel}
                  onChange={(e) => setEditClassLevel(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-bold focus:outline-none focus:border-cyan-500"
                >
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="All">All</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Chapter Name</label>
                <input
                  type="text"
                  value={editChapterName}
                  onChange={(e) => setEditChapterName(e.target.value)}
                  placeholder="e.g. System of Particles and Rotational Motion"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditTagPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTag}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all"
              >
                Save Classification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
