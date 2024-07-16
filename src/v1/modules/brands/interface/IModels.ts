import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../auth/interface'

export interface IBrandProfile extends ObjectLiteral {
  id: string
  pocFirstName: string
  pocLastName: string
  name: string
  userId?: string
  websiteURL: string
  user: IUser
  mobileNo: string
}
