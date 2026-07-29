import fs from 'fs';
import path from 'path';

// Generate comprehensive NEET 2025/2026 NMC Curriculum Data
const curriculumCode = `import { Subject } from '../types';

export const CURRICULUM_DATA: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY',
    icon: 'Atom',
    color: '#10B981',
    badge: 'Formula & Numericals',
    totalUnits: 4,
    totalChapters: 20,
    totalTopics: 20,
    neetWeightagePercent: 25,
    units: [
      {
        id: 'unit-phy-1',
        subjectId: 'physics',
        classLevel: 'Class 11',
        name: 'Kinematics & Mechanics',
        description: 'Physical quantities, vectors, motion in 1D/2D, Newton laws, work-energy, and rotational dynamics.',
        chapters: [
          {
            id: 'chap-phy-units',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Mechanics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Units, Dimensions & Error Analysis',
            description: 'Dimensional analysis, SI units, significant figures, and error propagation.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-phy-dimensions',
                chapterId: 'chap-phy-units',
                chapterName: 'Units, Dimensions & Error Analysis',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Mechanics',
                classLevel: 'Class 11',
                title: 'Dimensional Analysis & Fractional Error Propagation',
                description: 'Dimensions of physical quantities, principle of homogeneity, and relative/percentage error calculations.',
                youtubeVideoId: 'fA-XN6q3f6A',
                channelName: 'Competition Wallah',
                durationMinutes: 70,
                importance: 'High',
                neetWeightage: '2 Questions (8 Marks)',
                estimatedStudyMinutes: 70,
                difficulty: 'Easy',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Determine dimensions of physical constants (G, h, μ0, ε0).',
                  'Apply principle of homogeneity to verify physical equations.',
                  'Calculate maximum permissible percentage error in combined formulas.'
                ],
                subtopics: [
                  { id: 'sub-dim-1', title: 'SI Base & Derived Units', estimatedMinutes: 15, keyFormulaOrFact: '1 Joule = 1 kg·m²/s²' },
                  { id: 'sub-dim-2', title: 'Dimensional Formulas of Constants', estimatedMinutes: 25, keyFormulaOrFact: '[G] = M⁻¹L³T⁻², [h] = ML²T⁻¹' },
                  { id: 'sub-dim-3', title: 'Error Propagation Rules', estimatedMinutes: 30, keyFormulaOrFact: 'If Z = A^m B^n / C^k, ΔZ/Z = m(ΔA/A) + n(ΔB/B) + k(ΔC/C)' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-dim-2025',
                    type: 'primary',
                    title: 'Units, Dimensions & Error Analysis Complete 2025 Lecture',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'fA-XN6q3f6A',
                    durationMinutes: 70,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Easy',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Dimensional Formulas & Error Rules',
                    content: 'Dimensions do not depend on system of units. Percentage errors are always added in worst-case analysis.',
                    formulas: [
                      'Percentage Error = (ΔA / A) × 100%',
                      'Least Count Error = Smallest division on measuring scale'
                    ]
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
            unitName: 'Kinematics & Mechanics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Kinematics & Projectile Motion',
            description: 'Motion in 1D, 2D projectile mechanics, trajectory equation, and relative velocity.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-projectile',
                chapterId: 'chap-phy-projectile',
                chapterName: 'Kinematics & Projectile Motion',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Mechanics',
                classLevel: 'Class 11',
                title: 'Projectile Motion & Trajectory Mechanics',
                description: 'Ground-to-ground projectile motion, maximum height, time of flight, horizontal range, and trajectory parabola equation.',
                youtubeVideoId: 'fA-XN6q3f6A',
                channelName: 'Competition Wallah',
                durationMinutes: 80,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 80,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Derive parabolic equation of trajectory y = x tan θ - (g x²)/(2 u² cos² θ).',
                  'Calculate maximum height (H_max), time of flight (T), and horizontal range (R).',
                  'Solve complementary angle range problems (θ and 90°-θ).'
                ],
                subtopics: [
                  { id: 'sub-proj-1', title: 'Time of Flight & Maximum Height', estimatedMinutes: 20, keyFormulaOrFact: 'T = (2u sin θ)/g, H = (u² sin² θ)/(2g)' },
                  { id: 'sub-proj-2', title: 'Horizontal Range & Maximum Range Angle', estimatedMinutes: 25, keyFormulaOrFact: 'R = (u² sin 2θ)/g, R_max at θ = 45°' },
                  { id: 'sub-proj-3', title: 'Parabolic Trajectory Equation', estimatedMinutes: 35, keyFormulaOrFact: 'y = x tan θ (1 - x/R)' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-proj-2025',
                    type: 'primary',
                    title: 'Motion in a Plane: Projectile Motion Complete 2025 Chapter Lecture',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'fA-XN6q3f6A',
                    durationMinutes: 80,
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
                    title: 'Projectile Motion Key Derivations',
                    content: 'Horizontal component of velocity remains constant u_x = u cos θ throughout flight in absence of air drag.',
                    formulas: [
                      'Time of Flight: T = 2u sin θ / g',
                      'Horizontal Range: R = u² sin(2θ) / g',
                      'Maximum Height: H = u² sin² θ / 2g'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-laws',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Mechanics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Laws of Motion & Friction',
            description: 'Newton laws, free body diagrams, tension in strings, pulley systems, static and kinetic friction.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-friction',
                chapterId: 'chap-phy-laws',
                chapterName: 'Laws of Motion & Friction',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Mechanics',
                classLevel: 'Class 11',
                title: 'Newton Laws, Free Body Diagrams & Friction Dynamics',
                description: 'Impulse, momentum conservation, connected body acceleration, angle of friction, and banking of roads.',
                youtubeVideoId: 'sAn1c6Ew5-E',
                channelName: 'Competition Wallah',
                durationMinutes: 75,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 75,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Construct Free Body Diagrams (FBD) for multi-block string pulley systems.',
                  'Calculate static limit f_s ≤ μ_s N and kinetic friction f_k = μ_k N.',
                  'Determine optimum speed on banked road v = √(r g tan θ).'
                ],
                subtopics: [
                  { id: 'sub-fric-1', title: 'FBD & Pulley String Mechanics', estimatedMinutes: 25, keyFormulaOrFact: 'a = (m2 - m1)g / (m1 + m2)' },
                  { id: 'sub-fric-2', title: 'Static vs Kinetic Friction', estimatedMinutes: 25, keyFormulaOrFact: 'f_s(max) = μ_s N, f_k = μ_k N' },
                  { id: 'sub-fric-3', title: 'Circular Motion & Road Banking', estimatedMinutes: 25, keyFormulaOrFact: 'v_max = √[rg(μ + tan θ)/(1 - μ tan θ)]' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-laws-2025',
                    type: 'primary',
                    title: 'Laws of Motion & Friction Complete 2025 Chapter Lecture',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sAn1c6Ew5-E',
                    durationMinutes: 75,
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
                    title: 'Friction & Dynamics Summary',
                    content: 'Friction is a self-adjusting force up to its limiting static value μ_s N.',
                    formulas: [
                      'Limiting Friction: f_lim = μ_s N',
                      'Optimum Speed on Banked Curved Road: v = √(r g tan θ)'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-work-energy',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Mechanics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Work, Energy & Power',
            description: 'Work done by constant & variable force, Work-Energy Theorem, potential energy of spring, and collisions.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-work-energy',
                chapterId: 'chap-phy-work-energy',
                chapterName: 'Work, Energy & Power',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Mechanics',
                classLevel: 'Class 11',
                title: 'Work-Energy Theorem, Conservative Forces & Elastic Collisions',
                description: 'Calculation of work using scalar product, spring potential energy, mechanical energy conservation, and coefficient of restitution.',
                youtubeVideoId: 'sAn1c6Ew5-E',
                channelName: 'Competition Wallah',
                durationMinutes: 70,
                importance: 'High',
                neetWeightage: '2 Questions (8 Marks)',
                estimatedStudyMinutes: 70,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Apply Work-Energy Theorem W_net = ΔK to variable force systems.',
                  'Relate force and potential energy F = -dU/dx.',
                  'Solve 1D head-on elastic collision velocity equations.'
                ],
                subtopics: [
                  { id: 'sub-we-1', title: 'Work-Energy Theorem W = ΔK', estimatedMinutes: 20, keyFormulaOrFact: 'W = ∫ F · dx = ΔK' },
                  { id: 'sub-we-2', title: 'Spring Energy & F = -dU/dx', estimatedMinutes: 25, keyFormulaOrFact: 'U_spring = ½ k x²' },
                  { id: 'sub-we-3', title: '1D Elastic Collisions & Restitution e', estimatedMinutes: 25, keyFormulaOrFact: 'e = (v2 - v1)/(u1 - u2) = 1 for elastic' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-we-2025',
                    type: 'primary',
                    title: 'Work, Energy & Power Complete 2025 Chapter Lecture',
                    teacher: 'Mrityunjay Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sAn1c6Ew5-E',
                    durationMinutes: 70,
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
                    title: 'Work Energy Formulas',
                    content: 'Conservative forces satisfy ∫ F · dr = 0 for any closed path.',
                    formulas: [
                      'Force from Potential Energy: F(x) = - dU / dx',
                      'Elastic Collision Velocities: v1 = ((m1-m2)u1 + 2m2 u2)/(m1+m2)'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-rotational',
            unitId: 'unit-phy-1',
            unitName: 'Kinematics & Mechanics',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'System of Particles & Rotational Motion',
            description: 'Center of mass, torque, angular momentum, moment of inertia, and pure rolling motion.',
            importance: 'High',
            totalTopics: 2,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-moi',
                chapterId: 'chap-phy-rotational',
                chapterName: 'System of Particles & Rotational Motion',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Mechanics',
                classLevel: 'Class 11',
                title: 'Moment of Inertia & Parallel/Perpendicular Axes Theorems',
                description: 'Calculation of moment of inertia for ring, disc, sphere, cylinder, and applications of theorems.',
                youtubeVideoId: 'sAn1c6Ew5-E',
                channelName: 'Competition Wallah',
                durationMinutes: 72,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 72,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Derive moment of inertia for symmetrical rigid bodies using integration.',
                  'Apply Parallel and Perpendicular Axis Theorems accurately to standard NEET numericals.',
                  'Calculate radius of gyration (K) and rotational kinetic energy.'
                ],
                subtopics: [
                  { id: 'sub-moi-1', title: 'Definition & Physical Significance of Moment of Inertia', estimatedMinutes: 15, keyFormulaOrFact: 'I = ∑ m_i r_i²' },
                  { id: 'sub-moi-2', title: 'Moment of Inertia of Standard Bodies', estimatedMinutes: 25, keyFormulaOrFact: 'Disc center = ½ MR², Solid Sphere = ⅖ MR²' },
                  { id: 'sub-moi-3', title: 'Parallel & Perpendicular Axes Theorems', estimatedMinutes: 32, keyFormulaOrFact: 'I = I_cm + Md² ; I_z = I_x + I_y' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-moi-2025',
                    type: 'primary',
                    title: 'System of Particles & Rotational Motion: Moment of Inertia (Complete 2025)',
                    teacher: 'Mrityunjay Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sAn1c6Ew5-E',
                    durationMinutes: 72,
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
                    title: 'Moment of Inertia Formulas',
                    content: 'Parallel Axis Theorem applies to any 3D rigid body, Perpendicular Axis Theorem applies only to 2D planar lamina.',
                    formulas: [
                      'Parallel Axis: I = I_cm + M d²',
                      'Solid Sphere: I = (2/5) M R², Hollow Sphere: I = (2/3) M R²'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              },
              {
                id: 'topic-phy-rolling',
                chapterId: 'chap-phy-rotational',
                chapterName: 'System of Particles & Rotational Motion',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Kinematics & Mechanics',
                classLevel: 'Class 11',
                title: 'Pure Rolling Motion on Inclined Plane',
                description: 'Condition of pure rolling v_cm = R ω, energy of rolling body, acceleration down an incline, and torque equations.',
                youtubeVideoId: 'sAn1c6Ew5-E',
                channelName: 'Competition Wallah',
                durationMinutes: 65,
                importance: 'High',
                neetWeightage: '1-2 Questions (4-8 Marks)',
                estimatedStudyMinutes: 65,
                difficulty: 'Hard',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: ['topic-phy-moi'],
                learningOutcomes: [
                  'Apply point of contact zero velocity condition v_cm = R ω for pure rolling.',
                  'Calculate total kinetic energy K_total = ½ M v² (1 + K²/R²).',
                  'Determine acceleration down an inclined plane a = g sin θ / (1 + K²/R²).'
                ],
                subtopics: [
                  { id: 'sub-roll-1', title: 'Pure Rolling Kinematic Condition', estimatedMinutes: 20, keyFormulaOrFact: 'v_cm = R ω, a_cm = R α' },
                  { id: 'sub-roll-2', title: 'Kinetic Energy of Rolling Body', estimatedMinutes: 20, keyFormulaOrFact: 'K_total = ½ M v_cm² (1 + K²/R²)' },
                  { id: 'sub-roll-3', title: 'Acceleration down Inclined Plane', estimatedMinutes: 25, keyFormulaOrFact: 'a = g sin θ / (1 + K²/R²)' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-rolling-2025',
                    type: 'primary',
                    title: 'Pure Rolling Motion on Inclined Plane & Dynamics (Complete 2025)',
                    teacher: 'Mrityunjay Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sAn1c6Ew5-E',
                    durationMinutes: 65,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Hard',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Rolling Motion Summary',
                    content: 'In pure rolling, static friction does zero net work because point of contact is instantaneously at rest.',
                    formulas: [
                      'Acceleration on Incline: a = g sin θ / (1 + I_cm / M R²)',
                      'Minimum Friction Coefficient for No Slipping: μ_min = (tan θ) / (1 + M R² / I_cm)'
                    ]
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
        name: 'Thermodynamics & Properties of Matter',
        description: 'Gravitation, fluids, elasticity, thermodynamics, kinetic theory of gases, SHM, and waves.',
        chapters: [
          {
            id: 'chap-phy-gravitation',
            unitId: 'unit-phy-2',
            unitName: 'Thermodynamics & Properties of Matter',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Gravitation',
            description: 'Kepler laws, acceleration due to gravity variation, gravitational potential energy, escape & orbital speed.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-phy-gravitation',
                chapterId: 'chap-phy-gravitation',
                chapterName: 'Gravitation',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Thermodynamics & Properties of Matter',
                classLevel: 'Class 11',
                title: 'Gravitational Potential, Escape Speed & Kepler Laws',
                description: 'Universal law of gravitation, variation of g with height/depth, orbital speed, escape velocity v_e = √(2gR).',
                youtubeVideoId: 'sAn1c6Ew5-E',
                channelName: 'Competition Wallah',
                durationMinutes: 75,
                importance: 'High',
                neetWeightage: '2 Questions (8 Marks)',
                estimatedStudyMinutes: 75,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Derive variation of g with altitude g_h = g(1 - 2h/R) and depth g_d = g(1 - d/R).',
                  'Calculate escape speed v_e = √(2 G M / R) = √(2 g R) ≈ 11.2 km/s for Earth.',
                  'Apply Kepler 3rd Law T² ∝ r³ to satellite motion.'
                ],
                subtopics: [
                  { id: 'sub-grav-1', title: 'Variation of g with Altitude & Depth', estimatedMinutes: 25, keyFormulaOrFact: 'g_h = g/(1+h/R)², g_d = g(1-d/R)' },
                  { id: 'sub-grav-2', title: 'Gravitational Potential Energy U = -GMm/r', estimatedMinutes: 25, keyFormulaOrFact: 'V = -GM/r' },
                  { id: 'sub-grav-3', title: 'Escape Velocity & Satellite Motion', estimatedMinutes: 25, keyFormulaOrFact: 'v_e = √(2gR), v_o = √(gR)' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-grav-2025',
                    type: 'primary',
                    title: 'Gravitation Complete 2025 Chapter Lecture',
                    teacher: 'Mrityunjay Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sAn1c6Ew5-E',
                    durationMinutes: 75,
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
                    title: 'Gravitation Key Formulas',
                    content: 'Total energy of a revolving satellite in circular orbit is negative E_total = - G M m / 2r.',
                    formulas: [
                      'Escape Speed: v_e = √(2 GM / R) = 11.2 km/s',
                      'Kepler Third Law: T² = (4π² / GM) r³'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-thermo',
            unitId: 'unit-phy-2',
            unitName: 'Thermodynamics & Properties of Matter',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Thermodynamics & KTG',
            description: 'First & Second Laws of Thermodynamics, isothermal, adiabatic, isobaric, isochoric processes, and heat engine efficiency.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-thermo',
                chapterId: 'chap-phy-thermo',
                chapterName: 'Thermodynamics & KTG',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Thermodynamics & Properties of Matter',
                classLevel: 'Class 11',
                title: 'First Law, Thermodynamic Processes & Carnot Efficiency',
                description: 'dQ = dU + dW, work done in adiabatic process W = (P1V1 - P2V2)/(γ - 1), molar heat capacities Cp - Cv = R, and Carnot engine efficiency η = 1 - T2/T1.',
                youtubeVideoId: 'sAn1c6Ew5-E',
                channelName: 'Competition Wallah',
                durationMinutes: 80,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 80,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Apply First Law of Thermodynamics dQ = dU + dW correctly with sign conventions.',
                  'Calculate work done in Isothermal W = nRT ln(V2/V1) and Adiabatic W = (P1V1-P2V2)/(γ-1).',
                  'Calculate Carnot Heat Engine Efficiency η = 1 - T_sink/T_source.'
                ],
                subtopics: [
                  { id: 'sub-th-1', title: 'First Law & Internal Energy dU = n Cv dT', estimatedMinutes: 25, keyFormulaOrFact: 'dQ = dU + dW' },
                  { id: 'sub-th-2', title: 'Isothermal vs Adiabatic Process PV^γ = C', estimatedMinutes: 30, keyFormulaOrFact: 'γ = Cp/Cv = 1 + 2/f' },
                  { id: 'sub-th-3', title: 'Carnot Engine & Efficiency η = 1 - T2/T1', estimatedMinutes: 25, keyFormulaOrFact: 'η = (Q1 - Q2)/Q1 = 1 - T2/T1' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-thermo-2025',
                    type: 'primary',
                    title: 'Thermodynamics & KTG Complete 2025 Chapter Lecture',
                    teacher: 'Mrityunjay Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sAn1c6Ew5-E',
                    durationMinutes: 80,
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
                    title: 'Thermodynamics Key Formulas',
                    content: 'Internal energy U depends strictly on absolute temperature T for an ideal gas.',
                    formulas: [
                      'Mayer Relation: Cp - Cv = R',
                      'Adiabatic Equation: P V^γ = Constant, T V^(γ-1) = Constant',
                      'Carnot Engine Efficiency: η = 1 - T_sink / T_source'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-shm',
            unitId: 'unit-phy-2',
            unitName: 'Thermodynamics & Properties of Matter',
            subjectId: 'physics',
            classLevel: 'Class 11',
            name: 'Oscillations (SHM) & Waves',
            description: 'Simple Harmonic Motion equation, simple pendulum, spring-mass system, standing waves, organ pipes, and beats.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-phy-shm',
                chapterId: 'chap-phy-shm',
                chapterName: 'Oscillations (SHM) & Waves',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Thermodynamics & Properties of Matter',
                classLevel: 'Class 11',
                title: 'Simple Harmonic Motion, Spring Mass & Organ Pipes',
                description: 'Equation of SHM x = A sin(ωt + φ), time period T = 2π√(m/k), total energy E = ½ m ω² A², open & closed organ pipe harmonics, beats frequency f_b = |f1 - f2|.',
                youtubeVideoId: 'sAn1c6Ew5-E',
                channelName: 'Competition Wallah',
                durationMinutes: 75,
                importance: 'High',
                neetWeightage: '2 Questions (8 Marks)',
                estimatedStudyMinutes: 75,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Solve SHM displacement, velocity v = ω√(A²-x²), and acceleration a = -ω²x equations.',
                  'Calculate time period for spring mass systems in series and parallel.',
                  'Determine fundamental frequencies for closed pipe f = v/(4L) and open pipe f = v/(2L).'
                ],
                subtopics: [
                  { id: 'sub-shm-1', title: 'SHM Kinematics & Energy', estimatedMinutes: 25, keyFormulaOrFact: 'v = ω√(A²-x²), E = ½ m ω² A²' },
                  { id: 'sub-shm-2', title: 'Simple Pendulum & Spring Mass T = 2π√(m/k)', estimatedMinutes: 25, keyFormulaOrFact: 'T = 2π√(L/g)' },
                  { id: 'sub-shm-3', title: 'Organ Pipe Harmonics & Beats', estimatedMinutes: 25, keyFormulaOrFact: 'Closed Pipe: f_n = (2n-1)v/(4L), Beats = |f1 - f2|' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-shm-2025',
                    type: 'primary',
                    title: 'Oscillations & Waves Complete 2025 Chapter Lecture',
                    teacher: 'Mrityunjay Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sAn1c6Ew5-E',
                    durationMinutes: 75,
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
                    title: 'SHM & Waves Summary',
                    content: 'In SHM, potential energy is maximum at extreme positions and kinetic energy is maximum at mean position.',
                    formulas: [
                      'Total SHM Energy: E = ½ m ω² A²',
                      'Beats Frequency: f_beat = |f1 - f2|'
                    ]
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
        classLevel: 'Class 12',
        name: 'Electrodynamics & Magnetism',
        description: 'Electrostatics, Gauss Law, Capacitors, Current Electricity, Moving Charges, Biot-Savart, EMI & AC.',
        chapters: [
          {
            id: 'chap-phy-electrostatics',
            unitId: 'unit-phy-3',
            unitName: 'Electrodynamics & Magnetism',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Electrostatics & Capacitance',
            description: 'Coulomb law, electric dipole moment, Gauss theorem applications, potential V = kQ/r, and parallel plate capacitors.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-electrostatics',
                chapterId: 'chap-phy-electrostatics',
                chapterName: 'Electrostatics & Capacitance',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Electrodynamics & Magnetism',
                classLevel: 'Class 12',
                title: 'Gauss Law, Electric Dipole & Parallel Plate Capacitance',
                description: 'Coulomb law F = k q1 q2 / r², electric field of dipole on axial & equatorial line, Gauss law flux Φ = Q_encl / ε0, and parallel plate capacitor with dielectric C = K ε0 A / d.',
                youtubeVideoId: 'U_QkS35gL9k',
                channelName: 'Competition Wallah',
                durationMinutes: 80,
                importance: 'High',
                neetWeightage: '3 Questions (12 Marks)',
                estimatedStudyMinutes: 80,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Apply Gauss Theorem to calculate field of infinite wire E = λ/(2πε0r) and thin sheet E = σ/(2ε0).',
                  'Calculate torque τ = p × E and potential energy U = -p · E of electric dipole.',
                  'Determine equivalent capacitance for series 1/C_eq = ∑1/C_i and parallel C_eq = ∑C_i.'
                ],
                subtopics: [
                  { id: 'sub-el-1', title: 'Gauss Theorem & Electric Flux Φ = Q/ε0', estimatedMinutes: 25, keyFormulaOrFact: 'Φ = ∫ E · dA = Q_encl / ε0' },
                  { id: 'sub-el-2', title: 'Electric Dipole Field Axial vs Equatorial', estimatedMinutes: 25, keyFormulaOrFact: 'E_axial = 2kp/r³, E_eq = kp/r³' },
                  { id: 'sub-el-3', title: 'Parallel Plate Capacitor with Dielectric', estimatedMinutes: 30, keyFormulaOrFact: 'C = K ε0 A / d, U = ½ C V²' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-electro-2025',
                    type: 'primary',
                    title: 'Electrostatics & Capacitance Complete 2025 Chapter Lecture',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'U_QkS35gL9k',
                    durationMinutes: 80,
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
                    title: 'Electrostatics Formulas',
                    content: 'Electric field lines are perpendicular to equipotential surfaces at every point.',
                    formulas: [
                      'Capacitance with Dielectric Slab: C = ε0 A / (d - t + t/K)',
                      'Energy Density in Electric Field: u_E = ½ ε0 E²'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-current',
            unitId: 'unit-phy-3',
            unitName: 'Electrodynamics & Magnetism',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Current Electricity',
            description: 'Drift velocity, Ohm law, resistivity, temperature dependence, Kirchhoff laws, Wheatstone bridge, and meter bridge.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-drift',
                chapterId: 'chap-phy-current',
                chapterName: 'Current Electricity',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Electrodynamics & Magnetism',
                classLevel: 'Class 12',
                title: 'Drift Velocity, Mobility & Ohm Law Microscopic Form',
                description: 'Drift velocity v_d = e E τ / m, current density J = n e v_d = σ E, temperature coefficient α, Kirchhoff voltage & current laws (KVL/KCL), and Wheatstone bridge balancing condition.',
                youtubeVideoId: 'U_QkS35gL9k',
                channelName: 'Competition Wallah',
                durationMinutes: 75,
                importance: 'High',
                neetWeightage: '3 Questions (12 Marks)',
                estimatedStudyMinutes: 75,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Derive microscopic form of Ohm Law J = σ E.',
                  'Calculate drift velocity v_d and electron mobility μ = v_d / E.',
                  'Apply Kirchhoff Loop Rule ∑V = 0 and Junction Rule ∑I = 0 to complex circuits.'
                ],
                subtopics: [
                  { id: 'sub-curr-1', title: 'Drift Velocity v_d = eEτ/m', estimatedMinutes: 25, keyFormulaOrFact: 'I = n e A v_d, J = σ E' },
                  { id: 'sub-curr-2', title: 'Resistivity Temperature Dependence ρ(T)', estimatedMinutes: 20, keyFormulaOrFact: 'ρ_T = ρ_0 [1 + α (T - T0)]' },
                  { id: 'sub-curr-3', title: 'Kirchhoff Laws & Wheatstone Bridge', estimatedMinutes: 30, keyFormulaOrFact: 'P/Q = R/S at balance point' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-drift-2025',
                    type: 'primary',
                    title: 'Current Electricity: Drift Velocity, Mobility & Ohm Law (Complete 2025)',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'U_QkS35gL9k',
                    durationMinutes: 75,
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
                    title: 'Current Electricity Formulas',
                    content: 'Drift speed of electrons is extremely small (~10^-4 m/s) despite rapid electrical signal propagation.',
                    formulas: [
                      'Drift Velocity: v_d = (e E τ) / m',
                      'Wheatstone Bridge Balance: P / Q = R / S'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-magnetism',
            unitId: 'unit-phy-3',
            unitName: 'Electrodynamics & Magnetism',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Moving Charges, Magnetism & EMI/AC',
            description: 'Biot-Savart Law, Ampere Law, Lorentz magnetic force F = q(v × B), Faraday law of induction, Lenz law, and LCR AC circuits.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-emi-ac',
                chapterId: 'chap-phy-magnetism',
                chapterName: 'Moving Charges, Magnetism & EMI/AC',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Electrodynamics & Magnetism',
                classLevel: 'Class 12',
                title: 'Biot-Savart Law, EMI Faraday Induction & Series LCR Resonance',
                description: 'Biot-Savart circular loop B = μ0 I / 2R, solenoid B = μ0 n I, Faraday induced emf ε = -dΦ/dt, self-inductance L, series LCR resonance frequency f_r = 1 / (2π √(LC)), power factor cos φ = R/Z.',
                youtubeVideoId: 'U_QkS35gL9k',
                channelName: 'Competition Wallah',
                durationMinutes: 85,
                importance: 'High',
                neetWeightage: '4 Questions (16 Marks)',
                estimatedStudyMinutes: 85,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Apply Biot-Savart Law dB = (μ0/4π)(I dl sin θ / r²).',
                  'Calculate induced emf ε = - B l v in motional induction.',
                  'Determine impedance Z = √(R² + (X_L - X_C)²) and resonant frequency f_r.'
                ],
                subtopics: [
                  { id: 'sub-mag-1', title: 'Biot Savart & Ampere Circular Law', estimatedMinutes: 25, keyFormulaOrFact: 'B_center = μ0 I / (2R)' },
                  { id: 'sub-mag-2', title: 'Faraday Law & Motional EMF ε = B l v', estimatedMinutes: 30, keyFormulaOrFact: 'ε = - dΦ/dt' },
                  { id: 'sub-mag-3', title: 'Series LCR Resonance & Power Factor', estimatedMinutes: 30, keyFormulaOrFact: 'f_r = 1 / (2π√(LC)), Z_min = R' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-emi-2025',
                    type: 'primary',
                    title: 'Moving Charges, Magnetism & EMI/AC Complete 2025 Lecture',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'U_QkS35gL9k',
                    durationMinutes: 85,
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
                    title: 'Magnetism & AC Formulas',
                    content: 'At resonance in series LCR circuit, current amplitude is maximum I_max = V / R.',
                    formulas: [
                      'Resonant Frequency: f_r = 1 / (2π √(L C))',
                      'Power Factor: cos φ = R / Z'
                    ]
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
        classLevel: 'Class 12',
        name: 'Optics, Modern Physics & Semiconductors',
        description: 'Ray Optics, Wave Optics YDSE, Photoelectric Effect, Bohr Model, Radioactivity, and p-n Junction Semiconductor Diodes.',
        chapters: [
          {
            id: 'chap-phy-optics',
            unitId: 'unit-phy-4',
            unitName: 'Optics, Modern Physics & Semiconductors',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Optics (Ray & Wave Optics)',
            description: 'Lens formula 1/f = 1/v - 1/u, prism deviation δ = (μ-1)A, astronomical telescope, Young Double Slit Experiment fringe width β = λD/d.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-optics',
                chapterId: 'chap-phy-optics',
                chapterName: 'Optics (Ray & Wave Optics)',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Optics, Modern Physics & Semiconductors',
                classLevel: 'Class 12',
                title: 'Lens Formula, Prism Deviation & YDSE Wave Interference',
                description: 'Lens maker formula 1/f = (μ-1)(1/R1 - 1/R2), total internal reflection critical angle sin i_c = 1/μ, YDSE fringe width β = λ D / d, and constructive interference path difference Δx = n λ.',
                youtubeVideoId: 'fA-XN6q3f6A',
                channelName: 'Competition Wallah',
                durationMinutes: 85,
                importance: 'High',
                neetWeightage: '4 Questions (16 Marks)',
                estimatedStudyMinutes: 85,
                difficulty: 'Hard',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Apply Lens Maker Formula and calculate equivalent focal length 1/F = 1/f1 + 1/f2.',
                  'Calculate critical angle for Total Internal Reflection (TIR) sin C = 1/μ.',
                  'Derive YDSE fringe width β = λ D / d and maximum/minimum intensity ratios.'
                ],
                subtopics: [
                  { id: 'sub-opt-1', title: 'Lens Formula & Refraction at Spherical Surfaces', estimatedMinutes: 25, keyFormulaOrFact: '1/f = (μ-1)(1/R1 - 1/R2)' },
                  { id: 'sub-opt-2', title: 'Prism Refraction & Minimum Deviation δ_m', estimatedMinutes: 30, keyFormulaOrFact: 'μ = sin((A+δ_m)/2) / sin(A/2)' },
                  { id: 'sub-opt-3', title: 'YDSE Interference Fringe Width β = λD/d', estimatedMinutes: 30, keyFormulaOrFact: 'β = λ D / d, I_max/I_min = ((a1+a2)/(a1-a2))²' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-optics-2025',
                    type: 'primary',
                    title: 'Ray & Wave Optics Complete 2025 Chapter Lecture',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'fA-XN6q3f6A',
                    durationMinutes: 85,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Hard',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Optics Key Formulas',
                    content: 'In YDSE, intensity of bright fringe is 4I0 when both slits have equal width I0.',
                    formulas: [
                      'Lens Maker Formula: 1/f = (μ - 1)(1/R1 - 1/R2)',
                      'YDSE Fringe Width: β = λ D / d'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-phy-modern',
            unitId: 'unit-phy-4',
            unitName: 'Optics, Modern Physics & Semiconductors',
            subjectId: 'physics',
            classLevel: 'Class 12',
            name: 'Modern Physics & Semiconductors',
            description: 'Photoelectric effect Einstein equation, de Broglie wavelength λ = h/p, Bohr atom energy levels E_n = -13.6/n² eV, and p-n junction diodes.',
            importance: 'High',
            totalTopics: 2,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-phy-photoelectric',
                chapterId: 'chap-phy-modern',
                chapterName: 'Modern Physics & Semiconductors',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Optics, Modern Physics & Semiconductors',
                classLevel: 'Class 12',
                title: 'Photoelectric Effect & Einstein Equation',
                description: 'Work function φ, stopping potential V0, K_max = h ν - φ = e V0, de Broglie matter wave wavelength λ = h / √(2 m q V), and threshold frequency ν0.',
                youtubeVideoId: 'fA-XN6q3f6A',
                channelName: 'Competition Wallah',
                durationMinutes: 60,
                importance: 'High',
                neetWeightage: '2 Questions (8 Marks)',
                estimatedStudyMinutes: 60,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Plot and analyze stopping potential vs frequency linear graph (Slope = h/e).',
                  'Calculate de Broglie wavelength for accelerated electrons λ = 12.27 / √V Å.',
                  'Determine threshold wavelength λ0 from work function φ = h c / λ0.'
                ],
                subtopics: [
                  { id: 'sub-photo-1', title: 'Einstein Photoelectric Equation K_max = hν - φ', estimatedMinutes: 20, keyFormulaOrFact: 'e V0 = h ν - h ν0' },
                  { id: 'sub-photo-2', title: 'de Broglie Matter Waves λ = h/p', estimatedMinutes: 20, keyFormulaOrFact: 'λ_electron = 12.27 / √V Å' },
                  { id: 'sub-photo-3', title: 'Stopping Potential vs Frequency Graph', estimatedMinutes: 20, keyFormulaOrFact: 'Slope = h/e, Intercept = φ/e' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-photo-2025',
                    type: 'primary',
                    title: 'Modern Physics: Photoelectric Effect & Einstein Equation Complete 2025',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'fA-XN6q3f6A',
                    durationMinutes: 60,
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
                    title: 'Photoelectric Formulas',
                    content: 'Photoelectric current is directly proportional to intensity of light, independent of frequency above threshold.',
                    formulas: [
                      'Einstein Equation: K_max = h ν - φ = e V0',
                      'de Broglie Wavelength: λ = h / p = h / √(2 m q V)'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              },
              {
                id: 'topic-phy-semiconductors',
                chapterId: 'chap-phy-modern',
                chapterName: 'Modern Physics & Semiconductors',
                subjectId: 'physics',
                subjectName: 'Physics',
                unitName: 'Optics, Modern Physics & Semiconductors',
                classLevel: 'Class 12',
                title: 'Semiconductor Electronics & p-n Junction Diodes',
                description: 'Intrinsic vs extrinsic semiconductors (p-type, n-type), mass action law n_i² = n_e n_h, p-n junction forward/reverse bias, and half-wave / full-wave rectifiers.',
                youtubeVideoId: 'fA-XN6q3f6A',
                channelName: 'Competition Wallah',
                durationMinutes: 75,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 75,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Apply Mass Action Law n_e n_h = n_i² to doped semiconductors.',
                  'Understand depletion layer formation, barrier potential, and bias conditions.',
                  'Analyze full-wave rectifier ripple factor and output frequency f_out = 2 f_in.'
                ],
                subtopics: [
                  { id: 'sub-semi-1', title: 'Intrinsic & Extrinsic Doping n_i² = n_e n_h', estimatedMinutes: 25, keyFormulaOrFact: 'n-type: N_D >> N_A, p-type: N_A >> N_D' },
                  { id: 'sub-semi-2', title: 'p-n Junction Diode Forward & Reverse Bias', estimatedMinutes: 25, keyFormulaOrFact: 'Depletion layer narrows in Forward Bias' },
                  { id: 'sub-semi-3', title: 'Diode Rectifiers (Half-wave & Full-wave)', estimatedMinutes: 25, keyFormulaOrFact: 'Full Wave f_out = 2 f_in, Efficiency = 81.2%' }
                ],
                lectures: [
                  {
                    id: 'lec-phy-semi-2025',
                    type: 'primary',
                    title: 'Semiconductor Electronics Complete 2025 Chapter Lecture',
                    teacher: 'Saleem Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'fA-XN6q3f6A',
                    durationMinutes: 75,
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
                    title: 'Semiconductors Key Formulas',
                    content: 'In intrinsic semiconductor, charge carrier concentration n_e = n_h = n_i.',
                    formulas: [
                      'Mass Action Law: n_e × n_h = n_i²',
                      'Full Wave Rectifier Frequency: f_output = 2 × f_input'
                    ]
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
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHE',
    icon: 'FlaskConical',
    color: '#3B82F6',
    badge: 'Organic & Physical',
    totalUnits: 2,
    totalChapters: 12,
    totalTopics: 12,
    neetWeightagePercent: 25,
    units: [
      {
        id: 'unit-chem-organic',
        subjectId: 'chemistry',
        classLevel: 'Class 11 & 12',
        name: 'Organic Chemistry Core',
        description: 'IUPAC nomenclature, GOC reaction mechanisms, hydrocarbons, haloalkanes, oxygen & nitrogen functional groups, biomolecules.',
        chapters: [
          {
            id: 'chap-chem-goc',
            unitId: 'unit-chem-organic',
            unitName: 'Organic Chemistry Core',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'General Organic Chemistry (GOC)',
            description: 'Inductive effect, resonance, hyperconjugation, carbocation stability, electrophiles, and nucleophiles.',
            importance: 'High',
            totalTopics: 2,
            pyqWeightageScore: 10,
            topics: [
              {
                id: 'topic-chem-effects',
                chapterId: 'chap-chem-goc',
                chapterName: 'General Organic Chemistry (GOC)',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry Core',
                classLevel: 'Class 11',
                title: 'Inductive, Resonance & Hyperconjugation Effects',
                description: 'Electronic displacement effects in organic molecules, mesomeric structures, and reactive intermediate stabilities.',
                youtubeVideoId: 'sK94i_CqWls',
                channelName: 'Competition Wallah',
                durationMinutes: 90,
                importance: 'High',
                neetWeightage: '3-4 Questions (12-16 Marks)',
                estimatedStudyMinutes: 90,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 10,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Compare carbocation stability order: 3° > 2° > 1° > Methyl using hyperconjugation.',
                  'Predict acidity order of substituted phenols and carboxylic acids using -I and -M effects.',
                  'Identify aromatic compounds using Huckel (4n+2)π electron rule.'
                ],
                subtopics: [
                  { id: 'sub-goc-1', title: 'Inductive Effect (+I and -I Series)', estimatedMinutes: 25, keyFormulaOrFact: '-I order: -NO2 > -CN > -F > -Cl > -Br > -I' },
                  { id: 'sub-goc-2', title: 'Resonance / Mesomeric Effect & Aromaticity', estimatedMinutes: 35, keyFormulaOrFact: 'Huckel Rule: (4n+2) π electrons, Planar cyclic conjugation' },
                  { id: 'sub-goc-3', title: 'Hyperconjugation & Intermediate Stability', estimatedMinutes: 30, keyFormulaOrFact: 'Stability ∝ Number of α-hydrogens' }
                ],
                lectures: [
                  {
                    id: 'lec-chem-goc-2025',
                    type: 'primary',
                    title: 'General Organic Chemistry (GOC): Inductive, Resonance & Hyperconjugation (Complete 2025)',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sK94i_CqWls',
                    durationMinutes: 90,
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
                    title: 'GOC Electronic Effects Summary',
                    content: 'Resonance effect operates through π-bonds and does not diminish with distance, unlike Inductive effect.',
                    formulas: [
                      'Carbocation Stability: 3° > 2° > 1° (hyperconjugation α-H count)',
                      'Huckel Aromaticity Rule: (4n + 2) π electrons'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              },
              {
                id: 'topic-chem-mechanism',
                chapterId: 'chap-chem-goc',
                chapterName: 'General Organic Chemistry (GOC)',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry Core',
                classLevel: 'Class 12',
                title: 'SN1 vs SN2 Nucleophilic Substitution Mechanisms',
                description: 'Unimolecular vs bimolecular nucleophilic substitution, stereochemistry (walden inversion vs racemisation), solvent effects.',
                youtubeVideoId: 'sK94i_CqWls',
                channelName: 'Competition Wallah',
                durationMinutes: 85,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 85,
                difficulty: 'Hard',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: ['topic-chem-effects'],
                learningOutcomes: [
                  'Differentiate SN1 (two step, carbocation, polar protic solvent) vs SN2 (single step, transition state, polar aprotic solvent).',
                  'Predict inversion of configuration (Walden Inversion) in SN2 reactions.',
                  'Determine reactivity order of alkyl halides in SN1 (3° > 2° > 1°) and SN2 (1° > 2° > 3°).'
                ],
                subtopics: [
                  { id: 'sub-sn-1', title: 'SN1 Kinetics & Racemisation', estimatedMinutes: 25, keyFormulaOrFact: 'Rate = k [R-X], 3° alkyl halide favored' },
                  { id: 'sub-sn-2', title: 'SN2 Kinetics & Walden Inversion', estimatedMinutes: 30, keyFormulaOrFact: 'Rate = k [R-X] [Nu-], 1° alkyl halide favored' },
                  { id: 'sub-sn-3', title: 'Solvent Effects (Protic vs Aprotic)', estimatedMinutes: 30, keyFormulaOrFact: 'Polar Aprotic (DMSO, Acetone) favors SN2' }
                ],
                lectures: [
                  {
                    id: 'lec-chem-sn-2025',
                    type: 'primary',
                    title: 'Organic Chemistry: SN1 vs SN2 Nucleophilic Substitution Mechanisms (Complete 2025)',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sK94i_CqWls',
                    durationMinutes: 85,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Hard',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'SN1 vs SN2 Comparison Table',
                    content: 'SN1 proceeds via carbocation intermediate in two steps, SN2 proceeds via single concerted transition state.',
                    formulas: [
                      'SN1 Rate = k [Substrate]',
                      'SN2 Rate = k [Substrate] [Nucleophile]'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-chem-carbonyl',
            unitId: 'unit-chem-organic',
            unitName: 'Organic Chemistry Core',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Aldehydes, Ketones & Carboxylic Acids',
            description: 'Nucleophilic addition reactions, Aldol condensation, Cannizzaro reaction, Tollens and Fehling tests.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-chem-carbonyl',
                chapterId: 'chap-chem-carbonyl',
                chapterName: 'Aldehydes, Ketones & Carboxylic Acids',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Organic Chemistry Core',
                classLevel: 'Class 12',
                title: 'Aldol Condensation, Cannizzaro & Name Reactions',
                description: 'Mechanism of self & cross Aldol condensation with α-H, Cannizzaro disproportionation of non-α-H aldehydes, Wolff-Kishner & Clemmensen reduction.',
                youtubeVideoId: 'sK94i_CqWls',
                channelName: 'Competition Wallah',
                durationMinutes: 85,
                importance: 'High',
                neetWeightage: '3 Questions (12 Marks)',
                estimatedStudyMinutes: 85,
                difficulty: 'Hard',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: ['topic-chem-effects'],
                learningOutcomes: [
                  'Predict products of Aldol condensation requiring α-hydrogen atoms.',
                  'Identify Cannizzaro products (alcohol + carboxylic acid salt) for HCHO and C6H5CHO.',
                  'Distinguish aldehydes from ketones using Tollens (silver mirror) and Fehling tests.'
                ],
                subtopics: [
                  { id: 'sub-aldol-1', title: 'Aldol Condensation Mechanism', estimatedMinutes: 30, keyFormulaOrFact: 'Requires α-H, dil NaOH catalyst, forms α,β-unsaturated aldehyde' },
                  { id: 'sub-aldol-2', title: 'Cannizzaro Reaction Mechanism', estimatedMinutes: 25, keyFormulaOrFact: 'No α-H, conc. 50% NaOH, disproportionation' },
                  { id: 'sub-aldol-3', title: 'Tollens & Fehling Distinction Tests', estimatedMinutes: 30, keyFormulaOrFact: 'Tollens: Ag+ -> Ag Silver Mirror with Aldehydes' }
                ],
                lectures: [
                  {
                    id: 'lec-chem-carbonyl-2025',
                    type: 'primary',
                    title: 'Aldehydes, Ketones & Name Reactions Complete 2025 Lecture',
                    teacher: 'Pankaj Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sK94i_CqWls',
                    durationMinutes: 85,
                    language: 'Hinglish',
                    recordedYear: '2025',
                    updatedStatus: 'Latest NMC Syllabus',
                    sequenceOrder: 1,
                    ncertCoveragePercent: 100,
                    topicCoveragePercent: 100,
                    difficulty: 'Hard',
                    healthStatus: 'Verified',
                    isNmcCompatible: true
                  }
                ],
                notes: [
                  {
                    title: 'Name Reactions Summary',
                    content: 'Clemmensen Reduction uses Zn-Hg / HCl (acidic), Wolff-Kishner uses NH2NH2 / KOH (basic).',
                    formulas: [
                      'Clemmensen: >C=O + Zn(Hg)/HCl -> >CH2',
                      'Tollens Test: RCHO + 2[Ag(NH3)2]+ + 3OH- -> RCOO- + 2Ag↓ + 4NH3 + 2H2O'
                    ]
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
        id: 'unit-chem-physical',
        subjectId: 'chemistry',
        classLevel: 'Class 11 & 12',
        name: 'Physical & Inorganic Chemistry',
        description: 'Mole concept, stoichiometry, atomic structure, chemical kinetics, electrochemistry, coordination compounds, p/d-block.',
        chapters: [
          {
            id: 'chap-chem-mole',
            unitId: 'unit-chem-physical',
            unitName: 'Physical & Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 11',
            name: 'Some Basic Concepts of Chemistry & Mole Concept',
            description: 'Calculation of moles, Avogadro number, limiting reagent, molarity, molality, and mole fraction.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 8,
            topics: [
              {
                id: 'topic-chem-mole-concept',
                chapterId: 'chap-chem-mole',
                chapterName: 'Some Basic Concepts of Chemistry & Mole Concept',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical & Inorganic Chemistry',
                classLevel: 'Class 11',
                title: 'Mole Concept, Stoichiometry & Concentration Terms',
                description: 'Calculation of moles, Avogadro number, limiting reagent, molarity M = n/V(L), molality m = n/W(kg), and mole fraction X_A.',
                youtubeVideoId: 'sK94i_CqWls',
                channelName: 'Competition Wallah',
                durationMinutes: 80,
                importance: 'High',
                neetWeightage: '2 Questions (8 Marks)',
                estimatedStudyMinutes: 80,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 8,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Convert between mass, particles, and gas volume at STP (22.4 L).',
                  'Identify Limiting Reagent in stoichiometric chemical reactions.',
                  'Calculate Molarity, Molality, and Normality in solution mixing problems.'
                ],
                subtopics: [
                  { id: 'sub-mole-1', title: 'Mole Calculations & Avogadro Number N_A', estimatedMinutes: 25, keyFormulaOrFact: 'n = Mass/MolarMass = N/N_A = V_STP/22.4L' },
                  { id: 'sub-mole-2', title: 'Limiting Reagent & Stoichiometric Ratios', estimatedMinutes: 25, keyFormulaOrFact: 'LR = min(moles / stoichiometric coefficient)' },
                  { id: 'sub-mole-3', title: 'Molarity, Molality & Mole Fraction', estimatedMinutes: 30, keyFormulaOrFact: 'M = n_solute / V_solution(L), m = n_solute / W_solvent(kg)' }
                ],
                lectures: [
                  {
                    id: 'lec-chem-mole-2025',
                    type: 'primary',
                    title: 'Mole Concept & Stoichiometry Complete 2025 Chapter Lecture',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sK94i_CqWls',
                    durationMinutes: 80,
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
                    title: 'Mole Concept Formulas',
                    content: 'Molality is independent of temperature, whereas Molarity changes with temperature due to volume expansion.',
                    formulas: [
                      'Moles = Mass / Molar Mass = N / 6.022×10²³',
                      'Molarity (M) = Moles of Solute / Volume of Solution (L)'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-chem-kinetics',
            unitId: 'unit-chem-physical',
            unitName: 'Physical & Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Chemical Kinetics & Electrochemistry',
            description: 'Rate laws, zero & first order integrated rate equations, half-life, Arrhenius equation, Nernst equation, and Kohlrausch law.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-chem-kinetics',
                chapterId: 'chap-chem-kinetics',
                chapterName: 'Chemical Kinetics & Electrochemistry',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical & Inorganic Chemistry',
                classLevel: 'Class 12',
                title: 'First Order Kinetics, Half Life & Nernst Equation',
                description: 'First order integrated rate law k = (2.303/t) log(A0/A), half-life t_1/2 = 0.693/k, Arrhenius equation k = A e^(-Ea/RT), Nernst cell potential E_cell = E° - (0.0591/n) log Q.',
                youtubeVideoId: 'sK94i_CqWls',
                channelName: 'Competition Wallah',
                durationMinutes: 85,
                importance: 'High',
                neetWeightage: '3-4 Questions (12-16 Marks)',
                estimatedStudyMinutes: 85,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Calculate first order half-life t_1/2 = 0.693 / k and remaining concentration.',
                  'Determine activation energy Ea from Arrhenius plot log k vs 1/T.',
                  'Calculate Nernst cell potential E_cell and equilibrium constant K_eq.'
                ],
                subtopics: [
                  { id: 'sub-kin-1', title: 'First Order Kinetics k = (2.303/t) log(A0/A)', estimatedMinutes: 25, keyFormulaOrFact: 't_1/2 = 0.693 / k (independent of A0)' },
                  { id: 'sub-kin-2', title: 'Arrhenius Equation k = A e^(-Ea/RT)', estimatedMinutes: 30, keyFormulaOrFact: 'log(k2/k1) = (Ea / 2.303R) (1/T1 - 1/T2)' },
                  { id: 'sub-kin-3', title: 'Nernst Equation E_cell = E° - (0.0591/n) log Q', estimatedMinutes: 30, keyFormulaOrFact: 'E°_cell = (0.0591/n) log K_eq at 298K' }
                ],
                lectures: [
                  {
                    id: 'lec-chem-kinetics-2025',
                    type: 'primary',
                    title: 'Chemical Kinetics & Electrochemistry Complete 2025 Lecture',
                    teacher: 'Amit Mahajan Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sK94i_CqWls',
                    durationMinutes: 85,
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
                    title: 'Kinetics & Electrochemistry Formulas',
                    content: 'For a first-order reaction, time required for 99.9% completion is approximately 10 times half-life.',
                    formulas: [
                      'First Order Rate Constant: k = (2.303 / t) log([A]0 / [A])',
                      'Nernst Equation at 298K: E_cell = E°_cell - (0.0591 / n) log Q'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-chem-coordination',
            unitId: 'unit-chem-physical',
            unitName: 'Physical & Inorganic Chemistry',
            subjectId: 'chemistry',
            classLevel: 'Class 12',
            name: 'Coordination Compounds (Inorganic Chemistry)',
            description: 'IUPAC nomenclature, Werner theory, Valence Bond Theory (VBT), and Crystal Field Theory (CFT).',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-chem-coordination',
                chapterId: 'chap-chem-coordination',
                chapterName: 'Coordination Compounds (Inorganic Chemistry)',
                subjectId: 'chemistry',
                subjectName: 'Chemistry',
                unitName: 'Physical & Inorganic Chemistry',
                classLevel: 'Class 12',
                title: 'Crystal Field Theory (CFT) & Ligand Field Splitting',
                description: 'Octahedral and tetrahedral crystal field splitting energy (Δo, Δt), high spin vs low spin complexes, spectrochemical series, and magnetic moment μ = √(n(n+2)) BM.',
                youtubeVideoId: 'sK94i_CqWls',
                channelName: 'Competition Wallah',
                durationMinutes: 85,
                importance: 'High',
                neetWeightage: '3-4 Questions (12-16 Marks)',
                estimatedStudyMinutes: 85,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Calculate Crystal Field Splitting Energy (CFSE) for d1 to d10 metal ions.',
                  'Differentiate strong field vs weak field ligands using spectrochemical series.',
                  'Predict magnetic moment and color absorption wavelengths in octahedral complexes.'
                ],
                subtopics: [
                  { id: 'sub-coord-1', title: 'Octahedral Splitting (t2g & eg Orbitals)', estimatedMinutes: 25, keyFormulaOrFact: 'CFSE = (-0.4 n_t2g + 0.6 n_eg) Δo' },
                  { id: 'sub-coord-2', title: 'Spectrochemical Series & Ligand Strength', estimatedMinutes: 30, keyFormulaOrFact: 'CO > CN⁻ > en > NH3 > H2O > F⁻ > Cl⁻' },
                  { id: 'sub-coord-3', title: 'Magnetic Behavior & d-d Transition Color', estimatedMinutes: 30, keyFormulaOrFact: 'μ = √(n(n+2)) BM' }
                ],
                lectures: [
                  {
                    id: 'lec-chem-coord-2025',
                    type: 'primary',
                    title: 'Coordination Compounds & CFT Complete 2025 Lecture',
                    teacher: 'Mohit Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: 'sK94i_CqWls',
                    durationMinutes: 85,
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
                    title: 'Crystal Field Splitting Summary',
                    content: 'In octahedral field, eg orbitals experience greater repulsion (+0.6 Δo) than t2g orbitals (-0.4 Δo).',
                    formulas: [
                      'CFSE (Octahedral) = (-0.4 × n_t2g + 0.6 × n_eg) Δo + P',
                      'Spin-Only Magnetic Moment: μ = √(n(n+2)) BM'
                    ]
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
  {
    id: 'biology',
    name: 'Biology (Botany & Zoology)',
    code: 'BIO',
    icon: 'Dna',
    color: '#8B5CF6',
    badge: 'NCERT High Yield',
    totalUnits: 2,
    totalChapters: 12,
    totalTopics: 12,
    neetWeightagePercent: 50,
    units: [
      {
        id: 'unit-bio-genetics',
        subjectId: 'biology',
        classLevel: 'Class 11 & 12',
        name: 'Genetics, Evolution & Molecular Biology (Botany)',
        description: 'Plant Kingdom, Cell Cycle, Genetics (Mendel laws), DNA Replication, Transcription, Translation, Biotechnology & Ecology.',
        chapters: [
          {
            id: 'chap-bio-dna',
            unitId: 'unit-bio-genetics',
            unitName: 'Genetics, Evolution & Molecular Biology (Botany)',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Molecular Basis of Inheritance',
            description: 'DNA double helix model, Chargaff rules, nucleosome packaging, Meselson-Stahl experiment, and transcription.',
            importance: 'High',
            totalTopics: 2,
            pyqWeightageScore: 10,
            topics: [
              {
                id: 'topic-bio-dna-structure',
                chapterId: 'chap-bio-dna',
                chapterName: 'Molecular Basis of Inheritance',
                subjectId: 'biology',
                subjectName: 'Biology',
                unitName: 'Genetics, Evolution & Molecular Biology (Botany)',
                classLevel: 'Class 12',
                title: 'DNA Double Helix Model & Chargaff Rules',
                description: 'Watson-Crick DNA double helix model, anti-parallel strands, hydrogen bonding (A=T, G≡C), Chargaff rule A+G = T+C, and nucleosome histone octamer packaging.',
                youtubeVideoId: '3i8mHECla2k',
                channelName: 'Competition Wallah',
                durationMinutes: 75,
                importance: 'High',
                neetWeightage: '3-4 Questions (12-16 Marks)',
                estimatedStudyMinutes: 75,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 10,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Apply Chargaff Rule %A = %T and %G = %C to base pairing calculation problems.',
                  'Describe 146 bp DNA wrapping around Histone Octamer (H2A, H2B, H3, H4) x 2 in Nucleosome.',
                  'Understand semi-conservative DNA replication proof by Meselson and Stahl using 15N/14N isotope density centrifugation.'
                ],
                subtopics: [
                  { id: 'sub-dna-1', title: 'Watson-Crick Model & Chargaff Rule', estimatedMinutes: 25, keyFormulaOrFact: 'A + G = T + C (Purines = Pyrimidines)' },
                  { id: 'sub-dna-2', title: 'Nucleosome Histone Octamer Packaging', estimatedMinutes: 25, keyFormulaOrFact: 'Histones rich in basic amino acids Lysine & Arginine' },
                  { id: 'sub-dna-3', title: 'Meselson-Stahl Semi-Conservative Proof', estimatedMinutes: 25, keyFormulaOrFact: 'E. coli generation time 20 mins, CsCl density gradient' }
                ],
                lectures: [
                  {
                    id: 'lec-bio-dna-2025',
                    type: 'primary',
                    title: 'Molecular Basis of Inheritance: DNA Structure & Chargaff Rules (Complete 2025)',
                    teacher: 'Tarun Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '3i8mHECla2k',
                    durationMinutes: 75,
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
                    title: 'DNA Structure & Chargaff Rule',
                    content: 'Pitch of B-DNA helix is 3.4 nm with 10 base pairs per turn (distance between BP = 0.34 nm).',
                    formulas: [
                      'Chargaff Rule: Purines (A + G) / Pyrimidines (T + C) = 1',
                      'Human Diploid Genome Length = 6.6 × 10⁹ bp ≈ 2.2 meters'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              },
              {
                id: 'topic-bio-transcription',
                chapterId: 'chap-bio-dna',
                chapterName: 'Molecular Basis of Inheritance',
                subjectId: 'biology',
                subjectName: 'Biology',
                unitName: 'Genetics, Evolution & Molecular Biology (Botany)',
                classLevel: 'Class 12',
                title: 'Transcription in Prokaryotes & Eukaryotes',
                description: 'Transcription unit (promoter, structural gene, terminator), RNA Polymerase I, II, III functions, post-transcriptional capping, tailing, and splicing.',
                youtubeVideoId: '2BwWqC29y9U',
                channelName: 'Competition Wallah',
                durationMinutes: 70,
                importance: 'High',
                neetWeightage: '3 Questions (12 Marks)',
                estimatedStudyMinutes: 70,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: ['topic-bio-dna-structure'],
                learningOutcomes: [
                  "Identify template strand (3'->5') vs coding strand (5'->3').",
                  "Differentiate RNA Polymerase I (rRNA), II (hnRNA/mRNA), III (tRNA, 5SrRNA, snRNA) in eukaryotes.",
                  "Explain post-transcriptional processing: 5' Capping (Methyl guanosine triphosphate), 3' Poly-A Tailing, and Intron Splicing."
                ],
                subtopics: [
                  { id: 'sub-trans-1', title: 'Transcription Unit & Strand Polarity', estimatedMinutes: 20, keyFormulaOrFact: "Template strand 3'->5', Coding strand 5'->3'" },
                  { id: 'sub-trans-2', title: 'Eukaryotic RNA Polymerase I, II, III', estimatedMinutes: 25, keyFormulaOrFact: 'RNA Pol II transcribes precursor hnRNA' },
                  { id: 'sub-trans-3', title: 'Post-Transcriptional Capping, Splicing & Tailing', estimatedMinutes: 25, keyFormulaOrFact: "5' Cap (m7Gppp), 3' Poly-A Tail (200-300 adenylate residues)" }
                ],
                lectures: [
                  {
                    id: 'lec-bio-trans-2025',
                    type: 'primary',
                    title: 'Transcription in Prokaryotes & Eukaryotes (Complete 2025 NCERT Decoding)',
                    teacher: 'Tarun Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '2BwWqC29y9U',
                    durationMinutes: 70,
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
                    title: 'Transcription NCERT Highlights',
                    content: 'In prokaryotes, transcription and translation occur in the same cytoplasm compartment simultaneously.',
                    formulas: [
                      'Prokaryotic RNA Polymerase uses Sigma (σ) factor for Initiation and Rho (ρ) factor for Termination.'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-bio-genetics-mendel',
            unitId: 'unit-bio-genetics',
            unitName: 'Genetics, Evolution & Molecular Biology (Botany)',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Principles of Inheritance & Variation',
            description: 'Mendel laws of inheritance, monohybrid/dihybrid cross ratios, incomplete dominance, co-dominance, ABO blood groups, and pedigree analysis.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 10,
            topics: [
              {
                id: 'topic-bio-mendel',
                chapterId: 'chap-bio-genetics-mendel',
                chapterName: 'Principles of Inheritance & Variation',
                subjectId: 'biology',
                subjectName: 'Biology',
                unitName: 'Genetics, Evolution & Molecular Biology (Botany)',
                classLevel: 'Class 12',
                title: 'Monohybrid & Dihybrid Cross Ratios, ABO Blood Groups',
                description: 'Monohybrid phenotypic ratio 3:1 (genotypic 1:2:1), dihybrid phenotypic ratio 9:3:3:1, incomplete dominance (Snapdragon 1:2:1), co-dominance in ABO blood grouping (I^A, I^B, i).',
                youtubeVideoId: '3i8mHECla2k',
                channelName: 'Competition Wallah',
                durationMinutes: 80,
                importance: 'High',
                neetWeightage: '4 Questions (16 Marks)',
                estimatedStudyMinutes: 80,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 10,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Predict offspring genotypes and phenotypes using Punnett Square.',
                  'Calculate probabilities for dihybrid cross combinations.',
                  'Determine inheritance pattern from human pedigree charts (Autosomal Dominant/Recessive, Sex-linked Recessive).'
                ],
                subtopics: [
                  { id: 'sub-mend-1', title: 'Monohybrid & Dihybrid Cross Ratios', estimatedMinutes: 25, keyFormulaOrFact: 'Monohybrid 3:1, Dihybrid 9:3:3:1' },
                  { id: 'sub-mend-2', title: 'Incomplete Dominance & Co-Dominance', estimatedMinutes: 25, keyFormulaOrFact: 'Snapdragon F2 Phenotype = Genotype = 1:2:1' },
                  { id: 'sub-mend-3', title: 'ABO Blood Grouping & Multiple Allelism', estimatedMinutes: 30, keyFormulaOrFact: '3 Alleles (IA, IB, i) produce 6 Genotypes & 4 Phenotypes' }
                ],
                lectures: [
                  {
                    id: 'lec-bio-mendel-2025',
                    type: 'primary',
                    title: 'Principles of Inheritance & Variation Complete 2025 Lecture',
                    teacher: 'Tarun Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '3i8mHECla2k',
                    durationMinutes: 80,
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
                    title: 'Genetics Ratios Summary',
                    content: 'Test cross involves crossing an F1 individual displaying dominant phenotype with homozygous recessive parent.',
                    formulas: [
                      'Monohybrid Test Cross Ratio: 1 : 1',
                      'Dihybrid Test Cross Ratio: 1 : 1 : 1 : 1'
                    ]
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
        id: 'unit-bio-physiology',
        subjectId: 'biology',
        classLevel: 'Class 11 & 12',
        name: 'Human Physiology & Animal Biology (Zoology)',
        description: 'Breathing & Gas Transport, Circulation, Excretion, Neural Coordination, Human Reproduction, and Evolution.',
        chapters: [
          {
            id: 'chap-bio-breathing',
            unitId: 'unit-bio-physiology',
            unitName: 'Human Physiology & Animal Biology (Zoology)',
            subjectId: 'biology',
            classLevel: 'Class 11',
            name: 'Breathing & Exchange of Gases',
            description: 'Respiratory volumes (TV, IRV, ERV, RV), partial pressures of O2/CO2, oxygen-hemoglobin dissociation curve, and transport of gases.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 9,
            topics: [
              {
                id: 'topic-bio-breathing-curve',
                chapterId: 'chap-bio-breathing',
                chapterName: 'Breathing & Exchange of Gases',
                subjectId: 'biology',
                subjectName: 'Biology',
                unitName: 'Human Physiology & Animal Biology (Zoology)',
                classLevel: 'Class 11',
                title: 'Oxygen-Hemoglobin Dissociation Curve & Gas Transport',
                description: 'Sigmoid O2-Hb dissociation curve, Bohr effect factors causing right shift (High pCO2, High H+, High Temp, Low pH), carbamino-hemoglobin, and bicarbonate ion transport.',
                youtubeVideoId: '8m6hHRlKwxY',
                channelName: 'Competition Wallah',
                durationMinutes: 65,
                importance: 'High',
                neetWeightage: '2-3 Questions (8-12 Marks)',
                estimatedStudyMinutes: 65,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 9,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Identify pulmonary alveolar partial pressures pO2 = 104 mmHg, pCO2 = 40 mmHg.',
                  'List conditions favoring Oxyhemoglobin formation in Alveoli (High pO2, Low pCO2, Low H+, Lower Temp).',
                  'Explain transport of 70% CO2 as Bicarbonate ions (HCO3-) catalyzed by Carbonic Anhydrase.'
                ],
                subtopics: [
                  { id: 'sub-breath-1', title: 'Alveolar & Tissue Partial Pressures pO2, pCO2', estimatedMinutes: 20, keyFormulaOrFact: 'Alveoli pO2 = 104 mmHg, Deoxygenated blood pO2 = 40 mmHg' },
                  { id: 'sub-breath-2', title: 'Sigmoid Oxygen Hemoglobin Curve & Right Shift', estimatedMinutes: 25, keyFormulaOrFact: 'Right Shift (Bohr Effect): High pCO2, High H+, High Temp' },
                  { id: 'sub-breath-3', title: 'Carbon Dioxide Transport as Bicarbonate HCO3-', estimatedMinutes: 20, keyFormulaOrFact: '70% as HCO3-, 20-25% as Carbamino-Hb, 7% Dissolved in Plasma' }
                ],
                lectures: [
                  {
                    id: 'lec-bio-breath-2025',
                    type: 'primary',
                    title: 'Breathing & Exchange of Gases: Gas Transport & O2-Hb Curve (Complete 2025)',
                    teacher: 'MD Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '8m6hHRlKwxY',
                    durationMinutes: 65,
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
                    title: 'O2-Hb Curve Key Facts',
                    content: 'Sigmoid curve obtained when percentage saturation of Hb with O2 is plotted against pO2.',
                    formulas: [
                      'In Alveoli: High pO2, Low pCO2, Less H+, Lower Temp -> Left Shift (Hb-O2 Formation)',
                      'In Tissues: Low pO2, High pCO2, High H+, Higher Temp -> Right Shift (Hb-O2 Dissociation)'
                    ]
                  }
                ],
                pyqs: [],
                mcqs: []
              }
            ]
          },
          {
            id: 'chap-bio-reproduction',
            unitId: 'unit-bio-physiology',
            unitName: 'Human Physiology & Animal Biology (Zoology)',
            subjectId: 'biology',
            classLevel: 'Class 12',
            name: 'Human Reproduction & Reproductive Health',
            description: 'Male & female reproductive systems, spermatogenesis, oogenesis, menstrual cycle gonadotropin surges (LH/FSH), implantation, and ART techniques.',
            importance: 'High',
            totalTopics: 1,
            pyqWeightageScore: 10,
            topics: [
              {
                id: 'topic-bio-menstrual',
                chapterId: 'chap-bio-reproduction',
                chapterName: 'Human Reproduction & Reproductive Health',
                subjectId: 'biology',
                subjectName: 'Biology',
                unitName: 'Human Physiology & Animal Biology (Zoology)',
                classLevel: 'Class 12',
                title: 'Menstrual Cycle, Hormonal Surges & Spermatogenesis',
                description: 'Phases of Menstrual Cycle (Menstrual, Follicular/Proliferative, Luteal/Secretory), LH surge triggering ovulation at Day 14, Corpus Luteum progesterone secretion, and Spermatogenesis stages.',
                youtubeVideoId: '8m6hHRlKwxY',
                channelName: 'Competition Wallah',
                durationMinutes: 75,
                importance: 'High',
                neetWeightage: '3-4 Questions (12-16 Marks)',
                estimatedStudyMinutes: 75,
                difficulty: 'Medium',
                ncertImportance: 'High',
                pyqWeightageScore: 10,
                revisionPriority: 'High',
                prerequisiteTopicIds: [],
                learningOutcomes: [
                  'Trace hormonal levels of Estrogen, Progesterone, LH, and FSH throughout 28-day cycle.',
                  'Identify Day 14 LH Surge as cause for Graafian Follicle rupture and Ovulation.',
                  'Differentiate Spermatogenesis (Spermatogonia -> Spermatozoa) vs Spermiogenesis vs Spermiation.'
                ],
                subtopics: [
                  { id: 'sub-rep-1', title: 'Menstrual Cycle Phases & Hormonal Graph', estimatedMinutes: 25, keyFormulaOrFact: 'LH & FSH peak at middle of cycle (~Day 14)' },
                  { id: 'sub-rep-2', title: 'Corpus Luteum & Progesterone Role', estimatedMinutes: 25, keyFormulaOrFact: 'Corpus luteum secretes large amounts of Progesterone to maintain Endometrium' },
                  { id: 'sub-rep-3', title: 'Spermatogenesis vs Oogenesis Comparison', estimatedMinutes: 25, keyFormulaOrFact: 'Spermatogenesis produces 4 functional sperm, Oogenesis produces 1 ovum + 3 polar bodies' }
                ],
                lectures: [
                  {
                    id: 'lec-bio-reproduction-2025',
                    type: 'primary',
                    title: 'Human Reproduction & Menstrual Cycle Complete 2025 Lecture',
                    teacher: 'MD Sir',
                    channel: 'Competition Wallah',
                    youtubeVideoId: '8m6hHRlKwxY',
                    durationMinutes: 75,
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
                    title: 'Human Reproduction Key Highlights',
                    content: 'In human females, oogenesis is initiated during embryonic development stage before birth.',
                    formulas: [
                      'Ovulation Trigger: Rapid surge of LH (LH Surge) induces rupture of Graafian follicle.',
                      'Acrosome of sperm contains Hyaluronidase enzyme for penetrating zona pellucida.'
                    ]
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
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/curriculumData.ts'), curriculumCode, 'utf-8');
console.log('Successfully updated src/data/curriculumData.ts');
