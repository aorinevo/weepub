## Introduction

Weepub aims at helping projects publish different versions of their library for different environments (UMD, minified UMD, ES modules, common js, original source).  

## Use Case

One use case involves consumers of libraries that want to opt-in as-is but optimize the install step.  

## Example

- Create folder structure:
For each different environment, create a separate directory with a package.json file.
```
redux/
...cjs/package.json
...es/package.json
...umd/package.json
...umd-min/package.json
```

- Install:
```
npm install weepub
```

- Configure:
```
import weepub from 'weepub'

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
weepub.config( options ).publish();
```