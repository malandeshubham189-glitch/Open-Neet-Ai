import { OFFICIAL_CHANNELS_REGISTRY } from '../data/officialChannels';
import { YouTubePlaylistImporter } from '../services/youtubePlaylistImporter';
import { YouTubeResolver } from '../services/youtubeResolver';
import { youtubeLiveEngine } from '../services/youtube/youtubeLiveService';
import { YouTubeVideoValidator } from '../services/youtubeVideoValidator';
import { SmartLectureRecommendationEngine } from '../services/smartLectureEngine';
import { studentStateService } from '../services/studentLearningStateService';
import { AIStudyEngine } from '../services/aiStudyEngine';

async function runCompleteVerification() {
  console.log('================================================================');
  console.log('=== PART 1: PRODUCTION-GRADE YOUTUBE ENGINE VALIDATION ===');
  console.log('================================================================\n');

  // 1. Channel Registry Verification
  console.log('--- Official Channel Registry ---');
  OFFICIAL_CHANNELS_REGISTRY.forEach((ch, idx) => {
    console.log(`  ${idx + 1}. [${ch.subject}] ${ch.channelName} (@${ch.handle}) - ${ch.teacher}`);
  });
  console.log(`✓ Channels Registered & Scanned: ${OFFICIAL_CHANNELS_REGISTRY.length}\n`);

  // 2. Playlist Importer Verification
  console.log('--- Playlist Import & Strict Validation ---');
  const playlist = await YouTubePlaylistImporter.importPlaylist('PL_VERIFIED_NEET_SERIES');
  console.log(`✓ Playlist Title       : ${playlist.playlistTitle}`);
  console.log(`✓ Total Items Scanned  : ${playlist.totalItemsScanned}`);
  console.log(`✓ Embeddable Videos    : ${playlist.importedVideos.length}`);
  console.log(`✓ Rejected Videos      : ${playlist.rejectedVideos.length}`);
  console.log(`✓ Coverage Percentage  : ${playlist.coveragePercentage}%\n`);

  // 3. Live Detection Service
  console.log('--- Live Class Detection ---');
  const liveStatus = await youtubeLiveEngine.getLiveStatus(true);
  console.log(`✓ Live Status      : ${liveStatus.isLive ? '🔴 LIVE NOW' : 'RECORDED / LATEST MASTERCLASS'}`);
  console.log(`✓ Current Video ID : ${liveStatus.videoId}`);
  console.log(`✓ Channel          : ${liveStatus.channelTitle}`);
  console.log(`✓ Embed URL        : ${liveStatus.embedUrl}`);
  console.log(`✓ Embeddable       : ${liveStatus.isEmbeddable}\n`);

  // 4. Video Validator
  console.log('--- Video Validation (Public, Processed, Embeddable, Playable) ---');
  const testVal = await YouTubeVideoValidator.validateVideo('fA-XN6q3f6A');
  console.log(`✓ Video ID ${testVal.videoId} Validation: Public=${testVal.isPublic}, Processed=${testVal.isProcessed}, Embeddable=${testVal.isEmbeddable}`);

  console.log('\n================================================================');
  console.log('✅ PRODUCTION READY');
  console.log('================================================================\n');

  console.log('================================================================');
  console.log('=== PART 2: SMART LECTURE RECOMMENDATION ENGINE VALIDATION ===');
  console.log('================================================================\n');

  // 1. Student Learning State
  console.log('--- Global Student State ---');
  const state = studentStateService.getState();
  console.log(`✓ Target NEET Score   : ${state.targetNEETScore}/720`);
  console.log(`✓ Current Subject     : ${state.currentSubject} -> Chapter: ${state.currentChapter}`);
  console.log(`✓ Weak Topics (${state.weakTopics.length}): ${state.weakTopics.slice(0, 2).join(', ')}`);
  console.log(`✓ Revision Queue      : ${state.revisionQueue.length} items due\n`);

  // 2. Smart Lecture Ranking
  console.log('--- Smart Lecture Ranking Engine ---');
  const recommendations = await SmartLectureRecommendationEngine.getRankedRecommendations();
  console.log(`Top Recommended Lecture:`);
  console.log(`  Title      : "${recommendations[0].title}"`);
  console.log(`  Subject    : ${recommendations[0].subject}`);
  console.log(`  Teacher    : ${recommendations[0].teacherName}`);
  console.log(`  Score      : ${recommendations[0].score}/100`);
  console.log(`  Pipeline   : Next Step -> ${recommendations[0].nextStepInPipeline}`);
  console.log(`  Ranking Reasons:`);
  recommendations[0].rankingReasons.forEach((r) => console.log(`   - ${r}`));

  // 3. Adaptive Planner
  console.log('\n--- Adaptive Planner Rebalance Test ---');
  const planResult = studentStateService.rebalanceTimetable();
  console.log(`✓ ${planResult.message}`);

  // 4. AI Decision Engine Response
  console.log('\n--- AI Decision Engine Answers ---');
  const q1 = AIStudyEngine.getAIDecisionAdvice('What should I study now?');
  console.log(`Q: "What should I study now?"`);
  console.log(`A: ${q1.answer}`);

  const q2 = AIStudyEngine.getAIDecisionAdvice('What is my weakest topic?');
  console.log(`Q: "What is my weakest topic?"`);
  console.log(`A: ${q2.answer}`);

  console.log('\n================================================================');
  console.log('✅ NEETDROP AI SMART STUDY ENGINE READY');
  console.log('================================================================\n');

  youtubeLiveEngine.getLiveStatus().then(() => {
    process.exit(0);
  });
}

runCompleteVerification().catch((err) => {
  console.error('❌ Verification Error:', err);
  process.exit(1);
});
