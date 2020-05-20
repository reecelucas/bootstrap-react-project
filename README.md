# bootstrap-react-project

An executable [Deno](https://deno.land/) script to bootstrap a React project with TypeScript and other modern tooling. This script automates a lot of the stuff I find myself doing when starting a new React project with [Gatsby](https://www.gatsbyjs.org/), [Next](https://nextjs.org/) or [Create React App](https://create-react-app.dev/).

## Install

Install [Deno](https://deno.land/#installation), then clone the repo and install the script.

```sh
git clone git@github.com:reecelucas/bootstrap-react-project.git

deno install --unstable --allow-read --allow-write --allow-run --allow-net --name bootstrap_react_project bootstrap-react-project/cli.ts
```

See <https://deno.land/manual/tools/script_installer#script-installer> for more details about installing executable scripts.

You can now run `bootstrap_react_project` at the root of a new project. The script will identify the framework used and will generate the required configuration files and install dependencies. See [what it does](#what-it-does) for more details.

## Usage

### Gatsby

```sh
npm install -g gatsby-cli
gatsby new gatsby-site
cd gatsby-site
bootstrap_react_project
```

### Next

```sh
yarn create next-app # follow instructions to create my-app
cd my-app
bootstrap_react_project
yarn dev # to initialise tsconfig.json
```

### Create React App

```sh
yarn create react-app my-app --template typescript
cd my-app
bootstrap_react_project
```

## What it does

### All Frameworks

- Adds a [.editorconfig](./configs/common/.editorconfig) file to the root directory.
- Adds a [.prettierrc](./configs/common/.prettierrc) file to the root directory.
- Adds an [MIT License](./templates/LICENSE) to the root directory.
- Adds the following fields to the [package.json](./helpers/modifyPackageJson.ts) file:
  - `name`
  - `description`
  - `author`
  - `license`
  - `repository`
  - `bugs`
- Adds `lint` and `format` scripts to the [package.json](./helpers/modifyPackageJson.ts) file.
- Adds a `pre-commit` hook using [husky](https://github.com/typicode/husky).
- Installs required [dependencies](./dependencies.ts).

### Gatbsy and Next

- Adds a `jest.config.js` file to the root directory, along with required tansformers and mocks. Extends the recommended config ([gatsby](https://www.gatsbyjs.org/docs/unit-testing/#2-creating-a-configuration-file-for-jest), [next](https://github.com/zeit/next.js/tree/canary/examples/with-jest)) and includes [@testing-library/react](https://github.com/testing-library/react-testing-library) and [@testing-library/jest-dom](https://github.com/testing-library/jest-dom).
- Adds a `test` script to the [package.json](./helpers/modifyPackageJson.ts) file.
- Adds a `.eslintrc.json` file to the root directory, using [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app).
- Changes `js` and `jsx` file extensions to `ts` and `tsx`.

### Next

- Adds an empty `tsconfig.json` file to the root directory (<https://nextjs.org/docs/basic-features/typescript>).
