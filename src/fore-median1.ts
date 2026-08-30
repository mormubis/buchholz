import { applyCuts, contributions, projectFore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const foreBuchholzMedian1: Tiebreak = (player, rounds, _players) => {
  const items = contributions(player, projectFore(rounds));
  const afterCutLow = applyCuts(items, 1);
  const sorted = [...afterCutLow].toSorted((a, b) => b.value - a.value);
  return sorted.slice(1).reduce((sum, c) => sum + c.value, 0);
};

export { foreBuchholzMedian1, foreBuchholzMedian1 as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
