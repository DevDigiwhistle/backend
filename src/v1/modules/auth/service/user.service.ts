import { HttpException } from '../../../../utils'
import { IRoleService, type IUserCRUD } from '../interface'
import { authDTO, resetPassDTO } from '../types'
import { IUserService } from '../interface'
import { IGoogleAuthService } from '../interface'
import { IMailerService } from '../../../utils'

class UserService implements IUserService {
  private readonly userCRUD: IUserCRUD
  private readonly googleAuthService: IGoogleAuthService
  private readonly roleService: IRoleService
  private readonly mailerService: IMailerService

  constructor(
    userCRUD: IUserCRUD,
    googleAuthService: IGoogleAuthService,
    roleService: IRoleService,
    mailerService: IMailerService
  ) {
    this.userCRUD = userCRUD
    this.googleAuthService = googleAuthService
    this.roleService = roleService
    this.mailerService = mailerService
  }

  async signUp(signUpData: authDTO): Promise<string> {
    try {
      const { idToken } = signUpData

      const user = await this.googleAuthService.registerAndLogin(idToken)

      const userExists = await this.userCRUD.findOne(
        {
          id: user.uid,
        },
        []
      )

      if (userExists !== null)
        throw new HttpException(400, 'User Already Exists!!')

      const role = await this.roleService.findOne({ id: user.roleId }, [])

      if (role === null) throw new HttpException(400, 'Invalid RoleId')

      await this.userCRUD.add({
        id: user.uid,
        email: user.email,
        role: user.roleId,
      })

      const token = await this.googleAuthService.generateSessionToken(idToken)

      return token
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async logIn(loginData: authDTO): Promise<string> {
    try {
      const { idToken } = loginData

      const user = await this.googleAuthService.registerAndLogin(idToken)

      const _user = await this.userCRUD.findOne(
        {
          id: user.uid,
        },
        []
      )

      if (_user === null) throw new HttpException(404, 'User does not exists!!')

      const token = await this.googleAuthService.generateSessionToken(idToken)

      return token
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async emailResetPasswordLink(email: string): Promise<void> {
    try {
      const link = await this.googleAuthService.generateResetLink(email)
      await this.mailerService.sendMail(email, 'Reset Password Link', link)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async resetPassword(resetPassData: resetPassDTO): Promise<void> {
    try {
      await this.googleAuthService.resetPassword(
        resetPassData.oobCode,
        resetPassData.password
      )
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { type IUserService, UserService }
