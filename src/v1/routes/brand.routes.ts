import { Router } from 'express'
import { brandProfileService } from '../modules/brands'
import { BrandProfileController } from '../controller/brand-profile-controller'
import { authorizeUser } from '../middleware'
import { Enum } from '../../constants'

const brandRouter = Router()

const brandProfileController = new BrandProfileController(brandProfileService)

brandRouter.post(
  '/profile',
  authorizeUser([Enum.ROLES.BRAND]),
  brandProfileController.addController.bind(brandProfileController)
)

brandRouter.get(
  '/profile',
  authorizeUser([Enum.ROLES.BRAND]),
  brandProfileController.getByUserIdController.bind(brandProfileController)
)

export default brandRouter
