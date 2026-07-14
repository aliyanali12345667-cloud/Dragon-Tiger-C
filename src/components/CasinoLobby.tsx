import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Wallet, Trophy, Play, Star, Sparkles } from 'lucide-react';
import ThreeDRenderer from './ThreeDRenderer';
import GalaxyBackground from './GalaxyBackground';
import ScaleToFit from './ScaleToFit';

interface CasinoLobbyProps {
  userBalance: number;
  onEnterTable: (tableName: string, minBet: number, maxBet: number) => void;
}

interface TableOption {
  id: string;
  name: string;
  sub: string;
  minBet: number;
  maxBet: number;
  players: number;
  difficulty: string;
  color: string;
  accentColor: string;
  bgGradient: string;
}

export default function CasinoLobby({ userBalance, onEnterTable }: CasinoLobbyProps) {
  const [selectedTable, setSelectedTable] = useState<string>('table-2');

  const tables: TableOption[] = [
    {
      id: 'table-1',
      name: "Anubis Royal Sanctuary",
      sub: "PRIVATE PHARAOH GOLD VAULT",
      minBet: 100,
      maxBet: 10000,
      players: 8,
      difficulty: 'VIP',
      color: 'border-yellow-500/40 text-yellow-400',
      accentColor: 'bg-yellow-500',
      bgGradient: 'from-amber-950/40 via-slate-900/90 to-amber-950/40',
    },
    {
      id: 'table-2',
      name: 'Gladiator Golden Arena',
      sub: 'THE IMPERIAL COLOSEUM COURT',
      minBet: 10,
      maxBet: 1000,
      players: 46,
      difficulty: 'Popular',
      color: 'border-violet-500/50 text-violet-400',
      accentColor: 'bg-violet-500',
      bgGradient: 'from-violet-950/40 via-slate-900/95 to-violet-950/40',
    },
    {
      id: 'table-3',
      name: "Temple of the Nile",
      sub: "SACRED BLUE DIAMOND SHRINE",
      minBet: 50,
      maxBet: 5000,
      players: 21,
      difficulty: 'Elite',
      color: 'border-emerald-500/40 text-emerald-400',
      accentColor: 'bg-emerald-500',
      bgGradient: 'from-emerald-950/40 via-slate-900/90 to-emerald-950/40',
    },
  ];

  const currentTableObj = tables.find((t) => t.id === selectedTable) || tables[1];

  return (
    <div className="h-screen w-screen text-slate-100 flex flex-col font-sans relative overflow-hidden select-none" id="lobby-root">
      {/* Gradients to blend and keep UI legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04020a]/50 via-transparent to-[#04020a]/95 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#04020a]/30 to-[#04020a]/85 pointer-events-none z-0" />
      <GalaxyBackground />
      
      {/* EAST-ASIAN DYNASTY GOLD HEADER PATTERN */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-700 via-yellow-500 to-violet-600 shadow-md" />

      <ScaleToFit targetWidth={1120} targetHeight={780}>
        {/* MAIN LOBBY INNER PANEL */}
        <div className="w-full h-full px-6 py-6 flex flex-col justify-between relative z-10 gap-6">
          
          {/* BRANDING HEADER */}
          <div className="text-center flex flex-col items-center gap-2">
   
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-black tracking-widest bg-gradient-to-b from-[#ffe39c] via-[#d2a33c] to-[#98721c] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] uppercase"
            >
              Colosseum Royale
            </motion.h1>
          <p className="text-xs font-mono tracking-[0.3em] text-[#ffe39c] uppercase">
            Draco vs Tigris • The Ultimate Ancient Duel
          </p>
        </div>

        {/* CENTER CONTENT: SPLIT 3D MODELS PREVIEW & TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: 3D DUAL PREVIEW (4 COLUMNS) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/2 to-transparent pointer-events-none" />
            
            <h2 className="text-sm font-bold tracking-widest font-serif text-amber-400 uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Live 3D Arena Preview
            </h2>

            <div className="grid grid-cols-2 gap-4 flex-1 items-center">
              {/* Dragon Preview Box */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square max-w-[160px] rounded-xl border border-rose-500/20 bg-slate-950 shadow-[0_0_15px_rgba(239,68,68,0.15)] overflow-hidden relative flex items-center justify-center">
                  <ThreeDRenderer modelType="dragon" isAnimating={true} width={160} height={160} />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/30 text-[8px] font-mono text-rose-400">
                    DRACO
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400">Volcanic Fire</span>
              </div>

              {/* Tiger Preview Box */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square max-w-[160px] rounded-xl border border-cyan-500/20 bg-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.15)] overflow-hidden relative flex items-center justify-center">
                  <ThreeDRenderer modelType="tiger" isAnimating={true} width={160} height={160} />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[8px] font-mono text-cyan-400">
                    TIGRIS
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400">Storm Lightning</span>
              </div>
            </div>

            {/* Rules Quick Info Card */}
            <div className="bg-slate-950/60 rounded-xl border border-slate-800/50 p-4 text-xs text-slate-400 flex flex-col gap-2 leading-relaxed">
              <div className="flex items-center justify-between text-[10px] text-amber-500/80 font-bold tracking-wider font-mono">
                <span>DECK QUANTITY</span>
                <span>8 STANDARD DECKS</span>
              </div>
              <p>
                Dragon or Tiger receives one real physical card face-up. The side with the higher card value wins! Ties pay <strong className="text-emerald-400">8:1</strong> and refund <strong className="text-amber-400">50%</strong> of primary bets.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: CHOOSE A TABLE & STATS (7 COLUMNS) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            
            {/* Table Selection Cards */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-bold tracking-widest font-serif text-amber-400 uppercase flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                Select Imperial Table
              </h2>

              <div className="flex flex-col gap-3">
                {tables.map((table) => {
                  const isSelected = selectedTable === table.id;
                  return (
                    <motion.div
                      key={table.id}
                      onClick={() => setSelectedTable(table.id)}
                      whileHover={{ scale: 1.01 }}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between relative overflow-hidden bg-gradient-to-r ${table.bgGradient} ${
                        isSelected 
                          ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-[1.01]' 
                          : 'border-slate-800 hover:border-slate-700/80'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Selector indicator */}
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-400' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                        </div>

                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-slate-400 block uppercase leading-none mb-1">
                            {table.sub}
                          </span>
                          <h3 className="font-serif font-bold text-white text-base leading-none">
                            {table.name}
                          </h3>
                          <span className="text-[10px] text-slate-400 font-mono mt-1.5 block">
                            LIMIT: {table.minBet.toLocaleString()} — {table.maxBet.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 text-right">
                        <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded font-mono ${
                          table.difficulty === 'VIP' ? 'bg-rose-950/80 text-rose-400 border border-rose-500/30' :
                          table.difficulty === 'Elite' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' :
                          'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                        }`}>
                          {table.difficulty}
                        </span>
                        <span className="text-[10px] text-slate-300 font-mono flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-400" />
                          {table.players} Players
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* PLAYER PROFILE BAR / STATS GRID */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 shadow-inner grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Balance Summary */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">My Balance</span>
                  <span className="text-sm font-extrabold font-mono text-white leading-none">
                    {userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Gladiator Level */}
              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0 sm:pl-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">Gladiator Class</span>
                  <span className="text-xs font-bold text-indigo-300">Imperial Centurion</span>
                </div>
              </div>

              {/* Total Hands Saved */}
              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0 sm:pl-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">Est. Win Rate</span>
                  <span className="text-xs font-bold text-emerald-300">54.8% (Gold Level)</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM ACTION BAR: ENTER ARENA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEnterTable(currentTableObj.name, currentTableObj.minBet, currentTableObj.maxBet)}
            className="w-full max-w-md bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold text-base tracking-widest py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.3)] border border-amber-300/40 flex items-center justify-center gap-2 group transition-all"
            id="lobby-enter-button"
          >
            <Play className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
            ENTER ARENA: {currentTableObj.name.toUpperCase()}
          </motion.button>
          
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            S.P.Q.R. REGULATED COLOSSEUM • PLATFORM FAIR DEALT GUARANTEED
          </span>
        </motion.div>

        </div>
      </ScaleToFit>
    </div>
  );
}
