import { Framework, PackageJson } from "../types.ts";

export default (packageJson: PackageJson): Framework => {
  const deps = packageJson.dependencies || {};

  if (deps.gatsby) {
    return Framework.Gatsby;
  }

  if (deps.next) {
    return Framework.Next;
  }

  if (deps["react-scripts"]) {
    return Framework.CreateReactApp;
  }

  throw new Error(
    "Project does not use one of the supported React frameworks: Create React App, Gatsby or Next",
  );
};
