/// <reference types="node" />
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(__dirname, 'tokens.css'), 'utf-8');

function parseCustomProperties(block: string): Record<string, string> {
  const props: Record<string, string> = {};
  const re = /--([\w-]+):\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(block))) {
    props[`--${match[1]}`] = match[2].trim();
  }
  return props;
}

function relativeLuminance(hex: string): number {
  const value = hex.replace('#', '');
  const bytes =
    value.length === 3
      ? value.split('').map((c) => parseInt(c + c, 16))
      : [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  const [r, g, b] = bytes.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexA);
  const lB = relativeLuminance(hexB);
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}

// tokens.css keeps its base declarations in the first `:root { ... }` block and its
// dark-mode overrides inside `@media (prefers-color-scheme: dark) { :root { ... } }`.
// Splitting on the media query separates the two so each theme's *effective* value can
// be checked — a token not redefined in the dark block still falls back to its light value.
const [lightBlock, ...darkBlocks] = css.split('@media (prefers-color-scheme: dark)');
const lightTokens = parseCustomProperties(lightBlock);
const darkOverrides = parseCustomProperties(darkBlocks.join(''));

// These back solid fills (Button--solid, Toast) that always pair with white text
// (--ub-text-inverse), unlike --ub-brand/-success/-error which are text-role tokens
// re-tuned per theme. The regression this guards against: a theme edit to
// one of these silently drops the white-text-on-solid-fill contrast below WCAG AA.
const SOLID_TOKENS = ['--ub-brand-solid', '--ub-success-solid', '--ub-error-solid'];
const WCAG_AA_NORMAL_TEXT = 4.5;

describe('design-system tokens.css — solid-fill contrast', () => {
  const inverseText = lightTokens['--ub-text-inverse'];

  it('found --ub-text-inverse in tokens.css', () => {
    expect(inverseText).toBeDefined();
  });

  it.each(SOLID_TOKENS)('%s clears WCAG AA 4.5:1 against --ub-text-inverse in light mode', (token) => {
    expect(lightTokens[token]).toBeDefined();
    const ratio = contrastRatio(lightTokens[token], inverseText);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  it.each(SOLID_TOKENS)('%s clears WCAG AA 4.5:1 against --ub-text-inverse in dark mode', (token) => {
    const darkValue = darkOverrides[token] ?? lightTokens[token];
    const ratio = contrastRatio(darkValue, inverseText);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });
});

// The pairs actually combined by component CSS (Alert.css/Badge.css) as text-on-tint — the
// role a theme edit can break (re-tuning one side of the pair but not the other).
// Only pairs where BOTH tokens are plain hex are covered here: an alpha-blended token such as
// `--ub-brand-subtle` (rgba) is composited over the backdrops it is drawn on in the next block.
const TEXT_ROLE_PAIRS: Array<[text: string, background: string]> = [
  ['--ub-error', '--ub-error-bg'],
  ['--ub-success', '--ub-success-bg'],
  ['--ub-warning', '--ub-warning-bg'],
  ['--ub-text-muted', '--ub-bg-subtle'],
];

function effectiveColor(tokens: Record<string, string>, overrides: Record<string, string>, token: string): string {
  return overrides[token] ?? tokens[token];
}

describe('design-system tokens.css — text-role tint contrast', () => {
  it.each(TEXT_ROLE_PAIRS)('%s on %s clears WCAG AA 4.5:1 in light mode', (text, background) => {
    expect(lightTokens[text]).toBeDefined();
    expect(lightTokens[background]).toBeDefined();
    const ratio = contrastRatio(lightTokens[text], lightTokens[background]);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  it.each(TEXT_ROLE_PAIRS)('%s on %s clears WCAG AA 4.5:1 in dark mode', (text, background) => {
    const textValue = effectiveColor(lightTokens, darkOverrides, text);
    const bgValue = effectiveColor(lightTokens, darkOverrides, background);
    const ratio = contrastRatio(textValue, bgValue);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });
});

// `--ub-brand-subtle` is a translucent tint: the active nav link draws it over the sidebar's gradient and the
// workspace switcher over the surface. The backdrop is not one colour, but the ones it can be are all in this file —
// the two ends of the sidebar gradient (a gradient's contrast is between its ends) and the surface — so the tint is
// composited over each and the brand text must clear AA on every result.
function compositeOver(rgba: string, backdropHex: string): string {
  const m = /^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)$/.exec(rgba);
  if (!m) throw new Error(`not an rgba() token: ${rgba}`);
  const alpha = Number(m[4]);
  const back = backdropHex.replace('#', '');
  const channels = [0, 2, 4].map((i) => parseInt(back.slice(i, i + 2), 16));
  const mixed = [Number(m[1]), Number(m[2]), Number(m[3])].map((c, i) => Math.round(c * alpha + channels[i] * (1 - alpha)));
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

function gradientEnds(value: string): string[] {
  const ends = value.match(/#[0-9a-fA-F]{6}/g);
  if (!ends || ends.length < 2) throw new Error(`not a two-colour gradient: ${value}`);
  return [ends[0], ends[ends.length - 1]];
}

describe('design-system tokens.css — brand tint over the backdrops it is drawn on', () => {
  const themes: Array<[name: string, overrides: Record<string, string>]> = [['light', {}], ['dark', darkOverrides]];
  for (const [name, overrides] of themes) {
    it(`--ub-brand on --ub-brand-subtle clears WCAG AA 4.5:1 over the sidebar's ends and the surface in ${name} mode`, () => {
      const tint = effectiveColor(lightTokens, overrides, '--ub-brand-subtle');
      const brand = effectiveColor(lightTokens, overrides, '--ub-brand');
      const backdrops = [
        ...gradientEnds(effectiveColor(lightTokens, overrides, '--ub-bg-sidebar')),
        effectiveColor(lightTokens, overrides, '--ub-bg-surface'),
      ];
      expect(backdrops).toHaveLength(3);
      for (const backdrop of backdrops) {
        expect(contrastRatio(brand, compositeOver(tint, backdrop)), `over ${backdrop}`).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
      }
    });
  }
});
