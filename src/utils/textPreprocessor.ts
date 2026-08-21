/**
 * High-Precision Text Preprocessor for NEET Educational Text-to-Speech
 * Converts complex Markdown, LaTeX formulas, scientific equations,
 * NCERT cards, Marathi, Hindi, and Hinglish expressions
 * into crystal-clear, natural, and fluent Gemini-like educational speech with intelligent micro-pauses.
 */

/**
 * Checks if the text contains Devanagari script (Marathi / Hindi)
 */
export function isDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

export const containsDevanagari = isDevanagari;

/**
 * Checks if the text contains Romanized Hinglish or Marathi phrasing
 */
export function isHinglishOrMarathi(text: string): boolean {
  const lower = text.toLowerCase();
  return /\b(samajh|samajhla|dekho|karo|kara|hota|hoti|hote|aahe|nahit|ahe|pahije|bhaiya|didi|dost|yaad|rakho|theva|lakshat|padhai|karein|chalo|shuru|bolte|sangto|hain|kaise|kasa|kyun|kashamule|kya|kay|nahi|nahiye|mat|nako|sawaal|prashna|jawab|uttar|dhyan|ekdum|pakka|khup|sope|sutra|formula)\b/.test(
    lower
  );
}

/**
 * Preprocesses and converts scientific formulas, biology terms, and chemistry notation into natural spoken words
 */
export function preprocessScientificFormulas(text: string): string {
  if (!text) return '';

  let out = text;

  // 1. Powers of 10 and Exponents (e.g. 10^5, 10^-3, 10^-6, 10^9)
  out = out
    .replace(/\b10\^(-?\d+)\b/g, ' 10 to the power $1 ')
    .replace(/\b10\^\{\s*(-?\d+)\s*\}/g, ' 10 to the power $1 ')
    .replace(/(\d+)\s*[\*×]\s*10\^(-?\d+)/g, '$1 into 10 to the power $2')
    .replace(/(\d+)\s*\\times\s*10\^(-?\d+)/g, '$1 into 10 to the power $2');

  // 2. Common NEET Physics Equations & Laws
  out = out
    .replace(/\bF\s*=\s*m\s*a\b/gi, 'Force equals mass multiplied by acceleration')
    .replace(/\bF\s*=\s*m\s*\*\s*a\b/gi, 'Force equals mass multiplied by acceleration')
    .replace(/\bv\s*=\s*u\s*\+\s*a\s*t\b/gi, 'v equals u plus a t')
    .replace(/\bv\^2\s*=\s*u\^2\s*\+\s*2\s*a\s*s\b/gi, 'v squared equals u squared plus 2 a s')
    .replace(/\bs\s*=\s*u\s*t\s*\+\s*(?:1\/2|0\.5)\s*a\s*t\^2\b/gi, 's equals u t plus half a t squared')
    .replace(/\bE\s*=\s*m\s*c\^2\b|\bE\s*=\s*m\s*c²\b/gi, 'E equals m c squared')
    .replace(/\bP\s*V\s*=\s*n\s*R\s*T\b/gi, 'P V equals n R T, ideal gas equation')
    .replace(/\bW\s*=\s*F\s*\.?\s*d\b/gi, 'Work equals Force into displacement')
    .replace(/\bKE\s*=\s*1\/2\s*m\s*v\^2\b/gi, 'Kinetic energy equals half m v squared')
    .replace(/\bPE\s*=\s*m\s*g\s*h\b/gi, 'Potential energy equals m g h')
    .replace(/\bomega\s*=\s*2\s*pi\s*f\b/gi, 'angular frequency omega equals 2 pi f')
    .replace(/\bV\s*=\s*I\s*R\b/gi, 'Voltage equals current I into resistance R')
    .replace(/\bP\s*=\s*V\s*I\b/gi, 'Power equals V into I')
    // Equilibrium, Thermodynamics & Physical Chemistry Formulas
    .replace(/\bpH\s*=\s*-\s*log\s*\[\s*H\+\s*\]/gi, 'p H equals negative logarithm of hydrogen ion concentration')
    .replace(/\bpH\s*=\s*-\s*log\s*\[\s*H3O\+\s*\]/gi, 'p H equals negative logarithm of hydronium ion concentration')
    .replace(/\bK_?(?:eq|EQ)\b/g, 'K equilibrium')
    .replace(/\bK_?(?:sp|SP)\b/g, 'K s p, solubility product')
    .replace(/\bK_?a\b/g, 'K a, acid dissociation constant')
    .replace(/\bK_?b\b/g, 'K b, base dissociation constant')
    .replace(/\bpH\b/g, 'p H')
    .replace(/\bpOH\b/g, 'p O H')
    .replace(/\bpKa\b/g, 'p K a')
    .replace(/\bpKb\b/g, 'p K b')
    .replace(/\bKw\b/g, 'K w, ionic product of water');

  // 3. Genetics Ratios & Generations
  out = out
    .replace(/\b9\s*:\s*3\s*:\s*3\s*:\s*1\b/g, '9 is to 3 is to 3 is to 1')
    .replace(/\b1\s*:\s*2\s*:\s*1\b/g, '1 is to 2 is to 1')
    .replace(/\b3\s*:\s*1\b/g, '3 is to 1')
    .replace(/\b1\s*:\s*1\b/g, '1 is to 1')
    .replace(/\bF1\s+generation\b/gi, 'F 1 generation')
    .replace(/\bF2\s+generation\b/gi, 'F 2 generation');

  // 4. Trigonometry Functions
  out = out
    .replace(/\bsin\s*\\?theta\b/gi, 'sine theta')
    .replace(/\bcos\s*\\?theta\b/gi, 'cosine theta')
    .replace(/\btan\s*\\?theta\b/gi, 'tan theta')
    .replace(/\bcot\s*\\?theta\b/gi, 'cot theta')
    .replace(/\bsec\s*\\?theta\b/gi, 'sec theta')
    .replace(/\bcsc\s*\\?theta\b|\bcosec\s*\\?theta\b/gi, 'cosecant theta');

  // 5. Ions & Chemical Radicals
  out = out
    .replace(/\bH\+/g, ' H plus ion ')
    .replace(/\bH3O\+/g, ' Hydronium ion ')
    .replace(/\bOH\-/g, ' Hydroxide ion ')
    .replace(/\bNa\+/g, ' Sodium ion ')
    .replace(/\bK\+/g, ' Potassium ion ')
    .replace(/\bCa2\+/g, ' Calcium 2 plus ion ')
    .replace(/\bMg2\+/g, ' Magnesium 2 plus ion ')
    .replace(/\bCl\-/g, ' Chloride ion ')
    .replace(/\bSO4\^?2\-?/g, ' Sulfate ion ')
    .replace(/\bNO3\-/g, ' Nitrate ion ')
    .replace(/\bCO3\^?2\-?/g, ' Carbonate ion ')
    .replace(/\bNH4\+/g, ' Ammonium ion ');

  // 6. LaTeX Math, Greek Letters & Fractions
  out = out
    .replace(/\$\$([\s\S]*?)\$\$/g, ' $1 ')
    .replace(/\$([^\$]+)\$/g, ' $1 ')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, ' $1 divided by $2 ')
    .replace(/\\sqrt\{([^}]+)\}/g, ' square root of $1 ')
    .replace(/\\sqrt\[3\]\{([^}]+)\}/g, ' cube root of $1 ')
    .replace(/\\Delta\s*([a-zA-Z0-9]+)/g, ' change in $1 ')
    .replace(/\\Delta/g, ' delta ')
    .replace(/\\theta/g, ' theta ')
    .replace(/\\alpha/g, ' alpha ')
    .replace(/\\beta/g, ' beta ')
    .replace(/\\gamma/g, ' gamma ')
    .replace(/\\lambda/g, ' lambda ')
    .replace(/\\pi/g, ' pi ')
    .replace(/\\sigma/g, ' sigma ')
    .replace(/\\mu/g, ' micro ')
    .replace(/\\omega/g, ' omega ')
    .replace(/\\tau/g, ' tau ')
    .replace(/\\rho/g, ' rho ')
    .replace(/\\epsilon/g, ' epsilon ')
    .replace(/\\phi/g, ' phi ')
    .replace(/\\psi/g, ' psi ')
    .replace(/\\rightarrow|\\to/g, ' yields ')
    .replace(/\\leftrightarrow/g, ' is in equilibrium with ')
    .replace(/\\times/g, ' multiplied by ')
    .replace(/\\div/g, ' divided by ')
    .replace(/\\pm/g, ' plus or minus ')
    .replace(/\\approx/g, ' approximately ')
    .replace(/\\le|\\leq/g, ' less than or equal to ')
    .replace(/\\ge|\\geq/g, ' greater than or equal to ')
    .replace(/\\neq/g, ' is not equal to ')
    .replace(/\\infty/g, ' infinity ')
    .replace(/\^2/g, ' squared ')
    .replace(/\^3/g, ' cubed ')
    .replace(/\\[a-zA-Z]+/g, ' ');

  // 7. Common NEET Chemical Compounds
  out = out
    .replace(/\bH2O\b/gi, 'water')
    .replace(/\bCO2\b/gi, 'carbon dioxide')
    .replace(/\bO2\b/gi, 'oxygen gas')
    .replace(/\bN2\b/gi, 'nitrogen gas')
    .replace(/\bH2SO4\b/gi, 'sulfuric acid')
    .replace(/\bHCl\b/gi, 'hydrochloric acid')
    .replace(/\bHNO3\b/gi, 'nitric acid')
    .replace(/\bH3PO4\b/gi, 'phosphoric acid')
    .replace(/\bCH3COOH\b/gi, 'acetic acid')
    .replace(/\bNaCl\b/gi, 'sodium chloride')
    .replace(/\bNaOH\b/gi, 'sodium hydroxide')
    .replace(/\bKOH\b/gi, 'potassium hydroxide')
    .replace(/\bCa\(OH\)2\b/gi, 'calcium hydroxide')
    .replace(/\bC6H12O6\b/gi, 'glucose')
    .replace(/\bCaCO3\b/gi, 'calcium carbonate')
    .replace(/\bNH3\b/gi, 'ammonia')
    .replace(/\bCH4\b/gi, 'methane')
    .replace(/\bC2H5OH\b/gi, 'ethanol')
    // Deduplicate when chemical name was immediately preceded or followed by formula (e.g. calcium carbonate CaCO3)
    .replace(/\b(calcium carbonate|calcium hydroxide|sodium chloride|sodium hydroxide|potassium hydroxide|sulfuric acid|nitric acid|hydrochloric acid|acetic acid|phosphoric acid|carbon dioxide|oxygen gas|nitrogen gas)\s+\1\b/gi, '$1');

  // 8. Units & Physical Quantities
  out = out
    .replace(/\b(\d+)\s*m\/s\^2\b|\b(\d+)\s*m\/s2\b/gi, '$1 meters per second squared ')
    .replace(/\bm\/s\^2\b|\bm\/s2\b/gi, ' meters per second squared ')
    .replace(/\b(\d+)\s*m\/s\b/gi, '$1 meters per second ')
    .replace(/\bm\/s\b/gi, ' meters per second ')
    .replace(/\b(\d+)\s*km\/h\b/gi, '$1 kilometers per hour ')
    .replace(/\b(\d+)\s*kg\b/gi, '$1 kilograms ')
    .replace(/\bkg\b/gi, ' kilograms ')
    .replace(/\b(\d+)\s*g\b(?!\w)/gi, '$1 grams ')
    .replace(/\b(\d+)\s*mg\b/gi, '$1 milligrams ')
    .replace(/\b(\d+)\s*cm\b/gi, '$1 centimeters ')
    .replace(/\b(\d+)\s*mm\b/gi, '$1 millimeters ')
    .replace(/\b(\d+)\s*nm\b/gi, '$1 nanometers ')
    .replace(/\b(\d+)\s*μm\b|\b(\d+)\s*um\b/gi, '$1 micrometers ')
    .replace(/\bÅ\b|\\AA/gi, ' Angstroms ')
    .replace(/\b(\d+)\s*eV\b/gi, '$1 electron volts ')
    .replace(/\beV\b/gi, ' electron volts ')
    .replace(/\b(\d+)\s*kJ\/mol\b/gi, '$1 kilojoules per mole ')
    .replace(/\bkJ\/mol\b/gi, ' kilojoules per mole ')
    .replace(/\b(\d+)\s*kJ\b/gi, '$1 kilojoules ')
    .replace(/\b(\d+)\s*J\b/g, '$1 Joules ')
    .replace(/\b(\d+)\s*Hz\b/gi, '$1 Hertz ')
    .replace(/\b(\d+)\s*kHz\b/gi, '$1 kilohertz ')
    .replace(/\b(\d+)\s*MHz\b/gi, '$1 megahertz ')
    .replace(/\b(\d+)\s*atm\b/gi, '$1 atmospheres ')
    .replace(/\b(\d+)\s*Pa\b/gi, '$1 Pascals ')
    .replace(/\b(\d+)\s*kPa\b/gi, '$1 kilopascals ')
    .replace(/\b(\d+)\s*N\b(?=\s*[\.,]|\s*$|\s+(?:force|equals|\d))/gi, '$1 Newtons ')
    .replace(/°C|\\degree\s*C/gi, ' degrees Celsius ')
    .replace(/°|\\degree/gi, ' degrees ');

  // 9. Biology, Medical, & Exam Acronyms
  out = out
    .replace(/\bNCERT\b/gi, 'N C E R T')
    .replace(/\bNEET\b/gi, 'Neet')
    .replace(/\bNTA\b/gi, 'N T A')
    .replace(/\bDNA\b/gi, 'D N A')
    .replace(/\bRNA\b/gi, 'R N A')
    .replace(/\bmRNA\b/gi, 'messenger R N A')
    .replace(/\btRNA\b/gi, 'transfer R N A')
    .replace(/\brRNA\b/gi, 'ribosomal R N A')
    .replace(/\bcDNA\b/gi, 'complementary D N A')
    .replace(/\bATP\b/gi, 'A T P')
    .replace(/\bADP\b/gi, 'A D P')
    .replace(/\bNADP\b/gi, 'N A D P')
    .replace(/\bNADPH\b/gi, 'N A D P H')
    .replace(/\bFADH2\b/gi, 'F A D H 2')
    .replace(/\bSA\s+node\b/gi, 'S A node')
    .replace(/\bAV\s+node\b/gi, 'A V node')
    .replace(/\bECG\b/gi, 'E C G')
    .replace(/\bPCR\b/gi, 'P C R')
    .replace(/\bELISA\b/gi, 'Elisa test')
    .replace(/\bDPP\b/gi, 'Daily Practice Problem')
    .replace(/\bPYQ\b/gi, 'P Y Q')
    .replace(/\bPYQs\b/gi, 'P Y Qs')
    .replace(/\bMCQ\b/gi, 'M C Q')
    .replace(/\bMCQs\b/gi, 'M C Qs')
    .replace(/\bCBT\b/gi, 'computer based test')
    .replace(/\bFig\.\s*(\d+)/gi, 'Figure $1 ')
    .replace(/\bEq\.\s*(\d+)/gi, 'Equation $1 ')
    .replace(/\bCh\.\s*(\d+)/gi, 'Chapter $1 ');

  return out;
}

