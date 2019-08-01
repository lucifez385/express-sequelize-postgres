/**
 * Module dependencies.
 */

import compression from 'compression'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
// import expressValidator from 'express-validator'
// import customValidator from '../app/libs/customValidator'
import { appEnv } from './index'


const env = appEnv || 'development'

/**
 * Expose
 */

export default (app) => {
  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512,
  }))

  // app.use(expressValidator(customValidator))

  // bodyParser should be above methodOverride
  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method
      delete req.body._method
      return method
    }
  }))

  if (env === 'development') {
    app.locals.pretty = true
  }
}
