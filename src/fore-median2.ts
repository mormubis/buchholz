import { applyCuts, contributions, projectFore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const foreBuchholzMedian2: Tiebreak = (player, rounds, _players) => {
  const items = contributions(player, projectFore(rounds));
  const afterCutLow = applyCuts(items, 2);
  const sorted = [...afterCutLow].toSorted((a, b) => b.value - a.value);
  return sorted.slice(2).reduce((sum, c) => sum + c.value, 0);
};

export { foreBuchholzMedian2, foreBuchholzMedian2 as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
