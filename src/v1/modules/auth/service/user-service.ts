import { FindOptionsWhere, ILike } from 'typeorm'
import { BaseService, HttpException } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import { IUser, IUserService } from '../interface'
import { IUserCRUD } from '../interface'
import { IAdminProfile, IEmployeeProfile } from '../../admin/interface'
import { IAdminAndEmployeeDTO } from '../types'

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
    name?: string
  ): Promise<PaginatedResponse<IAdminAndEmployeeDTO>> {
    try {
      let query: FindOptionsWhere<IUser>[] = []

      if (typeof name === 'string') {
        query.push(
          {
            employeeProfile: {
              firstName: ILike(`%${name}%`),
            },
          },
          {
            employeeProfile: {
              lastName: ILike(`%${name}%`),
            },
          },
          {
            adminProfile: {
              firstName: ILike(`%${name}%`),
            },
          },
          {
            adminProfile: {
              lastName: ILike(`%${name}%`),
            },
          }
        )
      }

      const data = await this.findAllPaginated(
        page,
        limit,
        [
          {
            role: {
              id: 1,
            },
          },
          {
            role: {
              id: 2,
            },
          },
        ],
        ['adminProfile', 'employeeProfile', 'role']
      )

      const _data = data.data.map((item) => {
        const profile: IEmployeeProfile | IAdminProfile =
          item[`${item.role.name}Profile`]

        return {
          userId: item.id,
          email: item.email,
          mobileNo: profile.mobileNo,
          designation:
            item.role.name === 'admin' ? 'admin' : profile.designation,
          isPaused: item.isPaused,
          isApproved: item.isApproved,
          firstName: profile.firstName,
          lastName: profile.lastName,
          profilePic: profile.profilePic,
          profileId: profile.id,
          role: item.role.name,
        }
      })

      return {
        data: _data,
        currentPage: page,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
export { UserService }
