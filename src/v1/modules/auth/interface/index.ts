import { type ObjectLiteral } from 'typeorm'
import { type Enum } from '../../../../constants'
import { ICRUDBase } from '../../../../utils'
import { LoginDTO, SignUpDTO } from '../types/auth'

export interface IUser extends ObjectLiteral {
  id: string
  email: string
  password: string
  name: string
  role: Enum.ROLES
}


export interface IUserCRUD extends ICRUDBase<IUser> {}

export interface IUserService {
  signUp: (signUpData: SignUpDTO) => Promise<string>
  logIn: (logInData: LoginDTO) => Promise<string>
}
