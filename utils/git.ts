const decoder = new TextDecoder();

export async function head(
  env: { [index: string]: string },
  cwd?: string,
): Promise<string | undefined> {
  try {
    const process = Deno.run({
      cmd: ["git", "rev-parse", "HEAD"],
      env,
      cwd,
      stdout: "piped",
    });
    const output = await process.output();
    return decoder.decode(output).trimEnd();
  } catch (error) {
    return undefined;
  }
}

export async function branch(
  env: { [index: string]: string },
  cwd?: string,
): Promise<string | undefined> {
  try {
    const process: Deno.Process = Deno.run({
      cmd: ["git", "rev-parse", "--abbrev-ref", "HEAD"],
      env,
      cwd,
      stdout: "piped",
    });

    const headRef: string = decoder.decode(await process.output()).trimEnd();

    if (headRef === "HEAD") {
      const process: Deno.Process = Deno.run({
        cmd: ["git", "show", "-s", "--pretty=%d", "HEAD"],
        env,
        cwd,
        stdout: "piped",
      });
      const output: string = decoder.decode(await process.output());
      const branch: string | undefined = output
        .replace(/^\(|\)$/g, "")
        .split(", ")
        .find((branch: string): boolean => branch.startsWith("origin/"));

      return branch ? branch.match(/^origin\/(.+)/)![1] : undefined;
    }

    return headRef;
  } catch (error) {
    return undefined;
  }
}
