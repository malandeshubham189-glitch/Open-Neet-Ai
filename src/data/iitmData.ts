import { IITMLectureResource, IITMSubjectMeta, IITMQuizQuestion } from '../types/iitm';

export const IITM_MATHEMATICS_1_RESOURCE: IITMLectureResource = {
  resourceId: 'iitm-math-1-oneshot',
  courseId: 'iit_madras_bs',
  subjectId: 'math_1',
  subjectName: 'Mathematics 1',
  title: 'MATHEMATICS 1 in OneShot | All Concepts & PYQs Covered | Qualifier & Quiz 1 | IIT Madras BS | May 26',
  subtitle: 'Complete Foundation Mathematics 1 covering Functions, Coordinate Geometry, Polynomials, Linear & Quadratic Equations, Matrices & Systems of Linear Equations.',
  platform: 'youtube',
  videoId: 'AJVzQiCl7RI',
  canonicalUrl: 'https://www.youtube.com/watch?v=AJVzQiCl7RI',
  userProvidedUrl: 'https://youtu.be/AJVzQiCl7RI?si=ov7kuKEOyyfaZjOZ',
  embedUrl: 'https://www.youtube-nocookie.com/embed/AJVzQiCl7RI',
  durationMinutes: 185,
  resourceType: 'lecture',
  sourceType: 'USER_PROVIDED',
  isUserProvided: true,
  verified: true,
  status: 'ACTIVE',
  instructorOrChannel: 'IIT Madras BS Degree Prep',
  termTag: 'Qualifier & Quiz 1 | May 26',
  keyTopicsCovered: [
    'Relations, Functions, Domain & Range',
    'Polynomial Functions & Root Finding',
    'Straight Lines, Slopes, Distance & Coordinate Systems',
    'Quadratic Functions, Vertex Form & Parabolic Models',
    'Matrices, Determinants & Row Operations',
    'System of Linear Equations (Gaussian Elimination & Consistency)',
    'Qualifier Exam & Quiz 1 High-Yield PYQs'
  ]
};

export const IITM_STATISTICS_1_RESOURCE: IITMLectureResource = {
  resourceId: 'iitm-stats-1-oneshot',
  courseId: 'iit_madras_bs',
  subjectId: 'stats_1',
  subjectName: 'Statistics 1',
  title: 'STATISTICS 1 in OneShot | All Concepts & PYQs Covered | Qualifier & Quiz 1 | IIT Madras BS | May 26',
  subtitle: 'Complete Foundation Statistics 1 covering Categorical & Numerical Data, Central Tendency, Dispersion, Probability Axioms, Bayes Theorem & Random Variables.',
  platform: 'youtube',
  videoId: 'NYslmPBTu-4',
  canonicalUrl: 'https://www.youtube.com/watch?v=NYslmPBTu-4',
  userProvidedUrl: 'https://youtu.be/NYslmPBTu-4?si=yEBnTVNrbUmJhGaI',
  embedUrl: 'https://www.youtube-nocookie.com/embed/NYslmPBTu-4',
  durationMinutes: 195,
  resourceType: 'lecture',
  sourceType: 'USER_PROVIDED',
  isUserProvided: true,
  verified: true,
  status: 'ACTIVE',
  instructorOrChannel: 'IIT Madras BS Degree Prep',
  termTag: 'Qualifier & Quiz 1 | May 26',
  keyTopicsCovered: [
    'Data Types: Nominal, Ordinal, Interval & Ratio',
    'Measures of Central Tendency: Mean, Median, Mode & Trimmed Mean',
    'Measures of Dispersion: Variance, Standard Deviation, IQR & Box Plots',
    'Classical Probability, Conditional Probability & Independence',
    'Law of Total Probability & Bayes Theorem',
    'Discrete Random Variables, PMF & CDF',
    'Qualifier Exam & Quiz 1 High-Yield PYQs'
  ]
};

