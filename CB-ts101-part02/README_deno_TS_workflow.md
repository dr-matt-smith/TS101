# TypeScript workflow with Deno

All commands are typed in the console (terminal), in the project folder - the folder containing `deno.json`.
In Celbridge, `terminal.console` runs `deno task dev` for you when it opens, and has a button for each task.

In this project:
- the TypeScript in `src/main.ts` (and every file it imports) is bundled into `dist/app.js`
- everything in `public/` (HTML, CSS, images, ...) is copied into `dist/`
- the tests in `tests/` are run, and the results written to `test_output/index.html`


## What you need

Deno **version 2 or later**. Check your version with:

```bash
deno --version
```

There is **no install step** - Deno has a bundler, a TypeScript type checker, a linter and a test runner built in.
The first build downloads the testing library (`@std/assert`), so it needs an internet connection; after that everything works offline.


## Build, test, and rebuild on every save

```bash
deno task dev
```

This runs `build.ts`, which:
1. type checks `src/` and `tests/`, and lists any type errors
2. bundles `src/main.ts` (and every file it imports) into `dist/app.js`
3. copies everything in `public/` into `dist/`
4. removes anything in `dist/` that no longer comes from `public/`
5. runs the tests in `tests/`, and writes the report to `test_output/index.html`

...then does it all again every time you save a file in `src/`, `public/` or `tests/`. Press **Ctrl+C** to stop.

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
```

If there are type errors, they are listed first, followed by
`TypeScript found errors (see above) - the page was still built, but may not work`.
Fix the errors, and save again.


## View the page

No web server is needed: `dist/` is a plain web page.

- in Celbridge, `dist/index.html` opens beside the console
  - after a rebuild, press its **refresh** button to see your changes
- or open `dist/index.html` in any web browser


## The other tasks

To use these while `deno task dev` is running, press **Ctrl+C** first to stop it.

| Command | What it does |
|---|---|
| `deno task dev` | Build and test, then again every time you save (Ctrl+C to stop) |
| `deno task build` | Build and test, once |
| `deno task test` | Only run the tests (and type check) |
| `deno task check` | Only type check `src/` and `tests/` |
| `deno task lint` | Look for likely mistakes and bad habits |

Each `deno task ...` command runs the matching entry in the `"tasks"` section of `deno.json`.


## Troubleshooting

| Problem | Fix |
|---|---|
| `Task not found: dev` | You're not in the project folder - `cd` into the folder containing `deno.json` |
| `deno: command not found` | Deno isn't installed (or the console was opened before installing it - open a new one) |
| `JSR package not found` / download errors | The first build needs an internet connection to download `@std/assert` - connect and try again |
| The page shows an old version of the game | Is `deno task dev` still running? Then press **refresh** on the page |
