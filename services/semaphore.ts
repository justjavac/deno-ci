import { head } from "../utils/git.ts";
import type { DetectProvider } from "../types.ts";

// https://semaphoreci.com/docs/available-environment-variables.html

const semaphoreProvider: DetectProvider = {
  detect(env) {
    return Boolean(env.SEMAPHORE);
  },

  async configuration(env, cwd) {
    const pr = env.PULL_REQUEST_NUMBER;
    const isPr = Boolean(pr);

    return {
      name: "Semaphore",
      service: "semaphore",
      commit: await head(env, cwd), // TODO
      build: env.SEMAPHORE_BUILD_NUMBER,
      branch: isPr ? undefined : env.BRANCH_NAME,
      pr,
      isPr,
      prBranch: isPr ? env.BRANCH_NAME : undefined,
      slug: env.SEMAPHORE_REPO_SLUG,
      root: env.SEMAPHORE_PROJECT_DIR,
    };
  },
};

export default semaphoreProvider;
