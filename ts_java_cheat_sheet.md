# Java to TypeScript cheat sheet

One page of everything Book 1 translates from Java. The chapter that explains each row is in the
last column.

## Basics

| Java | TypeScript | 
|---|---|
| `int n = 5;` / `double d = 2.5;` | `let n = 5;` / `let d: number = 2.5;` - one `number` type | 
| `final String NAME = "Ada";` | `const NAME = "Ada";` | 
| `String`, `boolean`, `char` | `string`, `boolean` (no `char`: a one-letter `string`) | 
| `"Hi " + name + "!"` | `` `Hi ${name}!` `` | 
| `a.equals(b)` (strings), `==` (numbers) | `a === b` for both; never `==` | 
| `String[] xs = {"a", "b"};` / `ArrayList<String>` | `const xs: string[] = ["a", "b"];` (grows like a list) | 
| `for (String x : xs)` | `for (const x of xs)` - `of`, not `in` | 
| `xs.length` / `list.size()` | `xs.length` | 
| `static int twice(int n) { ... }` in a class | `function twice(n: number): number { ... }` in any file | 
| `public` class, `import pkg.Name;` | `export`, `import { Name } from "./Name.ts";` | 
| `null` | `null` and `undefined`; only allowed if the type says so: `string \| null` | 

## Functions

| Java | TypeScript | 
|---|---|
| `x -> x * 2` | `(x) => x * 2` | 
| `Function<Integer, Integer>` | `(x: number) => number` | 
| `list.stream().map(f).collect(...)` | `xs.map(f)` | 
| `.filter(p)`, `.reduce(0, Integer::sum)`, `.findFirst()` | `.filter(p)`, `.reduce((s, x) => s + x, 0)`, `.find(p)` (or `undefined`) | 
| `list.sort(cmp)` (changes the list) | `xs.toSorted(cmp)` (a copy) | 
| `obj::method` | `() => obj.method()` - never `obj.method` on its own | 
| `button.addActionListener(e -> ...)` | `button.addEventListener("click", () => { ... })` 

## Classes

| Java | TypeScript | 
|---|---|
| `public class Student { ... }` | `export class Student { ... }`, one per file, `Student.ts` | 
| `count++` inside a method | `this.count++` - `this.` is compulsory | 
| `private String name;` + constructor assigning it | `constructor(private name: string) {}` (parameter property) | 
| several constructors / overloaded methods | one constructor/method with default (`x = 1`) or optional (`x?`) parameters | 
| `toString()` | `toString(): string` - used by `${obj}` | 
| `private` | `private` (checked by the compiler) or `#field` (private at run time too) | 
| `final` field | `readonly` field | 
| `getName()`, `isActive()`, `setName(...)` | methods, or `get name()` / `set name(v)` accessors | 
| `throw new IllegalArgumentException("...")` | `throw new Error("...")` | 
| `static final int MAX = 3;` | `static readonly MAX = 3;` (or a module-level `const`) | 
| `enum Colour { RED, GREEN }` | `type Colour = "red" \| "green";` (or `enum`, or `as const`) | 
| `interface Shape { double area(); }` | `interface Shape { area(): number; }` - matched by shape, not name | 
| `class Circle implements Shape` | `class Circle implements Shape` (optional - any object of the right shape fits) | 
| `class Cat extends Animal`, `super(...)` | the same | 
| `@Override` | `override` keyword - compulsory in this book's projects | 
| `protected`, `abstract` | the same | 
| `final class` / `final` method | no equivalent - prefer composition, or document "do not override" | 
| `obj instanceof Shape` (interface) | not possible - interfaces vanish at run time | 

## Tests

| JUnit | Deno | 
|---|---|
| a Javadoc example nobody runs | a doc comment `@example` - Deno runs and checks it | 
| `@Test void name() { ... }` | `Deno.test("a sentence saying what should be true", () => { ... });` | 
| `assertEquals(expected, actual)` | `assertEquals(actual, expected)` - the other way round | 
| `assertEquals(e, a, delta)` | `assertAlmostEquals(actual, expected)` | 
| `assertThrows(X.class, () -> ...)` | `assertThrows(() => ..., Error, "part of the message")` | 
| `assertSame(e, a)` | `assertStrictEquals(actual, expected)` | 
| `@BeforeEach` | a helper function each test calls | 
| nested tests | `await t.step("...", () => { ... })` in an `async` test | 

## Running things

| Java | This book | 
|---|---|
| `javac` then `java` | open the project in Celbridge: `deno task dev` builds, tests and watches; press refresh on the preview | 
| the console | the TAP output in Celbridge's console, and `test_output/index.html` | 
| a `.jar` | `dist/` - a plain web page, no server needed | 
