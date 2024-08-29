import { IBaseService } from '../../../../utils'
import {
  ICampaignCRUD,
  ICampaignDeliverablesCRUD,
  ICampaignParticipantsCRUD,
} from './ICRUD'
import {
  ICampaign,
  ICampaignDeliverables,
  ICampaignParticipants,
} from './IModel'

export interface ICampaignService
  extends IBaseService<ICampaign, ICampaignCRUD> {}

export interface ICampaignDeliverablesService
  extends IBaseService<ICampaignDeliverables, ICampaignDeliverablesCRUD> {}

export interface ICampaignParticipantsService
  extends IBaseService<ICampaignParticipants, ICampaignParticipantsCRUD> {}
