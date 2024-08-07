import { HttpException } from '../../../../utils'
import { IMailerService } from '../../../utils'
import { IGoogleAuthService, IRoleService } from '../../auth/interface'
import { IEmployeeCRUD, IEmployeeService } from '../interface'
import { AddAdminOrEmployeeInput } from '../types'

class EmployeeService implements IEmployeeService {
  private readonly mailerService: IMailerService
  private readonly googleAuthService: IGoogleAuthService
  private readonly roleService: IRoleService
  private readonly employeeCRUD: IEmployeeCRUD

  constructor(
    mailerService: IMailerService,
    googleAuthService: IGoogleAuthService,
    roleService: IRoleService,
    employeeCRUD: IEmployeeCRUD
  ) {
    this.mailerService = mailerService
    this.googleAuthService = googleAuthService
    this.roleService = roleService
    this.employeeCRUD = employeeCRUD
  }

  async addEmployee(data: AddAdminOrEmployeeInput): Promise<void> {
    try {
      const { uid } = await this.googleAuthService.createUser(data.email)

      const _role = await this.roleService.findOne({ name: data.role })

      if (_role === null) throw new HttpException(400, 'Invalid Role')

      await this.employeeCRUD.addEmployee({
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNo: data.mobileNo,
        roleId: _role.id,
        userId: uid,
        email: data.email,
      })

      this.mailerService.sendMail(
        data.email,
        'You are invited to Join Digiwhistle',
        ''
      )
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }
}
export { EmployeeService }
