# Buchholz

[![npm](https://img.shields.io/npm/v/@echecs/buchholz)](https://www.npmjs.com/package/@echecs/buchholz)
[![Coverage](https://codecov.io/gh/echecsjs/buchholz/branch/main/graph/badge.svg)](https://codecov.io/gh/echecsjs/buchholz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Spec](https://img.shields.io/badge/Spec-FIDE-green.svg)](SPEC.md)

**Buchholz** is a TypeScript library implementing the Buchholz tiebreak family
for chess tournaments, following the
[FIDE Tiebreak Regulations](https://handbook.fide.com/chapter/TieBreakRegulations032026)
(section 8). Zero runtime dependencies.

> **Fixed in 4.1.0:** Fore Buchholz and Average of Opponents' Buchholz now apply
> FIDE C.07 Article 16 unplayed-rounds management, and AOB averages
> over-the-board opponents only with half-up rounding.

## Installation

```bash
npm install @echecs/buchholz
```

## Quick Start

```typescript
import { buchholz } from '@echecs/buchholz';
import type { Game, GameKind } from '@echecs/buchholz';

// games[n] = round n+1; Game has no `round` field
const games: Game[][] = [
  [{ black: 'B', result: 1, white: 'A' }], // round 1
  [{ black: 'C', result: 0, white: 'A' }], // round 2
  [{ black: 'A', result: 0.5, white: 'D' }], // round 3
  // Unplayed rounds use kind to classify the bye type (FIDE article 16)
  [{ black: '', kind: 'half-bye', result: 0.5, white: 'A' }], // round 4
];

const score = buchholz('A', games);
// Returns sum of all opponents' tournament scores (byes excluded)
```

## API

All functions accept `(player: string, games: Game[][], players?: Player[])` and
return `number`. Round is determined by array position: `games[0]` = round 1,
`games[1]` = round 2, etc. The `Game` type has no `round` field.

The optional `kind?: GameKind` field on `Game` classifies unplayed rounds for
FIDE article 16 compliance. Valid values: `'forfeit-loss'`, `'forfeit-win'`,
`'full-bye'`, `'half-bye'`, `'pairing-bye'`, `'zero-bye'`. When absent the game
is treated as a normal over-the-board result.

### `@echecs/buchholz` — `buchholz` / `tiebreak`

```typescript
import { buchholz, tiebreak } from '@echecs/buchholz';
```

**FIDE section 8.1** — Full Buchholz score. Returns the sum of the tournament
scores of all opponents faced by `player`. Byes are excluded.

### `@echecs/buchholz/cut1` — `buchholzCut1` / `tiebreak`

```typescript
import { buchholzCut1, tiebreak } from '@echecs/buchholz/cut1';
```

**FIDE section 8.1 + modifier 14.1** — Buchholz minus the lowest-scoring
opponent. Sorts opponents' scores ascending and removes the first before
summing. When the player has voluntary unplayed rounds (VURs), the FIDE article
16.5 Cut-1 Exception ensures the lowest VUR contribution is cut first.

### `@echecs/buchholz/cut2` — `buchholzCut2` / `tiebreak`

```typescript
import { buchholzCut2, tiebreak } from '@echecs/buchholz/cut2';
```

**FIDE section 8.3** — Buchholz minus the two lowest-scoring opponents. Removes
the two lowest scores before summing.

### `@echecs/buchholz/median1` — `buchholzMedian1` / `tiebreak`

```typescript
import { buchholzMedian1, tiebreak } from '@echecs/buchholz/median1';
```

**FIDE section 8.4** — Median Buchholz. Removes one highest and one lowest
opponent score before summing.

### `@echecs/buchholz/median2` — `buchholzMedian2` / `tiebreak`

```typescript
import { buchholzMedian2, tiebreak } from '@echecs/buchholz/median2';
```

**FIDE section 8.5** — Double Median Buchholz. Removes the two highest and two
lowest opponent scores before summing.

### `@echecs/buchholz/average` — `averageOpponentsBuchholz` / `tiebreak`

```typescript
import { averageOpponentsBuchholz, tiebreak } from '@echecs/buchholz/average';
```

**FIDE section 8.6** — Average Buchholz of opponents. Returns the mean of the
full Buchholz scores of each over-the-board opponent faced, rounded to the
nearest whole number (halves rounded up). Returns `0` when no opponents have
been faced.

### `@echecs/buchholz/average-fore` — `averageOpponentsBuchholzFore` / `tiebreak`

```typescript
import {
  averageOpponentsBuchholzFore,
  tiebreak,
} from '@echecs/buchholz/average-fore';
```

**FIDE section 8.2** — Average of Opponents' Fore Buchholz (AOB/F). Averages the
Fore Buchholz scores of the opponents the player faced over the board, rounded
to the nearest whole number (halves rounded up). Signature:
`(player: string, rounds: CompletedRound[], players: Player[]) => number`.
Returns `0` when no over-the-board opponents have been faced.

### `@echecs/buchholz/fore` — `foreBuchholz` / `tiebreak`

```typescript
import { foreBuchholz, tiebreak } from '@echecs/buchholz/fore';
```

**FIDE section 8.3** — Fore Buchholz (FB). Returns the sum of the player's
Buchholz contributions, with the last round treated as a draw for all games.
Applies FIDE article 16 unplayed-rounds management (adjusted scores and dummy
caps) to the draw-projected rounds.

### `@echecs/buchholz/fore-cut1` — `foreBuchholzCut1` / `tiebreak`

```typescript
import { foreBuchholzCut1, tiebreak } from '@echecs/buchholz/fore-cut1';
```

**FIDE section 8.3 + modifier 14.1** — Fore Buchholz Cut-1 (FB/C1). Fore
Buchholz excluding the least significant contribution. When the player has
voluntary unplayed rounds (VURs), the FIDE article 16.5 Cut-1 Exception ensures
the lowest VUR contribution is cut first. Signature:
`(player: string, rounds: CompletedRound[], players: Player[]) => number`.

### `@echecs/buchholz/fore-cut2` — `foreBuchholzCut2` / `tiebreak`

```typescript
import { foreBuchholzCut2, tiebreak } from '@echecs/buchholz/fore-cut2';
```

**FIDE section 8.3 + modifier 14.2** — Fore Buchholz Cut-2 (FB/C2). Fore
Buchholz excluding the two least significant contributions. Signature:
`(player: string, rounds: CompletedRound[], players: Player[]) => number`.

### `@echecs/buchholz/fore-median1` — `foreBuchholzMedian1` / `tiebreak`

```typescript
import { foreBuchholzMedian1, tiebreak } from '@echecs/buchholz/fore-median1';
```

**FIDE section 8.3 + modifier 14.3** — Fore Buchholz Median-1 (FB/M1). Fore
Buchholz excluding the least and the most significant contributions (in that
order). Signature:
`(player: string, rounds: CompletedRound[], players: Player[]) => number`.

### `@echecs/buchholz/fore-median2` — `foreBuchholzMedian2` / `tiebreak`

```typescript
import { foreBuchholzMedian2, tiebreak } from '@echecs/buchholz/fore-median2';
```

**FIDE section 8.3 + modifier 14.4** — Fore Buchholz Median-2 (FB/M2). Fore
Buchholz excluding the two least and the two most significant contributions (in
that order). Signature:
`(player: string, rounds: CompletedRound[], players: Player[]) => number`.

## Types

All subpath exports re-export the same types from the root entry point.

### `Game`

```typescript
interface Game {
  black: string;
  kind?: GameKind;
  result: Result;
  white: string;
}
```

A single game. `black` and `white` are player IDs. A bye is represented with an
empty string for the absent side (`black: ''`). The optional `kind` field
classifies unplayed rounds per FIDE article 16.

### `GameKind`

```typescript
type GameKind =
  | 'forfeit-loss'
  | 'forfeit-win'
  | 'full-bye'
  | 'half-bye'
  | 'pairing-bye'
  | 'zero-bye';
```

### `Result`

```typescript
type Result = 0 | 0.5 | 1;
```

The result of a game from white's perspective: `0` = loss, `0.5` = draw, `1` =
win.

### `Player`

```typescript
interface Player {
  id: string;
}
```

Minimal player shape. Passed as the optional third argument to all tiebreak
functions. When provided, `players` supplies the full participant registry so
that opponents who have no games recorded (e.g. late withdrawals or forfeited
rounds with no matching `Game` entry) can still be resolved for score
calculations. If omitted, only opponents found in `games` are considered.

## Contributing

Contributions are welcome. Please open an issue at
[github.com/echecsjs/buchholz/issues](https://github.com/echecsjs/buchholz/issues).
