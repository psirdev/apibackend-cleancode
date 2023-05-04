import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { router as businessEndpoint } from './routes/business-endpoint'
const mongoose = require('mongoose')

dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/business', businessEndpoint)

app.use('/', (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: 'Pong!' })
})

console.info(
  `🚀[Core]: Trying to connect db in driver mode:` +
    process.env.TYPE_DRIVER_BD
)

switch (process.env.TYPE_DRIVER_BD) {
  case 'in_memory':
    const { MongoMemoryServer } = require('mongodb-memory-server')
    ;(async () => {
      const mongod = new MongoMemoryServer()
      await mongod.start()
      const mongoUri = mongod.getUri()
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    })()
    break
  case 'mongodb':
    ;(async () => {
      await mongoose.connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    })()
    break
}

export default app
