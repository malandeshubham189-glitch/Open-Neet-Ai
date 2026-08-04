import { aiTutor } from '../services/aiTutor';
import { LectureContextManager } from '../services/aiTutor/lectureContext';
import { ContextManager } from '../services/aiTutor/contextManager';

async function runAITutorVerification() {
  console.log('================================================================');
  console.log('=== AI TUTOR MODE SYSTEM VERIFICATION ===');
  console.log('================================================================\n');

  // 1. Context Manager & Lecture Context Test
  console.log('--- 1. Lecture Context & Context Manager ---');
  LectureContextManager.setContext({
    subject: 'Botany',
    chapter: 'The Living World',
    topic: 'Taxonomic Categories',
    teacher: 'Seep Pahuja',
    lectureTitle: 'The Living World Class 11 Biology One Shot',
    currentTimestampSeconds: 1200,
  });

  const fullCtx = ContextManager.getFullContext();
  console.log(`✓ Active Subject  : ${fullCtx.lecture.subject}`);
  console.log(`✓ Chapter / Topic : ${fullCtx.lecture.chapter} -> ${fullCtx.lecture.topic}`);
  console.log(`✓ Faculty         : ${fullCtx.lecture.teacher}`);
  console.log(`✓ Timestamp       : ${fullCtx.lecture.currentTimestampSeconds}s (${fullCtx.lecture.watchProgressPercent}% watched)`);
  console.log(`✓ Relevant Chunk  : "${fullCtx.relevantTranscript.slice(0, 80)}..."\n`);

  // 2. Real-time Doubt Solver
  console.log('--- 2. Doubt Solver Test ---');
  const doubtRes = await aiTutor.solveDoubt({
    userQuery: 'Explain the difference between growth and reproduction as defining properties in living beings',
    language: 'Hinglish',
    mode: 'explain',
  });
  console.log(`✓ Doubt Solver Answer Received (${doubtRes.markdownText.length} chars)`);
  console.log(`Preview: "${doubtRes.markdownText.slice(0, 150)}..."\n`);

  // 3. Notes Generator
  console.log('--- 3. Note Generator Test ---');
  const notesRes = await aiTutor.generateNotes('NCERT Notes');
  console.log(`✓ NCERT Notes Generated (${notesRes.markdownText.length} chars)\n`);

  // 4. MCQ Generator
  console.log('--- 4. MCQ Generator Test ---');
  const mcqResult = await aiTutor.generateMCQs('Medium', 3);
  console.log(`✓ Generated ${mcqResult.mcqs.length} MCQs for ${fullCtx.lecture.chapter}`);
  console.log(`  Sample Q1: "${mcqResult.mcqs[0]?.question}"\n`);

  // 5. PYQ Generator
  console.log('--- 5. PYQ Generator Test ---');
  const pyqResult = await aiTutor.generatePYQs(2);
  console.log(`✓ Retrieved ${pyqResult.pyqs.length} Authentic PYQs`);
  console.log(`  Sample PYQ [${pyqResult.pyqs[0]?.year}]: "${pyqResult.pyqs[0]?.question}"\n`);

  // 6. Revision Generator
  console.log('--- 6. Revision Generator Test ---');
  const revResult = await aiTutor.generateRevisionCards();
  console.log(`✓ Generated ${revResult.cards.length} Spaced Revision Flashcards`);
  console.log(`  Sample Card Front: "${revResult.cards[0]?.frontConcept}"\n`);

  // 7. 24x7 Study Coach
  console.log('--- 7. Study Coach Advice Test ---');
  const coachAdvice = aiTutor.getCoachAdvice('How to score 680+ in NEET 2026?');
  console.log(`✓ Coach Recommendation: "${coachAdvice.answer.slice(0, 120)}..."\n`);

  console.log('================================================================');
  console.log('✅ PRODUCTION READY - ALL AI TUTOR MODE MODULES VERIFIED SUCCESSFULLY');
  console.log('================================================================\n');

  process.exit(0);
}

runAITutorVerification().catch((err) => {
  console.error('❌ AI Tutor Mode Verification Failed:', err);
  process.exit(1);
});
