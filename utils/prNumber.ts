export default function prNumber(pr: string): string {
  return (/\d+(?!.*\d+)/.exec(pr) || [])[0];
}
