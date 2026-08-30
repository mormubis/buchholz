import { contributions, projectFore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const foreBuchholz: Tiebreak = (player, rounds, _players) =>
  contributions(player, projectFore(rounds)).reduce(
    (sum, c) => sum + c.value,
    0,
  );

export { foreBuchholz, foreBuchholz as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
