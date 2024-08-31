import { BaseService } from '../../../../utils'
import { ICampaign, ICampaignCRUD, ICampaignService } from '../interface'

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
}

export { CampaignService }
