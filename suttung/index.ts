import { writeFileSync } from "fs";
import { join, relative } from "path";
import { getFiles, getLatestCommit } from "./utilities";
import { saveDiffAsHtml } from "./utilities/save-diff-as-html";

const getLocalePath = (locale: string) => join(__dirname, `../src/local/${locale}`);
const outPath = join(__dirname, "..", "out");

async function showChanges(targetLocale: string) {
  const sourceFiles = await getFiles(getLocalePath("en"));
  const untranslatedFiles: string[] = [];
  await sourceFiles.reduce(async (promise, file) => {
    const relativeFileName = relative(getLocalePath("en"), file.path);
    const sourceHash = await getLatestCommit(file.path);
    const targetHash = await getLatestCommit(join(getLocalePath(targetLocale), relativeFileName));
    if (!targetHash) {
      untranslatedFiles.push(relativeFileName);
    }

    if (targetHash && targetHash !== sourceHash) {
      await saveDiffAsHtml(sourceHash, targetHash, file.path, outPath, relativeFileName);
    }
  }, Promise.resolve());
  untranslatedFiles.unshift("These files are present only in source locale:\n");
  writeFileSync(join(outPath, "untranslated.txt"), untranslatedFiles.join("\n"));
}

const targetLocale = process.argv[2];
if (!targetLocale) {
  console.log(`
  Suttung - Jotunbot translation helper

  Usage: suttung <target-locale>
  Example: suttung ru

  Suttung compares latest commit hashes
  for each file in source locale (en) and target locale
  and produces html output containg what was changed in source locale
  after appropriate target locale file was changed in last time.

  If source locale contains files which are missing from target then their paths will be placed in "untranslated.txt"
  `);
}
showChanges(targetLocale);
