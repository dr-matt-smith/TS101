# TypeScript workflow with Deno

These steps are for computers where **Deno** is installed.
If you have Node instead (e.g. the college lab PCs), see [README_node_TS_workflow.md](README_node_TS_workflow.md).

All commands are typed in the console (terminal), in the project folder - the folder containing `deno.json`.

In this project, the TypeScript in `src/main.ts` is turned into `public/game.js`, which `public/index.html` loads.


## What you need

Deno **version 2 or later**. Check your version with:

```bash
deno --version
```


## Step 1: Install the build tools (not needed!)

There is **no install step** with Deno - it has a bundler and a TypeScript type checker built in.

The first time you run `deno task serve`, Deno automatically downloads the web server it uses (`esbuild`)
into a `node_modules/` folder. That first run needs an internet connection; after that everything works offline.


## Step 2: Build the project

```bash
deno task build
```

This transpiles `src/main.ts` (and every file it imports) into `public/game.js`.

TERMINAL DUMP:
```bash
$ deno task build
Task build deno bundle --platform browser src/main.ts -o public/game.js
⚠️  deno bundle is experimental and subject to changes
Bundled 1 module in 5ms
  public/game.js 392B
```

Building does **not** check your types - use `deno task check` for that (see below).


## Step 3: Serve the contents of `public/`

```bash
deno task serve
```

TERMINAL DUMP:
```bash
$ deno task serve
Task serve deno run --allow-read --allow-write --allow-env --allow-run --allow-net npm:esbuild --servedir=public --serve=127.0.0.1:8000

 > Local: http://127.0.0.1:8000/
```

Open **http://127.0.0.1:8000/** in your web browser to see the game.

- The server keeps running until you press **Ctrl+C**
- Each page request is logged in the console, e.g. `"GET /game.js" 200`
- After rebuilding, **refresh the browser page** to see your changes


## Check for type errors

```bash
deno task check
```

TERMINAL DUMP:
```bash
$ deno task check
Task check deno check src/main.ts
Check src/main.ts
```

No errors listed means your types are all OK.


## Summary of commands

| Command | What it does |
|---|---|
| *(no install step)* | Deno has the build tools built in |
| `deno task build` | Transpile `src/main.ts` into `public/game.js` |
| `deno task check` | Type check `src/main.ts` |
| `deno task serve` | Serve `public/` at http://127.0.0.1:8000/ (Ctrl+C to stop) |

Each `deno task ...` command runs the matching entry in the `"tasks"` section of `deno.json`.


## Troubleshooting

| Problem | Fix |
|---|---|
| `Task not found: build` | You're not in the project folder - `cd` into the folder containing `deno.json` |
| `Could not find npm package 'esbuild'` | The first `serve` needs an internet connection to download esbuild - connect and try again |
| `address already in use` when serving | A server is already running (maybe in another console) - stop it with Ctrl+C, or just use the one that is running |
| Browser shows an old version of the game | Did you rebuild? Then refresh the page (Ctrl+Shift+R forces a full reload) |
