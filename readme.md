**Step 1**

- Initialize npm in the project [`npm init`]
- In the root of the project, create a file `index.js`
- Install package nodemon as development dependency (devDependencies) [`npm i nodemon --save-dev`]
- In `package.json` file add `"scripts"` to run `index.js`
- - `start` script that starts `index.js` with `node`
- - `start:dev` script that starts `index.js` with `nodemon`
    <code>
    //package.json
    ...
    "scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
    }
    ...
    </code>

**Step 2**

- Create a folder `db` in the root of the project. To store contacts, download and use the `contacts.json` file, putting it in the `db` folder.

- At the root of the project, create a `contacts.js` file.

- Make imports of modules `fs` and `path` to work with the file system
- Create a `contactsPath` variable and put the path to the `contacts.json` file in it. To compose a path, use the methods of the `path` module
- Add functions to work with a collection of contacts. In functions, use the `fs` module and its `readFile()` and `writeFile()` methods
  Make export of created functions via `module.exports`
