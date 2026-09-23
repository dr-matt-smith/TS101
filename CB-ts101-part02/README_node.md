# TypeScript 101 - part 02 - build an HTML/CSS/JS site from TS source

A simple TS-driven website can be as simple as follows:
- TS source code in `/src`
- HTML/CSS/images to populate final site in `/public`
  - a `<script>` element in the HTML code to read transpiled JavaScript
  - e.g. `/src/main.ts` -> `/public/game.js`



> This README uses **Node** (v26 or later), e.g. on the college lab PCs. If you have Deno installed,
> [README.md](README.md) is the main version of these exercises, with Deno commands.
>
> See [README_node_TS_workflow.md](README_node_TS_workflow.md) for all the Node build and serve commands.

## Exercise 2-1: Create HTML page in `/public`

Do the following:

1. start with a new, empty Celbridge project
    - and add a default shell console document (`shell.console`)

1. create folder `/public`, and inside create `index.html`, containing the following:

NOTE: You may need to context menu (right mouse click) to open the document with the Code Editor

![Celbridge open HTML with Code Editor](README_images/0_html_code_editor.webp)



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Apple Move</title>
  </head>
  <body>
    <main>
      <h1>🍎 Apple Move</h1>
      <section class="container canvas-container">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
      </section>

    </main>
    <script src="game.js"></script>
  </body>
</html>
```

NOTE:
- you'll see how our `<script>` element reads `game.js`
- TypeScript sources files are translated into JavaScript `.js` when distributed/published on the web

![Celbridge new index.html documment](README_images/1_index_html.webp)

## Exercise 2-2: Create a simple `main.ts` in  folder `/src`

```ts
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const RED = "#ff0000";
const LIGHT_BLUE = "#add8e6";

const BACKGROUND_COLOUR = LIGHT_BLUE;
 
// run after page loaded
addEventListener("load", () => {
  // ----- the screen -----
  // the game is drawn on the <canvas> element in index.html
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;

  // the "context" is what you draw with (Java calls this a Graphics object)
  const g = canvas.getContext("2d")!;

  // ----- draw the screen -----
  // paint the whole canvas the background colour
  g.fillStyle = BACKGROUND_COLOUR;
  g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
});
```
![Celbridge main.ts document](README_images/2_main_ts.webp)

NOTE:
- this TS script defines some constants for screen size and colors
- then defines an event handler function for the page `load` event
- when the page is loaded, the canvas will be covered with a rectangle filled with a red color

## Exercise 2-3: Create our JS from our TS script

Node can run TypeScript, but to turn our TS into a JavaScript file for a web page we need a **bundler** tool.
We'll use **esbuild** (and TypeScript itself, for type checking later). These tools are listed in a `package.json` file.

1. Create file `package.json` (in the project root) containing the following:

```json
{
  "name": "ts101-part02",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "devDependencies": {
    "esbuild": "^0.25.0",
    "typescript": "^5.9.0"
  }
}
```

2. Create file `tsconfig.json` (in the project root) containing the following - this configures the TypeScript type checker:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

3. Install the tools listed in `package.json` into a `node_modules/` folder:

```bash
npm install
```

You only need to do this **once per project** (it needs an internet connection).

4. get esbuild to transpile `/src/main.ts` -> `/public/game.js`

At the terminal, run:

```bash
npx esbuild src/main.ts --bundle --outfile=public/game.js
```

TERMINAL DUMP:
```bash
$ npx esbuild src/main.ts --bundle --outfile=public/game.js

  public/game.js  447b

⚡ Done in 2ms
```

NOTE:
- `npx` runs a tool installed in `node_modules/`

## Exercise 2-4: View the HTML file

We won't need to edit the HTML file again, so now we can just view it (rendered as a web page)


So now use the `/public/index.html` context menu (right mouse click) to open the document with the HTML Viewer

![Celbridge open HTML with Code Editor](README_images/4_html_html_viewer.webp)

You should now see the web page, with text Apple Move, and blue rectangle
- which will be the drawing canvas we can code our TypeScript game to run within ...

![Celbridge open HTML with Code Editor](README_images/5_web_page_blue_canvas.bmp)


## Exercise 2-5: Change the background to red

1. In file `/src/main.ts` edit line 7, so that the `BACKGROUND_COLOUR` constant is set to `RED` not `LIGHT_BLUE`:

    ```ts
    const SCREEN_WIDTH = 800;
    const SCREEN_HEIGHT = 600;
    
    const RED = "#ff0000";
    const LIGHT_BLUE = "#add8e6";
    
    const BACKGROUND_COLOUR = RED;
     
    ...
    ```
1. get esbuild to transpile the updated `/src/main.ts` -> `/public/game.js`

    At the terminal, run:
    
    ```bash
    npx esbuild src/main.ts --bundle --outfile=public/game.js
    ```

    TERMINAL DUMP:
    ```bash
    $ npx esbuild src/main.ts --bundle --outfile=public/game.js
    
      public/game.js  447b
    
    ⚡ Done in 2ms
    ```

1. refresh the HTML page view, to see the new JS code executed:

    Now, for the document tab for `index.html` use the context (right-mouse button) menu, and reload the document
    - you should now see the updated JS code run showing a RED background to our canvas rectangle
    
    ![Celbridge reopen index.HTML to see red background](README_images/6_reopen_red.bmp)



## Exercise 2-6: make life easier with npm scripts

It's annoying to have to repeat long CLI commands like:

```bash
npx esbuild src/main.ts --bundle --outfile=public/game.js
```

There is a solution! We can add a `"scripts"` section to `package.json` with shortcuts for such instructions.


1. Replace the contents of `package.json` with the following:

    ```json
    {
      "name": "ts101-part02",
      "version": "1.0.0",
      "private": true,
      "type": "module",
      "scripts": {
        "build": "esbuild src/main.ts --bundle --outfile=public/game.js",
        "check": "tsc --noEmit",
        "serve": "esbuild --servedir=public --serve=127.0.0.1:8000"
      },
      "devDependencies": {
        "esbuild": "^0.25.0",
        "typescript": "^5.9.0"
      }
    }
    ```

1. Delete `/public/game.js`

1. Regenerate `/public/game.js` from  `/src/main.ts` with our shortcut

    - type `npm run build` at the command line

   TERMINAL DUMP:
    ```bash
    $ npm run build

    > ts101-part02@1.0.0 build
    > esbuild src/main.ts --bundle --outfile=public/game.js

      public/game.js  447b

    ⚡ Done in 1ms
    ```

Our scripts have created 3 shortcuts for us:

- `npm run build`
  - this runs `esbuild src/main.ts --bundle --outfile=public/game.js`
  - which transpiles  `/src/main.ts` into `/public/game.js`

- `npm run check`
    - this runs `tsc --noEmit`
    - which runs a static code check on the TS files in `/src` (using the settings in `tsconfig.json`)

- `npm run serve`
    - this runs a local web server, so you can view `/public` at http://127.0.0.1:8000/ in your web browser
    - press Ctrl+C to stop the server
