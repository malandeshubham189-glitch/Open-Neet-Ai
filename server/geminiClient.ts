import { GoogleGenAI, GenerateContentParameters, GenerateContentResponse, Modality } from "@google/genai";

/**
 * Environment Variables helper for Gemini AI Configuration (Server-Side Only)
 */
export function getApiKey(): string {
  if (typeof process !== "undefined" && process.env) {
    const geminiKey = process.env.GEMINI_API_KEY || "";
    const googleKey = process.env.GOOGLE_AI_API_KEY || "";
    const envApiKey = process.env.API_KEY || "";

    // Prioritize key with valid length (> 15) and non-placeholder content
    const candidate = [geminiKey, googleKey, envApiKey].find(
      (k) => k && k.length > 15 && !k.includes("MY_GEMINI_API_KEY") && !k.includes("YOUR_API_KEY")
    ) || geminiKey || googleKey || envApiKey;

    if (!candidate || candidate.includes("MY_GEMINI_API_KEY") || candidate.includes("YOUR_API_KEY") || candidate.length < 15) {
      return "";
    }
    return candidate;
  }
  return "";
}

// Model cooldown tracking (for temporary 429 Quota Exceeded conditions)
const modelCooldowns = new Map<string, number>();

export function markModelCooldown(model: string, cooldownDurationMs: number = 300000) {
  modelCooldowns.set(model, Date.now() + cooldownDurationMs);
  // gemini-flash-latest aliases to gemini-3.7-flash, so cooldown both together
  if (model.includes("3.7") || model.includes("flash-latest")) {
    modelCooldowns.set("gemini-3.7-flash", Date.now() + cooldownDurationMs);
    modelCooldowns.set("gemini-flash-latest", Date.now() + cooldownDurationMs);
  }
}

export function isModelInCooldown(model: string): boolean {
  const until = modelCooldowns.get(model);
  if (!until) return false;
  if (Date.now() > until) {
    modelCooldowns.delete(model);
    return false;
  }
  return true;
}

export function getAvailableModelsList(preferredModel?: string): string[] {
  const primary = preferredModel || getPrimaryModel();
  
  const allCandidates = [
    primary,
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
    "gemini-3.7-flash"
  ].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

  // Exclude cooling models completely from trial if non-cooling models exist
  const ready = allCandidates.filter((m) => !isModelInCooldown(m));
  if (ready.length > 0) {
    return ready;
  }
  return allCandidates;
}

export function getPrimaryModel(): string {
  if (typeof process !== "undefined" && process.env && process.env.GEMINI_MODEL) {
    const envModel = process.env.GEMINI_MODEL.trim();
    if (envModel.startsWith("gemini-") || envModel.startsWith("models/gemini-")) {
      return envModel;
    }
  }
  return "gemini-3.1-flash-lite";
}

export function getFallbackModel(): string {
  if (typeof process !== "undefined" && process.env && process.env.GEMINI_FALLBACK_MODEL) {
    const envModel = process.env.GEMINI_FALLBACK_MODEL.trim();
    if (envModel.startsWith("gemini-") || envModel.startsWith("models/gemini-")) {
      return envModel;
    }
  }
  return "gemini-3.1-flash-lite";
}

// Token usage metrics store (Server Memory)
export interface TokenUsageMetric {
  promptTokens: number;
  responseTokens: number;
  totalTokens: number;
  model: string;
  timestamp: string;
}

const tokenUsageLog: TokenUsageMetric[] = [];

export function recordTokenUsage(metric: TokenUsageMetric) {
  tokenUsageLog.push(metric);
  if (tokenUsageLog.length > 500) {
    tokenUsageLog.shift();
  }
}

export function getTokenUsageLog(): TokenUsageMetric[] {
  return [...tokenUsageLog];
}

let aiInstance: GoogleGenAI | null = null;
let lastUsedApiKey = "";

/**
 * Lazy initialization of Google AI SDK instance (Server-Side Only)
 */
export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }
  if (!aiInstance || lastUsedApiKey !== apiKey) {
    lastUsedApiKey = apiKey;
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build-server",
        },
      },
    });
  }
  return aiInstance;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Gemini SDK request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export interface GeminiGenerateOptions {
  contents: GenerateContentParameters["contents"];
  systemInstruction?: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  model?: string;
  maxRetries?: number;
  timeoutMs?: number;
  tools?: any[];
}

/**
 * Generate content with retry logic, rate-limit handling, model fallback, detailed telemetry, and timeout control.
 */
