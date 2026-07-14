import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  RotateCcw,
  Trash2,
  Coins,
  TrendingUp,
  User,
  Wallet,
  Sparkles,
} from 'lucide-react';

import { GamePhase, BetOption, Card as CardType, Player, GameHistoryItem, ChipValue, BetPlacement } from './types';
import Card from './components/Card';
import Table from './components/Table';
import Chip from './components/Chip';
import ScaleToFit from './components/ScaleToFit';
import Roadmap from './components/Roadmap';
import HelpModal from './components/HelpModal';
import WinnerAnimation from './components/WinnerAnimation';
import ThreeDRenderer from './components/ThreeDRenderer';
import { sound } from './utils/sound';
import { generateCard } from './utils/cards';
import CasinoLobby from './components/CasinoLobby';
import GalaxyBackground from './components/GalaxyBackground';

// Initial Virtual Players matching the screenshot
const INITIAL_VIRTUAL_PLAYERS: Player[] = [
  {
    id: 'jaymond',
    name: 'Jaymond',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    balance: 57422.35,
    bets: { DRAGON: 0, TIE: 0, TIGER: 0 },
    title: 'PRO',
    isVirtual: true,
    color: 'border-indigo-400',
  },
  {
    id: 'name957039',
    name: 'name957039',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    balance: 46434.13,
    bets: { DRAGON: 0, TIE: 0, TIGER: 0 },
    title: 'AMATEUR',
    isVirtual: true,
    color: 'border-slate-500',
  },
  {
    id: 'kah',
    name: 'Kah',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    balance: 63588.48,
    bets: { DRAGON: 0, TIE: 0, TIGER: 0 },
    title: 'PRO',
    isVirtual: true,
    color: 'border-emerald-400',
  },
  {
    id: 'rebecca',
    name: 'Rebecca',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
    balance: 49396.38,
    bets: { DRAGON: 0, TIE: 0, TIGER: 0 },
    title: 'VIP',
    isVirtual: true,
    color: 'border-amber-400',
  },
  {
    id: 'name944487',
    name: 'name944487',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=faces',
    balance: 45579.60,
    bets: { DRAGON: 0, TIE: 0, TIGER: 0 },
    title: 'AMATEUR',
    isVirtual: true,
    color: 'border-slate-500',
  },
];

// Initial Game History (Roadmap Bead Plate)
const INITIAL_HISTORY: GameHistoryItem[] = [
  { roundId: 101, winner: 'TIGER', dragonCard: { suit: 'hearts', value: 4, label: '4' }, tigerCard: { suit: 'spades', value: 9, label: '9' }, timestamp: '00:01' },
  { roundId: 102, winner: 'TIGER', dragonCard: { suit: 'clubs', value: 2, label: '2' }, tigerCard: { suit: 'diamonds', value: 10, label: '10' }, timestamp: '00:02' },
  { roundId: 103, winner: 'TIE', dragonCard: { suit: 'hearts', value: 7, label: '7' }, tigerCard: { suit: 'diamonds', value: 7, label: '7' }, timestamp: '00:03' },
  { roundId: 104, winner: 'TIGER', dragonCard: { suit: 'spades', value: 5, label: '5' }, tigerCard: { suit: 'hearts', value: 8, label: '8' }, timestamp: '00:04' },
  { roundId: 105, winner: 'TIGER', dragonCard: { suit: 'clubs', value: 1, label: 'A' }, tigerCard: { suit: 'spades', value: 13, label: 'K' }, timestamp: '00:05' },
  { roundId: 106, winner: 'TIGER', dragonCard: { suit: 'diamonds', value: 8, label: '8' }, tigerCard: { suit: 'hearts', value: 12, label: 'Q' }, timestamp: '00:06' },
  { roundId: 107, winner: 'TIGER', dragonCard: { suit: 'clubs', value: 3, label: '3' }, tigerCard: { suit: 'diamonds', value: 6, label: '6' }, timestamp: '00:07' },
  { roundId: 108, winner: 'TIGER', dragonCard: { suit: 'hearts', value: 5, label: '5' }, tigerCard: { suit: 'spades', value: 9, label: '9' }, timestamp: '00:08' },
  { roundId: 109, winner: 'TIGER', dragonCard: { suit: 'diamonds', value: 10, label: '10' }, tigerCard: { suit: 'clubs', value: 11, label: 'J' }, timestamp: '00:09' },
  { roundId: 110, winner: 'DRAGON', dragonCard: { suit: 'spades', value: 12, label: 'Q' }, tigerCard: { suit: 'hearts', value: 2, label: '2' }, timestamp: '00:10' },
  { roundId: 111, winner: 'TIGER', dragonCard: { suit: 'clubs', value: 1, label: 'A' }, tigerCard: { suit: 'diamonds', value: 7, label: '7' }, timestamp: '00:11' },
  { roundId: 112, winner: 'TIGER', dragonCard: { suit: 'hearts', value: 4, label: '4' }, tigerCard: { suit: 'spades', value: 11, label: 'J' }, timestamp: '00:12' },
  { roundId: 113, winner: 'TIGER', dragonCard: { suit: 'clubs', value: 8, label: '8' }, tigerCard: { suit: 'diamonds', value: 13, label: 'K' }, timestamp: '00:13' },
  { roundId: 114, winner: 'DRAGON', dragonCard: { suit: 'spades', value: 9, label: '9' }, tigerCard: { suit: 'hearts', value: 4, label: '4' }, timestamp: '00:14' },
  { roundId: 115, winner: 'DRAGON', dragonCard: { suit: 'diamonds', value: 11, label: 'J' }, tigerCard: { suit: 'clubs', value: 5, label: '5' }, timestamp: '00:15' },
  { roundId: 116, winner: 'TIE', dragonCard: { suit: 'spades', value: 6, label: '6' }, tigerCard: { suit: 'clubs', value: 6, label: '6' }, timestamp: '00:16' },
  { roundId: 117, winner: 'TIE', dragonCard: { suit: 'diamonds', value: 13, label: 'K' }, tigerCard: { suit: 'hearts', value: 13, label: 'K' }, timestamp: '00:17' },
  { roundId: 118, winner: 'DRAGON', dragonCard: { suit: 'clubs', value: 10, label: '10' }, tigerCard: { suit: 'diamonds', value: 2, label: '2' }, timestamp: '00:18' },
  { roundId: 119, winner: 'DRAGON', dragonCard: { suit: 'hearts', value: 7, label: '7' }, tigerCard: { suit: 'spades', value: 1, label: 'A' }, timestamp: '00:19' },
];

