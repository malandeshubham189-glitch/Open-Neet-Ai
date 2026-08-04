import React, { useState } from 'react';
import { Heart, Activity, CheckCircle2, ArrowRight, Sparkles, HelpCircle, RefreshCw, Volume2 } from 'lucide-react';
import { ttsService } from '../services/TTSService';

export interface HeartAnatomyPart {
  id: string;
  name: string;
  marathiName: string;
  type: 'deoxygenated' | 'oxygenated' | 'valve' | 'structure';
  functionHinglish: string;
  functionMarathi: string;
  bloodFlowInfo: string;
  cx: number; // SVG coordinate
  cy: number;
}

export const HEART_ANATOMY_PARTS: HeartAnatomyPart[] = [
  {
    id: 'vena_cava',
    name: '1. Superior & Inferior Vena Cava',
    marathiName: 'सुपीरियर आणि इन्फिरिअर व्हेना काव्हा (महाशिरा)',
    type: 'deoxygenated',
    functionHinglish: 'Poori body se Deoxygenated (impure/CO2-rich) blood ko collect karke Right Atrium mein laati hain. Superior SVC Upper Body se aur Inferior IVC Lower Body se blood laati hai.',
    functionMarathi: 'संपूर्ण शरीरातून अशुद्ध (ऑक्सिजनरहित) रक्त गोळा करून उजव्या आलिंदामध्ये (Right Atrium) आणतात.',
    bloodFlowInfo: 'Deoxygenated Blood: Body Parts → Superior/Inferior Vena Cava → Right Atrium',
    cx: 120,
    cy: 110
  },
  {
    id: 'right_atrium',
    name: '2. Right Atrium (उजवे आलिंद)',
    marathiName: 'उजवे आलिंद',
    type: 'deoxygenated',
    functionHinglish: 'Upper right chamber. Vena cava se aane waale deoxygenated blood ko receive karta hai aur Tricuspid valve ke throug Right Ventricle mein pump karta hai.',
    functionMarathi: 'हृदयाचा वरचा उजवा कप्पा. हा व्हेना काव्हाकडून अशुद्ध रक्त स्वीकारतो आणि ट्रायस्पीड व्हॉल्व्हद्वारे उजव्या निलयात पाठवतो.',
    bloodFlowInfo: 'Deoxygenated Blood: Right Atrium → Tricuspid Valve → Right Ventricle',
    cx: 180,
    cy: 180
  },
  {
    id: 'tricuspid_valve',
    name: '3. Tricuspid Valve (ट्रायस्पीड व्हॉल्व्ह)',
    marathiName: 'ट्रायस्पीड व्हॉल्व्ह (त्रिदली कप्पा)',
    type: 'valve',
    functionHinglish: 'Right Atrium aur Right Ventricle ke beech mein 3 flaps (cusps) waala valve. Yeh blood ko wapas Right Atrium mein jane se rokta hai (prevents backflow).',
    functionMarathi: 'उजव्या आलिंद आणि उजव्या निलयाच्या दरम्यानचा ३ फ्लॅप्स असलेला व्हॉल्व्ह. हा रक्ताचा उलटा प्रवाह रोखतो.',
    bloodFlowInfo: 'One-way Valve: Prevents backflow from Right Ventricle to Right Atrium',
    cx: 210,
    cy: 230
  },
  {
    id: 'right_ventricle',
    name: '4. Right Ventricle (उजवे निलय)',
    marathiName: 'उजवे निलय',
    type: 'deoxygenated',
    functionHinglish: 'Lower right chamber. Deoxygenated blood ko Pulmonary Artery ke through Lungs mein oxygenation sathi pump karta hai.',
    functionMarathi: 'हृदयाचा खालचा उजवा कप्पा. हा अशुद्ध रक्त फुफ्फुसांच्या धमनीद्वारे (Pulmonary Artery) फुफ्फुसांकडे ऑक्सिजन मिळवण्यासाठी पंप करतो.',
    bloodFlowInfo: 'Deoxygenated Blood: Right Ventricle → Pulmonary Semilunar Valve → Pulmonary Artery → Lungs',
    cx: 210,
    cy: 310
  },
  {
    id: 'pulmonary_artery',
    name: '5. Pulmonary Artery (फुफ्फुसीय धमनी)',
    marathiName: 'फुफ्फुसीय धमनी',
    type: 'deoxygenated',
    functionHinglish: 'Exception Artery! Baki sab arteries oxygenated blood carry karti hain, par Pulmonary Artery DEOXYGENATED blood ko Right Ventricle se Lungs tak le jaati hai.',
    functionMarathi: 'अपवाद धमनी! ही एकमेव धमनी आहे जी अशुद्ध (Deoxygenated) रक्त उजव्या निलयातून फुफ्फुसांकडे घेऊन जाते.',
    bloodFlowInfo: 'Deoxygenated Blood: Right Ventricle → Pulmonary Artery → Both Lungs',
    cx: 240,
    cy: 120
  },
  {
    id: 'pulmonary_veins',
    name: '6. Pulmonary Veins (फुफ्फुसीय शिरा)',
    marathiName: 'फुफ्फुसीय शिरा',
    type: 'oxygenated',
    functionHinglish: 'Exception Vein! Lungs se purified OXYGENATED blood ko Left Atrium mein laati hain (4 veins total: 2 left, 2 right).',
    functionMarathi: 'अपवाद शिरा! फुफ्फुसांमधून ऑक्सिजनयुक्त शुद्ध रक्त डाव्या आलिंदामध्ये (Left Atrium) आणतात.',
    bloodFlowInfo: 'Oxygenated Blood: Lungs → Pulmonary Veins → Left Atrium',
    cx: 370,
    cy: 170
  },
  {
    id: 'left_atrium',
    name: '7. Left Atrium (डावे आलिंद)',
    marathiName: 'डावे आलिंद',
    type: 'oxygenated',
    functionHinglish: 'Upper left chamber. Pulmonary veins se OXYGENATED (pure) blood receive karta hai aur Bicuspid/Mitral valve se Left Ventricle mein bhejta hai.',
    functionMarathi: 'हृदयाचा वरचा डावा कप्पा. फुफ्फुसीय शिरांकडून ऑक्सिजनयुक्त शुद्ध रक्त स्वीकारतो आणि बायस्पीड व्हॉल्व्हद्वारे डाव्या निलयात पाठवतो.',
    bloodFlowInfo: 'Oxygenated Blood: Left Atrium → Bicuspid Valve → Left Ventricle',
    cx: 320,
    cy: 200
  },
  {
    id: 'bicuspid_valve',
    name: '8. Bicuspid / Mitral Valve (बायस्पीड / मिटल व्हॉल्व्ह)',
    marathiName: 'बायस्पीड किंवा मिट्रल व्हॉल्व्ह (द्विदली कप्पा)',
    type: 'valve',
    functionHinglish: 'Left Atrium aur Left Ventricle ke beech mein 2 flaps waala valve. Also called Mitral Valve. Prevents backflow of O2-rich blood.',
    functionMarathi: 'डाव्या आलिंद आणि डाव्या निलयाच्या मधील २ फ्लॅप्सचा व्हॉल्व्ह. याला Mitral Valve देखील म्हणतात. शुद्ध रक्ताचा उलटा प्रवाह रोखतो.',
    bloodFlowInfo: 'One-way Valve: Left Atrium → Left Ventricle',
    cx: 300,
    cy: 250
  },
  {
    id: 'left_ventricle',
    name: '9. Left Ventricle (डावे निलय)',
    marathiName: 'डावे निलय (Thickest Muscle Wall)',
    type: 'oxygenated',
    functionHinglish: 'Thickest wall chamber in heart! Kyunki isko poori body mein Aorta ke through high pressure par blood pump karna hota hai.',
    functionMarathi: 'हृदयातील सर्वात जाड स्नायूंची भिंत असलेला कप्पा! हा ऑक्सिजनयुक्त रक्त महाधमनीद्वारे (Aorta) संपूर्ण शरीराला पंप करतो.',
    bloodFlowInfo: 'Oxygenated Blood: Left Ventricle → Aortic Semilunar Valve → Aorta → Whole Body',
    cx: 310,
    cy: 330
  },
  {
    id: 'aorta',
    name: '10. Aorta (महाधमनी)',
    marathiName: 'महाधमनी (Aorta)',
    type: 'oxygenated',
    functionHinglish: 'Body ki largest artery. Left Ventricle se oxygenated blood ko le kar poore body organs tak distribute karti hai.',
    functionMarathi: 'शरीरातील सर्वात मोठी धमनी. डाव्या निलयातून ऑक्सिजनयुक्त रक्त घेऊन संपूर्ण अवयवांना पोहोचवते.',
    bloodFlowInfo: 'Oxygenated Blood: Left Ventricle → Aorta → Systemic Circulation (All Body Parts)',
    cx: 280,
    cy: 70
  },
  {
    id: 'septum',
    name: '11. Interventricular Septum (आंतर-निलय पट)',
    marathiName: 'इंटरव्हेंट्रिक्युलर सेप्टम',
    type: 'structure',
    functionHinglish: 'Muscular wall separating Right & Left Ventricles. Prevents mixing of Deoxygenated O2-poor and Oxygenated O2-rich blood.',
    functionMarathi: 'उजव्या आणि डाव्या निलयाला वेगळी करणारी स्नायूंची भिंत. ही अशुद्ध आणि शुद्ध रक्त एकमेकांत मिसळण्यापासून रोखते.',
    bloodFlowInfo: 'Anatomical Barrier preventing mixing of Oxygenated & Deoxygenated blood',
    cx: 260,
    cy: 320
  },
  {
    id: 'chordae_tendineae',
    name: '12. Chordae Tendineae (हृदय रज्जू)',
    marathiName: 'कॉर्डे टेंडिनी',
    type: 'structure',
    functionHinglish: 'Fibrous fibrous cords ("heart strings") connecting AV valves (tricuspid/bicuspid) to papillary muscles. Holds valve cusps in place during ventricular contraction.',
    functionMarathi: 'व्हॉल्व्ह्सना पॅपिलरी स्नायूंशी जोडणारे तंतुमय दोरे. निलय आकुंचन पावताना व्हॉल्व्ह्सना उलटण्यापासून धरून ठेवतात.',
    bloodFlowInfo: 'Mechanical Support for Tricuspid and Bicuspid Valves',
    cx: 280,
    cy: 280
  }
];