export async function generateContentWithRetry(
  options: GeminiGenerateOptions
): Promise<{
  text: string;
  modelUsed: string;
  functionCalls?: any[];
  usage?: any;
  latencyMs: number;
  promptTokens: number;
  outputTokens: number;
}> {
  const client = getGeminiClient();
  if (!client) {
    throw new Error("GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is not configured on the server.");
  }

  const modelsToTry = getAvailableModelsList(options.model);
  const maxRetries = options.maxRetries ?? 2;
  const timeoutMs = options.timeoutMs ?? 45000;

  let lastError: any = null;

  for (const currentModel of modelsToTry) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const startTime = Date.now();
      try {
        const reqPromise = client.models.generateContent({
          model: currentModel,
          contents: options.contents,
          config: {
            systemInstruction: options.systemInstruction,
            temperature: options.temperature,
            topP: options.topP,
            topK: options.topK,
            ...(options.tools && options.tools.length > 0 ? { tools: options.tools } : {}),
          },
        });

        const response: GenerateContentResponse = await withTimeout(reqPromise, timeoutMs);
        const latencyMs = Date.now() - startTime;

        const promptTokens = response.usageMetadata?.promptTokenCount || 0;
        const outputTokens = response.usageMetadata?.candidatesTokenCount || 0;
        const totalTokens = response.usageMetadata?.totalTokenCount || (promptTokens + outputTokens);

        recordTokenUsage({
          promptTokens,
          responseTokens: outputTokens,
          totalTokens,
          model: currentModel,
          timestamp: new Date().toISOString()
        });

        const text = response.text || "";
        const functionCalls = response.functionCalls || [];

        console.log(`[Gemini SDK Telemetry] Model: ${currentModel} | Latency: ${latencyMs}ms | Tokens: ${promptTokens} prompt + ${outputTokens} output = ${totalTokens} total`);

        return {
          text,
          modelUsed: currentModel,
          functionCalls,
          usage: response.usageMetadata,
          latencyMs,
          promptTokens,
          outputTokens
        };
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isQuotaExceeded = errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.toLowerCase().includes("quota");
        const isNotFound = errMsg.includes("404") || errMsg.includes("NOT_FOUND") || errMsg.toLowerCase().includes("no longer available") || errMsg.toLowerCase().includes("not found");
        const isTimeout = errMsg.toLowerCase().includes("timed out") || errMsg.toLowerCase().includes("timeout");
        const isUnavailableOrBusy = errMsg.includes("503") || errMsg.includes("UNAVAILABLE") || errMsg.toLowerCase().includes("high demand") || errMsg.toLowerCase().includes("overloaded");

        console.warn(
          `[Gemini SDK ${isQuotaExceeded ? 'QuotaExceeded' : isNotFound ? 'NotFound' : isTimeout ? 'Timeout' : isUnavailableOrBusy ? 'HighDemand503' : 'Error'}] Attempt ${attempt}/${maxRetries} on model "${currentModel}" failed: ${errMsg}`
        );

        if (isQuotaExceeded) {
          markModelCooldown(currentModel, 60000);
        }

        if (isQuotaExceeded || isNotFound || isTimeout || isUnavailableOrBusy) {
          // Immediately skip remaining retries for this busy/rate-limited model and switch to next candidate model
          const reason = isTimeout ? 'Request Timeout' : isNotFound ? '404 Not Found' : isUnavailableOrBusy ? '503 High Demand' : 'Quota Exceeded';
          console.warn(`[Gemini Fallback] Fast-switching from ${currentModel} to next candidate model (${reason})...`);
          break;
        }

        if (attempt < maxRetries) {
          await delay(attempt * 800);
        }
      }
    }
  }

  throw lastError || new Error("Failed to generate response after retries across fallback models.");
}

/**
 * Stream content chunks with retry logic, timeout, and fallback model switching
 */
