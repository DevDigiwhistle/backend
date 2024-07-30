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
import { IAgencyProfile, IBrandProfile } from '../../brands/interface'
import { IInfluencerProfile } from '../../influencer/interface'
import { IAdminProfile } from '../../admin/interface'
import { IEmployeeProfile } from '../../admin/interface'

// models
export interface IUser extends ObjectLiteral {
  id: string
  email: string
  role: IRole
  brandProfile?: IBrandProfile | null
  influencerProfile?: IInfluencerProfile | null
  adminProfile?: IAdminProfile | null
  employeeProfile?: IEmployeeProfile | null
  agencyProfile?: IAgencyProfile | null
  isVerified: boolean
  roleId?: number
}

export interface IRole extends ObjectLiteral {
  id: number
  name: string
  users: IUser[]
}

export interface IVerification extends ObjectLiteral {
  mobileNo: string
  otp: string
  expireIn: number
  id: string
}

// crud

export interface IUserCRUD extends ICRUDBase<IUser> {
  findUserByMobileNo(mobileNo: string): Promise<IUser | null>
}

export interface IRoleCRUD extends ICRUDBase<IRole> {}

export interface IVerificationCRUD extends ICRUDBase<IVerification> {
  createOrUpdate(data: Partial<IVerification>): Promise<void>
}

// service

export interface IRoleService extends IBaseService<IRole, IRoleCRUD> {}

export interface IVerificationService
  extends IBaseService<IVerification, IVerificationCRUD> {
  createOrUpdate(data: Partial<IVerification>): Promise<void>
}

export interface IUserService extends IBaseService<IUser, IUserCRUD> {
  findUserByMobileNo(mobileNo: string): Promise<IUser | null>
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
