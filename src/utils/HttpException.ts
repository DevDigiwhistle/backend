import { Enum } from '../constants'

class HttpException extends Error {
  errorCode: number

  constructor(
    errorCode: number,
    public readonly message: string | any
  ) {
    super(message ?? 'Internal Server Error')
    this.errorCode = errorCode ?? Enum.RESPONSE_CODES.INTERNAL_SERVER_ERROR
  }
}

export default HttpException
