import { firebase } from '../../../../config'
import { HttpException } from '../../../../utils'
import { IAxiosService } from '../../../utils'
import { IGoogleAuthService } from '../interface'
import { userDTO } from '../types'

class GoogleAuthService implements IGoogleAuthService {
  private readonly axiosService: IAxiosService
  private static instance: IGoogleAuthService | null = null

  static getInstance(axiosService: IAxiosService): IGoogleAuthService {
    if (GoogleAuthService.instance === null) {
      GoogleAuthService.instance = new GoogleAuthService(axiosService)
    }
    return GoogleAuthService.instance
  }

  private constructor(axiosService: IAxiosService) {
    this.axiosService = axiosService
  }

  async registerAndLogin(idToken: string): Promise<userDTO> {
    try {
      const user = await firebase.auth().verifyIdToken(idToken)

      if (user?.email === undefined)
        throw new HttpException(404, 'Email Id Not Found!!')

      if (user?.roleId === undefined)
        throw new HttpException(404, 'Role Id Not Found!!')

      return {
        email: user.email,
        uid: user.uid,
        roleId: user.roleId,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async generateSessionToken(idToken: string): Promise<string> {
    try {
      const token = await firebase.auth().createSessionCookie(idToken, {
        expiresIn: 86400000,
      })
      return token
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async generateResetLink(email: string): Promise<string> {
    try {
      const link = await firebase.auth().generatePasswordResetLink(email)

      const linkParams = link.split('?')
      const resetLink = `${process.env.FRONTEND_URL}?${linkParams[1]}`
      return resetLink
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async resetPassword(password: string, oobCode: string): Promise<void> {
    try {
      await this.axiosService.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${process.env.FB_API_KEY}`,
        {
          oobCode: oobCode,
          newPassword: password,
        },
        undefined
      )
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { GoogleAuthService }
