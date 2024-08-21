import { CRUDBase, HttpException } from '../../../../utils'
import { EntityTarget } from 'typeorm'
import { IUser, IUserCRUD } from '../interface'
import { userStatsDTO } from '../types'

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

  async findUserByMobileNoAndEmail(
    mobileNo: string,
    email: string
  ): Promise<IUser | null> {
    try {
      const user = await this.repository.findOne({
        relations: [
          'adminProfile',
          'employeeProfile',
          'influencerProfile',
          'brandProfile',
          'agencyProfile',
        ],
        where: [
          { email: email },
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

  async findOverallUserStats(): Promise<userStatsDTO> {
    try {
      const result = await this.repository
        .createQueryBuilder('user')
        .select([
          'SUM(CASE WHEN user.isApproved IS NULL THEN 1 ELSE 0 END) AS Pending',
          'SUM(CASE WHEN user.isApproved = true THEN 1 ELSE 0 END) AS Approved',
          'SUM(CASE WHEN user.isApproved = false THEN 1 ELSE 0 END) AS Rejected',
        ])
        .getRawOne()

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
