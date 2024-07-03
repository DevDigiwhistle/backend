import { CRUDBase } from '../../../../utils'
import { type IUser } from '../interface'
import { IUserCRUD } from '../interface'
import { EntityTarget } from 'typeorm'

export class UserCRUD extends CRUDBase<IUser> implements IUserCRUD {
  constructor(user: EntityTarget<IUser>) {
    super(user)
  }
}


