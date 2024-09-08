import { Router } from 'express'
import { CampaignController } from '../controller/campaign-controller'
import { userService } from '../modules/user'
import {
  campaignService,
  campaignParticipantsService,
} from '../modules/campaign'
import {
  addCampaignSchema,
  updateCampaignSchema,
} from '../modules/campaign/validators/campaign-validator'
import { BaseValidator } from '../../utils'
import { Enum } from '../../constants'
import { authorizeUser, verifyToken } from '../middleware'
import { employeeProfileService } from '../modules/admin'

const campaignRouter = Router()
const campaignController = new CampaignController(
  campaignService,
  campaignParticipantsService,
  userService,
  employeeProfileService
)

const addCampaignValidator = new BaseValidator(addCampaignSchema)
const updateCampaignValidator = new BaseValidator(updateCampaignSchema)

campaignRouter.post(
  '/',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  addCampaignValidator.validateInput.bind(addCampaignValidator),
  campaignController.addController.bind(campaignController)
)

campaignRouter.get(
  '/',
  verifyToken,
  campaignController.getAllController.bind(campaignController)
)

campaignRouter.patch(
  '/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  updateCampaignValidator.validateInput.bind(updateCampaignValidator),
  campaignController.updateController.bind(campaignController)
)

campaignRouter.get(
  '/search-by-email',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  campaignController.findInfluencerAndAgencyController.bind(campaignController)
)

campaignRouter.get(
  '/search-employees',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  campaignController.findAllEmployeesController.bind(campaignController)
)

campaignRouter.delete(
  '/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  campaignController.deleteController.bind(campaignController)
)

export default campaignRouter
