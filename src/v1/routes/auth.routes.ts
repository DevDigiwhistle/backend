import Router from 'express'
import { AuthController } from '../controller/auth.controller'
import { UserCRUD } from '../modules/auth/crud'
import { UserService } from '../modules/auth/service'
import { User } from '../modules/auth/models'

const authRouter = Router()

const userCRUD=new UserCRUD(User)
const userService=new UserService(userCRUD)
const authController=new AuthController(userService)

authRouter.post('/signup', authController.signUpController.bind(authController))

export default authRouter
