import { Router } from 'express'
import { agencyProfileService } from '../modules/brands'
import { AgencyProfileController } from '../controller'
import { authorizeUser, verifyToken } from '../middleware'
import { Enum } from '../../constants'
import { BaseValidator } from '../../utils'
import {
  addAgencyProfileSchema,
  updateAgencyProfileSchema,
} from '../modules/brands/validators'

const agencyRouter = Router()

const agencyProfileController = new AgencyProfileController(
  agencyProfileService
)
const addAgencyProfileValidator = new BaseValidator(addAgencyProfileSchema)
const updateAgencyProfileValidator = new BaseValidator(
  updateAgencyProfileSchema
)

agencyRouter.post(
  '/profile',
  addAgencyProfileValidator.validateInput.bind(addAgencyProfileValidator),
  agencyProfileController.addController.bind(agencyProfileController)
)

agencyRouter.get(
  '/profile',
  verifyToken,
  agencyProfileController.getByUserIdController.bind(agencyProfileController)
)

agencyRouter.patch(
  '/profile/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.AGENCY, Enum.ROLES.EMPLOYEE, Enum.ROLES.ADMIN]),
  updateAgencyProfileValidator.validateInput.bind(updateAgencyProfileValidator),
  agencyProfileController.updateController.bind(agencyProfileController)
)

export default agencyRouter
