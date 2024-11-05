import { EntityTarget } from 'typeorm'
import { CRUDBase, HttpException } from '../../../../utils'
import { ICampaign, ICampaignCRUD } from '../interface'
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
    brandProfileId?: string
  ): Promise<CampaignStats> {
    try {
      let query = this.repository
        .createQueryBuilder('campaign')
        .select('COUNT(*) as "totalCampaign"')
        .addSelect('SUM(campaign."commercial") as "totalRevenue"')
        .where('campaign."startDate" BETWEEN :lowerBound AND :upperBound', {
          lowerBound: lowerBound,
          upperBound: upperBound,
        })
        .orWhere('campaign."endDate" BETWEEN :lowerBound AND :upperBound', {
          lowerBound: lowerBound,
          upperBound: upperBound,
        })

      if (typeof brandProfileId === 'string') {
        query = query.andWhere('campaign."brandId"=:brandId', {
          brandId: brandProfileId,
        })
      }

      const result = await query.getRawOne()
      console.log(result)

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignCRUD }
