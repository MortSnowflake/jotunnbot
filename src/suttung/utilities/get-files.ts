import { readdir } from "fs";
import { join } from "path";
import { promisify } from "util";

const readdirAsync = promisify(readdir);
export async function getFiles(path = "./") {
  const entries = await readdirAsync(path, { withFileTypes: true });

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({ name: file.name, path: join(path, file.name) }));

  const folders = entries.filter((folder) => folder.isDirectory());

  for (const folder of folders)
    files.push(...(await getFiles(join(path, folder.name))));

  return files;
}
