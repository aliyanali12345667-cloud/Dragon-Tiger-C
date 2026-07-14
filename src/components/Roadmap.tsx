import { GameHistoryItem, BetOption } from '../types';

interface RoadmapProps {
  history: GameHistoryItem[];
}

export default function Roadmap({ history }: RoadmapProps) {
  const totalHands = history.length;
  
  const dragonCount = history.filter(h => h.winner === 'DRAGON').length;
  const tigerCount = history.filter(h => h.winner === 'TIGER').length;
  const tieCount = history.filter(h => h.winner === 'TIE').length;

  const dragonPct = totalHands > 0 ? Math.round((dragonCount / totalHands) * 100) : 0;
  const tigerPct = totalHands > 0 ? Math.round((tigerCount / totalHands) * 100) : 0;
  const tiePct = totalHands > 0 ? Math.round((tieCount / totalHands) * 100) : 0;

  // Generate Bead Plate grid (6 rows, 16 columns)
  const rows = 6;
  const cols = 16;
  const beadPlateGrid: (GameHistoryItem | null)[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  // Fill Bead Plate: sequential down-then-right
  history.forEach((item, index) => {
    const col = Math.floor(index / rows);
    const row = index % rows;
    if (col < cols) {
      beadPlateGrid[row][col] = item;
    }
  });

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-6 w-full backdrop-blur-md">
      {/* STATS AREA */}
      <div className="flex flex-col justify-between md:w-56 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6 shrink-0">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Hand Statistics
          </h4>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold font-mono text-white">{totalHands}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Total Hands</span>
          </div>
        </div>

        {/* Progress bar split */}
        <div className="space-y-3">
          {/* Dragon % */}
          <div className="flex justify-between text-xs font-mono">
            <span className="text-indigo-400 font-bold">DRAGON</span>
            <span className="text-slate-300">{dragonCount} ({dragonPct}%)</span>
          </div>
          {/* Tiger % */}
          <div className="flex justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold">TIGER</span>
            <span className="text-slate-300">{tigerCount} ({tigerPct}%)</span>
          </div>
          {/* Tie % */}
          <div className="flex justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold">TIE</span>
            <span className="text-slate-300">{tieCount} ({tiePct}%)</span>
          </div>

          {/* Bar chart */}
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
            {totalHands > 0 ? (
              <>
                <div style={{ width: `${dragonPct}%` }} className="bg-indigo-500 h-full transition-all duration-500" />
                <div style={{ width: `${tiePct}%` }} className="bg-emerald-500 h-full transition-all duration-500" />
                <div style={{ width: `${tigerPct}%` }} className="bg-amber-500 h-full transition-all duration-500" />
              </>
            ) : (
              <div className="w-full bg-slate-800 h-full" />
            )}
          </div>
        </div>
      </div>

      {/* ROADMAP AREA (BEAD PLATE) */}
      <div className="flex-1 overflow-x-auto min-w-0 select-none">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 flex justify-between items-center">
          <span>Bead Plate Roadmap</span>
          <span className="text-[10px] text-slate-500 lowercase font-normal italic">
            fills top-to-bottom, left-to-right
          </span>
        </h4>

        <div className="inline-block min-w-full pb-1">
          <div className="grid grid-rows-6 grid-flow-col gap-1.5 bg-slate-950 p-2.5 rounded-lg border border-slate-900 overflow-hidden w-max">
            {beadPlateGrid.map((rowArr, rIdx) => (
              <div key={`row-${rIdx}`} className="flex gap-1.5">
                {rowArr.map((item, cIdx) => {
                  let circleClass = 'bg-slate-900 border border-slate-850';
                  let text = '';
                  let textColor = 'text-slate-600';

                  if (item) {
                    if (item.winner === 'DRAGON') {
                      circleClass = 'bg-indigo-650 shadow-[0_0_8px_rgba(99,102,241,0.4)] border border-indigo-400';
                      text = 'D';
                      textColor = 'text-indigo-100';
                    } else if (item.winner === 'TIGER') {
                      circleClass = 'bg-amber-650 shadow-[0_0_8px_rgba(245,158,11,0.4)] border border-amber-400';
                      text = 'T';
                      textColor = 'text-amber-100';
                    } else {
                      circleClass = 'bg-emerald-650 shadow-[0_0_8px_rgba(16,185,129,0.4)] border border-emerald-400';
                      text = 'TIE';
                      textColor = 'text-emerald-100 text-[8px]';
                    }
                  }

                  return (
                    <div
                      key={`bead-${rIdx}-${cIdx}`}
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none ${circleClass} ${textColor} transition-all duration-300`}
                      title={item ? `Round #${item.roundId}: ${item.winner} (D: ${item.dragonCard.label}, T: ${item.tigerCard.label})` : undefined}
                    >
                      {text}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
