// https://readme.drone.io/reference/environ

import type { DetectProvider } from "../types.ts";

const droneProvider: DetectProvider = {
  detect(env) {
    return Boolean(env.DRONE);
  },
  // deno-lint-ignore require-await
  async configuration(env) {
    const isPr = env.DRONE_BUILD_EVENT === "pull_request";

    return {
      name: "Drone",
      service: "drone",
      commit: env.DRONE_COMMIT_SHA,
      tag: env.DRONE_TAG,
      build: env.DRONE_BUILD_NUMBER,
      buildUrl: env.DRONE_BUILD_LINK,
      branch: isPr ? env.DRONE_TARGET_BRANCH : env.DRONE_BRANCH,
      job: env.DRONE_JOB_NUMBER,
      jobUrl: env.DRONE_BUILD_LINK,
      pr: env.DRONE_PULL_REQUEST,
      isPr,
      prBranch: isPr ? env.DRONE_SOURCE_BRANCH : undefined,
      slug: `${env.DRONE_REPO_OWNER}/${env.DRONE_REPO_NAME}`,
      root: env.DRONE_WORKSPACE,
    };
  },
};

export default droneProvider;
