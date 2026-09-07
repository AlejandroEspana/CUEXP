import { useState } from 'react';
import { Card } from '../ui/Card';
import { MUFLA_DATA, ODF_VS_MUFLA } from '../../data/fiber';
import { ShieldCheck, Droplets, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../layout/Layout';

export const MuflaDiagram = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [closureType, setClosureType] = useState<'dome' | 'inline'>('dome');

  const steps = [
    { 
      num: 1, 
      name: 'Entrada y Sellado del Cable', 
      highlight: 'ports',
      detail: 'El cable exterior ingresa por el puerto base con manga termocontraíble o goma de silicona compresible, garantizando estanqueidad IP68.',
      action: 'Se calienta el manguito con soplete de gas o se aprietan las cuñas mecánicas para sellar contra agua a 5 metros de profundidad.'
    },
    { 
      num: 2, 
      name: 'Anclaje del Miembro de Tracción (FRP)', 
      highlight: 'clamp',
      detail: 'La varilla central de fibra de vidrio (FRP) o acero se atornilla al chasis metálico para absorber tensiones y tirones mecánicos.',
      action: 'Impide que tirones externos transmitan fuerza mecánica a los frágiles núcleos de vidrio de 9µm dentro de la mufla.'
    },
    { 
      num: 3, 
      name: 'Enrutamiento en Tubos Holgados (Loose Tubes)', 
      highlight: 'tubes',
      detail: 'Los tubos con gel hidrófugo bloqueador de humedad guían los hilos hacia la canasta organizadora respetando el radio de curvatura.',
      action: 'Se almacena holgura de fibra (hasta 2 metros) para permitir re-empalmes futuros sin tener que tirar de cable nuevo.'
    },
    { 
      num: 4, 
      name: 'Empalme por Fusión Térmica (Arco Eléctrico)', 
      highlight: 'splice',
      detail: 'Los extremos de fibra pelados se alinean con electrodos de tungsteno, se funden con pérdida < 0.02 dB y se protegen en manguitos de acero.',
      action: 'El manguito termorretráctil horneado en campo se inserta a presión en las ranuras numeradas de la charola de empalme.'
    },
    { 
      num: 5, 
      name: 'Salida / Continuidad y Sellado de Cúpula', 
      highlight: 'exit',
      detail: 'La campana de polipropileno se cierra con la abrazadera perimétrica de acero inoxidable y se prueba hermeticidad por válvula de aire.',
      action: 'La mufla queda lista para sumergirse en pozos de registro o colgarse en postes de tendido aéreo durante más de 25 años.'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Open Splice Closure Cutaway (7 cols) */}
        <Card className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 shadow-xs">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                  Mufla FOSC (Planta Externa IP68)
                </h3>
                <p className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
                  Normas Telcordia GR-771-CORE & IEC 60529
                </p>
              </div>
            </div>
            {/* Type selector */}
            <div className="flex bg-slate-100 rounded-2xl p-1 border border-slate-200 self-start sm:self-auto shadow-inner">
              <button
                onClick={() => setClosureType('dome')}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border",
                  closureType === 'dome' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                Tipo Domo (Vertical)
              </button>
              <button
                onClick={() => setClosureType('inline')}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border",
                  closureType === 'inline' ? "bg-sky-100 border-sky-600 text-sky-950 font-black shadow-sm ring-2 ring-sky-400/40" : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                En Línea (Horizontal)
              </button>
            </div>
          </div>

          {/* CISCO LIGHT VISUAL CUTAWAY CANVAS (Fills upper space gracefully) */}
          <div className="relative bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between overflow-hidden shadow-xs">
            {/* Top Environmental IP68 Banner */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-300 text-xs font-mono text-cyan-800 font-black shadow-xs">
                <Droplets size={14} className="text-cyan-600" />
                <span>Protección IP68 (Sumergible hasta 5m de agua continua)</span>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                {closureType === 'dome' ? 'Cúpula Vertical de Domo' : 'Carcasa Horizontal Split-Case'}
              </span>
            </div>

            {/* REALISTIC SVG CUTAWAY OF FOSC SPLICE CLOSURE */}
            <div className="relative h-60 w-full flex items-center justify-center my-1">
              <svg className="w-full h-full max-w-lg" viewBox="0 0 500 220">
                <defs>
                  <linearGradient id="casing-poly" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="clamp-steel" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="fiber-ray-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {closureType === 'dome' ? (
                  /* DOME VERTICAL CLOSURE CUTAWAY */
                  <g>
                    {/* Outer Cylindrical Dome Hood */}
                    <path
                      d="M 170 170 L 170 60 Q 250 10, 330 60 L 330 170 Z"
                      fill="url(#casing-poly)"
                      stroke="#475569"
                      strokeWidth="2.5"
                    />

                    {/* Clean cutaway window inside dome */}
                    <path
                      d="M 185 160 L 185 70 Q 250 30, 315 70 L 315 160 Z"
                      fill="#ffffff"
                      stroke="#0284c7"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />

                    {/* Internal Hinged Splice Tray Cassette Stack */}
                    <rect x="205" y="65" width="90" height="75" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                    <text x="250" y="80" fill="#0369a1" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="900">
                      BANDEJA FUSIÓN
                    </text>

                    {/* Fusion Splice Sleeves (heat-shrink steel sleeves) inside tray */}
                    {[88, 98, 108, 118, 128].map((y, i) => (
                      <g key={i}>
                        <rect x="215" y={y} width="70" height="5.5" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                        <line x1="218" y1={y+2.7} x2="282" y2={y+2.7} stroke="#0284c7" strokeWidth="1.8" />
                        {activeStep === 4 && (
                          <circle cx="250" cy={y+2.7} r="2.5" fill="#ef4444" className="animate-ping" />
                        )}
                      </g>
                    ))}

                    {/* Slack Basket (Fiber storage loops) */}
                    <path d="M 195 140 Q 250 160, 305 140" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="3 2" />

                    {/* Stainless Steel Locking Clamp Ring Band */}
                    <rect x="160" y="170" width="180" height="14" rx="3" fill="url(#clamp-steel)" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="175" cy="177" r="3" fill="#475569" />
                    <circle cx="325" cy="177" r="3" fill="#475569" />
                    <text x="250" y="180" fill="#1e293b" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="900">
                      ABRAZADERA PERIMÉTRICA CON LATCH
                    </text>

                    {/* Base with 4 Round Drop Ports + 1 Oval Main Port */}
                    <rect x="175" y="184" width="150" height="12" fill="#64748b" stroke="#475569" strokeWidth="1" rx="2" />

                    {/* Incoming Main Cable 1 (left) */}
                    <rect x="190" y="196" width="14" height="24" fill="#334155" rx="2" />
                    {/* Sealing heat-shrink sleeve */}
                    <rect x="187" y="190" width="20" height="12" fill="#0284c7" opacity="0.9" rx="2" />

                    {/* Continuous Express loop cable (center oval port) */}
                    <rect x="238" y="196" width="24" height="24" fill="#334155" rx="4" />
                    <rect x="234" y="190" width="32" height="12" fill="#0284c7" opacity="0.9" rx="3" />

                    {/* Outgoing Drop Cable 2 (right) */}
                    <rect x="296" y="196" width="14" height="24" fill="#334155" rx="2" />
                    <rect x="293" y="190" width="20" height="12" fill="#0284c7" opacity="0.9" rx="2" />

                    {/* Optical Fiber Active Light Path traveling in dome */}
                    <motion.path
                      d="M 197 220 L 197 165 Q 197 100, 250 88 L 250 128 Q 303 100, 303 165 L 303 220"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                      animate={{ strokeDashoffset: [0, -36] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    />
                  </g>
                ) : (
                  /* INLINE HORIZONTAL CLOSURE CUTAWAY */
                  <g>
                    {/* Outer Clamshell Ribbed Body */}
                    <rect x="70" y="55" width="360" height="110" rx="14" fill="url(#casing-poly)" stroke="#475569" strokeWidth="2.5" />
                    
                    {/* Reinforcement Ribs across body */}
                    {[120, 160, 200, 240, 280, 320, 360].map((x, idx) => (
                      <line key={idx} x1={x} y1="56" x2={x} y2="164" stroke="#94a3b8" strokeWidth="1.5" />
                    ))}

                    {/* Internal Cutaway Opening */}
                    <rect x="95" y="70" width="310" height="80" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Central Splice Trays Stack */}
                    <rect x="175" y="76" width="150" height="68" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                    <text x="250" y="92" fill="#0369a1" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="900">
                      CHAROLA CENTRAL EN LÍNEA
                    </text>

                    {/* Splice Sleeves in Horizontal Tray */}
                    {[100, 110, 120, 130].map((y, i) => (
                      <g key={i}>
                        <rect x="195" y={y} width="110" height="5.5" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
                        <line x1="200" y1={y+2.7} x2="300" y2={y+2.7} stroke="#0284c7" strokeWidth="1.8" />
                      </g>
                    ))}

                    {/* Left Cable Gland Entry */}
                    <rect x="30" y="98" width="40" height="24" rx="4" fill="#334155" />
                    <rect x="58" y="94" width="16" height="32" rx="3" fill="#0284c7" opacity="0.9" />
                    <text x="50" y="88" fill="#334155" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">ENTRADA</text>

                    {/* Right Cable Gland Exit */}
                    <rect x="430" y="98" width="40" height="24" rx="4" fill="#334155" />
                    <rect x="426" y="94" width="16" height="32" rx="3" fill="#0284c7" opacity="0.9" />
                    <text x="450" y="88" fill="#334155" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">SALIDA</text>

                    {/* Linear Light Path */}
                    <motion.path
                      d="M 30 110 L 175 110 L 325 110 L 470 110"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3.5"
                      strokeDasharray="8 4"
                      animate={{ strokeDashoffset: [0, -48] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* SPLICE SEQUENCE STEP CHIPS (1 to 5) */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-3 relative px-2">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
                {steps.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setActiveStep(s.num)}
                    className={cn(
                      "relative z-10 w-9 sm:w-11 h-9 sm:h-11 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-black transition-all duration-200 shadow-xs",
                      activeStep === s.num
                        ? "bg-sky-100 border-2 border-sky-600 text-sky-950 ring-4 ring-sky-400/40 scale-110 shadow-md"
                        : "bg-white text-slate-700 border-2 border-slate-300 hover:border-sky-400 hover:bg-sky-50"
                    )}
                  >
                    {s.num}
                  </button>
                ))}
              </div>

              {/* Current Active Step Information Card */}
              <div className="p-4 rounded-2xl bg-white border-2 border-sky-200 shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-xs font-mono text-sky-800 font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-sky-600" />
                    Paso {activeStep} de 5: {steps[activeStep - 1].name}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Procedimiento ANSI/TIA
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
                  {steps[activeStep - 1].detail}
                </p>
                <div className="mt-2 text-[11px] font-mono text-slate-600 border-t border-slate-100 pt-2">
                  <strong className="text-slate-900">Operación Técnica: </strong>
                  {steps[activeStep - 1].action}
                </div>
              </div>
            </div>

            {/* Bottom Materials Callout */}
            <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-slate-600 pt-3 border-t border-slate-200">
              <div>Sellado: <strong className="text-slate-900">Gomas elastoméricas de silicona / Termocontraíble</strong></div>
              <div>Carcasa: <strong className="text-sky-800">Polipropileno de alto impacto (PP + UV)</strong></div>
            </div>
          </div>
        </Card>

        {/* Technical Explanations (5 cols) */}
        <Card className="lg:col-span-5 p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="border-b-2 border-slate-100 pb-3">
              <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-black bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Planta Externa de Telecomunicaciones
              </span>
              <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mt-2">
                {MUFLA_DATA.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5 font-semibold">
                {MUFLA_DATA.environment}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-slate-500 font-black mb-1.5">
                ¿Por qué una mufla y no un gabinete normal?
              </h5>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-sans">
                En cámaras subterráneas y alcantarillados urbanos, las lluvias e inundaciones cubren los cables con agua durante meses. Una mufla posee <strong>estanqueidad absoluta IP68</strong>; ni una sola gota de agua ni gas corrosivo entra en contacto con el vidrio de la fibra, evitando microfisuras y ruptura por tensión hídrica.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-mono uppercase text-emerald-700 font-black flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Variantes de Instalación Física
              </h5>
              {MUFLA_DATA.types.map((t, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
                  <span className="font-black text-slate-900">{t.type}: </span>
                  <span className="text-slate-600 font-sans">{t.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t-2 border-slate-100 text-xs sm:text-sm font-mono text-slate-700">
            <strong className="text-amber-800 font-black">Diferencia Clave con el ODF: </strong>
            Una mufla NUNCA tiene conectores accesibles para enchufar o desenchufar cables a diario; es una cápsula hermética de fusión definitiva.
          </div>
        </Card>
      </div>

      {/* Direct Comparison Table: ODF vs. Mufla */}
      <Card className="p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-lg rounded-3xl">
        <h4 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-5 flex items-center gap-2.5">
          <Layers size={24} className="text-sky-600" />
          {ODF_VS_MUFLA.title}
        </h4>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left font-mono border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-700 bg-slate-50 text-xs sm:text-sm uppercase tracking-wider">
                <th className="py-3.5 px-4 font-black">Aspecto</th>
                <th className="py-3.5 px-4 text-sky-800 font-black">ODF (Optical Distribution Frame)</th>
                <th className="py-3.5 px-4 text-amber-800 font-black">Mufla (Splice Closure FOSC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-sans text-xs sm:text-sm">
              {ODF_VS_MUFLA.comparison.map((c, i) => (
                <tr key={i} className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900 font-mono text-xs sm:text-sm">{c.feature}</td>
                  <td className="py-3.5 px-4 text-xs sm:text-sm text-slate-700">{c.odf}</td>
                  <td className="py-3.5 px-4 text-xs sm:text-sm font-medium text-slate-700">{c.mufla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
