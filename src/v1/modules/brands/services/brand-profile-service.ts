import { FindOptionsWhere, ILike } from 'typeorm'
import { BaseService, HttpException } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
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

  async getAllBrands(
    page: number,
    limit: number,
    approved?: string,
    rejected?: string,
    name?: string
  ): Promise<PaginatedResponse<IBrandProfile>> {
    try {
      let query: FindOptionsWhere<IBrandProfile>[] = []
      let nameQuery: FindOptionsWhere<IBrandProfile> = {}

      if (typeof name === 'string') {
        nameQuery = {
          name: ILike(`%${name}%`),
        }
      }

      if (typeof approved === 'string') {
        if (approved === 'true') {
          query.push({
            ...nameQuery,
            user: {
              isApproved: true,
            },
          })
        }
      }

      if (typeof rejected === 'string') {
        if (rejected === 'true') {
          query.push({
            ...nameQuery,
            user: {
              isApproved: false,
            },
          })
        }
      }

      if (query.length === 0) {
        query.push(nameQuery)
      }

      const data = await this.findAllPaginated(page, limit, query, ['user'], {
        id: 'ASC',
      })
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { BrandProfileService }
