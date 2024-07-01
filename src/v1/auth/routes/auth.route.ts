import Router from 'express'
import { AuthController } from '../controller/auth.controller'
import { UserService } from '../service'
import { UserCRUD } from '../crud'

const authRouter = Router()
const authCrud = new UserCRUD()
const authService = new UserService(authCrud)
const authController = new AuthController(authService)

authRouter.post('/signup', authController.signUpController)

export default authRouter
