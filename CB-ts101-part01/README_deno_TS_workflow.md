# TypeScript workflow with Deno

These steps are for computers where **Deno** is installed.
If you have Node instead (e.g. the college lab PCs), see [README_node_TS_workflow.md](README_node_TS_workflow.md).

All commands are typed in the console (terminal), in the project folder - the folder containing `main.ts`.


## What you need

Deno **version 2 or later**. Check your version with:

```bash
deno --version
```

There is **no install step** - Deno can run and type check TypeScript all by itself.


## Run the script

```bash
deno run main.ts
```

TERMINAL DUMP:
```bash
$ deno run main.ts
Hello MATT
```

Running does **not** check your types - Deno just runs the code. Check the types first (see below)!


## Check for type errors

```bash
deno check main.ts
```

TERMINAL DUMP (no errors):
```bash
$ deno check main.ts
Check main.ts
```

TERMINAL DUMP (with a type error):
```bash
$ deno check main.ts
Check main.ts
TS2345 [ERROR]: Argument of type 'number' is not assignable to parameter of type 'string'.
output = sayHello(name2);
                  ~~~~~
    at file:///Users/matt/ts101-part01/main.ts:8:19

error: Type checking failed.
```


## Summary of commands

| Command | What it does |
|---|---|
| *(no install step)* | Deno runs and type checks TypeScript by itself |
| `deno run main.ts` | Run `main.ts` (and the files it imports) |
| `deno check main.ts` | Type check `main.ts` (and the files it imports) |


## Troubleshooting

| Problem | Fix |
|---|---|
| `Module not found "file:///.../main.ts"` | You're not in the project folder - `cd` into the folder containing `main.ts` |
| `deno: command not found` | Deno isn't installed (or the console was opened before installing it - open a new one) |
