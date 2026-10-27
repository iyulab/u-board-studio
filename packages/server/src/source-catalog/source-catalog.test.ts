import { describe, expect, it } from 'vitest';
import { CATALOG_LIMITS, CatalogError, summarizeDescription } from './index.js';
import { readXmlElements } from './mini-xml.js';

const NS = 'http://docs.oasis-open.org/odata/ns/edm';

/** A small service: a base type with the key, a type built on it, a set that restricts, a set that does not, a singleton. */
const CSDL_XML = `<?xml version="1.0" encoding="utf-8"?>
<!-- a service of plant equipment -->
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Plant.Models" Alias="P" xmlns="${NS}">
      <EntityType Name="Asset" Abstract="true">
        <Key><PropertyRef Name="Id"/></Key>
        <Property Name="Id" Type="Edm.Int64" Nullable="false"/>
        <Property Name="Name" Type="Edm.String"/>
      </EntityType>
      <EntityType Name="Pump" BaseType="Plant.Models.Asset">
        <Property Name="Flow" Type="Edm.Double" Nullable="false"/>
        <Property Name="Tags" Type="Collection(Edm.String)"/>
        <NavigationProperty Name="Line" Type="Plant.Models.Line"/>
        <NavigationProperty Name="Readings" Type="Collection(Plant.Models.Reading)"/>
      </EntityType>
      <EntityType Name="Line">
        <Key><PropertyRef Name="Code"/></Key>
        <Property Name="Code" Type="Edm.String" Nullable="false"/>
      </EntityType>
      <EntityContainer Name="Container">
        <EntitySet Name="Pumps" EntityType="P.Pump">
          <Annotation Term="Org.OData.Capabilities.V1.FilterRestrictions">
            <Record>
              <PropertyValue Property="NonFilterableProperties"><Collection><PropertyPath>Tags</PropertyPath></Collection></PropertyValue>
            </Record>
          </Annotation>
          <Annotation Term="Org.OData.Capabilities.V1.SkipSupported" Bool="false"/>
        </EntitySet>
        <EntitySet Name="Lines" EntityType="Plant.Models.Line"/>
        <Singleton Name="Site" Type="Plant.Models.Line"/>
      </EntityContainer>
      <Annotations Target="Plant.Models.Container/Lines">
        <Annotation Term="Org.OData.Capabilities.V1.SortRestrictions"><Record><PropertyValue Property="Sortable" Bool="false"/></Record></Annotation>
      </Annotations>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

describe('an OData $metadata as XML', () => {
  const catalog = summarizeDescription('odata', CSDL_XML);
  const entry = (path: string) => catalog.entries.find(e => e.path === path)!;

  it('lists each entity set and singleton of the container, and what the service calls itself', () => {
    expect(catalog.kind).toBe('odata');
    expect(catalog.title).toBe('Plant.Models');
    expect(catalog.entries.map(e => [e.path, e.shape])).toEqual([['/Pumps', 'set'], ['/Lines', 'set'], ['/Site', 'item']]);
  });

  it("gives a type its base type's fields first, and its key from the base type", () => {
    expect(entry('/Pumps').key).toEqual(['Id']);
    expect(entry('/Pumps').fields).toEqual([
      { name: 'Id', type: 'Edm.Int64' },
      { name: 'Name', type: 'Edm.String', nullable: true },
      { name: 'Flow', type: 'Edm.Double' },
      { name: 'Tags', type: 'Collection(Edm.String)', nullable: true, filter: false },
    ]);
  });

  it('names what an item relates to, with its types short', () => {
    expect(entry('/Pumps').relations).toEqual([{ name: 'Line', type: 'Line' }, { name: 'Readings', type: 'Collection(Reading)' }]);
    expect(entry('/Lines').relations).toBeUndefined();
  });

  it('leaves out the query options the service restricts, and keeps the rest', () => {
    expect(entry('/Pumps').query).toEqual(['$filter', '$select', '$orderby', '$top', '$count', '$expand']);
    // An annotation written outside the set, naming it by its target.
    expect(entry('/Lines').query).toEqual(['$filter', '$select', '$top', '$skip', '$count', '$expand']);
    expect(entry('/Site').query).toEqual(['$select', '$expand']);
  });

  it('does not carry namespace declarations as attributes of the model', () => {
    const root = readXmlElements(CSDL_XML);
    expect(root.name).toBe('Edmx');
    expect(Object.keys(root.attrs)).toEqual(['Version']);
  });
});

describe('an OData $metadata as JSON (CSDL JSON)', () => {
  const document = {
    $Version: '4.01',
    $EntityContainer: 'Plant.Container',
    Plant: {
      Asset: { $Kind: 'EntityType', $Key: ['Id'], Id: { $Type: 'Edm.Int64' }, Name: { $Nullable: true }, Parts: { $Kind: 'NavigationProperty', $Collection: true, $Type: 'Plant.Part' } },
      Container: {
        $Kind: 'EntityContainer',
        Assets: { $Collection: true, $Type: 'Plant.Asset', '@Org.OData.Capabilities.V1.FilterRestrictions': { Filterable: false } },
        Main: { $Type: 'Plant.Asset' },
        Restart: { $Kind: 'ActionImport', $Action: 'Plant.Restart' },
      },
    },
  };

  it('reads the same catalog from it: sets, singletons, fields, key, relations, and what the service refuses', () => {
    const catalog = summarizeDescription('odata', JSON.stringify(document));
    expect(catalog.entries.map(e => e.path)).toEqual(['/Assets', '/Main']);
    const assets = catalog.entries[0]!;
    expect(assets).toMatchObject({
      shape: 'set',
      key: ['Id'],
      fields: [{ name: 'Id', type: 'Edm.Int64', filter: false }, { name: 'Name', type: 'Edm.String', nullable: true, filter: false }],
      relations: [{ name: 'Parts', type: 'Collection(Part)' }],
    });
    expect(assets.query).not.toContain('$filter');
    expect(catalog.entries[1]!.shape).toBe('item');
  });

  it('refuses a JSON document that is not CSDL', () => {
    expect(() => summarizeDescription('odata', '{"openapi":"3.0.0","paths":{}}')).toThrow(/not an OData \$metadata/);
  });
});

describe('an OpenAPI document', () => {
  const document = {
    openapi: '3.0.3',
    info: { title: 'Plant API' },
    paths: {
      '/pumps': {
        get: {
          summary: 'Every pump',
          parameters: [{ name: 'line', in: 'query', required: true, schema: { type: 'string' } }, { name: 'limit', in: 'query' }, { name: 'trace', in: 'header' }],
          responses: { '200': { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pump' } } } } } },
        },
        post: { responses: {} },
      },
      '/pumps/{id}': {
        parameters: [{ name: 'fields', in: 'query' }],
        get: { description: 'One pump.\nMore words.', responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Pump' } } } } } },
      },
      '/restart': { post: { responses: {} } },
    },
    components: {
      schemas: {
        Base: { type: 'object', properties: { id: { type: 'integer', format: 'int64' } } },
        Pump: { allOf: [{ $ref: '#/components/schemas/Base' }, { type: 'object', properties: { flow: { type: 'number' }, tags: { type: 'array', items: { type: 'string' } }, note: { type: 'string', nullable: true }, line: { $ref: '#/components/schemas/Line' } } }] },
        Line: { type: 'object', properties: { code: { type: 'string' } } },
      },
    },
  };

  it('lists the paths that can be read, with their fields and the parameters they take', () => {
    const catalog = summarizeDescription('openapi', JSON.stringify(document));
    expect(catalog.title).toBe('Plant API');
    expect(catalog.entries.map(e => [e.path, e.shape])).toEqual([['/pumps', 'list'], ['/pumps/{id}', 'item']]);
    expect(catalog.entries[0]).toMatchObject({
      about: 'Every pump',
      query: ['line', 'limit'],
      required: ['line'],
      fields: [
        { name: 'id', type: 'integer:int64' },
        { name: 'flow', type: 'number' },
        { name: 'tags', type: 'array<string>' },
        { name: 'note', type: 'string', nullable: true },
        { name: 'line', type: 'Line' },
      ],
    });
    // A parameter written for the whole path, and the first line of a description for lack of a summary.
    expect(catalog.entries[1]).toMatchObject({ about: 'One pump.', query: ['fields'] });
  });

  it('reads a Swagger 2.0 document', () => {
    const swagger = {
      swagger: '2.0',
      paths: { '/pets': { get: { parameters: [{ name: 'status', in: 'query', required: true, type: 'string' }], responses: { '200': { schema: { type: 'array', items: { $ref: '#/definitions/Pet' } } } } } } },
      definitions: { Pet: { type: 'object', properties: { name: { type: 'string' } } } },
    };
    expect(summarizeDescription('openapi', JSON.stringify(swagger)).entries).toEqual([
      { path: '/pets', shape: 'list', fields: [{ name: 'name', type: 'string' }], query: ['status'], required: ['status'] },
    ]);
  });

  it('ends on a schema that refers to itself', () => {
    const loop = { openapi: '3.0.0', paths: { '/a': { get: { responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/A' } } } } } } } }, components: { schemas: { A: { $ref: '#/components/schemas/A' } } } };
    expect(summarizeDescription('openapi', JSON.stringify(loop)).entries[0]).toMatchObject({ path: '/a', fields: [] });
  });

  it('refuses what is not an OpenAPI document, or has nothing to read', () => {
    expect(() => summarizeDescription('openapi', '{"info":{}}')).toThrow(/not an OpenAPI document/);
    expect(() => summarizeDescription('openapi', JSON.stringify({ openapi: '3.0.0', paths: { '/x': { post: {} } } }))).toThrow(/no path that can be read/);
    expect(() => summarizeDescription('openapi', '<html/>')).toThrow(/not JSON/);
  });
});

describe('the limits of a catalog', () => {
  it('holds the entries, and says how many it left out', () => {
    const paths = Object.fromEntries(Array.from({ length: CATALOG_LIMITS.entries + 5 }, (_, i) => [`/p${i}`, { get: { responses: {} } }]));
    const catalog = summarizeDescription('openapi', JSON.stringify({ openapi: '3.0.0', paths }));
    expect(catalog.entries).toHaveLength(CATALOG_LIMITS.entries);
    expect(catalog.entriesCut).toBe(5);
  });

  it('holds the fields of an entry, and says how many it left out', () => {
    const properties = Object.fromEntries(Array.from({ length: CATALOG_LIMITS.fields + 3 }, (_, i) => [`f${i}`, { type: 'string' }]));
    const document = { openapi: '3.0.0', paths: { '/a': { get: { responses: { '200': { content: { 'application/json': { schema: { type: 'object', properties } } } } } } } } };
    const entry = summarizeDescription('openapi', JSON.stringify(document)).entries[0]!;
    expect(entry.fields).toHaveLength(CATALOG_LIMITS.fields);
    expect(entry.fieldsCut).toBe(3);
  });

  it('refuses a document larger than it reads', () => {
    expect(() => summarizeDescription('odata', `<Edmx>${' '.repeat(CATALOG_LIMITS.documentBytes)}</Edmx>`)).toThrow(/larger than the catalog reads/);
  });
});

describe('the XML a description document may be', () => {
  it('is refused when it declares a document type — there is no entity to expand', () => {
    const bomb = '<?xml version="1.0"?><!DOCTYPE Edmx [<!ENTITY a "aaaaaaaaaa"><!ENTITY b "&a;&a;&a;&a;&a;">]><Edmx>&b;</Edmx>';
    expect(() => readXmlElements(bomb)).toThrow(/declares a document type/);
    expect(() => summarizeDescription('odata', bomb)).toThrow(CatalogError);
  });

  it('reads the predefined and numeric references in an attribute value, and keeps any other as written', () => {
    const root = readXmlElements('<a x="1 &lt; 2 &amp; &#65;&#x42;" y=\'&quot;q&quot;\' z="&nope;"/>');
    expect(root.attrs).toEqual({ x: '1 < 2 & AB', y: '"q"', z: '&nope;' });
  });

  it('keeps the short text written in an element, joined and trimmed', () => {
    expect(readXmlElements('<a>  one <b/> two  </a>').text).toBe('one two');
  });

  it('refuses a document that is not well formed', () => {
    for (const bad of ['<a><b></a>', '<a>', '<a x=1/>', '<a x="1', '<a><!-- open', '<a></a><b/>', 'no element', '<a/ >']) {
      expect(() => readXmlElements(bad), bad).toThrow(CatalogError);
    }
  });

  it('refuses a document that nests deeper, or has more elements, than it reads', () => {
    expect(() => readXmlElements('<a>'.repeat(CATALOG_LIMITS.xmlDepth + 2) + '</a>'.repeat(CATALOG_LIMITS.xmlDepth + 2))).toThrow(/nests deeper/);
    const wide = `<a>${'<b/>'.repeat(CATALOG_LIMITS.xmlElements)}</a>`;
    expect(() => readXmlElements(wide)).toThrow(/more elements/);
  });

  it('tells an OData document from the XML or the JSON it is, and refuses what is neither', () => {
    expect(() => summarizeDescription('odata', 'plain words')).toThrow(/neither XML nor JSON/);
    expect(() => summarizeDescription('odata', '<html><body/></html>')).toThrow(/not an OData \$metadata/);
    expect(() => summarizeDescription('odata', '<Edmx><DataServices><Schema Namespace="n"/></DataServices></Edmx>')).toThrow(/names no entity set/);
  });
});
