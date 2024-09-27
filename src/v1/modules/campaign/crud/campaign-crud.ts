import { EntityTarget, In } from 'typeorm'
import { CRUDBase, HttpException } from '../../../../utils'
import { ICampaign, ICampaignCRUD } from '../interface'
import { Campaign } from '../models'
import { CampaignStats } from '../types'

class CampaignCRUD extends CRUDBase<ICampaign> implements ICampaignCRUD {
  private static instance: ICampaignCRUD | null = null

  private constructor(campaign: EntityTarget<ICampaign>) {
    super(campaign)
  }

  static getInstance = (campaign: EntityTarget<ICampaign>) => {
    if (CampaignCRUD.instance === null)
      CampaignCRUD.instance = new CampaignCRUD(campaign)
    return CampaignCRUD.instance
  }

  async getTotalCampaignsAndRevenue(
    lowerBound: Date,
    upperBound: Date,
    brandProfileId?: string,
    agencyProfileId?: string,
    influencerProfileId?: string
  ): Promise<CampaignStats> {
    try {
      let query = this.repository
        .createQueryBuilder('campaign')
        .select('SUM(campaign.commercial)', 'totalRevenue')
        .addSelect('COUNT(campaign.id)', 'totalCampaign')
        .where('campaign."startDate">=:lowerBound', { lowerBound: lowerBound })
        .andWhere('campaign."endDate"<=:upperBound', { upperBound: upperBound })

      if (typeof brandProfileId === 'string') {
        query = query.andWhere('campaign."brandId"=:brandId', {
          brandId: brandProfileId,
        })
      }

      if (typeof agencyProfileId === 'string') {
        query = query
          .leftJoin('campaign.participants', 'participants')
          .andWhere('participants."agencyProfileId"=:agencyProfileId', {
            agencyProfileId: agencyProfileId,
          })
      }

      if (typeof influencerProfileId === 'string') {
        query = query
          .leftJoin('campaign.participants', 'participants')
          .andWhere('participants."influencerProfileId"=:influencerProfileId', {
            influencerProfileId: influencerProfileId,
          })
      }

      const result = await query.getRawOne()

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignCRUD }
