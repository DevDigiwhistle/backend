import { AdminProfile, EmployeeProfile } from './models'
import { AdminProfileCRUD, EmployeeProfileCRUD } from './crud'
import { AdminProfileService, EmployeeProfileService } from './services'

const employeeProfileCRUD = EmployeeProfileCRUD.getInstance(EmployeeProfile)
const employeeProfileService =
  EmployeeProfileService.getInstance(employeeProfileCRUD)

const adminProfileCRUD = AdminProfileCRUD.getInstance(AdminProfile)
const adminProfileService = AdminProfileService.getInstance(adminProfileCRUD)

export { adminProfileService, employeeProfileService }
