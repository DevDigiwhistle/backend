import { type ObjectLiteral } from 'typeorm'
import { type Enum } from '../../../../constants'
import { IBaseService, ICRUDBase } from '../../../../utils'
import { authDTO, resetPassDTO, userDTO } from '../types'

export interface IUser extends ObjectLiteral {
  id: string
  email: string
  role: IRole | number
  isVerified: boolean
}

export interface IRole extends ObjectLiteral {
  id: number
  name: Enum.ROLES
  users: IUser[]
}

export interface IUserCRUD extends ICRUDBase<IUser> {}

export interface IRoleCRUD extends ICRUDBase<IRole> {}

export interface IRoleService extends IBaseService<IRole> {}

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
}
