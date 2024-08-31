import { BaseService } from '../../../../utils'
import {
  ICampaignParticipants,
  ICampaignParticipantsCRUD,
  ICampaignParticipantsService,
} from '../interface'

class CampaignParticipantsService
  extends BaseService<ICampaignParticipants, ICampaignParticipantsCRUD>
  implements ICampaignParticipantsService
{
  private static instance: ICampaignParticipantsService | null = null

  private constructor(campaignParticipantsCRUD: ICampaignParticipantsCRUD) {
    super(campaignParticipantsCRUD)
  }

  static getInstance = (
    campaignParticipantsCRUD: ICampaignParticipantsCRUD
  ) => {
    if (CampaignParticipantsService.instance === null)
      CampaignParticipantsService.instance = new CampaignParticipantsService(
        campaignParticipantsCRUD
      )
    return CampaignParticipantsService.instance
  }
}

export { CampaignParticipantsService }
