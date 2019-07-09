import { test, assertEquals } from "./deps.ts";

import prNumber from "../utils/prNumber.ts";

test(function havaRightNumber(): void {
  assertEquals(prNumber("https://github.com/owner/repo/pull/10"), "10");
  assertEquals(prNumber("pull/10"), "10");
  assertEquals(
    prNumber("https://gitlab.com/owner/repo/merge_requests/10"),
    "10"
  );
});