export async function* generateStreamWithRetry(
  options: GeminiGenerateOptions
): AsyncGenerator<{ chunkText: string; modelUsed: string; functionCalls?: any[] }, void, unknown> {
  const client = getGeminiClient();
  if (!client) {
    throw new Error("GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is not configured on the server.");
  }

  const modelsToTry = getAvailableModelsList(options.model);
  const maxRetries = options.maxRetries ?? 2;
  const timeoutMs = options.timeoutMs ?? 45000;

  let lastError: any = null;

  for (const currentModel of modelsToTry) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const streamPromise = client.models.generateContentStream({
          model: currentModel,
          contents: options.contents,
          config: {
            systemInstruction: options.systemInstruction,
            temperature: options.temperature,
            topP: options.topP,
            topK: options.topK,
            ...(options.tools && options.tools.length > 0 ? { tools: options.tools } : {}),
          },
        });

        const responseStream = await withTimeout(streamPromise, timeoutMs);

        for await (const chunk of responseStream) {
          const chunkText = chunk.text || "";
          const functionCalls = chunk.functionCalls || [];
          if (chunkText || functionCalls.length > 0) {
            yield { chunkText, modelUsed: currentModel, functionCalls };
          }
        }
        return;
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isQuotaExceeded = errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.toLowerCase().includes("quota");
        const isNotFound = errMsg.includes("404") || errMsg.includes("NOT_FOUND") || errMsg.toLowerCase().includes("no longer available") || errMsg.toLowerCase().includes("not found");
        const isTimeout = errMsg.toLowerCase().includes("timed out") || errMsg.toLowerCase().includes("timeout");
        const isUnavailableOrBusy = errMsg.includes("503") || errMsg.includes("UNAVAILABLE") || errMsg.toLowerCase().includes("high demand") || errMsg.toLowerCase().includes("overloaded");

        console.warn(
          `[Gemini Stream ${isQuotaExceeded ? 'QuotaExceeded' : isNotFound ? 'NotFound' : isTimeout ? 'Timeout' : isUnavailableOrBusy ? 'HighDemand503' : 'Error'}] Attempt ${attempt}/${maxRetries} failed on model "${currentModel}": ${errMsg}`
        );

        if (isQuotaExceeded) {
          markModelCooldown(currentModel, 60000);
        }

        if (isQuotaExceeded || isNotFound || isTimeout || isUnavailableOrBusy) {
          const reason = isTimeout ? 'Request Timeout' : isNotFound ? '404 Not Found' : isUnavailableOrBusy ? '503 High Demand' : 'Quota Exceeded';
          console.warn(`[Gemini Stream Fallback] Fast-switching from ${currentModel} to next candidate model (${reason})...`);
          break;
        }

        if (attempt < maxRetries) {
          await delay(attempt * 800);
        }
      }
    }
  }

  throw lastError || new Error("Failed to stream response after retries.");
}

/**
 * Converts raw PCM audio buffer to a standard WAV audio Buffer
 */
export function pcmToWavBuffer(
  pcmBuffer: Buffer,
  sampleRate = 24000,
  numChannels = 1,
  bitDepth = 16
): Buffer {
  const byteRate = (sampleRate * numChannels * bitDepth) / 8;
  const blockAlign = (numChannels * bitDepth) / 8;
  const dataSize = pcmBuffer.length;
  const chunkSize = 36 + dataSize;

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(chunkSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // 1 = Linear PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

/**
 * High Definition Text-to-Speech using Gemini 3.1 Flash TTS Model
 */
export async function generateGeminiTTS(
  text: string,
  persona: string = "brother",
  customVoice?: string
): Promise<{
  audioBase64: string;
  mimeType: string;
  voiceUsed: string;
  modelUsed: string;
}> {
  const client = getGeminiClient();
  if (!client) {
    throw new Error("Gemini API Key is not configured on the server.");
  }

  // Prebuilt voices supported by gemini-3.1-flash-tts-preview:
  // 'Fenrir' (Deep, mature, authoritative & warm educator), 'Puck' (Warm, engaging male),
  // 'Charon' (Deep narrator), 'Zephyr' (Crisp, articulate male), 'Kore' (Female)
  const voiceMapping: Record<string, string> = {
    brother: "Fenrir",
    teacher: "Fenrir",
    mentor: "Fenrir",
    narrator: "Charon",
    puck: "Puck",
    fenrir: "Fenrir",
    zephyr: "Zephyr",
    charon: "Charon",
    sister: "Kore"
  };

  const selectedVoice = customVoice || voiceMapping[persona?.toLowerCase()] || "Fenrir";
  const modelName = "gemini-3.1-flash-tts-preview";

  const cleanPrompt = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*`_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const response = await client.models.generateContent({
    model: modelName,
    contents: [
      {
        parts: [
          {
            text: `Speak in a calm, mature, warm, highly articulative educator voice with natural cadence, clear pronunciation of scientific terms, and supportive teacher tone: ${cleanPrompt}`
          }
        ]
      }
    ],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: selectedVoice
          }
        }
      }
    }
  });

  const part = response.candidates?.[0]?.content?.parts?.[0];
  const rawBase64 = part?.inlineData?.data;
  const returnedMime = part?.inlineData?.mimeType || "audio/pcm;rate=24000";

  if (!rawBase64) {
    throw new Error("Gemini TTS response did not contain audio data.");
  }

  // If the model returned PCM, package it into a valid WAV audio buffer for browser playback
  if (returnedMime.includes("pcm") || returnedMime.includes("rate=24000") || !returnedMime.includes("wav")) {
    const rawBuffer = Buffer.from(rawBase64, "base64");
    const wavBuffer = pcmToWavBuffer(rawBuffer, 24000, 1, 16);
    return {
      audioBase64: wavBuffer.toString("base64"),
      mimeType: "audio/wav",
      voiceUsed: selectedVoice,
      modelUsed: modelName
    };
  }

  return {
    audioBase64: rawBase64,
    mimeType: returnedMime,
    voiceUsed: selectedVoice,
    modelUsed: modelName
  };
}

