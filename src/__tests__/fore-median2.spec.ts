import { describe, expect, it } from 'vitest';

import { foreBuchholzMedian2 } from '../fore-median2.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1 },
  { id: 'B', points: 1.5, rank: 2 },
  { id: 'C', points: 1.5, rank: 3 },
  { id: 'D', points: 0.5, rank: 4 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'white', white: 'A' },
      { black: 'D', result: 'draw', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'C', result: 'draw', white: 'A' },
      { black: 'D', result: 'white', white: 'B' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'D', result: 'white', white: 'A' },
      { black: 'C', result: 'draw', white: 'B' },
    ],
  },
];

describe('foreBuchholzMedian2', () => {
  it('excludes two least and two most significant contributions', () => {
    expect(foreBuchholzMedian2('A', ROUNDS, PLAYERS)).toBe(0);
  });
});
