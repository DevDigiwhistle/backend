import { Router } from 'express'
import { brandProfileService } from '../modules/brands'
import { BrandProfileController } from '../controller'
import { authorizeUser, verifyToken } from '../middleware'
import { Enum } from '../../constants'
import { BaseValidator } from '../../utils'
import {
  addBrandProfileSchema,
  updateBrandProfileSchema,
} from '../modules/brands/validators'

const brandRouter = Router()

const brandProfileController = new BrandProfileController(brandProfileService)
const addBrandProfileValidator = new BaseValidator(addBrandProfileSchema)
const updateBrandProfileValidator = new BaseValidator(updateBrandProfileSchema)

brandRouter.post(
  '/profile',
  addBrandProfileValidator.validateInput.bind(addBrandProfileValidator),
  brandProfileController.addController.bind(brandProfileController)
)

brandRouter.get(
  '/profile',
  verifyToken,
  authorizeUser([Enum.ROLES.BRAND]),
  brandProfileController.getByUserIdController.bind(brandProfileController)
)

brandRouter.put(
  '/profile/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.BRAND]),
  updateBrandProfileValidator.validateInput.bind(updateBrandProfileValidator),
  brandProfileController.updateController.bind(brandProfileController)
)

export default brandRouter
