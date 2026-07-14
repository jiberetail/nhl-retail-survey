import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("out");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt"]);
const replacements = [
  [/\/imports\//g, "/nhl-retail-survey/imports/"],
  [/\/nhl-logo\.png/g, "/nhl-retail-survey/nhl-logo.png"],
];

async function rewriteDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const filePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await rewriteDirectory(filePath);
        return;
      }

      if (!textExtensions.has(path.extname(entry.name))) return;

      const source = await readFile(filePath, "utf8");
      const rewritten = replacements.reduce(
        (content, [pattern, replacement]) => content.replace(pattern, replacement),
        source,
      );

      if (rewritten !== source) await writeFile(filePath, rewritten);
    }),
  );
}

await rewriteDirectory(outputDir);
await writeFile(path.join(outputDir, ".nojekyll"), "");
