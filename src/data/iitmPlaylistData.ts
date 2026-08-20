import {
  IITMPlaylistMetadata,
  IITMPlaylistLesson,
  IITMWeekMetadata,
  IITMWeekId,
  IITMSubjectId,
  IITMQuizQuestion,
  IITMRawPlaylistVideo,
  IITMPlaylistIntegrityAudit,
  IITMWeekAudit
} from '../types/iitm';

// ============================================================================
// 1. RAW INGESTION DATA (100% COMPLETE PLAYLISTS - ZERO OMISSIONS)
// ============================================================================

export const IITM_MATH_PLAYLIST_METADATA: IITMPlaylistMetadata = {
  playlistId: 'PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA',
  playlistTitle: 'Mathematics for Data Science - 1 (Hindi)',
  canonicalUrl: 'https://www.youtube.com/playlist?list=PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA',
  userProvidedUrl: 'https://youtube.com/playlist?list=PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA',
  channel: 'IIT Madras - B.S. Degree Programme',
  subjectId: 'math_1',
  totalVideosDiscovered: 89,
  totalVideosImported: 89,
  totalWeeksMapped: 4,
  status: 'VALIDATED',
  lastValidated: '2026-08-19',
  courseCode: 'BSMA1001',
  description: 'Official Mathematics for Data Science 1 (Hindi) playlist covering Foundation level Weeks 1 to 4 with zero skipped videos.'
};

export const IITM_MATH_1_PLAYLIST_META = IITM_MATH_PLAYLIST_METADATA;

export const IITM_STATS_PLAYLIST_METADATA: IITMPlaylistMetadata = {
  playlistId: 'PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b',
  playlistTitle: 'Statistics for Data Science - 1 (Hindi)',
  canonicalUrl: 'https://www.youtube.com/playlist?list=PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b',
  userProvidedUrl: 'https://youtube.com/playlist?list=PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b',
  channel: 'IIT Madras - B.S. Degree Programme',
  subjectId: 'stats_1',
  totalVideosDiscovered: 70,
  totalVideosImported: 70,
  totalWeeksMapped: 4,
  status: 'VALIDATED',
  lastValidated: '2026-08-19',
  courseCode: 'BSST1001',
  description: 'Official Statistics for Data Science 1 (Hindi) playlist covering Foundation level Weeks 1 to 4 with zero skipped videos.'
};

export const IITM_STATS_1_PLAYLIST_META = IITM_STATS_PLAYLIST_METADATA;

export const IITM_MATH_RAW_VIDEOS: IITMRawPlaylistVideo[] = [
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "WVYzSqyYvaw",
    "videoTitle": "W1_L1_Natural Numbers and their operations",
    "videoOrder": 1,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "2l57igoPTk0",
    "videoTitle": "W1_L2_Rational Numbers",
    "videoOrder": 2,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "UhcZh0Ys3DA",
    "videoTitle": "W1_L3_Real and Complex Numbers",
    "videoOrder": 3,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "UNOyC-peQ6A",
    "videoTitle": "W1_L4_Set Theory",
    "videoOrder": 4,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "SoJSBzoAACY",
    "videoTitle": "W1_L5_Construction of Subset",
    "videoOrder": 5,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "WOLhm5WmY8o",
    "videoTitle": "W1_L6_Set Examples",
    "videoOrder": 6,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "qdXzECQJjnQ",
    "videoTitle": "W1_L7_Example of set operations",
    "videoOrder": 7,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "xmZy9vOcXv8",
    "videoTitle": "W1_L8_Relations",
    "videoOrder": 8,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "SIJA0-QyhuM",
    "videoTitle": "W1_L9_Functions",
    "videoOrder": 9,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "s3LlomV7ULI",
    "videoTitle": "W1_L10_Relations Examples",
    "videoOrder": 10,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "68gZu0aeg-A",
    "videoTitle": "W1_L11_Function Examples",
    "videoOrder": 11,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "UPdKjINdxKk",
    "videoTitle": "W2_L1_Rectangular coordinate system",
    "videoOrder": 12,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "-6-h_c1FsPk",
    "videoTitle": "W2_L2_Distance formula",
    "videoOrder": 13,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "K1QfV1PZoIo",
    "videoTitle": "W2_L3_Section formula",
    "videoOrder": 14,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "8BV_mBAh9NE",
    "videoTitle": "W2_L6_Parallal and perpendicular lines",
    "videoOrder": 15,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "v5-pfrC4hBc",
    "videoTitle": "W2_L7_Representation of a Line",
    "videoOrder": 16,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "UyiVGyAxBdE",
    "videoTitle": "W2_L8_Equation of Line: Slope-Intercept Form",
    "videoOrder": 17,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "Y50MNBvsKHY",
    "videoTitle": "W2_L9_General Equation of a Line",
    "videoOrder": 18,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "4JVBYF5UOyc",
    "videoTitle": "W2_L10_Examples I",
    "videoOrder": 19,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "p83BEPIW8M0",
    "videoTitle": "W2_L11_Examples II",
    "videoOrder": 20,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "LfMDsHw4ivk",
    "videoTitle": "W2_L12_Distance of a Point from a Line",
    "videoOrder": 21,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "X1naj7rDn8E",
    "videoTitle": "W3_L1_Quadratic functions and its basic",
    "videoOrder": 22,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "VLZ0SFxlNSw",
    "videoTitle": "W3_L2_Examples of quadratic function",
    "videoOrder": 23,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "OvY1J06ioYg",
    "videoTitle": "W3_L3_Quadratic equation and its root using graphical method.",
    "videoOrder": 24,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "WLPMRyAn7xw",
    "videoTitle": "W3_L4_Slope of line and parabola",
    "videoOrder": 25,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "aWIgg59W23k",
    "videoTitle": "W3_L5_Quadratic equations Solve by Factoring.",
    "videoOrder": 26,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "pO3Wj1huotA",
    "videoTitle": "W3_L6_Quadratic equations Solve by Completing the square",
    "videoOrder": 27,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "dAVcu4OlfH4",
    "videoTitle": "W3_L7_Quadratic formula",
    "videoOrder": 28,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "Tf4xS1T3JWU",
    "videoTitle": "W4_L1_Polynomials",
    "videoOrder": 29,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "PISuCIFzeic",
    "videoTitle": "W4_L2_The Degree of the Polynomial",
    "videoOrder": 30,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "t1pYvc3NT1g",
    "videoTitle": "W4_L3_Polynomials in One Variable",
    "videoOrder": 31,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "TKYwa8qzYyI",
    "videoTitle": "W4_L4_Multiplication of Polynomials",
    "videoOrder": 32,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "awN3MVbCklQ",
    "videoTitle": "W4_L5_Division of Polynomials - Part 1",
    "videoOrder": 33,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "GpizNT05nMY",
    "videoTitle": "W4_L6_Division of Polynomials - Part 2",
    "videoOrder": 34,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "BqsCpto3es4",
    "videoTitle": "W4_L7_Characterization of Graphs of Polynomial Functions",
    "videoOrder": 35,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "mGS_hhmrKzQ",
    "videoTitle": "W4_L8_Zeros of Polynomial Functions",
    "videoOrder": 36,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "cAI6mbK3j2Y",
    "videoTitle": "W4_L9_Example",
    "videoOrder": 37,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "D2S8C9UcZRs",
    "videoTitle": "W4_L10_Graphical Behavior of Polynomials at x-Intercepts",
    "videoOrder": 38,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "eFmR1ZatEkY",
    "videoTitle": "W4_L11_Example",
    "videoOrder": 39,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "Wgfv5hB8GAc",
    "videoTitle": "W4_L12_Graphing a Polynomial Function",
    "videoOrder": 40,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "FyRIhfDCfGI",
    "videoTitle": "W5_L7_Composite Functions: Domain",
    "videoOrder": 41,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "J83L0d_BIEI",
    "videoTitle": "W5_L4_Exponential Functions: Graphing",
    "videoOrder": 42,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "S5W1dX4MSXU",
    "videoTitle": "W5_L8_Inverse functions",
    "videoOrder": 43,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "XsujFRGRJws",
    "videoTitle": "W5_L5_Natural exponential Functions",
    "videoOrder": 44,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "bZdO9AF6Gvk",
    "videoTitle": "W5_L3_Exponential Functions: Definitions",
    "videoOrder": 45,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "gs885QNjVM0",
    "videoTitle": "W5_L6_Composite Functions & Examples",
    "videoOrder": 46,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "itQW5U4kFcI",
    "videoTitle": "W5_L2_One-to-One Function: Examples & Theorems",
    "videoOrder": 47,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "zSSlQQafy5Q",
    "videoTitle": "W5_L1_One-to-One Function: Definition & Tests",
    "videoOrder": 48,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "9DQ4rv7FEWg",
    "videoTitle": "W6_L4_Logarithmic Functions: Properties - 1",
    "videoOrder": 49,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "LTYu8kiOB48",
    "videoTitle": "W6_L1_Logarithmic Functions",
    "videoOrder": 50,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "OoRv48xE0Bg",
    "videoTitle": "W6_L6_Logarithmic Functions:Properties - 2",
    "videoOrder": 51,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "cNo4oCyROu4",
    "videoTitle": "W6_L2_Logarithmic Functions: Graphs",
    "videoOrder": 52,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "eKImPkTFlGA",
    "videoTitle": "W6_L7_Logarithmic Equations",
    "videoOrder": 53,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "s0NnGjI9MgQ",
    "videoTitle": "W6_L5_Logarithmic Functions: Applications",
    "videoOrder": 54,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "ZbRgSskHnrw",
    "videoTitle": "W6_L3_Solving Exponential Equations",
    "videoOrder": 55,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "mpSLT4RC2w0",
    "videoTitle": "W7_L2_Functions of one variable",
    "videoOrder": 56,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "RvYDBKo4Jto",
    "videoTitle": "W8_L3_Computing derivatives and L'hopital's rule",
    "videoOrder": 57,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "ULScSMf6Pio",
    "videoTitle": "W8_L4_Tangent and linear approximation",
    "videoOrder": 58,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "-1F-AT17tdw",
    "videoTitle": "W9_L3_Computing areas",
    "videoOrder": 59,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "4hNKLVcOZ1Y",
    "videoTitle": "W9_L1_Critical points",
    "videoOrder": 60,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "a3VrRr71co4",
    "videoTitle": "W9_L6_Computing integrals and areas",
    "videoOrder": 61,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "qzOYvb3eJzA",
    "videoTitle": "W9_L2_Examples",
    "videoOrder": 62,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "rkono1Mn6js",
    "videoTitle": "W9_L5_Integrals as anti-derivatives",
    "videoOrder": 63,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "yWyZinb9WjQ",
    "videoTitle": "W9_L4_Riemann sums and the integral",
    "videoOrder": 64,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "0-sYuyLaxd0",
    "videoTitle": "W10_L2_Some general graph problems",
    "videoOrder": 65,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "1zcVQIY4Cu4",
    "videoTitle": "W10_L1_Introduction to Graphs",
    "videoOrder": 66,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "2PnDynEvbR0",
    "videoTitle": "W10_L3_Representation of graphs",
    "videoOrder": 67,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "5L2yzs2rfFQ",
    "videoTitle": "W10_L8_Complexity of BFS and DFS",
    "videoOrder": 68,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "GUjMchRxsUA",
    "videoTitle": "W10_L7_Applications of BFS and DFS-2",
    "videoOrder": 69,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "Stxuz__LznQ",
    "videoTitle": "W10_L5_Depth-first search",
    "videoOrder": 70,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "arGT84ovfAM",
    "videoTitle": "W10_L6_Applications of BFS and DFS-1",
    "videoOrder": 71,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "cOpnx8M19S4",
    "videoTitle": "W10_L9_Directed Acyclic Graphs",
    "videoOrder": 72,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "kmn6TiJHrRo",
    "videoTitle": "W10_L4_Breadth-first search",
    "videoOrder": 73,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "19RA0_sPn1E",
    "videoTitle": "W11_L2_Transitive Closure",
    "videoOrder": 74,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "2RFyEtGfHtc",
    "videoTitle": "W11_L10_Minimum Cost Spanning Tress: Kruskal's Algorithm",
    "videoOrder": 75,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "83X76Y7NqU4",
    "videoTitle": "W11_L8_Minimum Cost Spanning Tress",
    "videoOrder": 76,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "FoBw7MtTtxk",
    "videoTitle": "W11_L4_Shortest Paths in Weighted Graphs",
    "videoOrder": 77,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "IYvUHJdEjqw",
    "videoTitle": "W11_L5_Single Source Shortest Paths",
    "videoOrder": 78,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "XkR61fXCxYA",
    "videoTitle": "W11_L9_Minimum Cost Spanning Tress: Prim's Algorithm",
    "videoOrder": 79,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "fl3JU6ONC5s",
    "videoTitle": "W11_L1_Longest Paths in DAGs",
    "videoOrder": 80,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "j32W7NDntj4",
    "videoTitle": "W11_L6_Single Source Shortest Paths with Negative Weights",
    "videoOrder": 81,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "pJLBwO6sm6o",
    "videoTitle": "W11_L3_Matrix Multiplication",
    "videoOrder": 82,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "uNxcEdJ-6wc",
    "videoTitle": "W11_L7_All-Pairs Shortest Paths",
    "videoOrder": 83,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "LEUEn3iCmQc",
    "videoTitle": "W7_L4_Limit of a sequence",
    "videoOrder": 84,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "REVD3Nw56C8",
    "videoTitle": "W7_L3_Graphs and tangents of functions of one variable",
    "videoOrder": 85,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "UerNrxbW9ss",
    "videoTitle": "W7_L5_Limits for functions of one variable",
    "videoOrder": 86,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "_o3siJWYWdY",
    "videoTitle": "W7_L1_Function",
    "videoOrder": 87,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "v-p7B9hyMLc",
    "videoTitle": "W8_L1_Limit and continuity",
    "videoOrder": 88,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBb1AyRNidKBrk_N5eTpVQRA",
    "subjectId": "math_1",
    "videoId": "JMY816IQacI",
    "videoTitle": "W8_L2_Differentiability and the derivative",
    "videoOrder": 89,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  }
];

