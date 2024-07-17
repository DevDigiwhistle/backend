import { Request } from 'express'
import { IUser } from '../modules/auth/interface'

export interface IExtendedRequest extends Request {
  user: IUser
}
