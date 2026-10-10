# Arche HTML Server

HTML server for [vanilla microfrontends](https://arche.gallery/).

Source code: [GitHub](https://github.com/richytong/arche-html-server) |
License: [CFOSS](https://cloutsworld.com/en-us/legal/license/cfoss)

![Node.js CI](https://github.com/richytong/arche-html-server/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/richytong/arche-html-server/graph/badge.svg?token=G7V5X2JMLI)](https://codecov.io/gh/richytong/arche-html-server)
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
const HTTP = require("presidium/HTTP")

const htmlServer = new ArcheHTMLServer("/path/to/react/Root.js")

htmlServer.listen(8081, () => {
  console.log("HTML server listening on port 8081")
})

const htmlClient = new HTTP("http://localhost:8081/")

await htmlClient.POST("/", {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    global: {
      windowVarA: 1,
      windowVarB: "example",
      windowVarC: [1, 2, 3],
      windowVarD: { a: 1 },
    },
  }),
})
```

## Docs

### ArcheHTMLServer

```coffeescript [specscript]
module http "https://nodejs.org/api/http.html"

type HtmlHandler = (
  html string,
  request http.ClientRequest,
  response http.ServerResponse
)=>Promise<>|undefined

new ArcheHTMLServer(rootImport string, options {
  scriptImports: Array<string>,
  htmlHandler: HtmlHandler,
}) -> ArcheHTMLServer
```

Arche HTML Server class. Creates an HTTP server that serves HTML from the root of an Arche application. An Arche application is a software application that uses the [Arche](https://arche.gallery/) library.

Supported libraries with Arche:
  * [React](https://react.dev/)
  * [Styled Components](https://styled-components.com/)
  * [document](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

Arguments:
  * `rootImport` - `string` - The file path to the root file of the Arche application.
  * `options`
    * `scriptImports` - `Array<string>` - An array of urls of scripts to import within a render of an Arche application using the `import` statement. Defaults to `[]`.
    * `htmlHandler` - `HtmlHandler` - A function that defines how the Arche HTML server will handle the rendered HTML. Defaults to a handler that responds with status code 200 and the rendered HTML.

API:
```
POST <url string>
Content-Type: application/json

{
  "global": <Object<string|number|Array|Object>>
}
```
  * Request Url `url` - `<string>` - The value of location.pathname that will be available to the rendered client application.
  * Request Headers:
      * `Content-Type` - The type of content that will be sent in the request body. Should be `application/json`.
  * Request Body - The JSON data for the render of the client application. Should only include the `"global"` object. Properties of the `"global"` object will be directly set on the global `window` object that will be available to the rendered client application.

API Example:
```
POST /dashboard
Content-Type: application/json

{
  "global": {
    "companyName": "Example",
    "companyLogoImageUrl": "Example-logo.jpg",
    "employees": [
      { name: 'Example Employee', title: 'Product Manager' },
      { name: 'Example Employee', title: 'Software Engineer' }
    ]
  }
}
```

#### listen

```coffeescript [specscript]
listen(port number) -> ()
listen(port number, callback function) -> ()
```

Runs the Arche HTML server.

Arguments:
  * `port` - `number` - The port number on which the Arche HTML server will listen.
  * `callback` - `function` - A function that is called after the Arche HTML server has started listening.

#### close

```coffeescript [specscript]
close() -> ()
```

Closes the Arche HTML server.

## License

Arche HTML Server is distributed under the [CFOSS License](https://cloutsworld.com/en-us/legal/license/cfoss).

# Support

  * minimum Node.js version: 16

## Supported Platforms

  * Linux
