import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { formatDiff2Html } from "./format-diff";
import { getDiff } from "./get-diff";
export async function saveDiffAsHtml(
  sourceHash: string,
  targetHash: string,
  filePath: string,
  outputDir: string,
  relativeFileName: string
) {
  const diff = await getDiff(targetHash, sourceHash, join(filePath));
  if (diff) {
    const html = formatDiff2Html(diff);
    const htmlPath = join(outputDir, "html", `${relativeFileName}.html`);
    mkdirSync(dirname(htmlPath), { recursive: true });
    writeFileSync(htmlPath, html);
  }
}
