import { runTests, test, assertEquals, assert } from "./deps.ts";

import ci from "../mod.ts";

console.log(ci);

test(function isTravisCI(): void {
  assert(ci.isCI);
});

test(function TravisCIinfo(): void {
  assertEquals(ci.name, "Travis CI");
  assertEquals(ci.service, "travis");
  assert(ci.commit.length > 0);
  assert(ci.branch.length > 0);
});

runTests();
