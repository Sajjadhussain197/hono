import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError } from 'stoker/middlewares'
import { pinoLogger } from './middlewares/pino-logger.ts'
import type { PinoLogger } from 'hono-pino'
import {config} from 'dotenv'

import { expand } from 'dotenv-expand'
import exp from 'constants'



expand(config())
type AppBindings ={ 
  variables: {
    logger: PinoLogger
  }
}
const app = new OpenAPIHono<AppBindings>()
app.use(pinoLogger())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/error',(c)=>{ 
  c.var.logger.info("wow! an error")
  throw new Error('Oh no!')
})

app.notFound(notFound)
app.onError(onError)
export default app