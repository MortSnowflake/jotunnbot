import { mkdirSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import pluralize from "pluralize";
import { getEqualLiterals, getFiles, getLatestCommit } from "./utilities";
import { saveDiffAsHtml } from "./utilities/save-diff-as-html";

const getLocalePath = (locale: string) => join(__dirname, `../src/local/${locale}`);
const outPath = join(__dirname, "..", "out");

async function showChanges(targetLocale: string) {
  console.log(`Getting changes for source locale...`);
  let changedFiles = 0;
  const sourceFiles = await getFiles(getLocalePath("en"));
  console.log(`Source locale contains ${sourceFiles.length} ${pluralize("file", sourceFiles.length)}`);
  const missingFiles: string[] = [];
  await sourceFiles.reduce(async (promise, file) => {
    const relativeFileName = relative(getLocalePath("en"), file.path);
    const sourceHash = await getLatestCommit(file.path);
    const targetHash = await getLatestCommit(join(getLocalePath(targetLocale), relativeFileName));

    if (!targetHash) {
      missingFiles.push(relativeFileName);
    } else {
      console.log(`Getting AST for ${file.path}`);
      let hasChanges = false;
      const diff = getEqualLiterals(file.path, join(getLocalePath(targetLocale), relativeFileName));
      if (diff) {
        hasChanges = true;
        const jsonPath = join(outPath, "json", `${relativeFileName}.json`);
        mkdirSync(dirname(jsonPath), { recursive: true });
        writeFileSync(jsonPath, JSON.stringify(diff, null, 2));
      }
      if (targetHash !== sourceHash) {
        hasChanges = true;
        await saveDiffAsHtml(sourceHash, targetHash, file.path, outPath, relativeFileName);
      }
      if (hasChanges) {
        changedFiles++;
      }
    }
  }, Promise.resolve());

  console.log(`Found changes for ${changedFiles} ${pluralize("file", changedFiles)}`);
  console.log(`${missingFiles.length} ${pluralize("file", missingFiles.length)} are missing for ${targetLocale} locale`);

  missingFiles.unshift("These files are present only in source locale:\n");
  writeFileSync(join(outPath, "missing.txt"), missingFiles.join("\n"));
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

  If source locale contains files which are missing from target then their paths will be placed in "missing.txt"
  `);
}
showChanges(targetLocale);
