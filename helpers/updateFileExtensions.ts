// `fs` at v0.50.0 breaks with `deno` at v1.0.0
import { walk, move } from "https://deno.land/std/fs/mod.ts";
import {
  basename,
  parse,
  join,
} from "https://deno.land/std@v0.50.0/path/mod.ts";
import { Framework } from "../types.ts";

export default async (dir: string, framework: Framework) => {
  try {
    if (framework === Framework.CreateReactApp) {
      // CRA includes `.ts` and `tsx` extensions when initialised with TypeScript
      return;
    }

    const srcDir = join(dir, "src");

    if (framework === Framework.Next) {
      // Create a `src` directory and move the `pages` directory into it.
      // See: https://nextjs.org/docs/advanced-features/src-directory.
      await Deno.mkdir(srcDir);
      await move(join(dir, "pages"), join(dir, "src/pages"));
    }

    for await (const entry of walk(srcDir, { includeDirs: false })) {
      const { dir: fileDirPath, name, ext } = parse(entry.path);

      if (ext === ".js" || ext === ".jsx") {
        const fileDirName = basename(fileDirPath);

        if (framework === Framework.Next && fileDirName === "api") {
          // The `api` directory in the `next` starter project does not contain React components
          Deno.rename(entry.path, join(fileDirPath, `${name}.ts`));
          continue;
        }

        Deno.rename(entry.path, join(fileDirPath, `${name}.tsx`));
      }
    }
  } catch (error) {
    throw error;
  }
};
