# TypeScript workflow with Deno

All commands are typed in the console (terminal), in the project folder - the folder containing `deno.json`.
In Celbridge, `terminal.console` runs `deno task dev` for you when it opens, and has a button for each task.


## What you need

Deno **version 2 or later**. Check your version with:

```bash
deno --version
```

There is **no install step** - Deno can run and type check TypeScript all by itself.


## Run the script

```bash
deno run src/main.ts
```

TERMINAL DUMP:
```bash
$ deno run src/main.ts
Hello MATT
```

Running does **not** check your types - Deno just runs the code. Check the types first (see below)!


## Check for type errors

```bash
deno check src/main.ts
```

TERMINAL DUMP (no errors):
```bash
$ deno check src/main.ts
Check src/main.ts
```

TERMINAL DUMP (with a type error):
```bash
$ deno check src/main.ts
Check src/main.ts
TS2345 [ERROR]: Argument of type 'number' is not assignable to parameter of type 'string'.
output = sayHello(name2);
                  ~~~~~
    at file:///Users/matt/ts101-part01/src/main.ts:8:19

error: Type checking failed.
```


## Summary of commands

| Command | What it does |
|---|---|
| *(no install step)* | Deno runs and type checks TypeScript by itself |
| `deno run src/main.ts` | Run `src/main.ts` (and the files it imports) |
| `deno check src/main.ts` | Type check `src/main.ts` (and the files it imports) |
| `deno task dev` | Type check, run `src/main.ts` and test - then again on every save (Ctrl+C to stop) |
| `deno task build` | Type check, run `src/main.ts` and test, once |
| `deno task test` | Run the tests in `tests/`, report in `test_output/index.html` |
| `deno task lint` | Look for likely mistakes and bad habits |


## Troubleshooting

| Problem | Fix |
|---|---|
| `Module not found "file:///.../src/main.ts"` | You're not in the project folder - `cd` into the folder containing `deno.json` |
| `deno: command not found` | Deno isn't installed (or the console was opened before installing it - open a new one) |
