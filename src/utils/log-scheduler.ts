import fs from 'fs'
import { uploadFileToFirebase } from './upload-file'

export const logsScheduler = async () => {
  uploadFileToFirebase(
    './logs/error.log',
    `logs/${new Date().toISOString()[0]}-error.log`
  )
    .then(() => {
      fs.writeFileSync('./logs/error.log', '')
    })
    .catch(() => {
      fs.writeFileSync('./logs/error.log', '')
    })

  uploadFileToFirebase(
    './logs/combined.log',
    `logs/${new Date().toISOString()[0]}-combined.log`
  )
    .then(() => {
      fs.writeFileSync('./logs/combined.log', '')
    })
    .catch(() => {
      fs.writeFileSync('./logs/combined.log', '')
    })
}
