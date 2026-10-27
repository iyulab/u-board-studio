import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { KO_LABELS, ViewerPage, type Adapter, type ViewDocument } from '@iyulab/u-board';
import { getBoard, listConnectors, apiClock, type ConnectorSummary } from '../api-client.js';
import { HttpConnectorAdapter } from '../http-connector-adapter.js';
import './BoardEditorPage.css';
import { Alert } from '../design-system/Alert.js';
import { Loading } from '../design-system/Loading.js';

type Shown = {
  name: string;
  picture: ViewDocument;
  elementOrigins: readonly string[];
  elementFrames: string | undefined;
};

/**
 * A board as the people who use it see it: drawn as it is stored, with no editor around it. A trigger that asks for
 * another board (`go-to-board`) opens that board's own screen here, so a board that leads to others can be walked
 * through without ever entering the editor.
 */
export function BoardViewPage({ workspaceId }: { workspaceId: string }) {
  const { boardId } = useParams<{ boardId: string }>();
  // `?scripts=off` opens the board without running its script elements, as the editor does.
  const [searchParams] = useSearchParams();
  const scriptsOff = searchParams.get('scripts') === 'off';
  const navigate = useNavigate();
  const [shown, setShown] = useState<Shown | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [connectors, setConnectors] = useState<ConnectorSummary[]>([]);
  const [connectorsError, setConnectorsError] = useState<string | null>(null);

  useEffect(() => {
    // A board opened after another must not be overwritten by the first one's late answer.
    let cancelled = false;
    setShown(null);
    setLoadError(null);
    getBoard(workspaceId, boardId!)
      .then(board => {
        if (cancelled) return;
        setShown({
          name: board.name,
          picture: board.picture,
          elementOrigins: board.elementOrigins ?? [],
          elementFrames: board.elementFrames,
        });
      })
      .catch(() => {
        if (!cancelled) setLoadError('보드를 불러오지 못했습니다');
      });
    return () => {
      cancelled = true;
    };
  }, [workspaceId, boardId]);

  useEffect(() => {
    listConnectors(workspaceId)
      .then(res => setConnectors(res.connectors))
      .catch(() => setConnectorsError('데이터소스 목록을 불러오지 못했습니다'));
  }, [workspaceId]);

  const adapters: readonly Adapter[] = useMemo(
    () => connectors.map(c => new HttpConnectorAdapter(workspaceId, c.id, c.attribution, c.type === 'static' && c.sample)),
    [workspaceId, connectors]
  );

  const header = (
    <header className="ub-editor-header">
      <Link className="ub-editor-header__back" to="/boards">
        ◂ 보드 목록으로
      </Link>
      <h1 className="ub-editor-header__title">{shown?.name ?? ''}</h1>
      <span className="ub-editor-header__status" />
      <div className="ub-editor-header__actions">
        <Link className="ub-editor-header__back" to={`/boards/${encodeURIComponent(boardId!)}/edit`}>편집</Link>
      </div>
    </header>
  );

  if (loadError)
    return (
      <div className="ub-editor">
        {header}
        <Alert>{loadError}</Alert>
      </div>
    );
  if (!shown)
    return (
      <div className="ub-editor">
        {header}
        <Loading />
      </div>
    );

  // The server serves the frames the board's script elements run in under this address — none while opened with
  // scripts off, so no element code runs.
  const elementFrames = scriptsOff ? undefined : (shown.elementFrames ?? `/api/element-frames/${encodeURIComponent(boardId!)}`);

  return (
    <div className="ub-editor">
      {header}
      {connectorsError && <Alert>{connectorsError}</Alert>}
      <div className="ub-editor-body">
        <div className="ub-editor-canvas">
          <ViewerPage
            key={boardId}
            document={shown.picture}
            adapters={adapters}
            ariaLabel={shown.name}
            labels={KO_LABELS}
            clock={apiClock.now}
            elementOrigins={shown.elementOrigins}
            elementFrames={elementFrames}
            boardId={boardId}
            onNavigate={({ board }) => navigate(`/boards/${encodeURIComponent(board)}`)}
          />
        </div>
      </div>
    </div>
  );
}
