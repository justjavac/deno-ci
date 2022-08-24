import { branch, head } from "../utils/git.ts";
import IDetectProvider from "../types.ts";

// https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html

const codebuildProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.CODEBUILD_BUILD_ID);
  },

  async configuration(env, cwd) {
    return {
      name: "AWS CodeBuild",
      service: "codebuild",
      commit: await head(env, cwd), // TODO
      branch: await branch(env, cwd),
      build: env.CODEBUILD_BUILD_ID,
      buildUrl:
        `https://console.aws.amazon.com/codebuild/home?region=${env.AWS_REGION}#/builds/${env.CODEBUILD_BUILD_ID}/view/new`,
      root: env.PWD,
    };
  },
};

export default codebuildProvider;
