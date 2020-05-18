// `fs` at v0.50.0 breaks with `deno` at v1.0.0
import { existsSync, readJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std@v0.50.0/path/mod.ts";
import { PackageJson } from "../types.ts";

export default async (dir: string): Promise<PackageJson> => {
  try {
    const packageJsonPath = join(dir, "package.json");

    if (!existsSync(packageJsonPath)) {
      throw new Error("Could not find package.json");
    }

    const packageJson = (await readJson(packageJsonPath)) as PackageJson;
    return packageJson;
  } catch (error) {
    throw error;
  }
};
