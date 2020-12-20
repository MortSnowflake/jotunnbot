import { spawn } from "child_process";

export async function diff(
  from: string,
  to: string,
  filepath: string
): Promise<string> {
  const child = spawn(
    "git",
    `diff ${from}..${to} --ignore-all-space -- ${filepath}`.split(" ")
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
