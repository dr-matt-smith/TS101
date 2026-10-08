// A tiny piece of "logic" with no DOM in it - so it can be tested with Deno, away from the browser.

/** Returns a friendly greeting for `name`. */
export function greeting(name: string): string {
  return `Hello, ${name}!`;
}
