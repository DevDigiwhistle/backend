import { ICRUDBase } from '../../../../utils'
import {
  ICampaign,
  ICampaignDeliverables,
  ICampaignParticipants,
} from './IModel'

export interface ICampaignCRUD extends ICRUDBase<ICampaign> {}

export interface ICampaignDeliverablesCRUD
  extends ICRUDBase<ICampaignDeliverables> {}

export interface ICampaignParticipantsCRUD
  extends ICRUDBase<ICampaignParticipants> {}
