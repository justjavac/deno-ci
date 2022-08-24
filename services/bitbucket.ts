// https://confluence.atlassian.com/bitbucket/environment-variables-794502608.html

import IDetectProvider from "../types.ts";

const bitbucketProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.BITBUCKET_BUILD_NUMBER);
  },
  // deno-lint-ignore require-await
  async configuration(env) {
    return {
      name: "Bitbucket Pipelines",
      service: "bitbucket",
      commit: env.BITBUCKET_COMMIT,
      tag: env.BITBUCKET_TAG,
      build: env.BITBUCKET_BUILD_NUMBER,
      buildUrl:
        `https://bitbucket.org/${env.BITBUCKET_REPO_SLUG}/addon/pipelines/home#!/results/${env.BITBUCKET_BUILD_NUMBER}`,
      branch: env.BITBUCKET_BRANCH,
      slug: env.BITBUCKET_REPO_SLUG,
      root: env.BITBUCKET_CLONE_DIR,
    };
  },
};

export default bitbucketProvider;
