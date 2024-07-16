import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../auth/interface'

export interface IEmployeeProfile extends ObjectLiteral {
  id: string
  firstName: string
  lastName: string
  mobileNo: string
  user: IUser
  userId?: string
}
