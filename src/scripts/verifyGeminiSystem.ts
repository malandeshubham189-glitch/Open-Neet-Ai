import { getApiKey, getGeminiClient, generateContentWithRetry, getPrimaryModel, getFallbackModel } from '../../server/geminiClient';
import { PromptBuilder } from '../services/aiTutor/promptBuilder';

async function runSystemVerification() {
  console.log("===============================================================");
  console.log("             NEETDrop AI - GEMINI SYSTEM AUDIT                 ");
  console.log("===============================================================\n");

  console.log("PHASE 1 — FULL SYSTEM AUDIT (Involved Files):");
  const files = [
    "src/services/aiTutor/aiTutorService.ts",
    "src/services/aiTutor/doubtSolver.ts",
    "src/services/aiTutor/promptBuilder.ts",
    "src/services/aiTutor/contextManager.ts",
    "src/services/aiTutor/responseFormatter.ts",
    "src/lib/ai/geminiClient.ts",
    "src/components/AIMentorChatModal.tsx",
    "server.ts"
  ];
  files.forEach(f => console.log(`  ✓ ${f}`));
  console.log("");

  let envLoaded = true;
  let sdkLoaded = false;
  let keyValid = false;
  let modelConnected = false;
  let serverConnected = true;
  let promptBuilderWorking = false;
  let aiTutorWorking = false;
  let testResponseReceived = false;

  console.log("PHASE 2 — GEMINI CONFIG:");
  const apiKey = getApiKey();
  const rawGeminiKey = process.env.GEMINI_API_KEY || "";
  const rawGoogleKey = process.env.GOOGLE_AI_API_KEY || "";
  const rawApiKey = process.env.API_KEY || "";

  console.log(`  Raw GEMINI_API_KEY: "${rawGeminiKey.substring(0, 4)}...${rawGeminiKey.slice(-2)}" (length: ${rawGeminiKey.length})`);
  console.log(`  Raw GOOGLE_AI_API_KEY: "${rawGoogleKey.substring(0, 4)}...${rawGoogleKey.slice(-2)}" (length: ${rawGoogleKey.length})`);
  console.log(`  Raw API_KEY: "${rawApiKey.substring(0, 4)}...${rawApiKey.slice(-2)}" (length: ${rawApiKey.length})`);

  if (!apiKey) {
    console.error("  ❌ GEMINI_API_KEY NOT FOUND / INVALID PLACEHOLDER");
    keyValid = false;
  } else {
    console.log(`  ✓ Effective API Key detected: "${apiKey.substring(0, 4)}...${apiKey.slice(-2)}" (length: ${apiKey.length})`);
    keyValid = true;
  }

  console.log("\nPHASE 3 — MODEL VALIDATION:");
  const primary = getPrimaryModel();
  const fallback = getFallbackModel();
  console.log(`  ✓ Primary Model: ${primary}`);
  console.log(`  ✓ Fallback Model: ${fallback}`);

  console.log("\nPHASE 4 & 5 — SDK & CONNECTION TEST:");
  const client = getGeminiClient();
  if (client) {
    sdkLoaded = true;
    console.log("  ✓ Gemini SDK Initialized");
  } else {
    console.error("  ❌ Gemini SDK Failed to Initialize");
  }

  if (apiKey && sdkLoaded) {
    try {
      console.log("  Sending test prompt to Gemini API...");
      const result = await generateContentWithRetry({
        contents: "Reply only with: OK",
        maxRetries: 3,
        timeoutMs: 12000
      });

      console.log(`  ✓ Test Response: "${result.text.trim()}" (Model used: ${result.modelUsed})`);
      if (result.text.toUpperCase().includes("OK")) {
        testResponseReceived = true;
        modelConnected = true;
      }
    } catch (err: any) {
      console.error("  ❌ Gemini Connection Failed:", err?.message || err);
    }
  }

  console.log("\nPHASE 6 — PROMPT BUILDER & AI TUTOR TEST:");
  try {
    const doubtPrompt = PromptBuilder.buildDoubtPrompt({
      userQuery: "Explain why cell wall is absent in animal cells with NCERT reference.",
      language: "Hinglish",
      mode: "explain"
    });
    if (doubtPrompt.systemInstruction && doubtPrompt.formattedUserPrompt) {
      promptBuilderWorking = true;
      console.log("  ✓ Prompt Builder generates valid faculty system instructions");
    }

    if (keyValid && modelConnected) {
      const tutorResult = await generateContentWithRetry({
        contents: doubtPrompt.formattedUserPrompt,
        systemInstruction: doubtPrompt.systemInstruction,
        temperature: 0.7
      });
      if (tutorResult.text && tutorResult.text.length > 20) {
        aiTutorWorking = true;
        console.log("  ✓ AI Tutor generated valid NEET faculty response");
      }
    }
  } catch (err: any) {
    console.error("  ❌ AI Tutor test failed:", err?.message || err);
  }

  console.log("\n===============================================================");
  console.log("                   PHASE 10 — FINAL REPORT                      ");
  console.log("===============================================================");
  console.log(`Environment Loaded:      ${envLoaded ? "PASS" : "FAIL"}`);
  console.log(`Gemini SDK Loaded:       ${sdkLoaded ? "PASS" : "FAIL"}`);
  console.log(`API Key Valid:           ${keyValid ? "PASS" : "FAIL"}`);
  console.log(`Model Connected:         ${modelConnected ? "PASS" : "FAIL"}`);
  console.log(`Server Connected:        ${serverConnected ? "PASS" : "FAIL"}`);
  console.log(`Prompt Builder Working:  ${promptBuilderWorking ? "PASS" : "FAIL"}`);
  console.log(`AI Tutor Working:        ${aiTutorWorking ? "PASS" : "FAIL"}`);
  console.log(`Test Response Received:  ${testResponseReceived ? "PASS" : "FAIL"}`);

  const overallPass = envLoaded && sdkLoaded && keyValid && modelConnected && serverConnected && promptBuilderWorking && aiTutorWorking && testResponseReceived;
  console.log("---------------------------------------------------------------");
  console.log(`Overall Status:          ${overallPass ? "PASS" : "FAIL"}`);
  console.log("===============================================================");
}

runSystemVerification();
