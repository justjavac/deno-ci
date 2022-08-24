import type { DetectProvider } from "../types.ts";
import { head } from "../utils/git.ts";

// https://wiki.jenkins.io/display/JENKINS/Building+a+software+project

const jenkinsProvider: DetectProvider = {
  detect(env) {
    return Boolean(env.JENKINS_URL);
  },

  async configuration(env, cwd) {
    const pr = env.ghprbPullId || env.gitlabMergeRequestId || env.CHANGE_ID;
    const isPr = Boolean(pr);
    const localBranch = env.GIT_LOCAL_BRANCH ||
      env.GIT_BRANCH ||
      env.gitlabBranch ||
      env.BRANCH_NAME;

    return {
      name: "Jenkins",
      service: "jenkins",
      commit: env.ghprbActualCommit || env.GIT_COMMIT || await head(env, cwd),
      branch: isPr
        ? env.ghprbTargetBranch || env.gitlabTargetBranch
        : localBranch,
      build: env.BUILD_NUMBER,
      buildUrl: env.BUILD_URL,
      root: env.WORKSPACE,
      pr,
      isPr,
      prBranch: isPr
        ? env.ghprbSourceBranch || env.gitlabSourceBranch || localBranch
        : undefined,
    };
  },
};

export default jenkinsProvider;
