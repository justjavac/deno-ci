// https://documentation.codeship.com/basic/builds-and-configuration/set-environment-variables/#default-environment-variables

import type { DetectProvider } from "../types.ts";

const codeshipProvider: DetectProvider = {
  detect(env): boolean {
    return env.CI_NAME != null && env.CI_NAME === "codeship";
  },
  // deno-lint-ignore require-await
  async configuration(env) {
    return {
      name: "Codeship",
      service: "codeship",
      build: env.CI_BUILD_NUMBER,
      buildUrl: env.CI_BUILD_URL,
      commit: env.CI_COMMIT_ID,
      branch: env.CI_BRANCH,
      slug: env.CI_REPO_NAME,
    };
  },
};

export default codeshipProvider;
