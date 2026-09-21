// Builds src/ (TypeScript) and public/ (static assets) -> dist/
//   - src/main.ts + everything it imports -> dist/game.js   (bundled into ONE plain script)
//   - public/**/*                         -> dist/**/*      (HTML, CSS, images, ... copied as-is)
//
// Run once:               deno task build
// Watch & rebuild on save: deno task dev
import { bundle } from "@deno/emit";

const ROOT_DIR = new URL("./", import.meta.url);
const SRC_DIR = new URL("./src/", ROOT_DIR);
const PUBLIC_DIR = new URL("./public/", ROOT_DIR);
const DIST_DIR = new URL("./dist/", ROOT_DIR);

// start with an empty dist/ folder, so no old files are left behind
await Deno.remove(DIST_DIR, { recursive: true }).catch(() => {});
await Deno.mkdir(DIST_DIR, { recursive: true });

// Recursively visits every file under `dir`, calling `onFile` with a path relative to `dir`.
async function walk(
  dir: URL,
  onFile: (relativePath: string) => Promise<void>,
  prefix = "",
) {
  for await (const entry of Deno.readDir(dir)) {
    const relativePath = prefix + entry.name;
    if (entry.isDirectory) {
      await walk(new URL(entry.name + "/", dir), onFile, relativePath + "/");
    } else {
      await onFile(relativePath);
    }
  }
}

// 1. Type check the TypeScript (bundling only strips the types, it doesn't check them).
//    Errors are reported, but the game is still built so you can keep experimenting.
const check = await new Deno.Command(Deno.execPath(), {
  args: ["check", "src/main.ts"],
  cwd: ROOT_DIR,
  stdout: "inherit",
  stderr: "inherit",
}).output();
if (!check.success) {
  console.log("TypeScript found errors (see above) - the game was still built, but may not work");
}

// 2. Bundle src/main.ts and every file it imports into dist/game.js.
const result = await bundle(new URL("main.ts", SRC_DIR), { type: "classic" });
await Deno.writeTextFile(new URL("game.js", DIST_DIR), result.code);
console.log("Built dist/game.js from src/main.ts (and the files it imports)");

// 3. Copy every file under public/ (HTML, CSS, images, ...) as-is.
await walk(PUBLIC_DIR, async (relativePath) => {
  const fileSrc = new URL(relativePath, PUBLIC_DIR);
  const fileOut = new URL(relativePath, DIST_DIR);

  await Deno.mkdir(new URL(".", fileOut), { recursive: true });
  await Deno.copyFile(fileSrc, fileOut);
  console.log(`Copied dist/${relativePath} from public/${relativePath}`);
});
