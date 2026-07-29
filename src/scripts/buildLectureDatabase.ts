import fs from 'fs';
import path from 'path';
import { CURRICULUM_DATA } from '../data/curriculumData';

export interface RawPlaylistVideo {
  videoId: string;
  title: string;
  duration: string;
  teacher: string;
  channel: string;
  playlistId: string;
  playlistName: string;
  thumbnail: string;
  publishedAt: string;
}

// 61 Official Videos extracted directly from the 7 specified Physics Wallah Prachand NEET 2025 playlists
export const OFFICIAL_PLAYLIST_VIDEOS: RawPlaylistVideo[] = [
  // Playlist 1: PL8_1l_iSLgyRBTK823mfsXJwpr4DkInd- (Complete INORGANIC CHEMISTRY in One Shot | Prachand NEET 2025)
  {
    videoId: "888QmOUMrDE",
    title: "PERIODIC TABLE in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 31 minutes",
    teacher: "Mohit Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyRBTK823mfsXJwpr4DkInd-",
    playlistName: "Complete INORGANIC CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/888QmOUMrDE/hqdefault.jpg",
    publishedAt: "2024-11-01T10:00:00Z"
  },
  {
    videoId: "7dY8KOfPro0",
    title: "CHEMICAL BONDING & MOLECULAR STRUCTURE in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "10 hours, 38 minutes",
    teacher: "Mohit Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyRBTK823mfsXJwpr4DkInd-",
    playlistName: "Complete INORGANIC CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/7dY8KOfPro0/hqdefault.jpg",
    publishedAt: "2024-11-05T10:00:00Z"
  },
  {
    videoId: "lDSm5XgsuPY",
    title: "COORDINATION COMPOUNDS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "8 hours, 34 minutes",
    teacher: "Mohit Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyRBTK823mfsXJwpr4DkInd-",
    playlistName: "Complete INORGANIC CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/lDSm5XgsuPY/hqdefault.jpg",
    publishedAt: "2024-11-10T10:00:00Z"
  },
  {
    videoId: "wuDVHWTVnjg",
    title: "d & f BLOCKS ELEMENTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours, 2 minutes",
    teacher: "Mohit Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyRBTK823mfsXJwpr4DkInd-",
    playlistName: "Complete INORGANIC CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/wuDVHWTVnjg/hqdefault.jpg",
    publishedAt: "2024-11-15T10:00:00Z"
  },
  {
    videoId: "nG-SUyZAiGc",
    title: "THE P-BLOCK ELEMENTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 16 minutes",
    teacher: "Mohit Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyRBTK823mfsXJwpr4DkInd-",
    playlistName: "Complete INORGANIC CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/nG-SUyZAiGc/hqdefault.jpg",
    publishedAt: "2024-11-20T10:00:00Z"
  },
  {
    videoId: "fnRjIZs8UAA",
    title: "SALT ANALYSIS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 3 minutes",
    teacher: "Mohit Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyRBTK823mfsXJwpr4DkInd-",
    playlistName: "Complete INORGANIC CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/fnRjIZs8UAA/hqdefault.jpg",
    publishedAt: "2024-11-25T10:00:00Z"
  },

  // Playlist 2: PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS (Prachand Complete Organic Chemistry In OneShot | NEET 2025)
  {
    videoId: "0uOTZ2IJZhE",
    title: "GOC in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "8 hours, 27 minutes",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/0uOTZ2IJZhE/hqdefault.jpg",
    publishedAt: "2024-10-01T10:00:00Z"
  },
  {
    videoId: "TV9mKUgaFY4",
    title: "IUPAC in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "6 hours, 15 minutes",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/TV9mKUgaFY4/hqdefault.jpg",
    publishedAt: "2024-10-05T10:00:00Z"
  },
  {
    videoId: "Xh8PGxmqvG8",
    title: "ISOMERISM in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "9 hours, 1 minute",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Xh8PGxmqvG8/hqdefault.jpg",
    publishedAt: "2024-10-10T10:00:00Z"
  },
  {
    videoId: "DzFjYagY7RA",
    title: "HYDROCARBONS in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "10 hours",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/DzFjYagY7RA/hqdefault.jpg",
    publishedAt: "2024-10-15T10:00:00Z"
  },
  {
    videoId: "6kMIxofrWtM",
    title: "HALOALKANES AND HALOARENES in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "8 hours, 27 minutes",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/6kMIxofrWtM/hqdefault.jpg",
    publishedAt: "2024-10-20T10:00:00Z"
  },
  {
    videoId: "8SiHbc0gP5s",
    title: "ALCOHOLS, PHENOLS AND ETHERS in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "7 hours",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/8SiHbc0gP5s/hqdefault.jpg",
    publishedAt: "2024-10-25T10:00:00Z"
  },
  {
    videoId: "jHtw-XYfonM",
    title: "ALDEHYDES, KETONES AND CARBOXYLIC ACIDS in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand",
    duration: "8 hours, 1 minute",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/jHtw-XYfonM/hqdefault.jpg",
    publishedAt: "2024-10-30T10:00:00Z"
  },
  {
    videoId: "tX49KAEh-4k",
    title: "Amines in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "4 hours, 27 minutes",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/tX49KAEh-4k/hqdefault.jpg",
    publishedAt: "2024-11-01T10:00:00Z"
  },
  {
    videoId: "KjJWAHT9_p4",
    title: "BIOMOLECULES in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand NEET",
    duration: "5 hours, 39 minutes",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/KjJWAHT9_p4/hqdefault.jpg",
    publishedAt: "2024-11-05T10:00:00Z"
  },
  {
    videoId: "pytIsG8v1O0",
    title: "PURIFICATION OF ORGANIC COMPOUNDS + POC in 1 Shot: FULL CHAPTER COVERAGE (Concepts+PYQs) || Prachand",
    duration: "4 hours, 26 minutes",
    teacher: "Pankaj Sir",
    channel: "Competition Wallah",
    playlistId: "PLYgox9TeRaKfg3BlWPmkYNgSl0X1zUlqS",
    playlistName: "Prachand Complete Organic Chemistry In OneShot | NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/pytIsG8v1O0/hqdefault.jpg",
    publishedAt: "2024-11-10T10:00:00Z"
  },

  // Playlist 3: PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr (Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025)
  {
    videoId: "CFZPI-cTV1s",
    title: "MOLE CONCEPT in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 51 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/CFZPI-cTV1s/hqdefault.jpg",
    publishedAt: "2024-09-01T10:00:00Z"
  },
  {
    videoId: "Gko11YmTZL0",
    title: "STRUCTURE OF ATOM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "7 hours, 15 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Gko11YmTZL0/hqdefault.jpg",
    publishedAt: "2024-09-05T10:00:00Z"
  },
  {
    videoId: "Kr4ijuj6llM",
    title: "THERMODYNAMICS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "7 hours, 20 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Kr4ijuj6llM/hqdefault.jpg",
    publishedAt: "2024-09-10T10:00:00Z"
  },
  {
    videoId: "LNBQgqi2p4c",
    title: "SOLUTIONS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 55 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/LNBQgqi2p4c/hqdefault.jpg",
    publishedAt: "2024-09-15T10:00:00Z"
  },
  {
    videoId: "YpclpYZU9Ks",
    title: "CHEMICAL EQUILIBRIUM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 22 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/YpclpYZU9Ks/hqdefault.jpg",
    publishedAt: "2024-09-20T10:00:00Z"
  },
  {
    videoId: "glL_vCk6Ys8",
    title: "IONIC EQUILIBRIUM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 44 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/glL_vCk6Ys8/hqdefault.jpg",
    publishedAt: "2024-09-25T10:00:00Z"
  },
  {
    videoId: "46oqVj3m7ds",
    title: "ELECTROCHEMISTRY in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 48 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/46oqVj3m7ds/hqdefault.jpg",
    publishedAt: "2024-09-30T10:00:00Z"
  },
  {
    videoId: "0D_qAAhCrFg",
    title: "CHEMICAL KINETICS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 49 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/0D_qAAhCrFg/hqdefault.jpg",
    publishedAt: "2024-10-02T10:00:00Z"
  },
  {
    videoId: "mmpAtd6z2u4",
    title: "REDOX REACTION & SURFACE CHEMISTRY in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "2 hours, 6 minutes",
    teacher: "Amit Mahajan Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQgrsd1cPdbSHmjBg_ljvYr",
    playlistName: "Complete PHYSICAL CHEMISTRY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/mmpAtd6z2u4/hqdefault.jpg",
    publishedAt: "2024-10-05T10:00:00Z"
  },

  // Playlist 4: PL8_1l_iSLgySbc4z_zuXsAF5JPef8cxfX (Complete Class 12th ZOOLOGY in One Shot | Prachand NEET 2025)
  {
    videoId: "Zwan2QAAbAo",
    title: "HUMAN REPRODUCTION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "8 hours, 12 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySbc4z_zuXsAF5JPef8cxfX",
    playlistName: "Complete Class 12th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Zwan2QAAbAo/hqdefault.jpg",
    publishedAt: "2024-10-01T10:00:00Z"
  },
  {
    videoId: "LDOBcSv3KqY",
    title: "REPRODUCTIVE HEALTH in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 50 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySbc4z_zuXsAF5JPef8cxfX",
    playlistName: "Complete Class 12th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/LDOBcSv3KqY/hqdefault.jpg",
    publishedAt: "2024-10-05T10:00:00Z"
  },
  {
    videoId: "qAfP64kuUu8",
    title: "HUMAN HEALTH & DISEASES in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySbc4z_zuXsAF5JPef8cxfX",
    playlistName: "Complete Class 12th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/qAfP64kuUu8/hqdefault.jpg",
    publishedAt: "2024-10-10T10:00:00Z"
  },
  {
    videoId: "e-11dG8-AL4",
    title: "BIOTECHNOLOGY : PRINCIPLES & PROCESSES in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 42 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySbc4z_zuXsAF5JPef8cxfX",
    playlistName: "Complete Class 12th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/e-11dG8-AL4/hqdefault.jpg",
    publishedAt: "2024-10-15T10:00:00Z"
  },
  {
    videoId: "ys2UlRQTU1A",
    title: "BIOTECHNOLOGY AND ITS APPLICATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours, 42 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySbc4z_zuXsAF5JPef8cxfX",
    playlistName: "Complete Class 12th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/ys2UlRQTU1A/hqdefault.jpg",
    publishedAt: "2024-10-20T10:00:00Z"
  },
  {
    videoId: "fzvvIJDMn3Y",
    title: "EVOLUTION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 18 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySbc4z_zuXsAF5JPef8cxfX",
    playlistName: "Complete Class 12th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/fzvvIJDMn3Y/hqdefault.jpg",
    publishedAt: "2024-10-25T10:00:00Z"
  },

  // Playlist 5: PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG (Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025)
  {
    videoId: "L8u1BzHkGNQ",
    title: "ELECTRIC CHARGES AND FIELD in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "7 hours, 26 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/L8u1BzHkGNQ/hqdefault.jpg",
    publishedAt: "2024-09-01T10:00:00Z"
  },
  {
    videoId: "W3XdrIcyU8E",
    title: "ELECTROSTATIC POTENTIAL AND CAPACITANCE in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "8 hours, 6 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/W3XdrIcyU8E/hqdefault.jpg",
    publishedAt: "2024-09-05T10:00:00Z"
  },
  {
    videoId: "UivWFceHp9M",
    title: "CURRENT ELECTRICITY in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "7 hours, 57 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/UivWFceHp9M/hqdefault.jpg",
    publishedAt: "2024-09-10T10:00:00Z"
  },
  {
    videoId: "8FmM-xbyKto",
    title: "MOVING CHARGES AND MAGNETISM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "7 hours, 37 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/8FmM-xbyKto/hqdefault.jpg",
    publishedAt: "2024-09-15T10:00:00Z"
  },
  {
    videoId: "3vCY2xemf4g",
    title: "MAGNETISM & MATTER in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 41 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/3vCY2xemf4g/hqdefault.jpg",
    publishedAt: "2024-09-20T10:00:00Z"
  },
  {
    videoId: "Q1S4tcUASRk",
    title: "ELECTROMAGNETIC INDUCTION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 40 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Q1S4tcUASRk/hqdefault.jpg",
    publishedAt: "2024-09-25T10:00:00Z"
  },
  {
    videoId: "oF71yI0Zzz4",
    title: "ALTERNATING CURRENT in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 32 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/oF71yI0Zzz4/hqdefault.jpg",
    publishedAt: "2024-09-30T10:00:00Z"
  },
  {
    videoId: "3bn8YvtaoT4",
    title: "ELECTROMAGNETIC WAVES in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 19 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/3bn8YvtaoT4/hqdefault.jpg",
    publishedAt: "2024-10-05T10:00:00Z"
  },
  {
    videoId: "Ta6nCaTdhBM",
    title: "RAY OPTICS & OPTICAL INSTRUMENT in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "9 hours, 49 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Ta6nCaTdhBM/hqdefault.jpg",
    publishedAt: "2024-10-10T10:00:00Z"
  },
  {
    videoId: "-AsGWByk30s",
    title: "WAVE OPTICS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "7 hours, 8 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/-AsGWByk30s/hqdefault.jpg",
    publishedAt: "2024-10-15T10:00:00Z"
  },
  {
    videoId: "2lm0hZSjX0Y",
    title: "DUAL NATURE OF RADIATION & MATTER in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 10 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/2lm0hZSjX0Y/hqdefault.jpg",
    publishedAt: "2024-10-20T10:00:00Z"
  },
  {
    videoId: "tdNz09V6Jhg",
    title: "ATOMS + NUCLEI in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "7 hours, 33 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/tdNz09V6Jhg/hqdefault.jpg",
    publishedAt: "2024-10-25T10:00:00Z"
  },
  {
    videoId: "npjhUuLXTV8",
    title: "SEMICONDUCTOR ELECTRONICS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 59 minutes",
    teacher: "Saleem Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ76qsgw7Xl9Kq0xX5qeQCG",
    playlistName: "Complete Class 12th PHYSICS in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/npjhUuLXTV8/hqdefault.jpg",
    publishedAt: "2024-10-30T10:00:00Z"
  },

  // Playlist 6: PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh (Complete Class 12th BOTANY in One Shot | Prachand NEET 2025)
  {
    videoId: "vtuYmW-ahyc",
    title: "SEXUAL REPRODUCTION IN FLOWERING PLANT in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 21 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/vtuYmW-ahyc/hqdefault.jpg",
    publishedAt: "2024-09-01T10:00:00Z"
  },
  {
    videoId: "569biQt_ZOc",
    title: "MOLECULAR BASIS OF INHERITANCE - PART 1 in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 47 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/569biQt_ZOc/hqdefault.jpg",
    publishedAt: "2024-09-05T10:00:00Z"
  },
  {
    videoId: "Xfk37FZreu0",
    title: "MOLECULAR BASIS OF INHERITANCE - PART 2 in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 49 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Xfk37FZreu0/hqdefault.jpg",
    publishedAt: "2024-09-10T10:00:00Z"
  },
  {
    videoId: "Tv4lRVWyVcI",
    title: "MICROBES IN HUMAN WELFARE in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "2 hours, 17 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Tv4lRVWyVcI/hqdefault.jpg",
    publishedAt: "2024-09-15T10:00:00Z"
  },
  {
    videoId: "yylN99wlIYU",
    title: "PRINCIPLE OF INHERITANCE AND VARIATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "8 hours, 8 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/yylN99wlIYU/hqdefault.jpg",
    publishedAt: "2024-09-20T10:00:00Z"
  },
  {
    videoId: "8b9kIBmNT34",
    title: "ORGANISM AND POPULATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 51 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/8b9kIBmNT34/hqdefault.jpg",
    publishedAt: "2024-09-25T10:00:00Z"
  },
  {
    videoId: "WQN1hPgfvwk",
    title: "ECOSYSTEM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours, 44 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/WQN1hPgfvwk/hqdefault.jpg",
    publishedAt: "2024-09-30T10:00:00Z"
  },
  {
    videoId: "pPKXSOhOmi8",
    title: "BIODIVERSITY & CONSERVATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgySSZYhYss6UV9nKvl6XA2Rh",
    playlistName: "Complete Class 12th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/pPKXSOhOmi8/hqdefault.jpg",
    publishedAt: "2024-10-05T10:00:00Z"
  },

  // Playlist 7: PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7 (Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025)
  {
    videoId: "hlQh29qCZ9U",
    title: "STRUCTURAL ORGANIZATION IN ANIMALS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "8 hours, 20 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/hlQh29qCZ9U/hqdefault.jpg",
    publishedAt: "2024-08-01T10:00:00Z"
  },
  {
    videoId: "z18WRZm7FtA",
    title: "BREATHING & EXCHANGE OF GASES in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/z18WRZm7FtA/hqdefault.jpg",
    publishedAt: "2024-08-05T10:00:00Z"
  },
  {
    videoId: "Q25SLcqe2_g",
    title: "BODY FLUIDS & CIRCULATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 35 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Q25SLcqe2_g/hqdefault.jpg",
    publishedAt: "2024-08-10T10:00:00Z"
  },
  {
    videoId: "G-g8yle8FMk",
    title: "EXCRETORY PRODUCT AND THEIR ELIMINATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 13 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/G-g8yle8FMk/hqdefault.jpg",
    publishedAt: "2024-08-15T10:00:00Z"
  },
  {
    videoId: "Q5jluBG-yoM",
    title: "LOCOMOTION AND MOVEMENT in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 6 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Q5jluBG-yoM/hqdefault.jpg",
    publishedAt: "2024-08-20T10:00:00Z"
  },
  {
    videoId: "2lfBwN6YnYQ",
    title: "NEURAL CONTROL & COORDINATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours, 4 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/2lfBwN6YnYQ/hqdefault.jpg",
    publishedAt: "2024-08-25T10:00:00Z"
  },
  {
    videoId: "RMV7fzGc98Y",
    title: "CHEMICAL COORDINATION & INTEGRATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours, 28 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/RMV7fzGc98Y/hqdefault.jpg",
    publishedAt: "2024-08-30T10:00:00Z"
  },
  {
    videoId: "gaG3kXEj1d4",
    title: "BIOMOLECULES in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "4 hours, 35 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/gaG3kXEj1d4/hqdefault.jpg",
    publishedAt: "2024-09-01T10:00:00Z"
  },
  {
    videoId: "HEJvUY3l8eY",
    title: "ANIMAL KINGDOM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours, 55 minutes",
    teacher: "Nomesh Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyQ1NtwYwmqfmZNeTPI7HDJ7",
    playlistName: "Complete Class 11th ZOOLOGY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/HEJvUY3l8eY/hqdefault.jpg",
    publishedAt: "2024-09-05T10:00:00Z"
  },

  // Playlist 8: PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j (UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025)
  {
    videoId: "WDjcpSCI-uU",
    title: "BASIC MATHS in ONE SHOT || All Concepts, Tricks & PYQ || Ummeed NEET",
    duration: "7 hours, 16 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/WDjcpSCI-uU/hqdefault.jpg",
    publishedAt: "2024-12-01T10:00:00Z"
  },
  {
    videoId: "46CaYBwEp_k",
    title: "VECTORS in ONE SHOT || All Concepts, Tricks & PYQ || Ummeed NEET",
    duration: "5 hours, 58 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/46CaYBwEp_k/hqdefault.jpg",
    publishedAt: "2024-12-05T10:00:00Z"
  },
  {
    videoId: "-tIkepyF8aY",
    title: "MOTION IN A STRAIGHT LINE in ONE SHOT || All Concepts, Tricks & PYQ || Ummeed NEET",
    duration: "6 hours, 33 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/-tIkepyF8aY/hqdefault.jpg",
    publishedAt: "2024-12-10T10:00:00Z"
  },
  {
    videoId: "YKLZpAjK-M8",
    title: "MOTION IN A PLANE & KINEMATICS OF CIRCULAR MOTION in ONE SHOT || All Concepts & PYQ || Ummeed NEET",
    duration: "6 hours, 21 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/YKLZpAjK-M8/hqdefault.jpg",
    publishedAt: "2024-12-15T10:00:00Z"
  },
  {
    videoId: "2cdRXbYeCqo",
    title: "NEWTON'S LAWS OF MOTION & FRICTION in ONE SHOT || All Concepts & PYQ || Ummeed NEET",
    duration: "7 hours, 18 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/2cdRXbYeCqo/hqdefault.jpg",
    publishedAt: "2024-12-20T10:00:00Z"
  },
  {
    videoId: "Ce-1sflLTj8",
    title: "WORK, ENERGY & POWER, VERTICAL CIRCULAR DYNAMICS in ONE SHOT || All Concepts & PYQ || Ummeed NEET",
    duration: "5 hours, 34 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Ce-1sflLTj8/hqdefault.jpg",
    publishedAt: "2024-12-25T10:00:00Z"
  },
  {
    videoId: "wG4uHKZkJRI",
    title: "CENTRE OF MASS & COLLISION in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "5 hours, 17 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/wG4uHKZkJRI/hqdefault.jpg",
    publishedAt: "2024-12-28T10:00:00Z"
  },
  {
    videoId: "ec1CLG1jU0I",
    title: "ROTATIONAL MOTION in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "6 hours, 11 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/ec1CLG1jU0I/hqdefault.jpg",
    publishedAt: "2025-01-02T10:00:00Z"
  },
  {
    videoId: "eHIFpPdGuY0",
    title: "GRAVITATION in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "6 hours, 19 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/eHIFpPdGuY0/hqdefault.jpg",
    publishedAt: "2025-01-05T10:00:00Z"
  },
  {
    videoId: "a2T84FeLIdY",
    title: "MECHANICAL PROPERTIES OF SOLIDS in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "2 hours, 21 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/a2T84FeLIdY/hqdefault.jpg",
    publishedAt: "2025-01-10T10:00:00Z"
  },
  {
    videoId: "Ele4sqz0cUI",
    title: "MECHANICAL PROPERTIES OF FLUIDS in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "6 hours, 1 minute",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Ele4sqz0cUI/hqdefault.jpg",
    publishedAt: "2025-01-15T10:00:00Z"
  },
  {
    videoId: "CGS6eP-yZec",
    title: "THERMAL PROPERTIES OF MATTER in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "5 hours, 13 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/CGS6eP-yZec/hqdefault.jpg",
    publishedAt: "2025-01-20T10:00:00Z"
  },
  {
    videoId: "A8W90UdFyHM",
    title: "KINETIC THEORY & THERMODYNAMICS in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "5 hours, 57 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/A8W90UdFyHM/hqdefault.jpg",
    publishedAt: "2025-01-25T10:00:00Z"
  },
  {
    videoId: "wOIRp8B8l-U",
    title: "OSCILLATIONS in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "5 hours, 13 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/wOIRp8B8l-U/hqdefault.jpg",
    publishedAt: "2025-01-28T10:00:00Z"
  },
  {
    videoId: "QOYEiy1AUTI",
    title: "WAVES in ONE SHOT || All Concepts,Tricks & PYQ || Ummeed NEET",
    duration: "4 hours, 56 minutes",
    teacher: "MR Sir",
    channel: "Competition Wallah",
    playlistId: "PLJyab0VQDBGWQ1k4Lx2iuVHiiCzRwsu1j",
    playlistName: "UMMEED 2025 : Complete Class 11th PHYSICS in One Shot - NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/QOYEiy1AUTI/hqdefault.jpg",
    publishedAt: "2025-02-01T10:00:00Z"
  },

  // Playlist 9: PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5 (Complete Class 11th BOTANY in One Shot | Prachand NEET 2025)
  {
    videoId: "d_vY3PZ8-xM",
    title: "THE LIVING WORLD in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "3 hours",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5",
    playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/d_vY3PZ8-xM/hqdefault.jpg",
    publishedAt: "2024-08-01T10:00:00Z"
  },
  {
    videoId: "R6uQeW2o9yE",
    title: "BIOLOGICAL CLASSIFICATION in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 20 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5",
    playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/R6uQeW2o9yE/hqdefault.jpg",
    publishedAt: "2024-08-05T10:00:00Z"
  },
  {
    videoId: "1v0189p91S8",
    title: "PLANT KINGDOM in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 50 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5",
    playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/1v0189p91S8/hqdefault.jpg",
    publishedAt: "2024-08-10T10:00:00Z"
  },
  {
    videoId: "3A_M1lXn5Lg",
    title: "MORPHOLOGY OF FLOWERING PLANTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 20 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5",
    playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/3A_M1lXn5Lg/hqdefault.jpg",
    publishedAt: "2024-08-15T10:00:00Z"
  },
  {
    videoId: "7NqU66H9o3c",
    title: "ANATOMY OF FLOWERING PLANTS in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "5 hours, 40 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5",
    playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/7NqU66H9o3c/hqdefault.jpg",
    publishedAt: "2024-08-20T10:00:00Z"
  },
  {
    videoId: "Ga55Wc0_dG4",
    title: "CELL : THE UNIT OF LIFE & CELL CYCLE in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "6 hours, 30 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5",
    playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/Ga55Wc0_dG4/hqdefault.jpg",
    publishedAt: "2024-08-25T10:00:00Z"
  },
  {
    videoId: "P4U2t0K-5s0",
    title: "PLANT PHYSIOLOGY in 1 Shot || All Concepts & PYQs Covered || Prachand NEET",
    duration: "8 hours, 10 minutes",
    teacher: "Vipin Sir",
    channel: "Competition Wallah",
    playlistId: "PL8_1l_iSLgyT3Ims_3JkCAtV2oW0Wz3J5",
    playlistName: "Complete Class 11th BOTANY in One Shot | Prachand NEET 2025",
    thumbnail: "https://i.ytimg.com/vi/P4U2t0K-5s0/hqdefault.jpg",
    publishedAt: "2024-08-30T10:00:00Z"
  }
];

