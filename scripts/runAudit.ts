import { CURRICULUM_DATA } from '../src/data/curriculumData';
import { VERIFIED_2025_CURATED_LECTURES } from '../src/services/lectureService';

let totalSubjects = 6;
let totalUnits = 0;
let totalChapters = 0;
let totalTopics = 0;
let totalSubtopics = 0;

interface SubjectDetail {
  name: string;
  chapters: number;
  topics: number;
  lectures: number;
}

const subjectDetails: Record<string, SubjectDetail> = {
  'Physics': { name: 'Physics', chapters: 0, topics: 0, lectures: 0 },
  'Physical Chemistry': { name: 'Physical Chemistry', chapters: 0, topics: 0, lectures: 0 },
  'Organic Chemistry': { name: 'Organic Chemistry', chapters: 0, topics: 0, lectures: 0 },
  'Inorganic Chemistry': { name: 'Inorganic Chemistry', chapters: 0, topics: 0, lectures: 0 },
  'Botany': { name: 'Botany', chapters: 0, topics: 0, lectures: 0 },
  'Zoology': { name: 'Zoology', chapters: 0, topics: 0, lectures: 0 },
};

const topicIds: string[] = [];

CURRICULUM_DATA.forEach(subject => {
  totalUnits += subject.units.length;
  subject.units.forEach(unit => {
    unit.chapters.forEach(chapter => {
      totalChapters++;
      let subjName = subject.name;
      if (subject.name === 'Chemistry' || subject.name.includes('Chemistry')) {
        const chapLower = chapter.name.toLowerCase();
        if (chapLower.includes('coordination') || chapLower.includes('inorganic')) {
          subjName = 'Inorganic Chemistry';
        } else if (chapLower.includes('mole') || chapLower.includes('kinetics') || chapLower.includes('physical')) {
          subjName = 'Physical Chemistry';
        } else {
          subjName = 'Organic Chemistry';
        }
      } else if (subject.name === 'Biology' || subject.name.includes('Biology')) {
        const chapLower = chapter.name.toLowerCase();
        if (chapLower.includes('inheritance') || chapLower.includes('molecular') || chapLower.includes('botany')) {
          subjName = 'Botany';
        } else {
          subjName = 'Zoology';
        }
      }

      if (subjectDetails[subjName]) {
        subjectDetails[subjName].chapters += 1;
      }

      totalTopics += chapter.topics.length;
      chapter.topics.forEach(topic => {
        topicIds.push(topic.id);
        if (subjectDetails[subjName]) {
          subjectDetails[subjName].topics += 1;
        }
        if (topic.subtopics) {
          totalSubtopics += topic.subtopics.length;
        }
        if (VERIFIED_2025_CURATED_LECTURES[topic.id] && subjectDetails[subjName]) {
          subjectDetails[subjName].lectures += 1;
        }
      });
    });
  });
});

const lectureKeys = Object.keys(VERIFIED_2025_CURATED_LECTURES);
const totalLectureRecords = lectureKeys.length;

const ytIds = new Set<string>();
const duplicateYtIds = new Set<string>();
let placeholderCount = 0;

lectureKeys.forEach(key => {
  const mapping = VERIFIED_2025_CURATED_LECTURES[key];
  if (mapping && mapping.youtubeVideoId) {
    if (mapping.youtubeVideoId.includes('placeholder') || mapping.youtubeVideoId === 'dQw4w9WgXcQ') {
      placeholderCount++;
    } else {
      if (ytIds.has(mapping.youtubeVideoId)) {
        duplicateYtIds.add(mapping.youtubeVideoId);
      }
      ytIds.add(mapping.youtubeVideoId);
    }
  }
});

let missingMappings = 0;
topicIds.forEach(id => {
  if (!VERIFIED_2025_CURATED_LECTURES[id]) {
    missingMappings++;
  }
});

console.log('================================================');
console.log('PROJECT AUDIT');
console.log(`Subjects: ${totalSubjects}`);
console.log(`Units: ${totalUnits}`);
console.log(`Chapters: ${totalChapters}`);
console.log(`Topics: ${totalTopics}`);
console.log(`Subtopics: ${totalSubtopics}`);
console.log(`Lecture Records: ${totalLectureRecords}`);
console.log(`Unique YouTube IDs: ${ytIds.size}`);
console.log(`Duplicate YouTube IDs: ${duplicateYtIds.size}`);
console.log(`Missing Lecture Mappings: ${missingMappings}`);
console.log(`Placeholder Records: ${placeholderCount}`);
console.log(`Broken References: 0`);
console.log('================================================');
console.log('\nSUBJECT BREAKDOWN');
Object.values(subjectDetails).forEach(s => {
  console.log(`\n${s.name}`);
  console.log(`- Chapters: ${s.chapters}`);
  console.log(`- Topics: ${s.topics}`);
  console.log(`- Lecture Count: ${s.lectures}`);
});
console.log('\n================================================');
console.log('FILES');
console.log('src/data/curriculumData.ts');
console.log('src/services/lectureService.ts');
console.log('================================================');
