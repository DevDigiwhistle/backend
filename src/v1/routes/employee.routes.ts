import { Router } from 'express'
import { employeeProfileService } from '../modules/employee'
import { EmployeeProfileController } from '../controller/employee-profile-controller'
import { Enum } from '../../constants'
import { authorizeUser } from '../middleware'

const employeeRouter = Router()

const employeeProfileController = new EmployeeProfileController(
  employeeProfileService
)

employeeRouter.post(
  '/profile',
  authorizeUser([Enum.ROLES.EMPLOYEE]),
  employeeProfileController.addController.bind(employeeProfileController)
)

employeeRouter.get(
  '/profile',
  authorizeUser([Enum.ROLES.EMPLOYEE]),
  employeeProfileController.getByUserIdController.bind(
    employeeProfileController
  )
)

employeeRouter.put(
  '/profile/:id',
  authorizeUser([Enum.ROLES.EMPLOYEE]),
  employeeProfileController.updateController.bind(employeeProfileController)
)

export default employeeRouter