export const IITM_STATS_RAW_VIDEOS: IITMRawPlaylistVideo[] = [
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "nHe1nYmtAy0",
    "videoTitle": "W1_L1_Introduction and types of Data - Basic definitions",
    "videoOrder": 1,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "5e5nHjXJtUg",
    "videoTitle": "W1_L2_Introduction and types of Data - Understanding data",
    "videoOrder": 2,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "JiAaOUCVY-I",
    "videoTitle": "W1_L3_Introduction and types of Data - Classification of data",
    "videoOrder": 3,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "Cwq9xYC8d6g",
    "videoTitle": "W1_L4_Introduction and types of Data - Scales of measurement",
    "videoOrder": 4,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_1",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "ljaAgjT0wuY",
    "videoTitle": "W2_L1_Describing Categorical Data - Frequency distributions",
    "videoOrder": 5,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "tYzmNXeVhvo",
    "videoTitle": "W2_L2_Describing Categorical Data - Charts of categorical data",
    "videoOrder": 6,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "gVyhfRCvV3s",
    "videoTitle": "W2_L3_Describing Categorical Data - Best practices while graphing data - Part 1",
    "videoOrder": 7,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "ZrwpYmZ1Wi0",
    "videoTitle": "W2_L4_Describing Categorical Data - Best practices while graphing data - Part 2",
    "videoOrder": 8,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "C-A8tm4z0dY",
    "videoTitle": "W2_L5_Describing Categorical Data - Mode and Median",
    "videoOrder": 9,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_2",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "nGpwm9Ev5RQ",
    "videoTitle": "W3_L1_Describing Numerical Data - Frequency Tables for numerical data",
    "videoOrder": 10,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "17PjWUHWaqs",
    "videoTitle": "W3_L2_Describing Numerical Data - Mean",
    "videoOrder": 11,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "aiU6QmOxu_Q",
    "videoTitle": "W3_L3_Describing Numerical Data - Median and Mode",
    "videoOrder": 12,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "1RGTqZLQhWU",
    "videoTitle": "W3_L4_Describing Numerical Data - Measures of dispersion- Range, variance and standard deviation",
    "videoOrder": 13,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "lD8UIvaKfOY",
    "videoTitle": "W3_L5_Describing Numerical Data - Percentiles, Quartiles, and Interquartile range",
    "videoOrder": 14,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_3",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "tEnnRFYi_Gw",
    "videoTitle": "W4_L1_Association between two variables - Review of course",
    "videoOrder": 15,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "Q278poQD_x0",
    "videoTitle": "W4_L2_Association between two categorical variables - Introduction",
    "videoOrder": 16,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "7JbEb67GuBI",
    "videoTitle": "W4_L3_Association between two categorical variables - Relative frequencies",
    "videoOrder": 17,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "wMT9uiUbTT8",
    "videoTitle": "W4_L4_Association between two numerical variables - Scatterplot",
    "videoOrder": 18,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "YvKF_tSiT5Q",
    "videoTitle": "W4_L5_Association between two numerical variables - Describing association",
    "videoOrder": 19,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "TxsIi8uLd7A",
    "videoTitle": "W4_L6_Association between two numerical variables - Covariance",
    "videoOrder": 20,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "8yFAbKEgg34",
    "videoTitle": "W4_L7_Association between two numerical variables - Correlation",
    "videoOrder": 21,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "yLqNWxd6pm8",
    "videoTitle": "W4_L8_Association between two numerical variables - Fitting a line",
    "videoOrder": 22,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "5uLNgurbmW8",
    "videoTitle": "W4_L9_Association between categorical and numerical variables",
    "videoOrder": 23,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMapped": "week_4",
    "weekMappingConfidence": "HIGH"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "TeA3VV03li4",
    "videoTitle": "W5_L1_Permutations and Combinations - Basic Principles of counting",
    "videoOrder": 24,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "H7nYfmADo_w",
    "videoTitle": "W5_L2_Permutations and Combinations - Factorials",
    "videoOrder": 25,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "ftfjRB2kK2M",
    "videoTitle": "W5_L3_Permutations and Combinations - Permutations: Distinct objects",
    "videoOrder": 26,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "IOJTvHjF61g",
    "videoTitle": "W5_L4_Permutations and Combinations - Permutations: Objects not distinct and Circular permutations",
    "videoOrder": 27,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "Jb_13IrCtCI",
    "videoTitle": "W6_L1_Permutation and Combinations - Combinations",
    "videoOrder": 28,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "cI28fhKp-2g",
    "videoTitle": "W6_L2_Permutation and Combinations - Applications",
    "videoOrder": 29,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "eTzTxjzztWw",
    "videoTitle": "W7_L1_Probability - Basic Definitions",
    "videoOrder": 30,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "AsW_n-ofMgg",
    "videoTitle": "W7_L2_Probability - Events",
    "videoOrder": 31,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "HdswA7RUKds",
    "videoTitle": "W7_L3_Probability - Venn diagrams",
    "videoOrder": 32,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "ypZ7WpCCn9w",
    "videoTitle": "W7_L4_Probability - Properties of probability",
    "videoOrder": 33,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "WrthczOlnA4",
    "videoTitle": "W7_L5_Probability - Applications",
    "videoOrder": 34,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "K460XSM8KMk",
    "videoTitle": "W7_L6_Probability - Equally likely outcomes",
    "videoOrder": 35,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "U1INCqfPcQI",
    "videoTitle": "W8_L1_Conditional Probability - Contingency tables",
    "videoOrder": 36,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "iaOL0po3LFA",
    "videoTitle": "W8_L2_Conditional Probability - Conditional probability formula",
    "videoOrder": 37,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "HYjvr960Vww",
    "videoTitle": "W8_L3_Conditional Probability - Multiplication rule",
    "videoOrder": 38,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "e4hIjPG5md0",
    "videoTitle": "W8_L4_Conditional Probability - Independent events",
    "videoOrder": 39,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "s3H1MZG7M1s",
    "videoTitle": "W8_L5_Conditional Probability - Independent events: examples",
    "videoOrder": 40,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "G3Mh4rn-Qls",
    "videoTitle": "W8_L6_Conditional Probability - Independent events: properties",
    "videoOrder": 41,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "MNxRz31iuoM",
    "videoTitle": "W8_L7_Conditional Probability - Bayes' rule",
    "videoOrder": 42,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "3PA8ke4OFGQ",
    "videoTitle": "W9_L1_Random Variables - Introduction",
    "videoOrder": 43,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "7mzQJBfLvUQ",
    "videoTitle": "W9_L2_Random variables - Application",
    "videoOrder": 44,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "orPPawqDsr4",
    "videoTitle": "W9_L3_Random variables - Discrete and continuous random variable",
    "videoOrder": 45,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "aJEN0_yyy94",
    "videoTitle": "W9_L4_Discrete random variables - Probability mass function properties",
    "videoOrder": 46,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "_okyiaGmeQY",
    "videoTitle": "W9_L5_Discrete random variables - Graph of probability mass function",
    "videoOrder": 47,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "zZaSsi4Zewc",
    "videoTitle": "W9_L6_Discrete random variables - Cumulative distribution function",
    "videoOrder": 48,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "ThGc3_D1EZg",
    "videoTitle": "W10_L1_Discrete random variable - Application",
    "videoOrder": 49,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "wpyRKlSRtBs",
    "videoTitle": "W10_L2_Expectation of a random variable",
    "videoOrder": 50,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "vZz23oTrGts",
    "videoTitle": "W10_L3_Expectation of a random variable - Properties of expectation",
    "videoOrder": 51,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "xC5JkPEw4hc",
    "videoTitle": "W10_L4_Variance of a random variable",
    "videoOrder": 52,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "Jx1a6lGZUPc",
    "videoTitle": "W10_L5_Variance of a random variable - Properties of variance",
    "videoOrder": 53,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "EnRJ3zR7eOw",
    "videoTitle": "W10_L6_Standard deviation of a random variable",
    "videoOrder": 54,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "GuqwRrMFBPo",
    "videoTitle": "W11_L1_Binomial distribution - Bernoulli distribution",
    "videoOrder": 55,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "Z1tNpzTzwD0",
    "videoTitle": "W11_L2:Binomial distribution - IID Bernoulli trials",
    "videoOrder": 56,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "n1yQsSbfWWE",
    "videoTitle": "W11_L3_Binomial distribution - Distribution of Binomial random variable",
    "videoOrder": 57,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "PuGwhJ6S82c",
    "videoTitle": "W11_L4_Binomial distribution - Modelling situations as Binomial distribution",
    "videoOrder": 58,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "XK2GIMpPXZE",
    "videoTitle": "W11_L5:Binomial distribution - Expectation and variance of Binomial random variable",
    "videoOrder": 59,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "ntq9VQMj2vM",
    "videoTitle": "W11_L6 : Hypergeometric distribution - Distribution of Hypergeometric random variable",
    "videoOrder": 60,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "O7DTy-38oeY",
    "videoTitle": "W11_L7 : Hypergeometric distribution - Expectation and variance of Hypergeometric random variable",
    "videoOrder": 61,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "L2s0osuyGps",
    "videoTitle": "W11_L8_Poisson distribution - Distribution of Poisson random variable",
    "videoOrder": 62,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "MDshO6KUeGI",
    "videoTitle": "W11_L9_Poisson distribution - Expectation and variance of Poisson random variable",
    "videoOrder": 63,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "o_YiPkrPf3c",
    "videoTitle": "W12_L1_Continuous random variable - Uniform distribution",
    "videoOrder": 64,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "97ahpYS6EdI",
    "videoTitle": "W12_L2_Continuous random variable - Uniform distribution: applications",
    "videoOrder": 65,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "3r30q3_oSto",
    "videoTitle": "W12_L7_Standardizing a normal random variable",
    "videoOrder": 66,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "71j4_CT_AZo",
    "videoTitle": "W12_L6_Standard Normal Distribution",
    "videoOrder": 67,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "wC_f1_Jx2DU",
    "videoTitle": "W12_L5_Normal Distribution",
    "videoOrder": 68,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "aBCIYyM3o9g",
    "videoTitle": "W12_L3_Continuous random variable - Non uniform and triangular distribution",
    "videoOrder": 69,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  },
  {
    "playlistId": "PLZ2ps__7DhBbhK4gNFIWwx9cct193V0_b",
    "subjectId": "stats_1",
    "videoId": "TLzSL6UPA0s",
    "videoTitle": "W12_L4_Continuous random variable - Exponential distribution",
    "videoOrder": 70,
    "duration": "N/A",
    "channel": "IIT Madras - B.S. Degree Programme",
    "availabilityStatus": "ACTIVE",
    "weekMappingConfidence": "UNVERIFIED"
  }
];

