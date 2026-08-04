export interface OfficialChannelConfig {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology' | 'General';
  teacher: string;
  channelName: string;
  channelId: string;
  handle: string;
  priority: number; // 1 = highest priority
  playlists: {
    playlistId: string;
    title: string;
    chapter?: string;
  }[];
  fallbackVideoId: string;
  supportsLive: boolean;
  supportsRecorded: boolean;
  lastSync?: string;
  verified: boolean;
}

export const OFFICIAL_CHANNELS_REGISTRY: OfficialChannelConfig[] = [
  {
    id: 'logical_physics',
    subject: 'Physics',
    teacher: 'MA Sir (Logical Physics)',
    channelName: 'Logical Physics by MA Sir',
    channelId: 'UC_logical_physics_ma_sir',
    handle: 'logicalphysicsbymasir',
    priority: 1,
    playlists: [
      {
        playlistId: 'PL_LOGICAL_PHYSICS_CLASS11',
        title: 'Class 11 Physics Master Series by MA Sir',
        chapter: 'Rotational Motion',
      },
    ],
    fallbackVideoId: 'fA-XN6q3f6A',
    supportsLive: true,
    supportsRecorded: true,
    verified: true,
  },
  {
    id: 'competition_wallah',
    subject: 'Physics',
    teacher: 'PW Senior Physics Faculty',
    channelName: 'Competition Wallah',
    channelId: 'UC_competition_wallah',
    handle: 'CompetitionWallah',
    priority: 2,
    playlists: [
      {
        playlistId: 'PL_COMPETITION_WALLAH_NEET_PHYSICS',
        title: 'NEET Physics One Shot Series',
        chapter: 'Laws of Motion',
      },
    ],
    fallbackVideoId: 'm4X_m9L6qP6',
    supportsLive: true,
    supportsRecorded: true,
    verified: true,
  },
  {
    id: 'physics_wallah',
    subject: 'Physics',
    teacher: 'Alakh Pandey Sir & PW Team',
    channelName: 'Physics Wallah - Alakh Pandey',
    channelId: 'UC_physics_wallah',
    handle: 'PhysicsWallah',
    priority: 3,
    playlists: [
      {
        playlistId: 'PL_PHYSICS_WALLAH_NEET',
        title: 'Complete NEET Physics Core',
      },
    ],
    fallbackVideoId: 'bK8n9Z6d4K8',
    supportsLive: true,
    supportsRecorded: true,
    verified: true,
  },
  {
    id: 'pw_neet',
    subject: 'Botany',
    teacher: 'PW NEET Biology Experts',
    channelName: 'PW NEET',
    channelId: 'UC_pw_neet',
    handle: 'PW-NEET',
    priority: 1,
    playlists: [
      {
        playlistId: 'PL_PW_NEET_BOTANY',
        title: 'NEET Botany NCERT Express',
        chapter: 'Plant Kingdom',
      },
    ],
    fallbackVideoId: 'qXf7wP8_Y6w',
    supportsLive: true,
    supportsRecorded: true,
    verified: true,
  },
  {
    id: 'pw_meded',
    subject: 'Zoology',
    teacher: 'PW MedEd Specialists',
    channelName: 'PW MedEd',
    channelId: 'UC_pw_meded',
    handle: 'PWMedEd',
    priority: 2,
    playlists: [
      {
        playlistId: 'PL_PW_MEDED_ZOOLOGY',
        title: 'NEET Zoology Complete Masterclass',
      },
    ],
    fallbackVideoId: 'l8c3R_k9L4Q',
    supportsLive: true,
    supportsRecorded: true,
    verified: true,
  },
  {
    id: 'unacademy_neet',
    subject: 'Botany',
    teacher: 'Seep Pahuja & Unacademy Team',
    channelName: 'Unacademy NEET',
    channelId: 'UC_unacademy_neet',
    handle: 'unacademyneet',
    priority: 1,
    playlists: [
      {
        playlistId: 'PL_UNACADEMY_NEET_SEEP_PAHUJA',
        title: 'Class 11 Botany NCERT One Shot | Seep Pahuja',
        chapter: 'The Living World',
      },
    ],
    fallbackVideoId: '_W1b6rO7_F4',
    supportsLive: true,
    supportsRecorded: true,
    verified: true,
  },
  {
    id: 'kapils_biology_classes',
    subject: 'Botany',
    teacher: 'Kapil Sir',
    channelName: "Kapil's Biology Classes",
    channelId: 'UC_kapils_biology_classes',
    handle: 'kapilsbiologyclasses',
    priority: 1,
    playlists: [
      {
        playlistId: 'PL_KAPIL_CLASS11_LIVING_WORLD',
        title: "Kapil's Biology Classes | Complete NEET NCERT Biology",
        chapter: 'The Living World',
      },
    ],
    fallbackVideoId: 'b_K9G2qX9L8',
    supportsLive: true,
    supportsRecorded: true,
    verified: true,
  },
];
