import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../user/interface'

export interface IBrandProfile extends ObjectLiteral {
  id: string
  pocFirstName: string
  pocLastName: string
  name: string
  websiteURL: string
  user: IUser
  mobileNo: string
  profilePicURL?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IAgencyProfile extends ObjectLiteral {
  id: string
  pocFirstName: string
  pocLastName: string
  name: string
  websiteURL: string
  profilePicURL?: string
  user: IUser
  mobileNo: string
  createdAt?: Date
  updatedAt?: Date
}
