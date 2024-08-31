import { BaseService } from '../../../../utils'
import {
  ICampaignDeliverables,
  ICampaignDeliverablesCRUD,
  ICampaignDeliverablesService,
} from '../interface'

class CampaignDeliverablesService
  extends BaseService<ICampaignDeliverables, ICampaignDeliverablesCRUD>
  implements ICampaignDeliverablesService
{
  private static instance: ICampaignDeliverablesService | null = null

  private constructor(campaignDeliverableCRUD: ICampaignDeliverablesCRUD) {
    super(campaignDeliverableCRUD)
  }

  static getInstance = (campaignDeliverableCRUD: ICampaignDeliverablesCRUD) => {
    if (CampaignDeliverablesService.instance === null)
      CampaignDeliverablesService.instance = new CampaignDeliverablesService(
        campaignDeliverableCRUD
      )
    return CampaignDeliverablesService.instance
  }
}

export { CampaignDeliverablesService }