export default function App() {
  // Lobby state
  const [inLobby, setInLobby] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>('Gladiator Golden Arena');
  const [minBet, setMinBet] = useState<number>(10);
  const [maxBet, setMaxBet] = useState<number>(5000);

  // Game state
  const [phase, setPhase] = useState<GamePhase>('BETTING');
  const [timer, setTimer] = useState<number>(15);
  const [roundId, setRoundId] = useState<number>(120);

  // Cards
  const [dragonCard, setDragonCard] = useState<CardType | null>(null);
  const [tigerCard, setTigerCard] = useState<CardType | null>(null);
  const [dragonFlipped, setDragonFlipped] = useState<boolean>(false);
  const [tigerFlipped, setTigerFlipped] = useState<boolean>(false);

  // Betting states
  const [userBalance, setUserBalance] = useState<number>(10000); // Start with a strong bankroll
  const [userBets, setUserBets] = useState<Record<BetOption, number>>({ DRAGON: 0, TIE: 0, TIGER: 0 });
  const [lastUserBets, setLastUserBets] = useState<Record<BetOption, number>>({ DRAGON: 0, TIE: 0, TIGER: 0 });
  const [virtualPlayers, setVirtualPlayers] = useState<Player[]>(INITIAL_VIRTUAL_PLAYERS);
  const [placements, setPlacements] = useState<BetPlacement[]>([]);
  const [selectedChip, setSelectedChip] = useState<ChipValue>(10);

  // History / Roadmap
  const [history, setHistory] = useState<GameHistoryItem[]>(INITIAL_HISTORY);
  const [winnerOption, setWinnerOption] = useState<BetOption | null>(null);

  // UI Utilities
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(sound.isSoundEnabled());
  const [gameMessage, setGameMessage] = useState<string>('Welcome! Place your bets on Dragon, Tiger, or Tie.');
  const [messageColor, setMessageColor] = useState<string>('text-amber-400');
  const [payoutNotification, setPayoutNotification] = useState<{ amount: number; isRef: boolean } | null>(null);
  const [showRoadmap, setShowRoadmap] = useState<boolean>(false); // Hide roadmap by default
  const [playersOnline, setPlayersOnline] = useState<number>(24);

  // Fluctuating active players online count
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersOnline((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // generates -2, -1, 0, 1, or 2
        const next = prev + change;
        return next >= 15 && next <= 35 ? next : prev;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Simulated massive table betting pools for high-roller experience
  const [simulatedPools, setSimulatedPools] = useState<Record<BetOption, number>>({ DRAGON: 0, TIE: 0, TIGER: 0 });

  // Refs for dealing intervals to prevent race conditions or double dealing
  const dealInProgress = useRef<boolean>(false);

  // Calculate total betting pool sizes (User + Simulated high-roller pools)
  const totalTableBets = useMemo(() => {
    return {
      DRAGON: simulatedPools.DRAGON + userBets.DRAGON,
      TIE: simulatedPools.TIE + userBets.TIE,
      TIGER: simulatedPools.TIGER + userBets.TIGER,
    };
  }, [simulatedPools, userBets]);

  // Handle game ticking countdown
  useEffect(() => {
    const interval = setInterval(() => {
      if (phase === 'BETTING') {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            triggerDealingPhase();
            return 0;
          }
          if (prev <= 4) {
            sound.playTick(); // Tick warning for last 3 seconds
          }
          return prev - 1;
        });
      } else if (phase === 'RESULT' || phase === 'RESTING') {
        setTimer((prev) => {
          if (prev <= 1) {
            if (phase === 'RESULT') {
              // Transition from RESULT to RESTING
              setPhase('RESTING');
              setGameMessage('Shuffling and preparing cards...');
              setMessageColor('text-slate-400');
              return 3; // 3 seconds resting
            } else {
              // Transition from RESTING back to BETTING
              setPhase('BETTING');
              setGameMessage('New round started! Place your bets.');
              setMessageColor('text-emerald-400');
              setWinnerOption(null);
              setDragonCard(null);
              setTigerCard(null);
              setDragonFlipped(false);
              setTigerFlipped(false);
              
              // Clear current bets and visual chip placements
              setLastUserBets(userBets);
              setUserBets({ DRAGON: 0, TIE: 0, TIGER: 0 });
              setSimulatedPools({ DRAGON: 0, TIE: 0, TIGER: 0 });
              setVirtualPlayers((prevPlayers) =>
                prevPlayers.map((p) => ({
                  ...p,
                  bets: { DRAGON: 0, TIE: 0, TIGER: 0 },
                }))
              );
              setPlacements([]);
              setPayoutNotification(null);
              setRoundId((prev) => prev + 1);
              sound.playShuffle();
              return 15; // 15 seconds betting
            }
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, userBets]);

  // Handle rapid simulated high-roller pool betting growth
  useEffect(() => {
    if (phase !== 'BETTING') return;

    const interval = setInterval(() => {
      setSimulatedPools((prev) => {
        // Stop incrementing in the last 1 second of betting
        if (timer <= 1) return prev;

        // Dragon wins ~25,000, Tiger ~15,000, Tie ~3,000 over 15 seconds
        // 75 ticks (200ms interval). Average increment:
        // Dragon: 25000 / 75 = 333 per tick
        // Tiger: 15000 / 75 = 200 per tick
        // Tie: 3000 / 75 = 40 per tick
        const dInc = Math.floor(180 + Math.random() * 320);
        const tInc = Math.floor(100 + Math.random() * 210);
        const tieInc = Math.floor(15 + Math.random() * 55);

        return {
          DRAGON: prev.DRAGON + dInc,
          TIGER: prev.TIGER + tInc,
          TIE: prev.TIE + tieInc,
        };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [phase, timer]);

  // Handle virtual players placing bets during BETTING phase (fast active chips visual)
  useEffect(() => {
    if (phase !== 'BETTING') return;

    // Run a short interval to dynamically simulate active players dragging chips
    const betTimer = setInterval(() => {
      // 65% chance to place a bet on this interval for high activity
      if (Math.random() > 0.65) return;

      // Select random virtual player
      const pIdx = Math.floor(Math.random() * virtualPlayers.length);
      const player = virtualPlayers[pIdx];

      // Define possible chip value to bet (higher values for high-roller feel)
      const chipValues: ChipValue[] = [50, 100, 1000];
      const randomChipValue = chipValues[Math.floor(Math.random() * chipValues.length)];

      // Check balance
      if (player.balance < randomChipValue) return;

      // Select a random bet option
      const options: BetOption[] = ['DRAGON', 'TIGER', 'TIE'];
      // Weight options: 45% Dragon, 45% Tiger, 10% Tie
      const roll = Math.random();
      const option = roll < 0.45 ? 'DRAGON' : roll < 0.90 ? 'TIGER' : 'TIE';

      // Deduct balance and update player state
      setVirtualPlayers((prevPlayers) =>
        prevPlayers.map((p) => {
          if (p.id === player.id) {
            return {
              ...p,
              balance: p.balance - randomChipValue,
              bets: {
                ...p.bets,
                [option]: p.bets[option] + randomChipValue,
              },
            };
          }
          return p;
        })
      );

      // Generate chip visual coordinates inside the box
      const rx = 15 + Math.random() * 70;
      const ry = 15 + Math.random() * 70;

      // Add visual placement
      const newPlacement: BetPlacement = {
        id: `virtual-${Date.now()}-${Math.random()}`,
        playerId: player.id,
        playerName: player.name,
        playerColor: player.color,
        option,
        value: randomChipValue,
        x: rx,
        y: ry,
      };

      setPlacements((prev) => [...prev, newPlacement]);
      sound.playChip();
    }, 320);

    return () => clearInterval(betTimer);
  }, [phase, virtualPlayers]);

  // Transition to dealing cards and calculations
  const triggerDealingPhase = () => {
    if (dealInProgress.current) return;
    dealInProgress.current = true;

    setPhase('DEALING');
    setGameMessage('No More Bets! Dealing cards...');
    setMessageColor('text-red-400 font-bold');

    // Generate random cards
    const dCard = generateCard();
    const tCard = generateCard();

    setDragonCard(dCard);
    setTigerCard(tCard);

    // Staggered Flip Reveal Timeline
    // 1. Reveal Dragon Card
    setTimeout(() => {
      setDragonFlipped(true);
      sound.playCardFlip();
    }, 1000);

    // 2. Reveal Tiger Card
    setTimeout(() => {
      setTigerFlipped(true);
      sound.playCardFlip();
    }, 2200);

    // 3. Compute Winner and trigger RESULT phase
    setTimeout(() => {
      dealInProgress.current = false;
      let winner: BetOption = 'TIE';

      if (dCard.value > tCard.value) {
        winner = 'DRAGON';
      } else if (dCard.value < tCard.value) {
        winner = 'TIGER';
      }

      setWinnerOption(winner);
      setPhase('RESULT');
      setTimer(5); // 5 seconds displaying results

      // Play Sound
      sound.playWin();

      // Set winning description
      const winString =
        winner === 'DRAGON'
          ? `DRAGON Wins! (${dCard.label} vs ${tCard.label})`
          : winner === 'TIGER'
          ? `TIGER Wins! (${tCard.label} vs ${dCard.label})`
          : `TIE! Dual ${dCard.label}s!`;

      setGameMessage(winString);
      setMessageColor(
        winner === 'DRAGON'
          ? 'text-indigo-400 font-extrabold'
          : winner === 'TIGER'
          ? 'text-amber-400 font-extrabold'
          : 'text-emerald-400 font-extrabold'
      );

      // --- CALCULATE USER PAYOUT ---
      let payout = 0;
      let tieRefunding = false;

      if (winner === 'DRAGON') {
        if (userBets.DRAGON > 0) payout += userBets.DRAGON * 1.9; // Return original bet + 0.9:1 profit
      } else if (winner === 'TIGER') {
        if (userBets.TIGER > 0) payout += userBets.TIGER * 1.9; // Return original bet + 0.9:1 profit
      } else {
        // TIE
        if (userBets.TIE > 0) {
          payout += userBets.TIE * 9; // Return original bet + 8:1 profit
        }
        // Refunds 50% on Dragon and Tiger
        if (userBets.DRAGON > 0) {
          payout += userBets.DRAGON * 0.5;
          tieRefunding = true;
        }
        if (userBets.TIGER > 0) {
          payout += userBets.TIGER * 0.5;
          tieRefunding = true;
        }
      }

      if (payout > 0) {
        setUserBalance((prev) => prev + payout);
        setPayoutNotification({ amount: payout, isRef: tieRefunding && payout === (userBets.DRAGON + userBets.TIGER) * 0.5 });
      }

      // --- CALCULATE VIRTUAL PLAYERS PAYOUTS ---
      setVirtualPlayers((prevPlayers) =>
        prevPlayers.map((p) => {
          let pPayout = 0;

          if (winner === 'DRAGON') {
            if (p.bets.DRAGON > 0) pPayout += p.bets.DRAGON * 1.9; // Return original bet + 0.9:1 profit
          } else if (winner === 'TIGER') {
            if (p.bets.TIGER > 0) pPayout += p.bets.TIGER * 1.9; // Return original bet + 0.9:1 profit
          } else {
            // TIE
            if (p.bets.TIE > 0) pPayout += p.bets.TIE * 9;
            if (p.bets.DRAGON > 0) pPayout += p.bets.DRAGON * 0.5;
            if (p.bets.TIGER > 0) pPayout += p.bets.TIGER * 0.5;
          }

          return {
            ...p,
            balance: p.balance + pPayout,
          };
        })
      );

      // --- RECORD GAME TO HISTORY ---
      const newHistoryItem: GameHistoryItem = {
        roundId,
        winner,
        dragonCard: dCard,
        tigerCard: tCard,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      };

      setHistory((prev) => [...prev, newHistoryItem]);
    }, 3800);
  };

  // Place a bet on the table
  const handlePlaceBet = (option: BetOption, x: number, y: number) => {
    // Safety block: only allow bets in BETTING phase
    if (phase !== 'BETTING') return;

    // Check balance
    if (userBalance < selectedChip) {
      setGameMessage('Insufficient Balance! Select a lower chip or re-buy.');
      setMessageColor('text-red-400');
      return;
    }

    // Check table limits
    const totalCurrentBet = userBets[option] + selectedChip;
    if (totalCurrentBet > maxBet) {
      setGameMessage(`Limit Exceeded! Maximum bet for this spot is ${maxBet}.`);
      setMessageColor('text-red-400');
      return;
    }

    // Deduct user balance
    setUserBalance((prev) => prev - selectedChip);

    // Increase user bets
    setUserBets((prev) => ({
      ...prev,
      [option]: prev[option] + selectedChip,
    }));

    // Record visual placement
    const newPlacement: BetPlacement = {
      id: `user-${Date.now()}-${Math.random()}`,
      playerId: 'user',
      playerName: 'You',
      playerColor: 'border-yellow-400',
      option,
      value: selectedChip,
      x,
      y,
    };

    setPlacements((prev) => [...prev, newPlacement]);
    sound.playChip();
  };

  // Clear current active bets
  const handleClearBets = () => {
    if (phase !== 'BETTING') return;

    // Sum of all active user bets
    const refundAmount = (Object.values(userBets) as number[]).reduce((a, b) => a + b, 0);
    if (refundAmount === 0) return;

    // Refund player
    setUserBalance((prev) => prev + refundAmount);

    // Reset bets
    setUserBets({ DRAGON: 0, TIE: 0, TIGER: 0 });

    // Filter out user placements from board
    setPlacements((prev) => prev.filter((p) => p.playerId !== 'user'));
    sound.playShuffle();
    setGameMessage('Your bets have been cleared.');
    setMessageColor('text-slate-400');
  };

  // Repeat previous round's bets
  const handleRepeatBets = () => {
    if (phase !== 'BETTING') return;

    const totalRepeatCost = (Object.values(lastUserBets) as number[]).reduce((a, b) => a + b, 0);
    if (totalRepeatCost === 0) {
      setGameMessage('No previous bets to repeat!');
      setMessageColor('text-amber-400');
      return;
    }

    if (userBalance < totalRepeatCost) {
      setGameMessage('Insufficient balance to repeat previous bets!');
      setMessageColor('text-red-400');
      return;
    }

    // Deduct user balance
    setUserBalance((prev) => prev - totalRepeatCost);

    // Add repeated bets
    setUserBets(lastUserBets);

    // Generate random coordinates for the repeated chips inside targeted options
    const repeatedPlacements: BetPlacement[] = [];

    (Object.keys(lastUserBets) as BetOption[]).forEach((option) => {
      const betVal = lastUserBets[option];
      if (betVal <= 0) return;

      // Distribute bet value into chips
      let remaining = betVal;
      const chipDenominations: ChipValue[] = [1000, 100, 50, 10, 1];

      chipDenominations.forEach((denom) => {
        const count = Math.floor(remaining / denom);
        for (let i = 0; i < count; i++) {
          repeatedPlacements.push({
            id: `user-repeat-${denom}-${Date.now()}-${Math.random()}`,
            playerId: 'user',
            playerName: 'You',
            playerColor: 'border-yellow-400',
            option,
            value: denom,
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
          });
          remaining -= denom;
        }
      });
    });

    setPlacements((prev) => [...prev, ...repeatedPlacements]);
    sound.playShuffle();
    setGameMessage('Repeated previous bets!');
    setMessageColor('text-indigo-300');
  };

  // Re-buy action if bankroll drops
  const handleReBuy = () => {
    setUserBalance(10000);
    setGameMessage('Bankroll reloaded to 10,000.00!');
    setMessageColor('text-yellow-400');
    sound.playWin();
  };

  // Toggle sound
  const handleToggleSound = () => {
    const isNowEnabled = sound.toggleSound();
    setIsSoundEnabled(isNowEnabled);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="h-screen w-screen text-slate-100 flex flex-col font-sans relative overflow-hidden selection:bg-amber-500/30 select-none"
    >
      <GalaxyBackground />
      
      {/* Gradients to blend and keep UI legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04020a]/50 via-transparent to-[#04020a]/95 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#04020a]/30 to-[#04020a]/85 pointer-events-none z-0" />

      <ScaleToFit targetWidth={1120} targetHeight={780}>
        <div className="w-full h-full flex flex-col justify-between">
          
          {/* HEADER UTILITY PANEL - CIRCULAR GOLD EMBOSSED BUTTONS */}
      <header className="bg-[#1b0526]/45 border-b-2 border-[#b1892d]/50 px-6 py-3 flex items-center justify-between z-40 backdrop-blur-sm relative">
        <div className="flex items-center gap-2">
          {/* Logo emblem */}
          <div className="bg-gradient-to-r from-[#b1892d] to-[#98721c] p-1.5 rounded-full text-[#ffe39c] font-bold shadow-[0_0_15px_rgba(177,137,45,0.4)] shrink-0 border border-[#ffe39c]/50">
            <svg viewBox="0 0 100 100" className="w-4 h-4" fill="currentColor">
              <path d="M50,10 L90,35 L90,75 L50,95 L10,75 L10,35 Z" fill="none" stroke="currentColor" strokeWidth="6" />
              <path d="M50,25 L75,45 L60,80 L40,80 L25,45 Z" fill="currentColor" />
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-2 select-none"
          >
            <span className="text-sm md:text-lg font-black tracking-widest font-serif bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(56,189,248,0.5)] uppercase">
              Dragon
            </span>
            <motion.span
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0],
                textShadow: [
                  "0 0 4px rgba(250,204,21,0.4)",
                  "0 0 12px rgba(250,204,21,0.8)",
                  "0 0 4px rgba(250,204,21,0.4)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: 'easeInOut'
              }}
              className="text-xs md:text-sm font-serif font-black bg-gradient-to-b from-[#ffe39c] via-[#d2a33c] to-[#98721c] bg-clip-text text-transparent px-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
            >
              VS
            </motion.span>
            <span className="text-sm md:text-lg font-black tracking-widest font-serif bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(249,115,22,0.5)] uppercase">
              Tiger
            </span>
          </motion.div>
        </div>

        {/* Dynamic Display of active game phase */}
        <div className="hidden sm:flex items-center gap-4 bg-[#150221]/95 px-4 py-1.5 rounded-full border border-[#b1892d]/40 shadow-inner">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${
              phase === 'BETTING' ? 'bg-emerald-500 animate-ping' :
              phase === 'DEALING' ? 'bg-indigo-500' :
              phase === 'RESULT' ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]' :
              'bg-slate-500'
            }`} />
            <span className="text-xs font-bold tracking-wider font-mono text-[#ffe39c]">
              {phase === 'BETTING' ? `BETTING: ${timer}s` :
               phase === 'DEALING' ? 'DEALING CARDS...' :
               phase === 'RESULT' ? `RESULT REVEAL: ${timer}s` :
               `RESTING: ${timer}s`}
            </span>
          </div>
        </div>

        {/* Interactive action icons - Circular Gold Ring style from screenshot */}
        <div className="flex items-center gap-3">
          {/* Stats Button */}
          <button
            onClick={() => setShowRoadmap((prev) => !prev)}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-md ${
              showRoadmap 
                ? 'bg-gradient-to-b from-[#ffe873] to-[#b1892d] text-[#12011b] border-[#ffe873]' 
                : 'bg-gradient-to-b from-[#1c0828] to-[#12011b] border-[#b1892d] hover:border-[#ffe873] text-[#ffe39c]'
            }`}
            title="Toggle Statistics Roadmap"
            id="roadmap-toggle"
          >
            <TrendingUp className="w-5 h-5" />
          </button>

          {/* Rules "?" Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#1c0828] to-[#12011b] border-2 border-[#b1892d] hover:border-[#ffe873] text-[#ffe39c] flex items-center justify-center transition-all shadow-md"
            title="Show Rules"
            id="help-toggle"
          >
            <span className="text-lg font-black font-serif">?</span>
          </button>
        </div>
      </header>

      {/* DYNAMIC SCENE HUD MESSAGE */}
      <div className="bg-[#12011b]/80 border-b border-[#ffe48f]/10 px-6 py-2.5 flex justify-center items-center gap-2 text-center text-xs font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
        <span className={gameMessage ? messageColor : 'text-[#ffe39c]'}>{gameMessage}</span>
      </div>

      {/* MAIN GAMEPLAY ARENA */}
      <main className="flex-1 w-full mx-auto p-4 flex flex-col gap-4 items-center justify-center relative min-h-0">
        
        {/* Center Canvas: Cards Arena & Betting Table */}
        <div className="w-full flex flex-col items-center justify-center gap-4">
          
          {/* TRADITIONAL CHINESE TEMPLE ROOF CARD ARENA */}
          <div className="w-full max-w-xl flex flex-col relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#b1892d] bg-[#1a0526]">
            
            {/* TRADITIONAL TILED CHINESE ROOF */}
            <div className="bg-[#1f1e24] border-b-4 border-[#b1892d] relative z-20 pt-6 pb-2 px-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Slate tile overlapping patterns in background of roof */}
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
              {/* Roof tile lines pattern */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:16px_100%] pointer-events-none" />
              
              {/* Traditional Curved Flying Eaves (Visual Ends) */}
              <div className="absolute left-0 bottom-0 w-8 h-10 bg-zinc-900 border-l-4 border-t-4 border-[#b1892d] rounded-tl-[30px] -translate-x-3 translate-y-1 rotate-[-12deg] pointer-events-none shadow-md" />
              <div className="absolute right-0 bottom-0 w-8 h-10 bg-zinc-900 border-r-4 border-t-4 border-[#b1892d] rounded-tr-[30px] translate-x-3 translate-y-1 rotate-[12deg] pointer-events-none shadow-md" />

              {/* The Coiling Dragon sitting on Left Roof */}
              <div className="absolute left-1 -top-2 w-28 h-20 pointer-events-none z-30 opacity-90 hidden sm:flex items-center justify-center">
                <ThreeDRenderer modelType="dragon" isAnimating={phase === 'BETTING' || phase === 'DEALING'} width={100} height={100} />
              </div>

              {/* The Prowling Tiger sitting on Right Roof */}
              <div className="absolute right-1 -top-2 w-28 h-20 pointer-events-none z-30 opacity-90 hidden sm:flex items-center justify-center">
                <ThreeDRenderer modelType="tiger" isAnimating={phase === 'BETTING' || phase === 'DEALING'} width={100} height={100} />
              </div>

              {/* Cards Display Overlay centered on roof tiles */}
              <div className="flex items-center justify-center gap-6 md:gap-10 relative w-full z-10 px-6 mt-1">
                {/* Dragon card wrapper */}
                <div className="flex justify-center">
                  <Card
                    card={dragonCard}
                    flipped={dragonFlipped}
                    isWinning={winnerOption === 'DRAGON'}
                    label="DRAGON"
                  />
                </div>

                {/* VS CENTER GLOWING BADGE */}
                <div className="relative shrink-0 flex flex-col items-center justify-center">
                  <div className="text-[#ffe873] font-serif font-black text-2xl drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] animate-pulse z-10 tracking-widest italic">
                    VS
                  </div>
                  <div className="absolute -inset-2 bg-[radial-gradient(circle,rgba(250,204,21,0.25)_0%,transparent_70%)] animate-ping" style={{ animationDuration: '3s' }} />
                </div>

                {/* Tiger card wrapper */}
                <div className="flex justify-center">
                  <Card
                    card={tigerCard}
                    flipped={tigerFlipped}
                    isWinning={winnerOption === 'TIGER'}
                    label="TIGER"
                  />
                </div>
              </div>
            </div>

            {/* STATUS WOODEN BANNER PLATE */}
            <div className="bg-gradient-to-r from-[#40125a] via-[#5a1b7c] to-[#40125a] border-b border-[#ffe48f]/20 py-2.5 flex items-center justify-center relative z-10">
              <div className="bg-[#180226] border-2 border-[#b1892d] rounded-md px-8 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                <span className="text-sm font-black font-serif text-[#ffe48f] tracking-[0.2em] uppercase animate-pulse">
                  {phase === 'BETTING' ? `BETTING . . . ${timer}` :
                   phase === 'DEALING' ? 'DEALING . . .' :
                   phase === 'RESULT' ? 'RESULTS' :
                   `RESTING . . . ${timer}`}
                </span>
              </div>
            </div>
          </div>

          {/* BETTING TABLE */}
          <Table
            phase={phase}
            bets={userBets}
            totalTableBets={totalTableBets}
            placements={placements}
            selectedChip={selectedChip}
            onPlaceBet={handlePlaceBet}
            isWinningOption={winnerOption}
            history={history}
          />
        </div>
      </main>

      {/* FOOTER CONTROL TRAY */}
      <footer className="bg-gradient-to-r from-[#1b0526] via-[#2d0a3d] to-[#1b0526] border-t-2 border-[#b1892d] p-3.5 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* USER CONSOLE PANEL - PURPLE PILL WITH GOLD BORDER */}
          <div className="flex items-center gap-3 bg-[#1e0329] p-2.5 rounded-full border-2 border-[#b1892d] shrink-0 w-full md:w-auto shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-full p-0.5 border-2 border-[#ffe873] overflow-hidden bg-slate-900 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces"
                alt="My Profile"
                className="w-full h-full rounded-full object-cover animate-pulse"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-[110px] pr-2">
              <div className="text-xs font-black text-white truncate">
                name526912
              </div>
              <div className="text-sm font-black text-yellow-400 font-mono flex items-center gap-1 leading-none mt-0.5">
                {/* Yellow coin SVG index */}
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500 shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12,6 L12,18 M9,12 L15,12" stroke="currentColor" strokeWidth="2" />
                </svg>
                {userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            {/* Re-Buy fallback if wallet gets dry */}
            {userBalance < 10 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReBuy}
                className="px-2.5 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-extrabold text-[10px] rounded border border-yellow-400 uppercase tracking-wider shadow-lg flex items-center gap-1"
                id="rebuy-btn"
              >
                Re-Buy
              </motion.button>
            )}
          </div>

          {/* CHIP Denomination Selector Panel */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2.5 bg-[#12011b] px-4 py-2 rounded-full border border-[#ffe48f]/20 shadow-2xl relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[8px] font-bold tracking-widest text-[#ffe39c] uppercase px-2 bg-[#12011b] border border-[#b1892d]/50 rounded-full leading-none py-0.5">
                Choose Chip
              </div>
              
              {([1, 10, 50, 100, 1000] as ChipValue[]).map((value) => {
                const isSelected = selectedChip === value;
                return (
                  <button
                    key={`chip-select-${value}`}
                    onClick={() => {
                      setSelectedChip(value);
                      sound.playChip();
                    }}
                    className={`relative p-0.5 rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'ring-4 ring-yellow-400 scale-110 shadow-[0_0_15px_rgba(250,204,21,0.6)] z-10'
                        : 'opacity-75 hover:opacity-100 hover:scale-105'
                    }`}
                    id={`select-chip-${value}`}
                  >
                    {/* Render chip graphic inside */}
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                      <div className="pointer-events-none transform scale-[0.85] md:scale-100 origin-center">
                        <Chip value={value} size="md" animated={false} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* REPEAT BUTTON & USERS ONLINE INDICATOR */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleRepeatBets}
              disabled={phase !== 'BETTING'}
              className={`px-5 py-3 rounded-lg text-sm font-black uppercase tracking-widest border-2 transition-all shadow-md ${
                phase === 'BETTING'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white border-yellow-400/80 cursor-pointer active:scale-95'
                  : 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed'
              }`}
              title="Repeat your previous round bets"
              id="repeat-bets"
            >
              REPEAT
            </button>

            {/* Users Online count button exactly as in the screenshot */}
            <div className="relative flex items-center justify-center">
              <button 
                onClick={() => setIsHelpOpen(true)}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-[#b1892d] to-[#98721c] border-2 border-[#ffe873] flex items-center justify-center text-white shadow-md active:scale-95"
                title="Active Players Online"
              >
                {/* Users icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ffe39c]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </button>
              {/* Count badge */}
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-rose-600 text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full border border-[#ffe39c] shadow-lg leading-none">
                {playersOnline}
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* OVERALL ROADMAP SHEET BAR */}
      <AnimatePresence>
        {showRoadmap && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-950 p-4 border-t border-slate-900 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto">
              <Roadmap history={history} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

        </div>
      </ScaleToFit>

      {/* FLOATING GUIDE SHEETS */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* DRAGON & TIGER FULL-SCREEN WINNER CELEBRATION ANIMATIONS */}
      <WinnerAnimation winner={winnerOption} isOpen={phase === 'RESULT'} />

      {/* FLOAT WINNING CELEBRATION PAYOUT HUD OVERLAY */}
      <AnimatePresence>
        {payoutNotification && (
          <motion.div
            initial={{ scale: 0.6, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.6, y: -50, opacity: 0 }}
            className="fixed inset-x-0 top-1/3 mx-auto z-40 max-w-sm text-center bg-slate-900/95 border-2 border-yellow-400 p-5 rounded-2xl shadow-[0_0_35px_rgba(250,204,21,0.5)] backdrop-blur-md pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent rounded-2xl" />
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block mb-1 font-display">
              {payoutNotification.isRef ? 'TIE REFUND (50%)' : 'YOU WON!'}
            </span>
            <span className="text-3xl font-extrabold font-mono text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              +{payoutNotification.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
