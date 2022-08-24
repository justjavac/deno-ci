// https://sail.ci/docs/environment-variables

import type { DetectProvider } from "../types.ts";

const sailProvider: DetectProvider = {
  detect(env) {
    return Boolean(env.SAILCI);
  },
  // deno-lint-ignore require-await
  async configuration(env) {
    const pr = env.SAIL_PULL_REQUEST_NUMBER;
    const isPr = Boolean(pr);

    return {
      name: "Sail CI",
      service: "sail",
      commit: env.SAIL_COMMIT_SHA,
      branch: isPr ? undefined : env.SAIL_COMMIT_BRANCH,
      pr,
      isPr,
      slug: `${env.SAIL_REPO_OWNER}/${env.SAIL_REPO_NAME}`,
      root: env.SAIL_CLONE_DIR,
    };
  },
};

export default sailProvider;
