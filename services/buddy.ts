// https://buddy.works/knowledge/deployments/how-use-environment-variables#default-environment-variables
import IDetectProvider from "../detectProvider.ts";
import prNumber from "../utils/prNumber.ts";

const buddyProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.BUDDY_WORKSPACE_ID);
  },

  configuration(env) {
    const pr: string = prNumber(env.BUDDY_EXECUTION_PULL_REQUEST_ID);
    const isPr: boolean = Boolean(pr);

    return {
      name: "Buddy",
      service: "buddy",
      commit: env.BUDDY_EXECUTION_REVISION,
      tag: env.BUDDY_EXECUTION_TAG,
      build: env.BUDDY_EXECUTION_ID,
      buildUrl: env.BUDDY_EXECUTION_URL,
      branch: isPr ? undefined : env.BUDDY_EXECUTION_BRANCH,
      pr,
      isPr,
      slug: env.BUDDY_REPO_SLUG,
    };
  },
};

export default buddyProvider;
