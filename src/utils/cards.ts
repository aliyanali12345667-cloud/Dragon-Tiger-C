import { Card } from '../types';

const SUITS: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
const LABELS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function generateCard(): Card {
  const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
  const valueIndex = Math.floor(Math.random() * LABELS.length);
  const value = valueIndex + 1; // 1 to 13
  const label = LABELS[valueIndex];

  return { suit, value, label };
}

export function getSuitSymbol(suit: Card['suit']): string {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
  }
}

export function getSuitColor(suit: Card['suit']): string {
  switch (suit) {
    case 'hearts':
    case 'diamonds':
      return 'text-red-500';
    case 'clubs':
    case 'spades':
      return 'text-zinc-100';
  }
}

export function getCardFullName(card: Card): string {
  const suitName = card.suit.charAt(0).toUpperCase() + card.suit.slice(1);
  const valName = card.label === 'A' ? 'Ace' : card.label === 'K' ? 'King' : card.label === 'Q' ? 'Queen' : card.label === 'J' ? 'Jack' : card.label;
  return `${valName} of ${suitName}`;
}
