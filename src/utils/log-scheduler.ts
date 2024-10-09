import fs from 'fs'
import { uploadFileToFirebase } from './upload-file'

export const logsScheduler = async () => {
  await uploadFileToFirebase(
    './logs/error.log',
    `logs/${new Date().toISOString()[0]}-error.log`
  )
    .then(() => {})
    .catch(() => {})

  await uploadFileToFirebase(
    './logs/combined.log',
    `logs/${new Date().toISOString()[0]}-combined.log`
  )
    .then(() => {})
    .catch(() => {})

  fs.writeFileSync('./logs/error.log', '')
  fs.writeFileSync('./logs/combined.log', '')
}
