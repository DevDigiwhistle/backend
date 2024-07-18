import { Router } from 'express'
import { adminProfileService } from '../modules/admin'
import { AdminProfileController } from '../controller/admin-profile-controller'
import { authorizeUser } from '../middleware'
import { Enum } from '../../constants'
import { BaseValidator } from '../../utils'
import {
  addAdminProfileSchema,
  updateAdminProfileSchema,
} from '../modules/admin/validators'

const adminRouter = Router()

const adminProfileController = new AdminProfileController(adminProfileService)
const addAdminProfileValidator = new BaseValidator(addAdminProfileSchema)
const updateAdminProfileValidator = new BaseValidator(updateAdminProfileSchema)

adminRouter.post(
  '/profile',
  authorizeUser([Enum.ROLES.ADMIN]),
  addAdminProfileValidator.validateInput.bind(addAdminProfileSchema),
  adminProfileController.addController.bind(adminProfileController)
)

adminRouter.get(
  '/profile',
  authorizeUser([Enum.ROLES.ADMIN]),
  adminProfileController.getByUserIdController.bind(adminProfileController)
)

adminRouter.put(
  '/profile/:id',
  updateAdminProfileValidator.validateInput.bind(updateAdminProfileSchema),
  authorizeUser([Enum.ROLES.ADMIN]),
  adminProfileController.updateController.bind(adminProfileController)
)

export default adminRouter
