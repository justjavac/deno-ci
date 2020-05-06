import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import prNumber from "../utils/prNumber.ts";

Deno.test('havaRightNumber', (): void => {
  assertEquals(prNumber("https://github.com/owner/repo/pull/10"), "10");
  assertEquals(prNumber("pull/10"), "10");
  assertEquals(
    prNumber("https://gitlab.com/owner/repo/merge_requests/10"),
    "10",
  );
});
