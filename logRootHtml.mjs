/**
 * Arche HTML Server may be freely distributed under the CFOSS license.
 */

import getRootHtml from './getRootHtml.mjs'

const html = getRootHtml()
process.stdout.write(html)
