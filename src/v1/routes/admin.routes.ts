import { Router } from 'express'
import { adminProfileService } from '../modules/admin'
import { AdminProfileController } from '../controller/admin-profile-controller'

const adminRouter = Router()

const adminProfileController = new AdminProfileController(adminProfileService)

adminRouter.post(
  '/profile',
  adminProfileController.addController.bind(adminProfileController)
)

adminRouter.get(
  '/profile',
  adminProfileController.getByUserIdController.bind(adminProfileController)
)

export default adminRouter
