/* eslint-disable @typescript-eslint/space-before-function-paren */
import { type Request, type Response } from 'express'
import { type IUserService } from '../service'
import { errorHandler } from '../../../utils'
import { Enum } from '../../../constants'
import { responseHandler } from '../../../utils/responseHandler'

interface IAuthController {
  signUpController: (req: Request, res: Response) => Promise<Response>
  //   logInController: (req: Request, res: Response) => Promise<Response>
}

class AuthController implements IAuthController {
  private readonly authService: IUserService

  constructor(authService: IUserService) {
    this.authService = authService
  }

  async signUpController(req: Request, res: Response): Promise<Response> {
    try {
      const resp = await this.authService.signUp(req.body)

      return responseHandler(Enum.RESPONSE_CODES.CREATED, res, 'SignUp Successfull!!', { token: resp })
    } catch (e) {
      return await errorHandler(e?.errorCode, e?.message)
    }
  }
}

export { type IAuthController, AuthController }
