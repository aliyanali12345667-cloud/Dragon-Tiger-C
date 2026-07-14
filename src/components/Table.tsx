import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BetOption, BetPlacement, ChipValue, GamePhase, GameHistoryItem } from '../types';
import Chip from './Chip';

interface TableProps {
  phase: GamePhase;
  bets: Record<BetOption, number>;
  totalTableBets: Record<BetOption, number>;
  placements: BetPlacement[];
  selectedChip: ChipValue;
  onPlaceBet: (option: BetOption, x: number, y: number) => void;
  isWinningOption?: BetOption | null;
  history: GameHistoryItem[];
}

export default function Table({
  phase,
  bets,
  totalTableBets,
  placements,
  selectedChip,
  onPlaceBet,
  isWinningOption,
  history,
}: TableProps) {
  const handleBetClick = (event: React.MouseEvent<HTMLButtonElement>, option: BetOption) => {
    if (phase !== 'BETTING') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Keep chips inside a safe boundary
    const safeX = Math.max(15, Math.min(85, x));
    const safeY = Math.max(25, Math.min(75, y));

    onPlaceBet(option, safeX, safeY);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-2 relative z-10 gap-3" id="betting-table-root">
      
      {/* 🏛️ CHINESE IMPERIAL COURT WOODEN BOARD CHASSIS */}
      <div className="w-full bg-[#3d1858] rounded-2xl border-4 border-[#b1892d] shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden p-2.5 flex flex-col gap-3">
        {/* Subtle wood panel stripes */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d1242]/40 via-transparent to-[#2d1242]/70 pointer-events-none" />

        {/* Decorative Golden Left & Right Pillars */}
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-[#d2a33c] via-[#ffe39c] to-[#98721c] border-r border-[#ffe39c]/25 pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-[#d2a33c] via-[#ffe39c] to-[#98721c] border-l border-[#ffe39c]/25 pointer-events-none z-20" />

        {/* THREE CHINESE STYLE LUXURY BETTING BOXES */}
        <div className="grid grid-cols-3 gap-2.5 relative z-10 w-full">
          
          {/* ==========================================
              🐉 DRAGON BET BOX (PURPLE-INDIGO THEME)
              ========================================== */}
          <button
            onClick={(e) => handleBetClick(e, 'DRAGON')}
            disabled={phase !== 'BETTING'}
            className={`group relative h-48 sm:h-52 rounded-xl flex flex-col items-center justify-between p-3 border-2 transition-all overflow-hidden ${
              phase === 'BETTING' 
                ? 'cursor-pointer hover:border-violet-300 hover:bg-violet-950/20 active:scale-[0.99]' 
                : 'cursor-default'
            } ${
              isWinningOption === 'DRAGON'
                ? 'border-[#ffea8c] bg-[#3a2072] ring-4 ring-[#ffe873]/60 shadow-[0_0_35px_rgba(139,92,246,0.8)] animate-pulse'
                : 'border-[#ffe48f]/20 bg-[#281b52]/90'
            }`}
            style={{ transitionDuration: '150ms' }}
            id="bet-dragon"
          >
            {/* Dragon Illustration Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-105 transition-transform duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-40 h-40 text-violet-300 fill-current">
                <path d="M50,5 C40,15 30,10 20,25 C10,40 25,50 30,65 C35,80 20,90 40,95 C60,100 70,85 80,75 C90,65 95,45 85,30 C75,15 60,5 50,5 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M35,45 C45,35 55,55 65,45 M25,55 C35,65 45,35 55,65" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="4" />
              </svg>
            </div>

            {/* Top Total Bet Display Plate */}
            <div className="w-full text-center z-10">
              <div className="text-white font-mono text-base font-extrabold tracking-wide drop-shadow-md">
                {totalTableBets.DRAGON.toLocaleString()}
              </div>
            </div>

            {/* Dragon Label Area */}
            <div className="flex flex-col items-center justify-center z-10 flex-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-wider text-violet-100 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Dragon
              </span>
              <span className="text-xs sm:text-sm font-bold font-mono text-violet-400 mt-0.5">
                1:0.9
              </span>
            </div>

            {/* Bottom Personal Bet Display Plate */}
            <div className="w-full flex justify-center z-10 min-h-6">
              <span className="text-[15px] font-mono font-black text-violet-300 drop-shadow-md">
                {bets.DRAGON > 0 ? bets.DRAGON.toLocaleString() : '0'}
              </span>
            </div>

            {/* Render Placed Chips Stack Visuals */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {placements
                .filter((p) => p.option === 'DRAGON')
                .map((p) => (
                  <div
                    key={p.id}
                    className="absolute z-30"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <Chip value={p.value} size="sm" />
                  </div>
                ))}
            </div>
          </button>

          {/* ==========================================
              🟢 TIE BET BOX (JADE GREEN THEME)
              ========================================== */}
          <button
            onClick={(e) => handleBetClick(e, 'TIE')}
            disabled={phase !== 'BETTING'}
            className={`group relative h-48 sm:h-52 rounded-xl flex flex-col items-center justify-between p-3 border-2 transition-all overflow-hidden ${
              phase === 'BETTING' 
                ? 'cursor-pointer hover:border-emerald-350 hover:bg-emerald-950/20 active:scale-[0.99]' 
                : 'cursor-default'
            } ${
              isWinningOption === 'TIE'
                ? 'border-[#ffea8c] bg-[#1a4e32] ring-4 ring-[#ffe873]/60 shadow-[0_0_35px_rgba(16,185,129,0.8)] animate-pulse'
                : 'border-[#ffe48f]/20 bg-[#163525]/90'
            }`}
            style={{ transitionDuration: '150ms' }}
            id="bet-tie"
          >
            {/* Tie Illustration Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-105 transition-transform duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-32 h-32 text-emerald-300 fill-current">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M50,10 L50,90 M10,50 L90,50" stroke="currentColor" strokeWidth="1.5" />
                <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)" />
              </svg>
            </div>

            {/* Top Total Bet Display Plate */}
            <div className="w-full text-center z-10">
              <div className="text-white font-mono text-base font-extrabold tracking-wide drop-shadow-md">
                {totalTableBets.TIE.toLocaleString()}
              </div>
            </div>

            {/* Tie Label Area */}
            <div className="flex flex-col items-center justify-center z-10 flex-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-wider text-emerald-100 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Tie
              </span>
              <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400 mt-0.5">
                1:8
              </span>
            </div>

            {/* Bottom Personal Bet Display Plate */}
            <div className="w-full flex justify-center z-10 min-h-6">
              <span className="text-[15px] font-mono font-black text-emerald-300 drop-shadow-md">
                {bets.TIE > 0 ? bets.TIE.toLocaleString() : '0'}
              </span>
            </div>

            {/* Render Placed Chips Stack Visuals */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {placements
                .filter((p) => p.option === 'TIE')
                .map((p) => (
                  <div
                    key={p.id}
                    className="absolute z-30"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <Chip value={p.value} size="sm" />
                  </div>
                ))}
            </div>
          </button>

          {/* ==========================================
              🐯 TIGER BET BOX (AMBER-ORANGE THEME)
              ========================================== */}
          <button
            onClick={(e) => handleBetClick(e, 'TIGER')}
            disabled={phase !== 'BETTING'}
            className={`group relative h-48 sm:h-52 rounded-xl flex flex-col items-center justify-between p-3 border-2 transition-all overflow-hidden ${
              phase === 'BETTING' 
                ? 'cursor-pointer hover:border-amber-300 hover:bg-amber-950/20 active:scale-[0.99]' 
                : 'cursor-default'
            } ${
              isWinningOption === 'TIGER'
                ? 'border-[#ffea8c] bg-[#5a2e12] ring-4 ring-[#ffe873]/60 shadow-[0_0_35px_rgba(245,158,11,0.8)] animate-pulse'
                : 'border-[#ffe48f]/20 bg-[#351b0a]/90'
            }`}
            style={{ transitionDuration: '150ms' }}
            id="bet-tiger"
          >
            {/* Tiger Illustration Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-105 transition-transform duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-40 h-40 text-amber-300 fill-current">
                <path d="M10,50 C10,30 30,10 50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M25,35 L40,45 L35,55 M75,35 L60,45 L65,55" stroke="currentColor" strokeWidth="1.5" />
                <path d="M45,25 L55,25 M40,30 L60,30" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Top Total Bet Display Plate */}
            <div className="w-full text-center z-10">
              <div className="text-white font-mono text-base font-extrabold tracking-wide drop-shadow-md">
                {totalTableBets.TIGER.toLocaleString()}
              </div>
            </div>

            {/* Tiger Label Area */}
            <div className="flex flex-col items-center justify-center z-10 flex-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-wider text-amber-100 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Tiger
              </span>
              <span className="text-xs sm:text-sm font-bold font-mono text-amber-450 mt-0.5">
                1:0.9
              </span>
            </div>

            {/* Bottom Personal Bet Display Plate */}
            <div className="w-full flex justify-center z-10 min-h-6">
              <span className="text-[15px] font-mono font-black text-amber-300 drop-shadow-md">
                {bets.TIGER > 0 ? bets.TIGER.toLocaleString() : '0'}
              </span>
            </div>

            {/* Render Placed Chips Stack Visuals */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {placements
                .filter((p) => p.option === 'TIGER')
                .map((p) => (
                  <div
                    key={p.id}
                    className="absolute z-30"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <Chip value={p.value} size="sm" />
                  </div>
                ))}
            </div>
          </button>

        </div>

        {/* 📊 REAL AUTHENTIC MINI ROADMAP BEAD FIELD (AS IN SCREENSHOT) */}
        <div className="w-full bg-[#1b082a] rounded-xl border border-[#ffe48f]/10 p-2 flex items-center gap-2 shadow-inner relative z-10">
          <div className="flex-1 flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#ffe48f]/10 scrollbar-track-transparent">
            {history.slice(-17).map((item, idx, arr) => {
              const isNewest = idx === arr.length - 1;
              let bg = "bg-gradient-to-b from-[#1d4ed8] to-[#1e3a8a] border-blue-400";
              let labelPart1 = "DRA";
              let labelPart2 = "GON";
              let textClass = "text-blue-100";
              let isTie = false;

              if (item.winner === 'TIGER') {
                bg = "bg-gradient-to-b from-[#dc2626] to-[#7f1d1d] border-red-400";
                labelPart1 = "TI";
                labelPart2 = "GER";
                textClass = "text-red-100";
              } else if (item.winner === 'TIE') {
                bg = "bg-gradient-to-b from-[#10b981] to-[#064e3b] border-emerald-400";
                labelPart1 = "TIE";
                labelPart2 = "";
                textClass = "text-emerald-100";
                isTie = true;
              }

              return (
                <div key={item.roundId} className="relative shrink-0 select-none">
                  <div className={`w-8 h-8 rounded-full ${bg} flex flex-col items-center justify-center text-[8px] font-black leading-[0.95] tracking-tight text-center border shadow-md relative`}>
                    <span className={textClass}>{labelPart1}</span>
                    {!isTie && <span className={textClass}>{labelPart2}</span>}
                  </div>
                  {isNewest && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-[8px] font-extrabold text-slate-950 px-0.5 rounded-full border border-slate-950 scale-75 animate-bounce z-10">
                      N
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
