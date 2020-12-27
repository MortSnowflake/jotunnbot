import { spawn } from "child_process";

export async function getLatestCommit(filepath: string): Promise<string> {
  const child = spawn(
    "git",
    `log -n 1 --pretty=format:%H -- ${filepath}`.split(" ")
  );
  return new Promise((resolve, reject) => {
    child.stdout.on("data", function (data: Buffer) {
      resolve(data.toString());
    });
    child.stderr.on("data", function (data: Buffer) {
      reject(data.toString());
    });
    child.on("close", function (code) {
      resolve("");
    });
  });
}
