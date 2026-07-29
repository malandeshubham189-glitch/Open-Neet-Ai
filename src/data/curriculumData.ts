import { Subject } from '../types';

export const CURRICULUM_DATA: Subject[] = [
  // SUBJECT 1: PHYSICS
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY',
    icon: 'Atom',
    color: '#10B981',
    badge: '30 Chapters - Formula & Numericals',
    totalUnits: 8,
    totalChapters: 30,
    totalTopics: 30,
    neetWeightagePercent: 25,
    units: [
      {
        id: 'unit-phy-1',
        subjectId: 'physics',
        classLevel: 'Class 11',
        name: 'Kinematics & Vectors',
        description: 'Dimensional analysis, SI units, significant figures, Vernier caliper, screw gauge, and fractional error propagation.',
        chapters: [
          {
            id: 'chap-phy-units',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Vectors',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 1: Units, Dimensions & Error Analysis',
            description: 'Dimensional analysis, SI units, significant figures, Vernier caliper, screw gauge, and fractional error propagation.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-units',
                chapterId: 'chap-phy-units',
                chapterName: 'Chapter 1: Units, Dimensions & Error Analysis',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Vectors',
                classLevel: 'Class 11',
                title: 'Chapter 1: Units, Dimensions & Error Analysis Complete One Shot',
                description: 'Dimensional analysis, SI units, significant figures, Vernier caliper, screw gauge, and fractional error propagation.',
                youtubeVideoId: 'WDjcpSCI-uU',
                channelName: 'Competition Wallah',
                durationMinutes: 436,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 436,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 1: Units, Dimensions & Error Analysis.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-units-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 174, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-units-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 261, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-units',
                    type: 'primary',
                    title: 'Chapter 1: Units, Dimensions & Error Analysis in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'WDjcpSCI-uU',
                    durationMinutes: 436,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 1: Units, Dimensions & Error Analysis Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-vectors',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Vectors',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 2: Basic Mathematics & Vectors',
            description: 'Vector addition, dot and cross products, differentiation, integration, and graph analysis.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-vectors',
                chapterId: 'chap-phy-vectors',
                chapterName: 'Chapter 2: Basic Mathematics & Vectors',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Vectors',
                classLevel: 'Class 11',
                title: 'Chapter 2: Basic Mathematics & Vectors Complete One Shot',
                description: 'Vector addition, dot and cross products, differentiation, integration, and graph analysis.',
                youtubeVideoId: '46CaYBwEp_k',
                channelName: 'Competition Wallah',
                durationMinutes: 358,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 358,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 2: Basic Mathematics & Vectors.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-vectors-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 143, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-vectors-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 214, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-vectors',
                    type: 'primary',
                    title: 'Chapter 2: Basic Mathematics & Vectors in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '46CaYBwEp_k',
                    durationMinutes: 358,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 2: Basic Mathematics & Vectors Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-1d',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Vectors',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 3: Motion in a Straight Line',
            description: 'Distance, displacement, uniform and non-uniform acceleration, graphs, motion under gravity.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-1d',
                chapterId: 'chap-phy-1d',
                chapterName: 'Chapter 3: Motion in a Straight Line',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Vectors',
                classLevel: 'Class 11',
                title: 'Chapter 3: Motion in a Straight Line Complete One Shot',
                description: 'Distance, displacement, uniform and non-uniform acceleration, graphs, motion under gravity.',
                youtubeVideoId: '-tIkepyF8aY',
                channelName: 'Competition Wallah',
                durationMinutes: 393,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 393,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 3: Motion in a Straight Line.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-1d-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 157, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-1d-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 235, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-1d',
                    type: 'primary',
                    title: 'Chapter 3: Motion in a Straight Line in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '-tIkepyF8aY',
                    durationMinutes: 393,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 3: Motion in a Straight Line Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-projectile',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Vectors',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 4: Motion in a Plane & Projectile',
            description: '2D motion, projectile trajectory, maximum height, range, uniform and non-uniform circular kinematics.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-projectile',
                chapterId: 'chap-phy-projectile',
                chapterName: 'Chapter 4: Motion in a Plane & Projectile',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Vectors',
                classLevel: 'Class 11',
                title: 'Chapter 4: Motion in a Plane & Projectile Complete One Shot',
                description: '2D motion, projectile trajectory, maximum height, range, uniform and non-uniform circular kinematics.',
                youtubeVideoId: 'YKLZpAjK-M8',
                channelName: 'Competition Wallah',
                durationMinutes: 381,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 381,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 4: Motion in a Plane & Projectile.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-projectile-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 152, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-projectile-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 228, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-projectile',
                    type: 'primary',
                    title: 'Chapter 4: Motion in a Plane & Projectile in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'YKLZpAjK-M8',
                    durationMinutes: 381,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 4: Motion in a Plane & Projectile Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-phy-2',
        subjectId: 'physics',
        classLevel: 'Class 11',
        name: 'Mechanics & Dynamics',
        description: 'Inertia, momentum, F=ma, free body diagrams, static and kinetic friction, banking of roads.',
        chapters: [
          {
            id: 'chap-phy-laws',
            unitId: 'unit-phy-2',
            unitName: 'Mechanics & Dynamics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 5: Newton Laws of Motion & Friction',
            description: 'Inertia, momentum, F=ma, free body diagrams, static and kinetic friction, banking of roads.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-laws',
                chapterId: 'chap-phy-laws',
                chapterName: 'Chapter 5: Newton Laws of Motion & Friction',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Mechanics & Dynamics',
                classLevel: 'Class 11',
                title: 'Chapter 5: Newton Laws of Motion & Friction Complete One Shot',
                description: 'Inertia, momentum, F=ma, free body diagrams, static and kinetic friction, banking of roads.',
                youtubeVideoId: '2cdRXbYeCqo',
                channelName: 'Competition Wallah',
                durationMinutes: 438,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 438,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 5: Newton Laws of Motion & Friction.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-laws-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 175, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-laws-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 262, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-laws',
                    type: 'primary',
                    title: 'Chapter 5: Newton Laws of Motion & Friction in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '2cdRXbYeCqo',
                    durationMinutes: 438,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 5: Newton Laws of Motion & Friction Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-work-energy',
            unitId: 'unit-phy-2',
            unitName: 'Mechanics & Dynamics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 6: Work, Energy & Power',
            description: 'Work done by constant and variable force, conservative forces, potential energy, vertical circular motion.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-work-energy',
                chapterId: 'chap-phy-work-energy',
                chapterName: 'Chapter 6: Work, Energy & Power',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Mechanics & Dynamics',
                classLevel: 'Class 11',
                title: 'Chapter 6: Work, Energy & Power Complete One Shot',
                description: 'Work done by constant and variable force, conservative forces, potential energy, vertical circular motion.',
                youtubeVideoId: 'Ce-1sflLTj8',
                channelName: 'Competition Wallah',
                durationMinutes: 334,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 334,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 6: Work, Energy & Power.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-work-energy-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 133, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-work-energy-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 200, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-work-energy',
                    type: 'primary',
                    title: 'Chapter 6: Work, Energy & Power in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Ce-1sflLTj8',
                    durationMinutes: 334,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 6: Work, Energy & Power Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-com',
            unitId: 'unit-phy-2',
            unitName: 'Mechanics & Dynamics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 7: Centre of Mass & Collisions',
            description: 'Centre of mass of discrete and continuous bodies, conservation of linear momentum, elastic and inelastic 1D/2D collisions.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-com',
                chapterId: 'chap-phy-com',
                chapterName: 'Chapter 7: Centre of Mass & Collisions',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Mechanics & Dynamics',
                classLevel: 'Class 11',
                title: 'Chapter 7: Centre of Mass & Collisions Complete One Shot',
                description: 'Centre of mass of discrete and continuous bodies, conservation of linear momentum, elastic and inelastic 1D/2D collisions.',
                youtubeVideoId: 'wG4uHKZkJRI',
                channelName: 'Competition Wallah',
                durationMinutes: 317,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 317,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 7: Centre of Mass & Collisions.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-com-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 126, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-com-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 190, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-com',
                    type: 'primary',
                    title: 'Chapter 7: Centre of Mass & Collisions in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'wG4uHKZkJRI',
                    durationMinutes: 317,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 7: Centre of Mass & Collisions Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-rotational',
            unitId: 'unit-phy-2',
            unitName: 'Mechanics & Dynamics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 8: System of Particles & Rotational Motion',
            description: 'Moment of inertia, parallel and perpendicular axis theorems, torque, angular momentum, rolling motion.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-rotational',
                chapterId: 'chap-phy-rotational',
                chapterName: 'Chapter 8: System of Particles & Rotational Motion',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Mechanics & Dynamics',
                classLevel: 'Class 11',
                title: 'Chapter 8: System of Particles & Rotational Motion Complete One Shot',
                description: 'Moment of inertia, parallel and perpendicular axis theorems, torque, angular momentum, rolling motion.',
                youtubeVideoId: 'ec1CLG1jU0I',
                channelName: 'Competition Wallah',
                durationMinutes: 371,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 371,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 8: System of Particles & Rotational Motion.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-rotational-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 148, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-rotational-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 222, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-rotational',
                    type: 'primary',
                    title: 'Chapter 8: System of Particles & Rotational Motion in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'ec1CLG1jU0I',
                    durationMinutes: 371,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 8: System of Particles & Rotational Motion Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-phy-3',
        subjectId: 'physics',
        classLevel: 'Class 11',
        name: 'Gravitation & Matter Properties',
        description: 'Kepler laws, universal law of gravitation, gravitational potential and potential energy, orbital and escape speed, satellites.',
        chapters: [
          {
            id: 'chap-phy-gravitation',
            unitId: 'unit-phy-3',
            unitName: 'Gravitation & Matter Properties',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 9: Gravitation',
            description: 'Kepler laws, universal law of gravitation, gravitational potential and potential energy, orbital and escape speed, satellites.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-gravitation',
                chapterId: 'chap-phy-gravitation',
                chapterName: 'Chapter 9: Gravitation',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Gravitation & Matter Properties',
                classLevel: 'Class 11',
                title: 'Chapter 9: Gravitation Complete One Shot',
                description: 'Kepler laws, universal law of gravitation, gravitational potential and potential energy, orbital and escape speed, satellites.',
                youtubeVideoId: 'eHIFpPdGuY0',
                channelName: 'Competition Wallah',
                durationMinutes: 379,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 379,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 9: Gravitation.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-gravitation-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 151, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-gravitation-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 227, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-gravitation',
                    type: 'primary',
                    title: 'Chapter 9: Gravitation in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'eHIFpPdGuY0',
                    durationMinutes: 379,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 9: Gravitation Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-solids',
            unitId: 'unit-phy-3',
            unitName: 'Gravitation & Matter Properties',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 10: Mechanical Properties of Solids',
            description: 'Elastic behavior, stress-strain relationship, Hooke law, Young modulus, bulk modulus, shear modulus.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-solids',
                chapterId: 'chap-phy-solids',
                chapterName: 'Chapter 10: Mechanical Properties of Solids',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Gravitation & Matter Properties',
                classLevel: 'Class 11',
                title: 'Chapter 10: Mechanical Properties of Solids Complete One Shot',
                description: 'Elastic behavior, stress-strain relationship, Hooke law, Young modulus, bulk modulus, shear modulus.',
                youtubeVideoId: 'a2T84FeLIdY',
                channelName: 'Competition Wallah',
                durationMinutes: 141,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 141,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 10: Mechanical Properties of Solids.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-solids-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 56, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-solids-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 84, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-solids',
                    type: 'primary',
                    title: 'Chapter 10: Mechanical Properties of Solids in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'a2T84FeLIdY',
                    durationMinutes: 141,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 10: Mechanical Properties of Solids Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-fluids',
            unitId: 'unit-phy-3',
            unitName: 'Gravitation & Matter Properties',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 11: Mechanical Properties of Fluids',
            description: 'Pascal law, Archimedes principle, viscosity, Stokes law, terminal velocity, stream and turbulent flow, Bernoulli equation.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-fluids',
                chapterId: 'chap-phy-fluids',
                chapterName: 'Chapter 11: Mechanical Properties of Fluids',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Gravitation & Matter Properties',
                classLevel: 'Class 11',
                title: 'Chapter 11: Mechanical Properties of Fluids Complete One Shot',
                description: 'Pascal law, Archimedes principle, viscosity, Stokes law, terminal velocity, stream and turbulent flow, Bernoulli equation.',
                youtubeVideoId: 'Ele4sqz0cUI',
                channelName: 'Competition Wallah',
                durationMinutes: 361,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 361,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 11: Mechanical Properties of Fluids.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-fluids-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 144, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-fluids-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 216, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-fluids',
                    type: 'primary',
                    title: 'Chapter 11: Mechanical Properties of Fluids in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Ele4sqz0cUI',
                    durationMinutes: 361,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 11: Mechanical Properties of Fluids Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-thermal',
            unitId: 'unit-phy-3',
            unitName: 'Gravitation & Matter Properties',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 12: Thermal Properties of Matter',
            description: 'Heat, temperature, thermal expansion, specific heat capacity, calorimetry, latent heat, heat transfer conduction convection radiation.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-thermal',
                chapterId: 'chap-phy-thermal',
                chapterName: 'Chapter 12: Thermal Properties of Matter',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Gravitation & Matter Properties',
                classLevel: 'Class 11',
                title: 'Chapter 12: Thermal Properties of Matter Complete One Shot',
                description: 'Heat, temperature, thermal expansion, specific heat capacity, calorimetry, latent heat, heat transfer conduction convection radiation.',
                youtubeVideoId: 'CGS6eP-yZec',
                channelName: 'Competition Wallah',
                durationMinutes: 313,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 313,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 12: Thermal Properties of Matter.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-thermal-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 125, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-thermal-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 187, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-thermal',
                    type: 'primary',
                    title: 'Chapter 12: Thermal Properties of Matter in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'CGS6eP-yZec',
                    durationMinutes: 313,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 12: Thermal Properties of Matter Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-phy-4',
        subjectId: 'physics',
        classLevel: 'Class 11',
        name: 'Thermodynamics, SHM & Waves',
        description: 'Zeroth, First and Second law of thermodynamics, isothermal, adiabatic, isobaric, isochoric processes, heat engines, Carnot engine.',
        chapters: [
          {
            id: 'chap-phy-thermo',
            unitId: 'unit-phy-4',
            unitName: 'Thermodynamics, SHM & Waves',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 13: Thermodynamics',
            description: 'Zeroth, First and Second law of thermodynamics, isothermal, adiabatic, isobaric, isochoric processes, heat engines, Carnot engine.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-thermo',
                chapterId: 'chap-phy-thermo',
                chapterName: 'Chapter 13: Thermodynamics',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Thermodynamics, SHM & Waves',
                classLevel: 'Class 11',
                title: 'Chapter 13: Thermodynamics Complete One Shot',
                description: 'Zeroth, First and Second law of thermodynamics, isothermal, adiabatic, isobaric, isochoric processes, heat engines, Carnot engine.',
                youtubeVideoId: 'A8W90UdFyHM',
                channelName: 'Competition Wallah',
                durationMinutes: 357,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 357,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 13: Thermodynamics.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-thermo-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 142, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-thermo-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 214, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-thermo',
                    type: 'primary',
                    title: 'Chapter 13: Thermodynamics in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'A8W90UdFyHM',
                    durationMinutes: 357,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 13: Thermodynamics Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-ktg',
            unitId: 'unit-phy-4',
            unitName: 'Thermodynamics, SHM & Waves',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 14: Kinetic Theory of Gases',
            description: 'Equation of state of a perfect gas, work done on compressing a gas, kinetic theory assumptions, RMS speed, degrees of freedom, law of equipartition of energy.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-ktg',
                chapterId: 'chap-phy-ktg',
                chapterName: 'Chapter 14: Kinetic Theory of Gases',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Thermodynamics, SHM & Waves',
                classLevel: 'Class 11',
                title: 'Chapter 14: Kinetic Theory of Gases Complete One Shot',
                description: 'Equation of state of a perfect gas, work done on compressing a gas, kinetic theory assumptions, RMS speed, degrees of freedom, law of equipartition of energy.',
                youtubeVideoId: 'A8W90UdFyHM',
                channelName: 'Competition Wallah',
                durationMinutes: 210,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 210,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 14: Kinetic Theory of Gases.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-ktg-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 84, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-ktg-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 126, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-ktg',
                    type: 'primary',
                    title: 'Chapter 14: Kinetic Theory of Gases in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'A8W90UdFyHM',
                    durationMinutes: 210,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 14: Kinetic Theory of Gases Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-shm',
            unitId: 'unit-phy-4',
            unitName: 'Thermodynamics, SHM & Waves',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 15: Oscillations (Simple Harmonic Motion)',
            description: 'Periodic motion, simple harmonic motion (SHM), displacement, velocity, acceleration, simple pendulum, spring-mass systems.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-shm',
                chapterId: 'chap-phy-shm',
                chapterName: 'Chapter 15: Oscillations (Simple Harmonic Motion)',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Thermodynamics, SHM & Waves',
                classLevel: 'Class 11',
                title: 'Chapter 15: Oscillations (Simple Harmonic Motion) Complete One Shot',
                description: 'Periodic motion, simple harmonic motion (SHM), displacement, velocity, acceleration, simple pendulum, spring-mass systems.',
                youtubeVideoId: 'wOIRp8B8l-U',
                channelName: 'Competition Wallah',
                durationMinutes: 313,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 313,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 15: Oscillations (Simple Harmonic Motion).',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-shm-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 125, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-shm-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 187, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-shm',
                    type: 'primary',
                    title: 'Chapter 15: Oscillations (Simple Harmonic Motion) in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'wOIRp8B8l-U',
                    durationMinutes: 313,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 15: Oscillations (Simple Harmonic Motion) Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-waves',
            unitId: 'unit-phy-4',
            unitName: 'Thermodynamics, SHM & Waves',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Chapter 16: Waves & Sound',
            description: 'Wave motion, transverse and longitudinal waves, speed of wave motion, displacement relation, principle of superposition, organ pipes.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-waves',
                chapterId: 'chap-phy-waves',
                chapterName: 'Chapter 16: Waves & Sound',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Thermodynamics, SHM & Waves',
                classLevel: 'Class 11',
                title: 'Chapter 16: Waves & Sound Complete One Shot',
                description: 'Wave motion, transverse and longitudinal waves, speed of wave motion, displacement relation, principle of superposition, organ pipes.',
                youtubeVideoId: 'QOYEiy1AUTI',
                channelName: 'Competition Wallah',
                durationMinutes: 296,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 296,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 16: Waves & Sound.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-waves-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 118, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-waves-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 177, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-waves',
                    type: 'primary',
                    title: 'Chapter 16: Waves & Sound in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'MR Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'QOYEiy1AUTI',
                    durationMinutes: 296,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 16: Waves & Sound Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-phy-5',
        subjectId: 'physics',
        classLevel: 'Class 12',
        name: 'Electrostatics & Current',
        description: 'Electric charge, Coulomb law, electric field, dipole, Gauss law and its applications.',
        chapters: [
          {
            id: 'chap-phy-electrostatics',
            unitId: 'unit-phy-5',
            unitName: 'Electrostatics & Current',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 17: Electric Charges and Fields',
            description: 'Electric charge, Coulomb law, electric field, dipole, Gauss law and its applications.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-electrostatics',
                chapterId: 'chap-phy-electrostatics',
                chapterName: 'Chapter 17: Electric Charges and Fields',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Electrostatics & Current',
                classLevel: 'Class 12',
                title: 'Chapter 17: Electric Charges and Fields Complete One Shot',
                description: 'Electric charge, Coulomb law, electric field, dipole, Gauss law and its applications.',
                youtubeVideoId: 'L8u1BzHkGNQ',
                channelName: 'Competition Wallah',
                durationMinutes: 446,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 446,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 17: Electric Charges and Fields.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-electrostatics-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 178, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-electrostatics-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 267, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-electrostatics',
                    type: 'primary',
                    title: 'Chapter 17: Electric Charges and Fields in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'L8u1BzHkGNQ',
                    durationMinutes: 446,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 17: Electric Charges and Fields Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-capacitance',
            unitId: 'unit-phy-5',
            unitName: 'Electrostatics & Current',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 18: Electrostatic Potential & Capacitance',
            description: 'Electric potential, potential difference, equipotential surfaces, conductors and dielectrics, parallel plate capacitor.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-capacitance',
                chapterId: 'chap-phy-capacitance',
                chapterName: 'Chapter 18: Electrostatic Potential & Capacitance',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Electrostatics & Current',
                classLevel: 'Class 12',
                title: 'Chapter 18: Electrostatic Potential & Capacitance Complete One Shot',
                description: 'Electric potential, potential difference, equipotential surfaces, conductors and dielectrics, parallel plate capacitor.',
                youtubeVideoId: 'W3XdrIcyU8E',
                channelName: 'Competition Wallah',
                durationMinutes: 486,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 486,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 18: Electrostatic Potential & Capacitance.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-capacitance-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 194, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-capacitance-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 291, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-capacitance',
                    type: 'primary',
                    title: 'Chapter 18: Electrostatic Potential & Capacitance in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'W3XdrIcyU8E',
                    durationMinutes: 486,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 18: Electrostatic Potential & Capacitance Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-current',
            unitId: 'unit-phy-5',
            unitName: 'Electrostatics & Current',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 19: Current Electricity',
            description: 'Electric current, drift velocity, Ohm law, electrical resistance, V-I characteristics, Kirchhoff rules, Wheatstone bridge.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-current',
                chapterId: 'chap-phy-current',
                chapterName: 'Chapter 19: Current Electricity',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Electrostatics & Current',
                classLevel: 'Class 12',
                title: 'Chapter 19: Current Electricity Complete One Shot',
                description: 'Electric current, drift velocity, Ohm law, electrical resistance, V-I characteristics, Kirchhoff rules, Wheatstone bridge.',
                youtubeVideoId: 'UivWFceHp9M',
                channelName: 'Competition Wallah',
                durationMinutes: 477,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 477,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 19: Current Electricity.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-current-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 190, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-current-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 286, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-current',
                    type: 'primary',
                    title: 'Chapter 19: Current Electricity in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'UivWFceHp9M',
                    durationMinutes: 477,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 19: Current Electricity Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-phy-6',
        subjectId: 'physics',
        classLevel: 'Class 12',
        name: 'Magnetism, EMI & AC',
        description: 'Biot-Savart law, Ampere circuital law, force on moving charge in magnetic field, cyclotron, torque on current loop.',
        chapters: [
          {
            id: 'chap-phy-magnetism',
            unitId: 'unit-phy-6',
            unitName: 'Magnetism, EMI & AC',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 20: Moving Charges and Magnetism',
            description: 'Biot-Savart law, Ampere circuital law, force on moving charge in magnetic field, cyclotron, torque on current loop.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-magnetism',
                chapterId: 'chap-phy-magnetism',
                chapterName: 'Chapter 20: Moving Charges and Magnetism',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Magnetism, EMI & AC',
                classLevel: 'Class 12',
                title: 'Chapter 20: Moving Charges and Magnetism Complete One Shot',
                description: 'Biot-Savart law, Ampere circuital law, force on moving charge in magnetic field, cyclotron, torque on current loop.',
                youtubeVideoId: '8FmM-xbyKto',
                channelName: 'Competition Wallah',
                durationMinutes: 457,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 457,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 20: Moving Charges and Magnetism.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-magnetism-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 182, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-magnetism-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 274, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-magnetism',
                    type: 'primary',
                    title: 'Chapter 20: Moving Charges and Magnetism in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '8FmM-xbyKto',
                    durationMinutes: 457,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 20: Moving Charges and Magnetism Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-matter',
            unitId: 'unit-phy-6',
            unitName: 'Magnetism, EMI & AC',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 21: Magnetism & Matter',
            description: 'Bar magnet as an equivalent solenoid, magnetic field intensity, magnetic dipole moment, dia-, para-, and ferro-magnetic substances.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-matter',
                chapterId: 'chap-phy-matter',
                chapterName: 'Chapter 21: Magnetism & Matter',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Magnetism, EMI & AC',
                classLevel: 'Class 12',
                title: 'Chapter 21: Magnetism & Matter Complete One Shot',
                description: 'Bar magnet as an equivalent solenoid, magnetic field intensity, magnetic dipole moment, dia-, para-, and ferro-magnetic substances.',
                youtubeVideoId: '3vCY2xemf4g',
                channelName: 'Competition Wallah',
                durationMinutes: 281,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 281,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 21: Magnetism & Matter.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-matter-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 112, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-matter-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 168, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-matter',
                    type: 'primary',
                    title: 'Chapter 21: Magnetism & Matter in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '3vCY2xemf4g',
                    durationMinutes: 281,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 21: Magnetism & Matter Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-emi',
            unitId: 'unit-phy-6',
            unitName: 'Magnetism, EMI & AC',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 22: Electromagnetic Induction',
            description: 'Faraday laws, induced EMF and current, Lenz law, Eddy currents, self and mutual inductance.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-emi',
                chapterId: 'chap-phy-emi',
                chapterName: 'Chapter 22: Electromagnetic Induction',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Magnetism, EMI & AC',
                classLevel: 'Class 12',
                title: 'Chapter 22: Electromagnetic Induction Complete One Shot',
                description: 'Faraday laws, induced EMF and current, Lenz law, Eddy currents, self and mutual inductance.',
                youtubeVideoId: 'Q1S4tcUASRk',
                channelName: 'Competition Wallah',
                durationMinutes: 400,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 400,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 22: Electromagnetic Induction.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-emi-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 160, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-emi-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 240, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-emi',
                    type: 'primary',
                    title: 'Chapter 22: Electromagnetic Induction in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Q1S4tcUASRk',
                    durationMinutes: 400,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 22: Electromagnetic Induction Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-ac',
            unitId: 'unit-phy-6',
            unitName: 'Magnetism, EMI & AC',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 23: Alternating Current',
            description: 'Alternating currents, peak and RMS value, reactance and impedance, LCR series circuit, resonance, power in AC circuits, transformer.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-ac',
                chapterId: 'chap-phy-ac',
                chapterName: 'Chapter 23: Alternating Current',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Magnetism, EMI & AC',
                classLevel: 'Class 12',
                title: 'Chapter 23: Alternating Current Complete One Shot',
                description: 'Alternating currents, peak and RMS value, reactance and impedance, LCR series circuit, resonance, power in AC circuits, transformer.',
                youtubeVideoId: 'oF71yI0Zzz4',
                channelName: 'Competition Wallah',
                durationMinutes: 392,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 392,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 23: Alternating Current.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-ac-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 156, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-ac-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 235, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-ac',
                    type: 'primary',
                    title: 'Chapter 23: Alternating Current in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'oF71yI0Zzz4',
                    durationMinutes: 392,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 23: Alternating Current Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-emwaves',
            unitId: 'unit-phy-6',
            unitName: 'Magnetism, EMI & AC',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 24: Electromagnetic Waves',
            description: 'Displacement current, electromagnetic spectrum, radio waves, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-emwaves',
                chapterId: 'chap-phy-emwaves',
                chapterName: 'Chapter 24: Electromagnetic Waves',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Magnetism, EMI & AC',
                classLevel: 'Class 12',
                title: 'Chapter 24: Electromagnetic Waves Complete One Shot',
                description: 'Displacement current, electromagnetic spectrum, radio waves, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays.',
                youtubeVideoId: '3bn8YvtaoT4',
                channelName: 'Competition Wallah',
                durationMinutes: 259,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 259,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 24: Electromagnetic Waves.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-emwaves-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 103, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-emwaves-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 155, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-emwaves',
                    type: 'primary',
                    title: 'Chapter 24: Electromagnetic Waves in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '3bn8YvtaoT4',
                    durationMinutes: 259,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 24: Electromagnetic Waves Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-phy-7',
        subjectId: 'physics',
        classLevel: 'Class 12',
        name: 'Optics',
        description: 'Reflection, spherical mirrors, refraction, total internal reflection, lenses, prism refraction, microscope and astronomical telescope.',
        chapters: [
          {
            id: 'chap-phy-ray-optics',
            unitId: 'unit-phy-7',
            unitName: 'Optics',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 25: Ray Optics & Optical Instruments',
            description: 'Reflection, spherical mirrors, refraction, total internal reflection, lenses, prism refraction, microscope and astronomical telescope.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-ray-optics',
                chapterId: 'chap-phy-ray-optics',
                chapterName: 'Chapter 25: Ray Optics & Optical Instruments',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Optics',
                classLevel: 'Class 12',
                title: 'Chapter 25: Ray Optics & Optical Instruments Complete One Shot',
                description: 'Reflection, spherical mirrors, refraction, total internal reflection, lenses, prism refraction, microscope and astronomical telescope.',
                youtubeVideoId: 'Ta6nCaTdhBM',
                channelName: 'Competition Wallah',
                durationMinutes: 589,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 589,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 25: Ray Optics & Optical Instruments.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-ray-optics-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 235, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-ray-optics-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 353, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-ray-optics',
                    type: 'primary',
                    title: 'Chapter 25: Ray Optics & Optical Instruments in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Ta6nCaTdhBM',
                    durationMinutes: 589,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 25: Ray Optics & Optical Instruments Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-wave-optics',
            unitId: 'unit-phy-7',
            unitName: 'Optics',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 26: Wave Optics',
            description: 'Huygens principle, wave front, interference, Young double slit experiment, fringe width, diffraction due to a single slit.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-wave-optics',
                chapterId: 'chap-phy-wave-optics',
                chapterName: 'Chapter 26: Wave Optics',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Optics',
                classLevel: 'Class 12',
                title: 'Chapter 26: Wave Optics Complete One Shot',
                description: 'Huygens principle, wave front, interference, Young double slit experiment, fringe width, diffraction due to a single slit.',
                youtubeVideoId: '-AsGWByk30s',
                channelName: 'Competition Wallah',
                durationMinutes: 428,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 428,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 26: Wave Optics.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-wave-optics-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 171, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-wave-optics-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 256, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-wave-optics',
                    type: 'primary',
                    title: 'Chapter 26: Wave Optics in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '-AsGWByk30s',
                    durationMinutes: 428,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 26: Wave Optics Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-phy-8',
        subjectId: 'physics',
        classLevel: 'Class 12',
        name: 'Modern Physics & Semiconductors',
        description: 'Photoelectric effect, Hertz and Lenard observations, Einstein photoelectric equation, de Broglie relation.',
        chapters: [
          {
            id: 'chap-phy-dual-nature',
            unitId: 'unit-phy-8',
            unitName: 'Modern Physics & Semiconductors',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 27: Dual Nature of Radiation & Matter',
            description: 'Photoelectric effect, Hertz and Lenard observations, Einstein photoelectric equation, de Broglie relation.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-dual-nature',
                chapterId: 'chap-phy-dual-nature',
                chapterName: 'Chapter 27: Dual Nature of Radiation & Matter',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Modern Physics & Semiconductors',
                classLevel: 'Class 12',
                title: 'Chapter 27: Dual Nature of Radiation & Matter Complete One Shot',
                description: 'Photoelectric effect, Hertz and Lenard observations, Einstein photoelectric equation, de Broglie relation.',
                youtubeVideoId: '2lm0hZSjX0Y',
                channelName: 'Competition Wallah',
                durationMinutes: 310,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 310,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 27: Dual Nature of Radiation & Matter.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-dual-nature-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 124, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-dual-nature-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 186, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-dual-nature',
                    type: 'primary',
                    title: 'Chapter 27: Dual Nature of Radiation & Matter in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '2lm0hZSjX0Y',
                    durationMinutes: 310,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 27: Dual Nature of Radiation & Matter Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-atoms',
            unitId: 'unit-phy-8',
            unitName: 'Modern Physics & Semiconductors',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 28: Atoms',
            description: 'Alpha-particle scattering experiment, Rutherford model of atom, Bohr model, energy levels, hydrogen spectrum.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-atoms',
                chapterId: 'chap-phy-atoms',
                chapterName: 'Chapter 28: Atoms',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Modern Physics & Semiconductors',
                classLevel: 'Class 12',
                title: 'Chapter 28: Atoms Complete One Shot',
                description: 'Alpha-particle scattering experiment, Rutherford model of atom, Bohr model, energy levels, hydrogen spectrum.',
                youtubeVideoId: 'tdNz09V6Jhg',
                channelName: 'Competition Wallah',
                durationMinutes: 240,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 240,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 28: Atoms.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-atoms-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 96, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-atoms-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 144, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-atoms',
                    type: 'primary',
                    title: 'Chapter 28: Atoms in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'tdNz09V6Jhg',
                    durationMinutes: 240,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 28: Atoms Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-nuclei',
            unitId: 'unit-phy-8',
            unitName: 'Modern Physics & Semiconductors',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 29: Nuclei',
            description: 'Composition and size of nucleus, atomic masses, isotopes, isobars, isotones, mass defect, binding energy per nucleon, nuclear fission and fusion.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-nuclei',
                chapterId: 'chap-phy-nuclei',
                chapterName: 'Chapter 29: Nuclei',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Modern Physics & Semiconductors',
                classLevel: 'Class 12',
                title: 'Chapter 29: Nuclei Complete One Shot',
                description: 'Composition and size of nucleus, atomic masses, isotopes, isobars, isotones, mass defect, binding energy per nucleon, nuclear fission and fusion.',
                youtubeVideoId: 'tdNz09V6Jhg',
                channelName: 'Competition Wallah',
                durationMinutes: 213,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 213,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 29: Nuclei.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-nuclei-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 85, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-nuclei-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 127, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-nuclei',
                    type: 'primary',
                    title: 'Chapter 29: Nuclei in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'tdNz09V6Jhg',
                    durationMinutes: 213,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 29: Nuclei Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-phy-semiconductors',
            unitId: 'unit-phy-8',
            unitName: 'Modern Physics & Semiconductors',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Chapter 30: Semiconductor Electronics & Logic Gates',
            description: 'Energy bands in solids, intrinsic and extrinsic semiconductors, p-n junction, semiconductor diode, I-V characteristics, diode as a rectifier, logic gates.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-phy-semiconductors',
                chapterId: 'chap-phy-semiconductors',
                chapterName: 'Chapter 30: Semiconductor Electronics & Logic Gates',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Modern Physics & Semiconductors',
                classLevel: 'Class 12',
                title: 'Chapter 30: Semiconductor Electronics & Logic Gates Complete One Shot',
                description: 'Energy bands in solids, intrinsic and extrinsic semiconductors, p-n junction, semiconductor diode, I-V characteristics, diode as a rectifier, logic gates.',
                youtubeVideoId: 'npjhUuLXTV8',
                channelName: 'Competition Wallah',
                durationMinutes: 359,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 359,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 30: Semiconductor Electronics & Logic Gates.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-phy-semiconductors-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 143, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-phy-semiconductors-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 215, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-phy-semiconductors',
                    type: 'primary',
                    title: 'Chapter 30: Semiconductor Electronics & Logic Gates in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'npjhUuLXTV8',
                    durationMinutes: 359,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 30: Semiconductor Electronics & Logic Gates Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      }
    ]
  },

  // SUBJECT 2: CHEMISTRY
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM',
    icon: 'FlaskConical',
    color: '#3B82F6',
    badge: '25 Chapters - Organic, Inorganic & Physical',
    totalUnits: 6,
    totalChapters: 25,
    totalTopics: 25,
    neetWeightagePercent: 25,
    units: [
      {
        id: 'unit-chem-1',
        subjectId: 'chemistry',
        classLevel: 'Class 11',
        name: 'Physical Chemistry',
        description: 'Atomic and molecular masses, mole concept and molar mass, percentage composition, empirical and molecular formula, stoichiometry.',
        chapters: [
          {
            id: 'chap-chem-mole',
            unitId: 'unit-chem-1',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 1: Some Basic Concepts of Chemistry (Mole Concept)',
            description: 'Atomic and molecular masses, mole concept and molar mass, percentage composition, empirical and molecular formula, stoichiometry.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-mole',
                chapterId: 'chap-chem-mole',
                chapterName: 'Chapter 1: Some Basic Concepts of Chemistry (Mole Concept)',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 1: Some Basic Concepts of Chemistry (Mole Concept) Complete One Shot',
                description: 'Atomic and molecular masses, mole concept and molar mass, percentage composition, empirical and molecular formula, stoichiometry.',
                youtubeVideoId: 'CFZPI-cTV1s',
                channelName: 'Competition Wallah',
                durationMinutes: 411,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 411,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 1: Some Basic Concepts of Chemistry (Mole Concept).',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-mole-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 164, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-mole-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 246, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-mole',
                    type: 'primary',
                    title: 'Chapter 1: Some Basic Concepts of Chemistry (Mole Concept) in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'CFZPI-cTV1s',
                    durationMinutes: 411,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 1: Some Basic Concepts of Chemistry (Mole Concept) Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-atom',
            unitId: 'unit-chem-1',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 2: Structure of Atom',
            description: 'Bohr model and its limitations, dual nature of matter and light, de Broglie relationship, Heisenberg uncertainty principle, quantum numbers, Aufbau principle.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-atom',
                chapterId: 'chap-chem-atom',
                chapterName: 'Chapter 2: Structure of Atom',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 2: Structure of Atom Complete One Shot',
                description: 'Bohr model and its limitations, dual nature of matter and light, de Broglie relationship, Heisenberg uncertainty principle, quantum numbers, Aufbau principle.',
                youtubeVideoId: 'Gko11YmTZL0',
                channelName: 'Competition Wallah',
                durationMinutes: 435,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 435,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 2: Structure of Atom.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-atom-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 174, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-atom-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 261, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-atom',
                    type: 'primary',
                    title: 'Chapter 2: Structure of Atom in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Gko11YmTZL0',
                    durationMinutes: 435,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 2: Structure of Atom Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-thermo',
            unitId: 'unit-chem-1',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 3: Chemical Thermodynamics & Thermochemistry',
            description: 'First law of thermodynamics, internal energy and enthalpy, heat capacity and specific heat, Hess law of constant heat summation, enthalpy of bond dissociation, entropy, Gibbs energy change.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-thermo',
                chapterId: 'chap-chem-thermo',
                chapterName: 'Chapter 3: Chemical Thermodynamics & Thermochemistry',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 3: Chemical Thermodynamics & Thermochemistry Complete One Shot',
                description: 'First law of thermodynamics, internal energy and enthalpy, heat capacity and specific heat, Hess law of constant heat summation, enthalpy of bond dissociation, entropy, Gibbs energy change.',
                youtubeVideoId: 'Kr4ijuj6llM',
                channelName: 'Competition Wallah',
                durationMinutes: 440,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 440,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 3: Chemical Thermodynamics & Thermochemistry.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-thermo-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 176, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-thermo-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 264, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-thermo',
                    type: 'primary',
                    title: 'Chapter 3: Chemical Thermodynamics & Thermochemistry in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Kr4ijuj6llM',
                    durationMinutes: 440,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 3: Chemical Thermodynamics & Thermochemistry Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-chem-equil',
            unitId: 'unit-chem-1',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 4: Chemical Equilibrium',
            description: 'Equilibrium in physical and chemical processes, dynamic nature of equilibrium, law of mass action, equilibrium constant Kp and Kc, Le Chatelier principle.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-chem-equil',
                chapterId: 'chap-chem-chem-equil',
                chapterName: 'Chapter 4: Chemical Equilibrium',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 4: Chemical Equilibrium Complete One Shot',
                description: 'Equilibrium in physical and chemical processes, dynamic nature of equilibrium, law of mass action, equilibrium constant Kp and Kc, Le Chatelier principle.',
                youtubeVideoId: 'YpclpYZU9Ks',
                channelName: 'Competition Wallah',
                durationMinutes: 322,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 322,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 4: Chemical Equilibrium.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-chem-equil-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 128, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-chem-equil-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 193, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-chem-equil',
                    type: 'primary',
                    title: 'Chapter 4: Chemical Equilibrium in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'YpclpYZU9Ks',
                    durationMinutes: 322,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 4: Chemical Equilibrium Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-ionic-equil',
            unitId: 'unit-chem-1',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 5: Ionic Equilibrium',
            description: 'Ionization of acids and bases, strong and weak electrolytes, degree of ionization, ionization of polybasic acids, acid strength, concept of pH, hydrolysis of salts, buffer solutions, solubility product.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-ionic-equil',
                chapterId: 'chap-chem-ionic-equil',
                chapterName: 'Chapter 5: Ionic Equilibrium',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 5: Ionic Equilibrium Complete One Shot',
                description: 'Ionization of acids and bases, strong and weak electrolytes, degree of ionization, ionization of polybasic acids, acid strength, concept of pH, hydrolysis of salts, buffer solutions, solubility product.',
                youtubeVideoId: 'glL_vCk6Ys8',
                channelName: 'Competition Wallah',
                durationMinutes: 344,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 344,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 5: Ionic Equilibrium.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-ionic-equil-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 137, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-ionic-equil-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 206, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-ionic-equil',
                    type: 'primary',
                    title: 'Chapter 5: Ionic Equilibrium in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'glL_vCk6Ys8',
                    durationMinutes: 344,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 5: Ionic Equilibrium Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-redox',
            unitId: 'unit-chem-1',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 6: Redox Reactions',
            description: 'Concept of oxidation and reduction, redox reactions, oxidation number, balancing redox reactions in terms of loss and gain of electron and change in oxidation numbers.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-redox',
                chapterId: 'chap-chem-redox',
                chapterName: 'Chapter 6: Redox Reactions',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 6: Redox Reactions Complete One Shot',
                description: 'Concept of oxidation and reduction, redox reactions, oxidation number, balancing redox reactions in terms of loss and gain of electron and change in oxidation numbers.',
                youtubeVideoId: 'mmpAtd6z2u4',
                channelName: 'Competition Wallah',
                durationMinutes: 126,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 126,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 6: Redox Reactions.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-redox-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 50, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-redox-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 75, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-redox',
                    type: 'primary',
                    title: 'Chapter 6: Redox Reactions in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'mmpAtd6z2u4',
                    durationMinutes: 126,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 6: Redox Reactions Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-chem-2',
        subjectId: 'chemistry',
        classLevel: 'Class 12',
        name: 'Physical Chemistry',
        description: 'Types of solutions, expression of concentration of solutions of solids in liquids, solubility of gases in liquids, Raoult law, colligative properties, abnormal molecular mass, van t Hoff factor.',
        chapters: [
          {
            id: 'chap-chem-solutions',
            unitId: 'unit-chem-2',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 7: Solutions & Colligative Properties',
            description: 'Types of solutions, expression of concentration of solutions of solids in liquids, solubility of gases in liquids, Raoult law, colligative properties, abnormal molecular mass, van t Hoff factor.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-solutions',
                chapterId: 'chap-chem-solutions',
                chapterName: 'Chapter 7: Solutions & Colligative Properties',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 7: Solutions & Colligative Properties Complete One Shot',
                description: 'Types of solutions, expression of concentration of solutions of solids in liquids, solubility of gases in liquids, Raoult law, colligative properties, abnormal molecular mass, van t Hoff factor.',
                youtubeVideoId: 'LNBQgqi2p4c',
                channelName: 'Competition Wallah',
                durationMinutes: 415,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 415,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 7: Solutions & Colligative Properties.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-solutions-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 166, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-solutions-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 249, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-solutions',
                    type: 'primary',
                    title: 'Chapter 7: Solutions & Colligative Properties in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'LNBQgqi2p4c',
                    durationMinutes: 415,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 7: Solutions & Colligative Properties Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-electro',
            unitId: 'unit-chem-2',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 8: Electrochemistry',
            description: 'Redox reactions, conductance in electrolytic solutions, specific and molar conductivity, Kohlrausch law, electrolysis, galvanic cells, Nernst equation.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-electro',
                chapterId: 'chap-chem-electro',
                chapterName: 'Chapter 8: Electrochemistry',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 8: Electrochemistry Complete One Shot',
                description: 'Redox reactions, conductance in electrolytic solutions, specific and molar conductivity, Kohlrausch law, electrolysis, galvanic cells, Nernst equation.',
                youtubeVideoId: '46oqVj3m7ds',
                channelName: 'Competition Wallah',
                durationMinutes: 348,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 348,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 8: Electrochemistry.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-electro-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 139, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-electro-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 208, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-electro',
                    type: 'primary',
                    title: 'Chapter 8: Electrochemistry in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '46oqVj3m7ds',
                    durationMinutes: 348,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 8: Electrochemistry Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-kinetics',
            unitId: 'unit-chem-2',
            unitName: 'Physical Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 9: Chemical Kinetics',
            description: 'Rate of a reaction, factors affecting rates of reaction, order and molecularity of a reaction, rate law and specific rate constant, integrated rate equations and half life, Arrhenius equation.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-kinetics',
                chapterId: 'chap-chem-kinetics',
                chapterName: 'Chapter 9: Chemical Kinetics',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 9: Chemical Kinetics Complete One Shot',
                description: 'Rate of a reaction, factors affecting rates of reaction, order and molecularity of a reaction, rate law and specific rate constant, integrated rate equations and half life, Arrhenius equation.',
                youtubeVideoId: '0D_qAAhCrFg',
                channelName: 'Competition Wallah',
                durationMinutes: 289,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 289,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 9: Chemical Kinetics.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-kinetics-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 115, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-kinetics-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 173, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-kinetics',
                    type: 'primary',
                    title: 'Chapter 9: Chemical Kinetics in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '0D_qAAhCrFg',
                    durationMinutes: 289,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 9: Chemical Kinetics Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-chem-3',
        subjectId: 'chemistry',
        classLevel: 'Class 11',
        name: 'Inorganic Chemistry',
        description: 'Modern periodic law and present form of periodic table, periodic trends in properties of elements atomic radii, ionic radii, ionization enthalpy, electron gain enthalpy, electronegativity, valence.',
        chapters: [
          {
            id: 'chap-chem-periodic',
            unitId: 'unit-chem-3',
            unitName: 'Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 10: Classification of Elements & Periodicity',
            description: 'Modern periodic law and present form of periodic table, periodic trends in properties of elements atomic radii, ionic radii, ionization enthalpy, electron gain enthalpy, electronegativity, valence.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-periodic',
                chapterId: 'chap-chem-periodic',
                chapterName: 'Chapter 10: Classification of Elements & Periodicity',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Inorganic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 10: Classification of Elements & Periodicity Complete One Shot',
                description: 'Modern periodic law and present form of periodic table, periodic trends in properties of elements atomic radii, ionic radii, ionization enthalpy, electron gain enthalpy, electronegativity, valence.',
                youtubeVideoId: '888QmOUMrDE',
                channelName: 'Competition Wallah',
                durationMinutes: 391,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 391,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 10: Classification of Elements & Periodicity.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-periodic-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 156, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-periodic-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 234, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-periodic',
                    type: 'primary',
                    title: 'Chapter 10: Classification of Elements & Periodicity in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Mohit Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '888QmOUMrDE',
                    durationMinutes: 391,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 10: Classification of Elements & Periodicity Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-bonding',
            unitId: 'unit-chem-3',
            unitName: 'Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 11: Chemical Bonding & Molecular Structure',
            description: 'Valence electrons, ionic bond, covalent bond, bond parameters, Lewis structure, polar character of covalent bond, valence bond theory, resonance, geometry of covalent molecules, VSEPR theory, hybridization, Molecular Orbital Theory.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-bonding',
                chapterId: 'chap-chem-bonding',
                chapterName: 'Chapter 11: Chemical Bonding & Molecular Structure',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Inorganic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 11: Chemical Bonding & Molecular Structure Complete One Shot',
                description: 'Valence electrons, ionic bond, covalent bond, bond parameters, Lewis structure, polar character of covalent bond, valence bond theory, resonance, geometry of covalent molecules, VSEPR theory, hybridization, Molecular Orbital Theory.',
                youtubeVideoId: '7dY8KOfPro0',
                channelName: 'Competition Wallah',
                durationMinutes: 638,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 638,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 11: Chemical Bonding & Molecular Structure.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-bonding-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 255, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-bonding-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 382, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-bonding',
                    type: 'primary',
                    title: 'Chapter 11: Chemical Bonding & Molecular Structure in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Mohit Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '7dY8KOfPro0',
                    durationMinutes: 638,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 11: Chemical Bonding & Molecular Structure Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-pblock',
            unitId: 'unit-chem-3',
            unitName: 'Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 12: p-Block Elements (Group 13 to 18)',
            description: 'General Introduction to p-Block Elements: Group 13 to Group 18 elements electronic configuration, occurrence, variation of properties, oxidation states, trends in chemical reactivity.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-pblock',
                chapterId: 'chap-chem-pblock',
                chapterName: 'Chapter 12: p-Block Elements (Group 13 to 18)',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Inorganic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 12: p-Block Elements (Group 13 to 18) Complete One Shot',
                description: 'General Introduction to p-Block Elements: Group 13 to Group 18 elements electronic configuration, occurrence, variation of properties, oxidation states, trends in chemical reactivity.',
                youtubeVideoId: 'nG-SUyZAiGc',
                channelName: 'Competition Wallah',
                durationMinutes: 316,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 316,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 12: p-Block Elements (Group 13 to 18).',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-pblock-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 126, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-pblock-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 189, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-pblock',
                    type: 'primary',
                    title: 'Chapter 12: p-Block Elements (Group 13 to 18) in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Mohit Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'nG-SUyZAiGc',
                    durationMinutes: 316,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 12: p-Block Elements (Group 13 to 18) Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-chem-4',
        subjectId: 'chemistry',
        classLevel: 'Class 12',
        name: 'Inorganic Chemistry',
        description: 'General introduction, electronic configuration, occurrence and characteristics of transition metals, general trends in properties, Lanthanoids and Actinoids.',
        chapters: [
          {
            id: 'chap-chem-dfblock',
            unitId: 'unit-chem-4',
            unitName: 'Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 13: d- and f-Block Elements',
            description: 'General introduction, electronic configuration, occurrence and characteristics of transition metals, general trends in properties, Lanthanoids and Actinoids.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-dfblock',
                chapterId: 'chap-chem-dfblock',
                chapterName: 'Chapter 13: d- and f-Block Elements',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Inorganic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 13: d- and f-Block Elements Complete One Shot',
                description: 'General introduction, electronic configuration, occurrence and characteristics of transition metals, general trends in properties, Lanthanoids and Actinoids.',
                youtubeVideoId: 'wuDVHWTVnjg',
                channelName: 'Competition Wallah',
                durationMinutes: 182,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 182,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 13: d- and f-Block Elements.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-dfblock-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 72, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-dfblock-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 109, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-dfblock',
                    type: 'primary',
                    title: 'Chapter 13: d- and f-Block Elements in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Mohit Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'wuDVHWTVnjg',
                    durationMinutes: 182,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 13: d- and f-Block Elements Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-coordination',
            unitId: 'unit-chem-4',
            unitName: 'Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 14: Coordination Compounds',
            description: 'Coordination compounds introduction, ligands, coordination number, color, magnetic properties and shapes, IUPAC nomenclature of mononuclear coordination compounds, Werner theory, VBT, CFT.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-coordination',
                chapterId: 'chap-chem-coordination',
                chapterName: 'Chapter 14: Coordination Compounds',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Inorganic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 14: Coordination Compounds Complete One Shot',
                description: 'Coordination compounds introduction, ligands, coordination number, color, magnetic properties and shapes, IUPAC nomenclature of mononuclear coordination compounds, Werner theory, VBT, CFT.',
                youtubeVideoId: 'lDSm5XgsuPY',
                channelName: 'Competition Wallah',
                durationMinutes: 514,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 514,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 14: Coordination Compounds.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-coordination-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 205, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-coordination-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 308, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-coordination',
                    type: 'primary',
                    title: 'Chapter 14: Coordination Compounds in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Mohit Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'lDSm5XgsuPY',
                    durationMinutes: 514,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 14: Coordination Compounds Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-salt',
            unitId: 'unit-chem-4',
            unitName: 'Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 15: Salt Analysis & Practical Inorganic Chemistry',
            description: 'Qualitative analysis of cation and anion radicals, flame tests, spot tests, group reagent reactions for qualitative chemical analysis.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-salt',
                chapterId: 'chap-chem-salt',
                chapterName: 'Chapter 15: Salt Analysis & Practical Inorganic Chemistry',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Inorganic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 15: Salt Analysis & Practical Inorganic Chemistry Complete One Shot',
                description: 'Qualitative analysis of cation and anion radicals, flame tests, spot tests, group reagent reactions for qualitative chemical analysis.',
                youtubeVideoId: 'fnRjIZs8UAA',
                channelName: 'Competition Wallah',
                durationMinutes: 303,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 303,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 15: Salt Analysis & Practical Inorganic Chemistry.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-salt-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 121, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-salt-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 181, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-salt',
                    type: 'primary',
                    title: 'Chapter 15: Salt Analysis & Practical Inorganic Chemistry in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Mohit Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'fnRjIZs8UAA',
                    durationMinutes: 303,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 15: Salt Analysis & Practical Inorganic Chemistry Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-chem-5',
        subjectId: 'chemistry',
        classLevel: 'Class 11',
        name: 'Organic Chemistry',
        description: 'General introduction, inductive effect, electromeric effect, resonance and hyperconjugation, homolytic and heterolytic fission, free radicals, carbocations, carbanions, electrophiles and nucleophiles.',
        chapters: [
          {
            id: 'chap-chem-goc',
            unitId: 'unit-chem-5',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 16: General Organic Chemistry (GOC)',
            description: 'General introduction, inductive effect, electromeric effect, resonance and hyperconjugation, homolytic and heterolytic fission, free radicals, carbocations, carbanions, electrophiles and nucleophiles.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-goc',
                chapterId: 'chap-chem-goc',
                chapterName: 'Chapter 16: General Organic Chemistry (GOC)',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 16: General Organic Chemistry (GOC) Complete One Shot',
                description: 'General introduction, inductive effect, electromeric effect, resonance and hyperconjugation, homolytic and heterolytic fission, free radicals, carbocations, carbanions, electrophiles and nucleophiles.',
                youtubeVideoId: '0uOTZ2IJZhE',
                channelName: 'Competition Wallah',
                durationMinutes: 507,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 507,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 16: General Organic Chemistry (GOC).',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-goc-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 202, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-goc-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 304, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-goc',
                    type: 'primary',
                    title: 'Chapter 16: General Organic Chemistry (GOC) in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '0uOTZ2IJZhE',
                    durationMinutes: 507,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 16: General Organic Chemistry (GOC) Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-iupac',
            unitId: 'unit-chem-5',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 17: IUPAC Nomenclature',
            description: 'IUPAC rules for organic compounds containing mono- and poly-functional groups, alicyclic and aromatic organic compounds.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-iupac',
                chapterId: 'chap-chem-iupac',
                chapterName: 'Chapter 17: IUPAC Nomenclature',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 17: IUPAC Nomenclature Complete One Shot',
                description: 'IUPAC rules for organic compounds containing mono- and poly-functional groups, alicyclic and aromatic organic compounds.',
                youtubeVideoId: 'TV9mKUgaFY4',
                channelName: 'Competition Wallah',
                durationMinutes: 375,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 375,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 17: IUPAC Nomenclature.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-iupac-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 150, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-iupac-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 225, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-iupac',
                    type: 'primary',
                    title: 'Chapter 17: IUPAC Nomenclature in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'TV9mKUgaFY4',
                    durationMinutes: 375,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 17: IUPAC Nomenclature Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-isomerism',
            unitId: 'unit-chem-5',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 18: Isomerism & Stereochemistry',
            description: 'Structural isomerism chain, position, functional, metamerism, tautomerism. Stereoisomerism geometrical and optical isomerism, chirality, enantiomers, diastereomers.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-isomerism',
                chapterId: 'chap-chem-isomerism',
                chapterName: 'Chapter 18: Isomerism & Stereochemistry',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 18: Isomerism & Stereochemistry Complete One Shot',
                description: 'Structural isomerism chain, position, functional, metamerism, tautomerism. Stereoisomerism geometrical and optical isomerism, chirality, enantiomers, diastereomers.',
                youtubeVideoId: 'Xh8PGxmqvG8',
                channelName: 'Competition Wallah',
                durationMinutes: 541,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 541,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 18: Isomerism & Stereochemistry.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-isomerism-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 216, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-isomerism-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 324, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-isomerism',
                    type: 'primary',
                    title: 'Chapter 18: Isomerism & Stereochemistry in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Xh8PGxmqvG8',
                    durationMinutes: 541,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 18: Isomerism & Stereochemistry Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-hydrocarbons',
            unitId: 'unit-chem-5',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 19: Hydrocarbons',
            description: 'Classification of Hydrocarbons: Alkanes, Alkenes, Alkynes, Aromatic Hydrocarbons. Physical properties, chemical reactions, Markovnikov addition, ozonolysis.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-hydrocarbons',
                chapterId: 'chap-chem-hydrocarbons',
                chapterName: 'Chapter 19: Hydrocarbons',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 19: Hydrocarbons Complete One Shot',
                description: 'Classification of Hydrocarbons: Alkanes, Alkenes, Alkynes, Aromatic Hydrocarbons. Physical properties, chemical reactions, Markovnikov addition, ozonolysis.',
                youtubeVideoId: 'DzFjYagY7RA',
                channelName: 'Competition Wallah',
                durationMinutes: 600,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 600,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 19: Hydrocarbons.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-hydrocarbons-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 240, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-hydrocarbons-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 360, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-hydrocarbons',
                    type: 'primary',
                    title: 'Chapter 19: Hydrocarbons in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'DzFjYagY7RA',
                    durationMinutes: 600,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 19: Hydrocarbons Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-purification',
            unitId: 'unit-chem-5',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Chapter 20: Purification & Practical Organic Chemistry',
            description: 'Methods of purification crystallization, fractional distillation, chromatography. Qualitative and quantitative organic analysis (Dumas, Kjeldahl, Carius method).',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-purification',
                chapterId: 'chap-chem-purification',
                chapterName: 'Chapter 20: Purification & Practical Organic Chemistry',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 11',
                title: 'Chapter 20: Purification & Practical Organic Chemistry Complete One Shot',
                description: 'Methods of purification crystallization, fractional distillation, chromatography. Qualitative and quantitative organic analysis (Dumas, Kjeldahl, Carius method).',
                youtubeVideoId: 'pytIsG8v1O0',
                channelName: 'Competition Wallah',
                durationMinutes: 266,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 266,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 20: Purification & Practical Organic Chemistry.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-purification-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 106, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-purification-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 159, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-purification',
                    type: 'primary',
                    title: 'Chapter 20: Purification & Practical Organic Chemistry in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'pytIsG8v1O0',
                    durationMinutes: 266,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 20: Purification & Practical Organic Chemistry Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-chem-6',
        subjectId: 'chemistry',
        classLevel: 'Class 12',
        name: 'Organic Chemistry',
        description: 'Nomenclature, nature of C-X bond, physical and chemical properties, mechanism of substitution reactions SN1 and SN2, environmental effects of chloroform, freons.',
        chapters: [
          {
            id: 'chap-chem-haloalkanes',
            unitId: 'unit-chem-6',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 21: Haloalkanes and Haloarenes',
            description: 'Nomenclature, nature of C-X bond, physical and chemical properties, mechanism of substitution reactions SN1 and SN2, environmental effects of chloroform, freons.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-haloalkanes',
                chapterId: 'chap-chem-haloalkanes',
                chapterName: 'Chapter 21: Haloalkanes and Haloarenes',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 21: Haloalkanes and Haloarenes Complete One Shot',
                description: 'Nomenclature, nature of C-X bond, physical and chemical properties, mechanism of substitution reactions SN1 and SN2, environmental effects of chloroform, freons.',
                youtubeVideoId: '6kMIxofrWtM',
                channelName: 'Competition Wallah',
                durationMinutes: 507,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 507,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 21: Haloalkanes and Haloarenes.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-haloalkanes-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 202, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-haloalkanes-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 304, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-haloalkanes',
                    type: 'primary',
                    title: 'Chapter 21: Haloalkanes and Haloarenes in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '6kMIxofrWtM',
                    durationMinutes: 507,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 21: Haloalkanes and Haloarenes Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-alcohols',
            unitId: 'unit-chem-6',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 22: Alcohols, Phenols and Ethers',
            description: 'Nomenclature, methods of preparation, physical and chemical properties of primary, secondary and tertiary alcohols, acidity of phenols, electrophilic substitution reactions, ethers.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-alcohols',
                chapterId: 'chap-chem-alcohols',
                chapterName: 'Chapter 22: Alcohols, Phenols and Ethers',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 22: Alcohols, Phenols and Ethers Complete One Shot',
                description: 'Nomenclature, methods of preparation, physical and chemical properties of primary, secondary and tertiary alcohols, acidity of phenols, electrophilic substitution reactions, ethers.',
                youtubeVideoId: '8SiHbc0gP5s',
                channelName: 'Competition Wallah',
                durationMinutes: 420,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 420,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 22: Alcohols, Phenols and Ethers.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-alcohols-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 168, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-alcohols-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 252, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-alcohols',
                    type: 'primary',
                    title: 'Chapter 22: Alcohols, Phenols and Ethers in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '8SiHbc0gP5s',
                    durationMinutes: 420,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 22: Alcohols, Phenols and Ethers Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-carbonyl',
            unitId: 'unit-chem-6',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 23: Aldehydes, Ketones and Carboxylic Acids',
            description: 'Nomenclature, nature of carbonyl group, methods of preparation, physical and chemical properties, mechanism of nucleophilic addition, acidity of carboxylic acids.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-carbonyl',
                chapterId: 'chap-chem-carbonyl',
                chapterName: 'Chapter 23: Aldehydes, Ketones and Carboxylic Acids',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 23: Aldehydes, Ketones and Carboxylic Acids Complete One Shot',
                description: 'Nomenclature, nature of carbonyl group, methods of preparation, physical and chemical properties, mechanism of nucleophilic addition, acidity of carboxylic acids.',
                youtubeVideoId: 'jHtw-XYfonM',
                channelName: 'Competition Wallah',
                durationMinutes: 481,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 481,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 23: Aldehydes, Ketones and Carboxylic Acids.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-carbonyl-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 192, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-carbonyl-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 288, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-carbonyl',
                    type: 'primary',
                    title: 'Chapter 23: Aldehydes, Ketones and Carboxylic Acids in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'jHtw-XYfonM',
                    durationMinutes: 481,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 23: Aldehydes, Ketones and Carboxylic Acids Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-amines',
            unitId: 'unit-chem-6',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 24: Amines & Diazonium Salts',
            description: 'Nomenclature, classification, structure, methods of preparation, physical and chemical properties, uses, identification of primary, secondary and tertiary amines, diazonium salts.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-amines',
                chapterId: 'chap-chem-amines',
                chapterName: 'Chapter 24: Amines & Diazonium Salts',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 24: Amines & Diazonium Salts Complete One Shot',
                description: 'Nomenclature, classification, structure, methods of preparation, physical and chemical properties, uses, identification of primary, secondary and tertiary amines, diazonium salts.',
                youtubeVideoId: 'tX49KAEh-4k',
                channelName: 'Competition Wallah',
                durationMinutes: 267,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 267,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 24: Amines & Diazonium Salts.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-amines-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 106, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-amines-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 160, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-amines',
                    type: 'primary',
                    title: 'Chapter 24: Amines & Diazonium Salts in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'tX49KAEh-4k',
                    durationMinutes: 267,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 24: Amines & Diazonium Salts Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-chem-biomolecules',
            unitId: 'unit-chem-6',
            unitName: 'Organic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chapter 25: Biomolecules Chemistry',
            description: 'Carbohydrates classification, monosaccharides, proteins peptide bond, primary, secondary, tertiary structure, denaturation of proteins, enzymes, hormones, vitamins, nucleic acids DNA and RNA.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-chem-biomolecules',
                chapterId: 'chap-chem-biomolecules',
                chapterName: 'Chapter 25: Biomolecules Chemistry',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry',
                classLevel: 'Class 12',
                title: 'Chapter 25: Biomolecules Chemistry Complete One Shot',
                description: 'Carbohydrates classification, monosaccharides, proteins peptide bond, primary, secondary, tertiary structure, denaturation of proteins, enzymes, hormones, vitamins, nucleic acids DNA and RNA.',
                youtubeVideoId: 'KjJWAHT9_p4',
                channelName: 'Competition Wallah',
                durationMinutes: 339,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 339,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 25: Biomolecules Chemistry.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-chem-biomolecules-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 135, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-chem-biomolecules-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 203, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-chem-biomolecules',
                    type: 'primary',
                    title: 'Chapter 25: Biomolecules Chemistry in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'KjJWAHT9_p4',
                    durationMinutes: 339,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 25: Biomolecules Chemistry Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      }
    ]
  },

  // SUBJECT 3: BIOLOGY
  {
    id: 'biology',
    name: 'Biology (Botany & Zoology)',
    code: 'BIO',
    icon: 'Dna',
    color: '#8B5CF6',
    badge: '32 Chapters - 360 Marks Weightage',
    totalUnits: 6,
    totalChapters: 32,
    totalTopics: 32,
    neetWeightagePercent: 50,
    units: [
      {
        id: 'unit-bio-1',
        subjectId: 'biology',
        classLevel: 'Class 11',
        name: 'Diversity of Living Organisms',
        description: 'What is living? Biodiversity; Need for classification; Taxonomy & Systematics; Concept of species and taxonomical hierarchy; Binomial nomenclature.',
        chapters: [
          {
            id: 'chap-bio-living-world',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 1: The Living World',
            description: 'What is living? Biodiversity; Need for classification; Taxonomy & Systematics; Concept of species and taxonomical hierarchy; Binomial nomenclature.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-living-world',
                chapterId: 'chap-bio-living-world',
                chapterName: 'Chapter 1: The Living World',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 1: The Living World Complete One Shot',
                description: 'What is living? Biodiversity; Need for classification; Taxonomy & Systematics; Concept of species and taxonomical hierarchy; Binomial nomenclature.',
                youtubeVideoId: 'd_vY3PZ8-xM',
                channelName: 'Competition Wallah',
                durationMinutes: 180,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 180,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 1: The Living World.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-living-world-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 72, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-living-world-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 108, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-living-world',
                    type: 'primary',
                    title: 'Chapter 1: The Living World in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'd_vY3PZ8-xM',
                    durationMinutes: 180,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 1: The Living World Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-biological-class',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 2: Biological Classification',
            description: 'Five kingdom classification; Salient features and classification of Monera, Protista and Fungi into major groups; Lichens, Viruses and Viroids.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-biological-class',
                chapterId: 'chap-bio-biological-class',
                chapterName: 'Chapter 2: Biological Classification',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 2: Biological Classification Complete One Shot',
                description: 'Five kingdom classification; Salient features and classification of Monera, Protista and Fungi into major groups; Lichens, Viruses and Viroids.',
                youtubeVideoId: 'R6uQeW2o9yE',
                channelName: 'Competition Wallah',
                durationMinutes: 320,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 320,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 2: Biological Classification.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-biological-class-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 128, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-biological-class-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 192, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-biological-class',
                    type: 'primary',
                    title: 'Chapter 2: Biological Classification in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'R6uQeW2o9yE',
                    durationMinutes: 320,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 2: Biological Classification Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-plant-kingdom',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 3: Plant Kingdom',
            description: 'Salient features and classification of plants into major groups Algae, Bryophytes, Pteridophytes, Gymnosperms and Angiosperms.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-plant-kingdom',
                chapterId: 'chap-bio-plant-kingdom',
                chapterName: 'Chapter 3: Plant Kingdom',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 3: Plant Kingdom Complete One Shot',
                description: 'Salient features and classification of plants into major groups Algae, Bryophytes, Pteridophytes, Gymnosperms and Angiosperms.',
                youtubeVideoId: '1v0189p91S8',
                channelName: 'Competition Wallah',
                durationMinutes: 350,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 350,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 3: Plant Kingdom.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-plant-kingdom-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 140, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-plant-kingdom-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 210, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-plant-kingdom',
                    type: 'primary',
                    title: 'Chapter 3: Plant Kingdom in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '1v0189p91S8',
                    durationMinutes: 350,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 3: Plant Kingdom Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-morphology',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 4: Morphology of Flowering Plants',
            description: 'Morphology and modifications of root, stem, leaf; Inflorescence, flower, fruit and seed; Description of plant families (Fabaceae, Solanaceae, Liliaceae).',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-morphology',
                chapterId: 'chap-bio-morphology',
                chapterName: 'Chapter 4: Morphology of Flowering Plants',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 4: Morphology of Flowering Plants Complete One Shot',
                description: 'Morphology and modifications of root, stem, leaf; Inflorescence, flower, fruit and seed; Description of plant families (Fabaceae, Solanaceae, Liliaceae).',
                youtubeVideoId: '3A_M1lXn5Lg',
                channelName: 'Competition Wallah',
                durationMinutes: 380,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 380,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 4: Morphology of Flowering Plants.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-morphology-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 152, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-morphology-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 228, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-morphology',
                    type: 'primary',
                    title: 'Chapter 4: Morphology of Flowering Plants in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '3A_M1lXn5Lg',
                    durationMinutes: 380,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 4: Morphology of Flowering Plants Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-anatomy',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 5: Anatomy of Flowering Plants',
            description: 'Tissues: Meristematic and permanent tissues; Tissue systems; Internal structure of dicot and monocot root, stem and leaf.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-anatomy',
                chapterId: 'chap-bio-anatomy',
                chapterName: 'Chapter 5: Anatomy of Flowering Plants',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 5: Anatomy of Flowering Plants Complete One Shot',
                description: 'Tissues: Meristematic and permanent tissues; Tissue systems; Internal structure of dicot and monocot root, stem and leaf.',
                youtubeVideoId: '7NqU66H9o3c',
                channelName: 'Competition Wallah',
                durationMinutes: 340,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 340,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 5: Anatomy of Flowering Plants.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-anatomy-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 136, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-anatomy-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 204, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-anatomy',
                    type: 'primary',
                    title: 'Chapter 5: Anatomy of Flowering Plants in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '7NqU66H9o3c',
                    durationMinutes: 340,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 5: Anatomy of Flowering Plants Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-cell',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 6: Cell: The Unit of Life',
            description: 'Cell theory and cell as the basic unit of life; Structure of prokaryotic and eukaryotic cell; Plant cell and animal cell; Cell organelles structure and function.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-cell',
                chapterId: 'chap-bio-cell',
                chapterName: 'Chapter 6: Cell: The Unit of Life',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 6: Cell: The Unit of Life Complete One Shot',
                description: 'Cell theory and cell as the basic unit of life; Structure of prokaryotic and eukaryotic cell; Plant cell and animal cell; Cell organelles structure and function.',
                youtubeVideoId: 'Ga55Wc0_dG4',
                channelName: 'Competition Wallah',
                durationMinutes: 390,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 390,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 6: Cell: The Unit of Life.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-cell-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 156, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-cell-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 234, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-cell',
                    type: 'primary',
                    title: 'Chapter 6: Cell: The Unit of Life in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Ga55Wc0_dG4',
                    durationMinutes: 390,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 6: Cell: The Unit of Life Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-cell-cycle',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 7: Cell Cycle and Cell Division',
            description: 'Cell cycle, mitosis, meiosis and their significance.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-cell-cycle',
                chapterId: 'chap-bio-cell-cycle',
                chapterName: 'Chapter 7: Cell Cycle and Cell Division',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 7: Cell Cycle and Cell Division Complete One Shot',
                description: 'Cell cycle, mitosis, meiosis and their significance.',
                youtubeVideoId: 'Ga55Wc0_dG4',
                channelName: 'Competition Wallah',
                durationMinutes: 210,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 210,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 7: Cell Cycle and Cell Division.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-cell-cycle-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 84, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-cell-cycle-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 126, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-cell-cycle',
                    type: 'primary',
                    title: 'Chapter 7: Cell Cycle and Cell Division in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Ga55Wc0_dG4',
                    durationMinutes: 210,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 7: Cell Cycle and Cell Division Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-animal-kingdom',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 18: Animal Kingdom',
            description: 'Salient features and classification of animals non-chordates up to phyla level and chordates up to class level.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-animal-kingdom',
                chapterId: 'chap-bio-animal-kingdom',
                chapterName: 'Chapter 18: Animal Kingdom',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 18: Animal Kingdom Complete One Shot',
                description: 'Salient features and classification of animals non-chordates up to phyla level and chordates up to class level.',
                youtubeVideoId: 'HEJvUY3l8eY',
                channelName: 'Competition Wallah',
                durationMinutes: 235,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 235,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 18: Animal Kingdom.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-animal-kingdom-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 94, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-animal-kingdom-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 141, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-animal-kingdom',
                    type: 'primary',
                    title: 'Chapter 18: Animal Kingdom in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'HEJvUY3l8eY',
                    durationMinutes: 235,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 18: Animal Kingdom Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-structural-org',
            unitId: 'unit-bio-1',
            unitName: 'Diversity of Living Organisms',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 19: Structural Organisation in Animals',
            description: 'Animal tissues; Morphology, anatomy and functions of different systems (digestive, circulatory, respiratory, nervous and reproductive) of an insect (cockroach) and frog.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-structural-org',
                chapterId: 'chap-bio-structural-org',
                chapterName: 'Chapter 19: Structural Organisation in Animals',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Diversity of Living Organisms',
                classLevel: 'Class 11',
                title: 'Chapter 19: Structural Organisation in Animals Complete One Shot',
                description: 'Animal tissues; Morphology, anatomy and functions of different systems (digestive, circulatory, respiratory, nervous and reproductive) of an insect (cockroach) and frog.',
                youtubeVideoId: 'hlQh29qCZ9U',
                channelName: 'Competition Wallah',
                durationMinutes: 500,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 500,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 19: Structural Organisation in Animals.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-structural-org-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 200, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-structural-org-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 300, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-structural-org',
                    type: 'primary',
                    title: 'Chapter 19: Structural Organisation in Animals in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'hlQh29qCZ9U',
                    durationMinutes: 500,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 19: Structural Organisation in Animals Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-biomolecules-zoology',
            unitId: 'unit-bio-1',
            unitName: 'Human Physiology & Biomolecules',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 20: Biomolecules Zoology',
            description: 'Chemical constituents of living cells: Biomolecules structure and function of proteins, carbohydrates, lipids, nucleic acids; Enzymes types, properties, enzyme action.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-biomolecules-zoology',
                chapterId: 'chap-bio-biomolecules-zoology',
                chapterName: 'Chapter 20: Biomolecules Zoology',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Human Physiology & Biomolecules',
                classLevel: 'Class 11',
                title: 'Chapter 20: Biomolecules Zoology Complete One Shot',
                description: 'Chemical constituents of living cells: Biomolecules structure and function of proteins, carbohydrates, lipids, nucleic acids; Enzymes types, properties, enzyme action.',
                youtubeVideoId: 'gaG3kXEj1d4',
                channelName: 'Competition Wallah',
                durationMinutes: 275,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 275,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 20: Biomolecules Zoology.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-biomolecules-zoology-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 110, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-biomolecules-zoology-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 165, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-biomolecules-zoology',
                    type: 'primary',
                    title: 'Chapter 20: Biomolecules Zoology in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'gaG3kXEj1d4',
                    durationMinutes: 275,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 20: Biomolecules Zoology Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-bio-2',
        subjectId: 'biology',
        classLevel: 'Class 11',
        name: 'Plant Physiology',
        description: 'Photosynthesis as a means of autotrophic nutrition; Site of photosynthesis pigments; Photochemical and biosynthetic phases; C3 and C4 pathways; Photorespiration.',
        chapters: [
          {
            id: 'chap-bio-photosynthesis',
            unitId: 'unit-bio-2',
            unitName: 'Plant Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 8: Photosynthesis in Higher Plants',
            description: 'Photosynthesis as a means of autotrophic nutrition; Site of photosynthesis pigments; Photochemical and biosynthetic phases; C3 and C4 pathways; Photorespiration.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-photosynthesis',
                chapterId: 'chap-bio-photosynthesis',
                chapterName: 'Chapter 8: Photosynthesis in Higher Plants',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Plant Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 8: Photosynthesis in Higher Plants Complete One Shot',
                description: 'Photosynthesis as a means of autotrophic nutrition; Site of photosynthesis pigments; Photochemical and biosynthetic phases; C3 and C4 pathways; Photorespiration.',
                youtubeVideoId: 'P4U2t0K-5s0',
                channelName: 'Competition Wallah',
                durationMinutes: 310,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 310,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 8: Photosynthesis in Higher Plants.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-photosynthesis-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 124, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-photosynthesis-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 186, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-photosynthesis',
                    type: 'primary',
                    title: 'Chapter 8: Photosynthesis in Higher Plants in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'P4U2t0K-5s0',
                    durationMinutes: 310,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 8: Photosynthesis in Higher Plants Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-respiration',
            unitId: 'unit-bio-2',
            unitName: 'Plant Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 9: Respiration in Plants',
            description: 'Exchange of gases; Cellular respiration glycolysis, fermentation (anaerobic), TCA cycle and electron transport system (aerobic); Energy relations.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-respiration',
                chapterId: 'chap-bio-respiration',
                chapterName: 'Chapter 9: Respiration in Plants',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Plant Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 9: Respiration in Plants Complete One Shot',
                description: 'Exchange of gases; Cellular respiration glycolysis, fermentation (anaerobic), TCA cycle and electron transport system (aerobic); Energy relations.',
                youtubeVideoId: 'P4U2t0K-5s0',
                channelName: 'Competition Wallah',
                durationMinutes: 280,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 280,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 9: Respiration in Plants.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-respiration-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 112, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-respiration-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 168, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-respiration',
                    type: 'primary',
                    title: 'Chapter 9: Respiration in Plants in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'P4U2t0K-5s0',
                    durationMinutes: 280,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 9: Respiration in Plants Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-plant-growth',
            unitId: 'unit-bio-2',
            unitName: 'Plant Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 10: Plant Growth and Development',
            description: 'Seed germination; Phases of plant growth and plant growth rate; Conditions of growth; Differentiation, dedifferentiation and redifferentiation; Plant growth regulators auxin, gibberellin, cytokinin, ethylene, ABA.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-plant-growth',
                chapterId: 'chap-bio-plant-growth',
                chapterName: 'Chapter 10: Plant Growth and Development',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Plant Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 10: Plant Growth and Development Complete One Shot',
                description: 'Seed germination; Phases of plant growth and plant growth rate; Conditions of growth; Differentiation, dedifferentiation and redifferentiation; Plant growth regulators auxin, gibberellin, cytokinin, ethylene, ABA.',
                youtubeVideoId: 'P4U2t0K-5s0',
                channelName: 'Competition Wallah',
                durationMinutes: 220,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 220,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 10: Plant Growth and Development.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-plant-growth-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 88, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-plant-growth-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 132, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-plant-growth',
                    type: 'primary',
                    title: 'Chapter 10: Plant Growth and Development in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'P4U2t0K-5s0',
                    durationMinutes: 220,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 10: Plant Growth and Development Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-breathing',
            unitId: 'unit-bio-2',
            unitName: 'Human Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 21: Breathing and Exchange of Gases',
            description: 'Respiratory organs in animals; Respiratory system in humans; Mechanism of breathing and its regulation in humans exchange of gases, transport of gases.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-breathing',
                chapterId: 'chap-bio-breathing',
                chapterName: 'Chapter 21: Breathing and Exchange of Gases',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Human Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 21: Breathing and Exchange of Gases Complete One Shot',
                description: 'Respiratory organs in animals; Respiratory system in humans; Mechanism of breathing and its regulation in humans exchange of gases, transport of gases.',
                youtubeVideoId: 'z18WRZm7FtA',
                channelName: 'Competition Wallah',
                durationMinutes: 300,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 300,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 21: Breathing and Exchange of Gases.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-breathing-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 120, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-breathing-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 180, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-breathing',
                    type: 'primary',
                    title: 'Chapter 21: Breathing and Exchange of Gases in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'z18WRZm7FtA',
                    durationMinutes: 300,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 21: Breathing and Exchange of Gases Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-circulation',
            unitId: 'unit-bio-2',
            unitName: 'Human Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 22: Body Fluids and Circulation',
            description: 'Composition of blood, blood groups, coagulation of blood; composition of lymph and its function; human circulatory system structure of human heart and blood vessels.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-circulation',
                chapterId: 'chap-bio-circulation',
                chapterName: 'Chapter 22: Body Fluids and Circulation',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Human Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 22: Body Fluids and Circulation Complete One Shot',
                description: 'Composition of blood, blood groups, coagulation of blood; composition of lymph and its function; human circulatory system structure of human heart and blood vessels.',
                youtubeVideoId: 'Q25SLcqe2_g',
                channelName: 'Competition Wallah',
                durationMinutes: 275,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 275,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 22: Body Fluids and Circulation.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-circulation-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 110, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-circulation-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 165, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-circulation',
                    type: 'primary',
                    title: 'Chapter 22: Body Fluids and Circulation in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Q25SLcqe2_g',
                    durationMinutes: 275,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 22: Body Fluids and Circulation Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-excretion',
            unitId: 'unit-bio-2',
            unitName: 'Human Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 23: Excretory Products and Their Elimination',
            description: 'Modes of excretion ammonotelism, ureotelism, uricotelism; Human excretory system structure and function; Urine formation, Osmoregulation; Regulation of kidney function.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-excretion',
                chapterId: 'chap-bio-excretion',
                chapterName: 'Chapter 23: Excretory Products and Their Elimination',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Human Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 23: Excretory Products and Their Elimination Complete One Shot',
                description: 'Modes of excretion ammonotelism, ureotelism, uricotelism; Human excretory system structure and function; Urine formation, Osmoregulation; Regulation of kidney function.',
                youtubeVideoId: 'G-g8yle8FMk',
                channelName: 'Competition Wallah',
                durationMinutes: 253,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 253,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 23: Excretory Products and Their Elimination.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-excretion-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 101, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-excretion-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 151, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-excretion',
                    type: 'primary',
                    title: 'Chapter 23: Excretory Products and Their Elimination in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'G-g8yle8FMk',
                    durationMinutes: 253,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 23: Excretory Products and Their Elimination Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-locomotion',
            unitId: 'unit-bio-2',
            unitName: 'Human Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 24: Locomotion and Movement',
            description: 'Types of movement ciliary, flagellar, muscular; Skeletal muscle contractile proteins and muscle contraction; Skeletal system and its functions; Joints.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-locomotion',
                chapterId: 'chap-bio-locomotion',
                chapterName: 'Chapter 24: Locomotion and Movement',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Human Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 24: Locomotion and Movement Complete One Shot',
                description: 'Types of movement ciliary, flagellar, muscular; Skeletal muscle contractile proteins and muscle contraction; Skeletal system and its functions; Joints.',
                youtubeVideoId: 'Q5jluBG-yoM',
                channelName: 'Competition Wallah',
                durationMinutes: 246,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 246,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 24: Locomotion and Movement.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-locomotion-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 98, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-locomotion-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 147, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-locomotion',
                    type: 'primary',
                    title: 'Chapter 24: Locomotion and Movement in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Q5jluBG-yoM',
                    durationMinutes: 246,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 24: Locomotion and Movement Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-neural',
            unitId: 'unit-bio-2',
            unitName: 'Human Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 25: Neural Control and Coordination',
            description: 'Neuron and nerves; Nervous system in humans central nervous system, peripheral nervous system and visceral nervous system; Generation and conduction of nerve impulse.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-neural',
                chapterId: 'chap-bio-neural',
                chapterName: 'Chapter 25: Neural Control and Coordination',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Human Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 25: Neural Control and Coordination Complete One Shot',
                description: 'Neuron and nerves; Nervous system in humans central nervous system, peripheral nervous system and visceral nervous system; Generation and conduction of nerve impulse.',
                youtubeVideoId: '2lfBwN6YnYQ',
                channelName: 'Competition Wallah',
                durationMinutes: 184,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 184,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 25: Neural Control and Coordination.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-neural-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 73, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-neural-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 110, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-neural',
                    type: 'primary',
                    title: 'Chapter 25: Neural Control and Coordination in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '2lfBwN6YnYQ',
                    durationMinutes: 184,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 25: Neural Control and Coordination Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-chemical-coord',
            unitId: 'unit-bio-2',
            unitName: 'Human Physiology',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Chapter 26: Chemical Coordination and Integration',
            description: 'Endocrine glands and hormones; Human endocrine system hypothalamus, pituitary, pineal, thyroid, parathyroid, adrenal, pancreas, gonads; Mechanism of hormone action.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-chemical-coord',
                chapterId: 'chap-bio-chemical-coord',
                chapterName: 'Chapter 26: Chemical Coordination and Integration',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Human Physiology',
                classLevel: 'Class 11',
                title: 'Chapter 26: Chemical Coordination and Integration Complete One Shot',
                description: 'Endocrine glands and hormones; Human endocrine system hypothalamus, pituitary, pineal, thyroid, parathyroid, adrenal, pancreas, gonads; Mechanism of hormone action.',
                youtubeVideoId: 'RMV7fzGc98Y',
                channelName: 'Competition Wallah',
                durationMinutes: 208,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 208,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 26: Chemical Coordination and Integration.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-chemical-coord-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 83, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-chemical-coord-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 124, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-chemical-coord',
                    type: 'primary',
                    title: 'Chapter 26: Chemical Coordination and Integration in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'RMV7fzGc98Y',
                    durationMinutes: 208,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 26: Chemical Coordination and Integration Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-bio-3',
        subjectId: 'biology',
        classLevel: 'Class 12',
        name: 'Reproduction',
        description: 'Flower structure; Development of male and female gametophytes; Pollination types, agencies and examples; Outbreeding devices; Pollen-Pollen interaction; Double fertilization.',
        chapters: [
          {
            id: 'chap-bio-flowering-repro',
            unitId: 'unit-bio-3',
            unitName: 'Reproduction',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 11: Sexual Reproduction in Flowering Plants',
            description: 'Flower structure; Development of male and female gametophytes; Pollination types, agencies and examples; Outbreeding devices; Pollen-Pollen interaction; Double fertilization.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-flowering-repro',
                chapterId: 'chap-bio-flowering-repro',
                chapterName: 'Chapter 11: Sexual Reproduction in Flowering Plants',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Reproduction',
                classLevel: 'Class 12',
                title: 'Chapter 11: Sexual Reproduction in Flowering Plants Complete One Shot',
                description: 'Flower structure; Development of male and female gametophytes; Pollination types, agencies and examples; Outbreeding devices; Pollen-Pollen interaction; Double fertilization.',
                youtubeVideoId: 'vtuYmW-ahyc',
                channelName: 'Competition Wallah',
                durationMinutes: 381,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 381,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 11: Sexual Reproduction in Flowering Plants.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-flowering-repro-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 152, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-flowering-repro-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 228, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-flowering-repro',
                    type: 'primary',
                    title: 'Chapter 11: Sexual Reproduction in Flowering Plants in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'vtuYmW-ahyc',
                    durationMinutes: 381,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 11: Sexual Reproduction in Flowering Plants Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-human-repro',
            unitId: 'unit-bio-3',
            unitName: 'Reproduction',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 27: Human Reproduction',
            description: 'Male and female reproductive systems; Microscopic anatomy of testis and ovary; Gametogenesis spermatogenesis and oogenesis; Menstrual cycle; Fertilisation, embryo development.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-human-repro',
                chapterId: 'chap-bio-human-repro',
                chapterName: 'Chapter 27: Human Reproduction',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Reproduction',
                classLevel: 'Class 12',
                title: 'Chapter 27: Human Reproduction Complete One Shot',
                description: 'Male and female reproductive systems; Microscopic anatomy of testis and ovary; Gametogenesis spermatogenesis and oogenesis; Menstrual cycle; Fertilisation, embryo development.',
                youtubeVideoId: 'Zwan2QAAbAo',
                channelName: 'Competition Wallah',
                durationMinutes: 492,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 492,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 27: Human Reproduction.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-human-repro-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 196, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-human-repro-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 295, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-human-repro',
                    type: 'primary',
                    title: 'Chapter 27: Human Reproduction in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Zwan2QAAbAo',
                    durationMinutes: 492,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 27: Human Reproduction Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-reproductive-health',
            unitId: 'unit-bio-3',
            unitName: 'Reproduction',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 28: Reproductive Health',
            description: 'Need for reproductive health and prevention of sexually transmitted diseases (STDs); Birth control Need and Methods, Contraception and Medical Termination of Pregnancy (MTP); Amniocentesis; Infertility and assisted reproductive technologies IVF, ZIFT, GIFT.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-reproductive-health',
                chapterId: 'chap-bio-reproductive-health',
                chapterName: 'Chapter 28: Reproductive Health',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Reproduction',
                classLevel: 'Class 12',
                title: 'Chapter 28: Reproductive Health Complete One Shot',
                description: 'Need for reproductive health and prevention of sexually transmitted diseases (STDs); Birth control Need and Methods, Contraception and Medical Termination of Pregnancy (MTP); Amniocentesis; Infertility and assisted reproductive technologies IVF, ZIFT, GIFT.',
                youtubeVideoId: 'LDOBcSv3KqY',
                channelName: 'Competition Wallah',
                durationMinutes: 290,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 290,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 28: Reproductive Health.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-reproductive-health-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 116, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-reproductive-health-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 174, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-reproductive-health',
                    type: 'primary',
                    title: 'Chapter 28: Reproductive Health in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'LDOBcSv3KqY',
                    durationMinutes: 290,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 28: Reproductive Health Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-bio-4',
        subjectId: 'biology',
        classLevel: 'Class 12',
        name: 'Genetics & Evolution',
        description: 'Mendelian inheritance; Deviations from Mendelism incomplete dominance, co-dominance, multiple alleles and inheritance of blood groups, pleiotropy; Chromosome theory of inheritance.',
        chapters: [
          {
            id: 'chap-bio-genetics-mendel',
            unitId: 'unit-bio-4',
            unitName: 'Genetics & Evolution',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 12: Principles of Inheritance and Variation',
            description: 'Mendelian inheritance; Deviations from Mendelism incomplete dominance, co-dominance, multiple alleles and inheritance of blood groups, pleiotropy; Chromosome theory of inheritance.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-genetics-mendel',
                chapterId: 'chap-bio-genetics-mendel',
                chapterName: 'Chapter 12: Principles of Inheritance and Variation',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Genetics & Evolution',
                classLevel: 'Class 12',
                title: 'Chapter 12: Principles of Inheritance and Variation Complete One Shot',
                description: 'Mendelian inheritance; Deviations from Mendelism incomplete dominance, co-dominance, multiple alleles and inheritance of blood groups, pleiotropy; Chromosome theory of inheritance.',
                youtubeVideoId: 'yylN99wlIYU',
                channelName: 'Competition Wallah',
                durationMinutes: 488,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 488,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 12: Principles of Inheritance and Variation.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-genetics-mendel-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 195, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-genetics-mendel-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 292, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-genetics-mendel',
                    type: 'primary',
                    title: 'Chapter 12: Principles of Inheritance and Variation in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'yylN99wlIYU',
                    durationMinutes: 488,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 12: Principles of Inheritance and Variation Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-dna',
            unitId: 'unit-bio-4',
            unitName: 'Genetics & Evolution',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 13: Molecular Basis of Inheritance',
            description: 'Structure of DNA and RNA; DNA packaging; DNA replication; Central dogma; Transcription, genetic code, translation; Gene expression and regulation Lac Operon; Human Genome Project; DNA fingerprinting.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-dna',
                chapterId: 'chap-bio-dna',
                chapterName: 'Chapter 13: Molecular Basis of Inheritance',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Genetics & Evolution',
                classLevel: 'Class 12',
                title: 'Chapter 13: Molecular Basis of Inheritance Complete One Shot',
                description: 'Structure of DNA and RNA; DNA packaging; DNA replication; Central dogma; Transcription, genetic code, translation; Gene expression and regulation Lac Operon; Human Genome Project; DNA fingerprinting.',
                youtubeVideoId: '569biQt_ZOc',
                channelName: 'Competition Wallah',
                durationMinutes: 347,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 347,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 13: Molecular Basis of Inheritance.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-dna-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 138, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-dna-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 208, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-dna',
                    type: 'primary',
                    title: 'Chapter 13: Molecular Basis of Inheritance in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '569biQt_ZOc',
                    durationMinutes: 347,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 13: Molecular Basis of Inheritance Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-evolution',
            unitId: 'unit-bio-4',
            unitName: 'Genetics & Evolution',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 29: Evolution',
            description: 'Origin of life; Biological evolution and evidences for biological evolution paleontology, comparative anatomy, embryology and molecular evidence; Darwin contribution, Modern Synthetic theory of Evolution; Mechanism of evolution Variation Mutation and Recombination and Natural Selection.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-evolution',
                chapterId: 'chap-bio-evolution',
                chapterName: 'Chapter 29: Evolution',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Genetics & Evolution',
                classLevel: 'Class 12',
                title: 'Chapter 29: Evolution Complete One Shot',
                description: 'Origin of life; Biological evolution and evidences for biological evolution paleontology, comparative anatomy, embryology and molecular evidence; Darwin contribution, Modern Synthetic theory of Evolution; Mechanism of evolution Variation Mutation and Recombination and Natural Selection.',
                youtubeVideoId: 'fzvvIJDMn3Y',
                channelName: 'Competition Wallah',
                durationMinutes: 318,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 318,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 29: Evolution.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-evolution-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 127, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-evolution-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 190, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-evolution',
                    type: 'primary',
                    title: 'Chapter 29: Evolution in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'fzvvIJDMn3Y',
                    durationMinutes: 318,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 29: Evolution Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-bio-5',
        subjectId: 'biology',
        classLevel: 'Class 12',
        name: 'Biology in Human Welfare & Biotech',
        description: 'In household food processing, industrial production, sewage treatment, energy generation and as biocontrol agents and biofertilizers.',
        chapters: [
          {
            id: 'chap-bio-microbes',
            unitId: 'unit-bio-5',
            unitName: 'Biology in Human Welfare & Biotech',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 14: Microbes in Human Welfare',
            description: 'In household food processing, industrial production, sewage treatment, energy generation and as biocontrol agents and biofertilizers.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-microbes',
                chapterId: 'chap-bio-microbes',
                chapterName: 'Chapter 14: Microbes in Human Welfare',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Biology in Human Welfare & Biotech',
                classLevel: 'Class 12',
                title: 'Chapter 14: Microbes in Human Welfare Complete One Shot',
                description: 'In household food processing, industrial production, sewage treatment, energy generation and as biocontrol agents and biofertilizers.',
                youtubeVideoId: 'Tv4lRVWyVcI',
                channelName: 'Competition Wallah',
                durationMinutes: 137,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 137,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 14: Microbes in Human Welfare.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-microbes-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 54, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-microbes-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 82, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-microbes',
                    type: 'primary',
                    title: 'Chapter 14: Microbes in Human Welfare in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'Tv4lRVWyVcI',
                    durationMinutes: 137,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 14: Microbes in Human Welfare Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-health-disease',
            unitId: 'unit-bio-5',
            unitName: 'Biology in Human Welfare & Biotech',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 30: Human Health and Disease',
            description: 'Pathogens; parasites causing human diseases malaria, filariasis, ascariasis, typhoid, pneumonia, common cold, amoebiasis, ring worm; Basic concepts of immunology vaccines; Cancer, HIV and AIDS; Adolescence, drug and alcohol abuse.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-health-disease',
                chapterId: 'chap-bio-health-disease',
                chapterName: 'Chapter 30: Human Health and Disease',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Biology in Human Welfare & Biotech',
                classLevel: 'Class 12',
                title: 'Chapter 30: Human Health and Disease Complete One Shot',
                description: 'Pathogens; parasites causing human diseases malaria, filariasis, ascariasis, typhoid, pneumonia, common cold, amoebiasis, ring worm; Basic concepts of immunology vaccines; Cancer, HIV and AIDS; Adolescence, drug and alcohol abuse.',
                youtubeVideoId: 'qAfP64kuUu8',
                channelName: 'Competition Wallah',
                durationMinutes: 360,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 360,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 30: Human Health and Disease.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-health-disease-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 144, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-health-disease-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 216, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-health-disease',
                    type: 'primary',
                    title: 'Chapter 30: Human Health and Disease in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'qAfP64kuUu8',
                    durationMinutes: 360,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 30: Human Health and Disease Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-biotech-principles',
            unitId: 'unit-bio-5',
            unitName: 'Biology in Human Welfare & Biotech',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 31: Biotechnology: Principles and Processes',
            description: 'Genetic engineering Recombinant DNA technology, restriction enzymes, cloning vectors, PCR, bioreactors, downstream processing.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-biotech-principles',
                chapterId: 'chap-bio-biotech-principles',
                chapterName: 'Chapter 31: Biotechnology: Principles and Processes',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Biology in Human Welfare & Biotech',
                classLevel: 'Class 12',
                title: 'Chapter 31: Biotechnology: Principles and Processes Complete One Shot',
                description: 'Genetic engineering Recombinant DNA technology, restriction enzymes, cloning vectors, PCR, bioreactors, downstream processing.',
                youtubeVideoId: 'e-11dG8-AL4',
                channelName: 'Competition Wallah',
                durationMinutes: 282,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 282,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 31: Biotechnology: Principles and Processes.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-biotech-principles-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 112, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-biotech-principles-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 169, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-biotech-principles',
                    type: 'primary',
                    title: 'Chapter 31: Biotechnology: Principles and Processes in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'e-11dG8-AL4',
                    durationMinutes: 282,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 31: Biotechnology: Principles and Processes Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-biotech-apps',
            unitId: 'unit-bio-5',
            unitName: 'Biology in Human Welfare & Biotech',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 32: Biotechnology and its Applications',
            description: 'Applications of Biotechnology in health and agriculture Human insulin and vaccine production, gene therapy; Genetically modified organisms Bt crops; Transgenic Animals; Biosafety issues Biopiracy and patents.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-biotech-apps',
                chapterId: 'chap-bio-biotech-apps',
                chapterName: 'Chapter 32: Biotechnology and its Applications',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Biology in Human Welfare & Biotech',
                classLevel: 'Class 12',
                title: 'Chapter 32: Biotechnology and its Applications Complete One Shot',
                description: 'Applications of Biotechnology in health and agriculture Human insulin and vaccine production, gene therapy; Genetically modified organisms Bt crops; Transgenic Animals; Biosafety issues Biopiracy and patents.',
                youtubeVideoId: 'ys2UlRQTU1A',
                channelName: 'Competition Wallah',
                durationMinutes: 222,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 222,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 32: Biotechnology and its Applications.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-biotech-apps-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 88, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-biotech-apps-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 133, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-biotech-apps',
                    type: 'primary',
                    title: 'Chapter 32: Biotechnology and its Applications in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Nomesh Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'ys2UlRQTU1A',
                    durationMinutes: 222,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 32: Biotechnology and its Applications Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      },
{
        id: 'unit-bio-6',
        subjectId: 'biology',
        classLevel: 'Class 12',
        name: 'Ecology & Environment',
        description: 'Organism and environment Habitat and niche; Population attributes growth rates, birth rate and death rate, age distribution; Population interactions mutualism, competition, predation, parasitism.',
        chapters: [
          {
            id: 'chap-bio-organisms-pop',
            unitId: 'unit-bio-6',
            unitName: 'Ecology & Environment',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 15: Organisms and Populations',
            description: 'Organism and environment Habitat and niche; Population attributes growth rates, birth rate and death rate, age distribution; Population interactions mutualism, competition, predation, parasitism.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-organisms-pop',
                chapterId: 'chap-bio-organisms-pop',
                chapterName: 'Chapter 15: Organisms and Populations',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Ecology & Environment',
                classLevel: 'Class 12',
                title: 'Chapter 15: Organisms and Populations Complete One Shot',
                description: 'Organism and environment Habitat and niche; Population attributes growth rates, birth rate and death rate, age distribution; Population interactions mutualism, competition, predation, parasitism.',
                youtubeVideoId: '8b9kIBmNT34',
                channelName: 'Competition Wallah',
                durationMinutes: 291,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 291,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 15: Organisms and Populations.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-organisms-pop-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 116, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-organisms-pop-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 174, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-organisms-pop',
                    type: 'primary',
                    title: 'Chapter 15: Organisms and Populations in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '8b9kIBmNT34',
                    durationMinutes: 291,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 15: Organisms and Populations Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-ecosystem',
            unitId: 'unit-bio-6',
            unitName: 'Ecology & Environment',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 16: Ecosystem',
            description: 'Ecosystems Patterns, components; productivity and decomposition; Energy flow; Pyramids of number, biomass, energy.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-ecosystem',
                chapterId: 'chap-bio-ecosystem',
                chapterName: 'Chapter 16: Ecosystem',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Ecology & Environment',
                classLevel: 'Class 12',
                title: 'Chapter 16: Ecosystem Complete One Shot',
                description: 'Ecosystems Patterns, components; productivity and decomposition; Energy flow; Pyramids of number, biomass, energy.',
                youtubeVideoId: 'WQN1hPgfvwk',
                channelName: 'Competition Wallah',
                durationMinutes: 224,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 224,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 16: Ecosystem.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-ecosystem-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 89, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-ecosystem-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 134, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-ecosystem',
                    type: 'primary',
                    title: 'Chapter 16: Ecosystem in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'WQN1hPgfvwk',
                    durationMinutes: 224,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 16: Ecosystem Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
{
            id: 'chap-bio-biodiversity',
            unitId: 'unit-bio-6',
            unitName: 'Ecology & Environment',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Chapter 17: Biodiversity and Conservation',
            description: 'Concept of Biodiversity; Patterns of Biodiversity; Importance of Biodiversity; Loss of Biodiversity; Biodiversity conservation Hotspots, endangered organisms, extinction, Red Data Book, biosphere reserves, national parks and sanctuaries.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chap-bio-biodiversity',
                chapterId: 'chap-bio-biodiversity',
                chapterName: 'Chapter 17: Biodiversity and Conservation',
                subjectId: 'biology',
                subjectName: 'Biology (Botany & Zoology)',
                unitName: 'Ecology & Environment',
                classLevel: 'Class 12',
                title: 'Chapter 17: Biodiversity and Conservation Complete One Shot',
                description: 'Concept of Biodiversity; Patterns of Biodiversity; Importance of Biodiversity; Loss of Biodiversity; Biodiversity conservation Hotspots, endangered organisms, extinction, Red Data Book, biosphere reserves, national parks and sanctuaries.',
                youtubeVideoId: 'pPKXSOhOmi8',
                channelName: 'Competition Wallah',
                durationMinutes: 180,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 180,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Understand core concepts of Chapter 17: Biodiversity and Conservation.',
                  'Solve previous year NEET questions and numericals.',
                  'Master NCERT lines and key formulas.'
                ],
                subtopics: [
                  { id: 'sub-chap-bio-biodiversity-1', title: 'Core Concepts & NCERT Theory', estimatedMinutes: 72, keyFormulaOrFact: 'Key NCERT Concepts & Formulas' },
                  { id: 'sub-chap-bio-biodiversity-2', title: 'PYQs & NEET Numerical Practice', estimatedMinutes: 108, keyFormulaOrFact: '10+ Year Previous Year Questions' }
                ],
                lectures: [
                  {
                    id: 'lec-chap-bio-biodiversity',
                    type: 'primary',
                    title: 'Chapter 17: Biodiversity and Conservation in 1 Shot || Prachand / Ummeed NEET 2025',
                    teacher: 'Vipin Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'pPKXSOhOmi8',
                    durationMinutes: 180,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Medium',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Chapter 17: Biodiversity and Conservation Formulas & NCERT Highlights',
                    content: 'Complete revised coverage according to latest NMC 2025/2026 syllabus.',
                    formulas: ['Important NCERT Formula 1', 'Important NCERT Formula 2']
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          }
        ]
      }
    ]
  }
];

export function getSubjectById(subjectId: string): Subject | undefined {
  return CURRICULUM_DATA.find((s) => s.id === subjectId);
}

export function getAllTopics() {
  const topics = [];
  for (const subject of CURRICULUM_DATA) {
    for (const unit of subject.units) {
      for (const chapter of unit.chapters) {
        for (const topic of chapter.topics) {
          topics.push(topic);
        }
      }
    }
  }
  return topics;
}

export function getTopicById(topicId: string) {
  return getAllTopics().find((t) => t.id === topicId);
}

export function getAllChapters() {
  const chapters = [];
  for (const subject of CURRICULUM_DATA) {
    for (const unit of subject.units) {
      for (const chapter of unit.chapters) {
        chapters.push(chapter);
      }
    }
  }
  return chapters;
}

export function getChapterById(chapterId: string) {
  return getAllChapters().find((c) => c.id === chapterId);
}

export function getNextTopic(currentTopicId: string) {
  const all = getAllTopics();
  const currentIndex = all.findIndex((t) => t.id === currentTopicId);
  if (currentIndex >= 0 && currentIndex < all.length - 1) {
    return all[currentIndex + 1];
  }
  return undefined;
}
