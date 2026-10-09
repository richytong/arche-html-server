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

export default ReadableText