/**
 * Normalizes Romanized Hinglish, Marathi, and Exam keywords into flawless phonetics
 * Prevents Edge Neural, Gemini TTS, and Web Speech API from spelling out letters
 * (e.g. "isse" -> "is-say" instead of "i s s e", "NEET" -> "Neat" instead of "n e e t",
 * and conversational "beta" -> "bayta" instead of "bita").
 */
export function normalizePhoneticsForSpeech(text: string): string {
  if (!text) return '';
  let out = text;

  // 1. Protect Scientific uses of "beta" (Greek letters, physics/chemistry/biology terms)
  out = out.replace(/\b(alpha\s*[,&]?\s*)beta\b/gi, '$1___BETA_SCI___');
  out = out.replace(
    /\bbeta\s*-\s*(decay|particle|particles|ray|rays|radiation|pleated|blocker|blockers|cell|cells|sheet|sheets|minus|plus|hydroxy|lactam|oxidation|globulin)\b/gi,
    '___BETA_SCI___-$1'
  );
  out = out.replace(
    /\bbeta\s+(decay|particle|particles|ray|rays|radiation|pleated|blocker|blockers|cell|cells|sheet|sheets|minus|plus|hydroxy|lactam|oxidation|globulin)\b/gi,
    '___BETA_SCI___ $1'
  );

  // 2. Conversational Teacher "beta" -> "bayta" (prevents "bita" / "beeta" English pronunciation)
  out = out
    .replace(/\bbeta\s*ji\b|\bbetaji\b/gi, 'bayta ji')
    .replace(/\bbeta\b/gi, 'bayta')
    .replace(/\bBeta\b/g, 'Bayta');

  // Restore scientific beta
  out = out.replace(/___BETA_SCI___/g, 'beta');

  // 3. Exam & Acronyms (prevents NEET from being spelled out "n e e t", AIIMS as "a i i m s")
  out = out
    .replace(/\bNEET\b|\bNeet\b|\bneet\b/g, 'Neat')
    .replace(/\bAIIMS\b|\bAiims\b|\baiims\b/g, 'Aims')
    .replace(/\bNCERT\b|\bNcert\b/gi, 'N C E R T')
    .replace(/\bNTA\b|\bNta\b/gi, 'N T A')
    .replace(/\bCBSE\b|\bCbse\b/gi, 'C B S E')
    .replace(/\bPYQs\b|\bPyqs\b|\bpyqs\b/g, 'P Y Qs')
    .replace(/\bPYQ\b|\bPyq\b|\bpyq\b/g, 'P Y Q')
    .replace(/\bMCQs\b|\bMcqs\b|\bmcqs\b/g, 'M C Qs')
    .replace(/\bMCQ\b|\bMcq\b|\bmcq\b/g, 'M C Q')
    .replace(/\bDPP\b|\bDPPs\b/gi, 'Daily Practice Problem')
    .replace(/\bOMR\b/gi, 'O M R');

  // 4. Hinglish Demonstratives, Pronouns & Connectors (prevents "isse" spelled "i s s e")
  out = out
    .replace(/\bisse\b/gi, 'is-say')
    .replace(/\busse\b/gi, 'us-say')
    .replace(/\bjisse\b/gi, 'jis-say')
    .replace(/\bkisse\b/gi, 'kis-say')
    .replace(/\bisko\b/gi, 'is-ko')
    .replace(/\busko\b/gi, 'us-ko')
    .replace(/\bjisko\b/gi, 'jis-ko')
    .replace(/\bkisko\b/gi, 'kis-ko')
    .replace(/\binhe\b/gi, 'in-hay')
    .replace(/\bunhe\b/gi, 'un-hay')
    .replace(/\bjinke\b/gi, 'jin-kay')
    .replace(/\bunke\b/gi, 'un-kay')
    .replace(/\binke\b/gi, 'in-kay')
    .replace(/\binka\b/gi, 'in-kaa')
    .replace(/\bunka\b/gi, 'un-kaa')
    .replace(/\bjinka\b/gi, 'jin-kaa')
    .replace(/\binse\b/gi, 'in-say')
    .replace(/\bunse\b/gi, 'un-say')
    .replace(/\bjinse\b/gi, 'jin-say')
    .replace(/\bisme\b/gi, 'is-mein')
    .replace(/\busme\b/gi, 'us-mein')
    .replace(/\bjisme\b/gi, 'jis-mein')
    .replace(/\bispe\b/gi, 'is-pay')
    .replace(/\buspe\b/gi, 'us-pay');

  // 5. Conversational Hinglish Words (phonetic smoothing & warmth)
  out = out
    .replace(/\baise\b/gi, 'ay-say')
    .replace(/\bkaise\b/gi, 'kai-say')
    .replace(/\bjaise\b/gi, 'jai-say')
    .replace(/\bwaise\b|\bwese\b/gi, 'vai-say')
    .replace(/\bchahiye\b/gi, 'chaahiyay')
    .replace(/\baayega\b|\bayega\b/gi, 'aa-yega')
    .replace(/\bjayega\b/gi, 'jaa-yega')
    .replace(/\bkarein\b|\bkaren\b/gi, 'ka-rein')
    .replace(/\bkarega\b/gi, 'ka-rayga')
    .replace(/\bhonge\b/gi, 'hon-gay')
    .replace(/\bpehle\b/gi, 'peh-lay')
    .replace(/\brahega\b/gi, 'ra-hayga')
    .replace(/\brahenge\b/gi, 'ra-hen-gay')
    .replace(/\bdekhoge\b/gi, 'day-kho-gay')
    .replace(/\bsamjhenge\b/gi, 'sam-jhen-gay')
    .replace(/\bsamjhein\b/gi, 'sam-jhein')
    .replace(/\bsamjho\b/gi, 'sam-jho')
    .replace(/\bsamajh\b/gi, 'sa-majh')
    .replace(/\bsamajhta\b/gi, 'sa-majh-ta')
    .replace(/\bsamajhti\b/gi, 'sa-majh-ti')
    .replace(/\bpadhai\b/gi, 'padh-aai')
    .replace(/\bsawaal\b|\bsawal\b/gi, 'sa-waal')
    .replace(/\bjawab\b/gi, 'ja-waab')
    .replace(/\bzarur\b|\bzaroor\b|\bzaruri\b|\bjarur\b|\bjaruri\b/gi, 'za-roo-ri')
    .replace(/\bacche\b|\bache\b/gi, 'ach-chay')
    .replace(/\bachha\b|\bacha\b|\bachhi\b/gi, 'ach-chha')
    .replace(/\bbohot\b|\bbahut\b/gi, 'ba-hut')
    .replace(/\bpakka\b/gi, 'pak-ka')
    .replace(/\bshuru\b/gi, 'shu-roo')
    .replace(/\bkhatam\b/gi, 'kha-tam')
    .replace(/\bhamesha\b/gi, 'ha-may-sha')
    .replace(/\bshabaash\b|\bshabash\b/gi, 'sha-baash')
    .replace(/\bbhaiya\b/gi, 'bhai-ya')
    .replace(/\bdidi\b/gi, 'dee-dee');

  // 6. Marathi Academic Phrasing & Pronunciations
  out = out
    .replace(/\bmahiti\b/gi, 'maahi-tee')
    .replace(/\bsope\b/gi, 'so-pay')
    .replace(/\bkhup\b/gi, 'khoop')
    .replace(/\bmahatvacha\b|\bmahatvache\b/gi, 'ma-hat-va-che')
    .replace(/\bkaljipurvak\b|\bkalji-purvak\b/gi, 'kaal-jee-poor-vak')
    .replace(/\bghabru\b|\bghabroo\b/gi, 'ghab-roo')
    .replace(/\bvidyarthi\b/gi, 'vid-yaar-thee')
    .replace(/\bmitrano\b/gi, 'mit-raan-no')
    .replace(/\bprashna\b/gi, 'prash-na')
    .replace(/\buttara\b|\buttar\b/gi, 'ut-tar');

  return out;
}

