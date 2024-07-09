import Router from 'express'
import { AuthController } from '../controller/auth.controller'
import { userService } from '../modules/auth'


const authRouter = Router()

const authController=new AuthController(userService)

authRouter.post('/signup', authController.signUpController.bind(authController))

export default authRouter
