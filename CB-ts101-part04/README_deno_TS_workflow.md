# TypeScript workflow with Deno

These steps are for computers where **Deno** is installed.
If you have Node instead (e.g. the college lab PCs), see [README_node_TS_workflow.md](README_node_TS_workflow.md).

All commands are typed in the console (terminal), in the project folder - the folder containing `deno.json`.


## What you need

Deno **version 2 or later**. Check your version with:

```bash
deno --version
```


## Step 1: Install the build tools (not needed!)

Unlike Node, there is **no install step** with Deno. The first time you run a command, Deno automatically
downloads the build tool `esbuild` (listed under `imports` in `deno.json`) into a `node_modules/` folder:
- `esbuild` - bundles your TypeScript into a single JavaScript file, and serves web pages

Deno has its own TypeScript type checker built in, so it doesn't need the `typescript` package.

The first run needs an internet connection; after that everything works offline.


## Step 2: Build the project

```bash
deno task build
```

This runs `build.ts`, which:
1. type checks `src/main.ts` (and every file it imports) and reports any errors
2. bundles `src/main.ts` (and every file it imports) into `dist/game.js`
3. copies everything in `public/` (HTML, CSS, images, ...) into `dist/`

TERMINAL DUMP:
```bash
$ deno task build
Task build deno run --allow-read --allow-write --allow-env --allow-run build.ts
Check src/main.ts
Built dist/game.js from src/main.ts (and the files it imports)
Copied dist/css/styles.css from public/css/styles.css
Copied dist/index.html from public/index.html
```

(The very first time, you'll also see some `Initialize esbuild...` lines, as Deno downloads esbuild.)

If there are type errors, they are listed first, followed by
`TypeScript found errors (see above) - the game was still built, but may not work`.
Fix the errors, then build again.

The `--allow-...` flags are Deno's permissions: by default a Deno script can't touch your files or run
other programs, so the task grants `build.ts` exactly what it needs.


## Step 3: Serve the contents of `dist/`

```bash
deno task serve
```

TERMINAL DUMP:
```bash
$ deno task serve
Task serve deno run --allow-read --allow-write --allow-env --allow-run --allow-net npm:esbuild --servedir=dist --serve=127.0.0.1:8000

 > Local: http://127.0.0.1:8000/
```

Open **http://127.0.0.1:8000/** in your web browser to see the game.

- The server keeps running until you press **Ctrl+C**
- Each page request is logged in the console, e.g. `"GET /game.js" 200`
- After rebuilding, **refresh the browser page** to see your changes


## Optional: Rebuild automatically every time you save

```bash
deno task dev
```

This builds once, then rebuilds whenever you save a file in `src/` or `public/`. Press **Ctrl+C** to stop.

A handy way to work is with **two consoles** open at once:
- console 1: `deno task dev` (keeps `dist/` up to date)
- console 2: `deno task serve` (serves `dist/` to the browser)

Then you just edit, save, and refresh the browser.


## Optional: Only check for type errors

```bash
deno task check
```

Type checks `src/main.ts` (and every file it imports) without building anything.


## Summary of commands

| Command | What it does |
|---|---|
| *(no install step)* | Deno downloads the build tools automatically the first time |
| `deno task build` | Type check, then build `src/` and `public/` into `dist/` |
| `deno task dev` | Build, then rebuild every time you save (Ctrl+C to stop) |
| `deno task check` | Only type check, without building |
| `deno task serve` | Serve `dist/` at http://127.0.0.1:8000/ (Ctrl+C to stop) |

Each `deno task ...` command runs the matching entry in the `"tasks"` section of `deno.json`.


## Troubleshooting

| Problem | Fix |
|---|---|
| `Task not found: build` | You're not in the project folder - `cd` into the folder containing `deno.json` |
| `Could not find npm package 'esbuild'` | The first run needs an internet connection to download esbuild - connect and try again |
| `address already in use` when serving | A server is already running (maybe in another console) - stop it with Ctrl+C, or just use the one that is running |
| Browser shows an old version of the game | Did you rebuild? Then refresh the page (Ctrl+Shift+R forces a full reload) |
