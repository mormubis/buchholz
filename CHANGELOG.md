# Changelog

## [4.1.0] - 2026-08-30

### Added

- Fore Buchholz modifiers: `@echecs/buchholz/fore-cut1`, `/fore-cut2`,
  `/fore-median1`, `/fore-median2` (FIDE C.07 8.3 + 14.1-14.4)
- Average of Opponents' Fore Buchholz: `@echecs/buchholz/average-fore` (FIDE
  C.07 8.2)

### Fixed

- Fore Buchholz now applies FIDE C.07 Article 16 unplayed-rounds management
  (adjusted scores and dummy caps) on the draw-projected final round
- Average of Opponents' Buchholz now averages over-the-board opponents only and
  rounds to the nearest whole number (0.5 rounded up)

## [3.0.3] - 2026-04-17

### Fixed

- Added top-level `types` field to `package.json` for TypeScript configs that
  don't resolve types through `exports` conditions.

## 3.0.2 — 2026-04-09

### Changed

- added `fore-buchholz`, `median-buchholz`, and `swiss` keywords

## 3.0.1 — 2026-04-09

### Fixed

- corrected function signatures (removed non-existent `players` parameter)
- documented subpath exports (`/cut1`, `/cut2`, `/median1`, `/median2`,
  `/average`, `/fore`)
- documented `tiebreak` export aliases
- documented `Result` and `Player` type exports
- fixed `foreBuchholz` description

## 3.0.0 — 2026-03-25

### Changed

- **BREAKING:** Bye games now use same player for both sides
  (`{ black: 'A', white: 'A' }`) instead of empty string
  (`{ black: '', white: 'A' }`).
- Updated TypeScript to 6.0.
- Internal: split functions into individual files, renamed parameters.

## 2.0.0 — 2026-03-24

### Added

- `GameKind` type for FIDE 16 unplayed rounds.
- SPEC.md with FIDE C.07 regulation text.

### Changed

- **BREAKING:** `GameKind` added to `Game` type exports.

## 1.0.0 — 2026-03-24

### Changed

- **BREAKING:** All functions renamed to `tiebreak`.
- **BREAKING:** Subpath exports added.

## 0.3.0 — 2026-03-24

### Changed

- **BREAKING:** `Game.blackId` renamed to `Game.black`.
- **BREAKING:** `Game.whiteId` renamed to `Game.white`.

## 0.2.2 — 2026-03-23

### Changed

- **BREAKING:** `Game` type no longer has a `round` field.
- **BREAKING:** All functions accept `Game[][]` instead of `Game[]`.

## 0.1.1 — 2026-03-23

- First npm release.

## 0.1.0 — 2026-03-22

- Initial implementation.
