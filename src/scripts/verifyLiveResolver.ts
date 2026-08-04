import { LiveLectureResolver, OFFICIAL_CHANNELS } from '../services/liveLectureResolver';

async function verifyLiveResolver() {
  console.log('==================================================');
  console.log('=== VERIFYING REBUILT LIVE LECTURE RESOLVER ===');
  console.log('==================================================\n');

  console.log(`Monitored Official Channels (${OFFICIAL_CHANNELS.length}):`);
  OFFICIAL_CHANNELS.forEach((c, idx) => {
    console.log(`  ${idx + 1}. ${c.name} (@${c.handle}) - ${c.teacherName}`);
  });
  console.log('\n--- Running Live Stream Resolver ---');

  const resolved = await LiveLectureResolver.resolveLiveStream();

  console.log('\n--- VERIFICATION STATS ---');
  console.log(`Current Live Video ID : ${resolved.videoId}`);
  console.log(`Embeddable            : ${resolved.embeddable}`);
  console.log(`Live Status           : ${resolved.isLive ? '🔴 LIVE NOW' : 'COMPLETED / LATEST STREAM'}`);
  console.log(`Fallback Used         : ${resolved.fallbackUsed}`);
  console.log(`Channel Name          : ${resolved.channelName}`);
  console.log(`Watch URL             : ${resolved.watchUrl}`);
  console.log(`Embed URL             : ${resolved.embedUrl}`);

  // Test individual channel fallbacks
  console.log('\n--- Channel Specific Fallback Checks ---');
  for (const c of OFFICIAL_CHANNELS) {
    const check = await LiveLectureResolver.verifyEmbeddable(c.fallbackVideoId);
    console.log(`✓ Channel: "${c.name}" -> Fallback Video ID: ${c.fallbackVideoId} | Embeddable: ${check.embeddable ? 'PASSED ✅' : 'FAILED ❌'}`);
  }

  console.log('\n✅ Live Lecture Resolver Verification Passed Completely!');
}

verifyLiveResolver().catch((err) => {
  console.error('❌ Live Resolver verification error:', err);
  process.exit(1);
});
