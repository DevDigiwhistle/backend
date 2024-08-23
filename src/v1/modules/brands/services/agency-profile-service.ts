import { FindOptionsWhere, ILike } from 'typeorm'
import { BaseService, HttpException } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import {
  IAgencyProfile,
  IAgencyProfileCRUD,
  IAgencyProfileService,
} from '../interface'

class AgencyProfileService
  extends BaseService<IAgencyProfile, IAgencyProfileCRUD>
  implements IAgencyProfileService
{
  private static instance: IAgencyProfileService | null = null

  static getInstance(agencyProfileCRUD: IAgencyProfileCRUD) {
    if (AgencyProfileService.instance === null) {
      AgencyProfileService.instance = new AgencyProfileService(
        agencyProfileCRUD
      )
    }

    return AgencyProfileService.instance
  }

  private constructor(agencyProfileCRUD: IAgencyProfileCRUD) {
    super(agencyProfileCRUD)
  }

  async getAllAgencies(
    page: number,
    limit: number,
    approved?: string,
    rejected?: string,
    name?: string
  ): Promise<PaginatedResponse<IAgencyProfile>> {
    try {
      let query: FindOptionsWhere<IAgencyProfile>[] = []
      let nameQuery: FindOptionsWhere<IAgencyProfile> = {}

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

export { AgencyProfileService }
