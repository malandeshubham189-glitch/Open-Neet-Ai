import { DiagramSpec } from '../types/diagram';

export const VERIFIED_DIAGRAM_LIBRARY: Record<string, DiagramSpec> = {
  heart: {
    id: 'human-heart-circulation',
    diagramType: 'anatomical',
    title: 'NCERT Class 11: Sectional View of Human Heart & Blood Circulation',
    subtitle: 'Anatomical chambers, one-way valves, systemic & pulmonary circulation pathways',
    view: 'Sectional Coronal View (Simplified Educational Diagram)',
    isSimplified: true,
    ncertReference: 'NCERT Class 11 Biology — Chapter 18: Body Fluids and Circulation (Figure 18.2)',
    viewBox: { minX: 0, minY: 0, width: 800, height: 520 },
    regions: [
      // Outer Pericardium / Cardiac Muscle Contour
      {
        id: 'cardiac_wall',
        pathD: 'M 400 90 C 230 110, 190 270, 310 470 C 360 510, 440 510, 490 470 C 610 270, 570 110, 400 90 Z',
        fill: '#fecdd3',
        stroke: '#e11d48',
        strokeWidth: 4,
        opacity: 0.95
      },
      // Right Atrium Interior Chamber (Deoxygenated - Blue)
      {
        id: 'ra_cavity',
        pathD: 'M 255 160 C 255 130, 345 140, 345 220 C 345 250, 260 250, 255 160 Z',
        fill: '#bfdbfe',
        stroke: '#2563eb',
        strokeWidth: 3,
        opacity: 0.9
      },
      // Left Atrium Interior Chamber (Oxygenated - Red)
      {
        id: 'la_cavity',
        pathD: 'M 455 160 C 455 130, 545 140, 545 220 C 545 250, 455 250, 455 160 Z',
        fill: '#fecaca',
        stroke: '#dc2626',
        strokeWidth: 3,
        opacity: 0.9
      },
      // Right Ventricle Chamber (Deoxygenated)
      {
        id: 'rv_cavity',
        pathD: 'M 270 260 C 270 260, 375 260, 375 425 C 300 405, 260 325, 270 260 Z',
        fill: '#93c5fd',
        stroke: '#1d4ed8',
        strokeWidth: 3,
        opacity: 0.9
      },
      // Left Ventricle Chamber (Oxygenated - Thick Muscular Wall)
      {
        id: 'lv_cavity',
        pathD: 'M 425 260 C 425 260, 530 260, 520 330 C 510 405, 430 435, 425 425 Z',
        fill: '#f87171',
        stroke: '#b91c1c',
        strokeWidth: 3,
        opacity: 0.9
      }
    ],
    nodes: [
      // 1. Superior Vena Cava
      {
        id: 'svc',
        label: 'Superior Vena Cava (SVC)',
        sublabel: 'Deoxygenated blood from upper body',
        category: 'deoxygenated',
        x: 270,
        y: 60,
        shape: 'capsule',
        width: 170,
        height: 38,
        color: '#2563eb',
        details: {
          functionEn: 'Brings deoxygenated blood from head, neck, and upper limbs into Right Atrium.',
          functionHinglish: 'Upper body (head/chest/arms) se deoxygenated (CO2-rich) blood Right Atrium me lata hai.',
          ncertNote: 'Opens into postero-superior part of right atrium; no functioning valve in adult.'
        },
        leaderLine: { targetX: 280, targetY: 130, labelSide: 'left' }
      },
      // 2. Inferior Vena Cava
      {
        id: 'ivc',
        label: 'Inferior Vena Cava (IVC)',
        sublabel: 'Deoxygenated blood from lower body',
        category: 'deoxygenated',
        x: 230,
        y: 430,
        shape: 'capsule',
        width: 170,
        height: 38,
        color: '#2563eb',
        details: {
          functionEn: 'Brings deoxygenated blood from abdomen, pelvis, and lower limbs into Right Atrium.',
          functionHinglish: 'Lower body (legs, abdomen) se deoxygenated blood Right Atrium me deliver karta hai.',
          ncertNote: 'Largest vein in human body; guarded by Eustachian valve in fetus.'
        },
        leaderLine: { targetX: 290, targetY: 245, labelSide: 'left' }
      },
      // 3. Right Atrium
      {
        id: 'right_atrium',
        label: 'Right Atrium (RA)',
        sublabel: 'Receives deox blood from vena cava',
        category: 'deoxygenated',
        x: 300,
        y: 190,
        shape: 'circle',
        r: 28,
        color: '#1d4ed8',
        details: {
          functionEn: 'Thin-walled upper right chamber. Receives venous return from SVC, IVC, and Coronary Sinus.',
          functionHinglish: 'Upper right chamber jo CO2-rich blood accept karta hai aur Tricuspid valve ke raste RV me bhejta hai.',
          ncertNote: 'Contains SA Node (natural pacemaker) near the opening of superior vena cava.'
        }
      },
      // 4. Tricuspid Valve
      {
        id: 'tricuspid_valve',
        label: 'Tricuspid Valve',
        sublabel: '3 Cusps / Flaps (Right AV Valve)',
        category: 'valve',
        x: 320,
        y: 260,
        shape: 'rect',
        width: 32,
        height: 18,
        color: '#d97706',
        details: {
          functionEn: 'Atrioventricular valve with 3 cusps between RA and RV. Prevents backflow into RA during ventricular systole.',
          functionHinglish: 'Right Atrium aur Right Ventricle ke beech 3 cusps wala valve jo blood ka backflow rokkta hai.',
          ncertNote: 'Anchored by chordae tendineae attached to papillary muscles in the ventricle.'
        },
        leaderLine: { targetX: 320, targetY: 260, labelSide: 'left' }
      },
      // 5. Right Ventricle
      {
        id: 'right_ventricle',
        label: 'Right Ventricle (RV)',
        sublabel: 'Pumps deox blood to Lungs',
        category: 'deoxygenated',
        x: 320,
        y: 350,
        shape: 'circle',
        r: 32,
        color: '#1e40af',
        details: {
          functionEn: 'Pumps deoxygenated blood through the pulmonary semilunar valve into Pulmonary Artery toward lungs.',
          functionHinglish: 'Chamber jo deoxygenated blood ko Pulmonary Artery me pump karta hai taaki Lungs me oxygen mil sake.',
          ncertNote: 'Generates low-pressure circulation (~25 mmHg) to protect pulmonary capillary beds.'
        }
      },
      // 6. Pulmonary Artery
      {
        id: 'pulmonary_artery',
        label: 'Pulmonary Artery (PA)',
        sublabel: 'Deox blood to Both Lungs (Exception!)',
        category: 'deoxygenated',
        x: 370,
        y: 80,
        shape: 'capsule',
        width: 180,
        height: 38,
        color: '#0284c7',
        details: {
          functionEn: 'Exception Artery! Carries deoxygenated blood from RV to left and right lungs for gas exchange.',
          functionHinglish: 'NEET Exception! Ye ekmatra artery hai jo Deoxygenated (CO2) blood RV se Lungs tak le jaati hai.',
          ncertNote: 'Guarded at its base by the Pulmonary Semilunar valve.'
        },
        leaderLine: { targetX: 370, targetY: 130, labelSide: 'left' }
      },
      // 7. Pulmonary Veins
      {
        id: 'pulmonary_veins',
        label: 'Pulmonary Veins (4x)',
        sublabel: 'Oxygenated blood from Lungs',
        category: 'oxygenated',
        x: 630,
        y: 160,
        shape: 'capsule',
        width: 170,
        height: 38,
        color: '#dc2626',
        details: {
          functionEn: 'Exception Vein! 4 veins (2 from each lung) carry fresh OXYGENATED blood into Left Atrium.',
          functionHinglish: 'Exception Vein! Lungs se O2-rich (pure) blood ko Left Atrium tak pahuchati hain.',
          ncertNote: 'Open directly into posterior wall of Left Atrium; do not have valves.'
        },
        leaderLine: { targetX: 535, targetY: 185, labelSide: 'right' }
      },
      // 8. Left Atrium
      {
        id: 'left_atrium',
        label: 'Left Atrium (LA)',
        sublabel: 'Receives oxygenated blood',
        category: 'oxygenated',
        x: 500,
        y: 190,
        shape: 'circle',
        r: 28,
        color: '#dc2626',
        details: {
          functionEn: 'Receives purified oxygen-rich blood from pulmonary veins and delivers it to Left Ventricle.',
          functionHinglish: 'Upper left chamber jo oxygen-rich blood receive karke Bicuspid valve se LV me bhejta hai.',
          ncertNote: 'Forms the posterior surface/base of the heart.'
        }
      },
      // 9. Bicuspid / Mitral Valve
      {
        id: 'bicuspid_valve',
        label: 'Bicuspid (Mitral) Valve',
        sublabel: '2 Cusps (Left AV Valve)',
        category: 'valve',
        x: 480,
        y: 260,
        shape: 'rect',
        width: 32,
        height: 18,
        color: '#d97706',
        details: {
          functionEn: 'Two-cusped valve between LA and LV. Prevents backflow into LA during strong ventricular contraction.',
          functionHinglish: 'Left Atrium aur Left Ventricle ke beech 2 flaps wala valve. Also called Mitral Valve.',
          ncertNote: 'Most prone to rheumatic heart disease valvular damage in clinical questions.'
        },
        leaderLine: { targetX: 480, targetY: 260, labelSide: 'right' }
      },
      // 10. Left Ventricle
      {
        id: 'left_ventricle',
        label: 'Left Ventricle (LV)',
        sublabel: 'Thickest Muscle Wall (Systemic Pump)',
        category: 'oxygenated',
        x: 475,
        y: 350,
        shape: 'circle',
        r: 34,
        color: '#b91c1c',
        details: {
          functionEn: 'Chamber with the thickest myocardial wall (3x thicker than RV). Pumps oxygenated blood through Aorta to systemic circulation.',
          functionHinglish: 'Heart ka sabse thick wall wala chamber! High pressure (~120 mmHg) generate karke poori body me blood bhejta hai.',
          ncertNote: 'Forms the apex of the human heart.'
        }
      },
      // 11. Aorta (Main Systemic Artery)
      {
        id: 'aorta',
        label: 'Aorta (Arch & Descending)',
        sublabel: 'Largest Artery → High Pressure to Body',
        category: 'oxygenated',
        x: 470,
        y: 45,
        shape: 'capsule',
        width: 190,
        height: 42,
        color: '#991b1b',
        details: {
          functionEn: 'Largest systemic artery. Receives blood from LV via Aortic Semilunar Valve and distributes it to whole body.',
          functionHinglish: 'Body ki main artery jo LV se high-pressure pure blood le kar sabhi organ systems tak distribute karti hai.',
          ncertNote: 'Branches into Brachiocephalic, Left Common Carotid, and Left Subclavian arteries from aortic arch.'
        },
        leaderLine: { targetX: 430, targetY: 100, labelSide: 'right' }
      },
      // 12. Interventricular Septum
      {
        id: 'septum',
        label: 'Interventricular Septum',
        sublabel: 'Separates O2 and CO2 blood',
        category: 'structure',
        x: 400,
        y: 340,
        shape: 'rect',
        width: 24,
        height: 120,
        color: '#be123c',
        details: {
          functionEn: 'Thick muscular wall separating RV and LV, ensuring complete separation of oxygenated and deoxygenated blood in double circulation.',
          functionHinglish: 'Right aur Left ventricles ke beech ki muscular deewar jo O2 aur CO2 blood ko mix hone se rokti hai.',
          ncertNote: 'Bundle of His branches run within this septum.'
        }
      }
    ],
    connections: [
      // Blood Flow: SVC/IVC -> RA
      {
        id: 'flow-svc-ra',
        from: 'svc',
        to: 'right_atrium',
        points: [{ x: 280, y: 95 }, { x: 280, y: 150 }, { x: 295, y: 170 }],
        type: 'deoxygenated_blood',
        color: '#2563eb',
        strokeWidth: 4,
        animatedFlow: true,
        arrowEnd: true,
        stepNumber: 1
      },
      // Blood Flow: RA -> Tricuspid -> RV
      {
        id: 'flow-ra-rv',
        from: 'right_atrium',
        to: 'right_ventricle',
        points: [{ x: 305, y: 220 }, { x: 315, y: 260 }, { x: 320, y: 315 }],
        type: 'deoxygenated_blood',
        color: '#1d4ed8',
        strokeWidth: 4,
        animatedFlow: true,
        arrowEnd: true,
        stepNumber: 2
      },
      // Blood Flow: RV -> Pulmonary Artery
      {
        id: 'flow-rv-pa',
        from: 'right_ventricle',
        to: 'pulmonary_artery',
        points: [{ x: 335, y: 320 }, { x: 360, y: 240 }, { x: 375, y: 120 }],
        type: 'deoxygenated_blood',
        color: '#0284c7',
        strokeWidth: 4,
        animatedFlow: true,
        arrowEnd: true,
        stepNumber: 3
      },
      // Blood Flow: Pulmonary Veins -> LA
      {
        id: 'flow-pv-la',
        from: 'pulmonary_veins',
        to: 'left_atrium',
        points: [{ x: 630, y: 180 }, { x: 550, y: 185 }, { x: 530, y: 190 }],
        type: 'oxygenated_blood',
        color: '#dc2626',
        strokeWidth: 4,
        animatedFlow: true,
        arrowEnd: true,
        stepNumber: 4
      },
      // Blood Flow: LA -> Bicuspid -> LV
      {
        id: 'flow-la-lv',
        from: 'left_atrium',
        to: 'left_ventricle',
        points: [{ x: 495, y: 220 }, { x: 485, y: 260 }, { x: 475, y: 315 }],
        type: 'oxygenated_blood',
        color: '#dc2626',
        strokeWidth: 4,
        animatedFlow: true,
        arrowEnd: true,
        stepNumber: 5
      },
      // Blood Flow: LV -> Aorta -> Body
      {
        id: 'flow-lv-aorta',
        from: 'left_ventricle',
        to: 'aorta',
        points: [{ x: 465, y: 320 }, { x: 440, y: 230 }, { x: 430, y: 130 }, { x: 470, y: 85 }],
        type: 'oxygenated_blood',
        color: '#b91c1c',
        strokeWidth: 4,
        animatedFlow: true,
        arrowEnd: true,
        stepNumber: 6
      }
    ],
    labels: [
      { id: 'lbl-1', text: 'Superior Vena Cava', subtext: 'Deoxygenated Return', x: 70, y: 60, targetX: 270, targetY: 75, side: 'left', color: '#2563eb', badge: 'Vein' },
      { id: 'lbl-2', text: 'Right Atrium (RA)', subtext: 'Thin muscular wall', x: 70, y: 180, targetX: 270, targetY: 190, side: 'left', color: '#1d4ed8', badge: 'Chamber' },
      { id: 'lbl-3', text: 'Tricuspid Valve', subtext: '3 Cusps (Right AV)', x: 70, y: 260, targetX: 300, targetY: 260, side: 'left', color: '#d97706', badge: 'Valve' },
      { id: 'lbl-4', text: 'Right Ventricle (RV)', subtext: 'Pulmonary pump', x: 70, y: 350, targetX: 285, targetY: 350, side: 'left', color: '#1e40af', badge: 'Chamber' },
      { id: 'lbl-5', text: 'Inferior Vena Cava', subtext: 'From lower extremities', x: 70, y: 440, targetX: 230, targetY: 445, side: 'left', color: '#2563eb', badge: 'Vein' },
      { id: 'lbl-6', text: 'Aorta & Aortic Arch', subtext: 'Largest artery to body', x: 730, y: 55, targetX: 565, targetY: 65, side: 'right', color: '#991b1b', badge: 'Artery' },
      { id: 'lbl-7', text: 'Pulmonary Artery', subtext: 'Deox blood to Lungs (Exception)', x: 730, y: 110, targetX: 460, targetY: 95, side: 'right', color: '#0284c7', badge: 'Exception' },
      { id: 'lbl-8', text: 'Pulmonary Veins (4x)', subtext: 'Ox blood from Lungs (Exception)', x: 730, y: 170, targetX: 550, targetY: 180, side: 'right', color: '#dc2626', badge: 'Exception' },
      { id: 'lbl-9', text: 'Left Atrium (LA)', subtext: 'Receives pure blood', x: 730, y: 225, targetX: 530, targetY: 200, side: 'right', color: '#dc2626', badge: 'Chamber' },
      { id: 'lbl-10', text: 'Bicuspid (Mitral) Valve', subtext: '2 Cusps (Left AV)', x: 730, y: 280, targetX: 500, targetY: 260, side: 'right', color: '#d97706', badge: 'Valve' },
      { id: 'lbl-11', text: 'Left Ventricle (LV)', subtext: 'Thickest Myocardial Wall (120 mmHg)', x: 730, y: 350, targetX: 510, targetY: 350, side: 'right', color: '#b91c1c', badge: 'Chamber' },
      { id: 'lbl-12', text: 'Interventricular Septum', subtext: 'Prevents O2/CO2 mixing', x: 730, y: 430, targetX: 415, targetY: 400, side: 'right', color: '#be123c', badge: 'Septum' }
    ],
    legend: [
      { label: 'Deoxygenated Blood (CO2-rich)', color: '#2563eb', shape: 'line', description: 'Veins, RA, RV, Pulmonary Artery' },
      { label: 'Oxygenated Blood (O2-rich)', color: '#dc2626', shape: 'line', description: 'Pulmonary Veins, LA, LV, Aorta' },
      { label: 'One-Way AV Valves', color: '#d97706', shape: 'rect', description: 'Tricuspid & Bicuspid/Mitral' },
      { label: 'Muscular Septum & Walls', color: '#be123c', shape: 'rect', description: 'Prevents chamber mixing' }
    ],
    flowSteps: [
      { step: 1, title: 'Venous Return', description: 'Deoxygenated blood from body enters Right Atrium via Superior & Inferior Vena Cava.', bloodType: 'deoxygenated', highlightNodeIds: ['svc', 'ivc', 'right_atrium'] },
      { step: 2, title: 'Atrioventricular Passage', description: 'Right Atrium contracts; Tricuspid valve opens and blood fills Right Ventricle.', bloodType: 'deoxygenated', highlightNodeIds: ['right_atrium', 'tricuspid_valve', 'right_ventricle'] },
      { step: 3, title: 'Pulmonary Pumping', description: 'Right Ventricle pumps deoxygenated blood through Pulmonary Semilunar Valve into Pulmonary Artery toward Lungs.', bloodType: 'deoxygenated', highlightNodeIds: ['right_ventricle', 'pulmonary_artery'] },
      { step: 4, title: 'Pulmonary Oxygenation', description: 'In Lungs, CO2 is unloaded and O2 is loaded across alveolar-capillary membrane.', bloodType: 'mixed', highlightNodeIds: ['pulmonary_artery', 'pulmonary_veins'] },
      { step: 5, title: 'Oxygenated Return', description: '4 Pulmonary Veins return oxygen-rich blood into the Left Atrium.', bloodType: 'oxygenated', highlightNodeIds: ['pulmonary_veins', 'left_atrium'] },
      { step: 6, title: 'Left Ventricular Filling', description: 'Left Atrium contracts; Bicuspid (Mitral) valve opens and blood enters Left Ventricle.', bloodType: 'oxygenated', highlightNodeIds: ['left_atrium', 'bicuspid_valve', 'left_ventricle'] },
      { step: 7, title: 'Systemic Ejection', description: 'Thick Left Ventricle contracts forcefully, pumping oxygenated blood via Aorta to the entire body.', bloodType: 'oxygenated', highlightNodeIds: ['left_ventricle', 'aorta'] }
    ],
    examTips: [
      'NEET Trap 1: Pulmonary Artery carries DEOXYGENATED blood; Pulmonary Vein carries OXYGENATED blood (exceptions to artery/vein rule).',
      'NEET Trap 2: Left Ventricle wall is 3x thicker than Right Ventricle because it pumps blood against high systemic vascular resistance (~120 mmHg vs ~25 mmHg).',
      'NEET Trap 3: Tricuspid = Right side (3 cusps), Bicuspid/Mitral = Left side (2 cusps). Mnemonic: "LAB RAT" (Left Atrium Bicuspid, Right Atrium Tricuspid).'
    ],
    explanation: {
      whatYouSee: 'This is an educational sectional view of the 4-chambered human heart showing the separation of deoxygenated (blue) and oxygenated (red) blood circuits, labeled valves, and major great vessels.',
      stepByStepMechanism: [
        'Body tissues → Superior & Inferior Vena Cava → Right Atrium (Deox)',
        'Right Atrium → Tricuspid Valve → Right Ventricle',
        'Right Ventricle → Pulmonary Semilunar Valve → Pulmonary Artery → Both Lungs (Oxygenation)',
        'Lungs → 4 Pulmonary Veins → Left Atrium (Oxygenated)',
        'Left Atrium → Bicuspid (Mitral) Valve → Left Ventricle',
        'Left Ventricle → Aortic Semilunar Valve → Aorta → Systemic Organs & Tissues'
      ],
      examTip: 'Remember the "LAB RAT" mnemonic: Left Atrium = Bicuspid valve, Right Atrium = Tricuspid valve. Also, Left Ventricle has the thickest myocardium to supply the systemic circulation.',
      ncertTrap: 'Do not confuse the Pulmonary Artery (carries impure blood to lungs) with Pulmonary Veins (carry pure blood to left atrium).'
    }
  },

  nephron: {
    id: 'nephron-urine-formation',
    diagramType: 'anatomical',
    title: 'NCERT Class 11: Structure of a Nephron & Mechanism of Urine Formation',
    subtitle: 'Renal corpuscle, convoluted tubules, Loop of Henle & Counter-Current Exchange',
    view: 'Schematic Diagram of Cortical/Juxtamedullary Nephron (Simplified Educational Diagram)',
    isSimplified: true,
    ncertReference: 'NCERT Class 11 Biology — Chapter 19: Excretory Products and their Elimination (Figure 19.3)',
    viewBox: { minX: 0, minY: 0, width: 800, height: 520 },
    nodes: [
      {
        id: 'afferent_arteriole',
        label: 'Afferent Arteriole',
        sublabel: 'Wide lumen → High Glomerular Pressure',
        x: 160,
        y: 80,
        shape: 'capsule',
        width: 150,
        height: 36,
        color: '#dc2626',
        details: {
          functionEn: 'Brings renal blood into the glomerulus. Has wider diameter than efferent arteriole to build ultrafiltration pressure (GHP ~60 mmHg).',
          functionHinglish: 'Wider arteriole jo blood ko glomerulus me laata hai aur ultrafiltration ke liye high hydrostatic pressure create karta hai.'
        },
        leaderLine: { targetX: 230, targetY: 130, labelSide: 'left' }
      },
      {
        id: 'glomerulus',
        label: 'Glomerulus (Capillary Tuft)',
        sublabel: 'Site of Ultrafiltration (GFR ~125 mL/min)',
        x: 250,
        y: 140,
        shape: 'circle',
        r: 26,
        color: '#ef4444',
        details: {
          functionEn: 'Tuft of fenestrated capillaries where non-selective ultrafiltration occurs through 3 layers.',
          functionHinglish: 'Capillary network jahan blood filter hota hai. Podocyte slit pores se filtrate Bowman capsule me aata hai.'
        }
      },
      {
        id: 'efferent_arteriole',
        label: 'Efferent Arteriole',
        sublabel: 'Narrower lumen → Exits to Vasa Recta',
        x: 350,
        y: 80,
        shape: 'capsule',
        width: 150,
        height: 36,
        color: '#dc2626',
        details: {
          functionEn: 'Carries filtered blood away from glomerulus into peritubular capillaries and vasa recta.',
          functionHinglish: 'Narrow arteriole jo filtered blood ko aage vasa recta capillaries me le jaata hai.'
        },
        leaderLine: { targetX: 270, targetY: 130, labelSide: 'top' }
      },
      {
        id: 'bowmans_capsule',
        label: "Bowman's Capsule",
        sublabel: 'Double-walled cup with Podocytes',
        x: 250,
        y: 190,
        shape: 'circle',
        r: 32,
        color: '#f59e0b',
        details: {
          functionEn: 'Cup-like sac enclosing glomerulus; lined by podocytes with filtration slits.',
          functionHinglish: 'Double-walled cup jo primary filtrate collect karta hai (180 L/day in humans).'
        }
      },
      {
        id: 'pct',
        label: 'Proximal Convoluted Tubule (PCT)',
        sublabel: '70-80% Electrolytes & Water Reabsorbed',
        x: 380,
        y: 180,
        shape: 'capsule',
        width: 170,
        height: 40,
        color: '#10b981',
        details: {
          functionEn: 'Lined with simple brush border cuboidal epithelium. Reabsorbs 100% glucose & amino acids, and 70-80% water & electrolytes.',
          functionHinglish: 'Microvilli wala part jahan maximum reabsorption (Glucose 100%, Na+, H2O, K+) hoti hai.'
        },
        leaderLine: { targetX: 380, targetY: 180, labelSide: 'top' }
      },
      {
        id: 'descending_henle',
        label: 'Descending Limb of Henle',
        sublabel: 'Permeable to Water, Impermeable to Salt',
        x: 350,
        y: 330,
        shape: 'capsule',
        width: 160,
        height: 38,
        color: '#3b82f6',
        details: {
          functionEn: 'Thin descending segment permeable to H2O but impermeable to electrolytes; concentrates the tubular fluid.',
          functionHinglish: 'Water ke liye permeable, Salt ke liye impermeable. Yahan filtrate hypertonic ban jaata hai (~1200 mOsm/L).'
        },
        leaderLine: { targetX: 350, targetY: 330, labelSide: 'left' }
      },
      {
        id: 'ascending_henle',
        label: 'Ascending Limb of Henle',
        sublabel: 'Permeable to Salt (NaCl), Impermeable to Water',
        x: 450,
        y: 330,
        shape: 'capsule',
        width: 160,
        height: 38,
        color: '#8b5cf6',
        details: {
          functionEn: 'Impermeable to water; actively and passively transports NaCl into medullary interstitium; dilutes filtrate.',
          functionHinglish: 'Water ke liye impermeable, NaCl ke liye permeable. Medulla me high osmolarity gradient banata hai.'
        },
        leaderLine: { targetX: 450, targetY: 330, labelSide: 'right' }
      },
      {
        id: 'dct',
        label: 'Distal Convoluted Tubule (DCT)',
        sublabel: 'Conditional Reabsorption (ADH & Aldosterone)',
        x: 520,
        y: 180,
        shape: 'capsule',
        width: 170,
        height: 40,
        color: '#06b6d4',
        details: {
          functionEn: 'Site of conditional reabsorption of Na+ and water under aldosterone and ADH hormonal regulation.',
          functionHinglish: 'Hormone-dependent segment (Aldosterone reabsorbs Na+, ADH reabsorbs H2O; K+ and H+ secreted).'
        },
        leaderLine: { targetX: 520, targetY: 180, labelSide: 'top' }
      },
      {
        id: 'collecting_duct',
        label: 'Collecting Duct (CD)',
        sublabel: 'Final Water Reabsorption & Urea Osmolarity',
        x: 650,
        y: 280,
        shape: 'rect',
        width: 44,
        height: 240,
        color: '#6366f1',
        details: {
          functionEn: 'Extends from cortex to inner medulla; concentrates urine up to 4x (1200 mOsm/L) under ADH influence.',
          functionHinglish: 'Final channel jahan concentrated urine banta hai aur renal pelvis me drain hota hai.'
        },
        leaderLine: { targetX: 650, targetY: 280, labelSide: 'right' }
      }
    ],
    connections: [
      { id: 'n-1', from: 'afferent_arteriole', to: 'glomerulus', points: [{ x: 235, y: 98 }, { x: 245, y: 120 }], type: 'arrow', color: '#dc2626', strokeWidth: 3, arrowEnd: true },
      { id: 'n-2', from: 'bowmans_capsule', to: 'pct', points: [{ x: 280, y: 190 }, { x: 340, y: 185 }], type: 'arrow', color: '#f59e0b', strokeWidth: 3, arrowEnd: true },
      { id: 'n-3', from: 'pct', to: 'descending_henle', points: [{ x: 380, y: 200 }, { x: 350, y: 290 }], type: 'arrow', color: '#10b981', strokeWidth: 3, arrowEnd: true },
      { id: 'n-4', from: 'descending_henle', to: 'ascending_henle', points: [{ x: 350, y: 440 }, { x: 400, y: 470 }, { x: 450, y: 440 }], type: 'arrow', color: '#3b82f6', strokeWidth: 3, arrowEnd: true },
      { id: 'n-5', from: 'ascending_henle', to: 'dct', points: [{ x: 450, y: 290 }, { x: 500, y: 200 }], type: 'arrow', color: '#8b5cf6', strokeWidth: 3, arrowEnd: true },
      { id: 'n-6', from: 'dct', to: 'collecting_duct', points: [{ x: 570, y: 180 }, { x: 650, y: 200 }], type: 'arrow', color: '#06b6d4', strokeWidth: 3, arrowEnd: true }
    ],
    legend: [
      { label: 'Ultrafiltration (Glomerulus)', color: '#ef4444', shape: 'circle' },
      { label: 'Obligatory Reabsorption (PCT 70-80%)', color: '#10b981', shape: 'rect' },
      { label: 'Counter-Current Multiplier (Henle Loop)', color: '#3b82f6', shape: 'line' },
      { label: 'Conditional Reabsorption (DCT/CD)', color: '#06b6d4', shape: 'rect' }
    ],
    examTips: [
      'NEET Key: PCT reabsorbs 100% glucose & amino acids via secondary active transport.',
      'NEET Key: Descending limb is permeable to water (H2O leaves); Ascending limb is permeable to NaCl (impermeable to water).',
      'NEET Key: Juxtamedullary nephrons have long loops of Henle deep in medulla for maximum urine concentration.'
    ],
    explanation: {
      whatYouSee: 'This diagram illustrates the functional unit of the human kidney (Nephron), showing the Glomerular capsule, PCT, Loop of Henle, DCT, and Collecting Duct.',
      stepByStepMechanism: [
        '1. Glomerular Ultrafiltration: Blood under high pressure filters through podocyte slits into Bowman capsule.',
        '2. Tubular Reabsorption (PCT): Brush-border cells reabsorb 100% glucose, amino acids, and 70-80% Na+ and H2O.',
        '3. Counter-Current Concentration (Loop of Henle): Descending limb removes H2O; Ascending limb pumps out NaCl.',
        '4. Conditional Reabsorption (DCT & CD): ADH facilitates water reabsorption; Aldosterone facilitates Na+ retention.',
        '5. Excretion: Concentrated urine (up to 1200 mOsm/L) empties into renal pelvis.'
      ],
      examTip: 'Remember: Descending loop loses WATER (concentrates fluid); Ascending loop pumps SALT (dilutes fluid).'
    }
  },

  cell: {
    id: 'eukaryotic-cell-structure',
    diagramType: 'anatomical',
    title: 'NCERT Class 11: Ultra-structure of a Eukaryotic Cell',
    subtitle: 'Organelles, Endomembrane System, Mitochondria, & Nucleus',
    view: 'Cellular Cross-Section (Simplified Educational Diagram)',
    isSimplified: true,
    ncertReference: 'NCERT Class 11 Biology — Chapter 8: Cell — The Unit of Life (Figure 8.3 & 8.4)',
    viewBox: { minX: 0, minY: 0, width: 800, height: 500 },
    regions: [
      {
        id: 'plasma_membrane_region',
        pathD: 'M 400 40 C 620 40, 720 140, 720 250 C 720 370, 600 460, 400 460 C 190 460, 80 370, 80 250 C 80 130, 190 40, 400 40 Z',
        fill: '#ecfdf5',
        stroke: '#059669',
        strokeWidth: 5,
        opacity: 0.9
      },
      {
        id: 'cytoplasm_region',
        pathD: 'M 400 55 C 600 55, 700 150, 700 250 C 700 355, 590 445, 400 445 C 205 445, 100 355, 100 250 C 100 145, 205 55, 400 55 Z',
        fill: '#f0fdf4',
        stroke: 'none'
      }
    ],
    nodes: [
      {
        id: 'nucleus',
        label: 'Nucleus & Nucleolus',
        sublabel: 'Double membrane with Nuclear Pores & Chromatin',
        x: 400,
        y: 250,
        shape: 'circle',
        r: 60,
        color: '#7c3aed',
        details: {
          functionEn: 'Houses genetic material (DNA/chromatin). Nucleolus is the active site for rRNA synthesis.',
          functionHinglish: 'Cell ka master control center. Chromatin aur nucleolus (rRNA factory) contain karta hai.'
        }
      },
      {
        id: 'mitochondria_1',
        label: 'Mitochondria (Powerhouse)',
        sublabel: 'Double membrane with Cristae (ATP Synthesis)',
        x: 230,
        y: 160,
        shape: 'capsule',
        width: 100,
        height: 48,
        color: '#ea580c',
        details: {
          functionEn: 'Semi-autonomous organelle with 70S ribosomes and circular DNA. Produces ATP via oxidative phosphorylation.',
          functionHinglish: 'Powerhouse of cell! Cristae par F0-F1 oxysomes ATP banate hain.'
        },
        leaderLine: { targetX: 230, targetY: 160, labelSide: 'left' }
      },
      {
        id: 'golgi',
        label: 'Golgi Apparatus',
        sublabel: 'Cis (forming) & Trans (maturing) faces',
        x: 560,
        y: 170,
        shape: 'capsule',
        width: 110,
        height: 50,
        color: '#0284c7',
        details: {
          functionEn: 'Packaging, modification (glycosylation of proteins & lipids), and secretion.',
          functionHinglish: 'Camillo Golgi ne discover kiya. Glycoproteins aur glycolipids ka synthesis aur packaging karta hai.'
        },
        leaderLine: { targetX: 560, targetY: 170, labelSide: 'right' }
      },
      {
        id: 'rer',
        label: 'Rough Endoplasmic Reticulum (RER)',
        sublabel: 'Ribosomes on surface (Protein synthesis)',
        x: 310,
        y: 330,
        shape: 'capsule',
        width: 120,
        height: 44,
        color: '#db2777',
        details: {
          functionEn: 'Continuous with outer nuclear membrane; studded with 80S ribosomes for secretory protein synthesis.',
          functionHinglish: 'Protein synthesis aur folding ka main site.'
        },
        leaderLine: { targetX: 310, targetY: 330, labelSide: 'left' }
      },
      {
        id: 'lysosome',
        label: 'Lysosome (Suicide Bags)',
        sublabel: 'Hydrolytic enzymes active at acidic pH',
        x: 540,
        y: 330,
        shape: 'circle',
        r: 22,
        color: '#dc2626',
        details: {
          functionEn: 'Membrane-bound vesicles with acid hydrolases (lipases, proteases, nucleases) active at pH ~5.',
          functionHinglish: 'Digestive organelle jisme hydrolytic enzymes hote hain.'
        },
        leaderLine: { targetX: 540, targetY: 330, labelSide: 'right' }
      }
    ],
    connections: [],
    labels: [
      { id: 'l1', text: 'Plasma Membrane', subtext: 'Fluid Mosaic (Lipid bilayer)', x: 70, y: 70, targetX: 180, targetY: 90, side: 'left', color: '#059669' },
      { id: 'l2', text: 'Mitochondrion (ATP)', subtext: 'Semi-autonomous (70S)', x: 70, y: 160, targetX: 200, targetY: 160, side: 'left', color: '#ea580c' },
      { id: 'l3', text: 'Rough ER (RER)', subtext: 'Ribosome-studded', x: 70, y: 330, targetX: 270, targetY: 330, side: 'left', color: '#db2777' },
      { id: 'l4', text: 'Golgi Apparatus', subtext: 'Cis/Trans Cisternae', x: 730, y: 170, targetX: 600, targetY: 170, side: 'right', color: '#0284c7' },
      { id: 'l5', text: 'Lysosome', subtext: 'Acid Hydrolases (pH 5)', x: 730, y: 330, targetX: 560, targetY: 330, side: 'right', color: '#dc2626' }
    ],
    legend: [
      { label: 'Genetic & Protein Synthesis (Nucleus & ER)', color: '#7c3aed', shape: 'circle' },
      { label: 'Energy Metabolism (Mitochondria)', color: '#ea580c', shape: 'rect' },
      { label: 'Packaging & Secretion (Golgi & Vesicles)', color: '#0284c7', shape: 'rect' }
    ],
    examTips: [
      'NEET Point: Mitochondria & Chloroplasts are semi-autonomous with circular DNA and 70S ribosomes.',
      'NEET Point: Endomembrane system includes ER, Golgi, Lysosomes, and Vacuoles (NOT Mitochondria or Peroxisomes).'
    ],
    explanation: {
      whatYouSee: 'A eukaryotic cell cross-section displaying the endomembrane network, autonomous energy organelles, and genetic nucleus.',
      stepByStepMechanism: [
        '1. Transcription occurs inside the Nucleus to synthesize mRNA.',
        '2. RER and ribosomes translate mRNA into polypeptide chains.',
        '3. Transport vesicles take proteins to the Golgi Cis face for modification & glycosylation.',
        '4. Secretory vesicles or lysosomes bud off the Trans face.'
      ],
      examTip: 'Endomembrane System = ER + Golgi + Lysosome + Vacuole. Mitochondria and Chloroplasts are NOT part of the endomembrane system!'
    }
  },

  distribution: {
    id: 'normal-gaussian-distribution',
    diagramType: 'distribution',
    title: 'Statistics: Standard Normal Gaussian Distribution & Empirical Rule',
    subtitle: 'Mean (μ), Standard Deviation (σ), and 68-95-99.7% Empirical Coverage Areas',
    view: 'Continuous Probability Density Function (PDF) Curve',
    isSimplified: true,
    ncertReference: 'IIT Madras BS Degree Statistics 1 & Foundation Mathematics (Weeks 6-8)',
    viewBox: { minX: 0, minY: 0, width: 800, height: 480 },
    regions: [
      // ±1σ Region (68.2%)
      {
        id: 'reg_1sigma',
        pathD: 'M 300 370 L 300 215 C 340 130, 460 130, 500 215 L 500 370 Z',
        fill: '#93c5fd',
        stroke: '#2563eb',
        strokeWidth: 2,
        opacity: 0.6
      },
      // Left 2σ Region
      {
        id: 'reg_2sigma_left',
        pathD: 'M 200 370 L 200 315 C 240 270, 280 230, 300 215 L 300 370 Z',
        fill: '#c7d2fe',
        stroke: '#4f46e5',
        strokeWidth: 1.5,
        opacity: 0.5
      },
      // Right 2σ Region
      {
        id: 'reg_2sigma_right',
        pathD: 'M 500 370 L 500 215 C 520 230, 560 270, 600 315 L 600 370 Z',
        fill: '#c7d2fe',
        stroke: '#4f46e5',
        strokeWidth: 1.5,
        opacity: 0.5
      }
    ],
    nodes: [
      { id: 'mean_point', label: 'Mean μ (x̄ = 0, z = 0)', sublabel: 'Median = Mode (Symmetric)', x: 400, y: 120, shape: 'circle', r: 8, color: '#dc2626' },
      { id: 'sigma_m1', label: 'μ - 1σ', x: 300, y: 395, shape: 'rect', width: 60, height: 28, color: '#2563eb' },
      { id: 'sigma_p1', label: 'μ + 1σ', x: 500, y: 395, shape: 'rect', width: 60, height: 28, color: '#2563eb' },
      { id: 'sigma_m2', label: 'μ - 2σ', x: 200, y: 395, shape: 'rect', width: 60, height: 28, color: '#4f46e5' },
      { id: 'sigma_p2', label: 'μ + 2σ', x: 600, y: 395, shape: 'rect', width: 60, height: 28, color: '#4f46e5' },
      { id: 'sigma_m3', label: 'μ - 3σ', x: 100, y: 395, shape: 'rect', width: 60, height: 28, color: '#6b7280' },
      { id: 'sigma_p3', label: 'μ + 3σ', x: 700, y: 395, shape: 'rect', width: 60, height: 28, color: '#6b7280' }
    ],
    connections: [],
    labels: [
      { id: 'pct1', text: '68.2% Area (μ ± 1σ)', subtext: 'P(μ-σ ≤ X ≤ μ+σ) ≈ 0.6826', x: 400, y: 260, targetX: 400, targetY: 230, side: 'top', color: '#1d4ed8' },
      { id: 'pct2', text: '95.4% Area (μ ± 2σ)', subtext: 'P(μ-2σ ≤ X ≤ μ+2σ) ≈ 0.9544', x: 400, y: 310, targetX: 400, targetY: 290, side: 'top', color: '#4338ca' },
      { id: 'pct3', text: '99.7% Area (μ ± 3σ)', subtext: 'P(μ-3σ ≤ X ≤ μ+3σ) ≈ 0.9973', x: 400, y: 350, targetX: 400, targetY: 340, side: 'top', color: '#374151' }
    ],
    legend: [
      { label: 'Central 68.2% Coverage (±1σ)', color: '#93c5fd', shape: 'rect' },
      { label: '95.4% Coverage (±2σ)', color: '#c7d2fe', shape: 'rect' },
      { label: 'Mean μ (Center Line)', color: '#dc2626', shape: 'line' }
    ],
    examTips: [
      'IITM BS Key: Z-Score Formula: Z = (X - μ) / σ.',
      'IITM BS Key: Normal distribution has Skewness = 0 and Kurtosis = 3 (Excess Kurtosis = 0).',
      'IITM BS Key: Total area under the probability density curve equals exactly 1.0.'
    ],
    explanation: {
      whatYouSee: 'The Gaussian bell curve showing symmetrical probability densities around the mean with standard deviation markers.',
      stepByStepMechanism: [
        '1. Mean μ determines the central peak position.',
        '2. Standard Deviation σ controls the curve width/spread.',
        '3. 68.26% of data lies within 1 standard deviation [μ-σ, μ+σ].',
        '4. 95.44% of data lies within 2 standard deviations [μ-2σ, μ+2σ].',
        '5. 99.73% of data lies within 3 standard deviations [μ-3σ, μ+3σ].'
      ],
      examTip: 'In standard normal distribution N(0, 1), 95% confidence interval is between Z = -1.96 and Z = +1.96.'
    }
  },

  ray_optics: {
    id: 'convex-lens-ray-optics',
    diagramType: 'physics_ray',
    title: 'Physics Class 12: Ray Optics — Image Formation by Convex (Converging) Lens',
    subtitle: 'Principal Axis, Optical Center (O), Principal Foci (F1, F2), and Real Inverted Image',
    view: 'Geometrical Ray Construction Diagram',
    isSimplified: true,
    ncertReference: 'NCERT Class 12 Physics — Chapter 9: Ray Optics and Optical Instruments (Figure 9.17)',
    viewBox: { minX: 0, minY: 0, width: 800, height: 460 },
    nodes: [
      // Object AB
      {
        id: 'object_ab',
        label: 'Object (AB)',
        sublabel: 'Placed beyond 2F1 (u > 2f)',
        x: 180,
        y: 140,
        shape: 'capsule',
        width: 18,
        height: 90,
        color: '#2563eb',
        details: {
          functionEn: 'Luminous object placed perpendicular to principal axis beyond 2F1.',
          functionHinglish: 'Object jiska real inverted image focus F2 aur 2F2 ke beech banega.'
        },
        leaderLine: { targetX: 180, targetY: 140, labelSide: 'left' }
      },
      // Convex Lens Center
      {
        id: 'convex_lens',
        label: 'Convex Lens',
        sublabel: 'Thin Converging Lens (f > 0)',
        x: 400,
        y: 230,
        shape: 'ellipse',
        rx: 16,
        ry: 130,
        color: '#06b6d4',
        details: {
          functionEn: 'Thick in middle, thin at edges. Converges parallel rays to focal point F2.',
          functionHinglish: 'Converging lens jo rays ko focus par meet karata hai.'
        }
      },
      // Real Inverted Image A'B'
      {
        id: 'image_ab',
        label: "Image (A'B')",
        sublabel: 'Real, Inverted & Diminished (Between F2 and 2F2)',
        x: 620,
        y: 275,
        shape: 'capsule',
        width: 16,
        height: 65,
        color: '#dc2626',
        details: {
          functionEn: 'Real and inverted image formed on opposite side between F2 and 2F2 with magnification |m| < 1.',
          functionHinglish: 'Real inverted diminished image jo screen par capture kiya ja sakta hai.'
        },
        leaderLine: { targetX: 620, targetY: 275, labelSide: 'right' }
      },
      // Cardinal Points
      { id: 'f1', label: 'F1', x: 280, y: 245, shape: 'circle', r: 5, color: '#475569' },
      { id: 'f2', label: 'F2', x: 520, y: 245, shape: 'circle', r: 5, color: '#475569' },
      { id: 'two_f1', label: '2F1', x: 160, y: 245, shape: 'circle', r: 5, color: '#475569' },
      { id: 'two_f2', label: '2F2', x: 640, y: 245, shape: 'circle', r: 5, color: '#475569' },
      { id: 'opt_center', label: 'O', x: 400, y: 245, shape: 'circle', r: 5, color: '#0f172a' }
    ],
    connections: [
      // Principal Axis (Center horizontal line)
      { id: 'principal_axis', points: [{ x: 50, y: 230 }, { x: 750, y: 230 }], type: 'dashed', color: '#64748b', strokeWidth: 2 },
      // Ray 1: Parallel to principal axis -> passes through F2
      { id: 'ray_1', points: [{ x: 180, y: 140 }, { x: 400, y: 140 }, { x: 620, y: 305 }, { x: 720, y: 380 }], type: 'ray', color: '#2563eb', strokeWidth: 3, arrowEnd: true },
      // Ray 2: Passes undeviated through optical center O
      { id: 'ray_2', points: [{ x: 180, y: 140 }, { x: 400, y: 230 }, { x: 620, y: 305 }, { x: 720, y: 345 }], type: 'ray', color: '#dc2626', strokeWidth: 3, arrowEnd: true }
    ],
    legend: [
      { label: 'Ray 1: Parallel ray refracts through Focus F2', color: '#2563eb', shape: 'line' },
      { label: 'Ray 2: Central ray passes straight through O', color: '#dc2626', shape: 'line' },
      { label: 'Principal Axis & Optical Centers', color: '#64748b', shape: 'dashed' }
    ],
    examTips: [
      'NEET / JEE Lens Formula: 1/v - 1/u = 1/f.',
      'Magnification: m = v/u = h_i / h_o. Negative m indicates real, inverted image.',
      'When Object is beyond 2F1: Image is between F2 and 2F2, Real, Inverted, and Diminished.'
    ],
    explanation: {
      whatYouSee: 'Geometric ray optics diagram illustrating ray tracing through a biconvex converging lens.',
      stepByStepMechanism: [
        '1. Ray parallel to the principal axis refracts through the principal focus F2 on the other side.',
        '2. Ray passing through the optical center O continues undeviated.',
        '3. The intersection of these refracted rays at (620, 305) forms the real, inverted image A\'B\'.'
      ],
      examTip: 'Remember sign convention: u is negative (-), v is positive (+), f is positive (+) for convex lens.'
    }
  },

  dna_replication: {
    id: 'dna-replication-fork',
    diagramType: 'biochemical',
    title: 'NCERT Class 12: DNA Replication Fork & Semi-Conservative Synthesis',
    subtitle: 'Enzymes, Leading strand continuous synthesis (5\'→3\') & Lagging strand Okazaki fragments',
    isSimplified: true,
    ncertReference: 'NCERT Class 12 Biology — Chapter 6: Molecular Basis of Inheritance (Figure 6.8)',
    viewBox: { minX: 0, minY: 0, width: 800, height: 500 },
    regions: [
      // Replication Bubble Background
      {
        id: 'replication_fork_region',
        pathD: 'M 100 120 C 350 120, 480 200, 700 240 L 700 260 C 480 300, 350 380, 100 380 Z',
        fill: '#f0fdf4',
        stroke: '#86efac',
        strokeWidth: 2,
        opacity: 0.5
      }
    ],
    nodes: [
      // 1. Helicase Enzyme
      {
        id: 'helicase',
        label: 'Helicase Enzyme',
        sublabel: 'Unwinds parental DNA helix',
        category: 'process',
        x: 480,
        y: 250,
        shape: 'circle',
        r: 28,
        color: '#f59e0b',
        details: {
          functionEn: 'Unzips the DNA double helix at the replication fork by breaking hydrogen bonds between complementary base pairs.',
          functionHinglish: 'Hydrogen bonds ko todkar DNA ke double helix ko kholta hai (unwinds).',
          ncertNote: 'Requires ATP energy. Creates replication fork.'
        }
      },
      // 2. Topoisomerase (DNA Gyrase)
      {
        id: 'topoisomerase',
        label: 'Topoisomerase / Gyrase',
        sublabel: 'Relieves supercoiling tension',
        category: 'process',
        x: 650,
        y: 250,
        shape: 'capsule',
        width: 170,
        height: 36,
        color: '#8b5cf6',
        details: {
          functionEn: 'Relieves torsional strain and supercoiling created ahead of the unwinding replication fork.',
          functionHinglish: 'Fork ke aage jo tension aur supercoiling banti hai usko cut & reseal karke tension free karta hai.',
          ncertNote: 'In prokaryotes, this enzyme is specifically called DNA Gyrase.'
        }
      },
      // 3. Leading Strand Polymerase
      {
        id: 'dna_poly_leading',
        label: 'DNA Polymerase III (Leading)',
        sublabel: 'Continuous 5\' → 3\' synthesis',
        category: 'highlight',
        x: 320,
        y: 110,
        shape: 'capsule',
        width: 210,
        height: 40,
        color: '#2563eb',
        details: {
          functionEn: 'Synthesizes the leading strand continuously toward the advancing replication fork in the 5\' to 3\' direction.',
          functionHinglish: 'Leading strand ko continuously 5\' se 3\' direction me bina ruke banata rehta hai.',
          ncertNote: 'Highly processive; adds thousands of nucleotides per second with proofreading (3\'→5\' exonuclease activity).'
        }
      },
      // 4. RNA Primase
      {
        id: 'primase',
        label: 'RNA Primase',
        sublabel: 'Lays down RNA primer',
        category: 'process',
        x: 200,
        y: 330,
        shape: 'capsule',
        width: 150,
        height: 36,
        color: '#ec4899',
        details: {
          functionEn: 'Synthesizes short RNA primers with free 3\'-OH group required by DNA Polymerase to initiate synthesis.',
          functionHinglish: 'Chhota RNA primer banata hai kyunki DNA Polymerase khud synthesis start nahi kar sakta (needs 3\'-OH end).',
          ncertNote: 'DNA Polymerase cannot initiate de novo synthesis without RNA primer.'
        }
      },
      // 5. Okazaki Fragment / Lagging Strand
      {
        id: 'okazaki_fragment',
        label: 'Okazaki Fragments',
        sublabel: 'Discontinuous lagging strand pieces',
        category: 'process',
        x: 360,
        y: 390,
        shape: 'capsule',
        width: 190,
        height: 38,
        color: '#dc2626',
        details: {
          functionEn: 'Short segments of newly synthesized DNA on the lagging strand synthesized away from the replication fork in 5\'→3\' direction.',
          functionHinglish: 'Lagging strand par chote chote tukdo me synthesize hota hai jinhe Okazaki fragments kehte hain.',
          ncertNote: 'Joined together permanently by DNA Ligase forming continuous phosphodiester backbone.'
        }
      },
      // 6. DNA Ligase
      {
        id: 'dna_ligase',
        label: 'DNA Ligase (Molecular Glue)',
        sublabel: 'Joins Okazaki fragments',
        category: 'highlight',
        x: 180,
        y: 430,
        shape: 'capsule',
        width: 190,
        height: 36,
        color: '#059669',
        details: {
          functionEn: 'Seals nicks in the sugar-phosphate backbone by forming covalent phosphodiester bonds.',
          functionHinglish: 'Okazaki fragments ke beech ke gaps ko jod kar continuous strand banata hai.',
          ncertNote: 'Often tested in NEET as "Molecular Glue" of genetic engineering & replication.'
        }
      }
    ],
    connections: [
      // Parental Template Strands
      { id: 'top_template', points: [{ x: 50, y: 70 }, { x: 450, y: 160 }, { x: 750, y: 220 }], type: 'arrow', color: '#1e293b', strokeWidth: 4, label: "Template 3' → 5'" },
      { id: 'bottom_template', points: [{ x: 50, y: 430 }, { x: 450, y: 340 }, { x: 750, y: 280 }], type: 'arrow', color: '#1e293b', strokeWidth: 4, label: "Template 5' → 3'" },
      // Leading Strand (Continuous Blue)
      { id: 'leading_strand_conn', points: [{ x: 100, y: 100 }, { x: 430, y: 190 }], type: 'arrow', color: '#2563eb', strokeWidth: 4, animatedFlow: true, label: "Leading Strand (5' → 3')" },
      // Okazaki Discontinuous Fragments (Red)
      { id: 'okazaki_conn1', points: [{ x: 300, y: 310 }, { x: 180, y: 350 }], type: 'arrow', color: '#dc2626', strokeWidth: 4, label: "Okazaki 1" },
      { id: 'okazaki_conn2', points: [{ x: 450, y: 270 }, { x: 340, y: 300 }], type: 'arrow', color: '#dc2626', strokeWidth: 4, label: "Okazaki 2" }
    ],
    legend: [
      { label: "Leading Strand (Continuous 5'→3' toward fork)", color: '#2563eb', shape: 'line' },
      { label: 'Lagging Strand / Okazaki Fragments (Discontinuous)', color: '#dc2626', shape: 'line' },
      { label: 'Helicase Unwinding Enzyme (ATP-dependent)', color: '#f59e0b', shape: 'circle' },
      { label: 'DNA Ligase (Phosphodiester bond sealant)', color: '#059669', shape: 'rect' }
    ],
    flowSteps: [
      {
        step: 1,
        title: 'Helicase Unwinds Double Helix',
        description: 'Helicase breaks hydrogen bonds between nitrogenous bases creating the Y-shaped replication fork; Topoisomerase relieves upstream tension.',
        highlightNodeIds: ['helicase', 'topoisomerase']
      },
      {
        step: 2,
        title: 'RNA Primase Adds Primer',
        description: 'RNA Primase creates a short 10-12 nucleotide RNA primer providing the essential 3\'-OH group.',
        highlightNodeIds: ['primase']
      },
      {
        step: 3,
        title: 'Continuous Leading Strand Synthesis',
        description: "DNA Polymerase III adds dNTPs continuously toward the replication fork strictly in the 5' to 3' direction.",
        highlightNodeIds: ['dna_poly_leading']
      },
      {
        step: 4,
        title: 'Discontinuous Okazaki Synthesis',
        description: "On the opposite template, DNA Polymerase synthesizes short Okazaki fragments moving away from the advancing fork.",
        highlightNodeIds: ['okazaki_fragment']
      },
      {
        step: 5,
        title: 'Ligase Seals the Backbone',
        description: 'DNA Polymerase I removes RNA primers (5\'→3\' exonuclease) replacing them with DNA, and DNA Ligase seals the phosphodiester nicks.',
        highlightNodeIds: ['dna_ligase']
      }
    ],
    examTips: [
      "NEET Rule: DNA Polymerase synthesizes ONLY in 5' → 3' direction.",
      'Leading strand requires 1 primer; Lagging strand requires multiple RNA primers.',
      'Semi-conservative replication was proven experimentally by Meselson & Stahl (1958) using 15N and CsCl density gradient centrifugation.'
    ],
    explanation: {
      whatYouSee: 'Y-shaped replication fork showing simultaneous continuous leading strand and discontinuous lagging strand synthesis.',
      stepByStepMechanism: [
        '1. Helicase unwinds the double helix at the replication fork.',
        '2. Topoisomerase prevents knots and torsional supercoiling.',
        '3. Leading strand is synthesized continuously (5\'→3\') towards the replication fork.',
        '4. Lagging strand is synthesized discontinuously as Okazaki fragments away from the fork.',
        '5. DNA Ligase forms covalent phosphodiester bonds to join the fragments.'
      ],
      examTip: 'Meselson-Stahl experiment proved semi-conservative nature. Taylor confirmed semi-conservative replication in Vicia faba using radioactive tritiated thymidine.'
    }
  },

  mitosis: {
    id: 'mitosis-cell-division',
    diagramType: 'process',
    title: 'NCERT Class 11: Stages of Mitotic Cell Division (Equational Division)',
    subtitle: 'Prophase, Metaphase (Equatorial Plate), Anaphase (Centromere Split) & Telophase',
    isSimplified: true,
    ncertReference: 'NCERT Class 11 Biology — Chapter 10: Cell Cycle and Cell Division (Figure 10.2)',
    viewBox: { minX: 0, minY: 0, width: 800, height: 500 },
    nodes: [
      {
        id: 'prophase',
        label: '1. Prophase',
        sublabel: 'Chromatin condensation & spindle formation',
        category: 'process',
        x: 120,
        y: 220,
        shape: 'capsule',
        width: 150,
        height: 48,
        color: '#3b82f6',
        details: {
          functionEn: 'Chromatin condenses into distinct chromosomes. Centrosomes move to opposite poles. Nuclear envelope and nucleolus disappear.',
          functionHinglish: 'Chromatin condense hokar chromosomes banata hai. Nuclear membrane gayab ho jati hai.',
          ncertNote: 'Marked by the initiation of condensation of chromosomal material.'
        }
      },
      {
        id: 'metaphase',
        label: '2. Metaphase',
        sublabel: 'Equatorial metaphasic plate alignment',
        category: 'highlight',
        x: 300,
        y: 220,
        shape: 'capsule',
        width: 160,
        height: 48,
        color: '#eab308',
        details: {
          functionEn: 'All chromosomes align at the equator of the cell (metaphase plate). Spindle fibers attach to kinetochores of centromeres.',
          functionHinglish: 'Sabhi chromosomes cell ke center (equator) par line bana kar arrange ho jate hain. Morphology study karne ki best stage!',
          ncertNote: 'Best stage to study morphology, shape, and number of chromosomes under microscope.'
        }
      },
      {
        id: 'anaphase',
        label: '3. Anaphase',
        sublabel: 'Centromere splits; chromatids separate',
        category: 'highlight',
        x: 490,
        y: 220,
        shape: 'capsule',
        width: 160,
        height: 48,
        color: '#ef4444',
        details: {
          functionEn: 'Centromeres split simultaneously and sister chromatids separate, migrating to opposite poles (V, L, J, I shapes).',
          functionHinglish: 'Centromere split hota hai aur sister chromatids opposite poles ki taraf khinchti hain. Chromosome shape study karne ki best stage.',
          ncertNote: 'Centromere splits; chromatids become daughter chromosomes of the future daughter nuclei.'
        }
      },
      {
        id: 'telophase',
        label: '4. Telophase & Cytokinesis',
        sublabel: 'Reformation of nuclear envelope & division',
        category: 'process',
        x: 680,
        y: 220,
        shape: 'capsule',
        width: 160,
        height: 48,
        color: '#10b981',
        details: {
          functionEn: 'Chromosomes decondense at poles. Nuclear envelope reforms around both daughter nuclei. Cytoplasm divides by furrow (animals) or cell plate (plants).',
          functionHinglish: 'Dono poles par do naye nuclei ban jate hain aur cytoplasm divide hokar do identical daughter cells bana deta hai.',
          ncertNote: 'Reverse of prophase. Animal cell: cleavage furrow (centripetal); Plant cell: cell plate / phragmoplast (centrifugal).'
        }
      }
    ],
    connections: [
      { id: 'm1_to_m2', points: [{ x: 195, y: 220 }, { x: 220, y: 220 }], type: 'arrow', color: '#2563eb', strokeWidth: 3 },
      { id: 'm2_to_m3', points: [{ x: 380, y: 220 }, { x: 410, y: 220 }], type: 'arrow', color: '#eab308', strokeWidth: 3 },
      { id: 'm3_to_m4', points: [{ x: 570, y: 220 }, { x: 600, y: 220 }], type: 'arrow', color: '#ef4444', strokeWidth: 3 }
    ],
    legend: [
      { label: 'Prophase (Condensation)', color: '#3b82f6' },
      { label: 'Metaphase (Equatorial Alignment - Morphology)', color: '#eab308' },
      { label: 'Anaphase (Centromere Split - Shapes V, L, J, I)', color: '#ef4444' },
      { label: 'Telophase & Cytokinesis (2 Daughter Cells)', color: '#10b981' }
    ],
    flowSteps: [
      { step: 1, title: 'Prophase', description: 'Chromosomes condense; nucleolus and nuclear envelope disintegrate.', highlightNodeIds: ['prophase'] },
      { step: 2, title: 'Metaphase', description: 'Chromosomes lie on the equatorial metaphase plate connected to spindle fibers via kinetochores.', highlightNodeIds: ['metaphase'] },
      { step: 3, title: 'Anaphase', description: 'Centromeres split; daughter chromosomes move to opposite spindle poles.', highlightNodeIds: ['anaphase'] },
      { step: 4, title: 'Telophase & Cytokinesis', description: 'Nuclear envelopes reform; cytokinesis splits cytoplasm into two 2n daughter cells.', highlightNodeIds: ['telophase'] }
    ],
    examTips: [
      'Morphology is studied at METAPHASE; Chromosome shape (V/L/J/I) is studied at ANAPHASE.',
      'Colchicine inhibits spindle formation by arresting cells in Metaphase.'
    ],
    explanation: {
      whatYouSee: 'Sequential phases of mitosis leading to equal distribution of chromosomes into two daughter cells.',
      stepByStepMechanism: [
        '1. Prophase: Chromatin threads condense into visible chromosomes.',
        '2. Metaphase: Chromosomes align along the metaphase plate.',
        '3. Anaphase: Sister chromatids separate and move to opposite poles.',
        '4. Telophase: Nuclear envelope reforms and cytoplasm divides.'
      ],
      examTip: 'Mitosis is equational division preserving chromosome number 2n -> 2n.'
    }
  }
};

