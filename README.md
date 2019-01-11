hyperstar-websocket
===================

Make hyper(core|drive) easier to use in the browser - as a client/server

Server API
==============
```
const hcws = require('hyperstar-websocket')
const hyperdrive = require('hyperdrive')
const archive = hyperdrive('/tmp/myhyperdrive')
const server = hcws.withDrive(archive, [options])
server.listen(7752, err => console.log('server started', err))
```

Creates a node http server.

`archive` is a hyperdrive
`options` include

```
{
  datKeyUrl: '/___dat___', // this url on the node http server will return the dat key
  public: 'dist', // use serve-handler to serve your assets from this dir
}
```

Browser API
===========

```
const hcws = requre('hyperstar-websocket/client')
const hyperdrive = require('hyperdrive')

hcws.hyperdriveArchive(hyperdrive, [options], function (archive) {
  // use the archive
})
```

Create an archive connected to the websocket from the http server address.

`hyperdrive` is the hyperdrive module.
`options` include

```
{
  socketUrl: 'ws://' + window.location.host // where to connect to
  datKeyUrl: '/___dat___', // should match the node server setting
}
```
