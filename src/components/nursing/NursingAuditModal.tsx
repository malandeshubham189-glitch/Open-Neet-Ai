import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  X,
  RefreshCw,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  BookOpen,
  PlaySquare,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  Check,
  Sparkles,
  Info,
  Clock,
  Video,
  ListOrdered
} from 'lucide-react';
import {
  NursingSyllabusAuditReport,
  NursingYear,
  SyllabusVersion,
  TopicAuditDetail,
  ZeroGapAuditStatus,
  AuditHistoryRecord
} from '../../types/nursing';
import { SyllabusAuditEngine } from '../../services/nursing/syllabusAuditEngine';
import { getQualityBadge, NURSING_RESOURCE_THRESHOLDS } from '../../config/nursingAuditConfig';

interface NursingAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialYear?: NursingYear | 'ALL';
  syllabusVersion?: SyllabusVersion;
  collegeName?: string;
  onSelectTopic?: (topicId: string) => void;
  defaultFilter?: 'ALL' | 'GAPS' | 'PARTIAL';
}

export const NursingAuditModal: React.FC<NursingAuditModalProps> = ({
  isOpen,
  onClose,
  initialYear = 'ALL',
  syllabusVersion = 'MUHS_ANNUAL_2022',
  collegeName = 'Blessing College of Nursing, Parbhani',
  onSelectTopic,
  defaultFilter = 'ALL'
}) => {
  const [selectedYear, setSelectedYear] = useState<NursingYear | 'ALL'>(initialYear);
  const [selectedVersion, setSelectedVersion] = useState<SyllabusVersion>(syllabusVersion);
  const [filterTab, setFilterTab] = useState<'ALL' | 'FULLY_COVERED' | 'PARTIALLY_COVERED' | 'RESOURCE_MISSING'>(
    defaultFilter === 'GAPS' ? 'RESOURCE_MISSING' : defaultFilter === 'PARTIAL' ? 'PARTIALLY_COVERED' : 'ALL'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [auditReport, setAuditReport] = useState<NursingSyllabusAuditReport | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [auditHistory, setAuditHistory] = useState<AuditHistoryRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  // Run audit on mount or when year/version changes
  useEffect(() => {
    if (isOpen) {
      runFreshAudit();
    }
  }, [isOpen, selectedYear, selectedVersion]);

  const runFreshAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const report = SyllabusAuditEngine.runAudit({
        university: 'Maharashtra University of Health Sciences (MUHS)',
        college: collegeName,
        course: 'Basic B.Sc Nursing',
        academicBatch: '2023–2027 (MUHS Annual Blueprint)',
        syllabusVersion: selectedVersion,
        year: selectedYear
      });
      setAuditReport(report);
      setAuditHistory(SyllabusAuditEngine.getAuditHistory());
      setIsAuditing(false);
    }, 350);
  };

  if (!isOpen || !auditReport) return null;

  // Filter topics
  const filteredTopics = auditReport.topicAudits.filter((topic) => {
    if (filterTab === 'FULLY_COVERED' && topic.auditStatus !== 'FULLY_COVERED') return false;
    if (filterTab === 'PARTIALLY_COVERED' && topic.auditStatus !== 'PARTIALLY_COVERED') return false;
    if (filterTab === 'RESOURCE_MISSING' && topic.auditStatus !== 'RESOURCE_MISSING') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        topic.topicTitle.toLowerCase().includes(q) ||
        topic.subjectName.toLowerCase().includes(q) ||
        topic.unitTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getZeroGapBadge = (status: ZeroGapAuditStatus) => {
    switch (status) {
      case 'READY':
        return {
          label: 'ZERO-GAP VALIDATED: READY',
          bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          icon: CheckCircle2,
          desc: '100% of required syllabus topics have verified, comprehensive learning resources.'
        };
      case 'MOSTLY_READY':
        return {
          label: 'MOSTLY READY (PARTIAL SUPPLEMENTS)',
          bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
          icon: Sparkles,
          desc: 'All topics have primary lectures. Minor concepts are reinforced through Smart Notes & NANDA care plans.'
        };
      case 'GAPS_EXIST':
        return {
          label: 'ACTION REQUIRED: GAPS DETECTED',
          bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
          icon: AlertTriangle,
          desc: 'Some syllabus topics lack verified video lectures. Supplementation is active.'
        };
      default:
        return {
          label: 'SYLLABUS UNVERIFIED',
          bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
          icon: AlertTriangle,
          desc: 'Curriculum mapping requires statutory re-verification against official university gazette.'
        };
    }
  };

  const zeroGapInfo = getZeroGapBadge(auditReport.zeroGapStatus);
  const ZeroGapIcon = zeroGapInfo.icon;

  const handleCopyReport = () => {
    const summary = `B.SC NURSING SYLLABUS AUDIT REPORT
Generated: ${auditReport.date}
Authority: ${auditReport.officialSource.authority}
Institution: ${auditReport.college}
Syllabus: ${auditReport.syllabusVersion} (${selectedYear})
Zero-Gap Status: ${auditReport.zeroGapStatus}
Overall Validated Coverage: ${auditReport.overallCoverage}%
Confidence: ${auditReport.confidence}% (${auditReport.confidenceLabel})

Total Subjects: ${auditReport.totalSubjects}
Total Units: ${auditReport.totalUnits}
Total Topics: ${auditReport.totalTopics}
Fully Covered: ${auditReport.resourceCoveredTopics}
Partially Covered: ${auditReport.partialTopics}
Missing Lectures: ${auditReport.missingTopics}
Unverified Topics: ${auditReport.unverifiedCurriculumCount}
--------------------------------------------------
Official Source: ${auditReport.officialSource.sourceDocument}
Url: ${auditReport.officialSource.sourceUrl}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-6xl my-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-teal-600/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Syllabus Quality & Zero-Gap Audit Engine
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  MUHS + INC Validated
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Statutory curriculum verification & multi-factor learning resource completeness audit
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={runFreshAudit}
              disabled={isAuditing}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isAuditing ? 'animate-spin text-teal-600' : ''}`} />
              {isAuditing ? 'Auditing...' : 'Re-Run Audit'}
            </button>

            <button
              onClick={handleCopyReport}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5 mr-1.5" />}
              {copied ? 'Copied' : 'Export Audit'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Audit Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Scope Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Academic Year Scope
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value as NursingYear | 'ALL')}
                className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="ALL">All Academic Years (2nd, 3rd, Final Year)</option>
                <option value="2nd_year">2nd Year (MSN I, Pharmacology, Patho, CHN I, CET, Sociology)</option>
                <option value="3rd_year">3rd Year (MSN II, Child Health, Mental Health)</option>
                <option value="4th_year">Final / 4th Year (Midwifery, CHN II, Research, Mgmt)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Syllabus Authority & Regulation
              </label>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value as SyllabusVersion)}
                className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="MUHS_ANNUAL_2022">MUHS Annual Pattern (2022 Gazette)</option>
                <option value="MUHS_REVISED_CBCS_2024">MUHS CBCS Semesterized (2024+)</option>
                <option value="INC_REVISED_SEMESTER_2021">INC National Revised Regulations (2021)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Institution & Center Jurisdiction
              </label>
              <div className="flex items-center px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300">
                <Award className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 mr-2 flex-shrink-0" />
                <span className="truncate font-medium">{auditReport.college}</span>
              </div>
            </div>
          </div>

          {/* Zero-Gap Status Banner */}
          <div className={`p-4 rounded-xl border ${zeroGapInfo.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
            <div className="flex items-start space-x-3">
              <ZeroGapIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm">{zeroGapInfo.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/30 font-semibold">
                    Coverage: {auditReport.overallCoverage}%
                  </span>
                </div>
                <p className="text-xs mt-0.5 opacity-90">{auditReport.zeroGapSummary}</p>
                <p className="text-[11px] mt-1 text-slate-500 dark:text-slate-400">
                  {auditReport.confidenceExplanation}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
              <span className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200">
                Confidence: {auditReport.confidence}%
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center">
              <span className="block text-xl font-bold text-slate-900 dark:text-white">
                {auditReport.totalSubjects}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Total Subjects</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center">
              <span className="block text-xl font-bold text-slate-900 dark:text-white">
                {auditReport.totalUnits}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Curriculum Units</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center">
              <span className="block text-xl font-bold text-slate-900 dark:text-white">
                {auditReport.totalTopics}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Required Topics</span>
            </div>

            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-center">
              <span className="block text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {auditReport.resourceCoveredTopics}
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300">Fully Covered</span>
            </div>

            <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
              <span className="block text-xl font-bold text-blue-600 dark:text-blue-400">
                {auditReport.partialTopics}
              </span>
              <span className="text-[11px] text-blue-700 dark:text-blue-300">Partially Covered</span>
            </div>

            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/50 text-center">
              <span className="block text-xl font-bold text-amber-600 dark:text-amber-400">
                {auditReport.missingTopics}
              </span>
              <span className="text-[11px] text-amber-700 dark:text-amber-300">Missing Video</span>
            </div>

            <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 rounded-xl border border-teal-200 dark:border-teal-800/50 text-center col-span-2 sm:col-span-1">
              <span className="block text-xl font-bold text-teal-600 dark:text-teal-400">
                {auditReport.overallCoverage}%
              </span>
              <span className="text-[11px] text-teal-700 dark:text-teal-300">Validated Coverage</span>
            </div>
          </div>

          {/* Official Statutory Document Reference */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <FileCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                  Official Statutory Document Reference
                </span>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {auditReport.officialSource.sourceDocument}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Authority: {auditReport.officialSource.authority} • Last Verified: {auditReport.officialSource.lastVerified}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">
                  Note: {auditReport.officialSource.collegeSpecificNote}
                </p>
              </div>
            </div>

            <a
              href={auditReport.officialSource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors flex-shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              View University Gazette
            </a>
          </div>

          {/* Subject Breakdown Cards */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center justify-between">
              <span>Subject-by-Subject Curriculum Audit ({auditReport.subjectsAudit.length} Subjects)</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                Minimum passing quality threshold: {NURSING_RESOURCE_THRESHOLDS.HIGH_CONFIDENCE}%
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {auditReport.subjectsAudit.map((subj) => (
                <div
                  key={subj.subjectId}
                  className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {subj.subjectCode}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          subj.status === 'OPTIMAL'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : subj.status === 'NEEDS_SUPPLEMENT'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                        }`}
                      >
                        {subj.status === 'OPTIMAL'
                          ? '100% Ready'
                          : subj.status === 'NEEDS_SUPPLEMENT'
                          ? 'Notes Supplemented'
                          : 'Gaps Present'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {subj.subjectName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {subj.totalUnits} Units • {subj.totalTopics} Topics • {subj.year.replace('_', ' ')}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">Validated Coverage</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                        {subj.overallCoverage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          subj.overallCoverage >= 85
                            ? 'bg-emerald-500'
                            : subj.overallCoverage >= 70
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${subj.overallCoverage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                      <span>✓ {subj.lectureCovered} Full</span>
                      <span>⚡ {subj.partiallyCovered} Partial</span>
                      <span>✕ {subj.noVerifiedLecture} Missing</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic-Level Inspection Table */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Topic-Level Learning Path & Quality Verification
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Inspect One-Best primary lecture, concept breakdown, and resource chain for each topic
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                <button
                  onClick={() => setFilterTab('ALL')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterTab === 'ALL'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  All ({auditReport.topicAudits.length})
                </button>
                <button
                  onClick={() => setFilterTab('FULLY_COVERED')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterTab === 'FULLY_COVERED'
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                  }`}
                >
                  Fully Covered ({auditReport.resourceCoveredTopics})
                </button>
                <button
                  onClick={() => setFilterTab('PARTIALLY_COVERED')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterTab === 'PARTIALLY_COVERED'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
                  }`}
                >
                  Partial ({auditReport.partialTopics})
                </button>
                <button
                  onClick={() => setFilterTab('RESOURCE_MISSING')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterTab === 'RESOURCE_MISSING'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
                  }`}
                >
                  Missing ({auditReport.missingTopics})
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topic by name, subject, or disease..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Topic List */}
            <div className="space-y-2">
              {filteredTopics.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    No topics found matching current filter
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Try switching filters or clearing the search query.
                  </p>
                </div>
              ) : (
                filteredTopics.map((topic) => {
                  const isExpanded = expandedTopicId === topic.topicId;
                  const quality = getQualityBadge(topic.coverageScore);

                  return (
                    <div
                      key={topic.topicId}
                      className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-600"
                    >
                      <div
                        onClick={() => setExpandedTopicId(isExpanded ? null : topic.topicId)}
                        className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              topic.auditStatus === 'FULLY_COVERED'
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
                                : topic.auditStatus === 'PARTIALLY_COVERED'
                                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border border-blue-200 dark:border-blue-800'
                                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800'
                            }`}
                          >
                            {topic.auditStatus === 'FULLY_COVERED' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : topic.auditStatus === 'PARTIALLY_COVERED' ? (
                              <Sparkles className="w-4 h-4" />
                            ) : (
                              <AlertTriangle className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center space-x-2 flex-wrap">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                                {topic.topicTitle}
                              </h4>
                              <span className="text-[10px] font-semibold text-slate-400">
                                {topic.subjectName} • Unit {topic.unitNumber}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-2">
                              {topic.primaryResource ? (
                                <span>
                                  Primary: <span className="font-semibold text-slate-700 dark:text-slate-300">{topic.primaryResource.channel}</span> ({topic.primaryResource.durationMinutes} min)
                                </span>
                              ) : (
                                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                                  No primary video lecture assigned
                                </span>
                              )}
                              <span>• Weightage: {topic.muhsExamWeightage}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${quality.bg} ${quality.color}`}
                          >
                            {topic.coverageScore}% Coverage
                          </span>

                          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Quality & Resource Chain Inspector */}
                      {isExpanded && (
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
                          {/* Resource Chain visualization */}
                          <div>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                              Validated Learning Path & Resource Chain
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                              {/* Step 1: Primary Lecture */}
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
                                  <Video className="w-3.5 h-3.5" />
                                  <span>1. Primary Lecture</span>
                                </div>
                                {topic.primaryResource ? (
                                  <div>
                                    <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                                      {topic.primaryResource.title}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                      {topic.primaryResource.channel} • {topic.primaryResource.durationMinutes}m
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-[11px] text-amber-600">Pending verified video candidate</p>
                                )}
                              </div>

                              {/* Step 2: Supplementary Concept */}
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold mb-1">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>2. Supplement Notice</span>
                                </div>
                                {topic.supplementaryResource ? (
                                  <div>
                                    <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200">
                                      {topic.supplementaryResource.title}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                      {topic.supplementaryResource.description}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-[11px] text-emerald-600">Complete without extra supplement</p>
                                )}
                              </div>

                              {/* Step 3: Smart Notes & NCP */}
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>3. Notes & Care Plan</span>
                                </div>
                                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                                  {topic.resourceChain.nandaCarePlanAvailable ? '✓ 5-Column NANDA Care Plan' : 'Standard Notes'}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                  {topic.resourceChain.smartNotesAvailable ? 'High-Yield Clinical Notes' : 'Clinical Summary'}
                                </p>
                              </div>

                              {/* Step 4: Questions & Test */}
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-bold mb-1">
                                  <ListOrdered className="w-3.5 h-3.5" />
                                  <span>4. Questions & Test</span>
                                </div>
                                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                                  {topic.resourceChain.mcqCount} MCQs • {topic.resourceChain.laqSaqCount} MUHS Questions
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                  Spaced Revision Scheduled
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Concept Mapping Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                                ✓ Validated Concepts ({topic.matchedConcepts.length})
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {topic.matchedConcepts.map((c, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/50">
                              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                                ⚡ Missing/Supplement Concepts ({topic.missingConcepts.length})
                              </span>
                              {topic.missingConcepts.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {topic.missingConcepts.map((c, i) => (
                                    <span
                                      key={i}
                                      className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200"
                                    >
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                                  All core clinical concepts fully matched in video lecture!
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Quick Study Action */}
                          {onSelectTopic && (
                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() => {
                                  onSelectTopic(topic.topicId);
                                  onClose();
                                }}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                              >
                                <PlaySquare className="w-3.5 h-3.5 mr-1.5" />
                                Study This Topic Now
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Audit History Log */}
          {auditHistory.length > 1 && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Audit History & Verification Trail ({auditHistory.length} Runs)</span>
                {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showHistory && (
                <div className="mt-3 space-y-1.5">
                  {auditHistory.map((hist) => (
                    <div
                      key={hist.auditId}
                      className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{hist.date}</span>
                        <span className="text-slate-400 ml-2">
                          {hist.syllabusVersion} • {hist.year}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-teal-600">{hist.overallCoverage}% Coverage</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                          {hist.zeroGapStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <Info className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>
              Quality Engine Rule: &quot;100% syllabus covered&quot; is strictly prevented unless every topic has validated resources.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Close Audit Cockpit
          </button>
        </div>
      </div>
    </div>
  );
};
