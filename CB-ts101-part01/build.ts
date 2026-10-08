// Checks and runs the project, then tests it:
//   1. type checks src/ and tests/
//   2. runs src/main.ts, so you see what it prints
//   3. runs every test in tests/ and writes a readable report to test_output/
//
// Run once:                         deno task build
// Recheck and rerun on every save:  deno task dev   (terminal.console starts this for you)
//
// You never need to edit this file.

import { runTests, typeCheck } from "./tools/test_report.ts";

const ROOT_DIR = new URL("./", import.meta.url);

console.log(`\n=== Build started at ${new Date().toLocaleTimeString()} ===`);

// 1. Type check (running only strips the types, it doesn't check them).
//    Errors are reported, but main.ts is still run so you can keep experimenting.
const checked = await typeCheck(ROOT_DIR);
if (!checked.ok) {
  console.log(checked.text);
  console.log("TypeScript found errors (see above) - src/main.ts was still run, but may not work");
}

// 2. Run src/main.ts, just like typing "deno run src/main.ts" in the console.
console.log("\n--- deno run src/main.ts ---");
const ran = await new Deno.Command(Deno.execPath(), {
  args: ["run", "src/main.ts"],
  cwd: ROOT_DIR,
  stdout: "inherit",
  stderr: "inherit",
}).output();
console.log(ran.success ? "--- src/main.ts finished ---" : "--- src/main.ts stopped with an error (see above) ---");

// 3. Test, and write test_output/index.html + test_output/summary.md.
await runTests(ROOT_DIR, checked);

// "deno task dev" passes --watching (Deno restarts this script whenever a watched file changes).
if (Deno.args.includes("--watching")) {
  console.log("\nWatching src/ and tests/ - save a file to recheck, rerun and retest (Ctrl+C to stop)");
}
