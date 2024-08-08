import { CRUDBase, HttpException } from '../../../../utils'
import { type IUser } from '../interface'
import { IUserCRUD } from '../interface'
import { EntityTarget } from 'typeorm'

export class UserCRUD extends CRUDBase<IUser> implements IUserCRUD {
  private static instance: IUserCRUD | null = null

  static getInstance(user: EntityTarget<IUser>): IUserCRUD {
    if (UserCRUD.instance === null) {
      UserCRUD.instance = new UserCRUD(user)
    }
    return UserCRUD.instance
  }

  private constructor(user: EntityTarget<IUser>) {
    super(user)
  }

  async findUserByMobileNo(mobileNo: string): Promise<IUser | null> {
    try {
      const user = await this.repository.findOne({
        relations: [
          'adminProfile',
          'employeeProfile',
          'influencerProfile',
          'brandProfile',
          'agencyProfile',
          'role',
        ],
        where: [
          { adminProfile: { mobileNo: mobileNo } },
          { employeeProfile: { mobileNo: mobileNo } },
          { influencerProfile: { mobileNo: mobileNo } },
          { brandProfile: { mobileNo: mobileNo } },
          { agencyProfile: { mobileNo: mobileNo } },
        ],
      })

      return user
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findUserProfileByMobileNoOrUserId(
    mobileNo: string,
    userId: string
  ): Promise<IUser | null> {
    try {
      const user = await this.repository.findOne({
        relations: [
          'adminProfile',
          'employeeProfile',
          'influencerProfile',
          'brandProfile',
          'agencyProfile',
          'role',
        ],
        where: [
          { adminProfile: { mobileNo: mobileNo } },
          { employeeProfile: { mobileNo: mobileNo } },
          { influencerProfile: { mobileNo: mobileNo } },
          { brandProfile: { mobileNo: mobileNo } },
          { agencyProfile: { mobileNo: mobileNo } },
          { adminProfile: { user: { id: userId } } },
          { employeeProfile: { user: { id: userId } } },
          { influencerProfile: { user: { id: userId } } },
          { brandProfile: { user: { id: userId } } },
          { agencyProfile: { user: { id: userId } } },
        ],
      })

      return user
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
