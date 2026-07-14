import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BetOption } from '../types';
import ThreeDRenderer from './ThreeDRenderer';
import { sound } from '../utils/sound';

interface WinnerAnimationProps {
  winner: BetOption | null;
  isOpen: boolean;
}

export default function WinnerAnimation({ winner, isOpen }: WinnerAnimationProps) {
  // Trigger synthesized audio roars synchronized with the 3D animation
  useEffect(() => {
    if (isOpen && winner) {
      if (winner === 'DRAGON') {
        sound.playDragonRoar();
      } else if (winner === 'TIGER') {
        sound.playTigerRoar();
      } else if (winner === 'TIE') {
        sound.playWin();
      }
    }
  }, [isOpen, winner]);

  return (
    <AnimatePresence>
      {isOpen && winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg pointer-events-none overflow-hidden"
          id="winner-animation-overlay"
        >
          {/* Roman colosseum dust and glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_75%)]" />

          {/* DRAGON WINS (DRACO VICTOR) */}
          {winner === 'DRAGON' && (
            <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center px-4">
              
              {/* Dynamic 3D Dragon Model */}
              <motion.div
                initial={{ scale: 0.3, rotateY: -180, opacity: 0 }}
                animate={{ scale: 1.1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.3, rotateY: 180, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 50, duration: 1.2 }}
                className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] relative flex items-center justify-center border-4 border-amber-500/20 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.25)] bg-slate-950/80 overflow-hidden"
              >
                <ThreeDRenderer modelType="dragon" isAnimating={true} width={400} height={400} />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Majestic Roman Text Announcement */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', damping: 14 }}
                className="text-center mt-6 z-10"
              >
                <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-widest text-indigo-300 uppercase drop-shadow-[0_4px_20px_rgba(139,92,246,0.6)]">
                  Draco Victor!
                </h2>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto mt-3" />
                <p className="text-xs font-mono tracking-[0.4em] text-indigo-400 uppercase mt-3">
                  THE IMPERIAL VIOLET DRAGON ROARS VICTORIOUS IN THE COLOSEUM
                </p>
              </motion.div>
            </div>
          )}

          {/* TIGER WINS (TIGRIS VICTOR) */}
          {winner === 'TIGER' && (
            <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center px-4">
              
              {/* Dynamic 3D Tiger Model */}
              <motion.div
                initial={{ scale: 0.3, rotateY: 180, opacity: 0 }}
                animate={{ scale: 1.1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.3, rotateY: -180, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 50, duration: 1.2 }}
                className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] relative flex items-center justify-center border-4 border-amber-500/20 rounded-full shadow-[0_0_50px_rgba(245,158,11,0.25)] bg-slate-950/80 overflow-hidden"
              >
                <ThreeDRenderer modelType="tiger" isAnimating={true} width={400} height={400} />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Majestic Roman Text Announcement */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', damping: 14 }}
                className="text-center mt-6 z-10"
              >
                <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-widest text-amber-400 uppercase drop-shadow-[0_4px_20px_rgba(245,158,11,0.6)]">
                  Tigris Victor!
                </h2>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-3" />
                <p className="text-xs font-mono tracking-[0.4em] text-amber-400/90 uppercase mt-3">
                  THE GOLDEN ARENA TIGER CLAIMS SOVEREIGN GLORY
                </p>
              </motion.div>
            </div>
          )}

          {/* TIE WINS (AEQUALIS SPQR SHIELD) */}
          {winner === 'TIE' && (
            <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center px-4">
              
              {/* Dynamic 3D Tie Laurel Shield Model */}
              <motion.div
                initial={{ scale: 0.3, rotateZ: -90, opacity: 0 }}
                animate={{ scale: 1.1, rotateZ: 0, opacity: 1 }}
                exit={{ scale: 0.3, rotateZ: 90, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 50, duration: 1.2 }}
                className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] relative flex items-center justify-center border-4 border-amber-500/20 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.25)] bg-slate-950/80 overflow-hidden"
              >
                <ThreeDRenderer modelType="tie" isAnimating={true} width={400} height={400} />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Majestic Roman Text Announcement */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', damping: 14 }}
                className="text-center mt-6 z-10"
              >
                <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-widest text-emerald-400 uppercase drop-shadow-[0_4px_20px_rgba(16,185,129,0.6)]">
                  Aequalis!
                </h2>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-3" />
                <p className="text-xs font-mono tracking-[0.4em] text-emerald-400/90 uppercase mt-3">
                  SPQR CONCORDIA - THE SCALES OF ROME BALANCE PERFECTION
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
