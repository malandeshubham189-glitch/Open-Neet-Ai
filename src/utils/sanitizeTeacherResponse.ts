export function sanitizeTeacherResponse(rawText: string): string {
  if (!rawText) return "";

  let text = rawText;

  // 1. Remove robotic language & AI disclaimers
  text = text.replace(/As an AI language model,?\s*/gi, "");
  text = text.replace(/As an AI,?\s*/gi, "");
  text = text.replace(/Let's analyze\s*/gi, "");
  text = text.replace(/According to the prompt,?\s*/gi, "");
  text = text.replace(/As a dedicated,?\s*top-tier educator,?\s*/gi, "");
  text = text.replace(/As an AI tutor,?\s*/gi, "");
  text = text.replace(/As an AI mentor,?\s*/gi, "");

  // 2. Remove LaTeX envs & commands: \boxed{...}, \begin{...}, \end{...}, \frac{A}{B}, \text{...}
  text = text.replace(/\\boxed\{([^}]+)\}/g, "$1");
  text = text.replace(/\\begin\{[^}]+\}/g, "");
  text = text.replace(/\\end\{[^}]+\}/g, "");
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)");
  text = text.replace(/\\(text|mathrm|mathbf|textit|textbf|mathrm)\{([^}]+)\}/g, "$2");
  text = text.replace(/\\left|\\right/g, "");

  // 3. Strip LaTeX math delimiters ($$, $, \[, \], \(, \))
  text = text.replace(/\$\$(.*?)\$\$/gs, "$1");
  text = text.replace(/\$(.*?)\$/g, "$1");
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, "$1");
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, "$1");

  // Remove any individual lingering delimiter tokens if present
  text = text.replace(/\\\[|\\\]|\\\(\|\\\)/g, "");

  // 4. Convert math commands & Greek symbols to plain text/Unicode
  text = text.replace(/\\sqrt\{([^}]+)\}/g, "√($1)");
  text = text.replace(/\\times/g, "×").replace(/\\cdot/g, "·");
  text = text.replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\theta/g, "θ")
    .replace(/\\pi/g, "π")
    .replace(/\\mu/g, "μ")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\degree/g, "°")
    .replace(/\\omega/g, "ω")
    .replace(/\\lambda/g, "λ")
    .replace(/\\sigma/g, "σ")
    .replace(/\\rho/g, "ρ")
    .replace(/\\epsilon/g, "ε")
    .replace(/\\infty/g, "∞");
  text = text.replace(/\\propto/g, "∝");
  text = text.replace(/\\x?rightarrow\{?[^}]*\}?/g, " -> ");
  text = text.replace(/\\equiv/g, "≡").replace(/\\approx/g, "≈");
  text = text.replace(/\\le\b/g, "≤").replace(/\\ge\b/g, "≥");
  text = text.replace(/\\pm/g, "±");

  // 5. Convert superscripts & subscripts
  text = text.replace(/\^2\b/g, "²")
    .replace(/\^3\b/g, "³")
    .replace(/\^4\b/g, "⁴")
    .replace(/\^0\b/g, "⁰")
    .replace(/\^\{-1\}|\^-1\b/g, "⁻¹")
    .replace(/\^\{-2\}|\^-2\b/g, "⁻²");

  // Clean remaining LaTeX commands or backslashes like \implies, \quad, \frac, \text, \boxed, \begin, \end
  text = text.replace(/\\(implies|quad|qquad|in|notin|subset|cap|cup|cdot|vec|frac|text|left|right|boxed|begin|end)\b/g, " ");
  text = text.replace(/\\([a-zA-Z]+)/g, "$1");

  // 6. Support V8 Unicode/ASCII diagrams - preserve clean box & flow diagrams
  text = text.replace(/```[a-z]*\n([\s\S]*?)\n```/gi, (match, inner) => {
    // If it's a clean ASCII/Unicode diagram with box drawing or flow arrows, render as plain text block
    if (
      inner.includes("┌") ||
      inner.includes("└") ||
      inner.includes("│") ||
      inner.includes("↓") ||
      inner.includes("●") ||
      inner.includes("Force") ||
      inner.includes("Block") ||
      inner.includes("Nucleus")
    ) {
      return "\n\n" + inner.trim() + "\n\n";
    }
    return match.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "");
  });

  // 7. Convert Markdown Tables into clean structured card points
  if (text.includes("|") && !text.includes("┌") && !text.includes("└")) {
    const lines = text.split("\n");
    const cleanedLines: string[] = [];
    let inTable = false;
    let headers: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        if (trimmed.includes("---")) {
          // Divider row
          inTable = true;
          continue;
        }
        const cells = trimmed
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean);

        if (!inTable) {
          // Header row
          headers = cells;
          inTable = true;
        } else {
          // Data row -> format as clean card / bullet list
          if (cells.length > 0) {
            if (headers.length === cells.length) {
              const pair = cells.map((cell, idx) => `**${headers[idx]}:** ${cell}`).join(" | ");
              cleanedLines.push("• " + pair);
            } else {
              cleanedLines.push("• " + cells.join(" : "));
            }
          }
        }
      } else {
        if (inTable && trimmed === "") {
          inTable = false;
          headers = [];
        }
        cleanedLines.push(line);
      }
    }
    text = cleanedLines.join("\n");
  }

  // 8. Highlight Formula, Shortcut, PYQ Trick, Common Mistake as cards
  text = text.replace(/(?:^|\n)(?:###?\s*)?(Formula|Key Formula|Formulae)(?:\:|\s*-)?/gi, "\n\n💡 **FORMULA CARD:**\n");
  text = text.replace(/(?:^|\n)(?:###?\s*)?(Shortcut|Short cut|Fast Trick|Speed Trick)(?:\:|\s*-)?/gi, "\n\n⚡ **SHORTCUT CARD:**\n");
  text = text.replace(/(?:^|\n)(?:###?\s*)?(PYQ Trick|PYQ Trap|PYQ Secret|PYQ Concept)(?:\:|\s*-)?/gi, "\n\n🎯 **PYQ TRICK:**\n");
  text = text.replace(/(?:^|\n)(?:###?\s*)?(Common Mistake|Common Trap|Student Mistake|Mistake Alert|Galti Alert)(?:\:|\s*-)?/gi, "\n\n⚠️ **COMMON MISTAKE:**\n");

  // 9. Split long paragraphs into small readable paragraphs (Max 2-3 lines / ~180 chars per paragraph)
  const paragraphBlocks = text.split(/\n\s*\n/);
  const formattedParagraphs: string[] = [];

  for (const block of paragraphBlocks) {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) continue;

    // Skip special card headers, lists, dividers, diagrams or short blocks
    if (
      trimmedBlock.startsWith("💡") ||
      trimmedBlock.startsWith("⚡") ||
      trimmedBlock.startsWith("🎯") ||
      trimmedBlock.startsWith("⚠️") ||
      trimmedBlock.startsWith("📌") ||
      trimmedBlock.startsWith("🔹") ||
      trimmedBlock.startsWith("✅") ||
      trimmedBlock.startsWith("📝") ||
      trimmedBlock.startsWith("📖") ||
      trimmedBlock.startsWith("━") ||
      trimmedBlock.startsWith("•") ||
      trimmedBlock.startsWith("1.") ||
      trimmedBlock.startsWith("-") ||
      trimmedBlock.startsWith("┌") ||
      trimmedBlock.startsWith("│") ||
      trimmedBlock.startsWith("#") ||
      trimmedBlock.length < 180
    ) {
      formattedParagraphs.push(trimmedBlock);
      continue;
    }

    // Split long text by sentences to keep paragraphs <= 3 lines
    const sentences = trimmedBlock.match(/[^.!?]+[.!?]+(\s+|$)/g) || [trimmedBlock];
    let currentParagraph = "";
    let sentenceCount = 0;

    for (const sentence of sentences) {
      currentParagraph += sentence;
      sentenceCount++;

      if (sentenceCount >= 2 || currentParagraph.length >= 180) {
        formattedParagraphs.push(currentParagraph.trim());
        currentParagraph = "";
        sentenceCount = 0;
      }
    }
    if (currentParagraph.trim()) {
      formattedParagraphs.push(currentParagraph.trim());
    }
  }

  text = formattedParagraphs.join("\n\n");

  // 10. Clean ending - ensure friendly follow-up is preserved
  const isCasualGreeting = /^(hello|hi|hey|kaise|kaunsa|all good|good morning|good evening|shukriya|thanks|welcome|swagat)/i.test(text.trim());
  if (!isCasualGreeting) {
    const trimmedFinal = text.trim();
    const hasFollowUp = /\?|\b(samajh aaya|solve karein|shortcut|pyq)\b/i.test(trimmedFinal.slice(-150));
    if (!hasFollowUp) {
      text = trimmedFinal + "\n\nSamajh aaya beta? Ab is topic ka PYQ solve karein? 🎯";
    }
  }

  return text;
}
