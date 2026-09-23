// Builds src/ (TypeScript) and public/ (static assets) -> dist/
//   - src/main.ts + everything it imports -> dist/game.js   (bundled into ONE plain script)
//   - public/**/*                         -> dist/**/*      (HTML, CSS, images, ... copied as-is)
//
// Works with both Node and Deno:
//   Run once:                npm run build   OR   deno task build
//   Watch & rebuild on save: npm run dev     OR   deno task dev
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import process from "node:process";
import * as esbuild from "esbuild";

const isDeno = "Deno" in globalThis;

// start with an empty dist/ folder, so no old files are left behind
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

// 1. Type check the TypeScript (bundling only strips the types, it doesn't check them).
//    Errors are reported, but the game is still built so you can keep experimenting.
//    Deno has a type checker built in; Node uses the TypeScript compiler from node_modules.
const checkArgs = isDeno
  ? ["check", "src/main.ts"]
  : [createRequire(import.meta.url).resolve("typescript/bin/tsc"), "--noEmit"];
const check = spawnSync(process.execPath, checkArgs, { stdio: "inherit" });
if (check.status !== 0) {
  console.log("TypeScript found errors (see above) - the game was still built, but may not work");
}

// 2. Bundle src/main.ts and every file it imports into dist/game.js.
await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  format: "iife", // a plain <script>, not a module
  outfile: "dist/game.js",
  logLevel: "warning",
});
await esbuild.stop(); // Deno waits for esbuild's helper process, so shut it down
console.log("Built dist/game.js from src/main.ts (and the files it imports)");

// 3. Copy every file under public/ (HTML, CSS, images, ...) as-is.
function copyFolder(from: string, to: string) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const fileSrc = `${from}/${entry.name}`;
    const fileOut = `${to}/${entry.name}`;
    if (entry.isDirectory()) {
      copyFolder(fileSrc, fileOut);
    } else if (entry.name !== ".DS_Store" && !entry.name.endsWith(".cel")) {
      copyFileSync(fileSrc, fileOut);
      console.log(`Copied ${fileOut} from ${fileSrc}`);
    }
  }
}
copyFolder("public", "dist");
