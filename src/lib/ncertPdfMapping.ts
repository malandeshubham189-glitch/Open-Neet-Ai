/**
 * Helper to generate direct NCERT textbook PDF URLs and fallback URLs
 * Pattern: https://ncert.nic.in/textbook/pdf/{bookcode}{chapter:2digits}.pdf
 */

export interface NcertPdfInfo {
  pdfUrl: string;
  fallbackUrl: string;
  bookCode: string;
  chapterNumStr: string;
  expectedSubjectKeyword?: string;
  expectedTitleKeyword?: string;
}

// Map chapter names or chapter numbers to exact NCERT book codes and chapter filenames
export function getNCERTChapterPdfInfo(
  subjectId: string,
  classLevel: string,
  chapterName: string,
  chapterIndexSuggestion?: number
): NcertPdfInfo {
  const isClass11 = classLevel.toLowerCase().includes('11');
  const subj = subjectId.toLowerCase();
  const nameLower = chapterName.toLowerCase();

  // Extract explicit chapter number if present
  let numMatch = chapterName.match(/chapter\s*(\d+)/i) || chapterName.match(/^(\d+)\./);
  let rawChNum = numMatch ? parseInt(numMatch[1], 10) : (chapterIndexSuggestion || 1);

  let fileCode = '';
  let expectedSubject = subj;
  let expectedKeyword = '';

  if (subj === 'physics') {
    expectedSubject = 'physics';
    if (isClass11 || rawChNum <= 16) {
      // Class 11 Physics (Chapters 1 to 16 in curriculum)
      if (nameLower.includes('units') || nameLower.includes('error') || rawChNum === 1) {
        fileCode = 'keph101';
        expectedKeyword = 'units';
      } else if (nameLower.includes('vector') || nameLower.includes('basic math') || rawChNum === 2) {
        fileCode = 'keph101';
        expectedKeyword = 'motion';
      } else if (nameLower.includes('straight line') || rawChNum === 3) {
        fileCode = 'keph102';
        expectedKeyword = 'motion';
      } else if (nameLower.includes('plane') || nameLower.includes('projectile') || rawChNum === 4) {
        fileCode = 'keph103';
        expectedKeyword = 'plane';
      } else if (nameLower.includes('newton') || nameLower.includes('friction') || nameLower.includes('laws of motion') || rawChNum === 5) {
        fileCode = 'keph104';
        expectedKeyword = 'laws';
      } else if (nameLower.includes('work') || nameLower.includes('energy') || rawChNum === 6) {
        fileCode = 'keph105';
        expectedKeyword = 'work';
      } else if (nameLower.includes('centre of mass') || nameLower.includes('collisions') || rawChNum === 7) {
        fileCode = 'keph106';
        expectedKeyword = 'system';
      } else if (nameLower.includes('rotation') || nameLower.includes('particles') || rawChNum === 8) {
        fileCode = 'keph107';
        expectedKeyword = 'system';
      } else if (nameLower.includes('gravitation') || rawChNum === 9) {
        fileCode = 'keph201';
        expectedKeyword = 'gravitation';
      } else if (nameLower.includes('solids') || rawChNum === 10) {
        fileCode = 'keph201';
        expectedKeyword = 'solids';
      } else if (nameLower.includes('fluids') || rawChNum === 11) {
        fileCode = 'keph202';
        expectedKeyword = 'fluids';
      } else if (nameLower.includes('thermal') || rawChNum === 12) {
        fileCode = 'keph203';
        expectedKeyword = 'thermal';
      } else if (nameLower.includes('thermodynamics') || rawChNum === 13) {
        fileCode = 'keph204';
        expectedKeyword = 'thermodynamics';
      } else if (nameLower.includes('kinetic') || rawChNum === 14) {
        fileCode = 'keph205';
        expectedKeyword = 'kinetic';
      } else if (nameLower.includes('oscillation') || nameLower.includes('harmonic') || rawChNum === 15) {
        fileCode = 'keph206';
        expectedKeyword = 'oscillations';
      } else if (nameLower.includes('waves') || nameLower.includes('sound') || rawChNum === 16) {
        fileCode = 'keph207';
        expectedKeyword = 'waves';
      } else {
        fileCode = rawChNum <= 7 ? `keph1${String(rawChNum).padStart(2, '0')}` : `keph2${String(Math.min(rawChNum - 7, 7)).padStart(2, '0')}`;
      }
    } else {
      // Class 12 Physics (Chapters 17 to 30 in curriculum)
      if (nameLower.includes('charge') || nameLower.includes('fields') || rawChNum === 17) {
        fileCode = 'leph101';
        expectedKeyword = 'electric';
      } else if (nameLower.includes('potential') || nameLower.includes('capacitance') || rawChNum === 18) {
        fileCode = 'leph102';
        expectedKeyword = 'potential';
      } else if (nameLower.includes('current electricity') || rawChNum === 19) {
        fileCode = 'leph103';
        expectedKeyword = 'current';
      } else if (nameLower.includes('moving charges') || nameLower.includes('magnetism') && !nameLower.includes('matter') || rawChNum === 20) {
        fileCode = 'leph104';
        expectedKeyword = 'moving';
      } else if (nameLower.includes('magnetism & matter') || nameLower.includes('magnetism and matter') || rawChNum === 21) {
        fileCode = 'leph105';
        expectedKeyword = 'magnetism';
      } else if (nameLower.includes('induction') || rawChNum === 22) {
        fileCode = 'leph106';
        expectedKeyword = 'induction';
      } else if (nameLower.includes('alternating') || nameLower.includes('ac') || rawChNum === 23) {
        fileCode = 'leph107';
        expectedKeyword = 'alternating';
      } else if (nameLower.includes('electromagnetic waves') || rawChNum === 24) {
        fileCode = 'leph108';
        expectedKeyword = 'waves';
      } else if (nameLower.includes('ray optics') || rawChNum === 25) {
        fileCode = 'leph201';
        expectedKeyword = 'optics';
      } else if (nameLower.includes('wave optics') || rawChNum === 26) {
        fileCode = 'leph202';
        expectedKeyword = 'optics';
      } else if (nameLower.includes('dual nature') || rawChNum === 27) {
        fileCode = 'leph203';
        expectedKeyword = 'dual';
      } else if (nameLower.includes('atoms') || rawChNum === 28) {
        fileCode = 'leph204';
        expectedKeyword = 'atoms';
      } else if (nameLower.includes('nuclei') || rawChNum === 29) {
        fileCode = 'leph205';
        expectedKeyword = 'nuclei';
      } else if (nameLower.includes('semiconductor') || rawChNum === 30) {
        fileCode = 'leph206';
        expectedKeyword = 'semiconductor';
      } else {
        const cNum = rawChNum > 16 ? rawChNum - 16 : rawChNum;
        fileCode = cNum <= 8 ? `leph1${String(cNum).padStart(2, '0')}` : `leph2${String(cNum - 8).padStart(2, '0')}`;
      }
    }
  } else if (subj === 'chemistry') {
    expectedSubject = 'chemistry';
    // Class 11 & 12 Chemistry
    if (nameLower.includes('mole concept') || nameLower.includes('basic concepts of chemistry')) {
      fileCode = 'kech101';
      expectedKeyword = 'concepts';
    } else if (nameLower.includes('structure of atom') || nameLower.includes('atomic structure')) {
      fileCode = 'kech102';
      expectedKeyword = 'atom';
    } else if (nameLower.includes('periodicity') || nameLower.includes('classification of elements')) {
      fileCode = 'kech103';
      expectedKeyword = 'elements';
    } else if (nameLower.includes('bonding')) {
      fileCode = 'kech104';
      expectedKeyword = 'bonding';
    } else if (nameLower.includes('thermodynamics')) {
      fileCode = 'kech105';
      expectedKeyword = 'thermodynamics';
    } else if (nameLower.includes('equilibrium')) {
      fileCode = 'kech106';
      expectedKeyword = 'equilibrium';
    } else if (nameLower.includes('redox')) {
      fileCode = 'kech201';
      expectedKeyword = 'redox';
    } else if (nameLower.includes('goc') || nameLower.includes('organic chemistry') || nameLower.includes('iupac') || nameLower.includes('isomerism')) {
      fileCode = 'kech206';
      expectedKeyword = 'organic';
    } else if (nameLower.includes('hydrocarbons')) {
      fileCode = 'kech207';
      expectedKeyword = 'hydrocarbons';
    } else if (nameLower.includes('solutions')) {
      fileCode = 'lech101';
      expectedKeyword = 'solutions';
    } else if (nameLower.includes('electrochemistry')) {
      fileCode = 'lech102';
      expectedKeyword = 'electrochemistry';
    } else if (nameLower.includes('kinetics')) {
      fileCode = 'lech103';
      expectedKeyword = 'kinetics';
    } else if (nameLower.includes('p-block')) {
      fileCode = 'lech101';
      expectedKeyword = 'p-block';
    } else if (nameLower.includes('d- and f-block') || nameLower.includes('d and f')) {
      fileCode = 'lech104';
      expectedKeyword = 'block';
    } else if (nameLower.includes('coordination')) {
      fileCode = 'lech105';
      expectedKeyword = 'coordination';
    } else if (nameLower.includes('haloalkanes')) {
      fileCode = 'lech201';
      expectedKeyword = 'haloalkanes';
    } else if (nameLower.includes('alcohols') || nameLower.includes('phenols')) {
      fileCode = 'lech202';
      expectedKeyword = 'alcohols';
    } else if (nameLower.includes('aldehydes') || nameLower.includes('carboxylic')) {
      fileCode = 'lech203';
      expectedKeyword = 'aldehydes';
    } else if (nameLower.includes('amines')) {
      fileCode = 'lech204';
      expectedKeyword = 'amines';
    } else if (nameLower.includes('biomolecules')) {
      fileCode = 'lech205';
      expectedKeyword = 'biomolecules';
    } else {
      fileCode = isClass11 ? `kech1${String(Math.min(rawChNum, 6)).padStart(2, '0')}` : `lech2${String(Math.min(rawChNum, 5)).padStart(2, '0')}`;
    }
  } else if (subj === 'biology') {
    expectedSubject = 'biology';
    // Class 11 & 12 Biology
    if (nameLower.includes('living world')) {
      fileCode = 'kebo101';
    } else if (nameLower.includes('biological classification')) {
      fileCode = 'kebo102';
    } else if (nameLower.includes('plant kingdom')) {
      fileCode = 'kebo103';
    } else if (nameLower.includes('animal kingdom')) {
      fileCode = 'kebo104';
    } else if (nameLower.includes('morphology')) {
      fileCode = 'kebo105';
    } else if (nameLower.includes('anatomy of flowering')) {
      fileCode = 'kebo106';
    } else if (nameLower.includes('structural organisation in animals')) {
      fileCode = 'kebo107';
    } else if (nameLower.includes('cell: the unit of life') || nameLower.includes('cell unit')) {
      fileCode = 'kebo108';
    } else if (nameLower.includes('biomolecules zoology') || (nameLower.includes('biomolecules') && subj === 'biology')) {
      fileCode = 'kebo109';
    } else if (nameLower.includes('cell cycle')) {
      fileCode = 'kebo110';
    } else if (nameLower.includes('photosynthesis')) {
      fileCode = 'kebo113';
    } else if (nameLower.includes('respiration in plants')) {
      fileCode = 'kebo114';
    } else if (nameLower.includes('plant growth')) {
      fileCode = 'kebo115';
    } else if (nameLower.includes('breathing')) {
      fileCode = 'kebo117';
    } else if (nameLower.includes('body fluids') || nameLower.includes('circulation')) {
      fileCode = 'kebo118';
    } else if (nameLower.includes('excretory')) {
      fileCode = 'kebo119';
    } else if (nameLower.includes('locomotion')) {
      fileCode = 'kebo120';
    } else if (nameLower.includes('neural control')) {
      fileCode = 'kebo121';
    } else if (nameLower.includes('chemical coordination')) {
      fileCode = 'kebo122';
    } else if (nameLower.includes('sexual reproduction in flowering')) {
      fileCode = 'lebo102';
    } else if (nameLower.includes('human reproduction')) {
      fileCode = 'lebo103';
    } else if (nameLower.includes('reproductive health')) {
      fileCode = 'lebo104';
    } else if (nameLower.includes('principles of inheritance')) {
      fileCode = 'lebo105';
    } else if (nameLower.includes('molecular basis')) {
      fileCode = 'lebo106';
    } else if (nameLower.includes('evolution')) {
      fileCode = 'lebo107';
    } else if (nameLower.includes('human health')) {
      fileCode = 'lebo108';
    } else if (nameLower.includes('microbes')) {
      fileCode = 'lebo110';
    } else if (nameLower.includes('biotechnology: principles')) {
      fileCode = 'lebo111';
    } else if (nameLower.includes('biotechnology and its applications')) {
      fileCode = 'lebo112';
    } else if (nameLower.includes('organisms and populations')) {
      fileCode = 'lebo113';
    } else if (nameLower.includes('ecosystem')) {
      fileCode = 'lebo114';
    } else if (nameLower.includes('biodiversity')) {
      fileCode = 'lebo115';
    } else {
      fileCode = isClass11 ? `kebo1${String(Math.min(rawChNum, 22)).padStart(2, '0')}` : `lebo1${String(Math.min(rawChNum, 16)).padStart(2, '0')}`;
    }
  } else {
    fileCode = isClass11 ? 'kebo101' : 'lebo101';
  }

  const bookCode = fileCode.slice(0, 5);
  const chapterNumStr = fileCode.slice(5);

  const pdfUrl = `https://ncert.nic.in/textbook/pdf/${fileCode}.pdf`;
  const fallbackUrl = `https://ncert.nic.in/textbook.php?${bookCode}=${parseInt(chapterNumStr, 10)}-20`;

  return {
    pdfUrl,
    fallbackUrl,
    bookCode,
    chapterNumStr,
    expectedSubjectKeyword: expectedSubject,
    expectedTitleKeyword: expectedKeyword
  };
}

