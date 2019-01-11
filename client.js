const http = require('http')
const Websocket = require('websocket-stream/stream.js')
const randomAccessIdb = require('random-access-idb')
const datKeyUrl = '/___dat___'

exports.hyperdriveArchive = function(hyperdrive, options, done) {
  if (!done && typeof options === 'function') {
    done = options
    options = {}
  }
  if (!options) options = {}
  if (!options.socketUrl) options.socketUrl = 'ws://' + window.location.host
  if (!options.datKeyUrl) options.datKeyUrl = datKeyUrl
  console.log(options.socketUrl)
  http.get({ path:  options.datKeyUrl}, res => {
    res.on('data', buf => {
      let key = buf.toString()
      const ram = randomAccessIdb(key)
      const archive = hyperdrive(ram, key)
      const socket = Websocket(options.socketUrl)
      socket.pipe(archive.replicate()).pipe(socket)
      archive.once('ready',  () => done(archive))
    })
  })
}