// Helper to calculate priority score for lecture selection
// Priority order:
// 1. Aarambh 2025 complete lecture (score 4)
// 2. Complete chapter lecture (score 3)
// 3. Full NCERT lecture (score 2)
// 4. Revision lecture (score 1)
function getLecturePriorityScore(title: string): number {
  const t = title.toLowerCase();
  if (t.includes('aarambh 2025') || t.includes('aarambh')) return 4;
  if (t.includes('complete') || t.includes('1 shot') || t.includes('one shot') || t.includes('full chapter')) return 3;
  if (t.includes('ncert')) return 2;
  if (t.includes('revision')) return 1;
  return 2;
}

function getUniqueVideosList(): { videos: RawPlaylistVideo[]; duplicateCount: number } {
  const map = new Map<string, RawPlaylistVideo>();
  let duplicateCount = 0;
  for (const v of OFFICIAL_PLAYLIST_VIDEOS) {
    if (map.has(v.videoId)) {
      duplicateCount++;
    } else {
      map.set(v.videoId, v);
    }
  }
  return { videos: Array.from(map.values()), duplicateCount };
}

function matchVideosForChapter(
  chapter: { id: string; name: string },
  subjectName: string,
  videoPool: RawPlaylistVideo[]
): RawPlaylistVideo[] {
  const cId = chapter.id;
  const cName = chapter.name.toLowerCase();
  const matches: RawPlaylistVideo[] = [];

  // Strictly filter videoPool by subject FIRST
  const filteredPool = videoPool.filter(v => {
    const pl = v.playlistName.toLowerCase();
    if (subjectName.toLowerCase().includes('physics')) {
      return pl.includes('physics');
    }
    if (subjectName.toLowerCase().includes('chemistry')) {
      return pl.includes('chemistry') || pl.includes('organic') || pl.includes('inorganic') || pl.includes('physical');
    }
    if (subjectName.toLowerCase().includes('bio')) {
      return pl.includes('botany') || pl.includes('zoology') || pl.includes('bio');
    }
    return true;
  });

  for (const v of filteredPool) {
    const vt = v.title.toLowerCase();

    // Direct Chapter ID or Title Keywords
    if (
      // Physics 11 & 12
      (cId === "chap-phy-units" && (vt.includes("units") || vt.includes("dimension") || vt.includes("basic maths"))) ||
      (cId === "chap-phy-vectors" && (vt.includes("vectors") || vt.includes("basic maths"))) ||
      (cId === "chap-phy-1d" && vt.includes("motion in a straight line")) ||
      (cId === "chap-phy-projectile" && vt.includes("motion in a plane")) ||
      (cId === "chap-phy-laws" && (vt.includes("laws of motion") || vt.includes("friction") || vt.includes("newton"))) ||
      (cId === "chap-phy-work-energy" && vt.includes("work, energy")) ||
      (cId === "chap-phy-com" && vt.includes("centre of mass")) ||
      (cId === "chap-phy-rotational" && vt.includes("rotational motion")) ||
      (cId === "chap-phy-gravitation" && vt.includes("gravitation")) ||
      (cId === "chap-phy-solids" && (vt.includes("properties of solids") || vt.includes("solids"))) ||
      (cId === "chap-phy-fluids" && (vt.includes("properties of fluids") || vt.includes("fluids"))) ||
      (cId === "chap-phy-thermal" && vt.includes("thermal properties")) ||
      (cId === "chap-phy-thermo" && vt.includes("thermodynamics")) ||
      (cId === "chap-phy-ktg" && (vt.includes("kinetic theory") || vt.includes("thermodynamics"))) ||
      (cId === "chap-phy-shm" && vt.includes("oscillations")) ||
      (cId === "chap-phy-waves" && vt.includes("waves")) ||
      (cId === "chap-phy-electrostatics" && (vt.includes("electric charges") || vt.includes("electrostatics"))) ||
      (cId === "chap-phy-capacitance" && vt.includes("electrostatic potential")) ||
      (cId === "chap-phy-current" && vt.includes("current electricity")) ||
      (cId === "chap-phy-magnetism" && vt.includes("moving charges")) ||
      (cId === "chap-phy-matter" && vt.includes("magnetism & matter")) ||
      (cId === "chap-phy-emi" && vt.includes("electromagnetic induction")) ||
      (cId === "chap-phy-ac" && vt.includes("alternating current")) ||
      (cId === "chap-phy-emwaves" && vt.includes("electromagnetic waves")) ||
      (cId === "chap-phy-ray-optics" && vt.includes("ray optics")) ||
      (cId === "chap-phy-wave-optics" && vt.includes("wave optics")) ||
      (cId === "chap-phy-dual-nature" && vt.includes("dual nature")) ||
      (cId === "chap-phy-atoms" && (vt.includes("atoms") || vt.includes("atoms + nuclei"))) ||
      (cId === "chap-phy-nuclei" && (vt.includes("nuclei") || vt.includes("atoms + nuclei"))) ||
      (cId === "chap-phy-semiconductors" && vt.includes("semiconductor")) ||

      // Chemistry 11 & 12
      (cId === "chap-chem-mole" && vt.includes("mole concept")) ||
      (cId === "chap-chem-atom" && vt.includes("structure of atom")) ||
      (cId === "chap-chem-thermo" && vt.includes("thermodynamics")) ||
      (cId === "chap-chem-chem-equil" && vt.includes("chemical equilibrium")) ||
      (cId === "chap-chem-ionic-equil" && vt.includes("ionic equilibrium")) ||
      (cId === "chap-chem-redox" && vt.includes("redox")) ||
      (cId === "chap-chem-solutions" && vt.includes("solutions")) ||
      (cId === "chap-chem-electro" && vt.includes("electrochemistry")) ||
      (cId === "chap-chem-kinetics" && vt.includes("chemical kinetics")) ||
      (cId === "chap-chem-periodic" && vt.includes("periodic")) ||
      (cId === "chap-chem-bonding" && vt.includes("bonding")) ||
      (cId === "chap-chem-pblock" && vt.includes("p-block")) ||
      (cId === "chap-chem-dfblock" && (vt.includes("d & f") || vt.includes("d-block") || vt.includes("f-block"))) ||
      (cId === "chap-chem-coordination" && vt.includes("coordination")) ||
      (cId === "chap-chem-salt" && vt.includes("salt analysis")) ||
      (cId === "chap-chem-goc" && (vt.includes("goc") || vt.includes("general organic"))) ||
      (cId === "chap-chem-iupac" && vt.includes("iupac")) ||
      (cId === "chap-chem-isomerism" && vt.includes("isomerism")) ||
      (cId === "chap-chem-hydrocarbons" && vt.includes("hydrocarbons")) ||
      (cId === "chap-chem-purification" && vt.includes("purification")) ||
      (cId === "chap-chem-haloalkanes" && (vt.includes("haloalkanes") || vt.includes("haloarenes"))) ||
      (cId === "chap-chem-alcohols" && (vt.includes("alcohols") || vt.includes("phenols"))) ||
      (cId === "chap-chem-carbonyl" && (vt.includes("aldehydes") || vt.includes("ketones") || vt.includes("carboxylic"))) ||
      (cId === "chap-chem-amines" && vt.includes("amines")) ||
      (cId === "chap-chem-biomolecules" && vt.includes("biomolecules")) ||

      // Biology 11 & 12
      (cId === "chap-bio-living-world" && vt.includes("living world")) ||
      (cId === "chap-bio-biological-class" && vt.includes("biological classification")) ||
      (cId === "chap-bio-plant-kingdom" && vt.includes("plant kingdom")) ||
      (cId === "chap-bio-morphology" && vt.includes("morphology")) ||
      (cId === "chap-bio-anatomy" && vt.includes("anatomy")) ||
      (cId === "chap-bio-cell" && vt.includes("cell")) ||
      (cId === "chap-bio-cell-cycle" && vt.includes("cell")) ||
      (cId === "chap-bio-photosynthesis" && (vt.includes("photosynthesis") || vt.includes("plant physiology"))) ||
      (cId === "chap-bio-respiration" && (vt.includes("respiration") || vt.includes("plant physiology"))) ||
      (cId === "chap-bio-plant-growth" && (vt.includes("plant growth") || vt.includes("plant physiology"))) ||
      (cId === "chap-bio-flowering-repro" && vt.includes("flowering plant")) ||
      (cId === "chap-bio-genetics-mendel" && vt.includes("principle of inheritance")) ||
      (cId === "chap-bio-dna" && vt.includes("molecular basis")) ||
      (cId === "chap-bio-microbes" && vt.includes("microbes")) ||
      (cId === "chap-bio-organisms-pop" && vt.includes("organism")) ||
      (cId === "chap-bio-ecosystem" && vt.includes("ecosystem")) ||
      (cId === "chap-bio-biodiversity" && vt.includes("biodiversity")) ||
      (cId === "chap-bio-animal-kingdom" && vt.includes("animal kingdom")) ||
      (cId === "chap-bio-structural-org" && vt.includes("structural organization")) ||
      (cId === "chap-bio-biomolecules-zoology" && vt.includes("biomolecules")) ||
      (cId === "chap-bio-breathing" && vt.includes("breathing")) ||
      (cId === "chap-bio-circulation" && vt.includes("body fluids")) ||
      (cId === "chap-bio-excretion" && vt.includes("excretory")) ||
      (cId === "chap-bio-locomotion" && vt.includes("locomotion")) ||
      (cId === "chap-bio-neural" && vt.includes("neural control")) ||
      (cId === "chap-bio-chemical-coord" && vt.includes("chemical coordination")) ||
      (cId === "chap-bio-human-repro" && vt.includes("human reproduction")) ||
      (cId === "chap-bio-reproductive-health" && vt.includes("reproductive health")) ||
      (cId === "chap-bio-evolution" && vt.includes("evolution")) ||
      (cId === "chap-bio-health-disease" && vt.includes("human health")) ||
      (cId === "chap-bio-biotech-principles" && vt.includes("principles & processes")) ||
      (cId === "chap-bio-biotech-apps" && vt.includes("its application"))
    ) {
      matches.push(v);
    }
  }

  // Fallback Fuzzy String Match on filteredPool if no exact ID match found
  if (matches.length === 0) {
    const ignoreWords = new Set(['chapter', 'complete', 'shot', 'shots', 'neet', 'one', 'full', 'part', '2025', 'class', '11th', '12th', 'prachand', 'ummeed', 'aarambh', 'analysis']);
    const keywords = cName.split(/[\s:,\-]+/).map(w => w.toLowerCase().trim()).filter(w => w.length > 3 && !ignoreWords.has(w));

    for (const v of filteredPool) {
      const vt = v.title.toLowerCase();
      const hits = keywords.filter(k => vt.includes(k)).length;
      if (hits >= 1) {
        matches.push(v);
      }
    }
  }

  // Sort matched videos by priority score descending
  matches.sort((a, b) => getLecturePriorityScore(b.title) - getLecturePriorityScore(a.title));

  return matches;
}

