import { EntityTarget } from 'typeorm'
import { CRUDBase } from '../../../../utils'
import { ICampaignParticipants, ICampaignParticipantsCRUD } from '../interface'

class CampaignParticipantsCRUD
  extends CRUDBase<ICampaignParticipants>
  implements ICampaignParticipantsCRUD
{
  private static instance: ICampaignParticipantsCRUD | null = null

  private constructor(
    campaignParticipants: EntityTarget<ICampaignParticipants>
  ) {
    super(campaignParticipants)
  }

  static getInstance = (
    campaignParticipants: EntityTarget<ICampaignParticipants>
  ) => {
    if (CampaignParticipantsCRUD.instance === null)
      CampaignParticipantsCRUD.instance = new CampaignParticipantsCRUD(
        campaignParticipants
      )
    return CampaignParticipantsCRUD.instance
  }
}

export { CampaignParticipantsCRUD }
