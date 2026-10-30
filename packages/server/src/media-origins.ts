/**
 * Reads `UBOARD_MEDIA_ORIGINS`: the origins the widgets of a board and its background picture may load media from — an
 * `image`, a `gallery`, a `video`, the picture of a status card, a list's avatar. A board that an assistant wrote is not
 * input the operator can vouch for, and the address of a picture is where it can send what it read, so the media of a
 * board is closed unless the operator opens it: unset or empty means `self`, the page's own origin. Otherwise the
 * origins are separated by commas or spaces, each an http or https origin — a host and an optional port — with nothing
 * after, or `self`; `none` alone allows nothing. Anything else fails startup.
 *
 * Like `UBOARD_ELEMENT_ORIGINS`, closed by default — there is no value that means "everything": to open the media of a
 * board to more places, list them.
 */
export const DEFAULT_MEDIA_ORIGINS: readonly string[] = ['self'];

export function mediaOriginsFromEnv(value: string | undefined): string[] {
  const origins = (value ?? '').split(/[\s,]+/).filter(Boolean);
  if (origins.length === 0) return [...DEFAULT_MEDIA_ORIGINS];
  if (origins.length === 1 && origins[0] === 'none') return [];
  for (const origin of origins) {
    if (origin === 'self') continue;
    let canonical: string | undefined;
    try {
      const url = new URL(origin);
      if (url.protocol === 'https:' || url.protocol === 'http:') canonical = url.origin;
    } catch {
      // reported below
    }
    if (canonical !== origin) {
      throw new Error(`UBOARD_MEDIA_ORIGINS must list http or https origins with nothing after the host and port, "self", or "none" alone (got "${origin}")`);
    }
  }
  return origins;
}

/** What a board answer tells its viewer: what the operator set, else the default. */
export function mediaOriginsOf(config: { mediaOrigins?: string[] }): string[] {
  return config.mediaOrigins ?? [...DEFAULT_MEDIA_ORIGINS];
}
