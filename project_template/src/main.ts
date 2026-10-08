// The entry point: build.ts bundles this file (and everything it imports) into dist/app.js,
// which dist/index.html loads with a plain <script> tag.
//
// main.ts is the only file that talks to the page (the DOM). The logic lives in other files,
// so it can be tested without a browser.

import { greeting } from "./greeting.ts";

const output = document.querySelector<HTMLParagraphElement>("#output");
if (output) {
  output.textContent = greeting("TypeScript");
}
