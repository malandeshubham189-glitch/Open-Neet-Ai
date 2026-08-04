import React, { createContext, useContext, useState, useEffect } from 'react';
import { AIMentorChatModal } from '../components/AIMentorChatModal';
import {
  UserTopicProgress,
  BookmarkItem,
  RevisionItem,
  StudySession,
  DailyTask,
  TestResult,
  SubjectId,
  TargetScoreMode,
  TargetScoreConfig,
  BacklogSummary
} from '../types';
import { getAllTopics, getTopicById, getChapterById } from '../data/curriculumData';
import { TARGET_SCORE_CONFIGS } from '../services/lectureService';
import {
  AIStudyEngine,
  NextBestAction,
  TodayPlanItem,
  EngineAnalytics,
  WeakTopicItem
} from '../services/aiStudyEngine';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'syllabus'
  | 'topic-detail'
  | 'focus-room'
  | 'revision'
  | 'question-bank'
  | 'test-center'
  | 'practice-engine'
  | 'ai-mentor'
  | 'ai-planner'
  | 'ai-chatbot'
  | 'kapil-biology-channel'
  | 'telegram-notes'
  | 'notes'
  | 'mcq'
  | 'ncert'
  | 'pyq'
  | 'test';

export interface StudentMetrics {
  totalWatchTimeMinutes: number;
  overallMcqAccuracy: number;
  overallPyqAccuracy: number;
  ncertCompletionPercent: number;
  averageTestScorePercent: number;
  strongChapters: string[];
  weakChapters: string[];
  masteryScorePercent: number;
}

export interface ChapterAnalytics {
  chapterId: string;
  totalTopicsCount: number;
  completedTopicsCount: number;
  remainingTopicsCount: number;
  progressPercent: number;
  estimatedHoursLeft: number;
  pyqWeightageScore: number;
  revisionStatusCount: number;
  mcqCompletionPercent: number;
  aiConfidenceScore: number; // 0 to 100
  isUnlocked: boolean;
  prerequisitesNeeded: string[];
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedTopicId: string;
  setSelectedTopicId: (id: string) => void;
  selectedSubjectFilter: SubjectId | 'all';
  setSelectedSubjectFilter: (sub: SubjectId | 'all') => void;
  topicProgress: Record<string, UserTopicProgress>;
  bookmarks: BookmarkItem[];
  revisionQueue: RevisionItem[];
  studySessions: StudySession[];
  dailyTasks: DailyTask[];
  testResults: TestResult[];
  distractionFreeMode: boolean;
  setDistractionFreeMode: (active: boolean) => void;
  
  // AI Study Brain & Target Score Modes
  targetScoreMode: TargetScoreMode;
  setTargetScoreMode: (mode: TargetScoreMode) => void;
  targetScoreConfig: TargetScoreConfig;
  backlogSummary: BacklogSummary;
  autoRebalanceBacklog: () => void;
  studentMetrics: StudentMetrics;
  
  // Actions
  openTopicDetail: (topicId: string) => void;
  toggleTopicCompleted: (topicId: string, subjectId: SubjectId) => void;
  updateTopicStepProgress: (
    topicId: string,
    stepKey: 'videoWatched' | 'notesRead' | 'ncertRead' | 'aiTestCompleted' | 'addedToRevision' | 'mcq' | 'pyq'
  ) => void;
  updateTopicConfidence: (topicId: string, confidence: 'Strong' | 'Moderate' | 'Weak') => void;
  saveTopicNotes: (topicId: string, notes: string) => void;
  toggleBookmark: (topicId: string, itemType: 'topic' | 'pyq' | 'mcq' | 'note', title: string, targetId: string) => void;
  isBookmarked: (targetId: string) => boolean;
  addToRevisionQueue: (topicId: string, topicTitle: string, chapterName: string, subjectId: SubjectId) => void;
  completeRevisionItem: (id: string) => void;
  scheduleNextSpacedRepetition: (topicId: string) => void;
  logStudySession: (durationMinutes: number, subjectId: SubjectId, mode: 'Pomodoro' | 'Stopwatch' | 'Focus Room', topicTitle?: string) => void;
  toggleTaskComplete: (taskId: string) => void;
  saveTestResult: (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => void;

  // New Syllabus & AI Planner Engine Capabilities
  isTopicUnlocked: (topicId: string) => { unlocked: boolean; missingPrerequisites: string[] };
  getChapterAnalytics: (chapterId: string) => ChapterAnalytics;

  // AI Study Brain Engine Methods
  getNextBestAction: () => NextBestAction;
  getTodayPlan: () => TodayPlanItem[];
  getEngineAnalytics: () => EngineAnalytics;
  getWeakTopicRecoveryPlan: () => WeakTopicItem[];

  // Global AI Mentor Chat Modal
  isAIMentorModalOpen: boolean;
  initialMentorQuery: string;
  openAIMentorModal: (initialQuery?: string) => void;
  closeAIMentorModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'neetdrop_app_data_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-phy-moi');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [distractionFreeMode, setDistractionFreeMode] = useState<boolean>(false);

  // Persistence States
  const [topicProgress, setTopicProgress] = useState<Record<string, UserTopicProgress>>({});
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [revisionQueue, setRevisionQueue] = useState<RevisionItem[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [targetScoreMode, setTargetScoreModeState] = useState<TargetScoreMode>('650+');

  const setTargetScoreMode = (mode: TargetScoreMode) => {
    setTargetScoreModeState(mode);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_target_score`, mode);
  };

  const targetScoreConfig = TARGET_SCORE_CONFIGS[targetScoreMode];

  // Initialize default mock data + local storage sync
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}_progress`);
      const savedBookmarks = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}_bookmarks`);
      const savedRevision = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}_revision`);
      const savedTasks = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}_tasks`);
      const savedTests = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}_tests`);
      const savedScoreMode = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}_target_score`) as TargetScoreMode;

      if (savedScoreMode && TARGET_SCORE_CONFIGS[savedScoreMode]) {
        setTargetScoreModeState(savedScoreMode);
      }

      if (savedProgress) setTopicProgress(JSON.parse(savedProgress));
      else initializeDefaultProgress();

      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      if (savedRevision) setRevisionQueue(JSON.parse(savedRevision));
      else initializeDefaultRevision();

      if (savedTasks) setDailyTasks(JSON.parse(savedTasks));
      else initializeDefaultTasks();

      if (savedTests) setTestResults(JSON.parse(savedTests));
      else initializeDefaultTests();
    } catch {
      initializeDefaultProgress();
      initializeDefaultRevision();
      initializeDefaultTasks();
      initializeDefaultTests();
    }
  }, []);

  const createDefaultProgress = (topicId: string, subjectId: SubjectId = 'physics'): UserTopicProgress => ({
    topicId,
    subjectId,
    completed: false,
    videoWatched: false,
    notesRead: false,
    ncertRead: false,
    mcqsSolvedCount: 0,
    totalMcqsCount: 2,
    pyqsSolvedCount: 0,
    totalPyqsCount: 1,
    aiTestCompleted: false,
    addedToRevision: false,
    confidenceLevel: 'Moderate',
    lastStudiedAt: new Date().toISOString(),
    activeStep: 1
  });

  const initializeDefaultProgress = () => {
    const initial: Record<string, UserTopicProgress> = {
      'topic-phy-moi': {
        ...createDefaultProgress('topic-phy-moi', 'physics'),
        completed: true,
        videoWatched: true,
        notesRead: true,
        ncertRead: true,
        mcqsSolvedCount: 2,
        totalMcqsCount: 2,
        pyqsSolvedCount: 1,
        totalPyqsCount: 1,
        aiTestCompleted: true,
        addedToRevision: true,
        confidenceLevel: 'Strong',
        activeStep: 8
      },
      'topic-chem-effects': {
        ...createDefaultProgress('topic-chem-effects', 'chemistry'),
        completed: false,
        videoWatched: true,
        notesRead: false,
        mcqsSolvedCount: 1,
        totalMcqsCount: 2,
        confidenceLevel: 'Moderate',
        activeStep: 2
      },
      'topic-bio-dna-structure': {
        ...createDefaultProgress('topic-bio-dna-structure', 'biology'),
        completed: true,
        videoWatched: true,
        notesRead: true,
        ncertRead: true,
        mcqsSolvedCount: 2,
        totalMcqsCount: 2,
        pyqsSolvedCount: 1,
        totalPyqsCount: 1,
        aiTestCompleted: true,
        addedToRevision: true,
        confidenceLevel: 'Strong',
        activeStep: 8
      }
    };
    setTopicProgress(initial);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_progress`, JSON.stringify(initial));
  };

  const initializeDefaultRevision = () => {
    const defaultQueue: RevisionItem[] = [
      {
        id: 'rev-1',
        userId: 'current',
        topicId: 'topic-phy-moi',
        topicTitle: 'Moment of Inertia & Parallel/Perpendicular Axes',
        chapterName: 'System of Particles & Rotational Motion',
        subjectId: 'physics',
        dueAt: new Date().toISOString().split('T')[0],
        stage: 2,
        status: 'due'
      },
      {
        id: 'rev-2',
        userId: 'current',
        topicId: 'topic-chem-effects',
        topicTitle: 'Inductive, Resonance & Hyperconjugation Effects',
        chapterName: 'General Organic Chemistry (GOC)',
        subjectId: 'chemistry',
        dueAt: new Date().toISOString().split('T')[0],
        stage: 1,
        status: 'due'
      },
      {
        id: 'rev-3',
        userId: 'current',
        topicId: 'topic-bio-dna-structure',
        topicTitle: 'DNA Double Helix Model & Chargaff Rules',
        chapterName: 'Molecular Basis of Inheritance',
        subjectId: 'biology',
        dueAt: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        stage: 3,
        status: 'completed'
      }
    ];
    setRevisionQueue(defaultQueue);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_revision`, JSON.stringify(defaultQueue));
  };

  const initializeDefaultTasks = () => {
    const defaultTasks: DailyTask[] = [
      {
        id: 'task-1',
        title: 'Watch Rotational Motion Lecture & Take Timestamped Notes',
        subjectId: 'physics',
        topicTitle: 'Moment of Inertia Theorems',
        type: 'Video',
        estimatedMinutes: 45,
        completed: true
      },
      {
        id: 'task-2',
        title: 'Solve 10 Organic Chemistry GOC Inductive Effect PYQs',
        subjectId: 'chemistry',
        topicTitle: 'Inductive & Resonance Effects',
        type: 'PYQs',
        estimatedMinutes: 30,
        completed: false
      },
      {
        id: 'task-3',
        title: 'Read NCERT Biology Word-to-Word: Transcription in Eukaryotes',
        subjectId: 'biology',
        topicTitle: 'Transcription in Prokaryotes & Eukaryotes',
        type: 'Notes',
        estimatedMinutes: 35,
        completed: false
      },
      {
        id: 'task-4',
        title: 'Active Recall Spaced Revision: DNA Double Helix Formulae',
        subjectId: 'biology',
        topicTitle: 'DNA Structure & Chargaff Rules',
        type: 'Revision',
        estimatedMinutes: 20,
        completed: true
      }
    ];
    setDailyTasks(defaultTasks);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_tasks`, JSON.stringify(defaultTasks));
  };

  const initializeDefaultTests = () => {
    const defaultTests: TestResult[] = [
      {
        id: 'test-1',
        userId: 'current',
        testTitle: 'NEET Physics Chapter Test: Rotational Motion',
        subjectId: 'physics',
        totalQuestions: 15,
        correctCount: 13,
        incorrectCount: 2,
        unattemptedCount: 0,
        score: 50,
        totalMarks: 60,
        timeTakenSeconds: 1200,
        accuracyPercent: 86.6,
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        weakTopics: ['Rolling Motion on Inclined Plane']
      },
      {
        id: 'test-2',
        userId: 'current',
        testTitle: 'Biology High-Yield Unit Test: Genetics & Molecular Basis',
        subjectId: 'biology',
        totalQuestions: 20,
        correctCount: 19,
        incorrectCount: 1,
        unattemptedCount: 0,
        score: 75,
        totalMarks: 80,
        timeTakenSeconds: 1100,
        accuracyPercent: 95.0,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        weakTopics: ['RNA Polymerase Types']
      }
    ];
    setTestResults(defaultTests);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_tests`, JSON.stringify(defaultTests));
  };

  const openTopicDetail = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentView('topic-detail');
  };

  const isTopicUnlocked = (topicId: string): { unlocked: boolean; missingPrerequisites: string[] } => {
    const topic = getTopicById(topicId);
    if (!topic || !topic.prerequisiteTopicIds || topic.prerequisiteTopicIds.length === 0) {
      return { unlocked: true, missingPrerequisites: [] };
    }

    const missing: string[] = [];
    for (const prereqId of topic.prerequisiteTopicIds) {
      const prog = topicProgress[prereqId];
      if (!prog || !prog.completed) {
        const prereqTopic = getTopicById(prereqId);
        missing.push(prereqTopic ? prereqTopic.title : prereqId);
      }
    }

    return {
      unlocked: missing.length === 0,
      missingPrerequisites: missing
    };
  };

  const updateTopicStepProgress = (
    topicId: string,
    stepKey: 'videoWatched' | 'notesRead' | 'ncertRead' | 'aiTestCompleted' | 'addedToRevision' | 'mcq' | 'pyq'
  ) => {
    setTopicProgress((prev) => {
      const existing: UserTopicProgress = prev[topicId] || createDefaultProgress(topicId, 'physics');

      const updated = { ...existing, lastStudiedAt: new Date().toISOString() };

      if (stepKey === 'videoWatched') {
        updated.videoWatched = true;
        if (updated.activeStep < 2) updated.activeStep = 2;
      } else if (stepKey === 'notesRead') {
        updated.notesRead = true;
        if (updated.activeStep < 3) updated.activeStep = 3;
      } else if (stepKey === 'ncertRead') {
        updated.ncertRead = true;
        if (updated.activeStep < 4) updated.activeStep = 4;
      } else if (stepKey === 'mcq') {
        updated.mcqsSolvedCount = Math.min((updated.totalMcqsCount || 2), (updated.mcqsSolvedCount || 0) + 1);
        if (updated.activeStep < 5) updated.activeStep = 5;
      } else if (stepKey === 'pyq') {
        updated.pyqsSolvedCount = Math.min((updated.totalPyqsCount || 1), (updated.pyqsSolvedCount || 0) + 1);
        if (updated.activeStep < 6) updated.activeStep = 6;
      } else if (stepKey === 'aiTestCompleted') {
        updated.aiTestCompleted = true;
        if (updated.activeStep < 7) updated.activeStep = 7;
      } else if (stepKey === 'addedToRevision') {
        updated.addedToRevision = true;
        updated.completed = true;
        updated.activeStep = 8;
      }

      const nextMap = { ...prev, [topicId]: updated };
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_progress`, JSON.stringify(nextMap));
      return nextMap;
    });
  };

  const getChapterAnalytics = (chapterId: string): ChapterAnalytics => {
    const chapter = getChapterById(chapterId);
    if (!chapter) {
      return {
        chapterId,
        totalTopicsCount: 0,
        completedTopicsCount: 0,
        remainingTopicsCount: 0,
        progressPercent: 0,
        estimatedHoursLeft: 0,
        pyqWeightageScore: 5,
        revisionStatusCount: 0,
        mcqCompletionPercent: 0,
        aiConfidenceScore: 0,
        isUnlocked: true,
        prerequisitesNeeded: []
      };
    }

    const totalTopicsCount = chapter.topics.length;
    let completedTopicsCount = 0;
    let totalMinutesLeft = 0;
    let mcqTotal = 0;
    let mcqSolved = 0;
    let confidenceSum = 0;

    chapter.topics.forEach((topic) => {
      const prog = topicProgress[topic.id];
      const isComp = prog?.completed || false;
      if (isComp) {
        completedTopicsCount += 1;
      } else {
        totalMinutesLeft += (topic.estimatedStudyMinutes || 60) + (topic.durationMinutes || 40);
      }

      const mSolved = prog?.mcqsSolvedCount || 0;
      const mTotal = topic.mcqs?.length || 2;
      mcqSolved += mSolved;
      mcqTotal += mTotal;

      let topicScore = 0;
      if (prog?.videoWatched) topicScore += 20;
      if (prog?.notesRead) topicScore += 15;
      if (prog?.ncertRead) topicScore += 15;
      if (mSolved > 0) topicScore += 20;
      if (prog?.pyqsSolvedCount && prog.pyqsSolvedCount > 0) topicScore += 15;
      if (prog?.addedToRevision) topicScore += 15;
      if (isComp) topicScore = 100;

      confidenceSum += Math.min(100, topicScore);
    });

    const progressPercent = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;
    const estimatedHoursLeft = Math.round((totalMinutesLeft / 60) * 10) / 10;
    const mcqCompletionPercent = mcqTotal > 0 ? Math.round((mcqSolved / mcqTotal) * 100) : 0;
    const aiConfidenceScore = totalTopicsCount > 0 ? Math.round(confidenceSum / totalTopicsCount) : 0;

    const revCount = revisionQueue.filter((r) => chapter.topics.some((t) => t.id === r.topicId) && r.status === 'due').length;

    return {
      chapterId,
      totalTopicsCount,
      completedTopicsCount,
      remainingTopicsCount: totalTopicsCount - completedTopicsCount,
      progressPercent,
      estimatedHoursLeft,
      pyqWeightageScore: chapter.pyqWeightageScore || 8,
      revisionStatusCount: revCount,
      mcqCompletionPercent,
      aiConfidenceScore,
      isUnlocked: true,
      prerequisitesNeeded: []
    };
  };

  const toggleTopicCompleted = (topicId: string, subjectId: SubjectId) => {
    setTopicProgress((prev) => {
      const existing = prev[topicId] || createDefaultProgress(topicId, subjectId);
      const updated = {
        ...existing,
        completed: !existing.completed,
        lastStudiedAt: new Date().toISOString()
      };
      const nextMap = { ...prev, [topicId]: updated };
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_progress`, JSON.stringify(nextMap));
      return nextMap;
    });
  };

  const updateTopicConfidence = (topicId: string, confidence: 'Strong' | 'Moderate' | 'Weak') => {
    setTopicProgress((prev) => {
      const existing = prev[topicId] || createDefaultProgress(topicId, 'physics');
      const updated = { ...existing, confidenceLevel: confidence };
      const nextMap = { ...prev, [topicId]: updated };
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_progress`, JSON.stringify(nextMap));
      return nextMap;
    });
  };

  const saveTopicNotes = (topicId: string, notes: string) => {
    setTopicProgress((prev) => {
      const existing = prev[topicId] || createDefaultProgress(topicId, 'physics');
      const updated = { ...existing, notesSaved: notes };
      const nextMap = { ...prev, [topicId]: updated };
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_progress`, JSON.stringify(nextMap));
      return nextMap;
    });
  };

  const toggleBookmark = (topicId: string, itemType: 'topic' | 'pyq' | 'mcq' | 'note', title: string, targetId: string) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.targetId === targetId);
      let updated: BookmarkItem[];
      if (exists) {
        updated = prev.filter((b) => b.targetId !== targetId);
      } else {
        const newItem: BookmarkItem = {
          id: 'bm-' + Date.now(),
          userId: 'current',
          topicId,
          topicTitle: title,
          subjectId: 'physics',
          itemType,
          targetId,
          title,
          createdAt: new Date().toISOString()
        };
        updated = [newItem, ...prev];
      }
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_bookmarks`, JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (targetId: string) => {
    return bookmarks.some((b) => b.targetId === targetId);
  };

  const addToRevisionQueue = (topicId: string, topicTitle: string, chapterName: string, subjectId: SubjectId) => {
    setRevisionQueue((prev) => {
      if (prev.some((r) => r.topicId === topicId && r.status === 'due')) return prev;
      const newItem: RevisionItem = {
        id: 'rev-' + Date.now(),
        userId: 'current',
        topicId,
        topicTitle,
        chapterName,
        subjectId,
        dueAt: new Date().toISOString().split('T')[0],
        stage: 1,
        status: 'due'
      };
      const updated = [newItem, ...prev];
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_revision`, JSON.stringify(updated));
      return updated;
    });
  };

  const completeRevisionItem = (id: string) => {
    setRevisionQueue((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status: 'completed' as const } : r));
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_revision`, JSON.stringify(updated));
      return updated;
    });
  };

  const logStudySession = (durationMinutes: number, subjectId: SubjectId, mode: 'Pomodoro' | 'Stopwatch' | 'Focus Room', topicTitle?: string) => {
    const session: StudySession = {
      id: 'sess-' + Date.now(),
      userId: 'current',
      subjectId,
      topicTitle,
      durationMinutes,
      mode,
      timestamp: new Date().toISOString()
    };
    setStudySessions((prev) => [session, ...prev]);
  };

  const toggleTaskComplete = (taskId: string) => {
    setDailyTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_tasks`, JSON.stringify(updated));
      return updated;
    });
  };

  const saveTestResult = (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => {
    const newTest: TestResult = {
      ...result,
      id: 'test-' + Date.now(),
      userId: 'current',
      date: new Date().toISOString().split('T')[0]
    };
    setTestResults((prev) => {
      const updated = [newTest, ...prev];
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_tests`, JSON.stringify(updated));
      return updated;
    });
  };

  const scheduleNextSpacedRepetition = (topicId: string) => {
    const topic = getTopicById(topicId);
    if (!topic) return;
    const config = TARGET_SCORE_CONFIGS[targetScoreMode];
    
    const existingIndex = revisionQueue.findIndex(r => r.topicId === topicId);
    let currentStage = 1;
    if (existingIndex >= 0) {
      currentStage = Math.min(config.revisionIntervalsDays.length, revisionQueue[existingIndex].stage + 1);
    }
    
    const intervalDays = config.revisionIntervalsDays[currentStage - 1] || 7;
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + intervalDays);
    
    const newItem: RevisionItem = {
      id: 'rev-' + Date.now(),
      userId: 'current',
      topicId: topic.id,
      topicTitle: topic.title,
      chapterName: topic.chapterName,
      subjectId: topic.subjectId,
      dueAt: nextDueDate.toISOString().split('T')[0],
      stage: currentStage,
      status: 'due'
    };

    setRevisionQueue(prev => {
      const filtered = prev.filter(r => r.topicId !== topicId);
      const updated = [newItem, ...filtered];
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_revision`, JSON.stringify(updated));
      return updated;
    });
  };

  const autoRebalanceBacklog = () => {
    const allTopics = getAllTopics();
    const uncompletedTopics = allTopics.filter(t => !topicProgress[t.id]?.completed);
    const config = TARGET_SCORE_CONFIGS[targetScoreMode];
    
    const priorityTopics = uncompletedTopics.slice(0, 4);
    const newTasks: DailyTask[] = [];

    priorityTopics.forEach((t, idx) => {
      newTasks.push({
        id: `task-rebal-v-${t.id}-${idx}`,
        title: `Core Lecture: ${t.title}`,
        subjectId: t.subjectId,
        topicId: t.id,
        topicTitle: t.title,
        type: 'Video',
        estimatedMinutes: Math.min(60, t.durationMinutes),
        completed: !!topicProgress[t.id]?.videoWatched,
        targetFinishTime: `${9 + idx * 2}:00 AM`
      });
      newTasks.push({
        id: `task-rebal-m-${t.id}-${idx}`,
        title: `Solve ${config.mcqsPerTopic} High-Yield MCQs (${t.title})`,
        subjectId: t.subjectId,
        topicId: t.id,
        topicTitle: t.title,
        type: 'MCQs',
        estimatedMinutes: Math.round(config.mcqsPerTopic * 1.5),
        completed: (topicProgress[t.id]?.mcqsSolvedCount || 0) >= config.mcqsPerTopic,
        targetFinishTime: `${10 + idx * 2}:30 AM`
      });
    });

    setDailyTasks(newTasks);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_tasks`, JSON.stringify(newTasks));
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}_last_rebalance`, new Date().toISOString());
  };

  const studentMetrics = React.useMemo(() => {
    const allTopics = getAllTopics();
    const totalTopics = allTopics.length || 1;
    let totalWatch = 0;
    let ncertDone = 0;
    let totalMcqsAttempted = 0;
    let totalMcqsCorrect = 0;
    let totalPyqsAttempted = 0;

    Object.values(topicProgress).forEach(p => {
      if (p.videoWatched) totalWatch += 45;
      if (p.ncertRead) ncertDone++;
      totalMcqsAttempted += p.mcqsSolvedCount || 0;
      totalMcqsCorrect += Math.round((p.mcqsSolvedCount || 0) * 0.85);
      totalPyqsAttempted += p.pyqsSolvedCount || 0;
    });

    const totalTestScoreSum = testResults.reduce((acc, t) => acc + (t.score / (t.totalMarks || 1)), 0);
    const avgTestPercent = testResults.length > 0 ? Math.round((totalTestScoreSum / testResults.length) * 100) : 78;

    const completedCount = Object.values(topicProgress).filter(p => p.completed).length;
    const masteryScorePercent = Math.min(100, Math.round((completedCount / totalTopics) * 100));

    return {
      totalWatchTimeMinutes: totalWatch + studySessions.reduce((s, x) => s + x.durationMinutes, 0),
      overallMcqAccuracy: totalMcqsAttempted > 0 ? Math.round((totalMcqsCorrect / totalMcqsAttempted) * 100) : 84,
      overallPyqAccuracy: totalPyqsAttempted > 0 ? 92 : 88,
      ncertCompletionPercent: Math.round((ncertDone / totalTopics) * 100),
      averageTestScorePercent: avgTestPercent,
      strongChapters: ['Rotational Motion', 'Molecular Basis of Inheritance', 'Principles of Inheritance'],
      weakChapters: ['General Organic Chemistry', 'Thermodynamics'],
      masteryScorePercent
    };
  }, [topicProgress, testResults, studySessions]);

  const backlogSummary = React.useMemo(() => {
    const pendingTasks = dailyTasks.filter(t => !t.completed);
    const overdueRevisions = revisionQueue.filter(r => r.status === 'due');
    const pendingCount = pendingTasks.length + overdueRevisions.length;
    const estimatedOverdueMinutes = pendingTasks.reduce((s, t) => s + t.estimatedMinutes, 0) + overdueRevisions.length * 20;
    const overdueTopics = Array.from(new Set([
      ...pendingTasks.map(t => t.topicTitle),
      ...overdueRevisions.map(r => r.topicTitle)
    ])).filter(Boolean);

    const lastRebalancedAt = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}_last_rebalance`) || undefined;

    return {
      pendingCount,
      estimatedOverdueMinutes,
      overdueTopics,
      lastRebalancedAt
    };
  }, [dailyTasks, revisionQueue]);

  const getNextBestAction = (): NextBestAction => {
    return AIStudyEngine.getImmediateNextAction({
      topicProgress,
      revisionQueue,
      dailyTasks,
      studentMetrics,
      targetScoreMode
    });
  };

  const getTodayPlan = (): TodayPlanItem[] => {
    return AIStudyEngine.getTodayStudyPlan({
      topicProgress,
      revisionQueue,
      dailyTasks,
      studentMetrics,
      targetScoreMode
    });
  };

  const getEngineAnalytics = (): EngineAnalytics => {
    return AIStudyEngine.calculateRealSyllabusAnalytics({
      topicProgress,
      revisionQueue,
      dailyTasks,
      studentMetrics,
      targetScoreMode
    });
  };

  const getWeakTopicRecoveryPlan = (): WeakTopicItem[] => {
    return AIStudyEngine.getWeakTopicRecoveryPlan({
      topicProgress,
      revisionQueue,
      dailyTasks,
      studentMetrics,
      targetScoreMode
    });
  };

  // Global AI Mentor Chat Modal State
  const [isAIMentorModalOpen, setIsAIMentorModalOpen] = useState(false);
  const [initialMentorQuery, setInitialMentorQuery] = useState('');

  const openAIMentorModal = (query?: string) => {
    if (query) {
      setInitialMentorQuery(query);
    } else {
      setInitialMentorQuery('');
    }
    setIsAIMentorModalOpen(true);
  };

  const closeAIMentorModal = () => {
    setIsAIMentorModalOpen(false);
    setInitialMentorQuery('');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedTopicId,
        setSelectedTopicId,
        selectedSubjectFilter,
        setSelectedSubjectFilter,
        topicProgress,
        bookmarks,
        revisionQueue,
        studySessions,
        dailyTasks,
        testResults,
        distractionFreeMode,
        setDistractionFreeMode,
        targetScoreMode,
        setTargetScoreMode,
        targetScoreConfig,
        backlogSummary,
        autoRebalanceBacklog,
        studentMetrics,
        openTopicDetail,
        toggleTopicCompleted,
        updateTopicStepProgress,
        updateTopicConfidence,
        saveTopicNotes,
        toggleBookmark,
        isBookmarked,
        addToRevisionQueue,
        completeRevisionItem,
        scheduleNextSpacedRepetition,
        logStudySession,
        toggleTaskComplete,
        saveTestResult,
        isTopicUnlocked,
        getChapterAnalytics,
        getNextBestAction,
        getTodayPlan,
        getEngineAnalytics,
        getWeakTopicRecoveryPlan,
        isAIMentorModalOpen,
        initialMentorQuery,
        openAIMentorModal,
        closeAIMentorModal
      }}
    >
      {children}
      <AIMentorChatModal
        isOpen={isAIMentorModalOpen}
        onClose={closeAIMentorModal}
        initialQuery={initialMentorQuery}
      />
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
