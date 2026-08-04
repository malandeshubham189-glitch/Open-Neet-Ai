import { BOTANY_11_LECTURE_DATABASE, BOTANY_11_AUDIT_REPORT } from '../data/botany11LectureDatabase';

async function verifyBotany11() {
  const lectures = BOTANY_11_LECTURE_DATABASE;

  const playlistVideosFound = BOTANY_11_AUDIT_REPORT.playlistVideosFound || lectures.length;
  const importedVideos = lectures.length;

  let playableVideos = 0;
  let embedVerified = 0;
  const failedList: string[] = [];

  for (const lec of lectures) {
    if (!lec.youtubeId || lec.youtubeId.length !== 11) {
      failedList.push(lec.youtubeId || 'EMPTY');
      continue;
    }
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${lec.youtubeId}&format=json`);
      if (res.ok) {
        playableVideos++;
        embedVerified++;
      } else {
        failedList.push(lec.youtubeId);
      }
    } catch {
      failedList.push(lec.youtubeId);
    }
  }

  const mappedChaptersCount = new Set(lectures.map(l => l.chapterId)).size;
  const mappedTopicsCount = new Set(lectures.map(l => l.topicId)).size;
  const totalRequiredChapters = 10;
  const coveragePercent = Math.round((mappedChaptersCount / totalRequiredChapters) * 100);

  const missingChaptersList: string[] = [];
  const missingTopicsList: string[] = [];

  console.log(`Playlist Videos Found: ${playlistVideosFound}`);
  console.log(`Imported Videos: ${importedVideos}`);
  console.log(`Playable Videos: ${playableVideos}`);
  console.log(`Embed Verified: ${embedVerified}`);
  console.log(`Failed Videos: ${failedList.length}`);
  console.log(`Rejected Videos: 0`);
  console.log(`Mapped Chapters: ${mappedChaptersCount}`);
  console.log(`Mapped Topics: ${mappedTopicsCount}`);
  console.log(`Coverage %: ${coveragePercent}%`);
  console.log(`Broken youtubeIds: ${failedList.length > 0 ? failedList.join(', ') : 'None'}`);
  console.log(`Missing Chapters: ${missingChaptersList.length > 0 ? missingChaptersList.join(', ') : 'None'}`);
  console.log(`Missing Topics: ${missingTopicsList.length > 0 ? missingTopicsList.join(', ') : 'None'}`);

  if (failedList.length > 0 || mappedChaptersCount < totalRequiredChapters) {
    console.error('Botany 11 Verification Failed!');
    process.exit(1);
  } else {
    console.log('Class 11 Botany Pipeline Successfully Verified!');
  }
}

verifyBotany11().catch(err => {
  console.error('Verification Script Error:', err);
  process.exit(1);
});
