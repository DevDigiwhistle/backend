import { type Request, type Response } from 'express'
import { errorHandler } from '../../utils'
import { Enum } from '../../constants'
import { responseHandler } from '../../utils/responseHandler'
import { IUserService } from '../modules/auth/interface'

interface IAuthController {
  signUpController: (req: Request, res: Response) => Promise<Response>
  logInController: (req: Request, res: Response) => Promise<Response>
  resetPasswordController(req: Request, res: Response): Promise<Response>
  sendResetPasswordEmailController(
    req: Request,
    res: Response
  ): Promise<Response>
}

class AuthController implements IAuthController {
  private readonly authService: IUserService

  constructor(authService: IUserService) {
    this.authService = authService
  }

  async signUpController(req: Request, res: Response): Promise<Response> {
    try {
      const resp = await this.authService.signUp(req.body)

      return responseHandler(
        Enum.RESPONSE_CODES.CREATED,
        res,
        'SignUp Successfully!!',
        { token: resp }
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  async logInController(req: Request, res: Response): Promise<Response> {
    try {
      const resp = await this.authService.logIn(req.body)

      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Login Successfully!!',
        { token: resp }
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  async sendResetPasswordEmailController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.authService.emailResetPasswordLink(req.body.email)

      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Email Sent Successfully!!',
        {}
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  async resetPasswordController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.authService.resetPassword(req.body)

      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Password updated Successfully!!',
        {}
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}

export { type IAuthController, AuthController }
