import { BaseService, HttpException } from '../../../../utils'
import { IBrandProfile, IBrandProfileCRUD } from '../interface'
import { IBrandProfileService } from '../interface/IService'

class BrandProfileService
  extends BaseService<IBrandProfile>
  implements IBrandProfileService
{
  private static instance: IBrandProfileService | null = null

  static getInstance(brandProfileCRUD: IBrandProfileCRUD) {
    if (BrandProfileService.instance === null) {
      BrandProfileService.instance = new BrandProfileService(brandProfileCRUD)
    }

    return BrandProfileService.instance
  }

  private constructor(brandProfileCRUD: IBrandProfileCRUD) {
    super(brandProfileCRUD)
  }

  async findByUserId(userId: string): Promise<IBrandProfile> {
    try {
      const data = await this.findOne({ userId: userId }, ['user'])

      if (data === null)
        throw new HttpException(404, 'Brand Profile does not exits!!')

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { BrandProfileService }
