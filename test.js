process.env.NODE_ENV = 'test'

const assert = require('assert')
const HTTP = require('presidium/HTTP')
const Readable = require('presidium/Readable')
const ArcheHTMLServer = require('./ArcheHTMLServer.js')

async function test_0() {
  const htmlServer = new ArcheHTMLServer(`${__dirname}/test-react/Root1.js`)

  let _resolve
  const promise = new Promise(resolve => {
    _resolve = resolve
  })

  htmlServer.listen(7357, _resolve)

  await promise

  htmlServer.close()
}

async function test_1() {
  const htmlServer = new ArcheHTMLServer(`${__dirname}/test-react/Root1.js`, {
    scriptImports: [
      `${__dirname}/test-react/script1.js`,
    ],
    htmlHandler(html, request, response) {
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/html',
      })
      response.end(html)
    },
  })

  let _resolve
  const promise = new Promise(resolve => {
    _resolve = resolve
  })

  htmlServer.listen(7358, _resolve)

  await promise

  const http = new HTTP('http://localhost:7358/')

  const response = await http.POST('/', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      global: {
        a: 1,
        b: 'a',
        c: [1, 2, 3],
        d: { a: 1 }
      },
    })
  })

  assert.equal(response.status, 200)

  const html = await Readable.Text(response)

  assert.equal(html, `
<div><h1>Test</h1><p>s1v1</p><p>1</p><p>a</p><p>[1, 2, 3]</p><p>{"a":1}</p></div>
  `.trim())

  htmlServer.close()
}

async function test_2() {
  const htmlServer = new ArcheHTMLServer(`${__dirname}/test-react/Root2.js`, {
    scriptImports: [
      `${__dirname}/test-react/script2.js`,
    ],
  })

  let _resolve
  const promise = new Promise(resolve => {
    _resolve = resolve
  })

  htmlServer.listen(7359, _resolve)

  await promise

  const http = new HTTP('http://localhost:7359/')

  const response = await http.POST('/')

  assert.equal(response.status, 200)

  const html = await Readable.Text(response)

  assert.equal(html, `
<div class="outer-div" style="color: blue; background-color: black;" bool><div class="inner-div">1</div><div><p>dangerously-set</p></div></div>
  `.trim())

  htmlServer.close()
}

setImmediate(async () => {
  await test_0()
  await test_1()
  await test_2()
  console.log('success')
})
