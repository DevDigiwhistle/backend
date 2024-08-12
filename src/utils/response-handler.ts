import { type Response } from 'express'
import { Enum } from '../constants'

export const responseHandler = (
  statusCode: number,
  res: Response,
  message: string,
  data: any
): Response => {
  return res.status(statusCode).json({
    message,
    status: Enum.RESPONSE_STATES.SUCCESS,
    data
  })
}
