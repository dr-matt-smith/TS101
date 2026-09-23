# TypeScript workflow with Node

These steps are for computers where **Node** is installed (e.g. the college lab PCs).
If you have Deno instead, see [README_deno_TS_workflow.md](README_deno_TS_workflow.md).

All commands are typed in the console (terminal), in the project folder - the folder containing `package.json`.


## What you need

Node **version 26 or later**, which can run TypeScript files like `main.ts` directly. Check your version with:

```bash
node --version
```

Node comes with `npm` (the Node Package Manager), which we use to install tools and run the project's commands.


## Step 1: Install the type checker (first time only)

```bash
npm install
```

This reads `package.json` and downloads the TypeScript compiler (`tsc`) into a `node_modules/` folder.

You only need to do this **once per project** (and again if you delete `node_modules/`). It needs an internet connection.


## Run the script

```bash
node main.ts
```

(or the shortcut `npm start`)

TERMINAL DUMP:
```bash
$ node main.ts
Hello MATT
```

Running does **not** check your types - Node just removes them and runs the code. Check the types first (see below)!


## Check for type errors

```bash
npm run check
```

TERMINAL DUMP (no errors):
```bash
$ npm run check

> ts101-part01@1.0.0 check
> tsc --noEmit

```

TERMINAL DUMP (with a type error):
```bash
$ npm run check

> ts101-part01@1.0.0 check
> tsc --noEmit

main.ts(8,19): error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

`main.ts(8,19)` means line 8, character 19 of `main.ts`.


## Summary of commands

| Command | What it does |
|---|---|
| `npm install` | Install the TypeScript type checker into `node_modules/` (first time only) |
| `node main.ts` or `npm start` | Run `main.ts` (and the files it imports) |
| `npm run check` | Type check all the `.ts` files in the project |

Each `npm start` / `npm run ...` command runs the matching entry in the `"scripts"` section of `package.json`.


## Troubleshooting

| Problem | Fix |
|---|---|
| `npm error Missing script: "check"` | You're not in the project folder - `cd` into the folder containing `package.json` |
| `tsc: not found` | Run `npm install` first |
| `SyntaxError` or `Unknown file extension ".ts"` when running | Your Node is too old to run TypeScript directly - check `node --version` is 26 or later |
