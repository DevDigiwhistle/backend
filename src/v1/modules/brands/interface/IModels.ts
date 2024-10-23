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
  aadharNo: string
  gstNo: string
  panNo: string
  msmeNo: string
  address: string
  city: string
  state: string
  pincode: string
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
  aadharNo: string
  panNo: string
  gstNo: string
  msmeNo: string
  bankName: string
  bankAccountNumber: string
  bankIfscCode: string
  bankAccountHolderName: string
  address: string
  city: string
  state: string
  pincode: string
  fundAccountId: string
  createdAt?: Date
  updatedAt?: Date
}
