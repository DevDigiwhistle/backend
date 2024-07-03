import { type Request, type Response } from 'express'
import { errorHandler } from '../../utils'
import { Enum } from '../../constants'
import { responseHandler } from '../../utils/responseHandler'
import { IUserService } from '../modules/auth/interface'

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

      return responseHandler(Enum.RESPONSE_CODES.CREATED, res, 'SignUp Successful!!', resp)
    } catch (e) {
      return await errorHandler(e,res)

    }
  }
}

export { type IAuthController, AuthController }
