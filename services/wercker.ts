// http://devcenter.wercker.com/docs/environment-variables/available-env-vars#hs_cos_wrapper_name

import IDetectProvider from "../detectProvider.ts";

const werckerProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.WERCKER_MAIN_PIPELINE_STARTED);
  },
  configuration(env) {
    return {
      name: "Wercker",
      service: "wercker",
      commit: env.WERCKER_GIT_COMMIT,
      build: env.WERCKER_MAIN_PIPELINE_STARTED,
      buildUrl: env.WERCKER_RUN_URL,
      branch: env.WERCKER_GIT_BRANCH,
      slug: `${env.WERCKER_GIT_OWNER}/${env.WERCKER_GIT_REPOSITORY}`,
      root: env.WERCKER_ROOT,
    };
  },
};

export default werckerProvider;
