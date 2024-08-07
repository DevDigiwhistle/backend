import { ContactUsController } from '../controller'
import { contactUsFormService } from '../modules/landing'
import { BaseValidator } from '../../utils'
import { Router } from 'express'
import { contactUsFormSchema } from '../modules/landing/validators'
import { authorizeUser, verifyToken } from '../middleware'
import { Enum } from '../../constants'

const contactUsController = new ContactUsController(contactUsFormService)
const contactUsValidator = new BaseValidator(contactUsFormSchema)

const contactUsRouter = Router()

contactUsRouter.post(
  '/',
  contactUsValidator.validateInput.bind(contactUsValidator),
  contactUsController.addController.bind(contactUsController)
)

contactUsRouter.get(
  '/',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  contactUsController.getAllPaginated.bind(contactUsController)
)

contactUsRouter.post(
  '/view',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  contactUsController.setViewedController.bind(contactUsController)
)

contactUsRouter.delete(
  '/:id',
  contactUsController.deleteController.bind(contactUsController)
)

export default contactUsRouter
