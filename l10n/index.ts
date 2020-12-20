import * as Diff2Html from "diff2html";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { diff } from "./diff";
import { getFiles } from "./getFiles";
import { getLatestCommit } from "./getLatestCommit";
const css =
  '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />\n';
export const getLocalePath = (locale: string) =>
  join(__dirname, `../src/local/${locale}`);

export async function updateLocale(locale: string) {
  const files = await getFiles(getLocalePath("en"));
  const models = new Map();
  await files.reduce(async (promise, file) => {
    const relativeEnPath = relative(getLocalePath("en"), file.path);
    const enHash = await getLatestCommit(file.path);
    const localeHash = await getLatestCommit(
      join(getLocalePath(locale), relativeEnPath)
    );
    const model = {
      relativePath: relativeEnPath,
      enHash,
      localeHash,
    };
    console.log(model);
    models.set(relativeEnPath, model);
    if (localeHash && enHash !== localeHash) {
      const changes = await diff(localeHash, enHash, join(file.path));
      if (changes) {
        const html =
          css +
          Diff2Html.html(changes, {
            outputFormat: "side-by-side",
            matching: "lines",
          });
        const htmlPath = join(
          __dirname,
          "..",
          "html",
          `${relativeEnPath}.html`
        );
        mkdirSync(dirname(htmlPath), { recursive: true });
        writeFileSync(htmlPath, html);
      }
    }
  }, Promise.resolve());
}

updateLocale("ru");
