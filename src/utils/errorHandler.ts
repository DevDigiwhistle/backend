import { Response } from 'express'
import HttpException from './HttpException'
import { Enum } from '../constants'

export const errorHandler = async (
  e: any,
  res: Response
): Promise<Response> => {
  console.log("Error in controller--->",e)
  if (e instanceof HttpException)
    return res
      .status(e.errorCode)
      .json({ message: e.message, status: Enum.RESPONSE_STATES.ERROR })
  else
    return res
      .status(Enum.RESPONSE_CODES.INTERNAL_SERVER_ERROR)
      .json({
        message: e?.message ?? 'Internal Server Error',
        status: Enum.RESPONSE_STATES.ERROR,
      })
}
