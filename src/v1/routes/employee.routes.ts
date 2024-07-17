import { Router } from 'express'
import { employeeProfileService } from '../modules/employee'
import { EmployeeProfileController } from '../controller/employee-profile-controller'

const employeeRouter = Router()

const employeeProfileController = new EmployeeProfileController(
  employeeProfileService
)

employeeRouter.post(
  '/profile',
  employeeProfileController.addController.bind(employeeProfileController)
)

employeeRouter.get(
  '/profile',
  employeeProfileController.getByUserIdController.bind(
    employeeProfileController
  )
)

export default employeeRouter
