import { motion } from 'framer-motion';

export const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-slate-50">
      {/* Subtle tech grid for light presentation */}
      <div className="absolute inset-0 tech-grid opacity-60"></div>

      {/* Top Left Ambient Luminous Glow (Cisco Sky Blue) */}
      <div 
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
      />

      {/* Center Right Ambient Glow (Cisco Cyan / Teal) */}
      <div 
        className="absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full opacity-20 blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />

      {/* Bottom Center Ambient Glow (Soft Indigo / Lavender) */}
      <div 
        className="absolute -bottom-40 left-1/4 w-[750px] h-[750px] rounded-full opacity-15 blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
      />

      {/* Digital signal packet waveforms */}
      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 200 Q 300 150, 600 250 T 1200 200 T 1800 220"
          fill="none"
          stroke="url(#wave-glow)"
          strokeWidth="2"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M 0 600 Q 400 520, 800 620 T 1600 580 T 2200 610"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [1, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
};

