import { describe, expect, it } from 'vitest';

import { averageOpponentsBuchholz } from '../average.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 3, rank: 1 },
  { id: 'B', points: 0.5, rank: 3 },
  { id: 'C', points: 3, rank: 2 },
  { id: 'D', points: 0.5, rank: 4 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'white', white: 'A' },
      { black: 'D', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      {
        black: 'C',
        forfeit: 'black',
        result: 'white',
        white: 'A',
      },
      { black: 'D', result: 'draw', white: 'B' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'D', result: 'white', white: 'A' },
      { black: 'C', result: 'black', white: 'B' },
    ],
  },
];

describe('averageOpponentsBuchholz', () => {
  it('excludes forfeit opponents (FIDE 8.2 over-the-board only)', () => {
    expect(averageOpponentsBuchholz('A', ROUNDS, PLAYERS)).toBe(5);
  });

  it('rounds half up like Article 10 averages', () => {
    expect(averageOpponentsBuchholz('B', ROUNDS, PLAYERS)).toBe(4);
  });
});
