import IDetectProvider from "../detectProvider.ts";
import { head } from "../utils/git.ts";

// https://wiki.jenkins.io/display/JENKINS/Building+a+software+project

const jenkinsProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.JENKINS_URL);
  },
  configuration(env, cwd) {
    const pr = env.ghprbPullId || env.gitlabMergeRequestId || env.CHANGE_ID;
    const isPr = Boolean(pr);
    const localBranch = env.GIT_LOCAL_BRANCH ||
      env.GIT_BRANCH ||
      env.gitlabBranch ||
      env.BRANCH_NAME;

    return {
      name: "Jenkins",
      service: "jenkins",
      // commit: env.ghprbActualCommit || env.GIT_COMMIT || head(env, cwd),
      commit: env.ghprbActualCommit || env.GIT_COMMIT, // TODO
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
