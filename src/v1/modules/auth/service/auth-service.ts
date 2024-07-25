import { HttpException } from '../../../../utils'
import {
  IAuthService,
  IRoleService,
  type IUserService,
  IGoogleAuthService,
  IUser,
  IWhatsappService,
  IVerificationService,
  IAuthTokenService,
} from '../interface'
import {
  authDTO,
  loginDTO,
  loginResponseDTO,
  mobileDTO,
  resetPassDTO,
  userResponseDTO,
  verifyMobileDTO,
} from '../types'
import { IMailerService } from '../../../utils'
import OTPgenerator from 'otp-generator'

class AuthService implements IAuthService {
  private readonly userService: IUserService
  private readonly googleAuthService: IGoogleAuthService
  private readonly roleService: IRoleService
  private readonly mailerService: IMailerService
  private readonly whatsappService: IWhatsappService
  private readonly verificationService: IVerificationService
  private readonly authTokenService: IAuthTokenService
  private static instance: IAuthService | null = null

  static getInstance(
    userService: IUserService,
    googleAuthService: IGoogleAuthService,
    roleService: IRoleService,
    mailerService: IMailerService,
    whatsappService: IWhatsappService,
    verificationService: IVerificationService,
    authTokenService: IAuthTokenService
  ): IAuthService {
    if (AuthService.instance === null) {
      AuthService.instance = new AuthService(
        userService,
        googleAuthService,
        roleService,
        mailerService,
        whatsappService,
        verificationService,
        authTokenService
      )
    }
    return AuthService.instance
  }

  private constructor(
    userService: IUserService,
    googleAuthService: IGoogleAuthService,
    roleService: IRoleService,
    mailerService: IMailerService,
    whatsappService: IWhatsappService,
    verificationService: IVerificationService,
    authTokenService: IAuthTokenService
  ) {
    this.userService = userService
    this.googleAuthService = googleAuthService
    this.roleService = roleService
    this.mailerService = mailerService
    this.whatsappService = whatsappService
    this.verificationService = verificationService
    this.authTokenService = authTokenService
  }

  async signUp(signUpData: authDTO): Promise<IUser> {
    try {
      const { idToken, role } = signUpData

      const user = await this.googleAuthService.verifyIdToken(idToken)

      const userExists = await this.userService.findOne(
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

      const _role = await this.roleService.findOne({ name: role }, [])

      if (_role === null) throw new HttpException(400, 'Invalid RoleId')

      const results = await this.userService.add({
        id: user.uid,
        email: user.email,
        role: {
          id: _role.id,
        },
      })

      return results
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async logIn(loginData: loginDTO): Promise<loginResponseDTO> {
    try {
      const { idToken } = loginData

      const user = await this.googleAuthService.verifyIdToken(idToken)

      const _user = await this.userService.findOne(
        {
          id: user.uid,
        },
        [
          'adminProfile',
          'employeeProfile',
          'influencerProfile',
          'brandProfile',
          'agencyProfile',
          'role',
        ]
      )

      if (_user === null) throw new HttpException(404, 'User does not exists!!')

      if (_user.isVerified === false)
        throw new HttpException(400, 'Waiting for Approval!!')

      const token = this.authTokenService.generateToken(_user.id)

      const profile = _user[`${_user.role.name}Profile`]
      let isOnboardingDone = profile === null ? false : true

      const _userResponse: userResponseDTO = {
        id: _user.id,
        email: _user.email,
        isVerified: _user.isVerified,
        profile: profile,
        role: _user.role.name,
        isOnBoarded: isOnboardingDone,
      }

      return {
        token: token,
        user: _userResponse,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async emailResetPasswordLink(email: string): Promise<void> {
    try {
      const link = await this.googleAuthService.generateResetLink(email)
      this.mailerService
        .sendMail(email, 'Reset Password Link', link)
        .then(() => {
          console.log('mail sent successfully!!')
        })
        .catch((e) => {
          console.log(`Error sending mail: ${e}`)
        })
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

  async sendMobileOTP(mobileData: mobileDTO): Promise<void> {
    try {
      const { mobileNo } = mobileData

      const code: string = OTPgenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      })

      const existingOTP = await this.verificationService.findOne(
        {
          mobileNo: mobileNo,
        },
        []
      )

      const presentTime = new Date().getTime()

      if (existingOTP !== null) {
        await this.verificationService.update(
          { mobileNo: mobileNo },
          { otp: code }
        )
      } else {
        await this.verificationService.add({
          mobileNo: mobileNo,
          otp: code,
          expireIn: presentTime + 600000,
        })
      }

      this.whatsappService
        .sendMessage(mobileNo, code)
        .then(() => {
          console.log('message sent')
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async verifyMobileOTP(
    verifyMobileData: verifyMobileDTO
  ): Promise<loginResponseDTO> {
    try {
      const { mobileNo, otp } = verifyMobileData

      const existingOTP = await this.verificationService.findOne(
        {
          mobileNo: mobileNo,
        },
        []
      )

      const presentTime = new Date().getTime()

      if (existingOTP === null)
        throw new HttpException(404, 'OTP does not exists!!')
      else {
        if (existingOTP.expireIn < presentTime)
          throw new HttpException(400, 'OTP has expired!!')
        if (existingOTP.otp !== otp)
          throw new HttpException(400, 'Invalid OTP!!')
      }

      const user = await this.userService.findUserByMobileNo(mobileNo)

      if (user === null) throw new HttpException(404, 'User does not exists!!')

      const token = this.authTokenService.generateToken(user.id)

      const profile = user[`${user.role.name}Profile`]
      let isOnboardingDone = profile === null ? false : true

      const _userResponse: userResponseDTO = {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
        profile: profile,
        role: user.role.name,
        isOnBoarded: isOnboardingDone,
      }

      return {
        token: token,
        user: _userResponse,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { AuthService }
