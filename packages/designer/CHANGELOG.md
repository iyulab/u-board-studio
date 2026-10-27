# Changelog — @iyulab/u-board-designer

All notable changes to this package are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the package follows
[Semantic Versioning](https://semver.org/) — below 1.0, a minor release may contain breaking changes.

## [Unreleased]

### Changed

- The rules (`boardRulebook`) say how to size a marker placed by its item's fields: a dot alone is `[14, 14]`, a marker that
  carries its name, status or note needs the room for the text, and it is the box, not the dot, that is centred on the point.

## [0.1.0] - 2026-10-27

### Added

- The authoring tool (`BoardAuthoring`), its texts (`DesignerLabels`, `KO_DESIGNER_LABELS`) and the board check an
  author or an assistant reads (`checkBoard`, `emptyBoard`, `sourceAdvice`, `boardRulebook`, from
  `@iyulab/u-board-designer/check`), previously part of `@iyulab/u-board`.