/**
 * Normalizes common educational abbreviations, Marathi & Hinglish phrases for ultra-clear phonetics
 */
export function normalizeEducationalPhrasing(text: string): string {
  if (!text) return '';

  let out = text;

  // 1. Strict Abbreviation Normalization (MUST require period or strict word boundary to never mutate normal English/Hinglish words)
  out = out
    .replace(/\bi\.e\.,?\s*/gi, 'that is, ')
    .replace(/\be\.g\.,?\s*/gi, 'for example, ')
    .replace(/\betc\.,?\s*/gi, 'and so on, ')
    .replace(/\bvs\.\s*/gi, 'versus ')
    .replace(/\bw\.r\.t\.\s*|\bw\.r\.t\b/gi, 'with respect to ')
    .replace(/\bapprox\.\s*/gi, 'approximately ')
    .replace(/\bconc\.\s*/gi, 'concentration ')
    .replace(/\btemp\.\s*/gi, 'temperature ')
    .replace(/\beqn\.\s*|\beqns\.\s*|\beqn\b/gi, 'equation ')
    .replace(/\bsoln\.\s*|\bsolns\.\s*|\bsoln\b/gi, 'solution ')
    .replace(/\bcalc\.\s*/gi, 'calculation ')
    .replace(/\bmin\.\s*(?=\d)/gi, 'minimum ')
    .replace(/\bmax\.\s*(?=\d)/gi, 'maximum ')
    .replace(/\bwt\.\s*/gi, 'weight ')
    .replace(/\bmol\.\s*wt\.\s*|\bmol\s+wt\b/gi, 'molecular weight ');

  // 2. Roman Numerals for Classes, Chapters & Types
  out = out
    .replace(/\bClass\s+XI\b/gi, 'Class 11')
    .replace(/\bClass\s+XII\b/gi, 'Class 12')
    .replace(/\bType\s+I\b/gi, 'Type 1')
    .replace(/\bType\s+II\b/gi, 'Type 2')
    .replace(/\bType\s+III\b/gi, 'Type 3')
    .replace(/\bType\s+IV\b/gi, 'Type 4')
    .replace(/\bPhase\s+I\b/gi, 'Phase 1')
    .replace(/\bPhase\s+II\b/gi, 'Phase 2')
    .replace(/\bChapter\s+I\b/gi, 'Chapter 1')
    .replace(/\bChapter\s+II\b/gi, 'Chapter 2')
    .replace(/\bChapter\s+III\b/gi, 'Chapter 3')
    .replace(/\bChapter\s+IV\b/gi, 'Chapter 4')
    .replace(/\bChapter\s+V\b/gi, 'Chapter 5');

  // 3. Marathi Academic Phrasing & Natural Breathing Pauses
  out = out
    .replace(/\bलक्षात ठेवा[,\s]*/g, 'लक्षात ठेवा, ')
    .replace(/\bLakshat theva[,\s]*/gi, 'Lakshat theva, ')
    .replace(/\bमहत्त्वाचा मुद्दा[,\s]*/g, 'महत्त्वाचा मुद्दा, ')
    .replace(/\bMahatvacha mudda[,\s]*/gi, 'Mahatvacha mudda, ')
    .replace(/\bसमजले का\?\s*/g, 'समजले का? ')
    .replace(/\bसमजलं का\?\s*/g, 'समजलं का? ')
    .replace(/\bSamajhle ka\?\s*/gi, 'Samajhle ka? ')
    .replace(/\bSamajhla ka\?\s*/gi, 'Samajhla ka? ')
    .replace(/\bबघा[,\s]*/g, 'बघा, ')
    .replace(/\bBagha[,\s]*/gi, 'Bagha, ')
    .replace(/\bविद्यार्थी मित्रांनो[,\s]*/g, 'विद्यार्थी मित्रांनो, ')
    .replace(/\bVidyarthi mitrano[,\s]*/gi, 'Vidyarthi mitrano, ')
    .replace(/\bकाळजीपूर्वक वाचा[,\s]*/g, 'काळजीपूर्वक वाचा, ')
    .replace(/\bसूत्र[:\s]*/g, 'सूत्र: ')
    .replace(/\bSutra[:\s]*/gi, 'Sutra: ')
    .replace(/\bप्रश्नाचे उत्तर[:\s]*/g, 'प्रश्नाचे उत्तर: ')
    .replace(/\bघाबरू नका[,\s]*/g, 'घाबरू नका, ')
    .replace(/\bGhabru naka[,\s]*/gi, 'Ghabru naka, ');

  // 4. Hinglish & Hindi Conversational Pacing & Warmth
  out = out
    .replace(/\bDekho[,\s]*/gi, 'Dekho, ')
    .replace(/\bSamajh aaya\?\s*/gi, 'Samajh aaya? ')
    .replace(/\bDhyan se dekho[,\s]*/gi, 'Dhyaan se dekho, ')
    .replace(/\bDhyan se suno[,\s]*/gi, 'Dhyaan se suno, ')
    .replace(/\bYaad rakho[,\s]*/gi, 'Yaad rakho, ')
    .replace(/\bEk trick hai[,\s]*/gi, 'Ek trick hai, ')
    .replace(/\bTension mat lo[,\s]*/gi, 'Tension mat lo, ')
    .replace(/\bChalo shuru karte hain[,\s]*/gi, 'Chalo shuru karte hain, ')
    .replace(/\bChalo beta[,\s]*/gi, 'Chalo beta, ')
    .replace(/\bBilkul sahi[,\s]*/gi, 'Bilkul sahi, ')
    .replace(/\bShabaash[!,\s]*/gi, 'Shabaash! ');

  return out;
}

