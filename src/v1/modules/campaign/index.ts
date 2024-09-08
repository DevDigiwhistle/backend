import {
  CampaignCRUD,
  CampaignDeliverablesCRUD,
  CampaignParticipantsCRUD,
} from './crud'
import { Campaign, CampaignDeliverables, CampaignParticipants } from './models'
import { CampaignDeliverablesService } from './services/campaign-deliverable-service'
import { CampaignParticipantsService } from './services/campaign-participants-service'
import { CampaignService } from './services/campaign-service'

const campaignService = CampaignService.getInstance(
  CampaignCRUD.getInstance(Campaign)
)

const campaignDeliverablesService = CampaignDeliverablesService.getInstance(
  CampaignDeliverablesCRUD.getInstance(CampaignDeliverables)
)

const campaignParticipantsService = CampaignParticipantsService.getInstance(
  CampaignParticipantsCRUD.getInstance(CampaignParticipants)
)

export {
  campaignService,
  campaignDeliverablesService,
  campaignParticipantsService,
}
