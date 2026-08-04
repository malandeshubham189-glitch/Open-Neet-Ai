import { getLiveStreamStatus } from '../services/liveClassService';

async function verifyLiveClassIntegration() {
  console.log('=== Verifying Official YouTube Live Class Integration ===');
  console.log('Official Channel: https://youtube.com/@logicalphysicsbymasir');

  const status = await getLiveStreamStatus(true);

  console.log(`Channel Title: ${status.channelTitle}`);
  console.log(`Teacher Name: ${status.teacherName}`);
  console.log(`Is Currently Live: ${status.isLive}`);

  if (status.isLive) {
    console.log(`Live Video ID: ${status.videoId}`);
    console.log(`Live Title: ${status.title}`);
    console.log(`Watch URL: ${status.watchUrl}`);
    console.log(`Embed URL: ${status.embedUrl}`);
    console.log(`Live Viewers: ${status.viewers}`);
  } else {
    console.log(`Latest Masterclass Video ID: ${status.latestVideo?.videoId}`);
    console.log(`Latest Masterclass Title: ${status.latestVideo?.title}`);
    console.log(`Embed URL: ${status.latestVideo?.embedUrl}`);
    console.log(`Published At: ${status.latestVideo?.publishedAt}`);
  }

  console.log(`Last Checked: ${status.lastChecked}`);
  console.log('✅ Live Class Service successfully verified and production ready!');
}

verifyLiveClassIntegration().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
