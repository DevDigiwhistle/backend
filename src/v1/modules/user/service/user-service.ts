import { FindOptionsWhere, ILike } from 'typeorm'
import { BaseService, HttpException } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import { IUser, IUserService } from '../interface'
import { IUserCRUD } from '../interface'
import { userStatsDTO } from '../types'
import { Enum } from '../../../../constants'

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

  async findUserByMobileNo(mobileNo: string): Promise<IUser | null> {
    try {
      return await this.crudBase.findUserByMobileNo(mobileNo)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findUserProfileByMobileNoOrUserId(
    mobileNo: string,
    userId: string
  ): Promise<IUser | null> {
    try {
      return await this.crudBase.findUserProfileByMobileNoOrUserId(
        mobileNo,
        userId
      )
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findAllAdminAndEmployees(
    page: number,
    limit: number,
    name: string
  ): Promise<PaginatedResponse<IUser>> {
    try {
      let adminQuery: FindOptionsWhere<IUser> = {}
      let employeeQuery: FindOptionsWhere<IUser> = {}

      if (typeof name === 'string') {
        adminQuery = {
          adminProfile: {
            firstName: ILike(`%${name}%`),
            lastName: ILike(`%${name}%`),
          },
        }

        employeeQuery = {
          employeeProfile: {
            firstName: ILike(`%${name}%`),
            lastName: ILike(`%${name}%`),
          },
        }
      }

      const data = await this.findAllPaginated(
        page,
        limit,
        [
          {
            ...adminQuery,
            role: {
              id: Enum.ROLES.ADMIN,
            },
          },
          {
            ...employeeQuery,
            role: {
              id: Enum.ROLES.EMPLOYEE,
            },
          },
        ],
        ['adminProfile', 'employeeProfile', 'role'],
        { id: 'ASC' }
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findOverallUserStats(): Promise<userStatsDTO> {
    try {
      return await this.crudBase.findOverallUserStats()
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findUserByMobileNoAndEmail(
    mobileNo: string,
    email: string
  ): Promise<IUser | null> {
    try {
      return await this.crudBase.findUserByMobileNoAndEmail(mobileNo, email)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findInfluencerAndAgencyByEmail(email: string): Promise<IUser[]> {
    try {
      const data = await this.crudBase.findAll(
        [
          {
            role: {
              id: Enum.ROLES.INFLUENCER,
            },
            email: ILike(`%${email}%`),
          },
          {
            role: {
              id: Enum.ROLES.AGENCY,
            },
            email: ILike(`%${email}%`),
          },
        ],
        ['agencyProfile', 'influencerProfile']
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findBrandsByName(name: string): Promise<IUser[]> {
    try {
      const data = await this.crudBase.findAll(
        [
          {
            role: {
              id: Enum.ROLES.BRAND,
            },
            brandProfile: {
              name: ILike(`%${name}%`),
            },
          },
        ],
        ['brandProfile']
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findEmployeeByName(name: string): Promise<IUser[]> {
    try {
      const data = await this.crudBase.findAll(
        [
          {
            role: {
              id: Enum.ROLES.EMPLOYEE,
            },
            employeeProfile: {
              firstName: ILike(`%${name}%`),
            },
          },
          {
            role: {
              id: Enum.ROLES.EMPLOYEE,
            },
            employeeProfile: {
              lastName: ILike(`%${name}%`),
            },
          },
        ],
        ['employeeProfile']
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
export { UserService }
