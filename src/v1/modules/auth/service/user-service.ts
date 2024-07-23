import { BaseService, HttpException } from '../../../../utils'
import { IUser, IUserService } from '../interface'
import { IUserCRUD } from '../interface'

class UserService
  extends BaseService<IUser, IUserCRUD>
  implements IUserService
{
  private static instance: IUserService | null = null

  static getInstance(UserCRUD: IUserCRUD): IUserService {
    if (UserService.instance === null) {
      UserService.instance = new UserService(UserCRUD)
    }
    return UserService.instance
  }

  private constructor(userCRUD: IUserCRUD) {
    super(userCRUD)
  }

  public async findUserByMobileNo(mobileNo: string): Promise<IUser | null> {
    try {
      return await this.crudBase.findUserByMobileNo(mobileNo)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
export { UserService }
