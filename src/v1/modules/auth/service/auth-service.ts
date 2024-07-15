import { HttpException } from '../../../../utils'
import {
  IAuthService,
  IRoleService,
  type IUserCRUD,
  IGoogleAuthService,
} from '../interface'
import { authDTO, resetPassDTO } from '../types'
import { IMailerService } from '../../../utils'

class AuthService implements IAuthService {
  private readonly userCRUD: IUserCRUD
  private readonly googleAuthService: IGoogleAuthService
  private readonly roleService: IRoleService
  private readonly mailerService: IMailerService
  private static instance: IAuthService | null = null

  static getInstance(
    userCRUD: IUserCRUD,
    googleAuthService: IGoogleAuthService,
    roleService: IRoleService,
    mailerService: IMailerService
  ): IAuthService {
    if (AuthService.instance === null) {
      AuthService.instance = new AuthService(
        userCRUD,
        googleAuthService,
        roleService,
        mailerService
      )
    }
    return AuthService.instance
  }

  private constructor(
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

      if (userExists !== null) {
        if (userExists.isVerified === false)
          throw new HttpException(400, 'Waiting for Approval!!')

        throw new HttpException(400, 'User Already Exists!!')
      }

      const role = await this.roleService.findOne({ id: user.roleId }, [])

      if (role === null) throw new HttpException(400, 'Invalid RoleId')

      await this.userCRUD.add({
        id: user.uid,
        email: user.email,
        roleId: user.roleId,
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

      if (_user.isVerified === false)
        throw new HttpException(400, 'Waiting for Approval!!')

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

export { AuthService }
