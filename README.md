# U-Board Studio

The authoring tool, the MCP server and the application server for [U-Board](https://github.com/iyulab/U-Board) boards.

A board is one JSON document: where its values come from, what it shows and where. U-Board validates and draws it;
this repository is what lets people and AI assistants write boards, store them and share them.

## What's here

| Package | What it is |
|---|---|
| `packages/designer` — [`@iyulab/u-board-designer`](https://www.npmjs.com/package/@iyulab/u-board-designer) | The authoring component (`BoardAuthoring`) and the board check an author or an assistant reads. |
| `packages/mcp` — [`@iyulab/u-board-mcp`](https://www.npmjs.com/package/@iyulab/u-board-mcp) | An MCP server through which an AI assistant reads and draws boards. |
| `packages/server` | The HTTP API: workspaces, members, boards, data connectors and share links, stored in PostgreSQL. |
| `packages/console` | The web console for the API. |
| `packages/share` | A read-only viewer that opens a board from a share link. |
| `packages/samples`, `packages/site` | Sample boards, and the project site. |

The server, console and share viewer ship as one container image, `ghcr.io/iyulab/u-board`.

## Run it

```sh
docker run -d -p 4000:4000 \
  -e UBOARD_DATABASE_URL='postgres://user:password@host:5432/u_board' \
  -e UBOARD_SESSION_SECRET='<a long random string>' \
  -e UBOARD_SECRETS_KEY='<another long random string>' \
  ghcr.io/iyulab/u-board:<version>
```

Open `http://localhost:4000/`; the first account to sign up runs the installation. See
[docs/self-hosting.md](docs/self-hosting.md) for every setting.

## Use the libraries

```sh
npm install @iyulab/u-board-designer @iyulab/u-board react react-dom
```

```tsx
import { BoardAuthoring } from '@iyulab/u-board-designer';

<div style={{ height: '80vh' }}>
  <BoardAuthoring initialBoard={board} adapters={adapters} onSave={next => save(next)} />
</div>;
```

To let an assistant draw boards, run `npx -y @iyulab/u-board-mcp` — see [docs/mcp.md](docs/mcp.md).

## Develop

```sh
npm ci
npm run check
```

`npm run check` runs everything CI runs. [CONTRIBUTING.md](CONTRIBUTING.md) has the details.

## Documentation

- [Running U-Board](docs/self-hosting.md)
- [Drawing boards with an assistant (MCP)](docs/mcp.md)
- [Shaping an API a board reads](docs/data-sources.md)
- The board language: [Concepts](https://github.com/iyulab/U-Board/blob/main/docs/concepts.md) · [API reference](https://github.com/iyulab/U-Board/blob/main/docs/api-reference.md)

## Contributing

Bug reports and design questions are welcome. Because the project is dual-licensed, code contributions need a signed
CLA — a single file you add in your pull request. See [CONTRIBUTING.md](CONTRIBUTING.md) and [CLA.md](CLA.md).

## License

AGPL-3.0-or-later. A commercial license is available for organizations that cannot adopt AGPL-3.0 terms.
See [LICENSE](LICENSE).
