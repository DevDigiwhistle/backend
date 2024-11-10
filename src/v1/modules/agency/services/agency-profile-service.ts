import { DeepPartial, FindOptionsWhere, ILike } from 'typeorm'
import { BaseService, HttpException } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import {
  IAgencyProfile,
  IAgencyProfileCRUD,
  IAgencyProfileService,
} from '../interface'
import { AppDataSource } from '../../../../config'
import { AgencyProfile, SearchCredits } from '../models'

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

  async add(data: DeepPartial<IAgencyProfile>): Promise<IAgencyProfile> {
    try {
      let resp: IAgencyProfile | null = null

      AppDataSource.manager.transaction(async (manager) => {
        resp = await manager.save(AgencyProfile, data)

        await manager.save(SearchCredits, {
          agency: {
            id: resp.id,
          },
        })
      })

      if (resp === null)
        throw new HttpException(500, 'Unable to process request')

      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
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

      if (query.length === 0 && Object.keys(nameQuery).length !== 0) {
        query.push(nameQuery)
      }

      const data = await this.findAllPaginated(page, limit, query, ['user'], {
        createdAt: 'DESC',
      })
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { AgencyProfileService }