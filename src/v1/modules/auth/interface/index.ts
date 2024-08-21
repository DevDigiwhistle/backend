import { type ObjectLiteral } from 'typeorm'
import { IBaseService, ICRUDBase } from '../../../../utils'
import {
  authDTO,
  loginDTO,
  loginResponseDTO,
  mobileDTO,
  resetPassDTO,
  signUpResponseDTO,
  userDTO,
  verifyMobileDTO,
} from '../types'

// models
export interface IVerification extends ObjectLiteral {
  mobileNo: string
  otp: string
  expireIn: number
  id: string
}

// crud
export interface IVerificationCRUD extends ICRUDBase<IVerification> {
  createOrUpdate(data: Partial<IVerification>): Promise<void>
}

// service

export interface IVerificationService
  extends IBaseService<IVerification, IVerificationCRUD> {
  createOrUpdate(data: Partial<IVerification>): Promise<void>
}

export interface IAuthService {
  signUp(signUpData: authDTO): Promise<signUpResponseDTO>
  logIn(logInData: loginDTO): Promise<loginResponseDTO>
  emailResetPasswordLink(email: string): Promise<void>
  resetPassword(resetPassData: resetPassDTO): Promise<void>
  verifyMobileOTP(verifyMobileData: verifyMobileDTO): Promise<loginResponseDTO>
  sendMobileOTP(mobileData: mobileDTO): Promise<void>
}

export interface IGoogleAuthService {
  createUser(email: string): Promise<userDTO>
  deleteUser(uid: string): Promise<void>
  verifyIdToken(idToken: string): Promise<userDTO>
  generateResetLink(email: string): Promise<string>
  resetPassword(password: string, oobCode: string): Promise<void>
}

export interface IWhatsappService {
  sendMessage(destination: string | string[], message: string): Promise<void>
}

export interface IAuthTokenService {
  generateToken(userId: string): string
  decodeToken(token: string): string
}
