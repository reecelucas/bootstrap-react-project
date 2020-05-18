import { green, red } from "https://deno.land/std@v0.50.0/fmt/mod.ts";
import readPackageJson from "./helpers/readPackageJson.ts";
import getFrameworkUsed from "./helpers/getFrameworkUsed.ts";
import modifyDirectory from "./helpers/modifyDirectory.ts";
import modifyPackageJson from "./helpers/modifyPackageJson.ts";
import updateFileExtensions from "./helpers/updateFileExtensions.ts";
import installDependencies from "./helpers/installDependencies.ts";

if (import.meta.main) {
  try {
    const projectDir = Deno.cwd();
    const packageJson = await readPackageJson(projectDir);
    const framework = getFrameworkUsed(packageJson);

    await modifyDirectory(projectDir, framework);
    await modifyPackageJson(projectDir, packageJson, framework);
    await updateFileExtensions(projectDir, framework);
    await installDependencies(projectDir, framework);
    console.log(green("Project bootstrapped!"));
  } catch (error) {
    console.log(red(error.message));
    Deno.exit(1);
  }
}
