import { motion } from 'motion/react';
import { ChipValue } from '../types';

interface ChipProps {
  value: ChipValue;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function getChipColors(value: ChipValue): {
  bg: string;
  border: string;
  text: string;
  accent: string;
} {
  switch (value) {
    case 1:
      return {
        bg: 'bg-emerald-600',
        border: 'border-emerald-400',
        text: 'text-white',
        accent: 'bg-emerald-800',
      };
    case 10:
      return {
        bg: 'bg-blue-600',
        border: 'border-blue-400',
        text: 'text-white',
        accent: 'bg-blue-800',
      };
    case 50:
      return {
        bg: 'bg-indigo-600',
        border: 'border-indigo-400',
        text: 'text-white',
        accent: 'bg-indigo-800',
      };
    case 100:
      return {
        bg: 'bg-rose-600',
        border: 'border-rose-400',
        text: 'text-white',
        accent: 'bg-rose-800',
      };
    case 1000:
      return {
        bg: 'bg-amber-500',
        border: 'border-amber-300',
        text: 'text-amber-950',
        accent: 'bg-amber-700',
      };
  }
}

export default function Chip({ value, size = 'md', animated = true }: ChipProps) {
  const colors = getChipColors(value);
  
  const sizeClasses = {
    sm: 'w-7 h-7 text-[9px] border-2 shadow-md',
    md: 'w-11 h-11 text-[11px] border-4 shadow-xl',
    lg: 'w-16 h-16 text-sm border-[5px] shadow-2xl',
  };

  const label = value >= 1000 ? `${value / 1000}K` : String(value);

  const content = (
    <div
      className={`rounded-full flex items-center justify-center font-extrabold font-mono relative shrink-0 ${sizeClasses[size]} ${colors.bg} ${colors.border} ${colors.text} select-none overflow-hidden`}
      style={{
        boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.4)',
      }}
    >
      {/* 3D Inner Ridge Line */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/40 m-0.5 pointer-events-none" />
      <div className="absolute inset-1 rounded-full border border-dashed border-black/35 pointer-events-none" />
      
      {/* Dynamic Radial Clay Stripes around edge */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className={`w-full h-1.5 ${colors.accent} rotate-0 absolute`} />
        <div className={`w-full h-1.5 ${colors.accent} rotate-30 absolute`} />
        <div className={`w-full h-1.5 ${colors.accent} rotate-60 absolute`} />
        <div className={`w-full h-1.5 ${colors.accent} rotate-90 absolute`} />
        <div className={`w-full h-1.5 ${colors.accent} rotate-120 absolute`} />
        <div className={`w-full h-1.5 ${colors.accent} rotate-150 absolute`} />
      </div>

      {/* Glossy Glass Crescent Highlight */}
      <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-white/35 to-transparent h-1/2 pointer-events-none z-10" />
      <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/20 pointer-events-none z-10" />

      {/* Thick Clay Circular Ring Rim */}
      <div className="absolute inset-1 rounded-full border border-white/25 pointer-events-none" />

      {/* Inner Metallic Circular Inlay Core */}
      <div className="absolute w-2/3 h-2/3 rounded-full bg-slate-950 border border-white/20 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] z-10">
        <div className="absolute inset-0.5 rounded-full border border-amber-500/20 pointer-events-none" />
        <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] text-center tracking-tight">
          {label}
        </span>
      </div>
    </div>
  );

  if (!animated) {
    return content;
  }

  return (
    <motion.div
      initial={{ scale: 0, y: -20, rotate: -45 }}
      animate={{ scale: 1, y: 0, rotate: 0 }}
      exit={{ scale: 0, y: 20 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
    >
      {content}
    </motion.div>
  );
}
