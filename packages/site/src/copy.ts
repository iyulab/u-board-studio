// Every sentence the site states about the product, in both languages. Each one that makes a claim
// carries the id of its row in ../claims.tsv, which records the claim's status and where the
// repository backs it — test/claims.test.ts keeps the two in step.

export type Locale = 'ko' | 'en';

/** Every page of the site, in both languages — the address each language version lives at. */
export const PATHS = {
  home: { ko: '/', en: '/en/' },
  try: { ko: '/try/', en: '/en/try/' },
  gallery: { ko: '/gallery/', en: '/en/gallery/' },
  playground: { ko: '/playground/', en: '/en/playground/' },
} as const;

export type PageId = keyof typeof PATHS;

export const SITE_URL = 'https://board.u-platform.kr';
export const APP_URL = 'https://board-app.u-platform.kr/';
// Two repositories, two licenses: the board language and the viewer are the library (MIT); the authoring view, the
// server, the console and the MCP server are the product (AGPL-3.0 and a commercial license).
export const SOURCE_URL = 'https://github.com/iyulab/u-board-studio';
export const LIBRARY_URL = 'https://github.com/iyulab/U-Board';
export const DOCS_URL = 'https://github.com/iyulab/U-Board/tree/main/docs';
export const PRODUCT_DOCS_URL = 'https://github.com/iyulab/u-board-studio/tree/main/docs';
export const SELF_HOSTING_URL = 'https://github.com/iyulab/u-board-studio/blob/main/docs/self-hosting.md';
export const NPM_URL = 'https://www.npmjs.com/package/@iyulab/u-board';
export const CONTACT_URL = 'https://u-platform.kr/contact';

export interface Section {
  claim: string;
  heading: string;
  body: string;
}

export interface Copy {
  title: string;
  description: string;
  headline: string;
  lede: { claim: string; text: string };
  install: string;
  tryIt: string;
  readSource: string;
  signIn: string;
  /** Under the board at the top: where to see it whole. */
  hero: { open: string };
  figure: {
    caption: string;
    plant: string;
    live: string;
    stale: string;
    disconnected: string;
    staleNote: string;
    nodes: { pump: string; running: string; load: string; temp: string; pressure: string; conveyor: string };
  };
  sections: Section[];
  /** The chat panel, shown as a sped-up recording of it drawing a board. */
  assistant: Section & { caption: string; video: string };
  delivery: { heading: string; items: Section[] };
  notHeading: string;
  not: Section[];
  license: Section;
  footer: { product: string; library: string; source: string; docs: string; selfHosting: string; npm: string; contact: string };
  otherLanguage: string;
  try: {
    title: string;
    description: string;
    heading: string;
    intro: string;
    saved: string;
    unsaved: string;
    reset: string;
    narrow: string;
    source: string;
  };
  /** The JSON playground: a board's definition and data as text, drawn as typed. */
  playground: {
    nav: string;
    title: string;
    description: string;
    heading: string;
    intro: string;
    board: string;
    definition: string;
    data: string;
    view: string;
    /** In `problems`: `{n}` — how many. */
    ok: string;
    problems: string;
    /** Said over a drawn board when some parts got no value: `{n}` — how many. */
    unread: string;
    loading: string;
    loadFailed: string;
    /** Said when the board asks to open another board that is not one of the gallery's: `{board}` — its name. */
    opensBoard: string;
    toTry: string;
  };
  gallery: {
    nav: string;
    title: string;
    description: string;
    heading: string;
    intro: string;
    /** The name of the list of boards at the top of the page. */
    index: string;
    field: string;
    kind: string;
    /** `{time}` — when the source's answers shown were recorded. */
    recorded: string;
    /** Under a board on example data, in place of `recorded`: there is no source to have recorded. */
    example: string;
    /** After `recorded`, for a board whose source issues each user a key — `{host}`: where it is issued. */
    ownKey: string;
    /** A board's own page title — `{title}`: the board's. */
    boardTitle: string;
    /** The filter over the list: its name, the group names, clearing it, and `{n}` boards shown. */
    filter: { label: string; groups: { domain: string; style: string; trait: string }; clear: string; count: string; none: string };
    /** A board's page: the way back, its tags, what to do with it, and the boards near it. */
    board: {
      back: string;
      tags: string;
      definition: string;
      definitionNote: string;
      data: string;
      dataNote: string;
      download: string;
      openPlayground: string;
      related: string;
      /** In the definition shown on the page, in place of a drawing written into it — `{size}`: how big it is. */
      imageElided: string;
    };
  };
}

