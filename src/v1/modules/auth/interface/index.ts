import { type ObjectLiteral } from 'typeorm'
import { type Enum } from '../../../../constants'
import { IBaseService, ICRUDBase } from '../../../../utils'
import { authDTO, resetPassDTO, userDTO } from '../types'
import { IBrandProfile } from '../../brands/interface'
import { IInfluencerProfile } from '../../influencer/interface'
import { IAdminProfile } from '../../admin/interface'
import { IEmployeeProfile } from '../../employee/interface'

export interface IUser extends ObjectLiteral {
  id: string
  email: string
  role: IRole
  brandProfile: IBrandProfile | null
  influencerProfile: IInfluencerProfile | null
  adminProfile: IAdminProfile | null
  employeeProfile: IEmployeeProfile | null
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

export interface IRoleService extends IBaseService<IRole> {}

export interface IUserService extends IBaseService<IUser> {}

export interface IAuthService {
  signUp(signUpData: authDTO): Promise<string>
  logIn(logInData: authDTO): Promise<string>
  emailResetPasswordLink(email: string): Promise<void>
  resetPassword(resetPassData: resetPassDTO): Promise<void>
}

export interface IGoogleAuthService {
  registerAndLogin(idToken: string): Promise<userDTO>
  generateResetLink(email: string): Promise<string>
  generateSessionToken(idToken: string): Promise<string>
  resetPassword(password: string, oobCode: string): Promise<void>
  verifySessionCookie(token: string): Promise<string>
}
