import { Router } from 'express'
import { influencerProfileService } from '../modules/influencer'
import { InfluencerProfileController } from '../controller/influencer-profile-controller'
import { authorizeUser } from '../middleware'
import { Enum } from '../../constants'

const influencerRouter = Router()

const influencerProfileController = new InfluencerProfileController(
  influencerProfileService
)

influencerRouter.post(
  '/profile',
  authorizeUser([Enum.ROLES.INFLUENCER]),
  influencerProfileController.addController.bind(influencerProfileController)
)

influencerRouter.get(
  '/profile',
  authorizeUser([Enum.ROLES.INFLUENCER]),
  influencerProfileController.getByUserIdController.bind(
    influencerProfileController
  )
)

export default influencerRouter
