import { DeepPartial } from 'typeorm'
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
import { PaginatedResponse } from '../../../../utils/base-service'
import { AgencyFilters } from '../types'

export interface ICampaignService
  extends IBaseService<ICampaign, ICampaignCRUD> {
  getAllCampaigns(
    page: number,
    limit: number,
    roleId: number,
    agencyFilter?: AgencyFilters
  ): Promise<PaginatedResponse<ICampaign>>
}

export interface ICampaignDeliverablesService
  extends IBaseService<ICampaignDeliverables, ICampaignDeliverablesCRUD> {}

export interface ICampaignParticipantsService
  extends IBaseService<ICampaignParticipants, ICampaignParticipantsCRUD> {
  insertMany(data: DeepPartial<ICampaignParticipants>[]): Promise<void>
}
