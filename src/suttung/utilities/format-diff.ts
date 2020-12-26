import * as Diff2Html from "diff2html";

const css =
  '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />\n';

/**
 * Formats given git-diff output to html string.
 * @param {string} diff Output of "git diff" command.
 */
export function formatDiff2Html(diff: string): string {
  return (
    css +
    Diff2Html.html(diff, {
      outputFormat: "side-by-side",
      matching: "lines",
    })
  );
}
