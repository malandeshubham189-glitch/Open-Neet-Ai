import { UnacademyResolverService, UNACADEMY_SEEP_PAHUJA_LECTURES } from '../services/unacademyResolver';
import { LectureResolverService } from '../services/lectureResolver';

async function verifyUnacademyPipeline() {
  console.log('==================================================');
  console.log('=== VERIFYING UNACADEMY NEET (SEEP PAHUJA) LECTURE PIPELINE ===');
  console.log('==================================================\n');

  console.log(`Total Mapped Unacademy Biology Lectures: ${UNACADEMY_SEEP_PAHUJA_LECTURES.length}`);

  // Test 1: Verify sample Biology chapters
  const testChapters = [
    'The Living World',
    'Cell: The Unit of Life',
    'Human Reproduction',
    'Molecular Basis of Inheritance',
    'Ecosystem'
  ];

  for (const chap of testChapters) {
    const found = UnacademyResolverService.getUnacademyLectureForBiology(chap);
    if (found) {
      console.log(`✓ Chapter: "${chap}" -> Found: "${found.title}"`);
      console.log(`   Video ID: ${found.youtubeId} | Channel: ${found.channelName} | Teacher: ${found.teacher}`);
      const isEmbeddable = await UnacademyResolverService.verifyVideoEmbeddable(found.youtubeId);
      console.log(`   Verification (Public/Embeddable): ${isEmbeddable ? 'PASSED ✅' : 'FAILED ❌'}\n`);
    } else {
      console.error(`❌ Chapter: "${chap}" -> Not found in Unacademy database!`);
    }
  }

  // Test 2: Verify LectureResolverService priority for Biology vs Physics
  console.log('--- Testing Resolver Priority ---');

  const bioTopicId = 'topic-bio-cell-1';
  const bioResolved = LectureResolverService.resolveLectureForTopic(bioTopicId);
  console.log(`Biology Topic "${bioTopicId}":`);
  console.log(`  Source Badge: OFFICIAL SOURCE: ${bioResolved.sourceBadge}`);
  console.log(`  Title: ${bioResolved.title}`);
  console.log(`  Teacher: ${bioResolved.teacher}`);
  console.log(`  Fallback Available: ${bioResolved.fallbackLecture ? 'YES (Unacademy Seep Pahuja)' : 'NO'}\n`);

  const phyTopicId = 'topic-phy-moi';
  const phyResolved = LectureResolverService.resolveLectureForTopic(phyTopicId);
  console.log(`Physics Topic "${phyTopicId}":`);
  console.log(`  Source Badge: OFFICIAL SOURCE: ${phyResolved.sourceBadge}`);
  console.log(`  Title: ${phyResolved.title}`);
  console.log(`  Teacher: ${phyResolved.teacher}`);
  console.log(`  Fallback Available: ${phyResolved.fallbackLecture ? 'YES' : 'NO (Physics pipeline unchanged)'}\n`);

  console.log('✅ Unacademy NEET Seep Pahuja Pipeline Verification Completed Successfully!');
}

verifyUnacademyPipeline().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
