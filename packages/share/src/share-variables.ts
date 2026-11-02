/** The values a board's variables are asked to take, as the page address carries them: `?board=…&token=…&v.line=L2` —
 *  a query key that starts with `v.` names a variable, its value is the word asked for. The server keeps what the board
 *  declares and what is one of its options (the rest takes the default), so this only reads the address: a name of word
 *  characters, a word of bounded length, the first value when a name repeats, and no more names than a request may carry. */
const NAME = /^[\w-]{1,64}$/;
const MAX_NAMES = 32;
const MAX_VALUE = 200;

export function variablesInAddress(search: string): Record<string, string> {
  const asked: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(search)) {
    if (!key.startsWith('v.')) continue;
    const name = key.slice(2);
    if (!NAME.test(name) || name in asked || value.length > MAX_VALUE || Object.keys(asked).length >= MAX_NAMES) continue;
    asked[name] = value;
  }
  return asked;
}

/** The same values as the query a board read carries — empty when none were asked, so a board that asks for nothing is read at the address it always was. */
export function variablesQuery(asked: Readonly<Record<string, string>>): string {
  const query = new URLSearchParams(Object.entries(asked).map(([name, value]) => [`v.${name}`, value])).toString();
  return query === '' ? '' : `?${query}`;
}
