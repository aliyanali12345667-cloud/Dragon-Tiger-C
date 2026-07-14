export type GamePhase = 'BETTING' | 'DEALING' | 'RESULT' | 'RESTING';

export type BetOption = 'DRAGON' | 'TIE' | 'TIGER';

export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number; // 1 (Ace) to 13 (King)
  label: string; // 'A', '2', ..., 'J', 'Q', 'K'
}

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  balance: number;
  bets: Record<BetOption, number>;
  title: string;
  isVirtual: boolean;
  color: string;
}

export interface GameHistoryItem {
  roundId: number;
  winner: BetOption;
  dragonCard: Card;
  tigerCard: Card;
  timestamp: string;
}

export type ChipValue = 1 | 10 | 50 | 100 | 1000;

export interface BetPlacement {
  id: string;
  playerId: string;
  playerName: string;
  playerColor: string;
  option: BetOption;
  value: ChipValue;
  x: number; // Offset percentage x (0-100) inside betting area
  y: number; // Offset percentage y (0-100) inside betting area
}
