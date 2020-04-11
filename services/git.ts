import { head, branch } from "../utils/git.ts";
import IDetectProvider from "../detectProvider.ts";

// FIXME
const gitProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.CI);
  },

  configuration(env, cwd) {
    return {
      name: "unknown",
      service: "unknown",
      // commit: head(env, cwd),
      // branch: branch(env, cwd)
    };
  },
};

export default gitProvider;