export const IITM_SUBJECTS_METADATA: Record<'math_1' | 'stats_1', IITMSubjectMeta> = {
  math_1: {
    id: 'math_1',
    code: 'BSMA1001',
    title: 'Mathematics 1',
    description: 'Foundation Level Core: Algebraic structures, coordinate geometry, functions, polynomials, matrices and systems of linear equations for data science.',
    term: 'Foundation Term 1',
    credits: 4,
    lectureResource: IITM_MATHEMATICS_1_RESOURCE,
    qualifierWeightage: 'Core Qualifier & Quiz 1 Requirement (Minimum 40% to Qualify for Degree Entry)',
    color: {
      primary: '#2563EB',
      light: '#EFF6FF',
      border: '#BFDBFE',
      accent: '#1D4ED8'
    }
  },
  stats_1: {
    id: 'stats_1',
    code: 'BSST1001',
    title: 'Statistics 1',
    description: 'Foundation Level Core: Descriptive statistics, exploratory data analysis, probability axioms, conditional probability, Bayes theorem and discrete distributions.',
    term: 'Foundation Term 1',
    credits: 4,
    lectureResource: IITM_STATISTICS_1_RESOURCE,
    qualifierWeightage: 'Core Qualifier & Quiz 1 Requirement (Minimum 40% to Qualify for Degree Entry)',
    color: {
      primary: '#0D9488',
      light: '#F0FDFA',
      border: '#99F6E4',
      accent: '#0F766E'
    }
  }
};

export const IITM_MATH_1_QUESTIONS: IITMQuizQuestion[] = [
  {
    id: 'iitm-m1-q1',
    question: 'Consider a system of linear equations Ax = b where A is a 3x3 matrix. If det(A) ≠ 0, what can be concluded about the solution set?',
    options: [
      'The system has infinitely many solutions',
      'The system has a unique solution given by x = A⁻¹b',
      'The system has no solution',
      'The solution depends solely on the vector b being non-zero'
    ],
    correctOptionIndex: 1,
    explanation: 'When det(A) ≠ 0, matrix A is invertible (non-singular). By Cramer\'s Rule and Matrix Inversion Theorem, Ax = b has a unique solution given by x = A⁻¹b for every b.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Matrices & Systems of Linear Equations'
  },
  {
    id: 'iitm-m1-q2',
    question: 'Let f(x) = ax² + bx + c be a quadratic function with a > 0. At what point does f(x) attain its global minimum?',
    options: [
      'x = -b / (2a)',
      'x = b / (2a)',
      'x = -c / (2a)',
      'x = -b / a'
    ],
    correctOptionIndex: 0,
    explanation: 'By completing the square or taking the derivative f\'(x) = 2ax + b = 0, the vertex occurs at x = -b / (2a). Since a > 0 (parabola opens upwards), this vertex is the global minimum with value f(-b/(2a)) = c - b²/(4a).',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Quadratic Functions & Vertex Form'
  },
  {
    id: 'iitm-m1-q3',
    question: 'What is the equation of the line passing through (2, 3) and perpendicular to the line 3x + 4y = 12?',
    options: [
      '4x - 3y + 1 = 0',
      '4x - 3y - 1 = 0',
      '3x - 4y + 6 = 0',
      '4x + 3y - 17 = 0'
    ],
    correctOptionIndex: 0,
    explanation: 'The given line is 3x + 4y = 12 with slope m₁ = -3/4. The perpendicular line must have slope m₂ = -1 / m₁ = 4/3. Using point-slope formula with (2, 3): (y - 3) = (4/3)(x - 2) => 3y - 9 = 4x - 8 => 4x - 3y + 1 = 0.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Coordinate Geometry & Straight Lines'
  },
  {
    id: 'iitm-m1-q4',
    question: 'If f(x) = (x - 3)/(x + 2), what is the domain and range of the inverse function f⁻¹(x)?',
    options: [
      'Domain: ℝ \\ {1}, Range: ℝ \\ {-2}',
      'Domain: ℝ \\ {-2}, Range: ℝ \\ {3}',
      'Domain: ℝ \\ {1}, Range: ℝ \\ {3}',
      'Domain: ℝ \\ {3}, Range: ℝ \\ {-2}'
    ],
    correctOptionIndex: 0,
    explanation: 'To find f⁻¹(x): let y = (x - 3)/(x + 2) => y(x + 2) = x - 3 => yx + 2y = x - 3 => x(y - 1) = -2y - 3 => x = (2y + 3)/(1 - y). Thus f⁻¹(x) = (2x + 3)/(1 - x). The domain of f⁻¹(x) is ℝ \\ {1} and its range is the domain of f(x), which is ℝ \\ {-2}.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Functions, Inverse & Domain-Range'
  },
  {
    id: 'iitm-m1-q5',
    question: 'For what value of k will the vectors [1, 2, 3] and [2, -1, k] in ℝ³ be orthogonal?',
    options: [
      'k = 0',
      'k = 1',
      'k = -1',
      'k = 2'
    ],
    correctOptionIndex: 0,
    explanation: 'Two vectors u and v are orthogonal if and only if their dot product u · v = 0. Here, (1)(2) + (2)(-1) + (3)(k) = 0 => 2 - 2 + 3k = 0 => 3k = 0 => k = 0.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Vectors & Linear Algebra'
  }
];

