import { foreBuchholz } from './fore.js';
import { otbOpponents } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const averageOpponentsBuchholzFore: Tiebreak = (player, rounds, players) => {
  const opps = otbOpponents(player, rounds);
  if (opps.length === 0) {
    return 0;
  }
  let sum = 0;
  for (const id of opps) {
    sum += foreBuchholz(id, rounds, players);
  }
  return Math.round(sum / opps.length);
};

export {
  averageOpponentsBuchholzFore,
  averageOpponentsBuchholzFore as tiebreak,
};

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
