import { HttpException } from '../../../../utils'
import { IMailerService } from '../../../utils'
import { IGoogleAuthService } from '../../auth/interface'
import { IRoleService } from '../../user/interface'
import { IAdminService, IAdminCRUD } from '../interface'
import { AddAdminOrEmployeeInput } from '../types'

class AdminService implements IAdminService {
  private readonly mailerService: IMailerService
  private readonly googleAuthService: IGoogleAuthService
  private readonly roleService: IRoleService
  private readonly adminCRUD: IAdminCRUD
  private static instance: IAdminService | null = null

  static getInstance = (
    mailerService: IMailerService,
    googleAuthService: IGoogleAuthService,
    roleService: IRoleService,
    adminCRUD: IAdminCRUD
  ) => {
    if (AdminService.instance === null) {
      AdminService.instance = new AdminService(
        mailerService,
        googleAuthService,
        roleService,
        adminCRUD
      )
    }
    return AdminService.instance
  }

  private constructor(
    mailerService: IMailerService,
    googleAuthService: IGoogleAuthService,
    roleService: IRoleService,
    adminCRUD: IAdminCRUD
  ) {
    this.mailerService = mailerService
    this.googleAuthService = googleAuthService
    this.roleService = roleService
    this.adminCRUD = adminCRUD
  }

  async addAdmin(data: AddAdminOrEmployeeInput): Promise<void> {
    try {
      const { uid } = await this.googleAuthService.createUser(data.email)

      const _role = await this.roleService.findOne({ name: data.role }, [])

      if (_role === null) throw new HttpException(400, 'Invalid Role')

      await this.adminCRUD.addAdmin({
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
export { AdminService }