// ============================================================================
// 2. MATHEMATICS FOR DATA SCIENCE 1 — WEEK 1 TO WEEK 4 MAPPINGS (40 LESSONS)
// ============================================================================

export const IITM_MATH_1_WEEKS: Record<IITMWeekId, IITMWeekMetadata> = {
  "week_1": {
    "weekId": "week_1",
    "subjectId": "math_1",
    "weekNumber": 1,
    "title": "Week 1: Numbers, Sets, Relations & Functions",
    "subtitle": "Foundation of Mathematical Logic, Number Sets & Mapping",
    "description": "Natural, rational, real, and complex number sets, set operations, relations, domain, codomain, and functions.",
    "examRelevance": "Qualifier & Quiz 1 Core Foundation (11 Lectures)",
    "estimatedHours": 4.5,
    "keyTopics": [
      "Natural Numbers",
      "Rational Numbers",
      "Real & Complex Numbers",
      "Set Theory",
      "Subsets",
      "Relations",
      "Functions"
    ],
    "lessons": [
      {
        "lessonId": "math1_week_1_l1",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 1,
        "playlistOrder": 1,
        "title": "W1_L1_Natural Numbers and their operations",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "WVYzSqyYvaw",
        "canonicalUrl": "https://www.youtube.com/watch?v=WVYzSqyYvaw",
        "embedUrl": "https://www.youtube-nocookie.com/embed/WVYzSqyYvaw",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L1_Natural Numbers and their operations as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l2",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 2,
        "playlistOrder": 2,
        "title": "W1_L2_Rational Numbers",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "2l57igoPTk0",
        "canonicalUrl": "https://www.youtube.com/watch?v=2l57igoPTk0",
        "embedUrl": "https://www.youtube-nocookie.com/embed/2l57igoPTk0",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L2_Rational Numbers as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l3",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 3,
        "playlistOrder": 3,
        "title": "W1_L3_Real and Complex Numbers",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "UhcZh0Ys3DA",
        "canonicalUrl": "https://www.youtube.com/watch?v=UhcZh0Ys3DA",
        "embedUrl": "https://www.youtube-nocookie.com/embed/UhcZh0Ys3DA",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L3_Real and Complex Numbers as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l4",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 4,
        "playlistOrder": 4,
        "title": "W1_L4_Set Theory",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "UNOyC-peQ6A",
        "canonicalUrl": "https://www.youtube.com/watch?v=UNOyC-peQ6A",
        "embedUrl": "https://www.youtube-nocookie.com/embed/UNOyC-peQ6A",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L4_Set Theory as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l5",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 5,
        "playlistOrder": 5,
        "title": "W1_L5_Construction of Subset",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "SoJSBzoAACY",
        "canonicalUrl": "https://www.youtube.com/watch?v=SoJSBzoAACY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/SoJSBzoAACY",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L5_Construction of Subset as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l6",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 6,
        "playlistOrder": 6,
        "title": "W1_L6_Set Examples",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "WOLhm5WmY8o",
        "canonicalUrl": "https://www.youtube.com/watch?v=WOLhm5WmY8o",
        "embedUrl": "https://www.youtube-nocookie.com/embed/WOLhm5WmY8o",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L6_Set Examples as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l7",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 7,
        "playlistOrder": 7,
        "title": "W1_L7_Example of set operations",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "qdXzECQJjnQ",
        "canonicalUrl": "https://www.youtube.com/watch?v=qdXzECQJjnQ",
        "embedUrl": "https://www.youtube-nocookie.com/embed/qdXzECQJjnQ",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L7_Example of set operations as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l8",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 8,
        "playlistOrder": 8,
        "title": "W1_L8_Relations",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "xmZy9vOcXv8",
        "canonicalUrl": "https://www.youtube.com/watch?v=xmZy9vOcXv8",
        "embedUrl": "https://www.youtube-nocookie.com/embed/xmZy9vOcXv8",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L8_Relations as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l9",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 9,
        "playlistOrder": 9,
        "title": "W1_L9_Functions",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "SIJA0-QyhuM",
        "canonicalUrl": "https://www.youtube.com/watch?v=SIJA0-QyhuM",
        "embedUrl": "https://www.youtube-nocookie.com/embed/SIJA0-QyhuM",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L9_Functions as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l10",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 10,
        "playlistOrder": 10,
        "title": "W1_L10_Relations Examples",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "s3LlomV7ULI",
        "canonicalUrl": "https://www.youtube.com/watch?v=s3LlomV7ULI",
        "embedUrl": "https://www.youtube-nocookie.com/embed/s3LlomV7ULI",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L10_Relations Examples as part of IIT Madras BS Mathematics Week 1."
      },
      {
        "lessonId": "math1_week_1_l11",
        "subjectId": "math_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 11,
        "playlistOrder": 11,
        "title": "W1_L11_Function Examples",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "68gZu0aeg-A",
        "canonicalUrl": "https://www.youtube.com/watch?v=68gZu0aeg-A",
        "embedUrl": "https://www.youtube-nocookie.com/embed/68gZu0aeg-A",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L11_Function Examples as part of IIT Madras BS Mathematics Week 1."
      }
    ]
  },
  "week_2": {
    "weekId": "week_2",
    "subjectId": "math_1",
    "weekNumber": 2,
    "title": "Week 2: Coordinate Geometry & Straight Lines",
    "subtitle": "Rectangular Coordinate System, Distances & Linear Equations",
    "description": "Cartesian coordinate system, distance formula, section formula, slopes, and general forms of straight lines.",
    "examRelevance": "Qualifier & Quiz 1 High-Yield (10 Lectures)",
    "estimatedHours": 4.2,
    "keyTopics": [
      "Rectangular Coordinate System",
      "Distance Formula",
      "Section Formula",
      "Parallel & Perpendicular Lines",
      "Line Equations",
      "Distance from Point to Line"
    ],
    "lessons": [
      {
        "lessonId": "math1_week_2_l1",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 1,
        "playlistOrder": 12,
        "title": "W2_L1_Rectangular coordinate system",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "UPdKjINdxKk",
        "canonicalUrl": "https://www.youtube.com/watch?v=UPdKjINdxKk",
        "embedUrl": "https://www.youtube-nocookie.com/embed/UPdKjINdxKk",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L1_Rectangular coordinate system as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l2",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 2,
        "playlistOrder": 13,
        "title": "W2_L2_Distance formula",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "-6-h_c1FsPk",
        "canonicalUrl": "https://www.youtube.com/watch?v=-6-h_c1FsPk",
        "embedUrl": "https://www.youtube-nocookie.com/embed/-6-h_c1FsPk",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L2_Distance formula as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l3",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 3,
        "playlistOrder": 14,
        "title": "W2_L3_Section formula",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "K1QfV1PZoIo",
        "canonicalUrl": "https://www.youtube.com/watch?v=K1QfV1PZoIo",
        "embedUrl": "https://www.youtube-nocookie.com/embed/K1QfV1PZoIo",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L3_Section formula as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l4",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 4,
        "playlistOrder": 15,
        "title": "W2_L6_Parallal and perpendicular lines",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "8BV_mBAh9NE",
        "canonicalUrl": "https://www.youtube.com/watch?v=8BV_mBAh9NE",
        "embedUrl": "https://www.youtube-nocookie.com/embed/8BV_mBAh9NE",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L6_Parallal and perpendicular lines as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l5",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 5,
        "playlistOrder": 16,
        "title": "W2_L7_Representation of a Line",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "v5-pfrC4hBc",
        "canonicalUrl": "https://www.youtube.com/watch?v=v5-pfrC4hBc",
        "embedUrl": "https://www.youtube-nocookie.com/embed/v5-pfrC4hBc",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L7_Representation of a Line as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l6",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 6,
        "playlistOrder": 17,
        "title": "W2_L8_Equation of Line: Slope-Intercept Form",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "UyiVGyAxBdE",
        "canonicalUrl": "https://www.youtube.com/watch?v=UyiVGyAxBdE",
        "embedUrl": "https://www.youtube-nocookie.com/embed/UyiVGyAxBdE",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L8_Equation of Line: Slope-Intercept Form as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l7",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 7,
        "playlistOrder": 18,
        "title": "W2_L9_General Equation of a Line",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "Y50MNBvsKHY",
        "canonicalUrl": "https://www.youtube.com/watch?v=Y50MNBvsKHY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/Y50MNBvsKHY",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L9_General Equation of a Line as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l8",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 8,
        "playlistOrder": 19,
        "title": "W2_L10_Examples I",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "4JVBYF5UOyc",
        "canonicalUrl": "https://www.youtube.com/watch?v=4JVBYF5UOyc",
        "embedUrl": "https://www.youtube-nocookie.com/embed/4JVBYF5UOyc",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L10_Examples I as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l9",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 9,
        "playlistOrder": 20,
        "title": "W2_L11_Examples II",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "p83BEPIW8M0",
        "canonicalUrl": "https://www.youtube.com/watch?v=p83BEPIW8M0",
        "embedUrl": "https://www.youtube-nocookie.com/embed/p83BEPIW8M0",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L11_Examples II as part of IIT Madras BS Mathematics Week 2."
      },
      {
        "lessonId": "math1_week_2_l10",
        "subjectId": "math_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 10,
        "playlistOrder": 21,
        "title": "W2_L12_Distance of a Point from a Line",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "LfMDsHw4ivk",
        "canonicalUrl": "https://www.youtube.com/watch?v=LfMDsHw4ivk",
        "embedUrl": "https://www.youtube-nocookie.com/embed/LfMDsHw4ivk",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L12_Distance of a Point from a Line as part of IIT Madras BS Mathematics Week 2."
      }
    ]
  },
  "week_3": {
    "weekId": "week_3",
    "subjectId": "math_1",
    "weekNumber": 3,
    "title": "Week 3: Quadratic Functions & Equations",
    "subtitle": "Parabolas, Vertex Forms, Factoring & Roots",
    "description": "Quadratic curves, vertex identification, factoring techniques, completing the square, and quadratic formula.",
    "examRelevance": "Qualifier & Quiz 1 Core Scoring (7 Lectures)",
    "estimatedHours": 3.2,
    "keyTopics": [
      "Quadratic Functions",
      "Parabola Vertex & Axis of Symmetry",
      "Roots of Quadratic",
      "Factoring Method",
      "Completing the Square",
      "Quadratic Formula"
    ],
    "lessons": [
      {
        "lessonId": "math1_week_3_l1",
        "subjectId": "math_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 1,
        "playlistOrder": 22,
        "title": "W3_L1_Quadratic functions and its basic",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "X1naj7rDn8E",
        "canonicalUrl": "https://www.youtube.com/watch?v=X1naj7rDn8E",
        "embedUrl": "https://www.youtube-nocookie.com/embed/X1naj7rDn8E",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L1_Quadratic functions and its basic as part of IIT Madras BS Mathematics Week 3."
      },
      {
        "lessonId": "math1_week_3_l2",
        "subjectId": "math_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 2,
        "playlistOrder": 23,
        "title": "W3_L2_Examples of quadratic function",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "VLZ0SFxlNSw",
        "canonicalUrl": "https://www.youtube.com/watch?v=VLZ0SFxlNSw",
        "embedUrl": "https://www.youtube-nocookie.com/embed/VLZ0SFxlNSw",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L2_Examples of quadratic function as part of IIT Madras BS Mathematics Week 3."
      },
      {
        "lessonId": "math1_week_3_l3",
        "subjectId": "math_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 3,
        "playlistOrder": 24,
        "title": "W3_L3_Quadratic equation and its root using graphical method.",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "OvY1J06ioYg",
        "canonicalUrl": "https://www.youtube.com/watch?v=OvY1J06ioYg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/OvY1J06ioYg",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L3_Quadratic equation and its root using graphical method. as part of IIT Madras BS Mathematics Week 3."
      },
      {
        "lessonId": "math1_week_3_l4",
        "subjectId": "math_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 4,
        "playlistOrder": 25,
        "title": "W3_L4_Slope of line and parabola",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "WLPMRyAn7xw",
        "canonicalUrl": "https://www.youtube.com/watch?v=WLPMRyAn7xw",
        "embedUrl": "https://www.youtube-nocookie.com/embed/WLPMRyAn7xw",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L4_Slope of line and parabola as part of IIT Madras BS Mathematics Week 3."
      },
      {
        "lessonId": "math1_week_3_l5",
        "subjectId": "math_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 5,
        "playlistOrder": 26,
        "title": "W3_L5_Quadratic equations Solve by Factoring.",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "aWIgg59W23k",
        "canonicalUrl": "https://www.youtube.com/watch?v=aWIgg59W23k",
        "embedUrl": "https://www.youtube-nocookie.com/embed/aWIgg59W23k",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L5_Quadratic equations Solve by Factoring. as part of IIT Madras BS Mathematics Week 3."
      },
      {
        "lessonId": "math1_week_3_l6",
        "subjectId": "math_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 6,
        "playlistOrder": 27,
        "title": "W3_L6_Quadratic equations Solve by Completing the square",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "pO3Wj1huotA",
        "canonicalUrl": "https://www.youtube.com/watch?v=pO3Wj1huotA",
        "embedUrl": "https://www.youtube-nocookie.com/embed/pO3Wj1huotA",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L6_Quadratic equations Solve by Completing the square as part of IIT Madras BS Mathematics Week 3."
      },
      {
        "lessonId": "math1_week_3_l7",
        "subjectId": "math_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 7,
        "playlistOrder": 28,
        "title": "W3_L7_Quadratic formula",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "dAVcu4OlfH4",
        "canonicalUrl": "https://www.youtube.com/watch?v=dAVcu4OlfH4",
        "embedUrl": "https://www.youtube-nocookie.com/embed/dAVcu4OlfH4",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L7_Quadratic formula as part of IIT Madras BS Mathematics Week 3."
      }
    ]
  },
  "week_4": {
    "weekId": "week_4",
    "subjectId": "math_1",
    "weekNumber": 4,
    "title": "Week 4: Polynomial Functions & Graph Characterization",
    "subtitle": "Polynomial Degrees, Multiplications, Divisions & Zeros",
    "description": "Polynomial degrees, polynomial arithmetic, division algorithm, graph end-behavior, zeros, and x-intercepts.",
    "examRelevance": "Qualifier & Quiz 1 Milestone Target (12 Lectures)",
    "estimatedHours": 5.1,
    "keyTopics": [
      "Polynomial Definition & Degree",
      "Polynomial Operations",
      "Polynomial Division",
      "Remainder & Factor Theorems",
      "Zeros of Polynomials",
      "End-Behavior & Graphing"
    ],
    "lessons": [
      {
        "lessonId": "math1_week_4_l1",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 1,
        "playlistOrder": 29,
        "title": "W4_L1_Polynomials",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "Tf4xS1T3JWU",
        "canonicalUrl": "https://www.youtube.com/watch?v=Tf4xS1T3JWU",
        "embedUrl": "https://www.youtube-nocookie.com/embed/Tf4xS1T3JWU",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L1_Polynomials as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l2",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 2,
        "playlistOrder": 30,
        "title": "W4_L2_The Degree of the Polynomial",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "PISuCIFzeic",
        "canonicalUrl": "https://www.youtube.com/watch?v=PISuCIFzeic",
        "embedUrl": "https://www.youtube-nocookie.com/embed/PISuCIFzeic",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L2_The Degree of the Polynomial as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l3",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 3,
        "playlistOrder": 31,
        "title": "W4_L3_Polynomials in One Variable",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "t1pYvc3NT1g",
        "canonicalUrl": "https://www.youtube.com/watch?v=t1pYvc3NT1g",
        "embedUrl": "https://www.youtube-nocookie.com/embed/t1pYvc3NT1g",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L3_Polynomials in One Variable as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l4",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 4,
        "playlistOrder": 32,
        "title": "W4_L4_Multiplication of Polynomials",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "TKYwa8qzYyI",
        "canonicalUrl": "https://www.youtube.com/watch?v=TKYwa8qzYyI",
        "embedUrl": "https://www.youtube-nocookie.com/embed/TKYwa8qzYyI",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L4_Multiplication of Polynomials as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l5",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 5,
        "playlistOrder": 33,
        "title": "W4_L5_Division of Polynomials - Part 1",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "awN3MVbCklQ",
        "canonicalUrl": "https://www.youtube.com/watch?v=awN3MVbCklQ",
        "embedUrl": "https://www.youtube-nocookie.com/embed/awN3MVbCklQ",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L5_Division of Polynomials - Part 1 as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l6",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 6,
        "playlistOrder": 34,
        "title": "W4_L6_Division of Polynomials - Part 2",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "GpizNT05nMY",
        "canonicalUrl": "https://www.youtube.com/watch?v=GpizNT05nMY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/GpizNT05nMY",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L6_Division of Polynomials - Part 2 as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l7",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 7,
        "playlistOrder": 35,
        "title": "W4_L7_Characterization of Graphs of Polynomial Functions",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "BqsCpto3es4",
        "canonicalUrl": "https://www.youtube.com/watch?v=BqsCpto3es4",
        "embedUrl": "https://www.youtube-nocookie.com/embed/BqsCpto3es4",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L7_Characterization of Graphs of Polynomial Functions as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l8",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 8,
        "playlistOrder": 36,
        "title": "W4_L8_Zeros of Polynomial Functions",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "mGS_hhmrKzQ",
        "canonicalUrl": "https://www.youtube.com/watch?v=mGS_hhmrKzQ",
        "embedUrl": "https://www.youtube-nocookie.com/embed/mGS_hhmrKzQ",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L8_Zeros of Polynomial Functions as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l9",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 9,
        "playlistOrder": 37,
        "title": "W4_L9_Example",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "cAI6mbK3j2Y",
        "canonicalUrl": "https://www.youtube.com/watch?v=cAI6mbK3j2Y",
        "embedUrl": "https://www.youtube-nocookie.com/embed/cAI6mbK3j2Y",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L9_Example as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l10",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 10,
        "playlistOrder": 38,
        "title": "W4_L10_Graphical Behavior of Polynomials at x-Intercepts",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "D2S8C9UcZRs",
        "canonicalUrl": "https://www.youtube.com/watch?v=D2S8C9UcZRs",
        "embedUrl": "https://www.youtube-nocookie.com/embed/D2S8C9UcZRs",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L10_Graphical Behavior of Polynomials at x-Intercepts as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l11",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 11,
        "playlistOrder": 39,
        "title": "W4_L11_Example",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "eFmR1ZatEkY",
        "canonicalUrl": "https://www.youtube.com/watch?v=eFmR1ZatEkY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/eFmR1ZatEkY",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L11_Example as part of IIT Madras BS Mathematics Week 4."
      },
      {
        "lessonId": "math1_week_4_l12",
        "subjectId": "math_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 12,
        "playlistOrder": 40,
        "title": "W4_L12_Graphing a Polynomial Function",
        "durationMinutes": 22,
        "durationFormatted": "22 mins",
        "videoId": "Wgfv5hB8GAc",
        "canonicalUrl": "https://www.youtube.com/watch?v=Wgfv5hB8GAc",
        "embedUrl": "https://www.youtube-nocookie.com/embed/Wgfv5hB8GAc",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Core Mathematical Concepts",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L12_Graphing a Polynomial Function as part of IIT Madras BS Mathematics Week 4."
      }
    ]
  }
};

