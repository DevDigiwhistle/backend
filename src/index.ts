import cors from 'cors'
``
import dotenv from 'dotenv'
dotenv.config({ debug: true })

import express, { type Request, type Response } from 'express'
import { AppDataSource } from './config'
import authRouter from './v1/auth/routes'

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.use('/auth', authRouter)

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
      console.log(e)
    })
})

process.on('uncaughtException', (err: any) => {
  console.error(err)
})

process.on('unhandledRejection', (err: any) => {
  console.error(err)
})
