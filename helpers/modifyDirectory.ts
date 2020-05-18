// `fs` at v0.50.0 breaks with `deno` at v1.0.0
import { copy, walk } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std@v0.50.0/path/mod.ts";
import { Framework } from "../types.ts";

export default async (dir: string, framework: Framework) => {
  try {
    const moduleUrl = import.meta.url;
    const commonConfigsDir = new URL("../configs/common", moduleUrl).pathname;
    const templatesDir = new URL("../templates", moduleUrl).pathname;

    // Copy common config files
    for await (const entry of walk(commonConfigsDir, { includeDirs: false })) {
      await copy(entry.path, join(dir, entry.name), { overwrite: true });
    }

    // Add license
    const licenseText = await Deno.readTextFile(join(templatesDir, "LICENSE"));
    const result = licenseText.replace(
      /%COPYRIGHT_YEAR/g,
      new Date().getFullYear().toString(),
    );

    await Deno.writeTextFile(join(dir, "LICENSE"), result);

    if (framework === Framework.CreateReactApp) {
      return;
    }

    const configsDir = new URL(`../configs/${framework}`, moduleUrl).pathname;

    for await (const entry of walk(configsDir, { maxDepth: 1 })) {
      if (entry.name === framework) {
        continue; // Ignore root directory
      }

      await copy(entry.path, join(dir, entry.name));
    }
  } catch (error) {
    throw error;
  }
};
