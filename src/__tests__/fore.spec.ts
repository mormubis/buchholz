import { describe, expect, it } from 'vitest';

import { foreBuchholz } from '../fore.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1 },
  { id: 'B', points: 1, rank: 3 },
  { id: 'C', points: 1, rank: 4 },
  { id: 'D', points: 0.5, rank: 2 },
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
      { black: 'D', result: 'black', white: 'B' },
    ],
  },
  {
    byes: [
      { kind: 'zero', player: 'B' },
      { kind: 'zero', player: 'C' },
    ],
    games: [{ black: 'D', result: 'white', white: 'A' }],
  },
];

describe('foreBuchholz', () => {
  it('applies FIDE 16.3 adjusted scores (terminal byes evaluate as draws)', () => {
    expect(foreBuchholz('A', ROUNDS, PLAYERS)).toBe(4);
  });

  it('applies FIDE 16.4 dummy caps to own unplayed rounds under projection', () => {
    expect(foreBuchholz('B', ROUNDS, PLAYERS)).toBe(4);
  });
});
