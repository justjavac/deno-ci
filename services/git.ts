import { branch, head } from "../utils/git.ts";
import IDetectProvider from "../detectProvider.ts";

// FIXME
const gitProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.CI);
  },

  async configuration(env, cwd) {
    return {
      name: "unknown",
      service: "unknown",
      commit: await head(env, cwd),
      branch: await branch(env, cwd)
    };
  },
};

export default gitProvider;
