import appveyor from "./services/appveyor.ts";
import bamboo from "./services/bamboo.ts";
import bitbucket from "./services/bitbucket.ts";
import bitrise from "./services/bitrise.ts";
import buddy from "./services/buddy.ts";
import buildkite from "./services/buildkite.ts";
import circleci from "./services/circleci.ts";
import cirrus from "./services/cirrus.ts";
import codebuild from "./services/codebuild.ts";
import codefresh from "./services/codefresh.ts";
import codeship from "./services/codeship.ts";
import drone from "./services/drone.ts";
import github from "./services/github.ts";
import gitlab from "./services/gitlab.ts";
import jenkins from "./services/jenkins.ts";
import sail from "./services/sail.ts";
import semaphore from "./services/semaphore.ts";
import shippable from "./services/shippable.ts";
// import teamcity from "./services/teamcity.ts";
import travis from "./services/travis.ts";
import vsts from "./services/vsts.ts";
import wercker from "./services/wercker.ts";
import git from "./services/git.ts";

import IDetectProvider, { Info } from "./detectProvider.ts";

const { env, cwd } = Deno;

const services: { [index: string]: IDetectProvider } = {
  appveyor,
  bamboo,
  bitbucket,
  bitrise,
  buddy,
  buildkite,
  circleci,
  cirrus,
  codebuild,
  codefresh,
  codeship,
  drone,
  github,
  gitlab,
  jenkins,
  sail,
  semaphore,
  shippable,
  //   teamcity,
  travis,
  vsts,
  wercker,
};

let isCI: boolean | null = null;
let info: Info | null = null;
const envs = env.toObject();

for (const name of Object.keys(services)) {
  if (services[name].detect(envs, cwd())) {
    isCI = true;
    info = await services[name].configuration(envs, cwd());
    break;
  }
}

if (isCI == null) {
  isCI = git.detect(envs);
  info = await git.configuration(envs, cwd());
}

export default {
  isCI,
  ...info,
};
