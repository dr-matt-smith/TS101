# TypeScript 101 - part 05 - adding CSS and a second TS file

Let's now test our build process with:
- a CSS file
  - we'll use a handy stylesheet with several useful game styles (e.g. for keyboard characters)
- a second TS file
  - which should get transpiled with `main.ts` into the `/dist/app.js`
  - and tested, in `/tests`


> This README uses **Deno**.
>
> See [README_deno_TS_workflow.md](README_deno_TS_workflow.md) for all the Deno build commands.
>
> As in parts 2 to 4, the console runs `deno task dev` when it opens - so every time you save a file below, `/dist` is rebuilt and the tests are re-run.

## Exercise 5-1: Create CSS file `styles.css` in `/public/css`

Do the following:

1. Create folder `/public/css`

1. Create file `/public/css/styles.css` containing the following:

```css
:root {
  --primary: #66c2ff;
  --primary-dark: #0077cc;
  --secondary: #cbd1e1;
  --tertiary: #e5e9f2;
  --bg: #f1f3f9;
  --dark: #1e253b;
}

html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--bg);
  color: var(--dark);
  line-height: 1.6;
  font-family: system-ui, sans-serif;
}

main {
  max-width: calc(800px + 2rem + 4px);
  margin: 0 auto;
}

h1 {
  margin: 1.5rem auto;
  color: var(--dark);
  text-align: center;
}

h2,
h3 {
  margin: 1rem 0;
  color: var(--dark);
  text-align: center;
}

.container {
  margin: 0 auto 1.5rem;
  padding: 1rem;
  border: 2px solid var(--secondary);
  border-radius: 1px;
  background: white;
  box-shadow: 2px 4px 0px 0px var(--tertiary);
  text-align: center;
}

/* Game canvas - 800 x 600, shrinks to fit narrow windows (the game still uses 800 x 600 pixels) */

#gameCanvas {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  background: var(--dark);
}

.control-grid {
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: start;
  gap: 0.5rem 1rem;
  grid-template-columns: max-content max-content;
  margin: 1rem auto;
}

kbd {
  justify-self: end;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: max-content;
}

@media (max-width: 600px) {
  body {
    padding: 0;
  }
}

```


![Celbridge styles.css ](README_images/1_css_stylesheet.webp)

## Exercise 5-2: Update `/public/index.html` to read the stylesheet

Do the following:

1. Open `/public/index.html` in Code Editor mode, and add to the `<head>` element to read in the stylesheet:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/styles.css" />
    <title>Apple Move</title>
  </head>
  <body>
    <main>
      <h1>🍎 Apple Move</h1>
      <section class="container canvas-container">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
      </section>
    </main>
    <script src="app.js"></script>
  </body>
</html>
```

![Celbridge update index.html ](README_images/2_index_html_update.webp)

## Exercise 5-3: Create new file `/src/constants.ts` 

Do the following:

1. Create new file `/src/constants.ts`  containing:

```ts
export const RED = "#ff0000";
export const LIGHT_BLUE = "#add8e6";
```


![Celbridge new file constants.ts ](README_images/3_constants_ts.webp)


## Exercise 5-4: Update main TS file `/src/main.ts`

Do the following:

1. Update the main TS file to import the 2 colour constants `/src/main.ts` as follows:

```ts
import {RED, LIGHT_BLUE} from './constants.ts';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const BACKGROUND_COLOUR = RED;

...
```


![Celbridge update main.ts ](README_images/4_main_ts_update.webp)

## Exercise 5-5: Test the constants

Our new `src/constants.ts` has no DOM code in it - so we can test it!

1. Create new file `/tests/constants.test.ts` containing:

```ts
// Tests for src/constants.ts - run on every save by "deno task dev", results in test_output/.

import { assertEquals } from "@std/assert";
import { LIGHT_BLUE, RED } from "../src/constants.ts";

Deno.test("RED is the CSS colour code for red", () => {
  assertEquals(RED, "#ff0000");
});

Deno.test("LIGHT_BLUE is the CSS colour code for light blue", () => {
  assertEquals(LIGHT_BLUE, "#add8e6");
});
```

NOTE:
- `Deno.test(name, function)` declares a test - a bit like a JUnit `@Test` method in Java
- `assertEquals(actual, expected)` fails the test if the two values are different
- you can delete `tests/README.md` now - the folder has real tests in it instead

## Exercise 5-6: Build the distribution

Each time you save, the console rebuilds and re-tests the project. To build once by hand (press Ctrl+C first, to stop `deno task dev`), type:

```bash
deno task build
```

TERMINAL DUMP:
```bash
$ deno task build
Task build deno run --allow-read --allow-write --allow-run --allow-env build.ts

=== Build started at 10:37:16 AM ===
Built dist/app.js from src/main.ts (and the files it imports)
Copied 2 file(s) from public/ to dist/
dist/ is up to date (0.2s) - press refresh on the dist/index.html preview

TAP version 14
# tests/constants.test.ts
ok 1 - RED is the CSS colour code for red
ok 2 - LIGHT_BLUE is the CSS colour code for light blue
1..2

Tests: 0 failed, 2 passed, 0 skipped, 0 type errors, 1 lint warnings  ->  test_output/index.html
```

We see the following:
- `dist/app.js` created from `src/main.ts` (and `src/constants.ts`, which it imports)
- 2 files copied from `public/` into `dist/`: `index.html` and `css/styles.css`
- both tests passed (the 1 lint warning is because `main.ts` imports `LIGHT_BLUE` but never uses it)

![Celbridge run the build at the CLI](README_images/5_run_build_ts.webp)

## Exercise 5-7: check it's working by opening `dist/index.html` in HTML viewer mode

Opening `dist/index.html` in HTML viewer mode (it opens beside the console - press its **refresh** button)

![Celbridge  preview the web page](README_images/6_preview_webpage.webp)

## Exercise 5-8: look inside the transpiled `dist/app.js`

Look inside the combined and transpiled `dist/app.js` 
- you should see elements of main.ts and constants.ts in this file
- with types removed so it's simple JavaScript running in the web page

![Celbridge  preview the web page](README_images/7_transpiled_game_js.webp)








