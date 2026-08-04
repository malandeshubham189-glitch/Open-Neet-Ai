export interface TelegramServerPost {
  id: string;
  telegramMessageId: number;
  channelUsername: string;
  postUrl: string;
  date: string;
  caption: string;
  cleanText: string;
  mediaType: 'video' | 'pdf' | 'image' | 'text' | 'link';
  mediaUrl?: string;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: string;
  thumbnailUrl?: string;
  embedVideoUrl?: string;
  hashtags: string[];
  subjectId: 'physics' | 'chemistry' | 'biology' | 'uncategorized';
  classLevel: 'Class 11' | 'Class 12' | 'All';
  chapterName: string;
  topicTag?: string;
  sourceTag: string;
  syncedAt: string;
}

export function autoCategorizeTelegramCaption(caption: string): {
  subjectId: 'physics' | 'chemistry' | 'biology' | 'uncategorized';
  classLevel: 'Class 11' | 'Class 12' | 'All';
  chapterName: string;
  hashtags: string[];
} {
  const textLower = (caption || '').toLowerCase();
  const hashtagsMatch = caption ? caption.match(/#[\w\d_]+/g) || [] : [];
  const hashtags = hashtagsMatch.map((h) => h.replace('#', ''));

  // Detect Subject
  let subjectId: 'physics' | 'chemistry' | 'biology' | 'uncategorized' = 'uncategorized';
  if (textLower.includes('physics') || hashtags.some((h) => h.toLowerCase() === 'physics')) {
    subjectId = 'physics';
  } else if (textLower.includes('chemistry') || hashtags.some((h) => h.toLowerCase() === 'chemistry')) {
    subjectId = 'chemistry';
  } else if (
    textLower.includes('biology') ||
    textLower.includes('botany') ||
    textLower.includes('zoology') ||
    hashtags.some((h) => ['biology', 'botany', 'zoology'].includes(h.toLowerCase()))
  ) {
    subjectId = 'biology';
  }

  // Detect Class
  let classLevel: 'Class 11' | 'Class 12' | 'All' = 'All';
  if (textLower.includes('class11') || textLower.includes('class 11') || textLower.includes('11th')) {
    classLevel = 'Class 11';
  } else if (textLower.includes('class12') || textLower.includes('class 12') || textLower.includes('12th')) {
    classLevel = 'Class 12';
  }

  // Detect Chapter Name based on common chapter keywords
  let chapterName = 'General Channel Notes';
  if (textLower.includes('rotation') || textLower.includes('center of mass') || textLower.includes('torque')) {
    chapterName = 'System of Particles and Rotational Motion';
  } else if (textLower.includes('electrostatic') || textLower.includes('capacit') || textLower.includes('dielectric')) {
    chapterName = 'Electrostatic Potential and Capacitance';
  } else if (textLower.includes('organic') || textLower.includes('reaction') || textLower.includes('aldehyde') || textLower.includes('ketone')) {
    chapterName = 'Aldehydes, Ketones and Carboxylic Acids';
  } else if (textLower.includes('coordination') || textLower.includes('isomerism') || textLower.includes('cft')) {
    chapterName = 'Coordination Compounds';
  } else if (textLower.includes('reproduction') || textLower.includes('menstrual') || textLower.includes('sperm') || textLower.includes('embryo')) {
    chapterName = 'Human Reproduction';
  } else if (textLower.includes('genetics') || textLower.includes('dna') || textLower.includes('replication') || textLower.includes('transcription')) {
    chapterName = 'Molecular Basis of Inheritance';
  } else if (textLower.includes('cell') || textLower.includes('organelle') || textLower.includes('mitosis')) {
    chapterName = 'Cell: The Unit of Life';
  } else if (textLower.includes('photosynthesis') || textLower.includes('chloroplast') || textLower.includes('calvin')) {
    chapterName = 'Photosynthesis in Higher Plants';
  } else if (textLower.includes('current') || textLower.includes('ohm') || textLower.includes('kirchhoff')) {
    chapterName = 'Current Electricity';
  } else if (textLower.includes('atomic') || textLower.includes('bohr') || textLower.includes('photoelectric') || textLower.includes('modern physics')) {
    chapterName = 'Dual Nature of Radiation and Matter';
  } else if (textLower.includes('plant kingdom') || textLower.includes('algae') || textLower.includes('fungi')) {
    chapterName = 'Plant Kingdom';
  }

  return { subjectId, classLevel, chapterName, hashtags };
}

// Fetch posts via Telegram Bot API (if Bot Token provided)
export async function fetchTelegramViaBotApi(
  botToken: string,
  channelUsername: string
): Promise<{ success: boolean; posts?: TelegramServerPost[]; error?: string; isInvalidToken?: boolean }> {
  try {
    const cleanToken = botToken.trim();
    const getMeUrl = `https://api.telegram.org/bot${cleanToken}/getMe`;
    const meRes = await fetch(getMeUrl, { signal: AbortSignal.timeout(8000) });
    
    if (!meRes.ok) {
      if (meRes.status === 401 || meRes.status === 404) {
        return {
          success: false,
          isInvalidToken: true,
          error: `Telegram Bot Token invalid or unauthorized (HTTP ${meRes.status}). Please check your Bot Token from @BotFather.`
        };
      }
      return {
        success: false,
        error: `Telegram Bot API error (HTTP ${meRes.status}).`
      };
    }

    const meData = await meRes.json();
    if (!meData.ok) {
      return {
        success: false,
        isInvalidToken: true,
        error: `Telegram Bot API Error: ${meData.description || 'Invalid token'}`
      };
    }

    const botInfo = meData.result;
    const targetChannel = channelUsername.replace(/^@/, '').trim() || botInfo.username || 'Bot';

    // Fetch Updates
    const updatesUrl = `https://api.telegram.org/bot${cleanToken}/getUpdates?allowed_updates=["message","channel_post"]&limit=100`;
    const updatesRes = await fetch(updatesUrl, { signal: AbortSignal.timeout(10000) });
    const updatesData = await updatesRes.json();

    if (!updatesData.ok) {
      return {
        success: false,
        error: `Telegram Bot getUpdates error: ${updatesData.description || 'Failed to fetch updates'}`
      };
    }

    const rawUpdates = updatesData.result || [];
    const posts: TelegramServerPost[] = [];

    for (let i = 0; i < rawUpdates.length; i++) {
      const item = rawUpdates[i];
      const msg = item.channel_post || item.message;
      if (!msg) continue;

      const msgId = msg.message_id || i + 1;
      const dateStr = msg.date ? new Date(msg.date * 1000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
      const rawText = msg.text || msg.caption || '';

      let mediaType: 'video' | 'pdf' | 'image' | 'text' | 'link' = 'text';
      let mediaUrl: string | undefined = undefined;
      let downloadUrl: string | undefined = undefined;
      let fileName: string | undefined = undefined;
      let fileSize: string | undefined = undefined;
      let embedVideoUrl: string | undefined = undefined;

      // Extract Document (PDF)
      if (msg.document) {
        mediaType = 'pdf';
        fileName = msg.document.file_name || `Telegram_Doc_${msgId}.pdf`;
        if (msg.document.file_size) {
          fileSize = `${(msg.document.file_size / (1024 * 1024)).toFixed(1)} MB`;
        }
        
        // Get File Path
        try {
          const fileInfoRes = await fetch(`https://api.telegram.org/bot${cleanToken}/getFile?file_id=${msg.document.file_id}`);
          const fileInfoData = await fileInfoRes.json();
          if (fileInfoData.ok && fileInfoData.result?.file_path) {
            const filePath = fileInfoData.result.file_path;
            mediaUrl = `/api/telegram/file-proxy?filePath=${encodeURIComponent(filePath)}&token=${encodeURIComponent(cleanToken)}`;
            downloadUrl = mediaUrl;
          }
        } catch (e) {
          console.warn('Error fetching document file path:', e);
        }
      }
      // Extract Video
      else if (msg.video) {
        mediaType = 'video';
        try {
          const fileInfoRes = await fetch(`https://api.telegram.org/bot${cleanToken}/getFile?file_id=${msg.video.file_id}`);
          const fileInfoData = await fileInfoRes.json();
          if (fileInfoData.ok && fileInfoData.result?.file_path) {
            const filePath = fileInfoData.result.file_path;
            mediaUrl = `/api/telegram/file-proxy?filePath=${encodeURIComponent(filePath)}&token=${encodeURIComponent(cleanToken)}`;
            embedVideoUrl = mediaUrl;
          }
        } catch (e) {
          console.warn('Error fetching video file path:', e);
        }
      }
      // Extract Photo
      else if (msg.photo && msg.photo.length > 0) {
        mediaType = 'image';
        const largestPhoto = msg.photo[msg.photo.length - 1];
        try {
          const fileInfoRes = await fetch(`https://api.telegram.org/bot${cleanToken}/getFile?file_id=${largestPhoto.file_id}`);
          const fileInfoData = await fileInfoRes.json();
          if (fileInfoData.ok && fileInfoData.result?.file_path) {
            const filePath = fileInfoData.result.file_path;
            mediaUrl = `/api/telegram/file-proxy?filePath=${encodeURIComponent(filePath)}&token=${encodeURIComponent(cleanToken)}`;
          }
        } catch (e) {
          console.warn('Error fetching photo file path:', e);
        }
      }

      // Check for YouTube links in text
      const youtubeMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (youtubeMatch) {
        const ytId = youtubeMatch[1];
        mediaType = 'video';
        embedVideoUrl = `https://www.youtube.com/embed/${ytId}`;
        if (!mediaUrl) mediaUrl = embedVideoUrl;
      }

      const catInfo = autoCategorizeTelegramCaption(rawText);

      posts.push({
        id: `tg-${targetChannel}-${msgId}`,
        telegramMessageId: msgId,
        channelUsername: targetChannel,
        postUrl: `https://t.me/${targetChannel}/${msgId}`,
        date: dateStr,
        caption: rawText || `Post #${msgId} via Telegram Bot API`,
        cleanText: rawText,
        mediaType,
        mediaUrl,
        downloadUrl,
        fileName,
        fileSize,
        thumbnailUrl: mediaType === 'image' ? mediaUrl : undefined,
        embedVideoUrl,
        hashtags: catInfo.hashtags,
        subjectId: catInfo.subjectId,
        classLevel: catInfo.classLevel,
        chapterName: catInfo.chapterName,
        sourceTag: `From @${targetChannel} (Telegram Bot API)`,
        syncedAt: new Date().toISOString()
      });
    }

    return {
      success: true,
      posts
    };
  } catch (err: any) {
    console.error('Error fetching Telegram Bot API:', err);
    return {
      success: false,
      error: `Telegram Bot API Network Error: ${err?.message || String(err)}`
    };
  }
}

// Fetch posts via Telegram Public Web Preview (https://t.me/s/channelName)
export async function fetchTelegramPublicChannel(
  channelUsername: string
): Promise<{ success: boolean; posts?: TelegramServerPost[]; isBotOrPrivate?: boolean; error?: string }> {
  const cleanChannel = channelUsername.replace(/^@/, '').replace(/https?:\/\/t\.me\/(s\/)?/, '').trim();

  if (!cleanChannel) {
    return { success: false, error: 'Channel username is required.' };
  }

  const previewUrl = `https://t.me/s/${cleanChannel}`;

  try {
    const res = await fetch(previewUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!res.ok) {
      if (res.status === 404) {
        return {
          success: false,
          error: `Telegram Channel @${cleanChannel} not found (404). Please verify the channel handle.`
        };
      }
      return {
        success: false,
        error: `Failed to fetch @${cleanChannel} public preview (HTTP Status ${res.status}).`
      };
    }

    const htmlText = await res.text();

    // Check if redirect page for bot account or private channel
    if (htmlText.includes('If you have <strong>Telegram</strong>, you can contact') || htmlText.includes('tgme_page_icon')) {
      return {
        success: false,
        isBotOrPrivate: true,
        error: `@${cleanChannel} is a Telegram Bot or Private Account without a public web preview (/s/). To sync real content from @${cleanChannel}, please connect your Telegram Bot Token in the settings below.`
      };
    }

    // Extract message blocks using RegEx
    const postBlockRegex = /<div class="tgme_widget_message\s[^"]*"[^>]*data-post="([^"]+)"[\s\S]*?(?=<div class="tgme_widget_message\s|$)/g;
    let match;
    const posts: TelegramServerPost[] = [];

    while ((match = postBlockRegex.exec(htmlText)) !== null) {
      const postPath = match[1]; // e.g., "channel/101"
      const block = match[0];

      const msgId = parseInt(postPath.split('/')[1] || '0', 10);
      
      // Extract date
      const timeMatch = block.match(/<time[^>]*datetime="([^"]+)"/);
      const dateStr = timeMatch ? timeMatch[1].slice(0, 10) : new Date().toISOString().slice(0, 10);

      // Extract text
      const textMatch = block.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
      let rawText = '';
      if (textMatch) {
        rawText = textMatch[1]
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '')
          .trim();
      }

      // Extract photo
      const photoMatch = block.match(/background-image:url\(\x27([^\x27]+)\x27\)/);
      let photoUrl = photoMatch ? photoMatch[1] : undefined;

      // Extract document / PDF
      const docTitleMatch = block.match(/class="tgme_widget_message_document_title[^"]*">([^<]+)<\/div>/);
      const docExtraMatch = block.match(/class="tgme_widget_message_document_extra[^"]*">([^<]+)<\/div>/);
      const docLinkMatch = block.match(/class="tgme_widget_message_document_wrap[^"]*"[^>]*href="([^"]+)"/);

      let mediaType: 'video' | 'pdf' | 'image' | 'text' | 'link' = 'text';
      let mediaUrl: string | undefined = undefined;
      let downloadUrl: string | undefined = undefined;
      let fileName: string | undefined = undefined;
      let fileSize: string | undefined = undefined;
      let embedVideoUrl: string | undefined = undefined;

      if (docLinkMatch || docTitleMatch) {
        mediaType = 'pdf';
        fileName = docTitleMatch ? docTitleMatch[1].trim() : `Telegram_Document_${msgId}.pdf`;
        fileSize = docExtraMatch ? docExtraMatch[1].trim() : 'PDF Document';
        if (docLinkMatch) {
          const directDocUrl = docLinkMatch[1];
          mediaUrl = `/api/telegram/file-proxy?url=${encodeURIComponent(directDocUrl)}`;
          downloadUrl = mediaUrl;
        }
      } else if (photoUrl) {
        mediaType = 'image';
        mediaUrl = `/api/telegram/file-proxy?url=${encodeURIComponent(photoUrl)}`;
      }

      // Check YouTube video in text or video player
      const youtubeMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (youtubeMatch) {
        const ytId = youtubeMatch[1];
        mediaType = 'video';
        embedVideoUrl = `https://www.youtube.com/embed/${ytId}`;
        if (!mediaUrl) mediaUrl = embedVideoUrl;
      }

      const catInfo = autoCategorizeTelegramCaption(rawText);

      posts.push({
        id: `tg-${cleanChannel}-${msgId}`,
        telegramMessageId: msgId,
        channelUsername: cleanChannel,
        postUrl: `https://t.me/${postPath}`,
        date: dateStr,
        caption: rawText || `Post #${msgId} from @${cleanChannel}`,
        cleanText: rawText,
        mediaType,
        mediaUrl,
        downloadUrl,
        fileName,
        fileSize,
        thumbnailUrl: photoUrl ? `/api/telegram/file-proxy?url=${encodeURIComponent(photoUrl)}` : undefined,
        embedVideoUrl,
        hashtags: catInfo.hashtags,
        subjectId: catInfo.subjectId,
        classLevel: catInfo.classLevel,
        chapterName: catInfo.chapterName,
        sourceTag: `From @${cleanChannel} Telegram Channel`,
        syncedAt: new Date().toISOString()
      });
    }

    if (posts.length === 0) {
      return {
        success: false,
        isBotOrPrivate: true,
        error: `No public preview messages found for @${cleanChannel}. If @${cleanChannel} is a bot or private channel, connect your Telegram Bot Token below.`
      };
    }

    return {
      success: true,
      posts
    };
  } catch (err: any) {
    console.error('Error in fetchTelegramPublicChannel:', err);
    return {
      success: false,
      error: `Network error fetching Telegram preview: ${err?.message || String(err)}`
    };
  }
}
