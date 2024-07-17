import { Router } from 'express'
import { brandProfileService } from '../modules/brands'
import { BrandProfileController } from '../controller/brand-profile-controller'

const brandRouter = Router()

const brandProfileController = new BrandProfileController(brandProfileService)

brandRouter.post(
  '/profile',
  brandProfileController.addController.bind(brandProfileController)
)

brandRouter.get(
  '/profile',
  brandProfileController.getByUserIdController.bind(brandProfileController)
)

export default brandRouter
