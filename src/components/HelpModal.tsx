import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto"
            id="help-modal"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -z-10" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2 text-amber-400">
                <HelpCircle className="w-5 h-5" />
                <h2 className="text-xl font-bold tracking-wide font-sans">Game Rules & Guide</h2>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-full"
                aria-label="Close"
                id="close-help"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
              {/* Gameplay Overview */}
              <div>
                <h3 className="text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  How to Play
                </h3>
                <p>
                  Dragon Tiger is a fast-paced two-card casino game. Two cards are dealt: one to the <strong className="text-indigo-400">Dragon</strong> box and one to the <strong className="text-amber-400">Tiger</strong> box. You place your bet on whichever box you predict will receive the higher card, or that they will tie.
                </p>
              </div>

              {/* Card Rankings */}
              <div>
                <h3 className="text-amber-300 font-semibold mb-1.5">Card Rankings</h3>
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 flex flex-col gap-1 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-1 font-mono">
                    <span className="text-indigo-400">Highest Card</span>
                    <span className="text-white font-bold">King (Value: 13)</span>
                  </div>
                  <div className="flex justify-between py-1 font-mono">
                    <span>Jack / Queen</span>
                    <span>11 / 12</span>
                  </div>
                  <div className="flex justify-between py-1 font-mono">
                    <span>Numbered Cards</span>
                    <span>Face Value (2 to 10)</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-900 pt-1 font-mono">
                    <span className="text-amber-400">Lowest Card</span>
                    <span className="text-white font-bold">Ace (Value: 1)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  * Suits (Hearts, Diamonds, Spades, Clubs) are purely cosmetic and do not affect card strength.
                </p>
              </div>

              {/* Payouts Table */}
              <div>
                <h3 className="text-amber-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  Betting & Payout Ratios
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-indigo-400 font-bold uppercase">Dragon</div>
                    <div className="text-lg font-bold text-white mt-0.5">1 : 1</div>
                    <div className="text-[10px] text-slate-400">Even money</div>
                  </div>
                  <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-emerald-400 font-bold uppercase">Tie</div>
                    <div className="text-lg font-bold text-white mt-0.5">8 : 1</div>
                    <div className="text-[10px] text-slate-400">Equal value</div>
                  </div>
                  <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg p-2.5 text-center">
                    <div className="text-xs text-amber-400 font-bold uppercase">Tiger</div>
                    <div className="text-lg font-bold text-white mt-0.5">1 : 1</div>
                    <div className="text-[10px] text-slate-400">Even money</div>
                  </div>
                </div>
              </div>

              {/* The Tie Rule */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3.5 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wide">The Standard Tie Exception</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    If the Dragon and Tiger cards have equal rank (e.g. both are Queens), it is a <strong>Tie</strong>. 
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    • Players who placed a bet on <span className="text-emerald-400 font-semibold">Tie</span> win <strong>8:1</strong>.
                  </p>
                  <p className="text-xs text-slate-400">
                    • Players who bet on <span className="text-indigo-300 font-semibold">Dragon</span> or <span className="text-amber-300 font-semibold">Tiger</span> get a <strong>50% refund</strong> of their bet amount. The other 50% is taken by the house.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 pt-4 mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-bold text-xs rounded-lg uppercase tracking-wider transition-colors shadow-lg"
                id="close-help-btn"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
