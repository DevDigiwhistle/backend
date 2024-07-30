import { Router } from 'express'
import { influencerProfileService } from '../modules/influencer'
import { InfluencerProfileController } from '../controller/influencer-profile-controller'
import { authorizeUser, verifyToken } from '../middleware'
import { Enum } from '../../constants'
import { BaseValidator } from '../../utils'
import {
  addInfluencerProfileSchema,
  updateInfluencerProfileSchema,
} from '../modules/influencer/validators'

const influencerRouter = Router()

const influencerProfileController = new InfluencerProfileController(
  influencerProfileService
)
const addInfluencerProfileValidator = new BaseValidator(
  addInfluencerProfileSchema
)

const updateInfluencerProfileValidator = new BaseValidator(
  updateInfluencerProfileSchema
)

influencerRouter.post(
  '/profile',
  addInfluencerProfileValidator.validateInput.bind(
    addInfluencerProfileValidator
  ),
  influencerProfileController.addController.bind(influencerProfileController)
)

influencerRouter.get(
  '/profile',
  verifyToken,
  influencerProfileController.getByUserIdController.bind(
    influencerProfileController
  )
)

influencerRouter.put(
  '/profile/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.INFLUENCER, Enum.ROLES.EMPLOYEE, Enum.ROLES.ADMIN]),
  updateInfluencerProfileValidator.validateInput.bind(
    updateInfluencerProfileValidator
  ),
  influencerProfileController.updateController.bind(influencerProfileController)
)

export default influencerRouter
