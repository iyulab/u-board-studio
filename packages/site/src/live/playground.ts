// The "build one in your browser" page: the product's authoring view on a board of the gallery, with the answers
// recorded for that board — the board at the top of the home page, opened for editing. Nothing leaves the browser —
// saving keeps the board in localStorage, so it opens again where it was left.

import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BoardAuthoring, KO_DESIGNER_LABELS } from '@iyulab/u-board-designer';
import type { Board } from '@iyulab/u-board';
import '@iyulab/u-board/styles.css';
import '@iyulab/u-board-designer/styles.css';
import { loadSamplePack, snapshotAdapters } from '@iyulab/u-board-samples/lazy';
import { savedBoard, STORAGE_KEY, OLD_STORAGE_KEYS } from './saved-board';

interface PlaygroundText {
  /** The gallery board to start from. */
  board: string;
  source: string;
  saved: string;
  unsaved: string;
}

function storage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

for (const host of document.querySelectorAll<HTMLElement>('[data-playground]')) {
  const text = JSON.parse(host.dataset.playground ?? '{}') as PlaygroundText;
  const status = document.querySelector<HTMLElement>('[data-playground-status]');
  const reset = document.querySelector<HTMLButtonElement>('[data-playground-reset]');
  const korean = document.documentElement.lang === 'ko';

  const save = (board: Board) => {
    try {
      storage()?.setItem(STORAGE_KEY, JSON.stringify(board));
      if (status) status.textContent = text.saved;
    } catch {
      // A browser that refuses storage (private mode, full) still lets the board be exported.
    }
  };

  reset?.addEventListener('click', () => {
    try {
      storage()?.removeItem(STORAGE_KEY);
    } catch {
      // nothing stored to remove
    }
    window.location.reload();
  });

  void loadSamplePack(text.board).then(pack => {
    if (!pack) return;
    // A board saved by an earlier version of this page reads a source this page no longer has.
    for (const key of OLD_STORAGE_KEYS) {
      try {
        storage()?.removeItem(key);
      } catch {
        // nothing to remove
      }
    }
    const adapters = snapshotAdapters(pack);
    host.replaceChildren();
    createRoot(host).render(
      createElement(BoardAuthoring, {
        initialBoard: savedBoard(storage()) ?? pack.board,
        adapters,
        sourceLabels: Object.fromEntries(adapters.map(a => [a.id, text.source])),
        onSave: save,
        onDirtyChange: (dirty: boolean) => {
          if (status && dirty) status.textContent = text.unsaved;
        },
        labels: korean ? KO_DESIGNER_LABELS : undefined,
      })
    );
  });
}
