// https://docs.netlify.com/configure-builds/environment-variables/

import type { DetectProvider } from "../types.ts";

const netlifyProvider: DetectProvider = {
  detect(env) {
    return env.NETLIFY === "true";
  },
  // deno-lint-ignore require-await
  async configuration(env) {
    const isPr = env.PULL_REQUEST === "true";

    return {
      name: "Netlify",
      service: "netlify",
      commit: env.COMMIT_REF,
      build: env.BUILD_ID,
      buildUrl: env.DEPLOY_URL,
      branch: env.BRANCH,
      jobUrl: env.DEPLOY_URL,
      isPr,
    };
  },
};

export default netlifyProvider;
