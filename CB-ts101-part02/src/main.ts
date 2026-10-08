// The whole program. Find the element on the page whose id is "output", and change its text.
//
// build.ts turns this file into dist/app.js, which dist/index.html runs.

const output = document.querySelector("#output");
if (output !== null) {
  output.textContent = "Hello, World!";
}
