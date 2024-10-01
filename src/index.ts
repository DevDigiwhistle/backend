import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ debug: true })

import express, { type Request, type Response } from 'express'
import { AppDataSource } from './config'
import apiRouter from './v1/routes'
import cron from 'node-cron'
import { logsScheduler } from './utils'

const app = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello world!!')
})

app.use('/v1', apiRouter)

app.get('*', (req: Request, res: Response) => {
  res.status(403).send('Sorry, the page you requested was not found.')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
  AppDataSource.initialize()
    .then(() => {
      console.log('Connected Successfully!!')
    })
    .catch((e) => {
      console.log(`Database error ${e}`)
    })
})

cron.schedule('0 0 * * *', () => {
  logsScheduler()
    .then(() => {
      console.log(`Done upload of logs at ${new Date()}`)
    })
    .catch((e) => {
      console.log(e)
    })
})

process.on('uncaughtException', (err: any) => {
  console.error(err)
})

process.on('unhandledRejection', (err: any) => {
  console.error(err)
})
