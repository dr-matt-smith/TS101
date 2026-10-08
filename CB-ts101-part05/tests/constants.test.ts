// Tests for src/constants.ts - run on every save by "deno task dev", results in test_output/.

import { assertEquals } from "@std/assert";
import { LIGHT_BLUE, RED } from "../src/constants.ts";

Deno.test("RED is the CSS colour code for red", () => {
  assertEquals(RED, "#ff0000");
});

Deno.test("LIGHT_BLUE is the CSS colour code for light blue", () => {
  assertEquals(LIGHT_BLUE, "#add8e6");
});