export const HumanHeartDiagram: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<HeartAnatomyPart>(HEART_ANATOMY_PARTS[0]);
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);

  const neetQuestions = [
    {
      q: 'Q1. Which chamber of the human heart has the thickest muscular wall and why?',
      options: [
        'Right Atrium, because it receives blood from the entire body',
        'Left Ventricle, because it pumps oxygenated blood to the entire body via Aorta',
        'Right Ventricle, because it pumps blood to Lungs',
        'Left Atrium, because it receives O2 blood from 4 pulmonary veins'
      ],
      correct: 1,
      exp: 'Left Ventricle has the thickest muscular wall to generate high systemic pressure required to supply oxygenated blood throughout the human body via the Aorta.'
    },
    {
      q: 'Q2. Which valve prevents the backflow of blood from Left Ventricle to Left Atrium?',
      options: ['Tricuspid Valve', 'Semilunar Valve', 'Bicuspid (Mitral) Valve', 'Eustachian Valve'],
      correct: 2,
      exp: 'The Bicuspid (or Mitral) valve consists of two cusps located between Left Atrium and Left Ventricle.'
    },
    {
      q: 'Q3. What is the correct path of DEOXYGENATED blood flow in human heart?',
      options: [
        'Vena Cava → Right Atrium → Tricuspid Valve → Right Ventricle → Pulmonary Artery',
        'Pulmonary Vein → Left Atrium → Bicuspid Valve → Left Ventricle → Aorta',
        'Vena Cava → Left Atrium → Tricuspid Valve → Left Ventricle → Aorta',
        'Right Ventricle → Right Atrium → Pulmonary Artery → Lungs'
      ],
      correct: 0,
      exp: 'Deoxygenated blood enters Right Atrium via Vena Cava, passes through Tricuspid Valve to Right Ventricle, and is pumped into Pulmonary Artery.'
    }
  ];

  const speakPartFunction = (part: HeartAnatomyPart) => {
    ttsService.play(`${part.name}. ${part.functionHinglish}`);
  };

  return (
    <div className="space-y-6 rounded-3xl border border-rose-200 bg-white p-6 shadow-md font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <Heart className="h-5 w-5 fill-rose-600 animate-pulse" />
            </span>
            <h2 className="text-lg font-black text-slate-900">
              NCERT Class 11 Biology: Sectional View of Human Heart
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Interactive High-Resolution Labeled Anatomical Diagram & NEET Blood Flow Visualization
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            Deoxygenated (CO2)
          </span>
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-600"></span>
            Oxygenated (O2)
          </span>
        </div>
      </div>

      {/* Main Interactive Diagram & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Vector Anatomical Diagram */}
        <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-4 border border-slate-200 relative flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-xs font-extrabold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              💡 Click any labelled anatomical node on the heart diagram
            </span>
          </div>

          <svg
            viewBox="0 0 500 450"
            className="w-full max-w-[460px] h-auto drop-shadow-md select-none"
          >
            {/* Background Heart Silhouette */}
            <defs>
              <linearGradient id="deoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="oxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Aorta Arch */}
            <path
              d="M 230 110 C 230 40, 320 40, 320 120 L 300 130"
              fill="none"
              stroke="url(#oxGradient)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Superior Vena Cava */}
            <path
              d="M 140 60 L 140 150"
              fill="none"
              stroke="url(#deoxGradient)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Pulmonary Artery Branch */}
            <path
              d="M 210 160 C 200 110, 270 100, 280 110"
              fill="none"
              stroke="url(#deoxGradient)"
              strokeWidth="18"
              strokeLinecap="round"
            />

            {/* Heart Muscle Body (Outer Outline) */}
            <path
              d="M 250 80 C 120 100, 100 240, 200 400 C 230 430, 270 430, 310 390 C 400 280, 380 100, 250 80 Z"
              fill="#fda4af"
              stroke="#e11d48"
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Right Atrium Chamber (Deoxygenated) */}
            <path
              d="M 135 150 C 135 120, 210 130, 210 190 C 210 220, 140 220, 135 150 Z"
              fill="#93c5fd"
              stroke="#2563eb"
              strokeWidth="3"
            />

            {/* Left Atrium Chamber (Oxygenated) */}
            <path
              d="M 290 150 C 290 120, 365 130, 365 190 C 365 220, 290 220, 290 150 Z"
              fill="#fca5a5"
              stroke="#dc2626"
              strokeWidth="3"
            />

            {/* Interventricular Septum Wall */}
            <path
              d="M 245 220 L 255 390"
              stroke="#be123c"
              strokeWidth="18"
              strokeLinecap="round"
            />

            {/* Right Ventricle Chamber */}
            <path
              d="M 155 230 C 155 230, 235 230, 235 370 C 180 350, 150 280, 155 230 Z"
              fill="#60a5fa"
              stroke="#1d4ed8"
              strokeWidth="3"
            />

            {/* Left Ventricle Chamber (Thick Wall) */}
            <path
              d="M 265 230 C 265 230, 345 230, 345 280 C 340 340, 270 375, 265 370 Z"
              fill="#f87171"
              stroke="#b91c1c"
              strokeWidth="3"
            />

            {/* Chordae Tendineae Strings */}
            <path d="M 190 235 L 185 275 M 200 235 L 205 275" stroke="#fef08a" strokeWidth="3" />
            <path d="M 310 235 L 305 275 M 320 235 L 325 275" stroke="#fef08a" strokeWidth="3" />

            {/* Blood Flow Directional Animated Arrows */}
            {/* Deoxygenated Flow */}
            <path d="M 140 80 L 140 120" stroke="#1e3a8a" strokeWidth="3" markerEnd="url(#arrow)" />
            <path d="M 180 190 L 190 240" stroke="#1e3a8a" strokeWidth="3" />
            <path d="M 200 300 C 220 250, 230 180, 240 130" stroke="#1e3a8a" strokeWidth="3" strokeDasharray="4,4" />

            {/* Oxygenated Flow */}
            <path d="M 360 170 L 330 190" stroke="#7f1d1d" strokeWidth="3" />
            <path d="M 320 210 L 310 280" stroke="#7f1d1d" strokeWidth="3" />
            <path d="M 310 320 C 330 250, 290 120, 280 80" stroke="#7f1d1d" strokeWidth="3" strokeDasharray="4,4" />

            {/* Interactive Anatomical Pins / Hotspots */}
            {HEART_ANATOMY_PARTS.map((part) => {
              const isSelected = selectedPart.id === part.id;
              return (
                <g
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  className="cursor-pointer transition-all"
                >
                  <circle
                    cx={part.cx}
                    cy={part.cy}
                    r={isSelected ? 12 : 9}
                    fill={
                      part.type === 'deoxygenated'
                        ? '#2563eb'
                        : part.type === 'oxygenated'
                        ? '#dc2626'
                        : part.type === 'valve'
                        ? '#d97706'
                        : '#7c3aed'
                    }
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 3 : 2}
                    filter={isSelected ? 'url(#glow)' : undefined}
                  />
                  <circle
                    cx={part.cx}
                    cy={part.cy}
                    r={isSelected ? 5 : 3}
                    fill="#ffffff"
                  />
                </g>
              );
            })}
          </svg>

          {/* Quick Filter Parts Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
            {HEART_ANATOMY_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                  selectedPart.id === part.id
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-rose-500'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {part.name.split(' ')[1] || part.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Anatomical Detail & Function Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-rose-200 pb-2">
              <span className="text-xs font-black uppercase text-rose-700 tracking-wider">
                Active Anatomical Part
              </span>
              <button
                onClick={() => speakPartFunction(selectedPart)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all shadow-xs"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>Listen Function</span>
              </button>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              {selectedPart.name}
            </h3>
            <p className="text-xs font-bold text-rose-800">
              {selectedPart.marathiName}
            </p>

            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-xl bg-white border border-rose-100 text-xs font-medium text-slate-800 leading-relaxed">
                <strong className="text-slate-900 block mb-1">💡 Function (Hinglish):</strong>
                {selectedPart.functionHinglish}
              </div>

              <div className="p-3 rounded-xl bg-white border border-rose-100 text-xs font-medium text-slate-800 leading-relaxed">
                <strong className="text-slate-900 block mb-1">🇲🇭 Function (Marathi):</strong>
                {selectedPart.functionMarathi}
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 shrink-0 text-blue-600" />
                <span>{selectedPart.bloodFlowInfo}</span>
              </div>
            </div>
          </div>

          {/* Blood Flow Summary Sequence Box */}
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Activity className="h-4 w-4 text-amber-400" />
              <span>Complete Blood Circulation Pathway (NEET Flow):</span>
            </div>
            <div className="text-[11px] leading-relaxed text-slate-300 font-mono space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <p className="text-blue-400">🔵 Body → Vena Cava → Right Atrium → Tricuspid → Right Ventricle → Pulmonary Artery → Lungs</p>
              <p className="text-rose-400">🔴 Lungs → Pulmonary Veins → Left Atrium → Bicuspid → Left Ventricle → Aorta → Body</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEET-Style Practice Question Box */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-700" />
            <h4 className="text-sm font-extrabold text-emerald-950">
              NEET Practice Question — Sectional Heart Anatomy
            </h4>
          </div>
          <span className="text-xs font-bold text-emerald-800">
            Question {activeQuizIndex + 1} of {neetQuestions.length}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-bold text-slate-900">
          {neetQuestions[activeQuizIndex].q}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {neetQuestions[activeQuizIndex].options.map((opt, optIdx) => {
            const isSelected = quizAnswerSelected === optIdx;
            const isCorrect = optIdx === neetQuestions[activeQuizIndex].correct;

            return (
              <button
                key={optIdx}
                onClick={() => setQuizAnswerSelected(optIdx)}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                  quizAnswerSelected !== null
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-200 text-emerald-950 font-bold'
                      : isSelected
                      ? 'border-rose-400 bg-rose-100 text-rose-900'
                      : 'border-slate-200 bg-white opacity-60'
                    : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800'
                }`}
              >
                <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {quizAnswerSelected !== null && (
          <div className="p-3 rounded-xl bg-white border border-emerald-300 text-xs font-semibold text-slate-800 space-y-2">
            <p className="text-emerald-800 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>
                {quizAnswerSelected === neetQuestions[activeQuizIndex].correct
                  ? 'Correct Answer! Great Job!'
                  : 'Incorrect. Review explanation below:'}
              </span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              {neetQuestions[activeQuizIndex].exp}
            </p>

            <button
              onClick={() => {
                setQuizAnswerSelected(null);
                setActiveQuizIndex((prev) => (prev + 1) % neetQuestions.length);
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Next Question</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