/**
 * Strips raw code, diagram JSON, markdown artifacts and inserts natural micro-pauses
 */
export function preprocessEducationalText(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove JSON blocks, Mermaid diagrams, and raw code snippets
  cleaned = cleaned.replace(/```(?:json|mermaid|latex|markdown|text|typescript|javascript)?[\s\S]*?```/gi, '');
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

  // 2. Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, ' ');

  // 3. Remove Markdown Tables (convert to readable comma separated text)
  cleaned = cleaned.replace(/\|.*\|/g, (match) => {
    return match
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(', ');
  });

  // 4. Transform Teacher Card Headers with clear auditory cues and micro-pauses
  cleaned = cleaned
    .replace(/💡\s*\*\*FORMULA CARD:\*\*/gi, 'Formula Note: ')
    .replace(/⚡\s*\*\*SHORTCUT CARD:\*\*/gi, 'Shortcut Trick: ')
    .replace(/🎯\s*\*\*PYQ TRICK:\*\*/gi, 'Previous Year Question Trick: ')
    .replace(/⚠️\s*\*\*COMMON MISTAKE:\*\*/gi, 'Warning, common mistake alert: ')
    .replace(/📖\s*Refer NCERT Figure/gi, 'Refer NCERT Textbook Figure. ')
    .replace(/Samajh aaya\? Agar chaho to isi topic ka PYQ bhi solve karte hain\. 🎯/gi, 'Samajh aaya? Agar chaho to isi topic ka PYQ bhi solve karte hain.');

  // 5. Clean Markdown Headers, Bold and Styles
  cleaned = cleaned.replace(/^#+\s+/gm, '');
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
  cleaned = cleaned.replace(/__([^_]+)__/g, '$1');
  cleaned = cleaned.replace(/_([^_]+)_/g, '$1');
  cleaned = cleaned.replace(/~~([^~]+)~~/g, '$1');
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 6. Preprocess Formulas, Chemistry, Biology & Exam Terms
  cleaned = preprocessScientificFormulas(cleaned);

  // 7. Normalize Abbreviations & Educational Phrasing
  cleaned = normalizeEducationalPhrasing(cleaned);

  // 8. Normalize Phonetics (prevents spelling out "isse" as "i s s e", "NEET" as "n e e t", and conversational "beta" as "bita")
  cleaned = normalizePhoneticsForSpeech(cleaned);

  // 9. Remove visual decorative emojis that create TTS glitches
  cleaned = cleaned.replace(
    /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F1E0}-\u{1F1FF}]/gu,
    ''
  );

  // 10. Convert bullet lists and numbered lists into smooth sequential sentences with commas
  cleaned = cleaned
    .replace(/^[-*•]\s+/gm, 'Point: ')
    .replace(/^(\d+)\.\s+/gm, 'Number $1, ')
    .replace(/([.!?।])\s*/g, '$1 ')
    .replace(/([,;:])\s*/g, '$1 ');

  // 11. Clean duplicate or conflicting punctuation
  cleaned = cleaned
    .replace(/,\s*,+/g, ', ')
    .replace(/([.!?।])\s*[,;]+/g, '$1 ')
    .replace(/[,;]\s*([.!?।])/g, '$1 ')
    .replace(/:\s*:+/g, ': ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Intelligent Sentence Chunker that prevents fragmented micro-sentences and avoids missing lines
 */
export function chunkTextIntoCohesiveSentences(rawText: string): string[] {
  const cleaned = preprocessEducationalText(rawText);
  if (!cleaned) return [];

  // Protect decimals and abbreviations
  const protectedText = cleaned
    .replace(/\b(Dr|Mr|Mrs|Ms|Prof|Fig|Eq|p|pp|vs|e\.g|i\.e|etc|sp|spp|Vol|Ch|No)\./gi, '$1___DOT___')
    .replace(/(\d+)\.(\d+)/g, '$1___DECIMAL___$2');

  // Split by terminal sentence punctuation or newlines
  const rawSplits = protectedText.match(/[^.!?।\n]+[.!?।\n]*/g) || [protectedText];
  const cleanedSplits: string[] = [];

  for (const item of rawSplits) {
    const restored = item
      .replace(/___DOT___/g, '.')
      .replace(/___DECIMAL___/g, '.')
      .trim();
    if (restored.length > 0) {
      cleanedSplits.push(restored);
    }
  }

  // Merge tiny fragments (< 35 chars) with adjacent sentence so speech is natural and continuous
  const cohesiveChunks: string[] = [];
  let buffer = '';

  for (let i = 0; i < cleanedSplits.length; i++) {
    const chunk = cleanedSplits[i];
    if (buffer.length === 0) {
      buffer = chunk;
    } else if (buffer.length < 40 || chunk.length < 25) {
      buffer = `${buffer} ${chunk}`;
    } else {
      cohesiveChunks.push(buffer);
      buffer = chunk;
    }
  }

  if (buffer.length > 0) {
    cohesiveChunks.push(buffer);
  }

  return cohesiveChunks.length > 0 ? cohesiveChunks : [cleaned];
}
