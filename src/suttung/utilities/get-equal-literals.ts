import { readFileSync } from "fs";
import { extname } from "path";
import { createSourceFile, isArrayLiteralExpression, isConditionalExpression, isImportDeclaration, isLiteralExpression, Node, ScriptTarget } from "typescript";

export function getEqualLiterals(sourceFilePath: string, targetFilePath: string) {
  if (extname(sourceFilePath) !== ".ts" || extname(targetFilePath) !== ".ts") {
    return;
  }
  const sourceContent = readFileSync(sourceFilePath).toString();
  const targetContent = readFileSync(targetFilePath).toString();

  const sourceTree = createSourceFile(sourceFilePath, sourceContent, ScriptTarget.Latest, true);
  const targetTree = createSourceFile(targetFilePath, targetContent, ScriptTarget.Latest, true);
  return buildTree(sourceTree, targetTree);
}

function buildTree(source: Node, target: Node) {
  let tree: Tree = {};

  const addToTree = (entry: IEntry, locale: Locales) => {
    const { path, value } = entry;
    if (locale === Locales.source) {
      tree = {
        ...tree,
        [path]: {
          ...tree[path],
          [locale]: value,
          target: "[UNTRANSLATED]",
        },
      };
    } else {
      const sourceValue = tree[path]?.source;
      const areEquals = sourceValue && sourceValue !== '""' && !sourceValue.startsWith('"') && sourceValue === value;
      if (!areEquals) {
        delete tree[path];
      }
    }
  };

  const visit = (locale: Locales) => (node: Node) => {
    if (isImportDeclaration(node)) {
      return;
    }

    if (isLiteralExpression(node)) {
      const entry = getEntry(node);
      addToTree(entry, locale);
    }
    node.forEachChild(visit(locale));
  };

  source.forEachChild(visit(Locales.source));
  target.forEachChild(visit(Locales.target));
  return Object.keys(tree).length === 0 ? undefined : tree;
}

function getEntry(node: Node): IEntry {
  let parent = node.parent;
  let path = "";
  let value = (node as any)?.getText();
  while (parent) {
    if (isConditionalExpression(parent) || isArrayLiteralExpression(parent)) {
      // using whole expression
      value = parent.getText();
    }
    const parentName = (parent as any)?.name?.escapedText;
    if (parentName) {
      path = `${parentName}${path ? "." : ""}${path}`;
    }
    parent = parent.parent;
  }
  return { path, value };
}

interface IEntry {
  path: string;
  value: string;
}

enum Locales {
  source = "source",
  target = "target",
}

type Tree = {
  [key: string]: {
    [key in Locales]: string;
  };
};
