// https://confluence.jetbrains.com/display/TCD10/Predefined+Build+Parameters

// TODO

const javaProperties = require("java-properties");
import { branch } from "../utils/git.ts";
import IDetectProvider from "../detectProvider.ts";

const PROPERTIES_MAPPING = {
  root: "teamcity.build.workingDir",
  branch: "teamcity.build.branch",
} as const;

function safeReadProperties(filePath: string) {
  try {
    return javaProperties.of(filePath);
  } catch (error) {
    return undefined;
  }
}

function getProperties(
  env: {
    [index: string]: string;
  },
  cwd?: string,
) {
  const buildProperties = env.TEAMCITY_BUILD_PROPERTIES_FILE
    ? safeReadProperties(env.TEAMCITY_BUILD_PROPERTIES_FILE)
    : undefined;
  const configFile = buildProperties
    ? buildProperties.get("teamcity.configuration.properties.file")
    : undefined;
  const configProperties = configFile
    ? safeReadProperties(configFile)
    : configFile;

  return Object.keys(PROPERTIES_MAPPING).reduce(
    (result, key) =>
      Object.assign(result, {
        [key]: (buildProperties
          ? buildProperties.get(PROPERTIES_MAPPING[key])
          : undefined) ||
          (configProperties
            ? configProperties.get(PROPERTIES_MAPPING[key])
            : undefined) ||
          (key === "branch" ? branch(env, cwd) : undefined),
      }),
    {},
  );
}

const teamcityProvider: IDetectProvider = {
  detect(env) {
    return Boolean(env.TEAMCITY_VERSION);
  },

  configuration(env, cwd) {
    return {
      name: "TeamCity",
      service: "teamcity",
      commit: env.BUILD_VCS_NUMBER,
      build: env.BUILD_NUMBER,
      slug: env.TEAMCITY_BUILDCONF_NAME,
      ...getProperties(env, cwd),
    };
  },
};

export default teamcityProvider;
