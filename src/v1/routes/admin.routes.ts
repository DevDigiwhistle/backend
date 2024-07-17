import { Router } from 'express'
import { adminProfileService } from '../modules/admin'
import { AdminProfileController } from '../controller/admin-profile-controller'
import { authorizeUser } from '../middleware'
import { Enum } from '../../constants'

const adminRouter = Router()

const adminProfileController = new AdminProfileController(adminProfileService)

adminRouter.post(
  '/profile',
  authorizeUser([Enum.ROLES.ADMIN]),
  adminProfileController.addController.bind(adminProfileController)
)

adminRouter.get(
  '/profile',
  authorizeUser([Enum.ROLES.ADMIN]),
  adminProfileController.getByUserIdController.bind(adminProfileController)
)

export default adminRouter
