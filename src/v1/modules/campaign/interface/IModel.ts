import { Enum } from '../../../../constants'
import { IEmployeeProfile } from '../../admin/interface'
import { IAgencyProfile } from '../../brands/interface'
import { IInfluencerProfile } from '../../influencer/interface'
import { IUser } from '../../user/interface'

export interface ICampaign {
  name: string
  code: string
  brandName: string
  startDate: Date
  endDate: Date
  commercial: number
  platform: string[]
  details: string
  status: Enum.CampaignStatus
  manager: IEmployeeProfile
  incentiveWinner: IEmployeeProfile | null
  participants: ICampaignParticipants[]
  cpv: number | null
  createdAt: Date
  updatedAt: Date
}

export interface ICampaignParticipants {
  email: string
  influencerProfile: IInfluencerProfile | null
  agencyProfile: IAgencyProfile | null
  campaign: ICampaign
  deliverable: string
  platform: string
  toBePaid: number | null
  paymentStatus: string
  invoiceStatus: string | null
  margin: number | null
  deliverables: ICampaignDeliverables[]
  createdAt: Date
  updatedAt: Date
}

export interface ICampaignDeliverables {
  desc: string
  platform: string
  status: string
  link: string
  EngagementRate: number
  cpv: number
  statsUpdatedAt: Date
  createdAt: Date
  updatedAt: Date
}
