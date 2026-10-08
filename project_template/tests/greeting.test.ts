// Tests for src/greeting.ts - run on every save by "deno task dev", results in test_output/.

import { assertEquals } from "@std/assert";
import { greeting } from "../src/greeting.ts";

Deno.test("greeting includes the name", () => {
  assertEquals(greeting("Ada"), "Hello, Ada!");
});
