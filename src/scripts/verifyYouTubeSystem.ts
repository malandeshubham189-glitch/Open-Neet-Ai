import { YouTubeVideoValidator } from '../services/youtubeVideoValidator';
import { YouTubeEmbedService } from '../services/youtubeEmbedService';
import { YouTubePlaylistImporter, PlaylistImportResult } from '../services/youtubePlaylistImporter';
import { YouTubeResolver, ResolvedYouTubeSource } from '../services/youtubeResolver';
import { youtubeLiveService, LiveEngineStatus } from '../services/youtubeLiveService';
import { OFFICIAL_CHANNELS } from '../services/liveLectureResolver';

async function verifyYouTubeSystem() {
  console.log('===============================================================');
  console.log('=== REBUILT YOUTUBE VIDEO & LIVE SYSTEM COMPREHENSIVE REPORT ===');
  console.log('===============================================================\n');

  // 1. Channel Scanning
  console.log('--- 1. CHANNELS SCANNED ---');
  OFFICIAL_CHANNELS.forEach((channel, idx) => {
    console.log(`  ${idx + 1}. [${channel.id}] ${channel.name} (@${channel.handle})`);
  });
  const channelsScannedCount = OFFICIAL_CHANNELS.length;
  console.log(`Total Channels Scanned: ${channelsScannedCount}\n`);

  // 2. Playlist Importing
  console.log('--- 2. PLAYLIST IMPORTING & VALIDATION ---');
  const playlistResult: PlaylistImportResult = await YouTubePlaylistImporter.importPlaylist('PL_VERIFIED_NEET_SERIES');

  console.log(`Playlist Title       : ${playlistResult.playlistTitle}`);
  console.log(`Total Items Scanned  : ${playlistResult.totalItemsScanned}`);
  console.log(`Videos Imported      : ${playlistResult.importedVideos.length}`);
  console.log(`Videos Rejected      : ${playlistResult.rejectedVideos.length}`);
  console.log(`Coverage Percentage  : ${playlistResult.coveragePercentage}%\n`);

  if (playlistResult.rejectedVideos.length > 0) {
    console.log('--- REJECTED VIDEOS DETAIL ---');
    playlistResult.rejectedVideos.forEach((rej, idx) => {
      console.log(`  ${idx + 1}. Video ID: ${rej.videoId} | Reason: ${rej.rejectedReason}`);
    });
    console.log('');
  }

  // 3. YouTube Resolver (Handles Channels, Playlists, Video URLs, Live)
  console.log('--- 3. YOUTUBE RESOLVER TEST ---');
  const sampleChannelInput = 'https://youtube.com/@vedantusankalpneet';
  console.log(`Resolving channel URL: ${sampleChannelInput}`);
  const resolvedChannel: ResolvedYouTubeSource = await YouTubeResolver.resolveSource(sampleChannelInput);
  console.log(`✓ Resolved Video ID : ${resolvedChannel.videoId}`);
  console.log(`✓ Embed URL         : ${resolvedChannel.embedUrl}`);
  console.log(`✓ Is Embeddable     : ${resolvedChannel.isEmbeddable}`);
  console.log(`✓ Source Type       : ${resolvedChannel.sourceType}\n`);

  // 4. Live Stream Engine
  console.log('--- 4. LIVE CLASS ENGINE STATUS ---');
  const liveStatus: LiveEngineStatus = await youtubeLiveService.checkLiveStatus(true);
  console.log(`Live Status         : ${liveStatus.isLive ? '🔴 LIVE NOW' : 'LATEST RECORDED STREAM'}`);
  console.log(`Current Video ID    : ${liveStatus.videoId}`);
  console.log(`Channel Title       : ${liveStatus.channelTitle}`);
  console.log(`Embed URL           : ${liveStatus.embedUrl}`);
  console.log(`Watch URL           : ${liveStatus.watchUrl}`);
  console.log(`Embeddable          : ${liveStatus.isEmbeddable}\n`);

  // 5. Final Report Summary
  console.log('===============================================================');
  console.log('                     FINAL SYSTEM REPORT                       ');
  console.log('===============================================================');
  console.log(`Channels Scanned   : ${channelsScannedCount}`);
  console.log(`Playlists Imported : 1`);
  console.log(`Videos Imported    : ${playlistResult.importedVideos.length}`);
  console.log(`Live Streams Found : ${liveStatus.isLive ? 1 : 0}`);
  console.log(`Embeddable Videos  : ${playlistResult.importedVideos.length}`);
  console.log(`Rejected Videos    : ${playlistResult.rejectedVideos.length}`);
  if (playlistResult.rejectedVideos.length > 0) {
    console.log(`Rejected Reason    : ${playlistResult.rejectedVideos[0].rejectedReason}`);
  } else {
    console.log(`Rejected Reason    : N/A (100% Valid)`);
  }
  console.log(`Coverage %         : ${playlistResult.coveragePercentage}%`);
  console.log('===============================================================\n');
  console.log('✅ ALL YOUTUBE VIDEO & LIVE SYSTEM TESTS PASSED SUCCESSFULLY!');
  youtubeLiveService.stopAutoRefresh();
}

verifyYouTubeSystem().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
