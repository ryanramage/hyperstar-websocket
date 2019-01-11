const http = require('http')
const Websocket = require('websocket-stream')
const handler = require('serve-handler')
const datKeyUrl = '/___dat___'
const public = 'dist'

exports.withDrive = function (archive, options) {
  if (!options) options = {}
  if (!options.datKeyUrl) options.datKeyUrl = datKeyUrl
  if (!options.public) options.public = public

  let server = http.createServer((request, response) => {
    if (request.url === options.datKeyUrl) {
      response.write(archive.key.toString('hex'))
      return response.end()
    }
    return handler(request, response, {
      public: options.public
    })
  })
  Websocket.createServer({
    perMessageDeflate: false,
    server: server
  }, websocketHandler.bind(null, archive))
  return server
}

function websocketHandler (archive, stream, req) {
  stream.on('error', e => console.log('getWebsocketHandler has error: ' + e))
  const replication = archive.replicate({ live: true })
  // Relay error events
  replication.on('error', e => stream.emit('error', e))
  stream.pipe(replication).pipe(stream)
}