export const IITM_STATS_1_QUESTIONS: IITMQuizQuestion[] = [
  {
    id: 'iitm-s1-q1',
    question: 'A dataset has values: 4, 7, 8, 9, 12, 14, 18, 45. Which measure of central tendency is the most appropriate summary to minimize distortion by the extreme value 45?',
    options: [
      'Arithmetic Mean',
      'Median',
      'Geometric Mean',
      'Mid-Range'
    ],
    correctOptionIndex: 1,
    explanation: 'The median is a robust statistic that is non-parametric and resistant to extreme outliers. The arithmetic mean is heavily inflated by the extreme value 45, whereas the median remains unaffected.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Measures of Central Tendency'
  },
  {
    id: 'iitm-s1-q2',
    question: 'In a medical screening test, 1% of the population has a rare condition (P(C) = 0.01). The test has a sensitivity P(+|C) = 0.95 and false positive rate P(+|C\') = 0.05. By Bayes Theorem, what is the posterior probability P(C|+) that an individual actually has the condition given a positive test result?',
    options: [
      'Approximately 0.161 (16.1%)',
      'Approximately 0.950 (95.0%)',
      'Approximately 0.500 (50.0%)',
      'Approximately 0.010 (1.0%)'
    ],
    correctOptionIndex: 0,
    explanation: 'By Bayes Theorem: P(C|+) = [P(+|C)P(C)] / [P(+|C)P(C) + P(+|C\')P(C\')] = [0.95 * 0.01] / [0.95 * 0.01 + 0.05 * 0.99] = 0.0095 / (0.0095 + 0.0495) = 0.0095 / 0.0590 ≈ 0.1610 (16.1%).',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Bayes Theorem & Conditional Probability'
  },
  {
    id: 'iitm-s1-q3',
    question: 'If X is a discrete random variable with PMF P(X = k) = c · (1/2)ᵏ for k = 1, 2, 3, ..., what is the normalization constant c?',
    options: [
      'c = 1',
      'c = 2',
      'c = 1/2',
      'c = ln(2)'
    ],
    correctOptionIndex: 0,
    explanation: 'For a valid PMF, Σ P(X = k) = 1 for k from 1 to ∞. Σ c*(1/2)ᵏ = c * [(1/2) / (1 - 1/2)] = c * 1 = 1 => c = 1.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Discrete Random Variables & PMF'
  },
  {
    id: 'iitm-s1-q4',
    question: 'What is the Interquartile Range (IQR) of a distribution, and how is it used in the Tukey 1.5·IQR rule to detect outliers?',
    options: [
      'IQR = Q3 - Q1; Outliers lie below Q1 - 1.5·IQR or above Q3 + 1.5·IQR',
      'IQR = Q3 + Q1; Outliers lie within 1.5 standard deviations of the mean',
      'IQR = Maximum - Minimum; Outliers lie in the top 5% of data',
      'IQR = Q2 - Q1; Outliers lie outside the 95% confidence interval'
    ],
    correctOptionIndex: 0,
    explanation: 'The Interquartile Range is IQR = Q3 - Q1 (the spread of the middle 50% of the data). In Tukey\'s box plot rule, any observation below the lower fence (Q1 - 1.5*IQR) or above the upper fence (Q3 + 1.5*IQR) is flagged as an outlier.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Measures of Dispersion & Outliers'
  },
  {
    id: 'iitm-s1-q5',
    question: 'If events A and B are independent with P(A) = 0.4 and P(B) = 0.5, what is P(A ∪ B)?',
    options: [
      '0.70',
      '0.90',
      '0.20',
      '0.60'
    ],
    correctOptionIndex: 0,
    explanation: 'For independent events, P(A ∩ B) = P(A) · P(B) = 0.4 · 0.5 = 0.20. Using the addition rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.4 + 0.5 - 0.20 = 0.70.',
    isVerifiedPyq: false,
    questionType: 'AI_PRACTICE',
    topicTag: 'Probability Axioms & Independence'
  }
];

