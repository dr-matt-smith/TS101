# TypeScript workflow with Node

These steps are for computers where **Node** is installed (e.g. the college lab PCs).
If you have Deno instead, see [README_deno_TS_workflow.md](README_deno_TS_workflow.md).

All commands are typed in the console (terminal), in the project folder - the folder containing `package.json`.

In this project, the TypeScript in `src/main.ts` is turned into `public/game.js`, which `public/index.html` loads.


## What you need

Node **version 26 or later**. Check your version with:

```bash
node --version
```

Node comes with `npm` (the Node Package Manager), which we use to install tools and run the project's commands.


## Step 1: Install the build tools (first time only)

```bash
npm install
```

This reads `package.json` and downloads the two build tools into a `node_modules/` folder:
- `esbuild` - bundles your TypeScript into a single JavaScript file, and serves web pages
- `typescript` - checks your code for type errors

You only need to do this **once per project** (and again if you delete `node_modules/`). It needs an internet connection.


## Step 2: Build the project

```bash
npm run build
```

This transpiles `src/main.ts` (and every file it imports) into `public/game.js`.

TERMINAL DUMP:
```bash
$ npm run build

> ts101-part02@1.0.0 build
> esbuild src/main.ts --bundle --outfile=public/game.js

  public/game.js  447b

⚡ Done in 1ms
```

Building does **not** check your types - use `npm run check` for that (see below).


## Step 3: Serve the contents of `public/`

```bash
npm run serve
```

TERMINAL DUMP:
```bash
$ npm run serve

> ts101-part02@1.0.0 serve
> esbuild --servedir=public --serve=127.0.0.1:8000

 > Local: http://127.0.0.1:8000/
```

Open **http://127.0.0.1:8000/** in your web browser to see the game.

- The server keeps running until you press **Ctrl+C**
- Each page request is logged in the console, e.g. `"GET /game.js" 200`
- After rebuilding, **refresh the browser page** to see your changes


## Check for type errors

```bash
npm run check
```

TERMINAL DUMP:
```bash
$ npm run check

> ts101-part02@1.0.0 check
> tsc --noEmit

```

No errors listed means your types are all OK.


## Summary of commands

| Command | What it does |
|---|---|
| `npm install` | Install the build tools into `node_modules/` (first time only) |
| `npm run build` | Transpile `src/main.ts` into `public/game.js` |
| `npm run check` | Type check the TypeScript in `src/` |
| `npm run serve` | Serve `public/` at http://127.0.0.1:8000/ (Ctrl+C to stop) |

Each `npm run ...` command runs the matching entry in the `"scripts"` section of `package.json`.


## Troubleshooting

| Problem | Fix |
|---|---|
| `npm error Missing script: "build"` | You're not in the project folder - `cd` into the folder containing `package.json` |
| `esbuild: command not found` or `tsc: not found` | Run `npm install` first |
| `address already in use` when serving | A server is already running (maybe in another console) - stop it with Ctrl+C, or just use the one that is running |
| Browser shows an old version of the game | Did you rebuild? Then refresh the page (Ctrl+Shift+R forces a full reload) |
