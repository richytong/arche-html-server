# Arche HTML Server

HTML server for [vanilla microfrontends](https://arche.gallery/blog/vanilla-microfrontends).

Source code: [GitHub](https://github.com/richytong/arche-html-server) |
License: [CFOSS](https://cloutsworld.com/en-us/legal/license/cfoss)

![Node.js CI](https://github.com/richytong/arche-html-server/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/richytong/arche-html-server/branch/master/graph/badge.svg)](https://codecov.io/gh/richytong/arche-html-server)
[![npm version](https://img.shields.io/npm/v/arche-html-server.svg?style=flat)](https://www.npmjs.com/package/arche-html-server)

## Installation

with [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
```bash
npm i arche-html-server
```

require Arche HTML Server in [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules):
```javascript
const ArcheHTMLServer = require("arche-html-server")
```

## Usage

```javascript
const ArcheHTMLServer = require("arche-html-server")

const htmlServer = new ArcheHTMLServer("/path/to/react/Root.js")

htmlServer.listen(8081, () => {
  console.log("HTML server listening on port 8081")
})
```

## License

Arche HTML Server is distributed under the [CFOSS License](https://cloutsworld.com/en-us/legal/license/cfoss).

# Support

  * minimum Node.js version: 16

## Supported Platforms

  * Linux
