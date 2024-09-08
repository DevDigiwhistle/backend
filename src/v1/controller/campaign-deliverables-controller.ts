import { BaseController } from '../../utils'
import {
  ICampaignDeliverables,
  ICampaignDeliverablesCRUD,
  ICampaignDeliverablesService,
} from '../modules/campaign/interface'

class CampaignDeliverablesController extends BaseController<
  ICampaignDeliverables,
  ICampaignDeliverablesCRUD,
  ICampaignDeliverablesService
> {
  constructor(service: ICampaignDeliverablesService) {
    super(service)
  }
}

export { CampaignDeliverablesController }
