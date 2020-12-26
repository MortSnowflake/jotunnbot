import { spawn } from "child_process";

/**
 * Gets diff for given `filepath` between two commits.
 * @param {string} from First commit hash.
 * @param {string} to Second commit hash.
 * @param {string} filepath File path.
 * @returns {Promise<string>} Promise which fullfied with git-diff output or empty string. In case of error it would be rejected.
 */
export async function getDiff(from: string, to: string, filepath: string): Promise<string> {
  const child = spawn("git", `diff ${from}..${to} --ignore-all-space -- ${filepath}`.split(" "));
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
