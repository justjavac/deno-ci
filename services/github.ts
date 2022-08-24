// https://developer.github.com/actions/creating-github-actions/accessing-the-runtime-environment/#environment-variables

import type { DetectProvider } from "../types.ts";

function readJsonSync(path: string) {
  const decoder = new TextDecoder("utf-8");
  const content = decoder.decode(Deno.readFileSync(path));
  return JSON.parse(content);
}

function parseBranch(branch: string): string {
  return (/refs\/heads\/(.*)/i.exec(branch) || [])[1];
}

type PullRequest = {
  base?: {
    ref: string;
  };
  number: string;
};

type GitHubEvent = {
  pull_request: PullRequest;
};

function getPrEvent(env: {
  [index: string]: string;
}): { branch?: string; pr?: string } {
  try {
    const event = env.GITHUB_EVENT_PATH
      ? (readJsonSync(env.GITHUB_EVENT_PATH) as GitHubEvent)
      : undefined;

    if (event && event.pull_request) {
      return {
        branch: event.pull_request.base
          ? parseBranch(event.pull_request.base.ref)
          : undefined,
        pr: event.pull_request.number,
      };
    }
  } catch {
    return { pr: undefined, branch: undefined };
  }

  return { pr: undefined, branch: undefined };
}

const githubProvider: DetectProvider = {
  detect(env) {
    return Boolean(env.GITHUB_ACTION);
  },

  // deno-lint-ignore require-await
  async configuration(env) {
    const isPr = env.GITHUB_EVENT_NAME === "pull_request";
    const branch = parseBranch(env.GITHUB_REF);

    return {
      name: "GitHub Actions",
      service: "github",
      commit: env.GITHUB_SHA,
      isPr,
      branch,
      prBranch: isPr ? branch : undefined,
      slug: env.GITHUB_REPOSITORY,
      root: env.GITHUB_WORKSPACE,
      ...(isPr ? getPrEvent(env) : undefined),
    };
  },
};

export default githubProvider;
