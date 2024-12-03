import { Between, EntityTarget, FindOptions, FindOptionsWhere } from 'typeorm'
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
      let query: FindOptionsWhere<ICampaign> = {
        startDate: Between(lowerBound, upperBound),
        endDate: Between(lowerBound, upperBound),
      }

      if (typeof brandProfileId === 'string') {
        query = {
          ...query,
          brand: {
            id: brandProfileId,
          },
        }
      }

      const campaigns = await this.findAll(query, ['participants'])

      const result: CampaignStats = {
        totalCampaign: campaigns.length,
        totalCommercialBrand: 0,
        totalCommercialCreator: 0,
        totalToBeGiven: 0,
        totalMargin: 0,
        totalIncentive: 0,
        pendingIncentive: 0,
        totalRevenue: 0,
      }

      campaigns.forEach((value) => {
        result.totalCommercialBrand += value.commercial
        result.totalRevenue += value.commercial
        let totalBePaid = 0
        value.participants.forEach((participant) => {
          result.totalCommercialCreator +=
            participant.commercialCreator === null
              ? 0
              : participant.commercialCreator
          ;(result.totalToBeGiven +=
            participant.toBePaid === null ? 0 : participant.toBePaid),
            (result.totalMargin +=
              participant.margin === null ? 0 : participant.margin)
          totalBePaid +=
            participant.toBePaid === null ? 0 : participant.toBePaid
        })
        result.totalIncentive += totalBePaid * 0.05
        if (value.incentiveReleased === true) {
          result.pendingIncentive += totalBePaid * 0.05
        }
      })

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignCRUD }
