import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../auth/interface'

export interface IAdminProfile extends ObjectLiteral {
  id: string
  firstName: string
  lastName: string
  mobileNo: string
  user: IUser
  userId?: string
}

export interface IEmployeeProfile extends ObjectLiteral {
  id: string
  firstName: string
  lastName: string
  mobileNo: string
  user: IUser
  userId?: string
}
