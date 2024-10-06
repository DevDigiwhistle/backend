import { CRUDBase, HttpException } from '../../../../utils'
import { EntityTarget } from 'typeorm'
import { IUser, IUserCRUD } from '../interface'
import { userStats } from '../types'

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

  async findOverallUserStats(): Promise<userStats> {
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
