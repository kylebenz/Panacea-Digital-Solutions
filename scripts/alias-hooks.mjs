// Node module hooks so standalone scripts can import project TypeScript that
// uses the "@/..." path alias (Node 22 strips the types itself).
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = new URL("../", import.meta.url);

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    for (const ext of [".ts", ".tsx", "/index.ts"]) {
      const url = new URL(specifier.slice(2) + ext, root);
      if (existsSync(fileURLToPath(url))) return next(url.href, context);
    }
  }
  if (specifier.startsWith(".") && !/\.[cm]?[jt]sx?$/.test(specifier) && context.parentURL?.endsWith(".ts")) {
    const url = new URL(specifier + ".ts", context.parentURL);
    if (existsSync(fileURLToPath(url))) return next(url.href, context);
  }
  return next(specifier, context);
}

export const rootUrl = pathToFileURL(fileURLToPath(root)).href;
