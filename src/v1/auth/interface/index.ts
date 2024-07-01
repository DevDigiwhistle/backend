import { type ObjectLiteral } from 'typeorm'
import { type Enum } from '../../../constants'

export interface IUser extends ObjectLiteral {
  id: string
  email: string
  password: string
  name: string
  role: Enum.ROLES
}