export const COPY: Record<Locale, Copy> = {
  ko: {
    title: 'U-Board — 보드 하나로 도면 위에도 격자 위에도, 사람과 AI가 같은 문서로',
    description:
      '대시보드를 JSON 문서 하나로 씁니다. 도면 위에도 화면 격자 위에도 같은 부품이 놓이고, 사람은 편집기에서 AI는 MCP로 쓰며, 어디서나 같은 뷰어가 그립니다. 값마다 지금 상태와 그 이유를 함께 표시합니다.',
    headline: '보드 하나로, 도면 위에도 격자 위에도',
    lede: {
      claim: 'lede',
      text: '사람은 편집기에서, AI는 MCP로 같은 JSON 문서를 쓰고, 어디서나 같은 뷰어가 그 문서만 읽어 그립니다. 문서에는 어디서 무엇을 읽는지, 무엇을 보이는지, 어디에 놓는지를 적습니다 — 도면이나 지도 위에도, 화면 폭에 맞춰 줄을 바꾸는 격자 위에도 같은 부품이 놓입니다. 값은 화면을 열어 둔 동안 그 값을 가진 시스템에서 계속 읽어 옵니다.',
    },
    install: '직접 설치',
    tryIt: '브라우저에서 만들어 보기',
    readSource: '소스 보기',
    signIn: '초대받은 계정으로 데모 인스턴스에 로그인',
    hero: { open: '이 보드 보기' },
    figure: {
      caption: '값마다 자기 상태를 표시합니다. 정상인 값에는 테두리가 없습니다. 이 그림의 원천은 세 상태를 보이려고 페이지 안에 둔 예시입니다.',
      plant: '2라인 펌프실',
      live: '정상',
      stale: '갱신 지연',
      disconnected: '연결 끊김',
      staleNote: '데이터소스에 연결할 수 없음, 5분 전',
      nodes: { pump: '펌프 A', running: '가동 중', load: '부하', temp: '온도', pressure: '압력', conveyor: '컨베이어' },
    },
    sections: [
      {
        claim: 'language',
        heading: '보드는 문서 하나이고, 언어도 하나입니다',
        body: '문서는 세 가지를 따로 적습니다 — 값을 어디서 읽고 무엇을 뜻하는지(data), 무엇을 보이는지(parts), 어디에 놓는지(layout). 놓는 방식은 도면 위(캔버스)와 격자 둘이고 부품 · 데이터 · 상태는 같습니다. 같은 스키마에서 나온 검사와 규칙서를 사람도 AI도 쓰기 때문에, 틀린 곳은 JSON 경로로 돌아옵니다. 갤러리의 보드 문서를 플레이그라운드에서 직접 고쳐 볼 수 있습니다.',
      },
      {
        claim: 'quality',
        heading: '값마다 자기 상태를 가집니다',
        body: '연결된 값은 하나하나 정상·갱신 지연·연결 끊김 중 하나로 표시되고, 정상이 아니면 그 이유(데이터소스 연결 불가, 자격 증명 거부, 원천에 값 없음, 요청 한도 초과)와 마지막 값을 받은 지 얼마나 됐는지를 함께 보여 줍니다. 원천 하나가 멈춰도 화면 전체가 오류가 되지 않습니다.',
      },
      {
        claim: 'connect',
        heading: 'HTTP로 말하는 시스템이면 연결합니다',
        body: '범용 HTTP 연결은 고정 토큰이나 헤더, OAuth 2.0 클라이언트 자격 증명으로 원천에 접속하고, JSON 응답에서 JSON Pointer로 값을 고릅니다. 자격 증명은 서버에만, 그 데이터베이스에 봉인된 채로 있고 브라우저로 가지 않습니다.',
      },
      {
        claim: 'embed',
        heading: '다른 화면에 넣어 씁니다',
        body: '공유 링크 하나로 보드를 로그인 없이 읽기 전용으로 엽니다. 다른 앱의 페이지에 iframe으로 넣을 수 있고, 링크마다 유효 기간을 정하거나 언제든 회수할 수 있습니다.',
      },
    ],
    assistant: {
      claim: 'assistant',
      heading: '말로 그리는 보드',
      body: '편집기 옆 AI 비서에게 무엇을 보여 줄지 말하면, 비서가 열린 보드에 바로 그리고 그린 결과를 스스로 확인해 고칩니다. 외부 AI 비서가 MCP 서버로 쓰는 것과 같은 도구로 그리고, 모델은 쓰는 사람이 고릅니다 — OpenAI 호환 엔드포인트의 주소와 키를 넣으면 되고, 키는 그 브라우저에만 남습니다.',
      caption: '오픈 모델 qwen3.8-27b가 두 번의 요청으로 물류센터 출고 현황판을 그리는 과정. 약 5분(대부분 모델 서버의 응답 대기)을 10배속으로 줄였고, 값은 예시입니다.',
      video: 'AI 비서가 채팅 요청을 받아 다크 테마 출고 현황판을 단계별로 그리고, 두 번째 요청에 정시 출고율 지표를 더하고 진행률이 낮은 구역을 붉게 강조하는 녹화',
    },
    delivery: {
      heading: '쓰는 방식',
      items: [
        {
          claim: 'delivery-container',
          heading: '컨테이너 하나로 사내에 설치',
          body: '서버·콘솔·공유 뷰어가 한 컨테이너 이미지에 들어 있고, 버전마다 이미지와 사내망 반입용 파일을 출처 증명과 함께 공개합니다. 인터넷이 닿지 않는 사내망에서도 돌아가고, PostgreSQL 하나(작은 설치는 내장 DB)만 있으면 됩니다.',
        },
        {
          claim: 'delivery-library',
          heading: '라이브러리로 자기 앱 안에',
          body: '보드 언어와 뷰어는 npm 패키지 @iyulab/u-board(MIT)로, 저작 화면은 @iyulab/u-board-designer(AGPL-3.0, 상용 라이선스 가능)로 가져다 자기 웹 앱 안에 넣을 수 있습니다.',
        },
        {
          claim: 'delivery-demo',
          heading: '설치 전에 보기',
          body: '이 페이지 맨 위의 보드는 갤러리의 한 판으로, 제품의 뷰어가 지금 그리는 화면입니다. 값은 그 판의 예시 응답에서 읽습니다. 보드 만들기는 “브라우저에서 만들어 보기”에서 설치 없이 해 볼 수 있고, 공유 링크까지는 이유랩이 운영하는 데모 인스턴스에서 초대받은 계정으로 써 볼 수 있습니다.',
        },
      ],
    },
    notHeading: '하지 않는 일',
    not: [
      {
        claim: 'not-hmi',
        heading: 'HMI·SCADA 패키지가 아닙니다',
        body: '심벌 라이브러리, 알람 처리, 제어 출력은 없습니다. 보드에서 다른 보드로 가는 동작은 이동을 호스트에 청할 뿐입니다. 상태를 보여 주는 화면을 그리고, 나머지는 그 화면을 품은 시스템이 맡습니다.',
      },
      {
        claim: 'not-data',
        heading: '데이터를 모아 두지 않습니다',
        body: '보드는 어떤 값을 어디서 읽을지만 기억합니다. 값은 그 값을 가진 시스템에 그대로 있습니다.',
      },
      {
        claim: 'not-bi',
        heading: 'BI 도구가 아닙니다',
        body: '데이터 웨어하우스 위의 차트와 피벗 표는 다루지 않습니다.',
      },
    ],
    license: {
      claim: 'license',
      heading: '열린 소스',
      body: '보드 언어와 뷰어(라이브러리)는 MIT 라이선스로, 저작 화면·서버·콘솔·MCP 서버(제품)는 AGPL-3.0으로 공개되어 있습니다. AGPL 조건을 따르기 어려운 조직에는 제품의 상용 라이선스를 드립니다.',
    },
    footer: {
      product: '제품 (AGPL-3.0)',
      library: '라이브러리 (MIT)',
      source: '소스',
      docs: '문서',
      selfHosting: '직접 설치',
      npm: 'npm 패키지',
      contact: '문의',
    },
    otherLanguage: 'English',
    try: {
      title: 'U-Board — 브라우저에서 만들어 보기',
      description: '설치 없이 브라우저에서 U-Board 보드를 만들어 봅니다. 부품을 옮기고, 값을 읽어 오고, 상태가 어떻게 보이는지 바로 확인합니다.',
      heading: '브라우저에서 만들어 보기',
      intro: '제품에 들어 있는 저작 화면 그대로입니다. 갤러리의 «{board}»를 열어 두었습니다. 보드 위의 부품을 끌어 옮기거나 크기를 바꾸면 위젯이 그 자리에 실제로 그려집니다. 부품을 고른 뒤 오른쪽 패널에서 무엇을 보일지, 어느 데이터를 읽을지 바꿔 보세요. ‘보기’로 바꾸면 공유 링크로 보는 화면 그대로입니다. 값은 그 보드의 예시 응답에서 읽고, 저장은 이 브라우저에만 남습니다. 내보내기는 보드를 JSON 파일로 내려받습니다.',
      saved: '이 브라우저에 저장했습니다.',
      unsaved: '저장하지 않은 변경이 있습니다.',
      reset: '처음 상태로',
      narrow: '저작 화면은 넓은 화면에 맞춰져 있습니다. 컴퓨터에서 열면 편하게 써 볼 수 있습니다.',
      source: '예시 데이터',
    },
    playground: {
      nav: '플레이그라운드',
      title: 'U-Board — JSON 플레이그라운드',
      description: 'U-Board 보드의 정의와 데이터를 JSON으로 고치면 바로 그려 봅니다. 갤러리의 보드를 불러와 바꿔 볼 수 있습니다.',
      heading: 'JSON 플레이그라운드',
      intro: '보드는 JSON 두 개로 그려집니다 — 어디서 무엇을 읽는지(data), 무엇을 보이는지(parts), 어디에 놓는지(layout)를 적은 정의와, 정의가 읽는 원천의 응답. 왼쪽을 고치면 오른쪽 보드가 바로 다시 그려지고, 잘못된 곳은 JSON 경로로 알려 줍니다. 갤러리의 보드를 불러와 시작해 보세요. 고친 내용은 이 페이지 안에만 있고 어디에도 보내지 않습니다.',
      board: '갤러리 보드 불러오기',
      definition: '정의',
      data: '데이터',
      view: '보드',
      ok: '문제 없음 — 보드를 그렸습니다.',
      problems: '문제 {n}개 — 고치면 다시 그립니다.',
      unread: '보드를 그렸습니다 — 값을 받지 못한 부품 {n}개. 부품에 올려 보면 이유가 나옵니다.',
      loading: '불러오는 중…',
      loadFailed: '보드를 불러오지 못했습니다.',
      opensBoard: '이 보드는 보드 «{board}»를 열려 합니다 — 여기서는 갤러리의 보드만 열 수 있습니다.',
      toTry: '편집 화면으로 만들어 보기',
    },
    gallery: {
      nav: '갤러리',
      title: 'U-Board — 보드 갤러리',
      description: 'U-Board로 그린 보드. 장소를 그린 약도·배치도 위, 값이 그 자리에 놓인 모습을 분야별로 봅니다.',
      heading: 'U-Board로 그린 보드',
      intro: '모두 같은 보드 언어로 쓴 보드입니다. 배경은 장소를 그린 약도나 배치도, 또는 흐름도·노선도 같은 도식이고, 값은 그 값이 가리키는 자리에 놓입니다. 도면이 없는 일반 대시보드는 같은 부품을 순서대로 칸에 늘어놓아 화면 폭에 맞춰 줄을 바꿉니다. 공공기관이 개방한 실시간 데이터에 연결한 보드는 녹화한 원천 응답을 보여 주며, 설치한 U-Board에서는 같은 보드가 원천을 직접 읽어 30초마다 갱신합니다. 공장처럼 공개 원천이 없는 분야는 예시 데이터로 그렸습니다.',
      index: '보드 목록',
      field: '분야',
      kind: '배경',
      recorded: '{time}에 녹화한 원천 응답입니다.',
      example: 'U-Board로 그린 보드입니다. 표시된 값은 이 보드를 위해 지어낸 예시 데이터로, 실제 시설의 값이 아닙니다.',
      ownKey: '이 원천은 이용자마다 키를 발급합니다 — 설치한 U-Board에서 만들려면 {host}에서 받은 키가 필요합니다.',
      boardTitle: '{title} — U-Board 갤러리',
      filter: { label: '태그로 거르기', groups: { domain: '분야', style: '양식', trait: '특징' }, clear: '모두 보기', count: '보드 {n}개', none: '고른 태그를 모두 가진 보드가 없습니다.' },
      board: {
        back: '갤러리',
        tags: '태그',
        definition: '보드 정의 (JSON)',
        definitionNote: '이 보드를 그리는 정의 전부입니다 — 각 값을 어디서 읽는지(data), 무엇을 보이는지(parts), 어디에 놓는지와 배경(layout). U-Board의 편집기와 AI 비서가 쓰는 것과 같은 형식입니다. 배경 그림은 길어서 화면에서는 줄여 보이고, 내려받은 파일에는 그대로 있습니다.',
        data: '데이터 (원천 응답 JSON)',
        dataNote: '보드가 읽는 원천과, 원천이 돌려준 응답입니다 — 보드가 읽는 필드만 남겼습니다. 이 페이지는 서버 없이 이 응답으로 보드를 그립니다.',
        download: '내려받기',
        openPlayground: '플레이그라운드에서 열기',
        related: '같은 분야의 다른 보드',
        imageElided: '(배경 그림 {size} — 내려받은 파일에 있음)',
      },
    },
  },
  en: {
    title: 'U-Board — one board over a floor plan or on a grid, written by people and AI alike',
    description:
      'Write a dashboard as one JSON document. The same parts go over a floor plan or on a screen grid; people write it in an editor and AI through MCP, and the same viewer draws it anywhere. Every value shows its current state, and why.',
    headline: 'One board, over a floor plan or on a grid',
    lede: {
      claim: 'lede',
      text: 'People write it in an editor and AI writes it through MCP — the same JSON document — and the same viewer draws it anywhere, reading only that document. The document says where values are read from, what is shown and where it sits: the same parts go over a floor plan or a map, or on a grid that rewraps to the screen’s width. Each value is read from the system that owns it for as long as the view is open.',
    },
    install: 'Install it',
    tryIt: 'Build one in your browser',
    readSource: 'Read the source',
    signIn: 'Sign in to the demo instance with an invited account',
    hero: { open: 'See this board' },
    figure: {
      caption: 'Every value shows its own state. A value that is live has no frame. The source of this drawing is a sample kept in the page to show the three states.',
      plant: 'Line 2 pump room',
      live: 'Live',
      stale: 'Stale',
      disconnected: 'Disconnected',
      staleNote: 'data source unreachable, 5 minutes ago',
      nodes: { pump: 'Pump A', running: 'Running', load: 'Load', temp: 'Temperature', pressure: 'Pressure', conveyor: 'Conveyor' },
    },
    sections: [
      {
        claim: 'language',
        heading: 'A board is one document, in one language',
        body: 'The document states three things apart — where values are read from and what they mean (data), what is shown (parts), where it sits (layout). There are two ways to place: over a drawing (canvas) and on a grid, and the parts, data and states are the same. The check and the rule book that people and AI both use come from one schema, so a mistake comes back named by its JSON path. Edit the document of any gallery board in the playground.',
      },
      {
        claim: 'quality',
        heading: 'Every value carries its own state',
        body: 'Each bound value is live, stale or disconnected, and when it is not live the view says why — the source is unreachable, the credentials were refused, the value is not at the source, or requests are rate limited — and how long ago the last value arrived. One source going quiet does not turn the whole view into an error.',
      },
      {
        claim: 'connect',
        heading: 'Anything that speaks HTTP',
        body: 'The generic HTTP connector reaches a source with a static token or header, or OAuth 2.0 client credentials, and picks the value out of a JSON response with a JSON Pointer. Credentials stay on the server, sealed in its database, and never reach the browser.',
      },
      {
        claim: 'embed',
        heading: 'Put it in another screen',
        body: 'A share link opens a board read-only without signing in. Embed it in another application’s page with an iframe, give each link an expiry, or revoke it at any time.',
      },
    ],
    assistant: {
      claim: 'assistant',
      heading: 'Boards drawn from a conversation',
      body: 'Tell the AI assistant beside the editor what the board should show: it draws on the open board, then checks what it drew and fixes it. It draws with the same tools an outside assistant uses through the MCP server, and each person picks the model — the address and key of an OpenAI-compatible endpoint, kept in that browser only.',
      caption: 'The open model qwen3.8-27b drawing a fulfilment centre’s dispatch board from two requests — about five minutes, most of it waiting on the model server, shown ten times faster. The values are examples.',
      video: 'A recording of the AI assistant drawing a dark dispatch board step by step from a chat request, then adding an on-time rate and highlighting zones that are behind in red on a second request',
    },
    delivery: {
      heading: 'Ways to run it',
      items: [
        {
          claim: 'delivery-container',
          heading: 'One container, on your network',
          body: 'The server, console and share viewer ship in one container image, released by version with an archive to carry onto a closed network, both attested to their build. Run it on your own network — no internet access needed — with a PostgreSQL database, or the embedded one for a small installation.',
        },
        {
          claim: 'delivery-library',
          heading: 'A library inside your app',
          body: 'Bring the board language and the viewer into your own web application with the npm package @iyulab/u-board (MIT), and the authoring view with @iyulab/u-board-designer (AGPL-3.0, a commercial license is available).',
        },
        {
          claim: 'delivery-demo',
          heading: 'See it before you install',
          body: 'The board at the top of this page is one board of the gallery, drawn by the product\x27s viewer right now, reading its values from that board\x27s example answers. Building a board can be tried in your browser, nothing to install; share links can be tried on the demo instance iyulab operates, with an invited account.',
        },
      ],
    },
    notHeading: 'What it does not do',
    not: [
      {
        claim: 'not-hmi',
        heading: 'Not an HMI/SCADA package',
        body: 'There is no symbol library, alarm handling or control output. An action that goes from one board to another only asks the host to move there. U-Board draws status views; the system around them keeps those jobs.',
      },
      {
        claim: 'not-data',
        heading: 'It does not collect your data',
        body: 'A board remembers which value to read and where. The values stay in the systems that own them.',
      },
      {
        claim: 'not-bi',
        heading: 'Not a business-intelligence tool',
        body: 'Charts and pivot tables over a data warehouse are out of scope.',
      },
    ],
    license: {
      claim: 'license',
      heading: 'Open source',
      body: 'The board language and the viewer (the library) are published under the MIT license; the authoring view, the server, the console and the MCP server (the product) under AGPL-3.0. A commercial license for the product is available for organizations that cannot adopt AGPL-3.0 terms.',
    },
    footer: {
      product: 'Product (AGPL-3.0)',
      library: 'Library (MIT)',
      source: 'Source',
      docs: 'Documentation',
      selfHosting: 'Self-hosting',
      npm: 'npm package',
      contact: 'Contact',
    },
    otherLanguage: '한국어',
    try: {
      title: 'U-Board — build one in your browser',
      description: 'Build a U-Board board in your browser, nothing to install: move parts, read values and see at once how each state is shown.',
      heading: 'Build one in your browser',
      intro: 'This is the authoring view the product ships, opened on the gallery’s “{board}”. Drag or resize the parts on the board — each widget is drawn live where it sits — then select one and change what it shows and which data it reads in the panel on the right; View shows the board as a shared link does. Values come from that board’s example answers, and saving keeps the board in this browser only. Export downloads the board as a JSON file.',
      saved: 'Saved in this browser.',
      unsaved: 'There are unsaved changes.',
      reset: 'Start over',
      narrow: 'The authoring view is made for a wide screen; it is easier to try on a computer.',
      source: 'Sample data',
    },
    playground: {
      nav: 'Playground',
      title: 'U-Board — JSON playground',
      description: 'Edit a U-Board board’s definition and data as JSON and see it drawn as you type. Start from any board in the gallery.',
      heading: 'JSON playground',
      intro: 'A board is drawn from two pieces of JSON — the definition, saying where values are read from (data), what is shown (parts) and where (layout), and the answers of the sources it reads. Edit either on the left and the board on the right is drawn again; anything wrong is named by its JSON path. Start from a board of the gallery. What you edit stays in this page and is sent nowhere.',
      board: 'Load a gallery board',
      definition: 'Definition',
      data: 'Data',
      view: 'Board',
      ok: 'No problems — the board is drawn.',
      problems: '{n} problems — fix them and it is drawn again.',
      unread: 'The board is drawn — {n} parts got no value. Hover a part to see why.',
      loading: 'Loading…',
      loadFailed: 'The board could not be loaded.',
      opensBoard: 'This board asks to open the board “{board}” — only the gallery’s boards open here.',
      toTry: 'Build one in the editor instead',
    },
    gallery: {
      nav: 'Gallery',
      title: 'U-Board — Board gallery',
      description: 'Boards drawn with U-Board: values placed where they belong on a plan or layout of the place, by field.',
      heading: 'Boards drawn with U-Board',
      intro: 'Every board here is written in the same board language. The background is a plan or layout of the place, or a schematic such as a flow or a network map, and each value sits where it belongs; an ordinary dashboard with no drawing lays the same parts out in order and rewraps to the screen’s width. Boards bound to live data that public bodies open to everyone show recorded answers from the sources; in an installed U-Board the same board reads the source itself and updates every 30 seconds. Fields with no public source, such as a plant, are drawn on example data.',
      index: 'Boards',
      field: 'Field',
      kind: 'Background',
      recorded: 'Answers from the source recorded at {time}.',
      example: 'A board drawn with U-Board. Its values are example data written for it, not readings from a real site.',
      ownKey: 'This source issues each user a key — creating the board in an installed U-Board needs one from {host}.',
      boardTitle: '{title} — U-Board gallery',
      filter: { label: 'Filter by tag', groups: { domain: 'Field', style: 'Style', trait: 'Traits' }, clear: 'Show all', count: '{n} boards', none: 'No board has every tag picked.' },
      board: {
        back: 'Gallery',
        tags: 'Tags',
        definition: 'Board definition (JSON)',
        definitionNote: 'Everything that draws this board — where each value is read from (data), what is shown (parts), and where it sits and over what background (layout), in the same format U-Board’s editor and AI assistant write. The background drawing is long, so it is shortened here; the downloaded file has it whole.',
        data: 'Data (source answers JSON)',
        dataNote: 'The sources the board reads and what they answered — only the fields the board reads. This page draws the board from these answers, with no server.',
        download: 'Download',
        openPlayground: 'Open in the playground',
        related: 'More boards in this field',
        imageElided: '(background drawing, {size} — in the downloaded file)',
      },
    },
  },
};
