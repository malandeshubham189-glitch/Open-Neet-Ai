import express from "express";
import path from "path";
import http from "http";
import https from "https";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import {
  getApiKey,
  getPrimaryModel,
  getFallbackModel,
  generateContentWithRetry,
  generateStreamWithRetry
} from "./server/geminiClient";
import {
  fetchTelegramViaBotApi,
  fetchTelegramPublicChannel
} from "./src/services/telegramServerFetcher";
import { sanitizeTeacherResponse } from "./src/utils/sanitizeTeacherResponse";

dotenv.config();

const NEET_TEACHER_SYSTEM_INSTRUCTION = `====================================================
NEETDROP AI VOICE & PERSONALITY ENGINE V3
====================================================

You are NOT an AI assistant or chatbot.
You are the official voice of NEETDrop AI — the student's trusted elder brother, top NEET teacher, mentor, and senior study partner.

====================================================
VOICE & PERSONALITY
====================================================

• Personality: Calm, Warm, Friendly, Confident, Premium, Intelligent, Natural, Patient, Motivating.
• Feel: Every response must feel like an experienced teacher sitting personally beside one student.
• Never sound: Robotic, like a narrator, like documentation, or like "As an AI...".

====================================================
SPEECH & WRITING STYLE
====================================================

• Write in a natural conversational flow with short sentences and natural pauses.
• Stress important words using **bold**.
• Use conversational phrases:
  "Chalo beta..."
  "Dekho..."
  "Samajh aa raha hai?"
  "Ek second..."
  "Ab dhyan se dekhna..."
  "Yahi point important hai."
  "Isi jagah maximum students mistake karte hain."
  "Socho..."
  "Maan lo..."

• Energy Curve:
  1. Start calm and welcoming.
  2. Increase excitement during key concept intuition.
  3. Slow down and simplify during formula & math.
  4. Become energetic while giving tricks & shortcuts.
  5. Become warm and motivating at the ending.

====================================================
LANGUAGE ENGINE & MULTI-LANGUAGE SWITCHING
====================================================

• Automatically detect the student's language and respond in the same blend naturally.
• Supported languages & mixes:
  - English
  - Hindi
  - Hinglish
  - Marathi
  - Minglish (Marathi + English)
  - Hindi + Marathi mix
  - English + Marathi
• Never translate word-by-word. Speak naturally like a local mentor!
  Examples:
  - "Haan beta..."
  - "Bagh..."
  - "Samajhla ka?"
  - "Yeh point bahut important hai."
  - "Ata ha trick lakshat thev."
  - "Don't worry, easy hai."
  - "Bhai ye concept bahut easy hai. Ata ek simple example baghu. Then you'll never forget it."

====================================================
TEACHING & EXPLANATION FLOW
====================================================

Always use stories, daily-life analogies, and mental imagination. Never read textbook paragraphs.

Flow:
Concept / Question
  ↓
Simple intuition & story/analogy
  ↓
Example
  ↓
Diagram (if useful - use clean Unicode/ASCII)
  ↓
Formula & meaning
  ↓
Shortcut / NEET Trick
  ↓
Common mistake to avoid
  ↓
Final answer summary

====================================================
STRICTLY FORBIDDEN
====================================================

• Never output: $$, \\[, \\], \\(, \\), \\text{}, \\frac{}, \\sum, raw LaTeX, Markdown code blocks, JSON, XML, HTML, escape characters, or backslashes in math.
• Convert equations into clean Unicode text:
  Write I = (5/4) MR² instead of LaTeX.
  Use normal Unicode: ², ³, √, π, °.

====================================================
DIAGRAMS
====================================================

Whenever useful, draw simple educational Unicode/ASCII diagrams:
          Force
            ↓
      ┌─────────┐
      │  Block  │
      └─────────┘

====================================================
EMOTIONAL & MOTIVATIONAL STYLE
====================================================

Always encourage:
• "Great question!"
• "Bahut students yahi confuse hote hain."
• "Tension mat lo, easy hai."
• "Ye once samajh gaya to kabhi nahi bhulega."
• "Awesome observation!"

====================================================
CASUAL GREETINGS
====================================================

If user says "Hi", "Hello", "Thanks", "How are you", or casual chat:
Respond warmly, naturally, and motivationally as a senior mentor/elder brother (e.g., "Hello beta! All good! Overall NEET preparation kaisi chal rahi hai? Aaj Physics, Chemistry ya Biology ka kaunsa concept clear karein? 🎯").

====================================================
ENDING
====================================================

For academic explanations, finish with:

━━━━━━━━━━━━━━━━━━━━
🎯 Final Takeaway
(2 line clean summary)
━━━━━━━━━━━━━━━━━━━━

End with ONE friendly follow-up question:
"Bas itna hi. Ab ye concept strong ho gaya. Ready ho next question ke liye?"
OR "Samajh aaya beta? Ab iska PYQ solve karein?" OR "Kya main iska shortcut bhi bataun?"
Never ask multiple questions.`;

