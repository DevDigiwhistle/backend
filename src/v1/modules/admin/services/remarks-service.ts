import { IRemarks, IRemarksCRUD } from '../interface'
import { IRemarksService } from '../interface'
import { BaseService, HttpException, IBaseService } from '../../../../utils'
import { remarksResponse } from '../types'

class RemarksService
  extends BaseService<IRemarks, IRemarksCRUD>
  implements IRemarksService
{
  private static instance: IRemarksService | null = null

  static getInstance = (remarksCRUD: IRemarksCRUD) => {
    if (RemarksService.instance === null) {
      RemarksService.instance = new RemarksService(remarksCRUD)
    }
    return RemarksService.instance
  }

  private constructor(remarksCRUD: IRemarksCRUD) {
    super(remarksCRUD)
  }

  async findAllRemarksByUserId(userId: string): Promise<remarksResponse[]> {
    try {
      const data = await this.findAll(
        {
          userId: userId,
        },
        ['remarker', 'remarker.employeeProfile', 'remarker.adminProfile'],
        { createdAt: 'DESC' }
      )

      const _data = data.map((item) => {
        const profile =
          item.remarker.adminProfile === null
            ? item.remarker.employeeProfile
            : item.remarker.adminProfile
        if (profile === undefined || profile === null) return
        return {
          id: item.id,
          name: profile.firstName + ' ' + profile.lastName,
          profilePic: profile.profilePic,
          message: item.message,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }
      })

      const filteredData = _data.filter((item) => item !== undefined)
      return filteredData as remarksResponse[]
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async clearAllRemarksByUserId(userId: string): Promise<void> {
    try {
      await this.crudBase.delete({ userId: userId })
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { RemarksService }
