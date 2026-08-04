import { SubjectId } from '../types';

export interface PYQItem {
  id: string;
  topicId: string;
  topicTitle: string;
  chapterName: string;
  subjectId: SubjectId;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctAnswerId: string;
  explanation: string;
  year: number;
}

export const AUTHENTIC_NEET_PYQS: PYQItem[] = [
  // ==================== BIOLOGY PYQS ====================
  {
    id: 'pyq-bio-2025-1',
    topicId: 'topic-chap-bio-cell',
    topicTitle: 'Cell: The Unit of Life',
    chapterName: 'Cell: The Unit of Life',
    subjectId: 'biology',
    question: 'Which of the following cellular organelles is enclosed by a single membrane according to NCERT?',
    options: [
      { id: 'a', text: 'Lysosome and Vacuole' },
      { id: 'b', text: 'Mitochondria and Chloroplast' },
      { id: 'c', text: 'Nucleus and Endoplasmic Reticulum' },
      { id: 'd', text: 'Centrosome and Ribosome' }
    ],
    correctAnswerId: 'a',
    explanation: 'Lysosomes, vacuoles, and microbodies are single membrane-bound organellar structures. Mitochondria, chloroplasts, and nucleus are double membrane-bound, whereas ribosomes and centrosomes are non-membrane bound.',
    year: 2025
  },
  {
    id: 'pyq-bio-2024-1',
    topicId: 'topic-chap-bio-genetics',
    topicTitle: 'Molecular Basis of Inheritance',
    chapterName: 'Molecular Basis of Inheritance',
    subjectId: 'biology',
    question: 'In DNA replication, the unwinding of the double helix is catalyzed by which enzyme?',
    options: [
      { id: 'a', text: 'DNA Ligase' },
      { id: 'b', text: 'DNA Helicase' },
      { id: 'c', text: 'DNA Polymerase III' },
      { id: 'd', text: 'RNA Primase' }
    ],
    correctAnswerId: 'b',
    explanation: 'Helicase breaks the hydrogen bonds between complementary base pairs to unwind the double helix, creating the replication fork. DNA ligase joins Okazaki fragments.',
    year: 2024
  },
  {
    id: 'pyq-bio-2023-1',
    topicId: 'topic-chap-bio-photosynthesis',
    topicTitle: 'Photosynthesis in Higher Plants',
    chapterName: 'Photosynthesis in Higher Plants',
    subjectId: 'biology',
    question: 'In C4 plants, the primary CO2 acceptor and the first stable carbon fixation product are respectively:',
    options: [
      { id: 'a', text: 'PEP (Phosphoenolpyruvate) and OAA (Oxaloacetic acid)' },
      { id: 'b', text: 'RuBP and 3-PGA' },
      { id: 'c', text: 'OAA and Malic acid' },
      { id: 'd', text: 'RuBP and OAA' }
    ],
    correctAnswerId: 'a',
    explanation: 'In C4 plants, CO2 is accepted by 3-carbon PEP in mesophyll cells catalyzed by PEP carboxylase (PEPcase) to yield 4-carbon Oxaloacetic acid (OAA).',
    year: 2023
  },
  {
    id: 'pyq-bio-2022-1',
    topicId: 'topic-chap-bio-genetics',
    topicTitle: 'Principles of Inheritance & Variation',
    chapterName: 'Principles of Inheritance & Variation',
    subjectId: 'biology',
    question: 'A test cross is carried out to determine:',
    options: [
      { id: 'a', text: 'The genotype of a plant expressing dominant phenotype' },
      { id: 'b', text: 'The phenotype of F2 progeny' },
      { id: 'c', text: 'Whether two genes are linked' },
      { id: 'd', text: 'The number of alleles of a gene' }
    ],
    correctAnswerId: 'a',
    explanation: 'A test cross involves crossing an individual displaying a dominant phenotype with a homozygous recessive test parent to ascertain if the dominant individual is homozygous or heterozygous.',
    year: 2022
  },
  {
    id: 'pyq-bio-2021-1',
    topicId: 'topic-chap-bio-human-repro',
    topicTitle: 'Human Reproduction',
    chapterName: 'Human Reproduction',
    subjectId: 'biology',
    question: 'Which hormone reaches its peak level in the middle of the human menstrual cycle to induce ovulation?',
    options: [
      { id: 'a', text: 'Progesterone' },
      { id: 'b', text: 'Luteinizing Hormone (LH)' },
      { id: 'c', text: 'Estrogen only' },
      { id: 'd', text: 'Follicle Stimulating Hormone (FSH) only' }
    ],
    correctAnswerId: 'b',
    explanation: 'A sharp surge in LH (LH surge) around day 14 of a 28-day menstrual cycle causes rupture of the mature Graafian follicle and releases the ovum (ovulation).',
    year: 2021
  },
  {
    id: 'pyq-bio-2020-1',
    topicId: 'topic-chap-bio-biotech',
    topicTitle: 'Biotechnology: Principles and Processes',
    chapterName: 'Biotechnology: Principles and Processes',
    subjectId: 'biology',
    question: 'EcoRI is a restriction endonuclease enzyme. What does the "R" in EcoRI stand for?',
    options: [
      { id: 'a', text: 'Name of the genus' },
      { id: 'b', text: 'Name of the species' },
      { id: 'c', text: 'Name of the bacterial strain RY13' },
      { id: 'd', text: 'Order of discovery in the strain' }
    ],
    correctAnswerId: 'c',
    explanation: 'In EcoRI: "E" = Escherichia (genus), "co" = coli (species), "R" = strain RY13, "I" = first endonuclease isolated from this strain.',
    year: 2020
  },
  {
    id: 'pyq-bio-2019-1',
    topicId: 'topic-chap-bio-plant-physio',
    topicTitle: 'Plant Growth & Development',
    chapterName: 'Plant Growth & Development',
    subjectId: 'biology',
    question: 'Fruit ripening is facilitated and accelerated by which plant growth regulator?',
    options: [
      { id: 'a', text: 'Abscisic acid' },
      { id: 'b', text: 'Ethylene' },
      { id: 'c', text: 'Gibberellin GA3' },
      { id: 'd', text: 'Indole-3-acetic acid (IAA)' }
    ],
    correctAnswerId: 'b',
    explanation: 'Ethylene is a gaseous phytohormone that promotes respiratory climacteric and accelerates fruit ripening in apples, tomatoes, and bananas.',
    year: 2019
  },
  {
    id: 'pyq-bio-2018-1',
    topicId: 'topic-chap-bio-ecology',
    topicTitle: 'Organisms and Populations',
    chapterName: 'Organisms and Populations',
    subjectId: 'biology',
    question: 'In a growing population following a logistic growth model, dN/dt equals zero when:',
    options: [
      { id: 'a', text: 'N/K is equal to zero' },
      { id: 'b', text: 'N is equal to K (Carrying capacity)' },
      { id: 'c', text: 'N exceeds K' },
      { id: 'd', text: 'Intrinsic rate of natural increase (r) is zero' }
    ],
    correctAnswerId: 'b',
    explanation: 'In logistic growth equation dN/dt = rN(1 - N/K), when population density N reaches carrying capacity K, (1 - K/K) = 0, so dN/dt becomes 0.',
    year: 2018
  },
  {
    id: 'pyq-bio-2017-1',
    topicId: 'topic-chap-bio-digestion',
    topicTitle: 'Breathing and Exchange of Gases',
    chapterName: 'Breathing and Exchange of Gases',
    subjectId: 'biology',
    question: 'The partial pressure of oxygen in alveolar air (pO2) compared to that in deoxygenated blood is:',
    options: [
      { id: 'a', text: 'Higher (104 mmHg vs 40 mmHg)' },
      { id: 'b', text: 'Lower' },
      { id: 'c', text: 'Equal' },
      { id: 'd', text: 'Half' }
    ],
    correctAnswerId: 'a',
    explanation: 'Alveolar pO2 is 104 mmHg whereas pO2 in deoxygenated venous blood entering pulmonary capillaries is 40 mmHg, creating a steep gradient for oxygen diffusion into blood.',
    year: 2017
  },
  {
    id: 'pyq-bio-2016-1',
    topicId: 'topic-chap-bio-biomolecules',
    topicTitle: 'Biomolecules',
    chapterName: 'Biomolecules',
    subjectId: 'biology',
    question: 'A competitive inhibitor of an enzyme binds to:',
    options: [
      { id: 'a', text: 'Allosteric site and changes enzyme shape' },
      { id: 'b', text: 'Active site closely resembling substrate structure' },
      { id: 'c', text: 'Co-factor essential for catalytic activity' },
      { id: 'd', text: 'Enzyme-substrate complex' }
    ],
    correctAnswerId: 'b',
    explanation: 'Competitive inhibitors (e.g., malonate inhibiting succinic dehydrogenase) closely resemble substrate in molecular structure and compete for the active site, increasing Km without changing Vmax.',
    year: 2016
  },
  {
    id: 'pyq-bio-2015-1',
    topicId: 'topic-chap-bio-morphology',
    topicTitle: 'Morphology of Flowering Plants',
    chapterName: 'Morphology of Flowering Plants',
    subjectId: 'biology',
    question: 'In Bougainvillea, thorns are modified structures of:',
    options: [
      { id: 'a', text: 'Adventitious root' },
      { id: 'b', text: 'Stem (axillary bud)' },
      { id: 'c', text: 'Leaf lamina' },
      { id: 'd', text: 'Stipule' }
    ],
    correctAnswerId: 'b',
    explanation: 'Thorns in Bougainvillea and Citrus are modified axillary stems that provide protection against grazing herbivores.',
    year: 2015
  },

  // ==================== PHYSICS PYQS ====================
  {
    id: 'pyq-phy-2025-1',
    topicId: 'topic-chap-phy-units',
    topicTitle: 'Units, Dimensions & Error Analysis',
    chapterName: 'Units, Dimensions & Error Analysis',
    subjectId: 'physics',
    question: 'The dimensions of (1 / √(μ₀ ε₀)) in free space are identical to:',
    options: [
      { id: 'a', text: 'Velocity [M⁰ L¹ T⁻¹]' },
      { id: 'b', text: 'Acceleration [M⁰ L¹ T⁻²]' },
      { id: 'c', text: 'Force [M¹ L¹ T⁻²]' },
      { id: 'd', text: 'Wavelength [M⁰ L¹ T⁰]' }
    ],
    correctAnswerId: 'a',
    explanation: 'c = 1 / √(μ₀ ε₀) represents the speed of light in vacuum, which has dimensions of velocity: [L T⁻¹].',
    year: 2025
  },
  {
    id: 'pyq-phy-2024-1',
    topicId: 'topic-chap-phy-kinematics',
    topicTitle: 'Motion in a Straight Line',
    chapterName: 'Motion in a Straight Line',
    subjectId: 'physics',
    question: 'A ball is thrown vertically upwards with velocity v₀. The ratio of distances traveled in 1st second and 2nd second when dropped freely under gravity from rest is:',
    options: [
      { id: 'a', text: '1 : 3' },
      { id: 'b', text: '1 : 2' },
      { id: 'c', text: '1 : 4' },
      { id: 'd', text: '1 : 1' }
    ],
    correctAnswerId: 'a',
    explanation: 'According to Galileo’s law of odd numbers, successive distances traveled in equal time intervals starting from rest under gravity follow ratio 1 : 3 : 5 : 7.',
    year: 2024
  },
  {
    id: 'pyq-phy-2023-1',
    topicId: 'topic-chap-phy-current',
    topicTitle: 'Current Electricity',
    chapterName: 'Current Electricity',
    subjectId: 'physics',
    question: 'If the length of a uniform wire of resistance R is stretched uniformly to n times its initial length, its new resistance becomes:',
    options: [
      { id: 'a', text: 'n × R' },
      { id: 'b', text: 'n² × R' },
      { id: 'c', text: 'R / n²' },
      { id: 'd', text: 'R / n' }
    ],
    correctAnswerId: 'b',
    explanation: 'Volume V = A × L remains constant. When L’ = nL, area A’ = A/n. New resistance R’ = ρ L’/A’ = ρ (nL)/(A/n) = n² (ρ L/A) = n² R.',
    year: 2023
  },
  {
    id: 'pyq-phy-2022-1',
    topicId: 'topic-chap-phy-optics',
    topicTitle: 'Ray Optics & Optical Instruments',
    chapterName: 'Ray Optics & Optical Instruments',
    subjectId: 'physics',
    question: 'A convex lens of focal length f = 20 cm is placed in contact with a concave lens of focal length f = -40 cm. The focal length and nature of the combination are:',
    options: [
      { id: 'a', text: '+40 cm, Converging lens' },
      { id: 'b', text: '-40 cm, Diverging lens' },
      { id: 'c', text: '+20 cm, Converging lens' },
      { id: 'd', text: '-20 cm, Diverging lens' }
    ],
    correctAnswerId: 'a',
    explanation: '1/F = 1/f1 + 1/f2 = 1/20 - 1/40 = 1/40. Thus F = +40 cm. Positive focal length signifies a converging (convex) combination.',
    year: 2022
  },
  {
    id: 'pyq-phy-2021-1',
    topicId: 'topic-chap-phy-rotational',
    topicTitle: 'System of Particles & Rotational Motion',
    chapterName: 'System of Particles & Rotational Motion',
    subjectId: 'physics',
    question: 'The moment of inertia of a uniform solid sphere of mass M and radius R about its tangential axis is:',
    options: [
      { id: 'a', text: '(2/5) M R²' },
      { id: 'b', text: '(7/5) M R²' },
      { id: 'c', text: '(3/5) M R²' },
      { id: 'd', text: '(5/3) M R²' }
    ],
    correctAnswerId: 'b',
    explanation: 'By parallel axis theorem: I_tangent = I_cm + M R² = (2/5) M R² + M R² = (7/5) M R².',
    year: 2021
  },
  {
    id: 'pyq-phy-2020-1',
    topicId: 'topic-chap-phy-electrostatics',
    topicTitle: 'Electric Charges & Fields',
    chapterName: 'Electric Charges & Fields',
    subjectId: 'physics',
    question: 'A dipole of electric dipole moment p is placed in a uniform electric field E. The torque acting on the dipole is maximum when angle θ between p and E is:',
    options: [
      { id: 'a', text: '0°' },
      { id: 'b', text: '90°' },
      { id: 'c', text: '180°' },
      { id: 'd', text: '45°' }
    ],
    correctAnswerId: 'b',
    explanation: 'Torque τ = p × E = p E sin θ. Torque reaches its maximum value τ_max = p E when sin θ = 1, i.e., θ = 90°.',
    year: 2020
  },
  {
    id: 'pyq-phy-2019-1',
    topicId: 'topic-chap-phy-modern',
    topicTitle: 'Dual Nature of Radiation & Matter',
    chapterName: 'Dual Nature of Radiation & Matter',
    subjectId: 'physics',
    question: 'The de Broglie wavelength of an electron accelerated through a potential difference V volts is given by:',
    options: [
      { id: 'a', text: 'λ = 12.27 / √V Å' },
      { id: 'b', text: 'λ = 1.227 / V Å' },
      { id: 'c', text: 'λ = 122.7 / √V Å' },
      { id: 'd', text: 'λ = √V / 12.27 Å' }
    ],
    correctAnswerId: 'a',
    explanation: 'λ = h / p = h / √(2 m e V). Substituting values of h, m, and e yields λ = 12.27 / √V Å.',
    year: 2019
  },
  {
    id: 'pyq-phy-2018-1',
    topicId: 'topic-chap-phy-semiconductor',
    topicTitle: 'Semiconductor Electronics',
    chapterName: 'Semiconductor Electronics',
    subjectId: 'physics',
    question: 'In a p-n junction diode at reverse bias, the thickness of the depletion layer:',
    options: [
      { id: 'a', text: 'Decreases' },
      { id: 'b', text: 'Increases' },
      { id: 'c', text: 'Remains unchanged' },
      { id: 'd', text: 'Becomes zero' }
    ],
    correctAnswerId: 'b',
    explanation: 'In reverse bias, external voltage aids the built-in potential barrier, pulling majority charge carriers away from the junction and widening the depletion region.',
    year: 2018
  },
  {
    id: 'pyq-phy-2017-1',
    topicId: 'topic-chap-phy-thermo',
    topicTitle: 'Thermodynamics',
    chapterName: 'Thermodynamics',
    subjectId: 'physics',
    question: 'Efficiency of an ideal Carnot engine working between temperatures T1 (source, 500 K) and T2 (sink, 300 K) is:',
    options: [
      { id: 'a', text: '40%' },
      { id: 'b', text: '60%' },
      { id: 'c', text: '20%' },
      { id: 'd', text: '50%' }
    ],
    correctAnswerId: 'a',
    explanation: 'Carnot efficiency η = 1 - T2 / T1 = 1 - 300/500 = 200/500 = 0.40 or 40%.',
    year: 2017
  },
  {
    id: 'pyq-phy-2016-1',
    topicId: 'topic-chap-phy-waves',
    topicTitle: 'Waves & Oscillations',
    chapterName: 'Waves & Oscillations',
    subjectId: 'physics',
    question: 'The fundamental frequency of a closed organ pipe of length L is f. If opened at both ends, its fundamental frequency becomes:',
    options: [
      { id: 'a', text: 'f' },
      { id: 'b', text: '2 f' },
      { id: 'c', text: 'f / 2' },
      { id: 'd', text: '4 f' }
    ],
    correctAnswerId: 'b',
    explanation: 'For closed organ pipe f_closed = v / (4 L). For open organ pipe f_open = v / (2 L) = 2 × f_closed.',
    year: 2016
  },
  {
    id: 'pyq-phy-2015-1',
    topicId: 'topic-chap-phy-gravitation',
    topicTitle: 'Gravitation',
    chapterName: 'Gravitation',
    subjectId: 'physics',
    question: 'The acceleration due to gravity at a depth d below the Earth’s surface (where R is Earth radius) is:',
    options: [
      { id: 'a', text: 'g’ = g (1 - d/R)' },
      { id: 'b', text: 'g’ = g (1 - 2d/R)' },
      { id: 'c', text: 'g’ = g / (1 + d/R)²' },
      { id: 'd', text: 'g’ = g (1 + d/R)' }
    ],
    correctAnswerId: 'a',
    explanation: 'Inside the Earth at depth d, effective mass producing gravity is within radius (R - d). Thus g’ = g (1 - d/R), reducing linearly to zero at Earth center.',
    year: 2015
  },

  // ==================== CHEMISTRY PYQS ====================
  {
    id: 'pyq-chem-2025-1',
    topicId: 'topic-chap-chem-bonding',
    topicTitle: 'Chemical Bonding & Molecular Structure',
    chapterName: 'Chemical Bonding & Molecular Structure',
    subjectId: 'chemistry',
    question: 'Which of the following species is diamagnetic and has a bond order of 3 according to Molecular Orbital Theory?',
    options: [
      { id: 'a', text: 'N₂ molecule' },
      { id: 'b', text: 'O₂ molecule' },
      { id: 'c', text: 'O₂⁻ superoxide ion' },
      { id: 'd', text: 'NO molecule' }
    ],
    correctAnswerId: 'a',
    explanation: 'N₂ has 14 electrons. Its MO configuration has zero unpaired electrons (diamagnetic) and bond order = (Nb - Na)/2 = (10 - 4)/2 = 3.',
    year: 2025
  },
  {
    id: 'pyq-chem-2024-1',
    topicId: 'topic-chap-chem-coord',
    topicTitle: 'Coordination Compounds',
    chapterName: 'Coordination Compounds',
    subjectId: 'chemistry',
    question: 'The hybridization, geometry, and magnetic behavior of [Fe(CN)₆]³⁻ complex ion are:',
    options: [
      { id: 'a', text: 'd²sp³, Octahedral, Paramagnetic (1 unpaired electron)' },
      { id: 'b', text: 'sp³d², Octahedral, Diamagnetic' },
      { id: 'c', text: 'sp³, Tetrahedral, Paramagnetic' },
      { id: 'd', text: 'dsp², Square planar, Diamagnetic' }
    ],
    correctAnswerId: 'a',
    explanation: 'Fe³⁺ is a d⁵ system. Strong field CN⁻ ligand forces pairing leaving 1 unpaired electron in t2g set, resulting in d²sp³ inner orbital octahedral paramagnetic complex.',
    year: 2024
  },
  {
    id: 'pyq-chem-2023-1',
    topicId: 'topic-chap-chem-organic',
    topicTitle: 'Organic Chemistry: Basic Principles & Techniques',
    chapterName: 'Organic Chemistry: Basic Principles & Techniques',
    subjectId: 'chemistry',
    question: 'Which of the following carbocations is most stable due to hyperconjugation and inductive effect?',
    options: [
      { id: 'a', text: '(CH₃)₃C⁺ (tert-Butyl carbocation)' },
      { id: 'b', text: '(CH₃)₂CH⁺ (Isopropyl carbocation)' },
      { id: 'c', text: 'CH₃CH₂⁺ (Ethyl carbocation)' },
      { id: 'd', text: 'CH₃⁺ (Methyl carbocation)' }
    ],
    correctAnswerId: 'a',
    explanation: '(CH₃)₃C⁺ has 9 alpha-hydrogens providing maximum hyperconjugative stabilization along with +I effect of three methyl groups.',
    year: 2023
  },
  {
    id: 'pyq-chem-2022-1',
    topicId: 'topic-chap-chem-electrochem',
    topicTitle: 'Electrochemistry',
    chapterName: 'Electrochemistry',
    subjectId: 'chemistry',
    question: 'The molar conductivity of a weak electrolyte CH₃COOH at infinite dilution Λ°m is equal to:',
    options: [
      { id: 'a', text: 'λ°(CH₃COO⁻) + λ°(H⁺)' },
      { id: 'b', text: 'λ°(CH₃COONa) + λ°(HCl) - λ°(NaCl)' },
      { id: 'c', text: 'Both A and B according to Kohlrausch Law' },
      { id: 'd', text: 'λ°(CH₃COONa) - λ°(HCl)' }
    ],
    correctAnswerId: 'c',
    explanation: 'According to Kohlrausch’s law of independent migration of ions, Λ°m(CH₃COOH) = λ°(CH₃COO⁻) + λ°(H⁺) = Λ°m(CH₃COONa) + Λ°m(HCl) - Λ°m(NaCl).',
    year: 2022
  },
  {
    id: 'pyq-chem-2021-1',
    topicId: 'topic-chap-chem-kinetics',
    topicTitle: 'Chemical Kinetics',
    chapterName: 'Chemical Kinetics',
    subjectId: 'chemistry',
    question: 'For a first order reaction, the half-life period t_1/2 is independent of:',
    options: [
      { id: 'a', text: 'Temperature' },
      { id: 'b', text: 'Initial concentration of reactant' },
      { id: 'c', text: 'Rate constant k' },
      { id: 'd', text: 'Activation energy' }
    ],
    correctAnswerId: 'b',
    explanation: 'For a first order reaction t_1/2 = 0.693 / k. It does not depend on the initial reactant concentration [A]₀.',
    year: 2021
  },
  {
    id: 'pyq-chem-2020-1',
    topicId: 'topic-chap-chem-pblock',
    topicTitle: 'p-Block Elements',
    chapterName: 'p-Block Elements',
    subjectId: 'chemistry',
    question: 'Which of the following oxoacids of phosphorus contains a P-P bond?',
    options: [
      { id: 'a', text: 'Pyrophosphoric acid (H₄P₂O₇)' },
      { id: 'b', text: 'Hypophosphoric acid (H₄P₂O₆)' },
      { id: 'c', text: 'Orthophosphoric acid (H₃PO₄)' },
      { id: 'd', text: 'Pyrophosphorous acid (H₄P₂O₅)' }
    ],
    correctAnswerId: 'b',
    explanation: 'Hypophosphoric acid H₄P₂O₆ contains a direct P-P single bond with phosphorus in +IV oxidation state.',
    year: 2020
  },
  {
    id: 'pyq-chem-2019-1',
    topicId: 'topic-chap-chem-equilibrium',
    topicTitle: 'Equilibrium',
    chapterName: 'Equilibrium',
    subjectId: 'chemistry',
    question: 'The pH of a 0.01 M NaOH solution at 25°C is:',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '12' },
      { id: 'c', text: '10' },
      { id: 'd', text: '14' }
    ],
    correctAnswerId: 'b',
    explanation: '[OH⁻] = 10⁻² M. pOH = -log[OH⁻] = 2. Since pH + pOH = 14, pH = 14 - 2 = 12.',
    year: 2019
  },
  {
    id: 'pyq-chem-2018-1',
    topicId: 'topic-chap-chem-aldehydes',
    topicTitle: 'Aldehydes, Ketones & Carboxylic Acids',
    chapterName: 'Aldehydes, Ketones & Carboxylic Acids',
    subjectId: 'chemistry',
    question: 'Which of the following compounds gives a yellow precipitate of iodoform when warmed with I₂ and NaOH?',
    options: [
      { id: 'a', text: 'Ethanol (CH₃CH₂OH)' },
      { id: 'b', text: 'Methanol (CH₃OH)' },
      { id: 'c', text: 'Benzaldehyde (C₆H₅CHO)' },
      { id: 'd', text: 'Propan-1-ol (CH₃CH₂CH₂OH)' }
    ],
    correctAnswerId: 'a',
    explanation: 'Ethanol is oxidized by NaOI to acetaldehyde (CH₃CHO), which contains the CH₃C=O group essential for giving positive iodoform test (CHI₃ yellow ppt).',
    year: 2018
  },
  {
    id: 'pyq-chem-2017-1',
    topicId: 'topic-chap-chem-solutions',
    topicTitle: 'Solutions',
    chapterName: 'Solutions',
    subjectId: 'chemistry',
    question: 'Which of the following liquid mixtures exhibits a positive deviation from Raoult’s law?',
    options: [
      { id: 'a', text: 'Ethanol and Acetone' },
      { id: 'b', text: 'Phenol and Aniline' },
      { id: 'c', text: 'Chloroform and Acetone' },
      { id: 'd', text: 'Nitric acid and Water' }
    ],
    correctAnswerId: 'a',
    explanation: 'In ethanol + acetone mixture, acetone molecules get in between ethanol molecules and break H-bonds, weakening solute-solvent interactions and producing positive deviation.',
    year: 2017
  },
  {
    id: 'pyq-chem-2016-1',
    topicId: 'topic-chap-chem-periodic',
    topicTitle: 'Classification of Elements & Periodicity',
    chapterName: 'Classification of Elements & Periodicity',
    subjectId: 'chemistry',
    question: 'The correct order of increasing ionic radius among N³⁻, O²⁻, and F⁻ is:',
    options: [
      { id: 'a', text: 'F⁻ < O²⁻ < N³⁻' },
      { id: 'b', text: 'N³⁻ < O²⁻ < F⁻' },
      { id: 'c', text: 'O²⁻ < F⁻ < N³⁻' },
      { id: 'd', text: 'F⁻ < N³⁻ < O²⁻' }
    ],
    correctAnswerId: 'a',
    explanation: 'For isoelectronic species (10 electrons), higher nuclear charge Z pulls electrons closer. Nuclear charge: F (Z=9) > O (Z=8) > N (Z=7). Hence radius: F⁻ < O²⁻ < N³⁻.',
    year: 2016
  },
  {
    id: 'pyq-chem-2015-1',
    topicId: 'topic-chap-chem-states',
    topicTitle: 'Structure of Atom',
    chapterName: 'Structure of Atom',
    subjectId: 'chemistry',
    question: 'The maximum number of electrons in a subshell with azimuthal quantum number l = 3 is:',
    options: [
      { id: 'a', text: '14 (f-subshell)' },
      { id: 'b', text: '10 (d-subshell)' },
      { id: 'c', text: '6 (p-subshell)' },
      { id: 'd', text: '2 (s-subshell)' }
    ],
    correctAnswerId: 'a',
    explanation: 'Max electrons = 2(2l + 1). For l = 3, max electrons = 2(2(3) + 1) = 2(7) = 14 electrons (f subshell).',
    year: 2015
  }
];
