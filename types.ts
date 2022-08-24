export type Info = {
  name: string;
  service: string;
  commit?: string;
  tag?: string;
  build?: string;
  buildUrl?: string;
  branch?: string;
  job?: string;
  jobUrl?: string;
  pr?: string;
  isPr?: boolean;
  prBranch?: string;
  slug?: string;
  root?: string;
};

export interface DetectProvider {
  detect(env: { [index: string]: string }, cwd?: string): boolean;
  configuration(env: { [index: string]: string }, cwd?: string): Promise<Info>;
}
