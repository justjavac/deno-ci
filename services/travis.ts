// https://docs.travis-ci.com/user/environment-variables#default-environment-variables

import type { DetectProvider } from "../types.ts";

const travisProvider: DetectProvider = {
  detect(env) {
    return Boolean(env.TRAVIS);
  },
  // deno-lint-ignore require-await
  async configuration(env) {
    const pr = env.TRAVIS_PULL_REQUEST === "false"
      ? undefined
      : env.TRAVIS_PULL_REQUEST;
    const isPr = Boolean(pr);

    return {
      name: "Travis CI",
      service: "travis",
      commit: env.TRAVIS_COMMIT,
      tag: env.TRAVIS_TAG,
      build: env.TRAVIS_BUILD_NUMBER,
      buildUrl: env.TRAVIS_BUILD_WEB_URL,
      branch: env.TRAVIS_BRANCH,
      job: env.TRAVIS_JOB_NUMBER,
      jobUrl: env.TRAVIS_JOB_WEB_URL,
      pr,
      isPr,
      prBranch: env.TRAVIS_PULL_REQUEST_BRANCH,
      slug: env.TRAVIS_REPO_SLUG,
      root: env.TRAVIS_BUILD_DIR,
    };
  },
};

export default travisProvider;