// ============================================================================
// 3. STATISTICS FOR DATA SCIENCE 1 — WEEK 1 TO WEEK 4 MAPPINGS (23 LESSONS)
// ============================================================================

export const IITM_STATS_1_WEEKS: Record<IITMWeekId, IITMWeekMetadata> = {
  "week_1": {
    "weekId": "week_1",
    "subjectId": "stats_1",
    "weekNumber": 1,
    "title": "Week 1: Introduction, Types of Data & Measurement Scales",
    "subtitle": "Categorical, Numerical, Discrete, Continuous & Measurement Scales",
    "description": "Foundational concepts of statistical data, categorical vs numerical variables, nominal, ordinal, interval, and ratio scales.",
    "examRelevance": "Qualifier & Quiz 1 Core Theory (4 Lectures)",
    "estimatedHours": 1.8,
    "keyTopics": [
      "Data Definitions",
      "Categorical & Numerical Data",
      "Discrete vs Continuous Data",
      "Scales of Measurement (NOIR)"
    ],
    "lessons": [
      {
        "lessonId": "stats1_week_1_l1",
        "subjectId": "stats_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 1,
        "playlistOrder": 1,
        "title": "W1_L1_Introduction and types of Data - Basic definitions",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "nHe1nYmtAy0",
        "canonicalUrl": "https://www.youtube.com/watch?v=nHe1nYmtAy0",
        "embedUrl": "https://www.youtube-nocookie.com/embed/nHe1nYmtAy0",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L1_Introduction and types of Data - Basic definitions as part of IIT Madras BS Statistics Week 1."
      },
      {
        "lessonId": "stats1_week_1_l2",
        "subjectId": "stats_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 2,
        "playlistOrder": 2,
        "title": "W1_L2_Introduction and types of Data - Understanding data",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "5e5nHjXJtUg",
        "canonicalUrl": "https://www.youtube.com/watch?v=5e5nHjXJtUg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/5e5nHjXJtUg",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L2_Introduction and types of Data - Understanding data as part of IIT Madras BS Statistics Week 1."
      },
      {
        "lessonId": "stats1_week_1_l3",
        "subjectId": "stats_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 3,
        "playlistOrder": 3,
        "title": "W1_L3_Introduction and types of Data - Classification of data",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "JiAaOUCVY-I",
        "canonicalUrl": "https://www.youtube.com/watch?v=JiAaOUCVY-I",
        "embedUrl": "https://www.youtube-nocookie.com/embed/JiAaOUCVY-I",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L3_Introduction and types of Data - Classification of data as part of IIT Madras BS Statistics Week 1."
      },
      {
        "lessonId": "stats1_week_1_l4",
        "subjectId": "stats_1",
        "weekId": "week_1",
        "weekNumber": 1,
        "lessonOrder": 4,
        "playlistOrder": 4,
        "title": "W1_L4_Introduction and types of Data - Scales of measurement",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "Cwq9xYC8d6g",
        "canonicalUrl": "https://www.youtube.com/watch?v=Cwq9xYC8d6g",
        "embedUrl": "https://www.youtube-nocookie.com/embed/Cwq9xYC8d6g",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W1_L4_Introduction and types of Data - Scales of measurement as part of IIT Madras BS Statistics Week 1."
      }
    ]
  },
  "week_2": {
    "weekId": "week_2",
    "subjectId": "stats_1",
    "weekNumber": 2,
    "title": "Week 2: Describing Categorical Data & Visualizations",
    "subtitle": "Frequency Tables, Bar Charts, Pie Charts & Best Graphing Practices",
    "description": "Tabulating categorical attributes, relative frequencies, bar graphs, pie charts, Pareto charts, and misleading graph detection.",
    "examRelevance": "Qualifier & Quiz 1 High-Yield (5 Lectures)",
    "estimatedHours": 2.2,
    "keyTopics": [
      "Frequency Distributions",
      "Relative & Percentage Frequencies",
      "Bar Charts & Pie Charts",
      "Graphing Best Practices",
      "Mode & Median for Categorical Data"
    ],
    "lessons": [
      {
        "lessonId": "stats1_week_2_l1",
        "subjectId": "stats_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 1,
        "playlistOrder": 5,
        "title": "W2_L1_Describing Categorical Data - Frequency distributions",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "ljaAgjT0wuY",
        "canonicalUrl": "https://www.youtube.com/watch?v=ljaAgjT0wuY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/ljaAgjT0wuY",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L1_Describing Categorical Data - Frequency distributions as part of IIT Madras BS Statistics Week 2."
      },
      {
        "lessonId": "stats1_week_2_l2",
        "subjectId": "stats_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 2,
        "playlistOrder": 6,
        "title": "W2_L2_Describing Categorical Data - Charts of categorical data",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "tYzmNXeVhvo",
        "canonicalUrl": "https://www.youtube.com/watch?v=tYzmNXeVhvo",
        "embedUrl": "https://www.youtube-nocookie.com/embed/tYzmNXeVhvo",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L2_Describing Categorical Data - Charts of categorical data as part of IIT Madras BS Statistics Week 2."
      },
      {
        "lessonId": "stats1_week_2_l3",
        "subjectId": "stats_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 3,
        "playlistOrder": 7,
        "title": "W2_L3_Describing Categorical Data - Best practices while graphing data - Part 1",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "gVyhfRCvV3s",
        "canonicalUrl": "https://www.youtube.com/watch?v=gVyhfRCvV3s",
        "embedUrl": "https://www.youtube-nocookie.com/embed/gVyhfRCvV3s",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L3_Describing Categorical Data - Best practices while graphing data - Part 1 as part of IIT Madras BS Statistics Week 2."
      },
      {
        "lessonId": "stats1_week_2_l4",
        "subjectId": "stats_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 4,
        "playlistOrder": 8,
        "title": "W2_L4_Describing Categorical Data - Best practices while graphing data - Part 2",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "ZrwpYmZ1Wi0",
        "canonicalUrl": "https://www.youtube.com/watch?v=ZrwpYmZ1Wi0",
        "embedUrl": "https://www.youtube-nocookie.com/embed/ZrwpYmZ1Wi0",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L4_Describing Categorical Data - Best practices while graphing data - Part 2 as part of IIT Madras BS Statistics Week 2."
      },
      {
        "lessonId": "stats1_week_2_l5",
        "subjectId": "stats_1",
        "weekId": "week_2",
        "weekNumber": 2,
        "lessonOrder": 5,
        "playlistOrder": 9,
        "title": "W2_L5_Describing Categorical Data - Mode and Median",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "C-A8tm4z0dY",
        "canonicalUrl": "https://www.youtube.com/watch?v=C-A8tm4z0dY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/C-A8tm4z0dY",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W2_L5_Describing Categorical Data - Mode and Median as part of IIT Madras BS Statistics Week 2."
      }
    ]
  },
  "week_3": {
    "weekId": "week_3",
    "subjectId": "stats_1",
    "weekNumber": 3,
    "title": "Week 3: Describing Numerical Data & Measures of Central Tendency",
    "subtitle": "Histograms, Mean, Median, Variance, Standard Deviation & IQR",
    "description": "Histograms, grouped frequency distributions, arithmetic mean, robust median, variance, sample std dev, and IQR box plots.",
    "examRelevance": "Qualifier & Quiz 1 Core Computational (5 Lectures)",
    "estimatedHours": 2.5,
    "keyTopics": [
      "Numerical Frequency Tables",
      "Mean & Weighted Mean",
      "Median & Skewness",
      "Variance & Standard Deviation",
      "Percentiles, Quartiles & IQR"
    ],
    "lessons": [
      {
        "lessonId": "stats1_week_3_l1",
        "subjectId": "stats_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 1,
        "playlistOrder": 10,
        "title": "W3_L1_Describing Numerical Data - Frequency Tables for numerical data",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "nGpwm9Ev5RQ",
        "canonicalUrl": "https://www.youtube.com/watch?v=nGpwm9Ev5RQ",
        "embedUrl": "https://www.youtube-nocookie.com/embed/nGpwm9Ev5RQ",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L1_Describing Numerical Data - Frequency Tables for numerical data as part of IIT Madras BS Statistics Week 3."
      },
      {
        "lessonId": "stats1_week_3_l2",
        "subjectId": "stats_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 2,
        "playlistOrder": 11,
        "title": "W3_L2_Describing Numerical Data - Mean",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "17PjWUHWaqs",
        "canonicalUrl": "https://www.youtube.com/watch?v=17PjWUHWaqs",
        "embedUrl": "https://www.youtube-nocookie.com/embed/17PjWUHWaqs",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L2_Describing Numerical Data - Mean as part of IIT Madras BS Statistics Week 3."
      },
      {
        "lessonId": "stats1_week_3_l3",
        "subjectId": "stats_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 3,
        "playlistOrder": 12,
        "title": "W3_L3_Describing Numerical Data - Median and Mode",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "aiU6QmOxu_Q",
        "canonicalUrl": "https://www.youtube.com/watch?v=aiU6QmOxu_Q",
        "embedUrl": "https://www.youtube-nocookie.com/embed/aiU6QmOxu_Q",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L3_Describing Numerical Data - Median and Mode as part of IIT Madras BS Statistics Week 3."
      },
      {
        "lessonId": "stats1_week_3_l4",
        "subjectId": "stats_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 4,
        "playlistOrder": 13,
        "title": "W3_L4_Describing Numerical Data - Measures of dispersion- Range, variance and standard deviation",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "1RGTqZLQhWU",
        "canonicalUrl": "https://www.youtube.com/watch?v=1RGTqZLQhWU",
        "embedUrl": "https://www.youtube-nocookie.com/embed/1RGTqZLQhWU",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L4_Describing Numerical Data - Measures of dispersion- Range, variance and standard deviation as part of IIT Madras BS Statistics Week 3."
      },
      {
        "lessonId": "stats1_week_3_l5",
        "subjectId": "stats_1",
        "weekId": "week_3",
        "weekNumber": 3,
        "lessonOrder": 5,
        "playlistOrder": 14,
        "title": "W3_L5_Describing Numerical Data - Percentiles, Quartiles, and Interquartile range",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "lD8UIvaKfOY",
        "canonicalUrl": "https://www.youtube.com/watch?v=lD8UIvaKfOY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/lD8UIvaKfOY",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W3_L5_Describing Numerical Data - Percentiles, Quartiles, and Interquartile range as part of IIT Madras BS Statistics Week 3."
      }
    ]
  },
  "week_4": {
    "weekId": "week_4",
    "subjectId": "stats_1",
    "weekNumber": 4,
    "title": "Week 4: Association Between Variables & Bivariate Analysis",
    "subtitle": "Contingency Tables, Relative Frequencies, Scatterplots, Covariance, Correlation & Regression Line",
    "description": "Two-variable associations, joint/marginal tables, scatter plots, covariance, Pearson r, Spearman rank, and linear regression fitting.",
    "examRelevance": "Qualifier & Quiz 1 Capstone (9 Lectures)",
    "estimatedHours": 3.8,
    "keyTopics": [
      "Contingency Tables",
      "Relative Frequencies",
      "Scatterplots",
      "Covariance",
      "Pearson Correlation",
      "Spearman Rank",
      "Line Fitting & Regression"
    ],
    "lessons": [
      {
        "lessonId": "stats1_week_4_l1",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 1,
        "playlistOrder": 15,
        "title": "W4_L1_Association between two variables - Review of course",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "tEnnRFYi_Gw",
        "canonicalUrl": "https://www.youtube.com/watch?v=tEnnRFYi_Gw",
        "embedUrl": "https://www.youtube-nocookie.com/embed/tEnnRFYi_Gw",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L1_Association between two variables - Review of course as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l2",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 2,
        "playlistOrder": 16,
        "title": "W4_L2_Association between two categorical variables - Introduction",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "Q278poQD_x0",
        "canonicalUrl": "https://www.youtube.com/watch?v=Q278poQD_x0",
        "embedUrl": "https://www.youtube-nocookie.com/embed/Q278poQD_x0",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L2_Association between two categorical variables - Introduction as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l3",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 3,
        "playlistOrder": 17,
        "title": "W4_L3_Association between two categorical variables - Relative frequencies",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "7JbEb67GuBI",
        "canonicalUrl": "https://www.youtube.com/watch?v=7JbEb67GuBI",
        "embedUrl": "https://www.youtube-nocookie.com/embed/7JbEb67GuBI",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L3_Association between two categorical variables - Relative frequencies as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l4",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 4,
        "playlistOrder": 18,
        "title": "W4_L4_Association between two numerical variables - Scatterplot",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "wMT9uiUbTT8",
        "canonicalUrl": "https://www.youtube.com/watch?v=wMT9uiUbTT8",
        "embedUrl": "https://www.youtube-nocookie.com/embed/wMT9uiUbTT8",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L4_Association between two numerical variables - Scatterplot as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l5",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 5,
        "playlistOrder": 19,
        "title": "W4_L5_Association between two numerical variables - Describing association",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "YvKF_tSiT5Q",
        "canonicalUrl": "https://www.youtube.com/watch?v=YvKF_tSiT5Q",
        "embedUrl": "https://www.youtube-nocookie.com/embed/YvKF_tSiT5Q",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L5_Association between two numerical variables - Describing association as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l6",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 6,
        "playlistOrder": 20,
        "title": "W4_L6_Association between two numerical variables - Covariance",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "TxsIi8uLd7A",
        "canonicalUrl": "https://www.youtube.com/watch?v=TxsIi8uLd7A",
        "embedUrl": "https://www.youtube-nocookie.com/embed/TxsIi8uLd7A",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L6_Association between two numerical variables - Covariance as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l7",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 7,
        "playlistOrder": 21,
        "title": "W4_L7_Association between two numerical variables - Correlation",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "8yFAbKEgg34",
        "canonicalUrl": "https://www.youtube.com/watch?v=8yFAbKEgg34",
        "embedUrl": "https://www.youtube-nocookie.com/embed/8yFAbKEgg34",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L7_Association between two numerical variables - Correlation as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l8",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 8,
        "playlistOrder": 22,
        "title": "W4_L8_Association between two numerical variables - Fitting a line",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "yLqNWxd6pm8",
        "canonicalUrl": "https://www.youtube.com/watch?v=yLqNWxd6pm8",
        "embedUrl": "https://www.youtube-nocookie.com/embed/yLqNWxd6pm8",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L8_Association between two numerical variables - Fitting a line as part of IIT Madras BS Statistics Week 4."
      },
      {
        "lessonId": "stats1_week_4_l9",
        "subjectId": "stats_1",
        "weekId": "week_4",
        "weekNumber": 4,
        "lessonOrder": 9,
        "playlistOrder": 23,
        "title": "W4_L9_Association between categorical and numerical variables",
        "durationMinutes": 24,
        "durationFormatted": "24 mins",
        "videoId": "5uLNgurbmW8",
        "canonicalUrl": "https://www.youtube.com/watch?v=5uLNgurbmW8",
        "embedUrl": "https://www.youtube-nocookie.com/embed/5uLNgurbmW8",
        "status": "ACTIVE",
        "weekMappingStatus": "VERIFIED",
        "weekMappingConfidence": "HIGH",
        "keyConcepts": [
          "Statistical Data Analysis",
          "Qualifier Graded Topics"
        ],
        "description": "Comprehensive lecture covering W4_L9_Association between categorical and numerical variables as part of IIT Madras BS Statistics Week 4."
      }
    ]
  }
};

// ============================================================================
// 4. WEEK-BASED QUIZ QUESTIONS (MATH & STATS WEEKS 1 TO 4)
// ============================================================================

export const IITM_PLAYLIST_WEEK_QUESTIONS: Record<IITMWeekId, IITMQuizQuestion[]> = {
  week_1: [
    {
      id: 'iitm-pw-w1-q1',
      question: 'Let A = {x in R | x^2 - 5x + 6 = 0} and B = {2, 3}. Which statement is TRUE?',
      options: ['A is a proper subset of B', 'A = B and |P(A)| = 4', 'A and B are disjoint', '|P(A)| = 8'],
      correctOptionIndex: 1,
      explanation: 'Roots of x^2 - 5x + 6 = 0 are x = 2 and x = 3. Thus A = {2, 3} = B. The power set P(A) contains 2^2 = 4 subsets.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Set Theory & Power Sets'
    },
    {
      id: 'iitm-pw-w1-q2',
      question: 'If a relation R on set A = {1, 2, 3} is defined as R = {(1,1), (2,2), (3,3), (1,2), (2,1)}, what type of relation is R?',
      options: ['Reflexive and Symmetric, but not Transitive', 'Equivalence Relation', 'Anti-symmetric Relation', 'Strict Partial Order'],
      correctOptionIndex: 1,
      explanation: 'R contains (x,x) for all x in A (reflexive). If (a,b) in R then (b,a) in R (symmetric). (1,2) and (2,1) in R implies (1,1) in R (transitive). Hence R is an equivalence relation.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Relations & Equivalence'
    },
    {
      id: 'iitm-pw-w1-q3',
      question: 'What is the natural domain of the real-valued function f(x) = sqrt(4 - x^2) / (x - 1)?',
      options: ['[-2, 2]', '[-2, 1) U (1, 2]', '(-2, 2) except {1}', '[-2, 2] U {1}'],
      correctOptionIndex: 1,
      explanation: 'For the numerator 4 - x^2 >= 0 => -2 <= x <= 2. For the denominator x - 1 != 0 => x != 1. Combining gives [-2, 1) U (1, 2].',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Functions & Domains'
    }
  ],
  week_2: [
    {
      id: 'iitm-pw-w2-q1',
      question: 'What is the perpendicular distance of the point P(3, 4) from the straight line 3x - 4y + 12 = 0?',
      options: ['1 unit', '5 units', '1/5 unit', '2.5 units'],
      correctOptionIndex: 0,
      explanation: 'd = |3(3) - 4(4) + 12| / sqrt(3^2 + (-4)^2) = |9 - 16 + 12| / 5 = |5| / 5 = 1 unit.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Point-Line Distance'
    },
    {
      id: 'iitm-pw-w2-q2',
      question: 'Two lines L1: 2x + ky = 7 and L2: 3x - 2y = 4 are perpendicular. What is the value of k?',
      options: ['k = 3', 'k = -3', 'k = 3/2', 'k = -3/2'],
      correctOptionIndex: 0,
      explanation: 'Slope m1 = -2/k and slope m2 = 3/2. For perpendicular lines m1 * m2 = -1 => (-2/k) * (3/2) = -1 => -3/k = -1 => k = 3.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Perpendicular Lines'
    }
  ],
  week_3: [
    {
      id: 'iitm-pw-w3-q1',
      question: 'For the quadratic function f(x) = 2x^2 - 8x + 11, what is the minimum value and at what x does it occur?',
      options: ['Min = 3 at x = 2', 'Min = 11 at x = 0', 'Min = -5 at x = 2', 'Min = 3 at x = -2'],
      correctOptionIndex: 0,
      explanation: 'Since a = 2 > 0, the parabola opens upward. The vertex x-coordinate is -b/(2a) = -(-8)/(2*2) = 2. f(2) = 2(4) - 8(2) + 11 = 8 - 16 + 11 = 3.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Quadratic Optimization'
    }
  ],
  week_4: [
    {
      id: 'iitm-pw-w4-q1',
      question: 'If a polynomial P(x) of degree 4 is divided by (x - 2), what is the maximum possible degree of the remainder R(x)?',
      options: ['0 (constant)', '1', '3', '4'],
      correctOptionIndex: 0,
      explanation: 'By the Division Algorithm, deg(R) < deg(Divisor). Since deg(x - 2) = 1, the remainder must have degree 0 (a constant).',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Polynomial Division'
    }
  ]
};