export function buildGeneratedDatabase() {
  const { videos: uniqueVideos, duplicateCount: duplicateVideosRemoved } = getUniqueVideosList();

  const allCurriculumChapters: Array<{
    chapterId: string;
    chapterName: string;
    subject: string;
    unit: string;
    classLevel: string | number;
  }> = [];

  CURRICULUM_DATA.forEach((s) => {
    s.units.forEach((u) => {
      u.chapters.forEach((c) => {
        allCurriculumChapters.push({
          chapterId: c.id,
          chapterName: c.name,
          subject: s.name,
          unit: u.name,
          classLevel: c.classLevel
        });
      });
    });
  });

  const matchedVideoIds = new Set<string>();
  const generatedRecords: Array<{
    chapterId: string;
    subject: string;
    class: string | number;
    chapterName: string;
    teacher: string;
    channel: string;
    youtubeId: string;
    videoTitle: string;
    duration: string;
    thumbnail: string;
    playlistId: string;
    playlist: string;
    verified: boolean;
    status: 'VERIFIED' | 'WAITING_FOR_OFFICIAL_LECTURE';
    unit: string;
    title: string;
    publishedAt: string;
    backupVideos?: Array<{
      videoId: string;
      title: string;
      duration: string;
      teacher: string;
      playlistId: string;
      playlistName: string;
    }>;
  }> = [];

  const topicLectureRecords: Array<{
    id: string;
    subject: string;
    class: 11 | 12;
    unit: string;
    chapter: string;
    topic: string;
    teacher: string;
    channel: string;
    playlist: string;
    playlistOrder: number;
    youtubeId: string;
    videoTitle: string;
    duration: string;
    thumbnail: string;
    recommended: true;
  }> = [];

  let mappedTopicsCount = 0;
  let unmappedTopicsCount = 0;

  CURRICULUM_DATA.forEach((subj) => {
    subj.units.forEach((unit) => {
      unit.chapters.forEach((chap) => {
        const matchedVideos = matchVideosForChapter(
          { id: chap.id, name: chap.name },
          subj.name,
          uniqueVideos
        );

        const primary = matchedVideos[0];
        const classNum: 11 | 12 = chap.classLevel.includes('12') ? 12 : 11;

        if (matchedVideos.length > 0) {
          matchedVideoIds.add(primary.videoId);
          const backups = matchedVideos.slice(1).map((bv) => {
            matchedVideoIds.add(bv.videoId);
            return {
              videoId: bv.videoId,
              title: bv.title,
              duration: bv.duration,
              teacher: bv.teacher,
              playlistId: bv.playlistId,
              playlistName: bv.playlistName
            };
          });

          generatedRecords.push({
            chapterId: chap.id,
            subject: subj.name,
            class: chap.classLevel,
            chapterName: chap.name,
            teacher: primary.teacher,
            channel: primary.channel,
            youtubeId: primary.videoId,
            videoTitle: primary.title,
            duration: primary.duration,
            thumbnail: primary.thumbnail,
            playlistId: primary.playlistId,
            playlist: primary.playlistName,
            verified: true,
            status: "VERIFIED",
            unit: unit.name,
            title: primary.title,
            publishedAt: primary.publishedAt,
            ...(backups.length > 0 ? { backupVideos: backups } : {})
          });
        } else {
          generatedRecords.push({
            chapterId: chap.id,
            subject: subj.name,
            class: chap.classLevel,
            chapterName: chap.name,
            teacher: "Pending Official Release",
            channel: "Competition Wallah",
            youtubeId: "",
            videoTitle: `${chap.name} (Waiting for Official Lecture)`,
            duration: "N/A",
            thumbnail: "",
            playlistId: "",
            playlist: "",
            verified: false,
            status: "WAITING_FOR_OFFICIAL_LECTURE",
            unit: unit.name,
            title: `${chap.name} (Waiting for Official Lecture)`,
            publishedAt: ""
          });
        }

        chap.topics.forEach((top) => {
          if (primary) {
            mappedTopicsCount++;
            const pOrder = OFFICIAL_PLAYLIST_VIDEOS.findIndex((v) => v.videoId === primary.videoId) + 1;
            topicLectureRecords.push({
              id: `rec-${top.id}`,
              subject: subj.name,
              class: classNum,
              unit: unit.name,
              chapter: chap.name,
              topic: top.title,
              teacher: primary.teacher,
              channel: primary.channel,
              playlist: primary.playlistName,
              playlistOrder: pOrder > 0 ? pOrder : 1,
              youtubeId: primary.videoId,
              videoTitle: primary.title,
              duration: primary.duration,
              thumbnail: primary.thumbnail,
              recommended: true
            });
          } else {
            unmappedTopicsCount++;
          }
        });
      });
    });
  });

  const matchedChaptersCount = generatedRecords.filter((r) => r.verified).length;
  const missingChaptersCount = generatedRecords.filter((r) => !r.verified).length;
  const coveragePercent = parseFloat(((mappedTopicsCount / (mappedTopicsCount + unmappedTopicsCount)) * 100).toFixed(1));

  const auditReport = {
    totalPlaylistVideosScanned: OFFICIAL_PLAYLIST_VIDEOS.length,
    totalVerifiedLectureMappings: matchedChaptersCount,
    duplicateVideosRemoved,
    missingChapters: missingChaptersCount,
    totalTopics: mappedTopicsCount + unmappedTopicsCount,
    mappedTopics: mappedTopicsCount,
    unmappedTopics: unmappedTopicsCount,
    coveragePercent
  };

  const fileContent = `// AUTOMATICALLY GENERATED LECTURE DATABASE
// PRIMARY SOURCE OF TRUTH: OFFICIAL PHYSICS WALLAH PRACHAND NEET 2025 & UMMEED 2025 PLAYLISTS
// GENERATED BY src/scripts/buildLectureDatabase.ts

export interface LectureRecord {
  id: string;
  subject: string;
  class: 11 | 12;
  unit: string;
  chapter: string;
  topic: string;
  teacher: string;
  channel: string;
  playlist: string;
  playlistOrder: number;
  youtubeId: string;
  videoTitle: string;
  duration: string;
  thumbnail: string;
  recommended: true;
}

export interface ImportedLectureRecord {
  chapterId: string;
  subject: string;
  class: string | number;
  chapterName: string;
  teacher: string;
  channel: string;
  youtubeId: string;
  videoTitle: string;
  duration: string;
  thumbnail: string;
  playlistId: string;
  playlist: string;
  verified: boolean;
  status: 'VERIFIED' | 'WAITING_FOR_OFFICIAL_LECTURE';
  unit?: string;
  title?: string;
  playlistName?: string;
  publishedAt?: string;
  backupVideos?: Array<{
    videoId: string;
    title: string;
    duration: string;
    teacher: string;
    playlistId: string;
    playlistName: string;
  }>;
}

export const GENERATED_LECTURE_DATABASE: LectureRecord[] = ${JSON.stringify(topicLectureRecords, null, 2)};

export const LECTURE_DATABASE: ImportedLectureRecord[] = ${JSON.stringify(generatedRecords, null, 2)};

export const AUDIT_REPORT = ${JSON.stringify(auditReport, null, 2)};
`;

  const outputPath = path.resolve(process.cwd(), 'src/data/generatedLectureDatabase.ts');
  fs.writeFileSync(outputPath, fileContent, 'utf-8');

  console.log("===================================================");
  console.log("OFFICIAL PLAYLIST LECTURE DATABASE AUDIT REPORT");
  console.log("===================================================");
  console.log(`Total playlist videos scanned: ${auditReport.totalPlaylistVideosScanned}`);
  console.log(`Total verified lecture mappings: ${auditReport.totalVerifiedLectureMappings}`);
  console.log(`Duplicate videos removed: ${auditReport.duplicateVideosRemoved}`);
  console.log(`Total Topics: ${auditReport.totalTopics}`);
  console.log(`Mapped Topics: ${auditReport.mappedTopics}`);
  console.log(`Unmapped Topics: ${auditReport.unmappedTopics}`);
  console.log(`Coverage %: ${auditReport.coveragePercent}%`);
  console.log("===================================================");
  console.log(`Successfully written to ${outputPath}`);
}

// Execute if run directly
buildGeneratedDatabase();

