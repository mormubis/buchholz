import { applyCuts, contributions, projectFore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const foreBuchholzCut2: Tiebreak = (player, rounds, _players) =>
  applyCuts(contributions(player, projectFore(rounds)), 2).reduce(
    (sum, c) => sum + c.value,
    0,
  );

export { foreBuchholzCut2, foreBuchholzCut2 as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
