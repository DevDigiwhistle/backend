import Router from 'express'
import { AuthController } from '../controller'
import { userService } from '../modules/auth'
import { BaseValidator } from '../../utils'
import {
  resetPasswordSchema,
  resetPasswordEmailSchema,
  authSchema,
} from '../modules/auth/validators'

const authRouter = Router()

const authController = new AuthController(userService)
const authValidators = new BaseValidator(authSchema)
const resetPasswordValidators = new BaseValidator(resetPasswordSchema)
const resetPasswordEmailValidators = new BaseValidator(resetPasswordEmailSchema)

authRouter.post(
  '/signup',
  authValidators.validateInput.bind(authValidators),
  authController.signUpController.bind(authController)
)

authRouter.post(
  '/login',
  authValidators.validateInput.bind(authValidators),
  authController.logInController.bind(authController)
)

authRouter.post(
  '/reset-password',
  resetPasswordValidators.validateInput.bind(resetPasswordValidators),
  authController.resetPasswordController.bind(authController)
)

authRouter.post(
  '/reset-password-email',
  resetPasswordEmailValidators.validateInput.bind(resetPasswordEmailValidators),
  authController.sendResetPasswordEmailController.bind(authController)
)

export default authRouter
