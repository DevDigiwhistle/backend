import { BaseService, HttpException } from '../../../../utils'
import { IAdminProfile, IAdminProfileCRUD } from '../interface'
import { IAdminProfileService } from '../interface/IService'

class AdminProfileService
  extends BaseService<IAdminProfile, IAdminProfileCRUD>
  implements IAdminProfileService
{
  private static instance: IAdminProfileService | null = null

  static getInstance(adminProfileCRUD: IAdminProfileCRUD) {
    if (AdminProfileService.instance === null) {
      AdminProfileService.instance = new AdminProfileService(adminProfileCRUD)
    }

    return AdminProfileService.instance
  }

  private constructor(adminProfileCRUD: IAdminProfileCRUD) {
    super(adminProfileCRUD)
  }

  async findByUserId(userId: string): Promise<IAdminProfile> {
    try {
      const data = await this.findOne({ userId: userId }, ['user'])

      if (data === null)
        throw new HttpException(404, 'Admin Profile does not exits!!')

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { AdminProfileService }
