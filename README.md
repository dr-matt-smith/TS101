# TS101
Matt's TypeScript 101 course

Hi there,

This is going to grow into a simple introduction to TypeScript course.

It assumes basic OOProgrammning skills (such as Java or C#), and will introduce some simple 2D games as the vehicle to learn TypeScript.

Have fun!

.. matt smith .. September 2026

<hr>
I'll be providing screenshots using the following technologies, but you can, of course, use whatever editor and TS compiler you wish:

- Celbridge
  - free, open-source workbench, perfect for 2D game development with TypeScript
  - https://www.celbridge.org/
- deno
  - from the author who created Node, deno is  free, open-source TS compiler where TS is the first-class citizen
  - https://deno.com/

Each directory/folder is a separate Celbridge project
- so download the whole repo, and click the `.celbridge` file to open each project in Celbridge

## DO THESE STEPS:

1. download / clone this repo to. your computer

3. install Celbridge and deno (or your preferred editor / TS transpiler...)

  - https://www.celbridge.org/download/
  - https://deno.com/

4. look at the READMEs in the part01/02/03/04/05

   - they are a step-by-step introduction to TypeScript for HTML page games ...

  - part 1: Set up a TS project, run main and typecheck a function call
    - [CB-ts101-part01/README.md](./CB-ts101-part01/README.md)
  - part 2: Hello, World in a web page - TS updating an HTML element
    - [CB-ts101-part02/README.md](./CB-ts101-part02/README.md)
  - part 3: build an HTML/CSS/JS site from TS source
    - [CB-ts101-part03/README.md](./CB-ts101-part03/README.md)
  - part 4: the build tooling, that combines all TS scripts into a single JS
    - [CB-ts101-part04/README.md](./CB-ts101-part04/README.md)
  - part 5: adding CSS and a second TS file
    - [CB-ts101-part05/README.md](./CB-ts101-part05/README.md)

   Each project also has a quick reference of its commands: `README_deno_TS_workflow.md`

   From part 2 onwards, opening a project starts `deno task dev` in its console - it builds `src/` and `public/` into `dist/`,
   runs the tests, and rebuilds every time you save. `dist/index.html` opens in the side panel.


## Lots of TypeScript learning resources


- The TypeScript Handbook
    - https://www.typescriptlang.org/docs/handbook/intro.html

- Totally TypeScript: Total TypeScript Essentials
    - https://www.totaltypescript.com/books/total-typescript-essentials

- TypeScript Deep Dive
    - https://basarat.gitbook.io/typescript/overview

- TypeScript docs
    - https://www.typescriptlang.org/docs/

- Lambda expressions / anonymous functions / arrow functions
    - typescriptlang
        - https://www.typescriptlang.org/docs/handbook/2/functions.html
    - XJavascript
        - https://www.baeldung.com/java-oop
    - GeeksforGeeks
        - https://www.geeksforgeeks.org/typescript/explain-the-arrow-function-syntax-in-typescript/
    - W3Schools - (JavaScript)
        - https://www.w3schools.com/Js/js_arrow_function.asp
