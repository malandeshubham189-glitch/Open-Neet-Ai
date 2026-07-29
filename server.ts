import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      appName: "NEETDrop AI",
      timestamp: new Date().toISOString(),
      geminiConfigured: !!process.env.GEMINI_API_KEY,
    });
  });

  // Server-side Gemini AI Doubt Solver Endpoint
  app.post("/api/ai/solve-doubt", async (req, res) => {
    const { promptType, subject, topicTitle, userQuery } = req.body;
    const client = getGeminiClient();

    const currentSubject = (subject || "General NEET").toLowerCase();
    const isBio = currentSubject.includes("bio") || currentSubject.includes("botany") || currentSubject.includes("zoology");
    const isPhysics = currentSubject.includes("physic");
    const isChem = currentSubject.includes("chem");

    let subjectRule = "";
    if (isBio) {
      subjectRule = "CRITICAL RULE FOR BIOLOGY: Stick 100% strictly to Class 11 & Class 12 NCERT Biology textbook lines, terminology, diagrams, and processes. DO NOT include any Physics formulas (e.g. F=ma, V=IR) or Chemistry equations (e.g. PV=nRT, pH) or programming code symbols. Focus on memory tricks, mnemonics, and NCERT exception clauses.";
    } else if (isPhysics) {
      subjectRule = "CRITICAL RULE FOR PHYSICS: Provide step-by-step mathematical derivations, SI unit checks, standard NEET numerical shortcuts, and dimensional analysis.";
    } else if (isChem) {
      subjectRule = "CRITICAL RULE FOR CHEMISTRY: Cover reaction mechanisms, IUPAC nomenclature, electron displacement effects, or physical chem formulas with exact unit conversions.";
    }

    const systemInstruction = `You are NEET AI Brain - the master AI Tutor & Doubt Resolver for NEET UG (Physics, Chemistry, Biology).
Your goal: Help NEET droppers & students master concepts with 100% NCERT accuracy.
${subjectRule}
Format your response using clean Markdown with:
1. 💡 **Core Concept Summary** (Direct & concise)
2. 📝 **Step-by-Step Solution / NCERT Line Explanation**
3. ⚠️ **NEET Exam Trap / Common Student Mistake**
4. 🚀 **Short Trick / Formula Cheat / Mnemonic**
5. 🎯 **1 Related NEET Pattern MCQ with Answer & Explanation**`;

    const userPrompt = `[Subject: ${subject || "General NEET"}] [Topic: ${topicTitle || "General"}] [Persona Type: ${promptType || "doubt_explainer"}]
Student Doubt/Question: ${userQuery}`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: "gemini-3.6-flash",
          contents: userPrompt,
          config: {
            systemInstruction
          }
        });

        return res.json({
          success: true,
          answer: response.text,
          modelUsed: "gemini-3.6-flash",
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        console.error("Gemini API Error:", err);
      }
    }

    // Dynamic subject-accurate fallback if API key is missing or fails
    let fallbackAnswer = "";
    if (isBio) {
      fallbackAnswer = `### 💡 Core Concept Summary (Biology NCERT)
**Topic:** ${topicTitle || "NCERT Biology Concept"}
Your Query: "*${userQuery}*"

### 📝 Step-by-Step NCERT Breakdown
1. **NCERT Text Line Focus:** In NEET Biology, 95%+ of questions are framed directly from NCERT Class 11 & 12 statements.
2. **Key Terminology & Process:**
   - Always trace the exact NCERT diagram labels and bold keywords.
   - Pay special attention to examples given in parentheses in NCERT text.
   - Distinguish carefully between statements containing "All", "Most", "Only", or "Except".

### ⚠️ NEET Exam Trap
- Avoid confusing homologous vs analogous structures or enzymes in metabolic pathways.
- Read double negatives carefully (*e.g., "Which of the following is NOT incorrect?"*).

### 🚀 NCERT Mnemonic & Memory Shortcut
- Create acronyms for order of classification, stages of cell cycle (PMAT), or hormonal sources.

---
*Note: Add GEMINI_API_KEY in environment variables for live AI streaming.*`;
    } else if (isPhysics) {
      fallbackAnswer = `### 💡 Core Concept Summary (Physics)
**Topic:** ${topicTitle || "Physics High-Yield Concept"}
Your Query: "*${userQuery}*"

### 📝 Step-by-Step Numerical Breakdown
1. **Core Principle:** Identify fundamental laws (Newton's Laws, Work-Energy Theorem, Conservation of Momentum/Energy, Gauss's Law).
2. **Key Formulas:**
   - Force & Motion: $F = m \\cdot a$, $W = \\Delta K$, $\\tau = I \\cdot \\alpha$
   - Electricity & Waves: $V = I \\cdot R$, $\\lambda = \\frac{h}{p}$, $T = 2\\pi\\sqrt{\\frac{m}{k}}$

### ⚠️ NEET Exam Trap
- Check unit conversions before substituting values (e.g. cm to meters, eV to Joules, minutes to seconds).

### 🚀 Dimensional Analysis Trick
- Verify options by checking dimensions to quickly eliminate incorrect choices in NEET numericals.`;
    } else {
      fallbackAnswer = `### 💡 Core Concept Summary (Chemistry)
**Topic:** ${topicTitle || "Chemistry High-Yield Concept"}
Your Query: "*${userQuery}*"

### 📝 Step-by-Step NCERT Breakdown
1. **Core Reaction / Law:**
   - Physical: Ideal gas $PV = nRT$, Nernst Equation $E = E^\\circ - \\frac{0.0591}{n}\\log Q$, $pH = -\\log[H^+]$.
   - Organic: Identify electrophile/nucleophile, inductive effect (+I/-I), resonance, and stereochemistry.
   - Inorganic: Oxidation states, coordination compounds, periodic trends, and exception cases in p-block / d-block.

### ⚠️ NEET Exam Trap
- Do not forget negative signs in thermodynamic values ($\\Delta G = \\Delta H - T\\Delta S$).`;
    }

    res.json({
      success: true,
      answer: fallbackAnswer,
      modelUsed: "NEET AI Brain Engine (Fallback Mode)",
      timestamp: new Date().toISOString()
    });
  });

  // Server-side AI Chatbot Endpoint (Multi-turn conversation)
  app.post("/api/ai/chat", async (req, res) => {
    const { messages, subject } = req.body;
    const client = getGeminiClient();

    const subjectContext = subject ? `[Active Subject Focus: ${subject}]` : '[Subject: General NEET Physics, Chemistry, Biology]';

    const systemInstruction = `You are NEET AI Guru - the ultimate 24/7 personal AI Chatbot & Mentor for NEET UG aspirants.
${subjectContext}
Your identity: A top ranker's personal AI tutor who explains complex concepts simply, solves Physics/Chemistry numericals step-by-step, decodes Biology NCERT lines, creates study timetables, and gives motivational support.
Rules:
- Be encouraging, concise, clear, and structured.
- If asked a Biology doubt, NEVER include unrelated Physics math equations like F=ma or code syntax.
- Format math formulas cleanly in LaTeX or clean text.
- Support English, Hinglish, Hindi, and Marathi prompts if the student asks.`;

    if (client && Array.isArray(messages) && messages.length > 0) {
      try {
        // Format prompt messages
        const formattedPrompt = messages.map((m: any) => `${m.role === 'user' ? 'Student' : 'AI Guru'}: ${m.content}`).join('\n\n');

        const response = await client.models.generateContent({
          model: "gemini-3.6-flash",
          contents: formattedPrompt,
          config: {
            systemInstruction
          }
        });

        return res.json({
          success: true,
          reply: response.text,
          modelUsed: "gemini-3.6-flash"
        });
      } catch (err: any) {
        console.error("Chat API Error:", err);
      }
    }

    // Smart conversational fallback
    const lastUserMessage = messages && messages.length > 0 ? messages[messages.length - 1].content : "Hello";
    const fallbackReply = `Hello NEET Aspirant! 🚀 I am your **NEET AI Guru**.

You asked: "*${lastUserMessage}*"

### 💡 Guidance & Concept Note:
In NEET UG, mastering **NCERT Biology Class 11 & 12**, solving **30-40 Physics numericals daily**, and practicing **Organic Mechanisms / Inorganic Exceptions** is the key to scoring 680+ marks!

Feel free to ask me:
1. "Explain difference between C3 and C4 plants with NCERT points"
2. "How to solve moment of inertia of ring vs disc?"
3. "Rank acidic strength of phenol, ethanol, and benzoic acid"
4. "Give me a 10-day revision strategy for Physics"`;

    res.json({
      success: true,
      reply: fallbackReply,
      modelUsed: "NEET AI Guru (Fallback Mode)"
    });
  });

  // Server-side AI Test Paper Analysis Endpoint
  app.post("/api/ai/analyze-test", async (req, res) => {
    const { testTitle, score, totalMarks, accuracyPercent, correctCount, incorrectCount, unattemptedCount, weakTopics } = req.body;
    const client = getGeminiClient();

    const systemInstruction = `You are NEET AI Senior Test Analyst. Analyze the student's mock test performance and provide a sharp, actionable diagnostic report.
Provide a clean Markdown output with:
1. 📊 **Performance Verdict & Rank Projection**
2. ⚠️ **Negative Marking Penalty & Time Loss Analysis**
3. 🎯 **Weak Chapter Recovery Action Plan**
4. 🚀 **Next 3 Days High-Yield Revision Steps**`;

    const userPrompt = `Test Title: ${testTitle}
Score: ${score} / ${totalMarks} (Accuracy: ${accuracyPercent}%)
Correct: ${correctCount}, Incorrect: ${incorrectCount}, Unattempted: ${unattemptedCount}
Weak Topics Flagged: ${weakTopics ? weakTopics.join(", ") : "None"}`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: "gemini-3.6-flash",
          contents: userPrompt,
          config: {
            systemInstruction
          }
        });

        return res.json({
          success: true,
          analysis: response.text,
          modelUsed: "gemini-3.6-flash"
        });
      } catch (err: any) {
        console.error("Test Analysis API Error:", err);
      }
    }

    const percentage = Math.round((score / (totalMarks || 720)) * 100);
    const fallbackAnalysis = `### 📊 Performance Verdict & Rank Projection
- **Score:** ${score} / ${totalMarks} (**${percentage}%**)
- **Estimated NEET Percentile:** ${percentage >= 85 ? '98.5+ Percentile (Government Medical College Range 🏥)' : percentage >= 65 ? '92-96 Percentile (Solid Progress, Needs Push)' : '80-88 Percentile (Focus on Weak Chapters)'}
- **Accuracy Rate:** ${accuracyPercent}% (Target: 85%+)

### ⚠️ Negative Marking Impact
- You lost **${incorrectCount * 5} marks** due to incorrect guesses (${incorrectCount} wrong answers @ -1 penalty + lost +4 opportunity).
- **Rule:** If unsure between 3 options, skip the question to avoid negative marks!

### 🎯 Weak Chapter Recovery Action Plan
${weakTopics && weakTopics.length > 0 ? weakTopics.map((w: string) => `- 📌 Re-read NCERT lines for **${w}** & solve 20 PYQs.`).join("\n") : "- 📌 Review all incorrect questions and add them to Spaced Revision Queue."}

### 🚀 Next 3 Days Action Plan
1. Spend 1 hour resolving the exact mistakes from this test.
2. Re-watch 1-shot lecture for weak topics.
3. Take a 45-min chapter test on weak topics in AI Test Center.`;

    res.json({
      success: true,
      analysis: fallbackAnalysis,
      modelUsed: "NEET AI Test Analyst (Fallback Mode)"
    });
  });

  // Server-side Gemini Prompt Blueprint API Endpoint (Architecture ready for AI generation)
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