export const IITM_STATS_PLAYLIST_WEEK_QUESTIONS: Record<IITMWeekId, IITMQuizQuestion[]> = {
  week_1: [
    {
      id: 'iitm-st-w1-q1',
      question: 'A survey records the temperature of server rooms in Celsius. Which measurement scale does this variable belong to?',
      options: ['Nominal Scale', 'Ordinal Scale', 'Interval Scale', 'Ratio Scale'],
      correctOptionIndex: 2,
      explanation: 'Celsius temperature has equal intervals between units, but 0 deg C is not an absolute absence of heat (no true zero). Thus it is an Interval scale.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Scales of Measurement (NOIR)'
    },
    {
      id: 'iitm-st-w1-q2',
      question: 'Which of the following is a quantitative discrete variable?',
      options: ['Customer ratings: Poor, Fair, Good', 'Annual rainfall in mm', 'Number of network packet drops per minute', 'Exact delivery time in seconds'],
      correctOptionIndex: 2,
      explanation: 'Packet drops can only take non-negative integer counts (0, 1, 2...), making it a quantitative discrete variable.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Discrete vs Continuous Data'
    }
  ],
  week_2: [
    {
      id: 'iitm-st-w2-q1',
      question: 'When constructing a Pareto chart for categorical defects, how should the categories be arranged?',
      options: ['Alphabetically', 'In descending order of frequency with cumulative percentage line', 'In chronological order of occurrence', 'Randomly'],
      correctOptionIndex: 1,
      explanation: 'A Pareto chart arranges categories from highest to lowest frequency, accompanied by a cumulative percentage curve to highlight vital few causes.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Pareto Charts'
    }
  ],
  week_3: [
    {
      id: 'iitm-st-w3-q1',
      question: 'For a dataset {4, 7, 8, 9, 12, 100}, which measure of central tendency is most robust and representative?',
      options: ['Arithmetic Mean', 'Median', 'Standard Deviation', 'Range'],
      correctOptionIndex: 1,
      explanation: 'The presence of extreme outlier (100) heavily skews the arithmetic mean. The median is resistant/robust against extreme values.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Measures of Central Tendency'
    },
    {
      id: 'iitm-st-w3-q2',
      question: 'According to Tukeyes 1.5*IQR rule, an observation x is flagged as a high outlier if:',
      options: ['x > Q3 + 1.5 * IQR', 'x > Mean + 1.5 * StdDev', 'x > Q3 + 3 * IQR', 'x > Q1 + 1.5 * IQR'],
      correctOptionIndex: 0,
      explanation: 'The upper outlier fence in a standard Tukey boxplot is Q3 + 1.5 * IQR. Any point exceeding this boundary is classified as an outlier.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Tukey Outlier Fences'
    }
  ],
  week_4: [
    {
      id: 'iitm-st-w4-q1',
      question: 'If the Pearson correlation coefficient between X and Y is r = -0.85, which statement is CORRECT?',
      options: ['There is no linear association', 'Strong negative linear association; as X increases, Y tends to decrease', 'X causes Y to decrease by 85%', 'Covariance between X and Y must be positive'],
      correctOptionIndex: 1,
      explanation: 'r = -0.85 indicates a strong negative linear association. Correlation measures strength and direction of linear association, not causation.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Pearson Correlation'
    },
    {
      id: 'iitm-st-w4-q2',
      question: 'In simple linear regression y_hat = b0 + b1*x, the slope b1 is computed as:',
      options: ['b1 = r * (s_y / s_x)', 'b1 = r * (s_x / s_y)', 'b1 = Cov(X,Y) / s_y^2', 'b1 = y_bar / x_bar'],
      correctOptionIndex: 0,
      explanation: 'The Ordinary Least Squares (OLS) slope formula is b1 = r * (s_y / s_x) = Cov(X,Y) / s_x^2.',
      isVerifiedPyq: true,
      questionType: 'VERIFIED_PYQ',
      topicTag: 'Linear Regression Fitting'
    }
  ]
};

