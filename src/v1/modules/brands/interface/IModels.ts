import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../auth/interface'

export interface IBrandProfile extends ObjectLiteral {
  id: string
  firstName: string
  lastName: string
  userId?: string
  websiteURL: string
  user: IUser
}
