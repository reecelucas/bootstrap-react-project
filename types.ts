export const enum Framework {
  Gatsby = "gatsby",
  Next = "next",
  CreateReactApp = "createReactApp",
}

export interface PackageJson {
  name?: string;
  description?: string;
  author?: string;
  license?: string;
  homepage?: string;
  repository?: {
    type: string;
    url: string;
  };
  bugs?: {
    url: string;
  };
  scripts?: {
    [key: string]: string;
  };
  dependencies?: {
    [key: string]: string;
  };
  [key: string]: unknown;
}
