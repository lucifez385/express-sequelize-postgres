
import { createServer } from 'http'
import app from './app'
import {
  appEnv,
  nodePort,
} from './config'

const debug = require('debug')('express-sequelize-postgres:server')

const task = appEnv || 'development'

/**
 * Create HTTP server.
 */

const server = createServer(app)


/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const ports = parseInt(val, 10)

  if (Number.isNaN(ports)) {
    // named pipe
    return val
  }

  if (ports >= 0) {
    // port number
    return ports
  }

  return false
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(nodePort || '3000')
app.set('port', port)


/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}


/**
 * Listen on provided port, on all network interfaces.
 */

if (task !== 'test') {
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
    console.info(`Server is running at port: ${port}`)
}