export function findMatchingDiagram(queryOrTopic: string): DiagramSpec | null {
  const q = (queryOrTopic || '').toLowerCase();
  
  if (
    q.includes('heart') ||
    q.includes('cardiac') ||
    q.includes('blood flow') ||
    q.includes('circulation') ||
    q.includes('atrium') ||
    q.includes('ventricle') ||
    q.includes('aorta') ||
    q.includes('hruday') ||
    q.includes('dil ka diagram')
  ) {
    return VERIFIED_DIAGRAM_LIBRARY.heart;
  }

  if (
    q.includes('nephron') ||
    q.includes('kidney') ||
    q.includes('urine') ||
    q.includes('glomerulus') ||
    q.includes('bowman') ||
    q.includes('loop of henle') ||
    q.includes('pct') ||
    q.includes('dct')
  ) {
    return VERIFIED_DIAGRAM_LIBRARY.nephron;
  }

  if (
    q.includes('dna') ||
    q.includes('replication') ||
    q.includes('okazaki') ||
    q.includes('helicase') ||
    q.includes('leading strand') ||
    q.includes('lagging strand')
  ) {
    return VERIFIED_DIAGRAM_LIBRARY.dna_replication;
  }

  if (
    q.includes('mitosis') ||
    q.includes('metaphase') ||
    q.includes('anaphase') ||
    q.includes('prophase') ||
    q.includes('telophase') ||
    q.includes('cell division')
  ) {
    return VERIFIED_DIAGRAM_LIBRARY.mitosis;
  }

  if (
    q.includes('cell') ||
    q.includes('organelle') ||
    q.includes('mitochondria') ||
    q.includes('golgi') ||
    q.includes('endoplasmic') ||
    q.includes('koshika')
  ) {
    return VERIFIED_DIAGRAM_LIBRARY.cell;
  }

  if (
    q.includes('distribution') ||
    q.includes('gaussian') ||
    q.includes('bell curve') ||
    q.includes('normal dist') ||
    q.includes('standard normal') ||
    q.includes('empirical rule') ||
    q.includes('68-95-99')
  ) {
    return VERIFIED_DIAGRAM_LIBRARY.distribution;
  }

  if (
    q.includes('ray diagram') ||
    q.includes('lens') ||
    q.includes('optics') ||
    q.includes('convex') ||
    q.includes('concave') ||
    q.includes('refraction') ||
    q.includes('focal')
  ) {
    return VERIFIED_DIAGRAM_LIBRARY.ray_optics;
  }

  return null;
}

