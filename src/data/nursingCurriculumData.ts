import { NursingCurriculumYear, NursingSubject, NursingTopic, NursingYear, NursingSubjectId } from '../types/nursing';

export const NURSING_CURRICULUM_DATA: Record<NursingYear, NursingCurriculumYear> = {
  // =========================================================================
  // SECOND YEAR
  // =========================================================================
  '2nd_year': {
    year: '2nd_year',
    title: '2nd Year B.Sc Nursing',
    subtitle: 'Foundational Clinical & Paraclinical Nursing',
    description: 'Master Adult Health/Medical Surgical Nursing I, Pharmacology, Pathology, Genetics, Community Health I, and CET.',
    totalSubjects: 6,
    totalTopics: 18,
    subjects: [
      {
        id: 'med_surg_1',
        name: 'Medical Surgical Nursing I (Adult Health Nursing I)',
        shortName: 'MSN I',
        year: '2nd_year',
        code: 'N-MSN-201',
        color: '#2563EB',
        badge: 'CORE CLINICAL',
        icon: 'Stethoscope',
        theoryHoursRequired: 210,
        practicalHoursRequired: 720,
        muhsMarksWeightage: 75,
        totalUnits: 4,
        totalTopics: 5,
        units: [
          {
            id: 'unit-msn1-fluid',
            unitNumber: 1,
            title: 'Fluid & Electrolyte, Acid-Base Imbalances and Shock',
            description: 'Regulation of body fluids, hypovolemia, hypervolemia, electrolyte imbalances (K+, Na+, Ca++), and shock management.',
            subjectId: 'med_surg_1',
            topics: [
              {
                id: 'topic-msn1-fluid-imbalance',
                subjectId: 'med_surg_1',
                subjectName: 'Medical Surgical Nursing I',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'Fluid & Electrolyte and Shock',
                title: 'Fluid & Electrolyte Imbalances: Hypokalemia, Hyperkalemia & Dehydration',
                description: 'Pathophysiology of fluid deficit, potassium shifts, ECG changes in hyper/hypokalemia, and IV fluid replacement protocols.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ / 5 Marks SAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Critical in post-op ICU, burn wards, and severe gastroenteritis cases.',
                officialSyllabusCode: 'MUHS-MSN1-U1-T2',
                definitions: [
                  {
                    term: 'Hypokalemia',
                    definition: 'Serum potassium level below 3.5 mEq/L, leading to altered neuromuscular excitability, cardiac arrhythmias (U waves on ECG), and muscle weakness.',
                    referenceSource: "Brunner & Suddarth's Textbook of Medical-Surgical Nursing (14th Ed)"
                  },
                  {
                    term: 'Third-Spacing',
                    definition: 'The accumulation of trapped extracellular fluid in an actual or potential body space such as pericardial, pleural, or peritoneal cavities.',
                    referenceSource: 'MUHS Nursing Syllabus Guidelines'
                  }
                ],
                notes: {
                  overview: 'Potassium (K+) is the primary intracellular cation responsible for resting membrane potential of cardiac and skeletal muscle cells.',
                  etiologyAndRiskFactors: [
                    'GI loss: Prolonged vomiting, NG suction, diarrhea',
                    'Renal loss: Loop diuretics (Furosemide/Lasix), steroid therapy',
                    'Alkalosis: Shift of K+ into intracellular compartments',
                    'Inadequate dietary intake'
                  ],
                  pathophysiologySteps: [
                    'Decreased extracellular K+ concentration increases resting membrane hyperpolarization.',
                    'Delayed ventricular repolarization occurs, predisposing to lethal arrhythmias (PVCs, VFib).',
                    'Skeletal and smooth muscle contractility diminishes, causing paralytic ileus and flaccid weakness.'
                  ],
                  clinicalManifestations: [
                    'Cardiovascular: Flattened T waves, ST depression, prominent U waves, palpitations',
                    'Neuromuscular: Muscle cramps, hyporeflexia, ascending paralysis',
                    'Gastrointestinal: Constipation, paralytic ileus, abdominal distension'
                  ],
                  diagnosticEvaluation: [
                    'Serum electrolytes: K+ < 3.5 mEq/L',
                    '12-Lead ECG: U-wave inversion, flattened T-wave',
                    'Arterial Blood Gas (ABG): Metabolic alkalosis evaluation'
                  ],
                  medicalManagement: [
                    'Oral potassium chloride (KCl) supplements for mild deficiency',
                    'IV Potassium infusion: Never administer KCl as IV push/bolus (lethal cardiac arrest)',
                    'Maximum IV infusion rate: 10–20 mEq/hour under cardiac monitoring'
                  ],
                  nursingManagement: [
                    'Continuous ECG and telemetry monitoring for dysrhythmias',
                    'Check renal function (urine output > 30 mL/hr) before initiating IV potassium infusion',
                    'Monitor IV insertion site for phlebitis and pain (K+ is caustic to peripheral veins)',
                    'Encourage potassium-rich dietary intake (bananas, oranges, spinach, coconut water)'
                  ],
                  clinicalPearls: [
                    '⚠️ NEVER GIVE IV PUSH POTASSIUM! It causes fatal ventricular fibrillation within seconds.',
                    'Always verify urine output > 30 ml/hr before giving IV potassium: "No PEE, No K+".'
                  ]
                },
                nursingCarePlan: {
                  assessment: 'Patient presents with fatigue, leg cramps, serum K+ 2.8 mEq/L, ECG showing prominent U waves, heart rate 104 bpm.',
                  nursingDiagnosis: 'Decreased Cardiac Output related to altered cardiac conduction and ventricular arrhythmias secondary to hypokalemia.',
                  expectedOutcome: 'Patient maintains normal cardiac rhythm, serum potassium level normalizes between 3.5–5.0 mEq/L within 24 hours.',
                  interventions: [
                    'Monitor continuous 12-lead ECG for U-waves, prolonged QT, and ectopic beats.',
                    'Administer prescribed IV KCl (20 mEq in 500 mL Normal Saline) via infusion pump at maximum 10 mEq/hr.',
                    'Measure intake and output strictly; notify doctor if urine output falls below 30 mL/hr.',
                    'Assess deep tendon reflexes and muscle strength every 4 hours.'
                  ],
                  rationales: [
                    'ECG changes provide immediate detection of life-threatening cardiac conduction delays.',
                    'Controlled infusion pump prevents accidental rapid bolus and fatal hyperkalemic arrest.',
                    'Adequate renal perfusion prevents potassium accumulation and toxicity.',
                    'Reflex improvement indicates cellular electrolyte restoration.'
                  ],
                  evaluation: 'Serum K+ increased to 4.1 mEq/L, ECG restored to normal sinus rhythm without U waves, muscle strength 5/5.'
                },
                universityQuestions: [
                  {
                    id: 'q-msn1-laq-1',
                    type: 'LAQ',
                    marks: 15,
                    question: 'A 45-year-old male is admitted with severe vomiting and diarrhea. Serum K+ is 2.6 mEq/L. (a) Define Hypokalemia. (b) Explain the clinical manifestations and ECG changes. (c) Write a comprehensive Nursing Care Plan with rationales.',
                    frequency: 'Frequently Asked in MUHS',
                    modelAnswerOutline: '1. Definition & normal reference range (3.5-5.0 mEq/L). 2. Causes (GI losses, diuretic usage). 3. ECG findings: Flat T, ST dip, U wave. 4. Strict IV precautions (Never IV push, infusion pump, check urine output). 5. Nursing process table (Assessment, 2 NANDA diagnoses, 4 interventions with rationales, evaluation).',
                    keyPointsToInclude: ['Normal K+ 3.5–5.0 mEq/L', 'U wave on ECG', 'Never give IV Push', 'Urine output > 30 ml/hr']
                  },
                  {
                    id: 'q-msn1-saq-1',
                    type: 'SAQ',
                    marks: 5,
                    question: 'List the nursing responsibilities during IV Potassium Chloride (KCl) administration.',
                    frequency: 'University Repeater',
                    modelAnswerOutline: '1. Verification of physician order & lab K+ level. 2. Verify hourly urine output (>30mL/hr). 3. Dilution requirement & infusion pump usage (never gravity free-flow). 4. Central/large vein infusion preferred; check for extravasation. 5. Cardiac telemetry monitoring.',
                    keyPointsToInclude: ['Use infusion pump', 'Max rate 10-20 mEq/hr', 'Check renal output', 'Assess phlebitis']
                  }
                ],
                mcqs: [
                  {
                    id: 'mcq-msn1-1',
                    topicId: 'topic-msn1-fluid-imbalance',
                    question: 'Which of the following ECG changes is characteristic of severe hypokalemia?',
                    options: [
                      { id: 'a', text: 'Tall peaked T waves' },
                      { id: 'b', text: 'Prominent U waves and ST segment depression' },
                      { id: 'c', text: 'Shortened QT interval' },
                      { id: 'd', text: 'Prolonged QRS complex with loss of P wave' },
                    ],
                    correctAnswerId: 'b',
                    explanation: 'Hypokalemia causes delayed ventricular repolarization manifesting as flattened T waves, ST depression, and prominent U waves.',
                    clinicalRationale: 'Tall peaked T waves are seen in hyperkalemia, whereas U waves represent hypokalemia.',
                    tag: 'MUHS_Theory'
                  },
                  {
                    id: 'mcq-msn1-2',
                    topicId: 'topic-msn1-fluid-imbalance',
                    question: 'Before administering an intravenous potassium infusion, which nursing assessment is MOST critical?',
                    options: [
                      { id: 'a', text: 'Checking pupillary reaction to light' },
                      { id: 'b', text: 'Verifying urine output is at least 30 mL/hr' },
                      { id: 'c', text: 'Auscultating bowel sounds in 4 quadrants' },
                      { id: 'd', text: 'Measuring blood glucose levels' }
                    ],
                    correctAnswerId: 'b',
                    explanation: 'Potassium is excreted primarily through kidneys. If renal function is impaired (oliguria/anuria), IV potassium will accumulate rapidly causing fatal cardiac arrest.',
                    clinicalRationale: 'Rule: "No PEE, No K+". Potassium should never be infused if urine output is < 30 mL/hr.',
                    tag: 'Emergency_Action'
                  }
                ]
              },
              {
                id: 'topic-msn1-shock',
                subjectId: 'med_surg_1',
                subjectName: 'Medical Surgical Nursing I',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'Fluid & Electrolyte and Shock',
                title: 'Shock: Hypovolemic, Cardiogenic, Septic & Anaphylactic Management',
                description: 'Classification of shock stages, compensatory mechanisms, Mean Arterial Pressure (MAP), fluid resuscitation, inotropes, and nursing care.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'Universal emergency nursing competency in ICU, ER, and trauma resuscitation.',
                officialSyllabusCode: 'MUHS-MSN1-U1-T4'
              }
            ]
          },
          {
            id: 'unit-msn1-resp',
            unitNumber: 2,
            title: 'Management of Patients with Respiratory Disorders',
            description: 'COPD, Bronchial Asthma, Pneumonia, Tuberculosis, Pleural Effusion, and Chest Drainage (ICD).',
            subjectId: 'med_surg_1',
            topics: [
              {
                id: 'topic-msn1-copd',
                subjectId: 'med_surg_1',
                subjectName: 'Medical Surgical Nursing I',
                year: '2nd_year',
                unitNumber: 2,
                unitTitle: 'Respiratory Disorders',
                title: 'Chronic Obstructive Pulmonary Disease (COPD) & Bronchial Asthma',
                description: 'Chronic bronchitis vs Emphysema (Pink Puffers vs Blue Bloaters), Spirometry, Pursed-lip breathing, Oxygen therapy cautions, Bronchodilators.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Extremely high morbidity in geriatric and smoker populations; key for Ward nursing.',
                officialSyllabusCode: 'MUHS-MSN1-U2-T3'
              },
              {
                id: 'topic-msn1-tb',
                subjectId: 'med_surg_1',
                subjectName: 'Medical Surgical Nursing I',
                year: '2nd_year',
                unitNumber: 2,
                unitTitle: 'Respiratory Disorders',
                title: 'Pulmonary Tuberculosis & National TB Elimination Program (NTEP)',
                description: 'Mycobacterium tuberculosis pathogenesis, Mantoux test, CBNAAT/TrueNat, DOTS regimen, airborne precautions, and patient counseling.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ / Short Notes',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Crucial public health and bedside clinical problem in Indian hospitals.',
                officialSyllabusCode: 'MUHS-MSN1-U2-T5'
              }
            ]
          },
          {
            id: 'unit-msn1-cardio',
            unitNumber: 3,
            title: 'Cardiovascular System Disorders',
            description: 'Hypertension, Coronary Artery Disease (Angina & Myocardial Infarction), Heart Failure, and Infective Endocarditis.',
            subjectId: 'med_surg_1',
            topics: [
              {
                id: 'topic-msn1-mi',
                subjectId: 'med_surg_1',
                subjectName: 'Medical Surgical Nursing I',
                year: '2nd_year',
                unitNumber: 3,
                unitTitle: 'Cardiovascular Disorders',
                title: 'Myocardial Infarction (STEMI/NSTEMI) & Angina Pectoris',
                description: 'Atherosclerotic plaque rupture, Cardiac Biomarkers (Troponin I, CK-MB), MONA protocol (Morphine, Oxygen, Nitrates, Aspirin), Thrombolysis, Nursing care.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'Leading cause of ICU admissions; emergency protocol execution.',
                officialSyllabusCode: 'MUHS-MSN1-U3-T2'
              }
            ]
          }
        ]
      },
      {
        id: 'pharmacology',
        name: 'Pharmacology',
        shortName: 'Pharm',
        year: '2nd_year',
        code: 'N-PHAR-202',
        color: '#7C3AED',
        badge: 'DRUG SAFETY',
        icon: 'Pill',
        theoryHoursRequired: 80,
        muhsMarksWeightage: 75,
        totalUnits: 3,
        totalTopics: 3,
        units: [
          {
            id: 'unit-pharm-gen',
            unitNumber: 1,
            title: 'General Pharmacology & Route Administration',
            description: 'Pharmacokinetics (ADME), Pharmacodynamics, Half-life, Therapeutic index, 10 Rights of Medication Administration.',
            subjectId: 'pharmacology',
            topics: [
              {
                id: 'topic-pharm-general',
                subjectId: 'pharmacology',
                subjectName: 'Pharmacology',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'General Pharmacology',
                title: 'Pharmacokinetics, Pharmacodynamics & 10 Rights of Medication',
                description: 'Absorption, Distribution, Metabolism (Cytochrome P450), Excretion, Agonists/Antagonists, and patient safety rights.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Foundational for error-free drug administration.',
                officialSyllabusCode: 'MUHS-PHAR-U1-T1'
              }
            ]
          },
          {
            id: 'unit-pharm-cardio',
            unitNumber: 2,
            title: 'Cardiovascular & Emergency Drugs',
            description: 'Antihypertensives, Antianginals, Diuretics, Digoxin, Inotropes, and Anticoagulants (Heparin/Warfarin).',
            subjectId: 'pharmacology',
            topics: [
              {
                id: 'topic-pharm-cardiac',
                subjectId: 'pharmacology',
                subjectName: 'Pharmacology',
                year: '2nd_year',
                unitNumber: 2,
                unitTitle: 'Cardiovascular Drugs',
                title: 'Cardiac Glycosides (Digoxin), Diuretics & Antihypertensives',
                description: 'Digoxin mechanism (Na+/K+ ATPase inhibition), Toxicity signs (yellow-green halos), Nursing assessments (Apical pulse check), Loop diuretics.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Digoxin has narrow therapeutic window; pulse check < 60 bpm is essential nursing duty.',
                officialSyllabusCode: 'MUHS-PHAR-U2-T3'
              }
            ]
          },
          {
            id: 'unit-pharm-antibiotics',
            unitNumber: 3,
            title: 'Chemotherapy & Antimicrobial Agents',
            description: 'Penicillins, Cephalosporins, Aminoglycosides, Fluoroquinolones, Antitubercular drugs (HRZE).',
            subjectId: 'pharmacology',
            topics: [
              {
                id: 'topic-pharm-antibiotics',
                subjectId: 'pharmacology',
                subjectName: 'Pharmacology',
                year: '2nd_year',
                unitNumber: 3,
                unitTitle: 'Antimicrobials',
                title: 'Antibiotics & Antitubercular Drugs (Isoniazid, Rifampicin, Pyrazinamide, Ethambutol)',
                description: 'Mechanisms of action, Adverse effects (Red-orange urine with Rifampicin, Optic neuritis with Ethambutol, Peripheral neuropathy with INH).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Daily ward administration and DOTS therapy counseling.',
                officialSyllabusCode: 'MUHS-PHAR-U3-T1'
              }
            ]
          }
        ]
      },
      {
        id: 'pathology_genetics',
        name: 'Pathology & Genetics',
        shortName: 'Path & Gen',
        year: '2nd_year',
        code: 'N-PATH-203',
        color: '#D97706',
        badge: 'PARACLINICAL',
        icon: 'Microscope',
        theoryHoursRequired: 60,
        muhsMarksWeightage: 75,
        totalUnits: 2,
        totalTopics: 3,
        units: [
          {
            id: 'unit-path-cell',
            unitNumber: 1,
            title: 'General Pathology & Inflammation',
            description: 'Cell injury, necrosis, apoptosis, acute & chronic inflammation, healing and repair, neoplasia.',
            subjectId: 'pathology_genetics',
            topics: [
              {
                id: 'topic-path-inflammation',
                subjectId: 'pathology_genetics',
                subjectName: 'Pathology & Genetics',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'General Pathology',
                title: 'Acute Inflammation, Cardinal Signs & Wound Healing Stages',
                description: 'Vascular events (vasodilation, increased permeability), Cellular events (chemotaxis, phagocytosis), Primary vs Secondary intention healing.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Bedside wound care, surgical site infection monitoring, sterile dressings.',
                officialSyllabusCode: 'MUHS-PATH-U1-T2'
              },
              {
                id: 'topic-path-neoplasia',
                subjectId: 'pathology_genetics',
                subjectName: 'Pathology & Genetics',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'General Pathology',
                title: 'Neoplasia: Benign vs Malignant Tumors & Carcinogenesis',
                description: 'Anaplasia, metastasis routes (lymphatic, hematogenous), TNM staging, oncogenes, tumor markers.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Foundation for 3rd year Oncological Nursing.',
                officialSyllabusCode: 'MUHS-PATH-U1-T4'
              }
            ]
          },
          {
            id: 'unit-gen-basics',
            unitNumber: 2,
            title: 'Genetics & Clinical Nursing Applications',
            description: 'Chromosomal abnormalities (Down syndrome, Turner, Klinefelter), Mendelian inheritance, Genetic counseling.',
            subjectId: 'pathology_genetics',
            topics: [
              {
                id: 'topic-gen-counseling',
                subjectId: 'pathology_genetics',
                subjectName: 'Pathology & Genetics',
                year: '2nd_year',
                unitNumber: 2,
                unitTitle: 'Genetics',
                title: 'Chromosomal Disorders (Down Syndrome) & Role of Nurse in Genetic Counseling',
                description: 'Trisomy 21 features, screening (Quad test, Amniocentesis), ethical principles, parental guidance.',
                importance: 'Medium',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 30,
                clinicalRelevance: 'Crucial for antenatal and pediatric care.',
                officialSyllabusCode: 'MUHS-GEN-U2-T2'
              }
            ]
          }
        ]
      },
      {
        id: 'community_health_1',
        name: 'Community Health Nursing I',
        shortName: 'CHN I',
        year: '2nd_year',
        code: 'N-CHN-204',
        color: '#059669',
        badge: 'PUBLIC HEALTH',
        icon: 'Users',
        theoryHoursRequired: 90,
        practicalHoursRequired: 135,
        muhsMarksWeightage: 75,
        totalUnits: 2,
        totalTopics: 3,
        units: [
          {
            id: 'unit-chn1-concepts',
            unitNumber: 1,
            title: 'Primary Health Care & Community Health Concepts',
            description: 'Alma-Ata declaration, Elements and principles of Primary Health Care (PHC), Health determinants, Health-illness continuum.',
            subjectId: 'community_health_1',
            topics: [
              {
                id: 'topic-chn1-phc',
                subjectId: 'community_health_1',
                subjectName: 'Community Health Nursing I',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'Primary Health Care',
                title: 'Primary Health Care (PHC): Principles, Elements & Functions in India',
                description: 'Universal coverage, Community participation, Intersectoral coordination, Appropriate technology, 8 Essential elements of PHC.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Rural posting and Sub-Centre/PHC nursing practice.',
                officialSyllabusCode: 'MUHS-CHN1-U1-T1'
              }
            ]
          },
          {
            id: 'unit-chn1-epidemiology',
            unitNumber: 2,
            title: 'Epidemiology & Communicable Disease Control',
            description: 'Epidemiological triad (Agent, Host, Environment), Levels of Prevention (Primordial, Primary, Secondary, Tertiary), Immunity and Immunization Schedule.',
            subjectId: 'community_health_1',
            topics: [
              {
                id: 'topic-chn1-prevention',
                subjectId: 'community_health_1',
                subjectName: 'Community Health Nursing I',
                year: '2nd_year',
                unitNumber: 2,
                unitTitle: 'Epidemiology & Prevention',
                title: 'Levels of Prevention (Primordial, Primary, Secondary, Tertiary) with Examples',
                description: 'Health promotion, Specific protection (Vaccines), Early diagnosis & treatment (Screening), Disability limitation, Rehabilitation.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ / 5 Marks SAQ',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Universal exam question and health camp planning.',
                officialSyllabusCode: 'MUHS-CHN1-U2-T2'
              },
              {
                id: 'topic-chn1-immunization',
                subjectId: 'community_health_1',
                subjectName: 'Community Health Nursing I',
                year: '2nd_year',
                unitNumber: 2,
                unitTitle: 'Epidemiology & Prevention',
                title: 'National Immunization Schedule (NIS) & Cold Chain Management',
                description: 'Vaccines at birth, 6, 10, 14 weeks, 9 months, 16-24 months; Cold chain equipment (ILR, Deep Freezer, Vaccine Carrier), VVM stages.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Vaccination clinics, pulse polio, and child health.',
                officialSyllabusCode: 'MUHS-CHN1-U2-T4'
              }
            ]
          }
        ]
      },
      {
        id: 'cet',
        name: 'Communication & Educational Technology',
        shortName: 'CET',
        year: '2nd_year',
        code: 'N-CET-205',
        color: '#EC4899',
        badge: 'TEACHING SKILLS',
        icon: 'BookOpen',
        theoryHoursRequired: 90,
        practicalHoursRequired: 60,
        muhsMarksWeightage: 75,
        totalUnits: 2,
        totalTopics: 2,
        units: [
          {
            id: 'unit-cet-comm',
            unitNumber: 1,
            title: 'Communication Process & Interpersonal Skills',
            description: 'Communication cycle (Sender, Message, Channel, Receiver, Feedback), Barriers to communication, Therapeutic communication techniques.',
            subjectId: 'cet',
            topics: [
              {
                id: 'topic-cet-therapeutic',
                subjectId: 'cet',
                subjectName: 'Communication & Educational Technology',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'Communication Skills',
                title: 'Therapeutic Communication Techniques vs Non-Therapeutic Barriers',
                description: 'Active listening (SOLER), Open-ended questioning, Reflecting, Clarifying, Silence, Overcoming physical and psychological barriers.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Nurse-Patient relationship in psychiatric and general wards.',
                officialSyllabusCode: 'MUHS-CET-U1-T2'
              }
            ]
          },
          {
            id: 'unit-cet-teaching',
            unitNumber: 2,
            title: 'Teaching-Learning Process & Lesson Planning',
            description: 'Principles of adult learning, Bloom taxonomy, Formulating lesson plans, Audio-Visual aids classification and projection.',
            subjectId: 'cet',
            topics: [
              {
                id: 'topic-cet-lesson-plan',
                subjectId: 'cet',
                subjectName: 'Communication & Educational Technology',
                year: '2nd_year',
                unitNumber: 2,
                unitTitle: 'Teaching-Learning',
                title: 'Lesson Planning Format, Objectives Formulation & AV Aids Selection',
                description: 'General vs Specific behavioral objectives (SMART), Structure of a Nursing Lesson Plan, Chalkboard, PPT, Flashcards, Models.',
                importance: 'Medium',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Health education sessions and clinical teaching.',
                officialSyllabusCode: 'MUHS-CET-U2-T3'
              }
            ]
          }
        ]
      },
      {
        id: 'sociology',
        name: 'Sociology',
        shortName: 'Socio',
        year: '2nd_year',
        code: 'N-SOC-206',
        color: '#6366F1',
        badge: 'SOCIAL SCIENCES',
        icon: 'Globe',
        theoryHoursRequired: 60,
        muhsMarksWeightage: 75,
        totalUnits: 1,
        totalTopics: 2,
        units: [
          {
            id: 'unit-soc-india',
            unitNumber: 1,
            title: 'Social Structure & Health in India',
            description: 'Family types (Nuclear, Joint), Social stratification (Caste and Class), Poverty, Illiteracy, Social problems influencing health seeking behavior.',
            subjectId: 'sociology',
            topics: [
              {
                id: 'topic-soc-family',
                subjectId: 'sociology',
                subjectName: 'Sociology',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'Social Structure',
                title: 'Family System in India, Types & Impact of Modernization on Health Care',
                description: 'Joint family vs Nuclear family dynamics, Role of family in illness support and geriatric care.',
                importance: 'Medium',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 30,
                clinicalRelevance: 'Holistic patient assessment and home visits.',
                officialSyllabusCode: 'MUHS-SOC-U1-T1'
              },
              {
                id: 'topic-soc-problems',
                subjectId: 'sociology',
                subjectName: 'Sociology',
                year: '2nd_year',
                unitNumber: 1,
                unitTitle: 'Social Structure',
                title: 'Social Problems: Poverty, Substance Abuse, Dowry & Child Labor in Health Context',
                description: 'Social pathology, Vulnerable populations, Rehabilitation, Role of medical social worker and community health nurse.',
                importance: 'Medium',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 30,
                clinicalRelevance: 'Medico-legal cases and social welfare integration.',
                officialSyllabusCode: 'MUHS-SOC-U1-T3'
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // THIRD YEAR
  // =========================================================================
  '3rd_year': {
    year: '3rd_year',
    title: '3rd Year B.Sc Nursing',
    subtitle: 'Specialized Clinical & Super-Specialty Nursing',
    description: 'Master Medical Surgical Nursing II (Adult Health II), Child Health Nursing (Pediatrics), and Mental Health Nursing (Psychiatry).',
    totalSubjects: 3,
    totalTopics: 15,
    subjects: [
      {
        id: 'med_surg_2',
        name: 'Medical Surgical Nursing II (Adult Health Nursing II)',
        shortName: 'MSN II',
        year: '3rd_year',
        code: 'N-MSN2-301',
        color: '#2563EB',
        badge: 'SUPER-SPECIALTY',
        icon: 'Stethoscope',
        theoryHoursRequired: 120,
        practicalHoursRequired: 480,
        muhsMarksWeightage: 75,
        totalUnits: 4,
        totalTopics: 6,
        units: [
          {
            id: 'unit-msn2-neuro',
            unitNumber: 1,
            title: 'Management of Patients with Neurological Disorders',
            description: 'Increased Intracranial Pressure (ICP), Cerebrovascular Accident (Stroke), Meningitis, Epilepsy, Parkinsonism, Spinal Cord Injury.',
            subjectId: 'med_surg_2',
            topics: [
              {
                id: 'topic-msn2-stroke',
                subjectId: 'med_surg_2',
                subjectName: 'Medical Surgical Nursing II',
                year: '3rd_year',
                unitNumber: 1,
                unitTitle: 'Neurological Disorders',
                title: 'Cerebrovascular Accident (Stroke/Brain Attack) & Increased ICP',
                description: 'Ischemic vs Hemorrhagic stroke, FAST assessment, Glasgow Coma Scale (GCS), Cushing Triad in ICP, tPA window (4.5 hrs), Position & Nursing Care.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'Acute neuro ICU emergencies and neuro-rehabilitation.',
                officialSyllabusCode: 'MUHS-MSN2-U1-T2',
                definitions: [
                  {
                    term: 'Cerebrovascular Accident (CVA)',
                    definition: 'Sudden loss of neurological function caused by disruption of blood flow to a specific area of the brain due to ischemia (85%) or hemorrhage (15%).',
                    referenceSource: "Brunner & Suddarth's Textbook of Medical-Surgical Nursing"
                  },
                  {
                    term: 'Cushing Triad',
                    definition: 'A life-threatening triad indicating severe increased Intracranial Pressure (ICP): (1) Hypertension with widening pulse pressure, (2) Bradycardia, and (3) Irregular respirations (Cheyne-Stokes).',
                    referenceSource: 'MUHS Clinical Nursing Protocols'
                  }
                ],
                notes: {
                  overview: 'Stroke is a medical emergency requiring rapid triage within the golden window (tPA thrombolysis within 4.5 hours for ischemic stroke).',
                  etiologyAndRiskFactors: [
                    'Ischemic: Thrombosis, Embolism (Atrial fibrillation), Atherosclerosis',
                    'Hemorrhagic: Uncontrolled hypertension, Ruptured aneurysm, AVM',
                    'Modifiable risks: Smoking, Diabetes mellitus, Hyperlipidemia, Obesity'
                  ],
                  pathophysiologySteps: [
                    'Vascular occlusion or rupture leads to cerebral hypoperfusion and ischemia.',
                    'Ischemic core undergoes rapid cellular necrosis while surrounding penumbra remains salvageable.',
                    'Cellular energy failure results in sodium-potassium pump failure, cytotoxic edema, and elevated ICP.'
                  ],
                  clinicalManifestations: [
                    'FAST Assessment: Face drooping, Arm weakness, Speech difficulty, Time to call code stroke',
                    'Hemiplegia (paralysis of one side of body) or hemiparesis',
                    'Aphasia (Expressive Broca or Receptive Wernicke), Dysarthria',
                    'Homonymous hemianopia, Dysphagia, Agnosia'
                  ],
                  diagnosticEvaluation: [
                    'Non-contrast Head CT Scan immediately: Differentiates ischemic from hemorrhagic stroke',
                    'MRI Brain Diffusion Weighted Imaging (DWI): Detects hyperacute infarction',
                    'Carotid Doppler & Echocardiogram (evaluates cardiac emboli source)'
                  ],
                  medicalManagement: [
                    'Ischemic: IV Alteplase / recombinant tPA within 4.5 hours of symptom onset (blood pressure must be < 185/110 mmHg)',
                    'Antiplatelets (Aspirin, Clopidogrel) after 24 hours of thrombolysis',
                    'Hemorrhagic: Surgical evacuation of hematoma, clipping of aneurysm, BP control'
                  ],
                  nursingManagement: [
                    'Maintain airway patency and elevate head of bed 30 degrees (promotes venous drainage, lowers ICP)',
                    'Perform hourly Glasgow Coma Scale (GCS) and neuro checks',
                    'Strict NPO until formal swallowing assessment (prevents aspiration pneumonia)',
                    'Maintain neutral head alignment; avoid extreme hip/neck flexion'
                  ],
                  clinicalPearls: [
                    '⚠️ NEVER give tPA before non-contrast CT excludes intracranial hemorrhage!',
                    'Cushing Triad (Bradycardia + Widened Pulse Pressure + Irregular Breathing) = Impending brain herniation.'
                  ]
                },
                nursingCarePlan: {
                  assessment: '62-year-old female presents with sudden right-sided hemiplegia, expressive aphasia, GCS 11 (E3V2M6), BP 178/96 mmHg, onset 2 hours ago.',
                  nursingDiagnosis: 'Ineffective Cerebral Tissue Perfusion related to interrupted arterial blood flow and cerebral edema secondary to acute ischemic stroke.',
                  expectedOutcome: 'Patient maintains adequate cerebral perfusion, GCS remains stable or improves, no signs of increased ICP.',
                  interventions: [
                    'Maintain head of bed elevated at 30 degrees in neutral midline position.',
                    'Perform hourly GCS and cranial nerve neurological assessments.',
                    'Administer prescribed oxygen to maintain SpO2 > 94% and normocapnia.',
                    'Keep systolic BP between 140–180 mmHg as prescribed; avoid sudden severe hypotension.'
                  ],
                  rationales: [
                    '30-degree elevation optimizes jugular venous return and reduces intracranial pressure.',
                    'Frequent monitoring provides early detection of hemorrhagic transformation or cerebral herniation.',
                    'Hypoxia and hypercapnia cause cerebral vasodilation, worsening cerebral edema.',
                    'Permissive hypertension supports penumbral collateral perfusion in ischemic stroke.'
                  ],
                  evaluation: 'Head CT showed no hemorrhage; received IV tPA; GCS improved to 14/15; speech clarity returned gradually.'
                },
                universityQuestions: [
                  {
                    id: 'q-msn2-laq-1',
                    type: 'LAQ',
                    marks: 15,
                    question: 'A 60-year-old male is admitted to ICU with acute Left Middle Cerebral Artery (MCA) Ischemic Stroke. (a) Define Stroke and explain its types. (b) Describe the clinical features of Right Hemiplegia and Aphasia. (c) Plan a detailed Nursing Care Plan for the first 48 hours of ICU stay.',
                    frequency: 'Frequently Asked in MUHS',
                    modelAnswerOutline: '1. Definition & Types (Ischemic 85%, Hemorrhagic 15%). 2. FAST criteria and penumbra concept. 3. Thrombolytic window (tPA <4.5 hrs). 4. Clinical manifestations table (Motor, sensory, speech, visual). 5. Nursing process table with 3 prioritized diagnoses (Tissue perfusion, Aspiration risk, Impaired physical mobility).',
                    keyPointsToInclude: ['tPA window 4.5 hrs', 'Non-contrast CT first', 'HOB 30 degrees', 'Aspiration precautions']
                  }
                ],
                mcqs: [
                  {
                    id: 'mcq-msn2-1',
                    topicId: 'topic-msn2-stroke',
                    question: 'A patient suspected of acute ischemic stroke arrived at the emergency department 1.5 hours after symptom onset. What is the priority diagnostic procedure?',
                    options: [
                      { id: 'a', text: 'Lumbar puncture' },
                      { id: 'b', text: 'Non-contrast head CT scan' },
                      { id: 'c', text: 'Electroencephalogram (EEG)' },
                      { id: 'd', text: 'Cerebral angiography with contrast' }
                    ],
                    correctAnswerId: 'b',
                    explanation: 'A non-contrast head CT must be performed immediately within 25 minutes of arrival to rule out hemorrhage before thrombolytic therapy (tPA) can be administered.',
                    clinicalRationale: 'Administering tPA in the presence of hemorrhage would cause fatal intracerebral bleeding.',
                    tag: 'Emergency_Action'
                  }
                ]
              },
              {
                id: 'topic-msn2-meningitis',
                subjectId: 'med_surg_2',
                subjectName: 'Medical Surgical Nursing II',
                year: '3rd_year',
                unitNumber: 1,
                unitTitle: 'Neurological Disorders',
                title: 'Meningitis (Bacterial vs Viral) & Lumbar Puncture Nursing Care',
                description: 'Nuchal rigidity, Kernig & Brudzinski signs, CSF analysis (low glucose, high protein/turbid in bacterial), Droplet precautions, Mannitol, Antibiotics.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ / 5 Marks SAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Medical emergency requiring isolation and rapid IV antibiotics.',
                officialSyllabusCode: 'MUHS-MSN2-U1-T4'
              }
            ]
          },
          {
            id: 'unit-msn2-renal',
            unitNumber: 2,
            title: 'Nephrology & Urological Disorders',
            description: 'Nephrotic Syndrome, Acute Kidney Injury (AKI), Chronic Kidney Disease (CKD), Dialysis (Hemodialysis & Peritoneal Dialysis), Renal Transplantation.',
            subjectId: 'med_surg_2',
            topics: [
              {
                id: 'topic-msn2-nephrotic',
                subjectId: 'med_surg_2',
                subjectName: 'Medical Surgical Nursing II',
                year: '3rd_year',
                unitNumber: 2,
                unitTitle: 'Nephrology Disorders',
                title: 'Nephrotic Syndrome: Triad, Pathophysiology & Nursing Care',
                description: 'Massive proteinuria (>3.5g/24h), Hypoalbuminemia, Generalized edema (Anasarca), Hyperlipidemia, Corticosteroid therapy, Daily weight monitoring.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Common in pediatric and adult nephrology wards.',
                officialSyllabusCode: 'MUHS-MSN2-U2-T1'
              },
              {
                id: 'topic-msn2-ckd',
                subjectId: 'med_surg_2',
                subjectName: 'Medical Surgical Nursing II',
                year: '3rd_year',
                unitNumber: 2,
                unitTitle: 'Nephrology Disorders',
                title: 'Chronic Kidney Disease (CKD) & Hemodialysis Nursing Care',
                description: 'Glomerular Filtration Rate (GFR) stages, Uremic syndrome, AV Fistula care (Feel the thrill, hear the bruit), Fluid & Potassium restrictions.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'AV fistula protection (NO BP or blood draws on fistula arm).',
                officialSyllabusCode: 'MUHS-MSN2-U2-T3'
              }
            ]
          },
          {
            id: 'unit-msn2-burns',
            unitNumber: 3,
            title: 'Burns & Reconstructive Nursing',
            description: 'Classification of Burns, Rule of Nines, Parkland Fluid Resuscitation Formula, Infection control, Escharotomy, Skin grafting.',
            subjectId: 'med_surg_2',
            topics: [
              {
                id: 'topic-msn2-burns-parkland',
                subjectId: 'med_surg_2',
                subjectName: 'Medical Surgical Nursing II',
                year: '3rd_year',
                unitNumber: 3,
                unitTitle: 'Burns & Reconstructive',
                title: 'Burns: Rule of Nines, Parkland Fluid Resuscitation & Nursing Care',
                description: 'Total Body Surface Area (TBSA) calculation, Parkland Formula (4mL × kg × %TBSA), Half given in first 8 hours, Silver sulfadiazine, Reverse isolation.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'Standard university calculation and burn unit survival management.',
                officialSyllabusCode: 'MUHS-MSN2-U3-T1'
              }
            ]
          },
          {
            id: 'unit-msn2-onco',
            unitNumber: 4,
            title: 'Oncological Nursing & Critical Care',
            description: 'Cancer warning signs (CAUTION), Chemotherapy side effects (Bone marrow suppression, Alopecia, Stomatitis), Radiation safety, Triage & CPR.',
            subjectId: 'med_surg_2',
            topics: [
              {
                id: 'topic-msn2-chemo',
                subjectId: 'med_surg_2',
                subjectName: 'Medical Surgical Nursing II',
                year: '3rd_year',
                unitNumber: 4,
                unitTitle: 'Oncology & Critical Care',
                title: 'Oncological Nursing: Chemotherapy Administration, Extravasation & Neutropenic Precautions',
                description: 'Personal protective equipment for chemo handling, Extravasation protocol, Absolute Neutrophil Count (ANC < 500), Reverse barrier isolation.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ / 5 Marks SAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Day-care oncology unit and chemotherapy ward safety.',
                officialSyllabusCode: 'MUHS-MSN2-U4-T2'
              }
            ]
          }
        ]
      },
      {
        id: 'child_health',
        name: 'Child Health Nursing (Pediatric Nursing)',
        shortName: 'CHN (Peds)',
        year: '3rd_year',
        code: 'N-CHN-302',
        color: '#10B981',
        badge: 'PEDIATRICS',
        icon: 'Heart',
        theoryHoursRequired: 90,
        practicalHoursRequired: 270,
        muhsMarksWeightage: 75,
        totalUnits: 3,
        totalTopics: 4,
        units: [
          {
            id: 'unit-peds-growth',
            unitNumber: 1,
            title: 'Growth & Development of Children',
            description: 'Principles of growth and development, Developmental milestones (Gross motor, Fine motor, Language, Social), Erikson & Piaget theories, Pediatric nutrition.',
            subjectId: 'child_health',
            topics: [
              {
                id: 'topic-peds-milestones',
                subjectId: 'child_health',
                subjectName: 'Child Health Nursing',
                year: '3rd_year',
                unitNumber: 1,
                unitTitle: 'Growth & Development',
                title: 'Developmental Milestones (0–5 Years) & Assessment of Under-Five Child',
                description: 'Head holding (3 mo), Sitting with/without support (6/8 mo), Standing & Walking (12 mo), First words (12 mo), Road to Health Chart (Growth chart).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Well baby clinic, immunizations, and developmental delay screening.',
                officialSyllabusCode: 'MUHS-PEDS-U1-T2'
              }
            ]
          },
          {
            id: 'unit-peds-congenital',
            unitNumber: 2,
            title: 'Congenital Anomalies & High-Risk Neonate',
            description: 'Congenital Heart Diseases (Acyanotic vs Cyanotic - Tetralogy of Fallot, VSD), Cleft Lip/Palate, Spina Bifida, Neonatal Jaundice & Phototherapy.',
            subjectId: 'child_health',
            topics: [
              {
                id: 'topic-peds-tof',
                subjectId: 'child_health',
                subjectName: 'Child Health Nursing',
                year: '3rd_year',
                unitNumber: 2,
                unitTitle: 'Congenital Anomalies',
                title: 'Tetralogy of Fallot (TOF) & Management of Hypercyanotic (TET) Spells',
                description: '4 Classical defects (VSD, Overriding aorta, Pulmonary stenosis, RV hypertrophy), Knee-chest position for TET spell, Oxygen, Morphine, Hydration.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Emergency pediatric cardiac resuscitation (squatting / knee-chest posture).',
                officialSyllabusCode: 'MUHS-PEDS-U2-T2'
              },
              {
                id: 'topic-peds-phototherapy',
                subjectId: 'child_health',
                subjectName: 'Child Health Nursing',
                year: '3rd_year',
                unitNumber: 2,
                unitTitle: 'Congenital Anomalies',
                title: 'Neonatal Jaundice (Physiological vs Pathological) & Phototherapy Nursing Care',
                description: 'Bilirubin metabolism, Kernicterus risk, Blue-green light (460-490 nm), Eye patches & genital covering, Temperature & hydration monitoring.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'NICU / Postnatal ward universal nursing responsibility.',
                officialSyllabusCode: 'MUHS-PEDS-U2-T4'
              }
            ]
          },
          {
            id: 'unit-peds-imnci',
            unitNumber: 3,
            title: 'Integrated Management of Neonatal & Childhood Illnesses (IMNCI)',
            description: 'Color-coded triage (Pink/Red - Urgent Hospital Referral, Yellow - Outpatient Treatment, Green - Home Management), Acute Diarrhea & ORS.',
            subjectId: 'child_health',
            topics: [
              {
                id: 'topic-peds-imnci-diarrhea',
                subjectId: 'child_health',
                subjectName: 'Child Health Nursing',
                year: '3rd_year',
                unitNumber: 3,
                unitTitle: 'IMNCI Guidelines',
                title: 'IMNCI Classification: Acute Gastroenteritis, Dehydration Assessment & Plan A/B/C',
                description: 'Assessment of skin pinch, sunken eyes, lethargy; Low osmolarity ORS composition, Zinc supplementation for 14 days, IV Ringer Lactate in severe dehydration.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Major preventable cause of under-five mortality in India.',
                officialSyllabusCode: 'MUHS-PEDS-U3-T1'
              }
            ]
          }
        ]
      },
      {
        id: 'mental_health',
        name: 'Mental Health Nursing (Psychiatric Nursing)',
        shortName: 'MHN (Psych)',
        year: '3rd_year',
        code: 'N-MHN-303',
        color: '#8B5CF6',
        badge: 'PSYCHIATRY',
        icon: 'Brain',
        theoryHoursRequired: 90,
        practicalHoursRequired: 270,
        muhsMarksWeightage: 75,
        totalUnits: 3,
        totalTopics: 5,
        units: [
          {
            id: 'unit-mhn-principles',
            unitNumber: 1,
            title: 'Principles & Assessment of Mental Health',
            description: 'Mental Status Examination (MSE), Nurse-Patient Relationship phases (Pre-interaction, Orientation, Working, Termination), Mental Healthcare Act 2017.',
            subjectId: 'mental_health',
            topics: [
              {
                id: 'topic-mhn-mse',
                subjectId: 'mental_health',
                subjectName: 'Mental Health Nursing',
                year: '3rd_year',
                unitNumber: 1,
                unitTitle: 'Assessment & Principles',
                title: 'Mental Status Examination (MSE) & Therapeutic Nurse-Patient Relationship',
                description: 'General appearance, Speech, Mood & Affect, Thought process/content (Delusions), Perception (Hallucinations), Cognition, Insight grading (1–6).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Mandatory clinical assessment on all psychiatric admissions.',
                officialSyllabusCode: 'MUHS-MHN-U1-T2'
              }
            ]
          },
          {
            id: 'unit-mhn-psychoses',
            unitNumber: 2,
            title: 'Schizophrenia & Mood Disorders',
            description: 'Schizophrenia subtypes, Bleuler 4 As, Schneider first rank symptoms, Positive vs Negative symptoms, Bipolar Affective Disorder (Mania & Depression), Antipsychotics.',
            subjectId: 'mental_health',
            topics: [
              {
                id: 'topic-mhn-schizophrenia',
                subjectId: 'mental_health',
                subjectName: 'Mental Health Nursing',
                year: '3rd_year',
                unitNumber: 2,
                unitTitle: 'Psychoses & Mood Disorders',
                title: 'Schizophrenia: Bleuler 4 A’s, Positive/Negative Symptoms & Nursing Care Plan',
                description: 'Affective flattening, Autistic thinking, Ambivalence, Loose Associations; Delusions & Hallucinations management, Extrapyramidal symptoms (EPS), Haloperidol/Olanzapine.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'Core psychiatric nursing syllabus topic with universal annual exam presence.',
                officialSyllabusCode: 'MUHS-MHN-U2-T1',
                definitions: [
                  {
                    term: 'Schizophrenia',
                    definition: 'A severe, chronic psychiatric disorder characterized by disturbances in thought, perception, emotion, and behavior lasting for at least 6 months.',
                    referenceSource: "Townsend's Psychiatric Mental Health Nursing"
                  },
                  {
                    term: 'Delusion',
                    definition: 'A fixed, false belief firmly held despite clear objective evidence to the contrary and not shared by others of the same cultural background.',
                    referenceSource: 'MUHS Psychiatric Nursing Textbook'
                  }
                ],
                notes: {
                  overview: 'Eugen Bleuler coined the term Schizophrenia and identified the core primary symptoms known as the "4 A\'s".',
                  etiologyAndRiskFactors: [
                    'Biological: Dopamine hypothesis (hyperactivity of dopamine in mesolimbic pathway causing positive symptoms; hypoactivity in mesocortical causing negative symptoms)',
                    'Genetic: High concordance rate in monozygotic twins (48%)',
                    'Psychosocial: High Expressed Emotion (EE) in families triggering relapses'
                  ],
                  pathophysiologySteps: [
                    'Disruption in neural circuitry connecting prefrontal cortex, thalamus, and basal ganglia.',
                    'Aberrant salience attribution to everyday stimuli creates persecutory delusions and auditory hallucinations.',
                    'Progressive neurocognitive deficit leads to avolition, anhedonia, and social withdrawal.'
                  ],
                  clinicalManifestations: [
                    'Bleuler’s 4 A’s: Affective blunting, Associative looseness, Autism, Ambivalence',
                    'Positive Symptoms: Delusions (Persecutory, Grandiose, Reference), Hallucinations (Auditory third-person commentary), Disorganized speech/catatonia',
                    'Negative Symptoms: Avolition, Alogia (poverty of speech), Anhedonia, Asociality'
                  ],
                  diagnosticEvaluation: [
                    'ICD-11 / DSM-5 Criteria: At least 2 characteristic symptoms present for at least 1 month with overall duration ≥ 6 months',
                    'Routine blood work, Thyroid profile, and Brain MRI to rule out organic brain psychosis'
                  ],
                  medicalManagement: [
                    'Typical Antipsychotics: Haloperidol, Chlorpromazine (High risk of Extrapyramidal Symptoms - EPS)',
                    'Atypical Antipsychotics: Olanzapine, Risperidone, Quetiapine, Clozapine (Requires monitoring for agranulocytosis and metabolic syndrome)',
                    'Anticholinergic agents: Trihexyphenidyl / Promethazine for EPS management (Dystonia, Akathisia, Parkinsonism)'
                  ],
                  nursingManagement: [
                    'Establish therapeutic trust: Keep promises, maintain matter-of-fact, calm demeanor',
                    'Managing Hallucinations: Do not validate or argue with hallucinations ("I know the voices seem real to you, but I do not hear any voices")',
                    'Managing Delusions: Avoid debating false beliefs; focus on feelings and reality-based activities',
                    'Monitor for Extrapyramidal Symptoms (EPS) and Neuroleptic Malignant Syndrome (NMS - Hyperthermia, muscle rigidity)'
                  ],
                  clinicalPearls: [
                    '⚠️ NEVER reinforce a hallucination or pretend to see/hear it!',
                    'Watch for Clozapine-induced agranulocytosis (check weekly WBC/ANC count).'
                  ]
                },
                nursingCarePlan: {
                  assessment: '26-year-old male is muttering to himself, states "The FBI is poisoning my food through the ceiling camera", refuses to eat hospital food, pacing restlessly.',
                  nursingDiagnosis: 'Disturbed Thought Processes related to biochemical alterations in brain neurotransmitters as evidenced by persecutory delusions and refusal to eat.',
                  expectedOutcome: 'Patient verbalizes feeling safe, accepts unpoisoned food/medication, and demonstrates decreased delusional conviction within 5 days.',
                  interventions: [
                    'Allow patient to select pre-packaged, factory-sealed food items or eat food prepared in front of him.',
                    'Acknowledge patient feelings without validating the delusion: "That sounds very frightening for you, but you are safe in this hospital."',
                    'Engage patient in concrete, reality-based recreational tasks (e.g., painting, simple board games).',
                    'Administer prescribed Olanzapine 10 mg orally and observe patient swallowing completely (check for cheeking).'
                  ],
                  rationales: [
                    'Sealed containers minimize fear of poisoning and promote adequate nutritional intake.',
                    'Validating emotions builds rapport while avoiding reinforcement of false beliefs.',
                    'Reality-oriented activities redirect attention away from paranoid ruminations.',
                    'Direct observation ensures adherence and prevents medication hoarding.'
                  ],
                  evaluation: 'Patient ate full meal of sealed yogurt and bananas; took oral medications without cheeking; anxiety reduced.'
                },
                universityQuestions: [
                  {
                    id: 'q-mhn-laq-1',
                    type: 'LAQ',
                    marks: 15,
                    question: 'A 24-year-old male is brought to psychiatric OPD by parents with auditory hallucinations, paranoid delusions, and self-neglect for 8 months. (a) Define Schizophrenia and state Bleuler 4 A’s. (b) Differentiate Positive and Negative symptoms. (c) Write a comprehensive Nursing Care Plan.',
                    frequency: 'Frequently Asked in MUHS',
                    modelAnswerOutline: '1. Definition & Bleuler 4 A’s (Affect, Association, Autism, Ambivalence). 2. Dopamine hypothesis. 3. Positive vs Negative symptoms comparative table. 4. Pharmacotherapy & EPS signs. 5. Nursing process table (Disturbed thought processes, Sensory-perceptual alteration, Self-care deficit).',
                    keyPointsToInclude: ['Bleuler 4 As', 'Dopamine hypothesis', 'Never argue delusions', 'EPS monitoring']
                  }
                ],
                mcqs: [
                  {
                    id: 'mcq-mhn-1',
                    topicId: 'topic-mhn-schizophrenia',
                    question: 'A patient with schizophrenia states: "The radio announcer is talking directly about my life secrets." Which clinical sign is the patient demonstrating?',
                    options: [
                      { id: 'a', text: 'Delusion of Grandeur' },
                      { id: 'b', text: 'Delusion of Reference' },
                      { id: 'c', text: 'Visual Hallucination' },
                      { id: 'd', text: 'Nihilistic Delusion' }
                    ],
                    correctAnswerId: 'b',
                    explanation: 'Delusion of reference is a false belief that neutral external events, broadcasts, or remarks have a direct personal meaning specifically intended for the individual.',
                    clinicalRationale: 'Delusion of grandeur involves believing one has special powers or royal identity.',
                    tag: 'MUHS_Theory'
                  }
                ]
              },
              {
                id: 'topic-mhn-mania-depression',
                subjectId: 'mental_health',
                subjectName: 'Mental Health Nursing',
                year: '3rd_year',
                unitNumber: 2,
                unitTitle: 'Psychoses & Mood Disorders',
                title: 'Bipolar Affective Disorder: Mania & Major Depressive Disorder (Suicide Risk)',
                description: 'Mania features (DIG FAST: Distractibility, Indiscretion, Grandiosity, Flight of ideas, Activity, Sleep deficit, Talkativeness), Lithium toxicity (>1.5 mEq/L), Suicide assessment (SAD PERSONS scale).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Emergency suicide precautions and Lithium level monitoring.',
                officialSyllabusCode: 'MUHS-MHN-U2-T3'
              }
            ]
          },
          {
            id: 'unit-mhn-treatments',
            unitNumber: 3,
            title: 'Psychiatric Treatments & Emergencies',
            description: 'Electroconvulsive Therapy (ECT - Pre/Intra/Post Nursing Care), Psychiatric Emergencies (Violent patient, Lithium toxicity, Neuroleptic Malignant Syndrome).',
            subjectId: 'mental_health',
            topics: [
              {
                id: 'topic-mhn-ect',
                subjectId: 'mental_health',
                subjectName: 'Mental Health Nursing',
                year: '3rd_year',
                unitNumber: 3,
                unitTitle: 'Treatments & Emergencies',
                title: 'Electroconvulsive Therapy (ECT): Indications, Complications & Pre/Post Nursing Care',
                description: 'Direct vs Modified ECT, Indications (Severe depression with suicidal intent, Catatonia), Atropine & Succinylcholine premedication, Bite block, Post-ictal recovery.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ / 5 Marks SAQ',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Common university question and ECT suite duty.',
                officialSyllabusCode: 'MUHS-MHN-U3-T1'
              },
              {
                id: 'topic-mhn-substance',
                subjectId: 'mental_health',
                subjectName: 'Mental Health Nursing',
                year: '3rd_year',
                unitNumber: 3,
                unitTitle: 'Treatments & Emergencies',
                title: 'Substance Use Disorders: Alcohol Dependence & Delirium Tremens',
                description: 'CAGE questionnaire, Alcohol withdrawal timeline (6-48 hrs), Delirium Tremens (DT - visual hallucinations, tremors, autonomic instability), CIWA score, Benzodiazepines.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'De-addiction ward nursing management.',
                officialSyllabusCode: 'MUHS-MHN-U3-T3'
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // FOURTH / FINAL YEAR
  // =========================================================================
  '4th_year': {
    year: '4th_year',
    title: 'Final Year / 4th Year B.Sc Nursing',
    subtitle: 'Maternity, Community Leadership & Nursing Research',
    description: 'Master Midwifery & Obstetrical Nursing, Community Health Nursing II, Nursing Research & Statistics, and Management of Nursing Services.',
    totalSubjects: 4,
    totalTopics: 14,
    subjects: [
      {
        id: 'midwifery_obg',
        name: 'Midwifery & Obstetrical Nursing',
        shortName: 'Midwifery (OBG)',
        year: '4th_year',
        code: 'N-OBG-401',
        color: '#E11D48',
        badge: 'MATERNITY CORE',
        icon: 'Sparkles',
        theoryHoursRequired: 90,
        practicalHoursRequired: 360,
        muhsMarksWeightage: 75,
        totalUnits: 3,
        totalTopics: 5,
        units: [
          {
            id: 'unit-obg-normal-labor',
            unitNumber: 1,
            title: 'Normal Pregnancy & Stages of Labor',
            description: 'Physiological changes in pregnancy, Antenatal assessment, Stages of Labor (1st, 2nd, 3rd, 4th), Mechanism of Labor, Partograph plotting (Alert & Action lines).',
            subjectId: 'midwifery_obg',
            topics: [
              {
                id: 'topic-obg-mechanism-labor',
                subjectId: 'midwifery_obg',
                subjectName: 'Midwifery & Obstetrical Nursing',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'Normal Labor',
                title: 'Mechanism of Normal Labor (Vertex Presentation) & Cardinal Movements',
                description: 'Engagement, Descent, Flexion, Internal Rotation, Extension, Restitution, External Rotation, Expulsion of trunk; Active management of 3rd stage of labor (AMTSL).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'Labour room conducting normal deliveries.',
                officialSyllabusCode: 'MUHS-OBG-U1-T2',
                definitions: [
                  {
                    term: 'Mechanism of Labor',
                    definition: 'The series of passive positional movements of the fetal head and trunk necessary to navigate through the maternal bony pelvis during delivery.',
                    referenceSource: "DC Dutta's Textbook of Obstetrics (9th Ed)"
                  },
                  {
                    term: 'Partograph',
                    definition: 'A composite graphical record of maternal and fetal data during the active stage of labor plotted against time, featuring Alert and Action lines (4 hours apart) to detect prolonged labor early.',
                    referenceSource: 'WHO Maternal Health Guidelines'
                  }
                ],
                notes: {
                  overview: 'Cardinal movements describe the mechanical adaptations of the fetus as it descends through the pelvic inlet, cavity, and outlet.',
                  etiologyAndRiskFactors: [
                    '3 Ps of Labor: Power (Uterine contractions), Passage (Pelvic inlet/outlet dimensions), Passenger (Fetal size, presentation, attitude)'
                  ],
                  pathophysiologySteps: [
                    '1. Engagement: Biparietal diameter of fetal head passes below the pelvic inlet.',
                    '2. Descent: Continual downward movement driven by uterine fundal contractions and amniotic fluid pressure.',
                    '3. Flexion: Resistance from pelvic floor causes chin to touch fetal chest, presenting smallest suboccipitobregmatic diameter (9.5 cm).',
                    '4. Internal Rotation: Occiput rotates 1/8th of circle anteriorly toward pubic symphysis.',
                    '5. Extension: Fetal head passes beneath symphysis pubis and extends (delivery of face and chin).',
                    '6. Restitution & External Rotation: Head untwists and shoulders rotate internally into anteroposterior diameter.',
                    '7. Expulsion: Anterior shoulder delivers first beneath pubic arch followed by posterior shoulder and body.'
                  ],
                  clinicalManifestations: [
                    'Stage 1: Regular painful uterine contractions causing progressive cervical effacement and dilatation (0 to 10 cm)',
                    'Stage 2: Full cervical dilatation (10 cm) to expulsion of fetus ("Bearing down" reflex)',
                    'Stage 3: Expulsion of placenta and membranes (within 30 minutes)',
                    'Stage 4: First 1–2 hours post-delivery (Observation for Postpartum Hemorrhage - PPH)'
                  ],
                  medicalManagement: [
                    'Active Management of Third Stage of Labor (AMTSL): (1) Administer Oxytocin 10 IU IM within 1 minute of birth, (2) Controlled Cord Traction (Brandt-Andrews method) with uterine counter-traction, (3) Uterine fundal massage every 15 minutes.'
                  ],
                  nursingManagement: [
                    'Plot modified WHO Partograph starting from 4 cm active phase dilatation',
                    'Monitor Fetal Heart Rate (FHR) every 30 minutes in 1st stage, every 5 minutes in 2nd stage (Normal: 110–160 bpm)',
                    'Ensure bladder is emptied regularly (a full bladder impedes fetal descent and causes uterine atony)',
                    'Perform episiotomy if indicated under local infiltration with 1% Lignocaine'
                  ],
                  clinicalPearls: [
                    'AMTSL reduces the incidence of Postpartum Hemorrhage (PPH) by over 60%!',
                    'If partograph crosses Alert line, transfer/refer; if it crosses Action line, intervene immediately.'
                  ]
                },
                nursingCarePlan: {
                  assessment: '24-year-old Primigravida at 39 weeks gestation, cervical dilatation 5 cm, contractions 3 in 10 minutes lasting 40 seconds, FHR 142 bpm, pain score 8/10.',
                  nursingDiagnosis: 'Acute Pain related to uterine muscle contractions, cervical dilatation, and pelvic tissue distension during 1st stage of labor.',
                  expectedOutcome: 'Patient utilizes effective breathing relaxation techniques, verbalizes manageable comfort levels, and maintains normal labor progression.',
                  interventions: [
                    'Teach and guide rhythmic deep abdominal breathing and slow panting during contractions.',
                    'Provide sacral back counter-pressure and encourage ambulation/upright positions.',
                    'Offer sips of clear fluids and keep perineal area dry and clean.',
                    'Acknowledge labor effort with continuous supportive presence ("Doula effect").'
                  ],
                  rationales: [
                    'Controlled breathing enhances oxygenation to myometrium and reduces anxiety-induced pain perception.',
                    'Sacral pressure stimulates large sensory nerve fibers, gating off pain transmission (Gate Control Theory).',
                    'Upright positions utilize gravity to accelerate fetal head descent and cervical dilation.',
                    'Continuous emotional support reduces labor duration and need for pharmacological analgesia.'
                  ],
                  evaluation: 'Patient successfully practiced breathing techniques; cervical dilatation progressed to 8 cm along alert line; FHR 138 bpm.'
                },
                universityQuestions: [
                  {
                    id: 'q-obg-laq-1',
                    type: 'LAQ',
                    marks: 15,
                    question: 'A 22-year-old Primigravida is admitted in active labor. (a) Define Labor and state the 4 stages. (b) Explain the cardinal movements of the Mechanism of Normal Labor with diagrams. (c) Describe the components of Active Management of Third Stage of Labor (AMTSL).',
                    frequency: 'Frequently Asked in MUHS',
                    modelAnswerOutline: '1. Definition of labor & stages. 2. Step-by-step 7 cardinal movements (Engagement, Descent, Flexion, Internal Rotation, Extension, Restitution, Expulsion). 3. AMTSL protocol (Oxytocin 10 IU IM, CCT, Fundal massage). 4. Nursing role during labor room management.',
                    keyPointsToInclude: ['7 cardinal movements', 'AMTSL 3 steps', 'Partograph alert/action lines', 'Normal FHR 110-160 bpm']
                  }
                ],
                mcqs: [
                  {
                    id: 'mcq-obg-1',
                    topicId: 'topic-obg-mechanism-labor',
                    question: 'Which of the following is the first action to be performed in Active Management of Third Stage of Labor (AMTSL)?',
                    options: [
                      { id: 'a', text: 'Immediate cord clamping within 5 seconds' },
                      { id: 'b', text: 'Administration of 10 IU Oxytocin IM within 1 minute of fetal delivery' },
                      { id: 'c', text: 'Vigorous manual removal of placenta' },
                      { id: 'd', text: 'Application of fundal pressure' }
                    ],
                    correctAnswerId: 'b',
                    explanation: 'AMTSL standard requires administering a uterotonic (Oxytocin 10 IU IM) within 1 minute of infant delivery, after ruling out a second twin.',
                    clinicalRationale: 'Early oxytocin prevents uterine atony, which accounts for 80% of primary Postpartum Hemorrhage.',
                    tag: 'Emergency_Action'
                  }
                ]
              },
              {
                id: 'topic-obg-partograph',
                subjectId: 'midwifery_obg',
                subjectName: 'Midwifery & Obstetrical Nursing',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'Normal Labor',
                title: 'Partograph: Plotting, Alert Line, Action Line & Early Detection of Prolonged Labor',
                description: 'Modified WHO Partograph, Active phase plotting (begins at 4 cm), Cervicograph, Fetal Heart Rate, Molding, Maternal vitals.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Labour room standard monitoring chart.',
                officialSyllabusCode: 'MUHS-OBG-U1-T4'
              }
            ]
          },
          {
            id: 'unit-obg-high-risk',
            unitNumber: 2,
            title: 'High-Risk Pregnancy & Obstetric Emergencies',
            description: 'Hypertensive Disorders in Pregnancy (Preeclampsia & Eclampsia), Antepartum Hemorrhage (Placenta Previa vs Abruptio Placentae), Postpartum Hemorrhage (PPH).',
            subjectId: 'midwifery_obg',
            topics: [
              {
                id: 'topic-obg-preeclampsia',
                subjectId: 'midwifery_obg',
                subjectName: 'Midwifery & Obstetrical Nursing',
                year: '4th_year',
                unitNumber: 2,
                unitTitle: 'High-Risk Pregnancy',
                title: 'Preeclampsia & Eclampsia: Magnesium Sulfate (Pritchard Regimen) Nursing Care',
                description: 'Hypertension (≥140/90 mmHg) + Proteinuria (>300mg/24h) after 20 weeks; Signs of impending eclampsia (Headache, Scotoma, Epigastric pain); Magnesium Sulfate loading & maintenance dose; Toxicity checks (Knee jerk reflex, Urine output > 30mL/hr, Resp rate > 12/min); Antidote: Calcium Gluconate.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 50,
                clinicalRelevance: 'Leading cause of maternal mortality; emergency MagSulf administration protocol.',
                officialSyllabusCode: 'MUHS-OBG-U2-T1'
              },
              {
                id: 'topic-obg-pph',
                subjectId: 'midwifery_obg',
                subjectName: 'Midwifery & Obstetrical Nursing',
                year: '4th_year',
                unitNumber: 2,
                unitTitle: 'High-Risk Pregnancy',
                title: 'Postpartum Hemorrhage (PPH): 4 Ts Etiology, Management & Bimanual Compression',
                description: 'Primary vs Secondary PPH (>500 mL in vaginal, >1000 mL in C-section); 4 Ts (Tone, Trauma, Tissue, Thrombin); Uterotonic agents (Oxytocin, Methylergometrine, Carboprost, Misoprostol); Uterine tamponade & Bimanual compression.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Immediate life-saving obstetric resuscitation.',
                officialSyllabusCode: 'MUHS-OBG-U2-T3'
              }
            ]
          },
          {
            id: 'unit-obg-newborn',
            unitNumber: 3,
            title: 'Newborn Care & Lactation Management',
            description: 'Immediate newborn care (Suction, Drying, Cord clamping, APGAR score at 1 & 5 min), Kangaroo Mother Care (KMC), Exclusive Breastfeeding promotion.',
            subjectId: 'midwifery_obg',
            topics: [
              {
                id: 'topic-obg-apgar-kmc',
                subjectId: 'midwifery_obg',
                subjectName: 'Midwifery & Obstetrical Nursing',
                year: '4th_year',
                unitNumber: 3,
                unitTitle: 'Newborn Care',
                title: 'Immediate Care of Newborn, APGAR Score & Kangaroo Mother Care (KMC)',
                description: 'APGAR score components (Appearance, Pulse, Grimace, Activity, Respiration), KMC components (Skin-to-skin contact + Exclusive breastfeeding) for Low Birth Weight babies (<2.5 kg).',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Universal neonatal resuscitation & SNCU practice.',
                officialSyllabusCode: 'MUHS-OBG-U3-T1'
              }
            ]
          }
        ]
      },
      {
        id: 'community_health_2',
        name: 'Community Health Nursing II',
        shortName: 'CHN II',
        year: '4th_year',
        code: 'N-CHN2-402',
        color: '#059669',
        badge: 'PUBLIC HEALTH LEADERSHIP',
        icon: 'Users',
        theoryHoursRequired: 90,
        practicalHoursRequired: 135,
        muhsMarksWeightage: 75,
        totalUnits: 2,
        totalTopics: 3,
        units: [
          {
            id: 'unit-chn2-programs',
            unitNumber: 1,
            title: 'National Health Programs & Health Administration',
            description: 'National Rural Health Mission (NRHM/NHM), Ayushman Bharat (PM-JAY & Health and Wellness Centers), National Vector Borne Disease Control Program (NVBDCP), RMNCH+A.',
            subjectId: 'community_health_2',
            topics: [
              {
                id: 'topic-chn2-nhm',
                subjectId: 'community_health_2',
                subjectName: 'Community Health Nursing II',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'National Health Programs',
                title: 'National Health Mission (NHM), ASHA Worker Roles & Ayushman Bharat (HWCs)',
                description: 'Structure of NHM, Accredited Social Health Activist (ASHA) selection & incentives, Health & Wellness Centres (HWCs / Ayushman Arogya Mandir) comprehensive primary healthcare.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Rural community posting and primary healthcare management.',
                officialSyllabusCode: 'MUHS-CHN2-U1-T1'
              },
              {
                id: 'topic-chn2-delivery-system',
                subjectId: 'community_health_2',
                subjectName: 'Community Health Nursing II',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'National Health Programs',
                title: 'Health Care Delivery System in India: Sub-Centre, PHC, CHC & District Hospital',
                description: 'Population norms (Plain vs Hilly/Tribal), Staffing pattern (ANM, MPW, MO, Staff Nurse), Indian Public Health Standards (IPHS norms).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Foundation of Indian public health infrastructure.',
                officialSyllabusCode: 'MUHS-CHN2-U1-T3'
              }
            ]
          },
          {
            id: 'unit-chn2-disaster',
            unitNumber: 2,
            title: 'Disaster Nursing & International Health Agencies',
            description: 'Disaster management cycle (Mitigation, Preparedness, Response, Recovery), Triage color coding (Red, Yellow, Green, Black), WHO, UNICEF, Red Cross.',
            subjectId: 'community_health_2',
            topics: [
              {
                id: 'topic-chn2-triage',
                subjectId: 'community_health_2',
                subjectName: 'Community Health Nursing II',
                year: '4th_year',
                unitNumber: 2,
                unitTitle: 'Disaster Nursing',
                title: 'Disaster Management: Triage Tagging (Red, Yellow, Green, Black) & Nurse Role',
                description: 'START Triage system (Simple Triage and Rapid Treatment), Red (Immediate life threat), Yellow (Delayed), Green (Minor/walking wounded), Black (Deceased/expectant).',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Mass casualty and emergency preparedness.',
                officialSyllabusCode: 'MUHS-CHN2-U2-T2'
              }
            ]
          }
        ]
      },
      {
        id: 'nursing_research',
        name: 'Nursing Research & Statistics',
        shortName: 'Research & Stats',
        year: '4th_year',
        code: 'N-RES-403',
        color: '#D97706',
        badge: 'SCIENTIFIC INQUIRY',
        icon: 'BarChart2',
        theoryHoursRequired: 45,
        practicalHoursRequired: 45,
        muhsMarksWeightage: 75,
        totalUnits: 2,
        totalTopics: 3,
        units: [
          {
            id: 'unit-res-process',
            unitNumber: 1,
            title: 'Nursing Research Process & Designs',
            description: 'Steps of research process, Research problem & hypotheses, Quantitative (Experimental, Quasi-experimental, Non-experimental) vs Qualitative designs, Sampling techniques.',
            subjectId: 'nursing_research',
            topics: [
              {
                id: 'topic-res-designs',
                subjectId: 'nursing_research',
                subjectName: 'Nursing Research & Statistics',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'Research Designs',
                title: 'Quantitative Research Designs: True Experimental (RCT) vs Quasi-Experimental',
                description: '3 Essential properties of True Experiment (Manipulation, Control, Randomization); Pre-test post-test design, Soloman four-group, Threats to internal/external validity.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Conducting final year B.Sc Nursing dissertation projects.',
                officialSyllabusCode: 'MUHS-RES-U1-T2'
              },
              {
                id: 'topic-res-sampling',
                subjectId: 'nursing_research',
                subjectName: 'Nursing Research & Statistics',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'Research Designs',
                title: 'Sampling Techniques: Probability vs Non-Probability Sampling Methods',
                description: 'Simple random, Stratified, Systematic, Cluster; Purposive, Convenience, Quota, Snowball sampling with nursing research examples.',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Sample selection for clinical projects and surveys.',
                officialSyllabusCode: 'MUHS-RES-U1-T4'
              }
            ]
          },
          {
            id: 'unit-stats-bio',
            unitNumber: 2,
            title: 'Biostatistics in Nursing',
            description: 'Measures of Central Tendency (Mean, Median, Mode), Measures of Dispersion (Standard Deviation, Variance), Normal Distribution Curve, Chi-Square & t-Test.',
            subjectId: 'nursing_research',
            topics: [
              {
                id: 'topic-stats-central',
                subjectId: 'nursing_research',
                subjectName: 'Nursing Research & Statistics',
                year: '4th_year',
                unitNumber: 2,
                unitTitle: 'Biostatistics',
                title: 'Measures of Central Tendency (Mean, Median, Mode) & Standard Deviation Calculation',
                description: 'Formulas, grouped vs ungrouped data calculation, properties of normal distribution curve (Bell curve, 68-95-99.7 rule).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ (Numerical + Theory)',
                estimatedStudyMinutes: 45,
                clinicalRelevance: 'Data analysis and interpreting evidence-based nursing journals.',
                officialSyllabusCode: 'MUHS-STATS-U2-T1'
              }
            ]
          }
        ]
      },
      {
        id: 'nursing_mgmt',
        name: 'Management of Nursing Services & Education',
        shortName: 'Nursing Mgmt',
        year: '4th_year',
        code: 'N-MGMT-404',
        color: '#8B5CF6',
        badge: 'LEADERSHIP & ADMIN',
        icon: 'Award',
        theoryHoursRequired: 90,
        practicalHoursRequired: 120,
        muhsMarksWeightage: 75,
        totalUnits: 2,
        totalTopics: 3,
        units: [
          {
            id: 'unit-mgmt-principles',
            unitNumber: 1,
            title: 'Principles & Functions of Nursing Administration',
            description: 'Henri Fayol 14 principles of management, POSDCORB (Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting), Leadership styles, Ward management.',
            subjectId: 'nursing_mgmt',
            topics: [
              {
                id: 'topic-mgmt-posdcorb',
                subjectId: 'nursing_mgmt',
                subjectName: 'Management of Nursing Services',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'Functions of Management',
                title: 'Functions of Management (POSDCORB) & Henri Fayol Principles in Nursing',
                description: 'Planning, Organizing (Organizational charts), Staffing (Staff calculation by nurse-patient ratio), Directing, Leadership styles (Autocratic, Democratic, Laissez-faire).',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Head nurse and ward in-charge administration.',
                officialSyllabusCode: 'MUHS-MGMT-U1-T1'
              },
              {
                id: 'topic-mgmt-ward',
                subjectId: 'nursing_mgmt',
                subjectName: 'Management of Nursing Services',
                year: '4th_year',
                unitNumber: 1,
                unitTitle: 'Functions of Management',
                title: 'Ward Management, Material Management (ABC/VED Analysis) & Duty Rostering',
                description: 'Ward environment physical setup, ABC (Always Better Control) & VED (Vital, Essential, Desirable) inventory control, Preparation of monthly staff nurse duty rosters.',
                importance: 'High',
                muhsExamWeightage: '15 Marks LAQ / 5 Marks SAQ',
                estimatedStudyMinutes: 40,
                clinicalRelevance: 'Inventory stock management, shift handovers, and staff allocation.',
                officialSyllabusCode: 'MUHS-MGMT-U1-T3'
              }
            ]
          },
          {
            id: 'unit-mgmt-quality',
            unitNumber: 2,
            title: 'Quality Assurance & Regulatory Bodies in Nursing',
            description: 'NABH accreditation standards, Nursing Audit, Professional Ethics & Code of Conduct, INC and State Nursing Council (MNC - Maharashtra Nursing Council) functions.',
            subjectId: 'nursing_mgmt',
            topics: [
              {
                id: 'topic-mgmt-quality-audit',
                subjectId: 'nursing_mgmt',
                subjectName: 'Management of Nursing Services',
                year: '4th_year',
                unitNumber: 2,
                unitTitle: 'Quality Assurance',
                title: 'Nursing Audit, Quality Assurance (NABH Standards) & Incident Reporting',
                description: 'Retrospective vs Concurrent nursing audit, Sentinel event reporting, Medication error documentation, Role of Maharashtra Nursing Council (MNC).',
                importance: 'High',
                muhsExamWeightage: '5 Marks SAQ',
                estimatedStudyMinutes: 35,
                clinicalRelevance: 'Hospital accreditation and patient safety compliance.',
                officialSyllabusCode: 'MUHS-MGMT-U2-T2'
              }
            ]
          }
        ]
      }
    ]
  }
};

export const getAllNursingTopics = (year?: NursingYear): NursingTopic[] => {
  const yearsToScan = year ? [year] : (['2nd_year', '3rd_year', '4th_year'] as NursingYear[]);
  const topics: NursingTopic[] = [];
  yearsToScan.forEach((y) => {
    const yearData = NURSING_CURRICULUM_DATA[y];
    if (yearData) {
      yearData.subjects.forEach((s) => {
        s.units.forEach((u) => {
          u.topics.forEach((t) => {
            topics.push(t);
          });
        });
      });
    }
  });
  return topics;
};

export const getNursingTopicById = (topicId: string): NursingTopic | undefined => {
  return getAllNursingTopics().find((t) => t.id === topicId);
};

export const getNursingSubjectById = (subjectId: NursingSubjectId, year?: NursingYear): NursingSubject | undefined => {
  const yearsToScan = year ? [year] : (['2nd_year', '3rd_year', '4th_year'] as NursingYear[]);
  for (const y of yearsToScan) {
    const s = NURSING_CURRICULUM_DATA[y]?.subjects.find((sub) => sub.id === subjectId);
    if (s) return s;
  }
  return undefined;
};