export const IITM_STRUCTURED_NOTES: Record<'math_1' | 'stats_1', {
  overview: string;
  keyFormulas: { label: string; formula: string; note: string }[];
  highYieldConcepts: { heading: string; points: string[] }[];
  qualifierTips: string[];
}> = {
  math_1: {
    overview: 'Mathematics 1 is the quantitative bedrock of the IIT Madras BS Degree Foundation Level. It trains students in rigorous mathematical thinking, matrix algebra, coordinate geometry, and algebraic models needed for data structures and algorithms.',
    keyFormulas: [
      {
        label: 'Slope-Intercept & Point-Slope Line',
        formula: 'y = mx + c  |  y - y₁ = m(x - x₁)',
        note: 'For perpendicular lines m₁ · m₂ = -1; for parallel lines m₁ = m₂.'
      },
      {
        label: 'Quadratic Vertex & Roots',
        formula: 'Vertex x = -b / (2a)  |  Roots x = (-b ± √(b² - 4ac)) / (2a)',
        note: 'Discriminant D = b² - 4ac determines real distinct (D>0), equal (D=0), or complex (D<0) roots.'
      },
      {
        label: 'System of Equations Matrix Form',
        formula: 'Ax = b  =>  x = A⁻¹b (when det(A) ≠ 0)',
        note: 'If det(A) = 0 and (adj A)b = 0, system has infinitely many solutions (consistent dependent); if (adj A)b ≠ 0, no solution (inconsistent).'
      },
      {
        label: 'Distance between Points & Line Distance',
        formula: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)  |  d_line = |ax₀ + by₀ + c| / √(a² + b²)',
        note: 'Crucial for geometry and vector projections in Quiz 1.'
      }
    ],
    highYieldConcepts: [
      {
        heading: '1. Functions, Inverses & Bijectivity',
        points: [
          'A function f: A -> B is invertible if and only if it is both injective (one-to-one) and surjective (onto).',
          'Domain is the set of all valid real inputs; range is the exact set of outputs.',
          'Horizontal Line Test verifies injectivity graphically.'
        ]
      },
      {
        heading: '2. Matrices & Gaussian Elimination',
        points: [
          'Elementary Row Operations: R_i <-> R_j, R_i -> c*R_i (c ≠ 0), R_i -> R_i + c*R_j.',
          'Row Echelon Form (REF) identifies pivots and free variables.',
          'Rank(A) = number of non-zero rows in REF. Consistency criterion: Rank(A) == Rank([A|b]).'
        ]
      },
      {
        heading: '3. Polynomial Optimization',
        points: [
          'For f(x) = ax² + bx + c: if a > 0, vertex is global minimum; if a < 0, vertex is global maximum.',
          'Vertex y-value = c - b²/(4a) = -D / (4a).'
        ]
      }
    ],
    qualifierTips: [
      'In Qualifier and Quiz 1, pay close attention to domain restrictions like denominators ≠ 0 and square root arguments ≥ 0.',
      'Check determinant of coefficient matrices before spending time on Gaussian elimination; if det(A) ≠ 0, you can directly use Cramer\'s Rule or inverse.',
      'Always sketch graphs of quadratic functions to visually verify roots and vertex orientation.'
    ]
  },
  stats_1: {
    overview: 'Statistics 1 establishes foundational data science principles for the IIT Madras BS program. It bridges descriptive summary metrics with probabilistic modeling, discrete distributions, and Bayesian reasoning.',
    keyFormulas: [
      {
        label: 'Sample Mean & Variance',
        formula: 'x̄ = (Σ xᵢ) / n  |  s² = Σ (xᵢ - x̄)² / (n - 1)',
        note: 'Divisor is n - 1 (Bessel\'s correction) for unbiased sample variance estimation.'
      },
      {
        label: 'Bayes Theorem',
        formula: 'P(A|B) = [P(B|A) · P(A)] / P(B) = [P(B|A)P(A)] / [Σ P(B|Aᵢ)P(Aᵢ)]',
        note: 'Translates prior probability P(A) into posterior probability P(A|B) using evidence likelihood.'
      },
      {
        label: 'Tukey Outlier Boundaries',
        formula: 'Lower = Q1 - 1.5 · IQR  |  Upper = Q3 + 1.5 · IQR',
        note: 'IQR = Q3 - Q1 represents the middle 50% data span.'
      },
      {
        label: 'Expected Value & Variance of Discrete R.V.',
        formula: 'E[X] = Σ x · P(X = x)  |  Var(X) = E[X²] - (E[X])²',
        note: 'E[aX + b] = a·E[X] + b and Var(aX + b) = a²·Var(X).'
      }
    ],
    highYieldConcepts: [
      {
        heading: '1. Levels of Measurement (Data Types)',
        points: [
          'Nominal: Categories without natural order (e.g., Blood Group, Color).',
          'Ordinal: Ordered categories without constant distance (e.g., Star Ratings, Education level).',
          'Interval: Ordered numerical values with constant distance but arbitrary zero (e.g., Celsius temperature).',
          'Ratio: True meaningful zero permitting ratios (e.g., Weight, Age, Revenue).'
        ]
      },
      {
        heading: '2. Probability Rules & Independence',
        points: [
          'Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B).',
          'Mutually Exclusive: P(A ∩ B) = 0 => P(A ∪ B) = P(A) + P(B).',
          'Statistical Independence: P(A ∩ B) = P(A) · P(B) or P(A|B) = P(A).'
        ]
      },
      {
        heading: '3. PMF vs CDF',
        points: [
          'PMF f(x) = P(X = x) with f(x) ≥ 0 and Σ f(x) = 1.',
          'CDF F(x) = P(X ≤ x) is a non-decreasing step function approaching 0 at -∞ and 1 at +∞.'
        ]
      }
    ],
    qualifierTips: [
      'For Bayes Theorem problems in Quiz 1, draw a 2x2 contingency table or tree diagram before calculating.',
      'Check whether the question asks for sample standard deviation (divide by n-1) or population standard deviation (divide by n).',
      'Remember that median is resistant to skew and outliers, whereas mean is sensitive.'
    ]
  }
};
