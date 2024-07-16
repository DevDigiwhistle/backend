import { EmployeeProfile } from './models'
import { EmployeeProfileCRUD } from './crud'
import { EmployeeProfileService } from './services'

const employeeProfileCRUD = EmployeeProfileCRUD.getInstance(EmployeeProfile)
const employeeProfileService =
  EmployeeProfileService.getInstance(employeeProfileCRUD)

export { employeeProfileService }
