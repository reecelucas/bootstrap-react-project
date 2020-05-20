// `fs` at v0.50.0 breaks with `deno` at v1.0.0
import { writeJson } from "https://deno.land/std/fs/mod.ts";
import { basename, join } from "https://deno.land/std@v0.50.0/path/mod.ts";
import usesYarn from "./usesYarn.ts";
import { Framework, PackageJson } from "../types.ts";

export default async (
  dir: string,
  packageJson: PackageJson,
  framework: Framework
) => {
  try {
    const useYarn = await usesYarn(dir);
    const includeTestScript = framework !== Framework.CreateReactApp;
    const command = useYarn ? "yarn" : "npm run";
    const projectName = basename(dir);
    const content = {
      ...packageJson,
      name: projectName,
      description: "Bootstrapped React project",
      author: "Reece Lucas <reecelucas@sky.com>",
      license: "MIT",
      repository: {
        type: "git",
        url: `git+https://github.com/reecelucas/${projectName}.git`,
      },
      bugs: {
        url: `https://github.com/reecelucas/${projectName}/issues`,
      },
      scripts: {
        ...packageJson.scripts,
        ...(includeTestScript ? { test: "jest --passWithNoTests" } : {}),
        lint: `eslint --quiet \"src/**/*.{js,ts,tsx}\"`,
        format: `prettier --write \"src/**/*.{js,ts,tsx}\"`,
      },
      husky: {
        hooks: {
          "pre-commit": `${command} lint && ${command} format && ${command} test`,
        },
      },
    };

    await writeJson(join(dir, "package.json"), content, { spaces: 2 });
  } catch (error) {
    throw error;
  }
};
