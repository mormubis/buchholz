import { applyCuts, contributions, projectFore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const foreBuchholzCut1: Tiebreak = (player, rounds, _players) =>
  applyCuts(contributions(player, projectFore(rounds)), 1).reduce(
    (sum, c) => sum + c.value,
    0,
  );

export { foreBuchholzCut1, foreBuchholzCut1 as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
