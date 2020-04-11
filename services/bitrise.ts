// https://devcenter.bitrise.io/builds/available-environment-variables/#exposed-by-bitriseio

import IDetectProvider from "../detectProvider.ts";

const bitriseProvider: IDetectProvider = {
  detect(env: { [index: string]: string }) {
    return Boolean(env.BITRISE_IO);
  },

  configuration(env: { [index: string]: string }) {
    const pr = env.BITRISE_PULL_REQUEST === "false"
      ? undefined
      : env.BITRISE_PULL_REQUEST;
    const isPr: boolean = Boolean(pr);

    return {
      name: "Bitrise",
      service: "bitrise",
      commit: env.BITRISE_GIT_COMMIT,
      tag: env.BITRISE_GIT_TAG,
      build: env.BITRISE_BUILD_NUMBER,
      buildUrl: env.BITRISE_BUILD_URL,
      branch: isPr ? env.BITRISEIO_GIT_BRANCH_DEST : env.BITRISE_GIT_BRANCH,
      pr,
      isPr,
      prBranch: isPr ? env.BITRISE_GIT_BRANCH : undefined,
      slug: env.BITRISE_APP_SLUG,
    };
  },
};

export default bitriseProvider;
