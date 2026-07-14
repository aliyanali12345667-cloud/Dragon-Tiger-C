import { motion } from 'motion/react';
import { Card as CardType } from '../types';
import { getSuitSymbol, getSuitColor } from '../utils/cards';

interface CardProps {
  card: CardType | null;
  flipped: boolean;
  isWinning?: boolean;
  label: string; // 'DRAGON' or 'TIGER'
}

export default function Card({ card, flipped, isWinning, label }: CardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label above the card */}
      <span className={`text-xs font-semibold tracking-widest ${
        label === 'DRAGON' ? 'text-indigo-400' : 'text-amber-400'
      }`}>
        {label}
      </span>

      {/* Card container with 3D perspective */}
      <div className="relative w-28 h-40 [perspective:1000px]">
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`w-full h-full relative [transform-style:preserve-3d] rounded-xl shadow-2xl ${
            isWinning ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.6)]' : ''
          }`}
        >
          {/* PREMIUM CASINO CARD BACK - GOLDEN PREMIUM STYLE */}
          <div className="absolute inset-0 w-full h-full rounded-xl [backface-visibility:hidden] bg-gradient-to-br from-[#fff3b3] via-[#dca631] to-[#6b4c10] border-2 border-[#ffeb99] p-2 flex flex-col justify-between overflow-hidden shadow-[0_0_25px_rgba(220,166,49,0.5)]">
            {/* Elegant luxury pattern overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:8px_8px]" />
            <div className="absolute inset-1 border border-[#ffeb99]/40 rounded-lg pointer-events-none" />
            <div className="absolute inset-2 border border-[#6b4c10]/20 rounded-md pointer-events-none" />
            
            {/* Corner traditional marks in gold */}
            <div className="text-[7px] text-[#ffeb99]/90 font-serif font-bold tracking-wider select-none">★ PREMIER ★</div>
            
            {/* Central Golden Premium Emblem */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="w-20 h-28 border border-[#ffeb99]/50 rounded-lg bg-gradient-to-b from-[#3a0d4c]/90 to-[#1b0329]/95 flex flex-col items-center justify-between py-2 px-1 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.5)]">
                
                {/* Golden Badge Title */}
                <div className="text-[7px] text-[#ffeb99] font-black tracking-[0.2em] uppercase text-center w-full">
                  {label === 'DRAGON' ? 'GOLDEN DRAGO' : 'GOLDEN TIGRIS'}
                </div>
                
                {/* Magnificent Dragon/Tiger SVG Emblem */}
                {label === 'DRAGON' ? (
                  <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
                    {/* Dragon head and fire path */}
                    <path
                      fill="url(#goldGradient)"
                      d="M50,15 C45,15 35,22 35,32 C35,42 45,45 42,55 C39,65 25,60 25,72 C25,84 38,90 50,90 C62,90 75,84 75,72 C75,60 61,65 58,55 C55,45 65,42 65,32 C65,22 55,15 50,15 Z M50,25 C53,25 56,28 56,32 C56,36 53,39 50,39 C47,39 44,36 44,32 C44,28 47,25 50,25 Z"
                    />
                    {/* Artistic wings / coils */}
                    <path
                      fill="none"
                      stroke="url(#goldGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      d="M20,40 C15,50 15,60 30,68 M80,40 C85,50 85,60 70,68"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
                    {/* Tiger head path */}
                    <path
                      fill="url(#goldGradient)"
                      d="M50,12 L32,22 L38,40 L22,46 L30,68 L50,88 L70,68 L78,46 L62,40 L68,22 Z M50,35 C54,35 58,38 58,42 C58,46 54,49 50,49 C46,49 42,46 42,42 C42,38 46,35 50,35 Z"
                    />
                    {/* Tiger stripes */}
                    <path
                      fill="none"
                      stroke="#180329"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      d="M40,55 L45,58 M60,55 L55,58 M48,70 L52,70"
                    />
                  </svg>
                )}
                
                {/* GOLDEN PRIME Badge Label */}
                <div className="flex items-center gap-0.5 bg-gradient-to-r from-[#ffe49c] via-[#b38728] to-[#ffe49c] px-1.5 py-0.5 rounded text-[5px] text-zinc-950 font-black tracking-wider shadow-md">
                  ★ PRIME CARD
                </div>
              </div>
            </div>

            <div className="text-[7px] text-[#ffeb99]/90 font-serif font-bold tracking-wider text-right select-none">★ GOLDEN ★</div>
            
            {/* SVG Gradients for beautiful metallic gold */}
            <svg className="absolute w-0 h-0">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe49c" />
                  <stop offset="50%" stopColor="#d2a33c" />
                  <stop offset="100%" stopColor="#8d661b" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* REAL LIFE LINEN CARD FRONT (Premium Off-White Paper Texture) */}
          <div className="absolute inset-0 w-full h-full rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-tr from-stone-100 via-stone-50 to-white border-2 border-amber-600/20 p-2 flex flex-col justify-between shadow-[inset_0_2px_6px_rgba(255,255,255,1),0_10px_20px_rgba(0,0,0,0.4)]">
            {card ? (
              <>
                {/* Inset elegant golden border */}
                <div className="absolute inset-1 border border-amber-600/10 rounded-lg pointer-events-none" />

                {/* Top Corner Index */}
                <div className="flex flex-col items-center leading-none z-10">
                  <span className={`text-xl font-serif font-bold ${
                    card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-zinc-900'
                  }`}>
                    {card.label}
                  </span>
                  <span className={`text-base ${
                    card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-zinc-900'
                  }`}>
                    {getSuitSymbol(card.suit)}
                  </span>
                </div>

                {/* Big Center Artwork / Illustration */}
                <div className="flex-1 flex items-center justify-center relative z-10">
                  <span className={`text-4xl filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] ${
                    card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-zinc-900'
                  }`}>
                    {getSuitSymbol(card.suit)}
                  </span>
                  {/* Subtle Elegant Rank Watermark background */}
                  <span className="absolute text-amber-900/5 text-7xl font-bold font-serif select-none pointer-events-none -z-10">
                    {card.label}
                  </span>
                </div>

                {/* Bottom Corner Index (Inverted) */}
                <div className="flex flex-col items-center leading-none transform rotate-180 self-end z-10">
                  <span className={`text-xl font-serif font-bold ${
                    card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-zinc-900'
                  }`}>
                    {card.label}
                  </span>
                  <span className={`text-base ${
                    card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-600' : 'text-zinc-900'
                  }`}>
                    {getSuitSymbol(card.suit)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-serif text-xs italic">
                Vacant
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
