import usesYarn from "./usesYarn.ts";
import { common, testing, linting, next, gatsby } from "../dependencies.ts";
import { Framework } from "../types.ts";

const exec = async (args: string[]) => {
  const proc = await Deno.run({ cmd: args }).status();

  if (proc.success === false) {
    Deno.exit(proc.code);
  }

  return proc;
};

export default async (dir: string, framework: Framework) => {
  try {
    const useYarn = await usesYarn(dir);
    const installCommand = useYarn
      ? ["yarn", "add", "-D"]
      : ["npm", "install", "-D"];

    if (framework === Framework.CreateReactApp) {
      await exec([...installCommand, ...common]);
      return;
    }

    if (framework === Framework.Next) {
      await exec(
        [...installCommand, ...common, ...testing, ...linting, ...next],
      );

      return;
    }

    await exec(
      [
        ...installCommand,
        ...common,
        ...testing,
        ...linting,
        ...gatsby,
      ],
    );
  } catch (error) {
    throw error;
  }
};
