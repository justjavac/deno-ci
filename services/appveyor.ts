// https://www.appveyor.com/docs/environment-variables

import IDetectProvider from "../detectProvider.ts";

const appveyorProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.APPVEYOR);
  },

  // deno-lint-ignore require-await
  async configuration(env) {
    const pr: string = env.APPVEYOR_PULL_REQUEST_NUMBER;
    const isPr: boolean = Boolean(pr);

    return {
      name: "Appveyor",
      service: "appveyor",
      commit: env.APPVEYOR_REPO_COMMIT,
      tag: env.APPVEYOR_REPO_TAG_NAME,
      build: env.APPVEYOR_BUILD_NUMBER,
      buildUrl:
        `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/${env.APPVEYOR_BUILD_VERSION}`,
      branch: env.APPVEYOR_REPO_BRANCH,
      job: env.APPVEYOR_JOB_NUMBER,
      jobUrl:
        `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/job/${env.APPVEYOR_JOB_ID}`,
      pr,
      isPr,
      prBranch: env.APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH,
      slug: env.APPVEYOR_REPO_NAME,
      root: env.APPVEYOR_BUILD_FOLDER,
    };
  },
};

export default appveyorProvider;
