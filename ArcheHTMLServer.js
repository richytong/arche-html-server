const http = require('http')
const cluster = require('cluster')
const os = require('os')
const { execFile } = require('child_process')

/**
 * @name ReadableText
 *
 * @docs
 * ```coffeescript [specscript]
 * module stream "https://nodejs.org/api/stream.html"
 *
 * ReadableText(readable stream.Readable) -> text Promise<string>
 * ```
 */
function ReadableText(readable) {
  return new Promise((resolve, reject) => {
    const chunks = []
    readable.on('data', chunk => {
      chunks.push(chunk)
    })
    readable.on('end', () => {
      resolve(chunks.map(chunk => chunk.toString('utf8')).join(''))
    })
    readable.on('error', reject)
  })
}

/**
 * @name defaultHtmlHandler
 *
 * @docs
 * ```coffeescript [specscript]
 * module http "https://nodejs.org/api/http.html"
 *
 * defaultHtmlHandler(
 *   html string,
 *   request http.ClientRequest,
 *   response http.ServerResponse
 * ) -> ()
 * ```
 */
function defaultHtmlHandler(html, request, response) {
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html',
  })
  response.end(html)
}

/**
 * @name ArcheHTMLServer
 *
 * @docs
 * ```coffeescript [specscript]
 * module http "https://nodejs.org/api/http.html"
 *
 * new ArcheHTMLServer(rootImport, options {
 *   scriptImports: Array<string>,
 *   htmlHandler: (
 *     html string,
 *     request http.ClientRequest,
 *     response http.ServerResponse
 *   )=>Promise<>|undefined,
 * }) -> ArcheHTMLServer
 * ```
 */
class ArcheHTMLServer {
  constructor(rootImport, options = {}) {
    const scriptImports = options.scriptImports ?? []
    const htmlHandler = options.htmlHandler ?? defaultHtmlHandler

    this.server = http.createServer(async (request, response) => {
      const url = new URL(`http://*${request.url}`)
      const text = await ReadableText(request)
      const data = text ? JSON.parse(text) : {}
      const { global = {} } = data

      const html = await new Promise(resolve => {
        let output = ''
        const cmd = execFile('node', [`${__dirname}/logRootHtml.mjs`], {
          env: {
            ...process.env,
            URL: request.url,
            GLOBAL: JSON.stringify(global),
            ROOT_IMPORT: rootImport,
            SCRIPT_IMPORTS: JSON.stringify(scriptImports),
          },
        })
        cmd.stdin.write(JSON.stringify({ global, url: request.url }))
        cmd.stdin.end()
        cmd.stdout.on('data', buf => {
          output += buf.toString('utf8')
        })
        cmd.stderr.pipe(process.stderr)
        cmd.on('close', code => {
          resolve(output)
        })
      })

      htmlHandler(html, request, response)
    })
  }

  /**
   * @name listen
   *
   * @docs
   * ```coffeescript [specscript]
   * listen(port number, callback function) -> ()
   * ```
   */
  listen(port, callback) {
    this.server.listen(port, callback)
  }

  /**
   * @name close
   *
   * @docs
   * ```coffeescript [specscript]
   * close() -> ()
   * ```
   */
  close() {
    this.server.close()
  }
}

module.exports = ArcheHTMLServer
