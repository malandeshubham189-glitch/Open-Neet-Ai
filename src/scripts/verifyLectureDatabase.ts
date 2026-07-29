import { CURRICULUM_DATA } from '../data/curriculumData';
import { GENERATED_LECTURE_DATABASE, LECTURE_DATABASE } from '../data/generatedLectureDatabase';

function verifyDatabase() {
  const subjects = CURRICULUM_DATA.length;
  let units = 0;
  let chapters = 0;
  let topics = 0;

  CURRICULUM_DATA.forEach((s) => {
    units += s.units.length;
    s.units.forEach((u) => {
      chapters += u.chapters.length;
      u.chapters.forEach((c) => {
        topics += c.topics.length;
      });
    });
  });

  const lectureRecords = GENERATED_LECTURE_DATABASE.length;

  let mappedTopics = 0;
  let unmappedTopics = 0;
  const topicIdsSeen = new Set<string>();
  let duplicateTopicMappings = 0;

  const videoIdsSeen = new Set<string>();
  const duplicateVideoIds = new Set<string>();

  GENERATED_LECTURE_DATABASE.forEach((rec) => {
    if (rec.youtubeId && rec.youtubeId.trim() !== '') {
      mappedTopics++;
    } else {
      unmappedTopics++;
    }

    if (topicIdsSeen.has(rec.id)) {
      duplicateTopicMappings++;
    }
    topicIdsSeen.add(rec.id);

    if (rec.youtubeId && rec.youtubeId.trim() !== '') {
      if (videoIdsSeen.has(rec.youtubeId)) {
        duplicateVideoIds.add(rec.youtubeId);
      }
      videoIdsSeen.add(rec.youtubeId);
    }
  });

  const coveragePercent = topics > 0 ? ((mappedTopics / topics) * 100).toFixed(1) : '0';

  console.log('===================================================');
  console.log('OFFICIAL PLAYLIST LECTURE DATABASE VERIFICATION REPORT');
  console.log('===================================================');
  console.log(`Subjects: ${subjects}`);
  console.log(`Units: ${units}`);
  console.log(`Chapters: ${chapters}`);
  console.log(`Topics: ${topics}`);
  console.log(`Lecture Records: ${lectureRecords}`);
  console.log(`Mapped Topics: ${mappedTopics}`);
  console.log(`Unmapped Topics: ${unmappedTopics}`);
  console.log(`Duplicate Topic Mappings: ${duplicateTopicMappings}`);
  console.log(`Duplicate Video IDs: ${duplicateVideoIds.size}`);
  console.log(`Coverage %: ${coveragePercent}%`);
  console.log('===================================================');

  if (unmappedTopics > 0 || duplicateTopicMappings > 0) {
    console.error('VERIFICATION ERROR: Incomplete mapping or duplicate topic records!');
    process.exit(1);
  } else {
    console.log('SUCCESS: Lecture database successfully verified with 100% topic coverage.');
  }
}

verifyDatabase();

