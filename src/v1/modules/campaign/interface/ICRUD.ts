import { DeepPartial } from 'typeorm'
import { ICRUDBase } from '../../../../utils'
import {
  ICampaign,
  ICampaignDeliverables,
  ICampaignParticipants,
} from './IModel'
import { CampaignStats } from '../types'

export interface ICampaignCRUD extends ICRUDBase<ICampaign> {
  getTotalCampaignsAndRevenue(
    lowerBound: Date,
    upperBound: Date,
    brandProfileId?: string,
    agencyProfileId?: string
  ): Promise<CampaignStats>
}

export interface ICampaignDeliverablesCRUD
  extends ICRUDBase<ICampaignDeliverables> {
  insertMany(data: DeepPartial<ICampaignDeliverables>[]): Promise<void>
}

export interface ICampaignParticipantsCRUD
  extends ICRUDBase<ICampaignParticipants> {
  insertMany(data: DeepPartial<ICampaignParticipants>[]): Promise<void>
}
