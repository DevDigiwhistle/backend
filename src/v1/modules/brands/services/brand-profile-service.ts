import { BaseService, HttpException } from '../../../../utils'
import { IBrandProfile, IBrandProfileCRUD } from '../interface'
import { IBrandProfileService } from '../interface/IService'

class BrandProfileService
  extends BaseService<IBrandProfile, IBrandProfileCRUD>
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
}

export { BrandProfileService }
