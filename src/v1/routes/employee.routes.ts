import { Router } from 'express'
import { employeeProfileService } from '../modules/employee'
import { EmployeeProfileController } from '../controller/employee-profile-controller'
import { Enum } from '../../constants'
import { authorizeUser, verifyToken } from '../middleware'
import { BaseValidator } from '../../utils'
import {
  addEmployeeProfileSchema,
  updateEmployeeProfileSchema,
} from '../modules/employee/validators'

const employeeRouter = Router()

const employeeProfileController = new EmployeeProfileController(
  employeeProfileService
)
const addEmployeeProfileValidator = new BaseValidator(addEmployeeProfileSchema)

const updateEmployeeProfileValidator = new BaseValidator(
  updateEmployeeProfileSchema
)

employeeRouter.post(
  '/profile',
  addEmployeeProfileValidator.validateInput.bind(addEmployeeProfileSchema),
  employeeProfileController.addController.bind(employeeProfileController)
)

employeeRouter.get(
  '/profile',
  verifyToken,
  authorizeUser([Enum.ROLES.EMPLOYEE]),
  employeeProfileController.getByUserIdController.bind(
    employeeProfileController
  )
)

employeeRouter.put(
  '/profile/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.EMPLOYEE]),
  updateEmployeeProfileValidator.validateInput.bind(
    updateEmployeeProfileSchema
  ),
  employeeProfileController.updateController.bind(employeeProfileController)
)

export default employeeRouter
