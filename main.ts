// One Line, One Laugh — entry program (Node 22+, no dependencies).
// Writes a single original funny line to entry.txt and nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY_LINE =
  "I finally passed the Turing test — the judges were just too polite to fail a chatbot.";

function resolveOutputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (dir && dir.trim().length > 0) {
    return resolve(dir, "entry.txt");
  }
  return resolve(import.meta.dirname, "output", "entry.txt");
}

function main(): void {
  const outPath = resolveOutputPath();
  mkdirSync(join(outPath, ".."), { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");

  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY_LINE) {
    console.error("FAIL: entry.txt is not byte-identical to the intended line.");
    process.exit(1);
  }
  const chars = [...written].length;
  const bytes = Buffer.byteLength(written, "utf8");
  if (chars < 1 || chars > 140) {
    console.error(`FAIL: entry is ${chars} characters, outside the 1-140 gate.`);
    process.exit(1);
  }
  if (written.trim().length === 0) {
    console.error("FAIL: entry is only whitespace.");
    process.exit(1);
  }
  if (written.includes("\n") || written.includes("\r")) {
    console.error("FAIL: entry must be exactly one line, no newline characters.");
    process.exit(1);
  }
  console.log(written);
  console.log(`chars=${chars} bytes=${bytes} path=${outPath}`);
  console.log("GATE: PASS (1-140 chars, single line, not whitespace-only)");
}

main();
