import { CRUDBase } from '../../../../utils'
import { type IUser } from '../interface'
import { IUserCRUD } from '../interface'
import { EntityTarget } from 'typeorm'

export class UserCRUD extends CRUDBase<IUser> implements IUserCRUD {
  private static instance: IUserCRUD | null = null

  static getInstance(user: EntityTarget<IUser>) {
    if (UserCRUD.instance === null) {
      UserCRUD.instance = new UserCRUD(user)
    }
    return UserCRUD.instance
  }

  private constructor(user: EntityTarget<IUser>) {
    super(user)
  }
}
