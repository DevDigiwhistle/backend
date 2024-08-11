import { AdminProfile, EmployeeProfile, Remarks } from './models'
import {
  AdminCRUD,
  AdminProfileCRUD,
  EmployeeCRUD,
  EmployeeProfileCRUD,
  RemarksCRUD,
} from './crud'
import {
  AdminProfileService,
  AdminService,
  EmployeeProfileService,
  RemarksService,
} from './services'
import { MailerService } from '../../utils'
import { googleAuthService, roleService } from '../auth'
import { EmployeeService } from './services/employee-service'

const mailerService = MailerService.getInstance()

const employeeProfileCRUD = EmployeeProfileCRUD.getInstance(EmployeeProfile)
const employeeProfileService =
  EmployeeProfileService.getInstance(employeeProfileCRUD)

const adminProfileCRUD = AdminProfileCRUD.getInstance(AdminProfile)
const adminProfileService = AdminProfileService.getInstance(adminProfileCRUD)

const adminCRUD = AdminCRUD.getInstance()
const adminService = AdminService.getInstance(
  mailerService,
  googleAuthService,
  roleService,
  adminCRUD
)

const employeeCRUD = EmployeeCRUD.getInstance()
const employeeService = EmployeeService.getInstance(
  mailerService,
  googleAuthService,
  roleService,
  employeeCRUD
)

const remarksService = RemarksService.getInstance(
  RemarksCRUD.getInstance(Remarks)
)

export {
  adminProfileService,
  employeeProfileService,
  adminService,
  employeeService,
  remarksService,
}
