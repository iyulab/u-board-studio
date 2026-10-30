# Changelog — @iyulab/u-board-designer

All notable changes to this package are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the package follows
[Semantic Versioning](https://semver.org/) — below 1.0, a minor release may contain breaking changes.

## [Unreleased]

### Changed

- The rules say that in a grid layout the items of an `each` part are cells of their own — `["pumps", 2]` flows them six to a row — so a list of tiles needs no per-item layout. (Two wordier phrases in the canvas notes were shortened to stay inside the rules' length budget.)
- The rules say where a `{{field}}` is read — a title, a status card's subtitle and note — that a header's kicker and subtitle are
  fixed text and its `clock` is `true`, and that with a `list` a read's `time` is a field of each item (an item without it has no value;
  the answer's own time is `answerTime`).
- The rules (`boardRulebook`) say how to size a marker placed by its item's fields: a dot alone is `[14, 14]`, a marker that
  carries its name, status or note needs the room for the text, and it is the box, not the dot, that is centred on the point.
- The rules say that a field's `at` points into one item — with a `list`, an item of it — so a count or total beside the list is read with a
  read of its own that has no `list`.

## [0.1.0] - 2026-10-27

### Added

- The authoring tool (`BoardAuthoring`), its texts (`DesignerLabels`, `KO_DESIGNER_LABELS`) and the board check an
  author or an assistant reads (`checkBoard`, `emptyBoard`, `sourceAdvice`, `boardRulebook`, from
  `@iyulab/u-board-designer/check`), previously part of `@iyulab/u-board`.