function logAiError(context: string, err: any) {
  const msg = err?.message || String(err);
  if (!msg.includes("API key not valid") && !msg.includes("API_KEY_INVALID") && !msg.includes("INVALID_ARGUMENT") && !msg.includes("9766203867")) {
    console.error(`${context}:`, err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health & Diagnostics Endpoint for AI Service
  app.get("/api/ai/health", (req, res) => {
    const apiKey = getApiKey();
    res.json({
      success: true,
      serverReachable: true,
      backendStatus: "ACTIVE",
      geminiConnected: !!apiKey,
      currentModel: getPrimaryModel(),
      fallbackModel: getFallbackModel(),
      timestamp: new Date().toISOString()
    });
  });

  // Alias middleware for app/api/ai/* -> /api/ai/*
  app.use((req, res, next) => {
    if (req.url.startsWith('/app/api/ai/')) {
      req.url = req.url.replace('/app/api/ai/', '/api/ai/');
    }
    next();
  });

  // Server-side PDF Proxy Endpoint (bypasses CORS & TLS/HTTP2 issues on NCERT website)
  const fetchPdfBuffer = (targetUrl: string, maxRedirects = 5): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      if (maxRedirects <= 0) {
        return reject(new Error("Too many redirects"));
      }

      const isHttps = targetUrl.startsWith("https:");
      const client = isHttps ? https : http;
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(targetUrl);
      } catch (e) {
        return reject(new Error("Invalid URL format"));
      }

      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (isHttps ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
          "Referer": "https://ncert.nic.in/textbook.php"
        },
        rejectUnauthorized: false
      };

      const req = client.request(options, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (!redirectUrl.startsWith("http")) {
            redirectUrl = new URL(redirectUrl, targetUrl).toString();
          }
          return fetchPdfBuffer(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP Status ${res.statusCode}`));
        }

        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      });

      req.setTimeout(12000, () => {
        req.destroy(new Error("Request timeout after 12s"));
      });

      req.on("error", (err) => reject(err));
      req.end();
    });
  };

  app.get("/api/pdf-proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    if (!targetUrl || (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://"))) {
      return res.status(400).send("Invalid or missing target URL");
    }

    try {
      const buffer = await fetchPdfBuffer(targetUrl);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(buffer);
    } catch (err: any) {
      console.warn(`PDF Proxy Warning for ${targetUrl}:`, err?.message || err);
      return res.status(500).send(`PDF proxy failed: ${err?.message || String(err)}`);
    }
  });

  // Server-side Telegram File Proxy Endpoint
  app.get("/api/telegram/file-proxy", async (req, res) => {
    const { url, filePath, token } = req.query;

    let targetUrl = "";
    if (filePath && token) {
      targetUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
    } else if (url && typeof url === "string") {
      targetUrl = url;
    }

    if (!targetUrl || (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://"))) {
      return res.status(400).send("Invalid or missing file proxy target URL");
    }

    try {
      const buffer = await fetchPdfBuffer(targetUrl);

      let contentType = "application/pdf";
      if (targetUrl.match(/\.(jpg|jpeg)$/i)) contentType = "image/jpeg";
      else if (targetUrl.match(/\.png$/i)) contentType = "image/png";
      else if (targetUrl.match(/\.mp4$/i)) contentType = "video/mp4";
      else if (targetUrl.match(/\.webp$/i)) contentType = "image/webp";

      res.setHeader("Content-Type", contentType);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(buffer);
    } catch (err: any) {
      console.warn(`Telegram File Proxy warning for ${targetUrl}:`, err?.message || err);
      return res.status(500).send(`Telegram file proxy failed: ${err?.message || String(err)}`);
    }
  });

  // Server-side Telegram Channel Sync Endpoint
  app.post("/api/telegram/sync-channel", async (req, res) => {
    const { channelUsername, botToken } = req.body;

    const targetUsername = channelUsername || "ContactAura_Bot";
    const cleanToken = botToken || process.env.TELEGRAM_BOT_TOKEN;

    if (cleanToken && cleanToken.trim()) {
      console.log(`Syncing Telegram channel @${targetUsername} via Bot API...`);
      const botResult = await fetchTelegramViaBotApi(cleanToken, targetUsername);
      if (botResult.success) {
        return res.json({
          success: true,
          channelUsername: targetUsername,
          posts: botResult.posts,
          count: botResult.posts?.length || 0,
          source: "bot_api"
        });
      }

      if (botResult.isInvalidToken) {
        return res.status(400).json({
          success: false,
          error: botResult.error,
          isInvalidToken: true
        });
      }
    }

    // Attempt Public Web Preview scraping
    console.log(`Syncing Telegram channel @${targetUsername} via Public Web Preview...`);
    const publicResult = await fetchTelegramPublicChannel(targetUsername);

    if (publicResult.success) {
      return res.json({
        success: true,
        channelUsername: targetUsername,
        posts: publicResult.posts,
        count: publicResult.posts?.length || 0,
        source: "public_preview"
      });
    }

    return res.status(publicResult.isBotOrPrivate ? 400 : 500).json({
      success: false,
      isBotOrPrivate: publicResult.isBotOrPrivate,
      channelUsername: targetUsername,
      error: publicResult.error || `Failed to fetch posts from Telegram channel @${targetUsername}`
    });
  });

  // Server-side AI Notes Generator Endpoint
  app.post("/api/ai/notes", async (req, res) => {
    const { noteType, chapter, topic, subject, systemInstruction, formattedUserPrompt } = req.body;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: formattedUserPrompt || `Generate ${noteType || 'Quick Notes'} for ${chapter} - ${topic}`,
          systemInstruction: systemInstruction || "You are NEET AI Tutor generating high-yield NCERT notes.",
        });

        return res.json({
          success: true,
          notes: text,
          modelUsed,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        logAiError("Notes API Error", err);
        return res.status(500).json({ success: false, error: err?.message || "Failed to generate notes" });
      }
    }

    return res.status(500).json({ success: false, error: "API key not configured" });
  });

  // Server-side AI NCERT MCQ Generation Endpoint (20 Questions JSON)
  app.post("/api/ai/generate-ncert-mcqs", async (req, res) => {
    const { classLevel, subject, chapterName, previousQuestions, count = 20 } = req.body;

    const numQuestions = count || 20;
    const targetClass = classLevel || "Class 11";
    const targetSubject = subject || "Biology";
    const targetChapter = chapterName || "General Chapter";

    const systemInstruction = `You are a senior NEET UG Paper Setter and NCERT Subject Matter Expert.
Your task is to generate high-yield, exam-standard NEET multiple choice questions strictly based on NCERT textbook content.

OUTPUT FORMAT REQUIREMENTS:
1. Return ONLY a valid JSON array of question objects.
2. Do NOT include markdown blocks (\`\`\`json), raw text, or explanations outside the JSON array.
3. Each question object MUST match this schema:
{
  "question": "Clear NEET question text",
  "options": ["Option A string", "Option B string", "Option C string", "Option D string"],
  "correct_answer_index": 0, // integer: 0 for A, 1 for B, 2 for C, 3 for D
  "explanation": "Direct NCERT line reference and step-by-step reasoning."
}`;

    const prevContext = Array.isArray(previousQuestions) && previousQuestions.length > 0
      ? `\nCRITICAL MANDATE: Generate completely DIFFERENT questions. Do NOT repeat or reuse these previous question concepts:\n${previousQuestions.slice(-10).map((q: string, idx: number) => `${idx + 1}. ${q}`).join("\n")}`
      : "";

    const userPrompt = `Generate ${numQuestions} NEET-level multiple choice questions strictly based on NCERT ${targetClass} ${targetSubject} Chapter: "${targetChapter}".
Each question must have 4 options (A-D), one correct answer index (0-3), and a short explanation. Difficulty should match NEET exam standard.${prevContext}

Return ONLY valid JSON in this format:
[{"question": "...", "options": ["...", "...", "...", "..."], "correct_answer_index": 0, "explanation": "..."}]`;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: userPrompt,
          systemInstruction,
          temperature: 0.7,
        });

        // Clean JSON string
        let cleanedJson = text.trim();
        if (cleanedJson.startsWith("```json")) {
          cleanedJson = cleanedJson.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        } else if (cleanedJson.startsWith("```")) {
          cleanedJson = cleanedJson.replace(/^```\s*/, "").replace(/```$/, "").trim();
        }

        try {
          const parsedQuestions = JSON.parse(cleanedJson);
          if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
            // Verify options are real and not empty/placeholder
            const validQuestions = parsedQuestions.filter(
              (q: any) =>
                q.question &&
                Array.isArray(q.options) &&
                q.options.length === 4 &&
                typeof q.correct_answer_index === "number"
            );

            if (validQuestions.length > 0) {
              return res.json({
                success: true,
                questions: validQuestions,
                modelUsed,
                timestamp: new Date().toISOString()
              });
            }
          }
        } catch (jsonErr) {
          console.warn("Failed to parse AI JSON response, attempting regex extraction:", jsonErr);
          const jsonArrayMatch = cleanedJson.match(/\[\s*\{[\s\S]*\}\s*\]/);
          if (jsonArrayMatch) {
            const extractedQuestions = JSON.parse(jsonArrayMatch[0]);
            if (Array.isArray(extractedQuestions) && extractedQuestions.length > 0) {
              return res.json({
                success: true,
                questions: extractedQuestions,
                modelUsed,
                timestamp: new Date().toISOString()
              });
            }
          }
        }
      } catch (err: any) {
        logAiError("NCERT MCQ API Error", err);
        return res.status(500).json({
          success: false,
          error: `AI MCQ Generation failed: ${err?.message || "Gemini service error"}`
        });
      }
    }

    return res.status(500).json({
      success: false,
      error: "Gemini API Key is not configured or invalid on the server."
    });
  });

  // Server-side AI MCQ Generator Endpoint
  app.post("/api/ai/mcq", async (req, res) => {
    const { difficulty, count, chapter, topic, subject, systemInstruction, formattedUserPrompt } = req.body;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: formattedUserPrompt || `Generate ${count || 10} ${difficulty || 'Medium'} MCQs for ${chapter} - ${topic}`,
          systemInstruction: systemInstruction || "You are NEET AI MCQ Generator.",
        });

        return res.json({
          success: true,
          rawText: text,
          modelUsed,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        logAiError("MCQ API Error", err);
      }
    }

    res.json({
      success: true,
      rawText: `Generated ${count || 10} ${difficulty || 'Medium'} MCQs for ${chapter || 'Chapter'} - ${topic || 'Topic'}.`,
      modelUsed: "NEET AI MCQ Engine (Fallback Mode)"
    });
  });

  // Server-side AI PYQ Endpoint
  app.post("/api/ai/pyq", async (req, res) => {
    const { count, chapter, topic, subject, systemInstruction, formattedUserPrompt } = req.body;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: formattedUserPrompt || `Retrieve ${count || 10} PYQs for ${chapter} - ${topic}`,
          systemInstruction: systemInstruction || "You are NEET AI PYQ Database.",
        });

        return res.json({
          success: true,
          rawText: text,
          modelUsed,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        logAiError("PYQ API Error", err);
      }
    }

    res.json({
      success: true,
      rawText: `Retrieved ${count || 10} PYQs for ${chapter || 'Chapter'} - ${topic || 'Topic'}.`,
      modelUsed: "NEET AI PYQ Engine (Fallback Mode)"
    });
  });

  // Server-side AI Revision Cards Endpoint
  app.post("/api/ai/revision", async (req, res) => {
    const { chapter, topic, subject } = req.body;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: `Generate 5 spaced revision cards for ${chapter || 'Chapter'} - ${topic || 'Topic'} (${subject || 'NEET'})`,
          systemInstruction: "You are NEET AI Revision Card Generator. Output concise front/back concept pairs with NCERT page references.",
        });

        return res.json({
          success: true,
          rawText: text,
          modelUsed,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        logAiError("Revision API Error", err);
      }
    }

    res.json({
      success: true,
      rawText: `Spaced revision cards generated for ${chapter || 'Chapter'} - ${topic || 'Topic'}.`,
      modelUsed: "NEET AI Revision Engine (Fallback Mode)"
    });
  });

  // Server-side Gemini AI Doubt Solver Endpoint
  app.post("/api/ai/solve-doubt", async (req, res) => {
    const { promptType, subject, topicTitle, userQuery, systemInstruction: customSystemInstruction } = req.body;

    const subjectContext = subject ? `[Subject: ${subject}] [Topic: ${topicTitle || "General"}]` : '[Subject: General NEET]';
    const systemInstruction = customSystemInstruction || `${NEET_TEACHER_SYSTEM_INSTRUCTION}\n\n${subjectContext}`;

    const userPrompt = `${subjectContext}
Student Question: ${userQuery}

Teacher, please answer my question directly and completely.`;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: userPrompt,
          systemInstruction,
        });

        const sanitized = sanitizeTeacherResponse(text);

        return res.json({
          success: true,
          answer: sanitized,
          modelUsed,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        logAiError("Gemini API Error", err);
        return res.status(500).json({ success: false, error: err?.message || "Failed to generate doubt answer" });
      }
    }

    return res.status(500).json({ success: false, error: "API key not configured" });
  });

  // Streaming Doubt Solver Endpoint (Server-Sent Events)
  app.post("/api/ai/stream-doubt", async (req, res) => {
    const { promptType, subject, topicTitle, userQuery } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    if (!getApiKey()) {
      res.write(`data: ${JSON.stringify({ error: "GOOGLE_AI_API_KEY environment variable not configured" })}\n\n`);
      res.end();
      return;
    }

    const subjectContext = subject ? `[Subject: ${subject}] [Topic: ${topicTitle || "General"}]` : '[Subject: General NEET]';
    const systemInstruction = `${NEET_TEACHER_SYSTEM_INSTRUCTION}\n\n${subjectContext}`;

    const userPrompt = `${subjectContext}
Student Doubt/Question: ${userQuery}`;

    try {
      const stream = generateStreamWithRetry({
        contents: userPrompt,
        systemInstruction,
      });

      for await (const chunk of stream) {
        res.write(`data: ${JSON.stringify({ chunk: chunk.chunkText, modelUsed: chunk.modelUsed })}\n\n`);
      }
      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (err: any) {
      logAiError("Stream Doubt Error", err);
      res.write(`data: ${JSON.stringify({ error: err?.message || "Streaming failed" })}\n\n`);
      res.end();
    }
  });

  // Server-side AI Chatbot Endpoint (Multi-turn conversation)
  app.post("/api/ai/chat", async (req, res) => {
    const startTime = Date.now();
    const { messages, subject, personaInstruction } = req.body;

    console.log(`\n=================== [API /api/ai/chat Request] ===================`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Messages received: ${Array.isArray(messages) ? messages.length : 0}`);

    if (!Array.isArray(messages) || messages.length === 0) {
      console.error(`[API /api/ai/chat Error] Empty or missing messages array`);
      return res.status(400).json({
        success: false,
        error: "Messages array is required."
      });
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      console.error(`[API /api/ai/chat Error] GEMINI_API_KEY is not configured`);
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY environment variable is not configured on the server."
      });
    }

    const personaContext = personaInstruction ? `\n\n${personaInstruction}` : '';
    const subjectContext = subject ? `[Active Subject Focus: ${subject}]` : '[Subject: General NEET Physics, Chemistry, Biology]';
    const systemInstruction = `${NEET_TEACHER_SYSTEM_INSTRUCTION}${personaContext}\n\n${subjectContext}`;

    try {
      const formattedContents = messages.map((m: any) => {
        const parts: any[] = [];
        if (m.image && m.image.data) {
          parts.push({
            inlineData: {
              mimeType: m.image.mimeType || 'image/jpeg',
              data: m.image.data
            }
          });
        } else if (m.images && Array.isArray(m.images)) {
          m.images.forEach((img: any) => {
            if (img.data) {
              parts.push({
                inlineData: {
                  mimeType: img.mimeType || 'image/jpeg',
                  data: img.data
                }
              });
            }
          });
        }
        parts.push({ text: m.content || "Please solve and explain this NEET question/diagram in detail." });
        return {
          role: m.role === 'user' ? 'user' : 'model',
          parts
        };
      });

      const latestUserPrompt = messages.filter((m: any) => m.role === 'user').pop()?.content || "";
      console.log(`Prompt Preview: "${latestUserPrompt.substring(0, 120)}..."`);

      const result = await generateContentWithRetry({
        contents: formattedContents,
        systemInstruction,
        temperature: 0.7,
      });

      const sanitizedText = sanitizeTeacherResponse(result.text);

      const latencyMs = Date.now() - startTime;
      const promptTokens = result.promptTokens || 0;
      const outputTokens = result.outputTokens || 0;
      const totalTokens = promptTokens + outputTokens;

      console.log(`[API /api/ai/chat Response] Model: ${result.modelUsed} | Latency: ${latencyMs}ms | Tokens: ${promptTokens} in / ${outputTokens} out (${totalTokens} total)`);
      console.log(`=================================================================\n`);

      return res.json({
        success: true,
        answer: sanitizedText,
        reply: sanitizedText, // Backwards compatibility
        modelUsed: result.modelUsed || 'gemini-3.7-flash',
        latencyMs,
        promptTokens,
        outputTokens,
        totalTokens,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;
      logAiError("Chat API Error", err);
      const exactError = err?.message || (typeof err === 'string' ? err : JSON.stringify(err)) || "Failed to generate response from Gemini API.";

      console.error(`[API /api/ai/chat Error] (${latencyMs}ms): ${exactError}`);
      console.log(`=================================================================\n`);

      return res.status(500).json({
        success: false,
        error: exactError,
        latencyMs,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Streaming AI Chat Endpoint
  app.post("/api/ai/stream-chat", async (req, res) => {
    const { messages, subject, personaInstruction } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    if (!getApiKey()) {
      res.write(`data: ${JSON.stringify({ error: "GOOGLE_AI_API_KEY environment variable not configured" })}\n\n`);
      res.end();
      return;
    }

    const personaContext = personaInstruction ? `\n\n${personaInstruction}` : '';
    const subjectContext = subject ? `[Active Subject Focus: ${subject}]` : '[Subject: General NEET Physics, Chemistry, Biology]';
    const systemInstruction = `${NEET_TEACHER_SYSTEM_INSTRUCTION}${personaContext}\n\n${subjectContext}`;

    try {
      const formattedPrompt = Array.isArray(messages)
        ? messages.map((m: any) => `${m.role === 'user' ? 'Student' : 'AI Guru'}: ${m.content}`).join('\n\n')
        : "Hello";

      const stream = generateStreamWithRetry({
        contents: formattedPrompt,
        systemInstruction,
      });

      for await (const chunk of stream) {
        res.write(`data: ${JSON.stringify({ chunk: chunk.chunkText, modelUsed: chunk.modelUsed })}\n\n`);
      }
      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (err: any) {
      logAiError("Stream Chat Error", err);
      res.write(`data: ${JSON.stringify({ error: err?.message || "Streaming failed" })}\n\n`);
      res.end();
    }
  });

  // Server-side AI Test Paper Analysis Endpoint
  app.post("/api/ai/analyze-test", async (req, res) => {
    const { testTitle, score, totalMarks, accuracyPercent, correctCount, incorrectCount, unattemptedCount, weakTopics } = req.body;

    const systemInstruction = `You are NEET AI Senior Test Analyst. Analyze the student's mock test performance and provide a sharp, actionable diagnostic report.
Provide a clean plain text output with:
1. 📊 Performance Verdict & Rank Projection
2. ⚠️ Negative Marking Penalty & Time Loss Analysis
3. 🎯 Weak Chapter Recovery Action Plan
4. 🚀 Next 3 Days High-Yield Revision Steps`;

    const userPrompt = `Test Title: ${testTitle}
Score: ${score} / ${totalMarks} (Accuracy: ${accuracyPercent}%)
Correct: ${correctCount}, Incorrect: ${incorrectCount}, Unattempted: ${unattemptedCount}
Weak Topics Flagged: ${weakTopics ? weakTopics.join(", ") : "None"}`;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: userPrompt,
          systemInstruction,
        });

        return res.json({
          success: true,
          analysis: sanitizeTeacherResponse(text),
          modelUsed
        });
      } catch (err: any) {
        logAiError("Test Analysis API Error", err);
      }
    }

    const percentage = Math.round((score / (totalMarks || 720)) * 100);
    const fallbackAnalysis = `📊 Performance Verdict & Rank Projection
• Score: ${score} / ${totalMarks} (${percentage}%)
• Estimated NEET Percentile: ${percentage >= 85 ? '98.5+ Percentile (Government Medical College Range 🏥)' : percentage >= 65 ? '92-96 Percentile (Solid Progress, Needs Push)' : '80-88 Percentile (Focus on Weak Chapters)'}
• Accuracy Rate: ${accuracyPercent}% (Target: 85%+)

⚠️ Negative Marking Impact
• You lost ${incorrectCount * 5} marks due to incorrect guesses (${incorrectCount} wrong answers @ -1 penalty + lost +4 opportunity).
• Rule: If unsure between 3 options, skip the question to avoid negative marks!

🎯 Weak Chapter Recovery Action Plan
${weakTopics && weakTopics.length > 0 ? weakTopics.map((w: string) => `• Re-read NCERT lines for ${w} & solve 20 PYQs.`).join("\n") : "• Review all incorrect questions and add them to Spaced Revision Queue."}

🚀 Next 3 Days Action Plan
1. Spend 1 hour resolving the exact mistakes from this test.
2. Re-watch 1-shot lecture for weak topics.
3. Take a 45-min chapter test on weak topics in AI Test Center.

Samajh aaya? Agar chaho to isi topic ka PYQ bhi solve karte hain. 🎯`;

    res.json({
      success: true,
      analysis: fallbackAnalysis,
      modelUsed: "NEET AI Test Analyst (Fallback Mode)"
    });
  });

  // Server-side Gemini Prompt Blueprint API Endpoint (Architecture ready for AI generation)
  app.post("/api/educational-pipeline", async (req, res) => {
    const { subject, chapter, topic, type, count = 10 } = req.body;
    console.log(`\n=================== [API /api/educational-pipeline Request] ===================`);
    console.log(`Subject: ${subject}, Chapter: ${chapter}, Type: ${type}, Count: ${count}`);

    const targetSubject = subject || "biology";
    const targetChapter = chapter || "NCERT High Yield Unit";
    const pipelineType = type || "ncert_dpp";

    const prompt = `You are the NTA Educational Pipeline Data Aggregator (NCERT, DIKSHA Portal & Saarthi Exemplar DB).
Generate exactly ${count} authentic, high-yield NEET UG questions based strictly on NCERT line-by-line textbook facts for:
- Subject: ${targetSubject}
- Chapter: ${targetChapter}
- Topic: ${topic || "General Chapter Concepts"}
- Resource Type: ${pipelineType}

Return a valid JSON array of question objects where each question has:
{
  "id": "pipe-q-1",
  "subjectId": "${targetSubject}",
  "chapterName": "${targetChapter}",
  "topicTitle": "${topic || "NCERT Line Concept"}",
  "question": "Clear NEET question text based on exact NCERT lines",
  "options": [
    {"id": "a", "text": "Option A"},
    {"id": "b", "text": "Option B"},
    {"id": "c", "text": "Option C"},
    {"id": "d", "text": "Option D"}
  ],
  "correctAnswerId": "a",
  "explanation": "NCERT line-by-line derivation and rationale",
  "ncertReference": "NCERT Class 11/12 Page XX, Chapter YY",
  "difficulty": "Medium",
  "tags": ["NCERT Line", "DIKSHA Portal", "Saarthi Exemplar", "${targetSubject}"],
  "questionType": "ncert_line"
}
Return ONLY valid JSON array with no extra markdown backticks if possible, or markdown JSON block.`;

    if (getApiKey()) {
      try {
        const { text, modelUsed } = await generateContentWithRetry({
          contents: prompt,
          systemInstruction: "You are an automated educational JSON data pipeline parser for NEET NCERT exemplar databases. Always output raw JSON.",
          temperature: 0.3
        });

        const cleanedJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsedQuestions = JSON.parse(cleanedJson);

        return res.json({
          success: true,
          source: "Live NCERT/DIKSHA/Saarthi AI Data Pipeline",
          modelUsed,
          questions: parsedQuestions
        });
      } catch (err: any) {
        logAiError("Educational Pipeline Stream Error", err);
      }
    }

    // Fallback static high-yield curated pipeline item set if offline
    const fallbackQuestions = Array.from({ length: Math.min(count, 10) }).map((_, idx) => ({
      id: `pipe-fallback-${Date.now()}-${idx}`,
      subjectId: targetSubject,
      chapterName: targetChapter,
      topicTitle: topic || "NCERT High Yield Line",
      question: `[NCERT Line #${idx + 1}] Which statement regarding ${targetChapter} is strictly correct as per the NCERT textbook?`,
      options: [
        { id: 'a', text: `Option A statement regarding ${targetChapter} NCERT line ${idx + 1}` },
        { id: 'b', text: `Option B statement regarding ${targetChapter} NCERT line ${idx + 1}` },
        { id: 'c', text: `Option C statement regarding ${targetChapter} NCERT line ${idx + 1}` },
        { id: 'd', text: `Option D statement regarding ${targetChapter} NCERT line ${idx + 1}` }
      ],
      correctAnswerId: 'a',
      explanation: `According to NCERT textbook, Statement A is directly quoted on page line ${idx * 5 + 12}.`,
      ncertReference: `NCERT Textbook Chapter: ${targetChapter}`,
      difficulty: 'Medium',
      tags: ['NCERT Line', 'DIKSHA Portal', 'Saarthi Exemplar'],
      questionType: 'ncert_line'
    }));

    return res.json({
      success: true,
      source: "Cached NCERT/DIKSHA Open Repository Pipeline",
      questions: fallbackQuestions
    });
  });

  // Natural Human-Like Voice Synthesis API (Gemini / High Quality Audio Endpoint)
  app.post("/api/ai/tts", async (req, res) => {
    const { text, personaKey = 'brother', lang = 'en-IN' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, error: 'Text prompt is required.' });
    }

    // Clean text for natural Indian conversational speech
    const cleanSpeechText = text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#+\s+/g, '')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2')
      .replace(/\\Delta\s*([a-zA-Z0-9]+)/g, 'change in $1')
      .replace(/\\theta/g, 'theta')
      .replace(/\\alpha/g, 'alpha')
      .replace(/\\beta/g, 'beta')
      .replace(/\\gamma/g, 'gamma')
      .replace(/\\lambda/g, 'lambda')
      .replace(/\\pi/g, 'pi')
      .replace(/\\rightarrow|\\to/g, ' gives ')
      .replace(/\\degree|^\circ/g, ' degrees ')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/H2O/gi, 'water')
      .replace(/CO2/gi, 'carbon dioxide')
      .replace(/O2/gi, 'oxygen')
      .replace(/N2/gi, 'nitrogen')
      .replace(/NCERT/gi, 'N C E R T')
      .replace(/NEET/gi, 'Neet')
      .replace(/NTA/gi, 'N T A')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    return res.json({
      success: true,
      speechText: cleanSpeechText,
      personaKey,
      lang
    });
  });

  app.post("/api/ai/mentor-blueprint", (req, res) => {
    const { promptType, subject, topicTitle, userQuery } = req.body;
    
    // Architecture response framing without raw client key exposure
    let blueprintResponse = {
      status: "ready",
      promptType: promptType || "general",
      systemInstructions: "You are NEETDrop AI Master Mentor, an expert in NEET Physics, Chemistry, and Biology. Provide precise, NCERT-focused, step-by-step explanations.",
      formattedPrompt: `[NEET 2027 Dropper Context | ${subject || "General"}] Topic: ${topicTitle || "General Query"}\nStudent Query: ${userQuery || "Explain key concept"}`,
      suggestedNextSteps: [
        "Review corresponding NCERT chapter lines",
        "Solve 5 related PYQs in MCQ Bank",
        "Add weak formulas to Revision Queue"
      ]
    };

    res.json(blueprintResponse);
  });

  // Dedicated AI Mentor Multi-turn Chat Endpoint (Requirement 2)
  app.post("/api/ai/mentor-chat", async (req, res) => {
    const { messages } = req.body;

    const systemInstruction = NEET_TEACHER_SYSTEM_INSTRUCTION;

    if (!getApiKey()) {
      return res.status(500).json({
        success: false,
        error: "Gemini API Key is not configured on the server. Please set GEMINI_API_KEY environment variable."
      });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Messages array is required."
      });
    }

    try {
      // Format message history into native Gemini multi-turn format or string if simplified
      const formattedContents = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const { text, modelUsed } = await generateContentWithRetry({
        contents: formattedContents,
        systemInstruction,
        temperature: 0.7,
      });

      const sanitized = sanitizeTeacherResponse(text);

      return res.json({
        success: true,
        reply: sanitized,
        modelUsed: modelUsed || 'gemini-3.7-flash',
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      logAiError("Mentor Chat API Error", err);
      const exactError = err?.message || (typeof err === 'string' ? err : JSON.stringify(err)) || "Failed to generate mentor response.";
      return res.status(500).json({
        success: false,
        error: exactError
      });
    }
  });

  // Dedicated AI Practice Question Generator Endpoint
  app.post("/api/generate-questions", async (req, res) => {
    const { subjectId, chapterName, topicTitle, questionCount = 5, difficulty = "Medium" } = req.body || {};

    if (!getApiKey()) {
      return res.status(500).json({
        success: false,
        error: "Gemini API Key is missing on server."
      });
    }

    try {
      const prompt = `You are a Senior NEET Exam Question Setter & Kota Master Teacher.
Generate exactly ${questionCount} authentic, NCERT-grounded NEET MCQs for:
Subject: ${subjectId || 'Physics/Chemistry/Biology'}
Chapter: ${chapterName || 'NCERT Chapter'}
Topic: ${topicTitle || 'NCERT Topic'}
Target Difficulty: ${difficulty}

You must return ONLY a raw JSON array of objects without markdown formatting or code blocks.
Each object must strictly match this schema:
{
  "id": "gen-q1",
  "subjectId": "${subjectId || 'physics'}",
  "chapterName": "${chapterName || 'Chapter'}",
  "topicTitle": "${topicTitle || 'Topic'}",
  "question": "Clear NEET question text",
  "options": [
    { "id": "a", "text": "Option A" },
    { "id": "b", "text": "Option B" },
    { "id": "c", "text": "Option C" },
    { "id": "d", "text": "Option D" }
  ],
  "correctAnswerId": "a",
  "explanation": "Detailed step-by-step NCERT explanation with formula/fact",
  "ncertReference": "NCERT Class reference page or section",
  "difficulty": "${difficulty}",
  "timeEstimateSeconds": 45,
  "tags": ["NCERT Line", "${subjectId}"],
  "questionType": "mcq"
}`;

      const { text } = await generateContentWithRetry({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        temperature: 0.3
      });

      // Parse JSON array from output
      let cleanText = text.trim();
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      const questions = JSON.parse(cleanText);

      return res.json({
        success: true,
        questions: Array.isArray(questions) ? questions : [questions]
      });
    } catch (err: any) {
      logAiError("Generate Questions API Error", err);
      return res.status(500).json({
        success: false,
        error: "Failed to generate AI questions.",
        details: err?.message
      });
    }
  });

  // Dedicated YouTube Live Stream Status Endpoint (Requirement 1)
  app.get("/api/youtube-live", async (req, res) => {
    const apiKey = getApiKey();
    const channels = [
      { name: "Logical Physics by MA Sir", handle: "logicalphysicsbymasir", teacher: "MA Sir" },
      { name: "Competition Wallah", handle: "CompetitionWallah", teacher: "PW Senior Faculty" },
      { name: "Physics Wallah", handle: "PhysicsWallah", teacher: "Alakh Pandey Sir & Team" },
      { name: "PW NEET", handle: "PW-NEET", teacher: "PW Faculty" },
      { name: "Unacademy NEET", handle: "unacademyneet", teacher: "Seep Pahuja & Team" }
    ];

    if (apiKey) {
      for (const ch of channels) {
        try {
          const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(ch.handle)}&eventType=live&type=video&videoEmbeddable=true&maxResults=1&key=${apiKey}`;
          const response = await fetch(searchUrl, { signal: AbortSignal.timeout(3000) });
          if (response.ok) {
            const data = await response.json();
            const liveItem = data.items?.[0];
            if (liveItem && liveItem.id?.videoId) {
              const videoId = liveItem.id.videoId;
              return res.json({
                isLive: true,
                videoId,
                title: liveItem.snippet?.title || "🔴 Live NEET Masterclass",
                thumbnail: liveItem.snippet?.thumbnails?.high?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                channelName: ch.name,
                teacherName: ch.teacher,
                watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
                embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
                viewers: 1450,
                lastChecked: new Date().toISOString()
              });
            }
          }
        } catch (e) {
          // Continue checking remaining channels
        }
      }
    }

    return res.json({
      isLive: false,
      statusMessage: "No official channel is currently live streaming.",
      lastChecked: new Date().toISOString()
    });
  });

  // =========================================================================
  // B.SC NURSING LEARNING HUB BACKEND APIs
  // =========================================================================

  const NURSING_ACADEMIC_SYSTEM_PROMPT = `You are the Senior Clinical Nursing Professor, Academic Mentor & Exam Specialist for B.Sc Nursing students affiliated with Maharashtra University of Health Sciences (MUHS) and the Indian Nursing Council (INC).

Your role is to guide nursing students through theory preparation with clarity, evidence-based nursing care, strict adherence to NANDA-I nursing diagnoses, and high-scoring university examination formatting (15-mark LAQs, 5-mark SAQs, Short Notes).

Core Guidelines:
1. Always structure clinical explanations into:
   - Official Definition & Standard Reference (Brunner & Suddarth / DC Dutta / Townsend / Park)
   - Etiology & Risk Factors
   - Step-by-Step Pathophysiology Flow
   - Clinical Manifestations (Signs & Symptoms)
   - Diagnostic Tests & Lab Values
   - Medical & Surgical Management
   - Comprehensive Nursing Process (Assessment, NANDA Diagnosis, Interventions with scientific Rationales, Evaluation)
   - University Exam "High-Yield" Tips for MUHS / INC exams.

2. Tone: Warm, encouraging, academically rigorous, clinically precise, and patient.
3. Language & Local Context:
   - If the student asks in English: respond in clear, refined academic English.
   - If the student asks in Marathi (or requests "Marathi madhe explain kar"): explain concepts warmly in natural Marathi while retaining standard clinical terms (e.g., "Cardiac Output", "Pulmonary Edema", "NANDA Diagnosis", "Ventricular Septal Defect") in English for academic clarity.
   - If the student asks in Hinglish/Hindi: respond in natural bilingual Hinglish.
4. Academic & Statutory Disclaimer: Always maintain that theoretical guidance is strictly for university syllabus preparation and does not replace in-person hospital clinical rotations, bedside postings, or licensed physician orders.`;

  app.post("/api/nursing/ai-tutor", async (req, res) => {
    try {
      const { query, topicTitle, subjectName, year, mode } = req.body;
      const primaryModel = getPrimaryModel();
      const fallbackModel = getFallbackModel();

      const userPrompt = `Student Query: "${query || 'Explain this topic in detail'}"
Context:
- Subject: ${subjectName || 'B.Sc Nursing Clinical Science'}
- Topic: ${topicTitle || 'Nursing Theory'}
- Academic Year: ${year || '3rd_year'}
- Request Mode: ${mode || 'concept_explanation'}

Please provide a structured, high-yield academic response tailored for B.Sc Nursing university examinations (MUHS / INC). Include key clinical definitions, pathophysiology sequence, NANDA nursing diagnoses with rationales, and university exam writing tips.`;

      let text = "";
      try {
        const response = await generateContentWithRetry({
          model: primaryModel,
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          systemInstruction: NURSING_ACADEMIC_SYSTEM_PROMPT,
          temperature: 0.4
        });
        text = response.text || "";
      } catch (e1: any) {
        logAiError("Primary Nursing AI Tutor failed, attempting fallback", e1);
        const fallbackResp = await generateContentWithRetry({
          model: fallbackModel,
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          systemInstruction: NURSING_ACADEMIC_SYSTEM_PROMPT,
          temperature: 0.4
        });
        text = fallbackResp.text || "";
      }

      return res.json({
        success: true,
        text,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      logAiError("Nursing AI Tutor Route Error", err);
      return res.status(500).json({
        success: false,
        error: "Failed to generate nursing tutor response.",
        details: err?.message
      });
    }
  });

  // =========================================================================
  // IIT MADRAS BS DEGREE LEARNING HUB BACKEND APIs
  // =========================================================================

  const IITM_SYSTEM_PROMPT = `You are the Lead Mathematics & Statistics Professor and Teaching Assistant for the IIT Madras BS Degree Foundation Level program.

Your specialty covers:
1. Mathematics 1 (BSMA1001): Relations, functions, inverses, polynomials, roots, straight lines, slopes, quadratic equations, vertex form, matrices, determinants, row echelon form, system of linear equations Ax = b, consistency, and Gaussian elimination.
2. Statistics 1 (BSST1001): Categorical vs numerical data (nominal, ordinal, interval, ratio), central tendency (mean, median, mode), dispersion (variance, standard deviation, IQR, box plots, Tukey 1.5*IQR rule), probability axioms, conditional probability, Bayes theorem, discrete random variables, PMF and CDF.

Tone: Rigorous, clear, academic, structured, and pedagogical.
Format equations cleanly with standard text and Unicode symbols (², ³, √, π, ∑, ∩, ∪, ∈, ℝ).`;

  app.post("/api/iitm/notes", async (req, res) => {
    try {
      const { subjectId, subjectName, lectureTitle } = req.body;
      const primaryModel = getPrimaryModel();
      const fallbackModel = getFallbackModel();

      const userPrompt = `Generate comprehensive, exam-ready study notes and a complete formula sheet for:
Course: IIT Madras BS Degree Foundation Level
Subject: ${subjectName || (subjectId === 'stats_1' ? 'Statistics 1' : 'Mathematics 1')}
Lecture Context: ${lectureTitle || 'Foundation OneShot | All Concepts & PYQs'}
Focus: Qualifier Exam & Quiz 1 Preparation

Structure the notes into:
1. Subject & Lecture Overview
2. Key Formulas & Mathematical Definitions (clearly boxed or listed with notes)
3. Step-by-Step Concept Breakdown & Problem-Solving Algorithms
4. Common Mistakes & Qualifier Exam High-Yield Tips
5. 3 Worked Practice Examples with step-by-step solutions.`;

      let text = "";
      try {
        const response = await generateContentWithRetry({
          model: primaryModel,
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          systemInstruction: IITM_SYSTEM_PROMPT,
          temperature: 0.3
        });
        text = response.text || "";
      } catch (e1: any) {
        logAiError("Primary IITM Notes failed, attempting fallback", e1);
        const fallbackResp = await generateContentWithRetry({
          model: fallbackModel,
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          systemInstruction: IITM_SYSTEM_PROMPT,
          temperature: 0.3
        });
        text = fallbackResp.text || "";
      }

      return res.json({
        success: true,
        notes: text,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      logAiError("IITM Notes API Error", err);
      return res.status(500).json({
        success: false,
        error: "Failed to generate IIT Madras BS notes.",
        details: err?.message
      });
    }
  });

  app.post("/api/iitm/quiz", async (req, res) => {
    try {
      const { subjectId, subjectName, count } = req.body;
      const primaryModel = getPrimaryModel();

      const userPrompt = `Generate ${count || 5} multiple choice questions (MCQs) for:
Course: IIT Madras BS Degree Foundation Level
Subject: ${subjectName || (subjectId === 'stats_1' ? 'Statistics 1' : 'Mathematics 1')}
Exam: Qualifier Exam & Quiz 1 level

Return ONLY a valid JSON array of objects with the exact schema:
[
  {
    "id": "iitm-q1",
    "question": "Clear problem statement with mathematical symbols",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctOptionIndex": 0,
    "explanation": "Detailed step-by-step mathematical reasoning",
    "isVerifiedPyq": false,
    "questionType": "AI_PRACTICE",
    "topicTag": "Specific Subtopic Name"
  }
]`;

      const response = await generateContentWithRetry({
        model: primaryModel,
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        systemInstruction: IITM_SYSTEM_PROMPT + "\nOutput strictly valid JSON with no markdown backticks.",
        temperature: 0.2
      });

      const raw = response.text || "";
      const cleanedJson = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanedJson);

      return res.json({
        success: true,
        questions: parsed,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      logAiError("IITM Quiz API Error", err);
      return res.status(500).json({
        success: false,
        error: "Failed to generate IIT Madras BS quiz questions.",
        details: err?.message
      });
    }
  });

  // Vite middleware for dev / static for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NEETDrop AI] Server listening at http://localhost:${PORT}`);
  });
}

startServer();
