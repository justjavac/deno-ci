// https://buildkite.com/docs/builds/environment-variables

import IDetectProvider from "../detectProvider.ts";

const buildkiteProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.BUILDKITE);
  },
  // deno-lint-ignore require-await
  async configuration(env) {
    const pr = env.BUILDKITE_PULL_REQUEST === "false"
      ? undefined
      : env.BUILDKITE_PULL_REQUEST;
    const isPr = Boolean(pr);

    return {
      name: "Buildkite",
      service: "buildkite",
      build: env.BUILDKITE_BUILD_NUMBER,
      buildUrl: env.BUILDKITE_BUILD_URL,
      commit: env.BUILDKITE_COMMIT,
      tag: env.BUILDKITE_TAG,
      branch: isPr
        ? env.BUILDKITE_PULL_REQUEST_BASE_BRANCH
        : env.BUILDKITE_BRANCH,
      slug: `${env.BUILDKITE_ORGANIZATION_SLUG}/${env.BUILDKITE_PROJECT_SLUG}`,
      pr,
      isPr,
      prBranch: isPr ? env.BUILDKITE_BRANCH : undefined,
      root: env.BUILDKITE_BUILD_CHECKOUT_PATH,
    };
  },
};

export default buildkiteProvider;
