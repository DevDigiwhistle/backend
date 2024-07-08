import { firebase } from '../../../../config'
import { HttpException } from '../../../../utils'
import { AxiosService, IAxiosService } from '../../../utils'
import { IGoogleAuthService } from '../interface'

class GoogleAuthService implements IGoogleAuthService {
  private readonly axiosService: IAxiosService

  constructor() {
    this.axiosService = new AxiosService()
  }

  public async registerAndLogin(idToken: string): Promise<string> {
    try {
      await firebase.auth().verifyIdToken(idToken)
      const accessToken = await firebase
        .auth()
        .createSessionCookie(idToken, { expiresIn: 86400000 })
      return accessToken
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async generateResetLink(email: string): Promise<string> {
    try {
      const link = await firebase.auth().generatePasswordResetLink(email)

      const linkParams = link.split('?')
      const resetLink = `${process.env.FRONTEND_URL}?${linkParams[1]}`
      return resetLink
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async resetPassword(password: string, oobCode: string): Promise<void> {
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
