import { type ObjectLiteral } from 'typeorm'
import { IBaseService, ICRUDBase } from '../../../../utils'
import {
  authDTO,
  loginDTO,
  loginResponseDTO,
  resetPassDTO,
  userDTO,
} from '../types'
import { IAgencyProfile, IBrandProfile } from '../../brands/interface'
import { IInfluencerProfile } from '../../influencer/interface'
import { IAdminProfile } from '../../admin/interface'
import { IEmployeeProfile } from '../../employee/interface'

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

export interface IUserCRUD extends ICRUDBase<IUser> {}

export interface IRoleCRUD extends ICRUDBase<IRole> {}

export interface IRoleService extends IBaseService<IRole, IRoleCRUD> {}

export interface IUserService extends IBaseService<IUser, IUserCRUD> {}

export interface IAuthService {
  signUp(signUpData: authDTO): Promise<IUser>
  logIn(logInData: loginDTO): Promise<loginResponseDTO>
  emailResetPasswordLink(email: string): Promise<void>
  resetPassword(resetPassData: resetPassDTO): Promise<void>
}

export interface IGoogleAuthService {
  verifyIdToken(idToken: string): Promise<userDTO>
  generateResetLink(email: string): Promise<string>
  generateSessionToken(idToken: string): Promise<string>
  resetPassword(password: string, oobCode: string): Promise<void>
  verifySessionCookie(token: string): Promise<string>
}
