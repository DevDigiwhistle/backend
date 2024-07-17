import { Router } from 'express'
import { influencerProfileService } from '../modules/influencer'
import { InfluencerProfileController } from '../controller/influencer-profile-controller'

const influencerRouter = Router()

const influencerProfileController = new InfluencerProfileController(
  influencerProfileService
)

influencerRouter.post(
  '/profile',
  influencerProfileController.addController.bind(influencerProfileController)
)

influencerRouter.get(
  '/profile',
  influencerProfileController.getByUserIdController.bind(
    influencerProfileController
  )
)

export default influencerRouter
