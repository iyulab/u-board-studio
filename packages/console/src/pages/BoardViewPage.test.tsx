import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import type { Board } from '@iyulab/u-board';
import { toViewDocument } from '@iyulab/u-board/domain';
import { BoardViewPage } from './BoardViewPage.js';
import * as api from '../api-client.js';

vi.mock('../api-client.js');
vi.mock('@canvas-kit/viewer', () => ({ Viewer: () => <div data-testid="viewer" /> }));

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(api.listConnectors).mockResolvedValue({ connectors: [] });
});

function renderPage(boardId = 'b1') {
  return render(
    <MemoryRouter initialEntries={[`/boards/${boardId}`]}>
      <Routes>
        <Route path="/boards/:boardId" element={<BoardViewPage workspaceId="w1" />} />
        <Route path="/boards/:boardId/edit" element={<div>editor page</div>} />
        <Route path="/boards" element={<div>boards list page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

const linked: Board = {
  parts: { a: { as: 'label', title: 'A' } },
  layout: { kind: 'grid', items: ['a'] },
  triggers: [{ on: { event: 'click', part: 'a' }, do: [{ action: 'go-to-board', board: 'b2' }] }],
};
const plain: Board = { parts: { b: { as: 'label', title: 'B' } }, layout: { kind: 'grid', items: ['b'] } };

const stored = (id: string, name: string, document: Board) =>
  ({ id, name, document, picture: toViewDocument(document), updatedAt: 't', revision: 1 });

describe('BoardViewPage', () => {
  it('draws the board as it is stored, with no editor around it, and a way to the editor', async () => {
    vi.mocked(api.getBoard).mockResolvedValue(stored('b1', 'Floor 1', plain));
    renderPage();

    expect(await screen.findByRole('heading', { level: 1, name: 'Floor 1' })).toBeInTheDocument();
    expect(api.getBoard).toHaveBeenCalledWith('w1', 'b1');
    expect(await screen.findByRole('region', { name: 'Floor 1' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '저장' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '편집' })).toHaveAttribute('href', '/boards/b1/edit');
    expect(screen.getByRole('link', { name: '◂ 보드 목록으로' })).toHaveAttribute('href', '/boards');
  });

  it("opens the board a trigger asks for on that board's own screen, not in the editor", async () => {
    vi.mocked(api.getBoard).mockImplementation(async (_w: string, id: string) =>
      id === 'b1' ? stored('b1', 'Floor 1', linked) : stored('b2', 'Floor 2', plain)
    );
    renderPage();
    const board = await screen.findByRole('region', { name: 'Floor 1' });
    await userEvent.click(within(board).getByRole('button'));

    expect(await screen.findByRole('heading', { level: 1, name: 'Floor 2' })).toBeInTheDocument();
    expect(api.getBoard).toHaveBeenCalledWith('w1', 'b2');
    expect(screen.queryByText('editor page')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '편집' })).toHaveAttribute('href', '/boards/b2/edit');
  });

  it('shows an error instead of staying on the loading placeholder when the board does not load', async () => {
    vi.mocked(api.getBoard).mockRejectedValue(new Error('network down'));
    renderPage();

    expect(await screen.findByRole('alert')).toHaveTextContent('보드를 불러오지 못했습니다');
    expect(screen.getByRole('link', { name: '◂ 보드 목록으로' })).toBeInTheDocument();
  });

  it('says so when the data sources do not load, and still draws the board', async () => {
    vi.mocked(api.getBoard).mockResolvedValue(stored('b1', 'Floor 1', plain));
    vi.mocked(api.listConnectors).mockRejectedValue(new Error('network down'));
    renderPage();

    expect(await screen.findByRole('alert')).toHaveTextContent('데이터소스 목록을 불러오지 못했습니다');
    await waitFor(() => expect(screen.getByRole('region', { name: 'Floor 1' })).toBeInTheDocument());
  });
});
