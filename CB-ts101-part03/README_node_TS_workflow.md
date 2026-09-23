# TypeScript workflow with Node

These steps are for computers where **Node** is installed (e.g. the college lab PCs).
If you have Deno instead, see [README_deno_TS_workflow.md](README_deno_TS_workflow.md).

All commands are typed in the console (terminal), in the project folder - the folder containing `package.json`.


## What you need

Node **version 26 or later**, which can run TypeScript files like `build.ts` directly. Check your version with:

```bash
node --version
```

Node comes with `npm` (the Node Package Manager), which we use to install tools and run the project's commands.


## Step 1: Install the build tools (first time only)

```bash
npm install
```

This reads `package.json` and downloads the two build tools into a `node_modules/` folder:
- `typescript` - checks your code for type errors
- `esbuild` - bundles your TypeScript into a single JavaScript file, and serves web pages

You only need to do this **once per project** (and again if you delete `node_modules/`). It needs an internet connection.


## Step 2: Build the project

```bash
npm run build
```

This runs `build.ts`, which:
1. type checks everything in `src/` and reports any errors
2. bundles `src/main.ts` (and every file it imports) into `dist/game.js`
3. copies everything in `public/` (HTML, images, ...) into `dist/`

TERMINAL DUMP:
```bash
$ npm run build

> ts101-part03@1.0.0 build
> node build.ts

Built dist/game.js from src/main.ts (and the files it imports)
Copied dist/index.html from public/index.html
```

If there are type errors, they are listed first, followed by
`TypeScript found errors (see above) - the game was still built, but may not work`.
Fix the errors, then build again.


## Step 3: Serve the contents of `dist/`

```bash
npm run serve
```

TERMINAL DUMP:
```bash
$ npm run serve

> ts101-part03@1.0.0 serve
> esbuild --servedir=dist --serve=127.0.0.1:8000

 > Local: http://127.0.0.1:8000/
```

Open **http://127.0.0.1:8000/** in your web browser to see the game.

- The server keeps running until you press **Ctrl+C**
- Each page request is logged in the console, e.g. `"GET /game.js" 200`
- After rebuilding, **refresh the browser page** to see your changes


## Optional: Rebuild automatically every time you save

```bash
npm run dev
```

This builds once, then rebuilds whenever you save a file in `src/` or `public/`. Press **Ctrl+C** to stop.

A handy way to work is with **two consoles** open at once:
- console 1: `npm run dev` (keeps `dist/` up to date)
- console 2: `npm run serve` (serves `dist/` to the browser)

Then you just edit, save, and refresh the browser.


## Optional: Only check for type errors

```bash
npm run check
```

Type checks the code in `src/` without building anything.


## Summary of commands

| Command | What it does |
|---|---|
| `npm install` | Install the build tools into `node_modules/` (first time only) |
| `npm run build` | Type check, then build `src/` and `public/` into `dist/` |
| `npm run dev` | Build, then rebuild every time you save (Ctrl+C to stop) |
| `npm run check` | Only type check, without building |
| `npm run serve` | Serve `dist/` at http://127.0.0.1:8000/ (Ctrl+C to stop) |

Each `npm run ...` command runs the matching entry in the `"scripts"` section of `package.json`.


## Troubleshooting

| Problem | Fix |
|---|---|
| `npm error Missing script: "build"` | You're not in the project folder - `cd` into the folder containing `package.json` |
| `Cannot find package 'esbuild'` or `tsc: not found` | Run `npm install` first |
| `SyntaxError` or `Unknown file extension ".ts"` when building | Your Node is too old to run TypeScript directly - check `node --version` is 26 or later |
| `address already in use` when serving | A server is already running (maybe in another console) - stop it with Ctrl+C, or just use the one that is running |
| Browser shows an old version of the game | Did you rebuild? Then refresh the page (Ctrl+Shift+R forces a full reload) |
