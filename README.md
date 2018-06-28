## Introduction

Weepub aims to help projects publish to npm different versions of their library for different environments (UMD, minified UMD, ES modules, common js, original source).  

## Use Case

Although not advised, there are some use cases for adding a different version of a library to your project.  Here are a couple:
  - to decrease install time
  - to replace places where a minified file is already being used in the project

## Notes

There are some things to consider when opting-in to using different versions of a library:
  - increased difficulty in debugging errors when minified
  - treeshaking is not possible when minified

## Example

- Create folders:
For each different version of the library, create a separate directory with a package.json file.  It's likely that the directory already exists and contains the file you want to publish as a separate npm module.  If that's the case, simply add a valid package.json file to the directory.
```
redux/
...cjs/package.json
...es/package.json
...umd/package.json
...umd-min/package.json
```

- Install:
```
npm install weepub --save-dev
```

- Configure:
```
const weepub = require('weepub');

const options =   {
  packages: [
    {
      name: 'cjs',
      source: 'lib/redux.js'
    },
    {
      name: 'es',
      source: 'es/redux.js'
    },
    {
      name: 'umd',
      source: 'dist/redux.js'
    },
    {
      name: 'umd-min',
      source: 'dist/redux.min.js'
    }
  ]
};
```

- Publish:
```
weepub( options ).publish();
```
