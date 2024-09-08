import { BaseService, HttpException } from '../../../../utils'
import { ICampaign, ICampaignCRUD, ICampaignService } from '../interface'
import { PaginatedResponse } from '../../../../utils/base-service'
import { FindOptionsWhere, ILike } from 'typeorm'
import { Enum } from '../../../../constants'
import { AgencyFilters } from '../types'

class CampaignService
  extends BaseService<ICampaign, ICampaignCRUD>
  implements ICampaignService
{
  private static instance: ICampaignService | null = null

  private constructor(campaignCRUD: ICampaignCRUD) {
    super(campaignCRUD)
  }

  static getInstance = (campaignCRUD: ICampaignCRUD) => {
    if (CampaignService.instance === null)
      CampaignService.instance = new CampaignService(campaignCRUD)
    return CampaignService.instance
  }

  async getAllCampaigns(
    page: number,
    limit: number,
    roleId: number,
    agencyFilters?: AgencyFilters
  ): Promise<PaginatedResponse<ICampaign>> {
    try {
      let query: FindOptionsWhere<ICampaign> = {}

      if (roleId === Enum.ROLES.AGENCY) {
        query = {
          participants: {
            agencyProfile: {
              id: agencyFilters?.id,
            },
          },
        }

        if (typeof agencyFilters?.name === 'string')
          query = { ...query, name: ILike(`${agencyFilters?.name}`) }

        if (typeof agencyFilters?.paymentStatus === 'string')
          query = {
            ...query,
            participants: {
              paymentStatus: agencyFilters.paymentStatus,
            },
          }

        if (typeof agencyFilters?.platform === 'string') {
          query = {
            ...query,
            participants: {
              deliverables: {
                platform: agencyFilters.platform,
              },
            },
          }
        }
      }

      const data = await this.findAllPaginated(
        page,
        limit,
        query,
        [
          'participants',
          'participants.deliverables',
          'manager',
          'incentiveWinner',
          'participants.influencerProfile',
          'participants.agencyProfile',
        ],
        { createdAt: 'DESC' }
      )
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignService }
