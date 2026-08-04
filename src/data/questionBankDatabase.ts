import { QuestionItem } from '../types/practiceEngine';

export const COMPREHENSIVE_NEET_QUESTION_BANK: QuestionItem[] = [
  // ==================== PHYSICS ====================
  {
    id: 'phy-q1',
    subjectId: 'physics',
    chapterName: 'System of Particles & Rotational Motion',
    topicTitle: 'Moment of Inertia',
    question: 'A thin uniform ring of mass M and radius R rotates about its central axis. What is its moment of inertia about any axis tangential to its surface and parallel to its diameter?',
    options: [
      { id: 'a', text: '(3/2) M R²' },
      { id: 'b', text: '(1/2) M R²' },
      { id: 'c', text: 'M R²' },
      { id: 'd', text: '(5/4) M R²' }
    ],
    correctAnswerId: 'a',
    explanation: 'By perpendicular axis theorem, moment of inertia about diameter is I_dia = (1/2) M R². By parallel axis theorem, I_tangent = I_dia + M R² = (1/2) M R² + M R² = (3/2) M R².',
    ncertReference: 'NCERT Class 11 Physics, Chapter 7 (System of Particles), Page 164',
    difficulty: 'Medium',
    timeEstimateSeconds: 60,
    tags: ['Moment of Inertia', 'Parallel Axis Theorem', 'Formula Numerical'],
    conceptId: 'rotational-moi-parallel',
    questionType: 'numerical'
  },
  {
    id: 'phy-q2',
    subjectId: 'physics',
    chapterName: 'Thermodynamics',
    topicTitle: 'Thermodynamic Processes',
    question: 'Given below are two statements:\nStatement I: In an isothermal process, the internal energy of an ideal gas remains constant.\nStatement II: In an adiabatic process, heat transfer between the system and surroundings is strictly zero.',
    options: [
      { id: 'a', text: 'Both Statement I and Statement II are correct.' },
      { id: 'b', text: 'Both Statement I and Statement II are incorrect.' },
      { id: 'c', text: 'Statement I is correct but Statement II is incorrect.' },
      { id: 'd', text: 'Statement I is incorrect but Statement II is correct.' }
    ],
    correctAnswerId: 'a',
    explanation: 'Statement I is correct because for an ideal gas U depends solely on temperature T, and in an isothermal process delta T = 0 => delta U = 0. Statement II is correct because adiabatic process means Q = 0.',
    ncertReference: 'NCERT Class 11 Physics, Chapter 12 (Thermodynamics), Page 308',
    difficulty: 'Easy',
    timeEstimateSeconds: 45,
    tags: ['Thermodynamics', 'Statement Based', 'Isothermal vs Adiabatic'],
    conceptId: 'thermo-processes',
    questionType: 'statement_based',
    statement1Text: 'In an isothermal process, the internal energy of an ideal gas remains constant.',
    statement2Text: 'In an adiabatic process, heat transfer between the system and surroundings is strictly zero.'
  },
  {
    id: 'phy-q3',
    subjectId: 'physics',
    chapterName: 'Ray Optics and Optical Instruments',
    topicTitle: 'Refraction through Prism',
    question: 'Assertion (A): A ray of monochromatic light passing through an equilateral glass prism undergoes minimum deviation when the angle of incidence equals the angle of emergence.\nReason (R): At minimum deviation, the refracted ray inside the prism travels parallel to the base of the prism.',
    options: [
      { id: 'a', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A).' },
      { id: 'b', text: 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A).' },
      { id: 'c', text: '(A) is true but (R) is false.' },
      { id: 'd', text: '(A) is false but (R) is true.' }
    ],
    correctAnswerId: 'a',
    explanation: 'At minimum deviation i = e and r1 = r2 = A/2. The ray inside the equilateral prism becomes parallel to its base because of symmetry.',
    ncertReference: 'NCERT Class 12 Physics, Chapter 9 (Ray Optics), Page 331',
    difficulty: 'Medium',
    timeEstimateSeconds: 60,
    tags: ['Prism', 'Assertion Reason', 'Minimum Deviation'],
    conceptId: 'optics-prism-min-dev',
    questionType: 'assertion_reason',
    assertionText: 'A ray of monochromatic light passing through an equilateral glass prism undergoes minimum deviation when the angle of incidence equals the angle of emergence.',
    reasonText: 'At minimum deviation, the refracted ray inside the prism travels parallel to the base of the prism.'
  },
  {
    id: 'phy-q4',
    subjectId: 'physics',
    chapterName: 'Electrostatics & Electric Potential',
    topicTitle: 'Capacitance & Energy Stored',
    question: 'A parallel plate capacitor with air between plates has a capacitance C. When a dielectric slab of dielectric constant K = 5 is inserted to completely fill the space, and the capacitor remains connected to a battery of voltage V, the energy stored in the capacitor changes by a factor of:',
    options: [
      { id: 'a', text: 'Increases by 5 times' },
      { id: 'b', text: 'Decreases by 5 times' },
      { id: 'c', text: 'Remains unchanged' },
      { id: 'd', text: 'Increases by 25 times' }
    ],
    correctAnswerId: 'a',
    explanation: 'Initial energy U1 = (1/2) C V². When dielectric K=5 is inserted and battery remains connected, voltage V stays constant, new capacitance C2 = K C = 5 C. New energy U2 = (1/2) (5 C) V² = 5 U1.',
    ncertReference: 'NCERT Class 12 Physics, Chapter 2 (Electrostatic Potential), Page 78',
    difficulty: 'Medium',
    timeEstimateSeconds: 50,
    tags: ['Capacitors', 'Dielectric', 'Energy Stored'],
    conceptId: 'electro-cap-dielectric',
    questionType: 'numerical'
  },
  {
    id: 'phy-pyq-2025-1',
    subjectId: 'physics',
    chapterName: 'Current Electricity',
    topicTitle: 'Wheatstone Bridge & Meter Bridge',
    question: 'In a meter bridge experiment, a resistance of 10 ohms is connected in the left gap and an unknown resistance R is in the right gap. The null point is found at 40 cm from the left end. What is the value of R?',
    options: [
      { id: 'a', text: '15 ohms' },
      { id: 'b', text: '6.67 ohms' },
      { id: 'c', text: '25 ohms' },
      { id: 'd', text: '10 ohms' }
    ],
    correctAnswerId: 'a',
    explanation: 'Meter bridge balancing condition: P / Q = l / (100 - l) => 10 / R = 40 / 60 = 2 / 3 => R = 10 * (3 / 2) = 15 ohms.',
    ncertReference: 'NCERT Class 12 Physics, Chapter 3, Page 120 (NEET 2025)',
    difficulty: 'Easy',
    timeEstimateSeconds: 40,
    tags: ['Meter Bridge', 'NEET 2025 PYQ', 'Current Electricity'],
    conceptId: 'curr-meter-bridge',
    questionType: 'mcq',
    year: 2025,
    isPyq: true
  },
  {
    id: 'phy-pyq-2024-1',
    subjectId: 'physics',
    chapterName: 'Moving Charges & Magnetism',
    topicTitle: 'Magnetic Field due to Current',
    question: 'A circular coil of radius R carries a steady current I. The ratio of the magnetic field at the center of the coil to the magnetic field at an axial point distance R from the center is:',
    options: [
      { id: 'a', text: '2√2 : 1' },
      { id: 'b', text: '2 : 1' },
      { id: 'c', text: '√2 : 1' },
      { id: 'd', text: '4 : 1' }
    ],
    correctAnswerId: 'a',
    explanation: 'B_center = (mu_0 I) / (2 R). B_axis = (mu_0 I R²) / [ 2 (R² + x²)^(3/2) ]. For x = R, B_axis = (mu_0 I R²) / [ 2 (2 R²)^(3/2) ] = (mu_0 I) / [ 2 R (2√2) ]. Ratio B_center / B_axis = 2√2 : 1.',
    ncertReference: 'NCERT Class 12 Physics, Chapter 4, Page 146 (NEET 2024)',
    difficulty: 'Medium',
    timeEstimateSeconds: 60,
    tags: ['Magnetic Field', 'Circular Coil', 'NEET 2024 PYQ'],
    conceptId: 'mag-circular-loop',
    questionType: 'mcq',
    year: 2024,
    isPyq: true
  },

  // ==================== CHEMISTRY ====================
  {
    id: 'chem-q1',
    subjectId: 'chemistry',
    chapterName: 'General Organic Chemistry (GOC)',
    topicTitle: 'Inductive & Resonance Effects',
    question: 'Which of the following carbocations is most stable due to maximum hyperconjugation and resonance resonance stabilization?',
    options: [
      { id: 'a', text: '(CH3)3C+ (tert-butyl carbocation)' },
      { id: 'b', text: 'CH2=CH-CH2+ (allyl carbocation)' },
      { id: 'c', text: 'C6H5-CH2+ (benzyl carbocation)' },
      { id: 'd', text: '(C6H5)3C+ (triphenylmethyl carbocation)' }
    ],
    correctAnswerId: 'd',
    explanation: 'The triphenylmethyl (trityl) carbocation (C6H5)3C+ is stabilized by extensive resonance across 3 phenyl rings, making it exceptionally stable.',
    ncertReference: 'NCERT Class 11 Chemistry, Chapter 12 (GOC), Page 345',
    difficulty: 'Medium',
    timeEstimateSeconds: 45,
    tags: ['Carbocation Stability', 'GOC', 'Resonance'],
    conceptId: 'goc-carbocation-stability',
    questionType: 'mcq'
  },
  {
    id: 'chem-q2',
    subjectId: 'chemistry',
    chapterName: 'Chemical Bonding & Molecular Structure',
    topicTitle: 'VSEPR Theory & Molecular Geometry',
    question: 'According to VSEPR theory, match the molecules in Column I with their corresponding shapes in Column II:\nColumn I: A. SF4, B. XeF4, C. ClF3, D. SbCl5\nColumn II: 1. Square planar, 2. See-saw, 3. Trigonal bipyramidal, 4. T-shaped',
    options: [
      { id: 'a', text: 'A-2, B-1, C-4, D-3' },
      { id: 'b', text: 'A-1, B-2, C-3, D-4' },
      { id: 'c', text: 'A-3, B-4, C-1, D-2' },
      { id: 'd', text: 'A-2, B-4, C-1, D-3' }
    ],
    correctAnswerId: 'a',
    explanation: 'SF4 has 4 bond pairs + 1 lone pair = See-saw. XeF4 has 4 bond pairs + 2 lone pairs = Square planar. ClF3 has 3 bond pairs + 2 lone pairs = T-shaped. SbCl5 has 5 bond pairs = Trigonal bipyramidal.',
    ncertReference: 'NCERT Class 11 Chemistry, Chapter 4 (Chemical Bonding), Page 112',
    difficulty: 'Hard',
    timeEstimateSeconds: 60,
    tags: ['VSEPR Theory', 'Molecular Geometry', 'Matching Type'],
    conceptId: 'chem-vsepr-shapes',
    questionType: 'mcq'
  },
  {
    id: 'chem-q3',
    subjectId: 'chemistry',
    chapterName: 'Electrochemistry',
    topicTitle: 'Nernst Equation & EMF',
    question: 'Statement I: Standard Gibbs free energy change (delta G°) for a cell reaction is related to standard EMF (E°cell) by delta G° = -n F E°cell.\nStatement II: A cell reaction is spontaneous under standard conditions if E°cell is negative.',
    options: [
      { id: 'a', text: 'Statement I is correct but Statement II is incorrect.' },
      { id: 'b', text: 'Both Statement I and Statement II are correct.' },
      { id: 'c', text: 'Both Statement I and Statement II are incorrect.' },
      { id: 'd', text: 'Statement I is incorrect but Statement II is correct.' }
    ],
    correctAnswerId: 'a',
    explanation: 'Statement I is correct (delta G° = -n F E°cell). Statement II is incorrect because spontaneity requires delta G° < 0, which means E°cell MUST be POSITIVE, not negative.',
    ncertReference: 'NCERT Class 12 Chemistry, Chapter 3 (Electrochemistry), Page 74',
    difficulty: 'Medium',
    timeEstimateSeconds: 45,
    tags: ['Electrochemistry', 'Gibbs Free Energy', 'Statement Based'],
    conceptId: 'electro-gibbs-emf',
    questionType: 'statement_based',
    statement1Text: 'Standard Gibbs free energy change (delta G°) for a cell reaction is related to standard EMF (E°cell) by delta G° = -n F E°cell.',
    statement2Text: 'A cell reaction is spontaneous under standard conditions if E°cell is negative.'
  },
  {
    id: 'chem-pyq-2025-1',
    subjectId: 'chemistry',
    chapterName: 'Aldehydes, Ketones and Carboxylic Acids',
    topicTitle: 'Aldol Condensation & Cannizzaro Reaction',
    question: 'Which of the following aldehydes will undergo Cannizzaro reaction when treated with 50% NaOH solution?',
    options: [
      { id: 'a', text: 'Benzaldehyde (C6H5CHO)' },
      { id: 'b', text: 'Acetaldehyde (CH3CHO)' },
      { id: 'c', text: 'Propionaldehyde (CH3CH2CHO)' },
      { id: 'd', text: 'Acetone (CH3COCH3)' }
    ],
    correctAnswerId: 'a',
    explanation: 'Cannizzaro reaction is undergone by aldehydes having NO alpha-hydrogen atoms. Benzaldehyde (C6H5CHO) lacks alpha-hydrogens, whereas acetaldehyde and propionaldehyde undergo aldol condensation.',
    ncertReference: 'NCERT Class 12 Chemistry, Chapter 12, Page 370 (NEET 2025)',
    difficulty: 'Easy',
    timeEstimateSeconds: 30,
    tags: ['Cannizzaro Reaction', 'Organic Chemistry', 'NEET 2025 PYQ'],
    conceptId: 'org-cannizzaro',
    questionType: 'chemistry_reaction',
    year: 2025,
    isPyq: true
  },
  {
    id: 'chem-pyq-2024-1',
    subjectId: 'chemistry',
    chapterName: 'p-Block Elements & Coordination Compounds',
    topicTitle: 'Crystal Field Theory & Magnetic Moment',
    question: 'The spin-only magnetic moment value for high spin [Fe(H2O)6]3+ complex ion is (Atomic number of Fe = 26):',
    options: [
      { id: 'a', text: '5.92 BM' },
      { id: 'b', text: '4.90 BM' },
      { id: 'c', text: '3.87 BM' },
      { id: 'd', text: '1.73 BM' }
    ],
    correctAnswerId: 'a',
    explanation: 'Fe = [Ar] 3d6 4s2. Fe3+ = [Ar] 3d5. Water H2O is a weak field ligand, so high spin complex has 5 unpaired electrons (n=5). Spin-only magnetic moment mu = sqrt(n(n+2)) = sqrt(5*7) = sqrt(35) = 5.92 BM.',
    ncertReference: 'NCERT Class 12 Chemistry, Chapter 9, Page 253 (NEET 2024)',
    difficulty: 'Medium',
    timeEstimateSeconds: 50,
    tags: ['Coordination Compounds', 'Magnetic Moment', 'NEET 2024 PYQ'],
    conceptId: 'coord-magnetic-moment',
    questionType: 'mcq',
    year: 2024,
    isPyq: true
  },

  // ==================== BIOLOGY (BOTANY & ZOOLOGY) ====================
  {
    id: 'bio-q1',
    subjectId: 'biology',
    chapterName: 'Cell: The Unit of Life',
    topicTitle: 'Endomembrane System',
    question: 'Assertion (A): Mitochondria and Chloroplasts are semi-autonomous organelles.\nReason (R): Both Mitochondria and Chloroplasts contain their own circular 70S DNA and ribosomes and synthesize some of their own proteins.',
    options: [
      { id: 'a', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A).' },
      { id: 'b', text: 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A).' },
      { id: 'c', text: '(A) is true but (R) is false.' },
      { id: 'd', text: '(A) is false but (R) is true.' }
    ],
    correctAnswerId: 'a',
    explanation: 'Mitochondria and chloroplasts have double membranes, 70S prokaryotic-like ribosomes, and double-stranded circular DNA, enabling them to self-replicate and make proteins, hence semi-autonomous.',
    ncertReference: 'NCERT Class 11 Biology, Chapter 8 (Cell), Page 135',
    difficulty: 'Easy',
    timeEstimateSeconds: 30,
    tags: ['Cell Biology', 'NCERT Fact', 'Assertion Reason'],
    conceptId: 'bio-semi-autonomous',
    questionType: 'assertion_reason',
    assertionText: 'Mitochondria and Chloroplasts are semi-autonomous organelles.',
    reasonText: 'Both Mitochondria and Chloroplasts contain their own circular 70S DNA and ribosomes and synthesize some of their own proteins.'
  },
  {
    id: 'bio-q2',
    subjectId: 'biology',
    chapterName: 'Molecular Basis of Inheritance',
    topicTitle: 'DNA Replication & Transcription',
    question: 'According to NCERT, in the lac operon model proposed by Jacob and Monod, the repressor protein binds to which region of the operon in the absence of lactose?',
    options: [
      { id: 'a', text: 'Operator region (o)' },
      { id: 'b', text: 'Promoter region (p)' },
      { id: 'c', text: 'Structural gene z' },
      { id: 'd', text: 'Terminator region' }
    ],
    correctAnswerId: 'a',
    explanation: 'The repressor protein synthesized by the i gene binds tightly to the operator region (o) of the operon and prevents RNA polymerase from transcribing the structural genes z, y, and a.',
    ncertReference: 'NCERT Class 12 Biology, Chapter 6 (Molecular Basis), Page 116',
    difficulty: 'Easy',
    timeEstimateSeconds: 30,
    tags: ['Lac Operon', 'Genetics', 'NCERT Direct Line'],
    conceptId: 'bio-lac-operon',
    questionType: 'ncert_line'
  },
  {
    id: 'bio-q3',
    subjectId: 'biology',
    chapterName: 'Human Reproduction & Reproductive Health',
    topicTitle: 'Menstrual Cycle & Hormones',
    question: 'Select the CORRECT sequence of hormone peaks during a typical 28-day human menstrual cycle starting from Day 1:',
    options: [
      { id: 'a', text: 'FSH & Estrogen peak -> LH Surge (Day 14) -> Progesterone peak (Day 21)' },
      { id: 'b', text: 'Progesterone peak -> LH Surge -> Estrogen peak -> FSH' },
      { id: 'c', text: 'LH Surge -> Progesterone peak -> Estrogen peak -> FSH' },
      { id: 'd', text: 'Estrogen peak -> Progesterone peak -> LH Surge -> FSH' }
    ],
    correctAnswerId: 'a',
    explanation: 'Estrogen peaks during the late follicular phase (day 12-13) causing LH surge at day 14 (ovulation). Corpus luteum secretes progesterone which peaks at day 21 (luteal phase).',
    ncertReference: 'NCERT Class 12 Biology, Chapter 3, Page 51',
    difficulty: 'Medium',
    timeEstimateSeconds: 40,
    tags: ['Menstrual Cycle', 'Hormonal Peak', 'Zoology'],
    conceptId: 'bio-menstrual-hormones',
    questionType: 'mcq'
  },
  {
    id: 'bio-pyq-2025-1',
    subjectId: 'biology',
    chapterName: 'Plant Growth and Development',
    topicTitle: 'Plant Growth Regulators (Phytohormones)',
    question: 'Which of the following plant growth regulators is responsible for promoting bolting (internode elongation prior to flowering) in rosette plants like beet and cabbage?',
    options: [
      { id: 'a', text: 'Gibberellins (GA3)' },
      { id: 'b', text: 'Auxins (IAA)' },
      { id: 'c', text: 'Cytokinins (Zeatin)' },
      { id: 'd', text: 'Ethylene' }
    ],
    correctAnswerId: 'a',
    explanation: 'Gibberellins cause stem elongation and bolting in rosette plants such as beet and cabbage prior to flowering.',
    ncertReference: 'NCERT Class 11 Biology, Chapter 15, Page 249 (NEET 2025)',
    difficulty: 'Easy',
    timeEstimateSeconds: 25,
    tags: ['Gibberellins', 'Bolting', 'Botany', 'NEET 2025 PYQ'],
    conceptId: 'bio-pgr-gibberellin',
    questionType: 'ncert_fact',
    year: 2025,
    isPyq: true
  },
  {
    id: 'bio-pyq-2024-1',
    subjectId: 'biology',
    chapterName: 'Biotechnology: Principles and Processes',
    topicTitle: 'Recombinant DNA Technology',
    question: 'In pBR322 vector, the ampicillin resistance gene (ampR) contains restriction site for which restriction endonuclease?',
    options: [
      { id: 'a', text: 'Pst I and Pvu I' },
      { id: 'b', text: 'BamH I and Sal I' },
      { id: 'c', text: 'EcoR I and Hind III' },
      { id: 'd', text: 'Cla I and EcoR I' }
    ],
    correctAnswerId: 'a',
    explanation: 'In cloning vector pBR322, ampR contains Pst I and Pvu I sites, whereas tetR contains BamH I and Sal I sites.',
    ncertReference: 'NCERT Class 12 Biology, Chapter 11, Page 199 (NEET 2024)',
    difficulty: 'Medium',
    timeEstimateSeconds: 35,
    tags: ['Biotechnology', 'pBR322 Vector', 'NEET 2024 PYQ'],
    conceptId: 'bio-biotech-pbr322',
    questionType: 'mcq',
    year: 2024,
    isPyq: true
  }
];