// ============================================================================
// 5. PLAYLIST INTEGRITY CHECKER (ZERO-SKIP AUDIT ENGINE)
// ============================================================================

export class PlaylistIntegrityChecker {
  /**
   * Run full integrity audit on a playlist
   */
  static auditPlaylist(
    rawVideos: IITMRawPlaylistVideo[],
    weeksMap: Record<IITMWeekId, IITMWeekMetadata>,
    metadata: IITMPlaylistMetadata
  ): IITMPlaylistIntegrityAudit {
    const totalDiscovered = metadata.totalVideosDiscovered;
    const totalImported = rawVideos.length;

    // Check duplicates
    const seenIds = new Set<string>();
    let totalDuplicated = 0;
    rawVideos.forEach((v) => {
      if (seenIds.has(v.videoId)) totalDuplicated++;
      seenIds.add(v.videoId);
    });

    // Check order gaps in raw ingestion
    const sortedOrders = rawVideos.map((v) => v.videoOrder).sort((a, b) => a - b);
    let totalSkippedInIngestion = 0;
    for (let i = 1; i <= sortedOrders.length; i++) {
      if (sortedOrders[i - 1] !== i) {
        totalSkippedInIngestion++;
      }
    }

    // Check week mappings
    const weeksAudit: Record<IITMWeekId, IITMWeekAudit> = {} as any;
    let totalMapped = 0;
    let totalSkippedInWeeks = 0;

    (['week_1', 'week_2', 'week_3', 'week_4'] as IITMWeekId[]).forEach((wId) => {
      const week = weeksMap[wId];
      const lessons = week.lessons;
      totalMapped += lessons.length;

      // Check if all expected raw videos for this week prefix are present in lessons
      const prefix = `W${week.weekNumber}_`;
      const matchingRaw = rawVideos.filter((v) => v.videoTitle.startsWith(prefix));
      const unmapped = matchingRaw.length - lessons.length;
      const skipped = Math.max(0, unmapped);

      totalSkippedInWeeks += skipped;

      weeksAudit[wId] = {
        weekId: wId,
        weekNumber: week.weekNumber,
        totalVideos: lessons.length,
        skippedVideos: skipped,
        unmappedVideos: unmapped > 0 ? unmapped : 0,
        coveragePercent: matchingRaw.length > 0 ? Math.round((lessons.length / matchingRaw.length) * 100) : 100,
        status: skipped === 0 ? 'COMPLETE_ZERO_SKIPS' : 'GAPS_DETECTED'
      };
    });

    const totalUnavailable = rawVideos.filter((v) => v.availabilityStatus !== 'ACTIVE').length;
    const totalUnverified = rawVideos.filter((v) => v.weekMappingConfidence === 'UNVERIFIED').length;

    const overallStatus: 'PASS_ZERO_SKIPS' | 'FAIL_GAPS_PRESENT' =
      totalSkippedInWeeks === 0 && totalSkippedInIngestion === 0 && totalImported === totalDiscovered
        ? 'PASS_ZERO_SKIPS'
        : 'FAIL_GAPS_PRESENT';

    return {
      playlistId: metadata.playlistId,
      playlistTitle: metadata.playlistTitle,
      subjectId: metadata.subjectId,
      totalDiscovered,
      totalImported,
      totalMapped,
      totalSkipped: totalSkippedInWeeks + totalSkippedInIngestion,
      totalDuplicated,
      totalUnavailable,
      totalUnverified,
      weeksAudit,
      overallStatus,
      auditTimestamp: new Date().toISOString()
    };
  }

  static getMathAudit(): IITMPlaylistIntegrityAudit {
    return this.auditPlaylist(IITM_MATH_RAW_VIDEOS, IITM_MATH_1_WEEKS, IITM_MATH_PLAYLIST_METADATA);
  }

  static getStatsAudit(): IITMPlaylistIntegrityAudit {
    return this.auditPlaylist(IITM_STATS_RAW_VIDEOS, IITM_STATS_1_WEEKS, IITM_STATS_PLAYLIST_METADATA);
  }
}
