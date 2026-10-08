# TypeScript 101 - part 02 - Hello, World in a web page

The smallest possible web project: one TypeScript file, `src/main.ts`, that puts a message on a web page.

From now on, every project has the same layout, and the same build tooling:
- TS source code in `/src`
- HTML/CSS/images in `/public`
- tests in `/tests`
- the final web page is built into `/dist` (short for "distribution")
  - `/src/main.ts` -> `/dist/app.js` (TypeScript transpiled into JavaScript)
  - `/public/index.html` -> `/dist/index.html` (copied as-is)


> This README uses **Deno**.
>
> See [README_deno_TS_workflow.md](README_deno_TS_workflow.md) for all the Deno build commands.

## Exercise 2-1: Open the project, and see the page

1. open this project in Celbridge (click `ts101_part02.celbridge`)

Three things open by themselves:
1. **the console**, at the bottom, which immediately runs `deno task dev` (see below)
2. **`dist/index.html`**, at the side, shown as a preview: this is your web page
3. **`README.md`**, this file

A fourth shortcut, with a clipboard icon, opens the **test report** (`test_output/index.html`).

You should see the web page say **Hello, World!**

![Hello, World web page](README_images/hello_world.png)

NOTE:
- the first build downloads one small package (Deno's library for tests), so it needs an internet connection - after that everything works offline
- if the page is blank, press the **refresh** button on the preview - the very first build may have finished after the preview opened

## What happens when you save

`deno task dev` does five things, then waits. Every time you save a file in `src/`, `public/` or `tests/`, it does them all again:

![What deno task dev does](README_images/dev_loop.svg)

1. **type checks** every `.ts` file and lists any errors (the page is still built, so you can keep experimenting - but read the errors, they are nearly always a real bug)
2. **bundles** `src/main.ts`, and every file it imports, into one JavaScript file, `dist/app.js`
3. **copies** everything in `public/` (the HTML page, its CSS, any images) into `dist/`
4. **tidies** `dist/`, removing anything that is no longer in `public/`
5. **runs the tests** in `tests/`, prints the results, and writes a report to `test_output/`

TERMINAL DUMP:
```bash
$ deno task dev
Task dev deno run --watch=src/,public/,tests/ --allow-read --allow-write --allow-run --allow-env build.ts --watching
Watcher Process started.

=== Build started at 10:41:19 AM ===
Built dist/app.js from src/main.ts (and the files it imports)
Copied 2 file(s) from public/ to dist/
dist/ is up to date (0.2s) - press refresh on the dist/index.html preview

Tests: 0 failed, 0 passed, 0 skipped, 0 type errors, 0 lint warnings  ->  test_output/index.html

Watching src/, public/ and tests/ - save a file to rebuild and retest (Ctrl+C to stop)
Watcher Process finished. Restarting on file change...
```

(There are no tests yet - `tests/` just has a `README.md` in it, for now.)

When `dist/` changes, the **refresh** button on the `dist/index.html` preview lights up. Press it to see your changes.

The console has buttons too: rebuild-and-watch, build once, test once, and lint. If `deno task dev` is running (it usually is), press **Ctrl+C** in the console before using them.

NOTE:
- there is no web server - the build makes one plain `<script>` file, which a browser is happy to load straight from your disk
- so `dist/index.html` works in Celbridge's preview, or in any web browser

## A project's files

| File or folder | What it is | Do you edit it? |
|---|---|---|
| `src/` | your TypeScript: `main.ts`, and other files as the project grows | yes - this is your program |
| `tests/` | your tests, in files ending `.test.ts` | yes |
| `public/` | `index.html`, `styles.css`, and any images | yes |
| `dist/` | the built page - **made by the build** | no - it is overwritten on every save |
| `test_output/` | the test report - made by the build | no |
| `deno.json` | the project's settings: its tasks (`dev`, `build`, `test`, ...) | rarely |
| `build.ts`, `tools/` | the build and the test report | no |
| `terminal.console`, `*.celbridge` | Celbridge's console and project settings | no |

The rule to remember: **change `src/`, `public/` and `tests/`; look at `dist/` and `test_output/`**.

## Exercise 2-2: Read the code

The TypeScript file, `src/main.ts`, is four lines long:

```ts
const output = document.querySelector("#output");
if (output !== null) {
  output.textContent = "Hello, World!";
}
```

And the web page it changes, `public/index.html`:

```html
<h1 id="output">(if you can read this, dist/app.js has not run - build the project)</h1>
...
<script src="app.js"></script>
```

A web page is a tree of **elements** - headings, paragraphs, lists, buttons. The browser keeps a
model of the page, with one object for every element, called the **DOM** (Document Object Model).
Your TypeScript can find an element and change it.

- `document` is the whole page
- `document.querySelector("#output")` finds the element whose `id` is `output`
  - it uses CSS selectors: `#output` means "the element with id output"
- `querySelector` gives back **`null`** if no element matches - if the id was mistyped, say
  - TypeScript knows this, and will not let you use `output` until you have checked that it is not `null` - that is what the `if` is for
  - (Java would let you forget, and throw a `NullPointerException` when the program runs. TypeScript stops you before it runs)
- `output.textContent = "Hello, World!";` replaces the text inside the element

The `<script src="app.js">` line, at the end of the page, runs the JavaScript the build made from
`main.ts`. It comes last so that the elements above it already exist when it runs. If you ever see
the "(if you can read this ...)" text, the script did not run - look at the console for an error.

NOTE: `const`
- `const output = ...` declares a variable that can never be given a new value, like a `final` variable in Java
- there is no type: TypeScript **infers** the type from the value
- it is still checked - you could not later put a number in `output`

## Exercise 2-3: Change the message

1. change the message in `src/main.ts`, and save
1. watch the console rebuild
1. press **refresh** on the `dist/index.html` preview, to see your new message

## Exercise 2-4: Hello, you

Change the program so that the name is in a constant of its own, and the page says
"Hello, *your name*!". Try it before reading on.

Here is one way:

```ts
const NAME = "Ada";

const output = document.querySelector("#output");
if (output !== null) {
  output.textContent = `Hello, ${NAME}!`;
}
```

NOTE:
- the message is in **backticks** (`` ` ``), not quotes
  - a string in backticks is a *template literal*: anything inside `${...}` is worked out and put into the string
  - it does the job of `"Hello, " + name + "!"` in Java, but is easier to read
- `NAME` is in capitals because it is a fixed value that the program never changes - the same convention as Java constants

## Exercise 2-5: Look at the JavaScript

In Java you can look inside a `.class` file to see what `javac` made. Here, just open `dist/app.js`:

```js
(() => {
  // src/main.ts
  var output = document.querySelector("#output");
  if (output !== null) {
    output.textContent = "Hello, World!";
  }
})();
```

Almost the same as `main.ts`:
- the bundler wrapped it in `(() => { ... })();` to keep its variables private
- and wrote `var` instead of `const` (an older keyword that every browser understands)

As the projects grow, it is worth looking again: you will see the types disappear, and several files joined into one.
