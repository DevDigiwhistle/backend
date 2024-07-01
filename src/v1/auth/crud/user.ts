/* eslint-disable @typescript-eslint/space-before-function-paren */
import { CRUDBase } from '../../../utils'
import { type ICRUDBase } from '../../../utils/baseCrud'
import { type IUser } from '../interface'
import { User } from '../models'

interface IUserCRUD extends ICRUDBase<IUser> {}

class UserCRUD extends CRUDBase<IUser> implements IUserCRUD {
  constructor() {
    super(User)
  }
}

export { UserCRUD, type IUserCRUD }
