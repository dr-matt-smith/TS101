// Tests for src/my_functions.ts - run on every save by "deno task dev", results in test_output/.

import { assertEquals } from "@std/assert";
import { sayHello } from "../src/my_functions.ts";

Deno.test("sayHello says hello, with the name in capitals", () => {
  assertEquals(sayHello("matt"), "Hello MATT");
});
