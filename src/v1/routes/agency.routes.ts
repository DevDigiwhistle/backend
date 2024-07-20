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
  agencyProfileController.addController.bind(AgencyProfileController)
)

agencyRouter.get(
  '/profile',
  verifyToken,
  authorizeUser([Enum.ROLES.AGENCY]),
  agencyProfileController.getByUserIdController.bind(AgencyProfileController)
)

agencyRouter.put(
  '/profile/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.AGENCY]),
  updateAgencyProfileValidator.validateInput.bind(updateAgencyProfileValidator),
  agencyProfileController.updateController.bind(AgencyProfileController)
)

export default agencyRouter
