import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config({ debug: true })

const PORT = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.get('*', (req: Request, res: Response) => {
  res.status(403).send('Sorry, the page you requested was not found.')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

process.on('uncaughtException', (err: any) => {
  console.error(err)
  process.exit(1)
})

process.on('unhandledRejection', (err: any) => {
  console.error(err)
  process.exit(1)
})
