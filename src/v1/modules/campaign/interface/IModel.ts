import { Enum } from '../../../../constants'
import { IEmployeeProfile } from '../../admin/interface'
import { IAgencyProfile } from '../../brands/interface'
import { IInfluencerProfile } from '../../influencer/interface'

export interface ICampaign {
  id: string
  name: string
  code: string
  brandName: string
  startDate: Date
  endDate: Date
  commercial: number
  platform: string[]
  details: string | null
  invoiceNo: string | null
  status: Enum.CampaignStatus
  manager: IEmployeeProfile
  incentiveWinner: IEmployeeProfile | null
  participants: ICampaignParticipants[]
  cpv: number | null
  createdAt: Date
  updatedAt: Date
}

export interface ICampaignParticipants {
  id: string
  email: string
  influencerProfile: IInfluencerProfile | null
  agencyProfile: IAgencyProfile | null
  campaign: ICampaign
  toBePaid: number | null
  paymentStatus: Enum.CampaignPaymentStatus
  invoiceStatus: Enum.CampaignInvoiceStatus
  margin: number | null
  deliverables: ICampaignDeliverables[]
  createdAt: Date
  updatedAt: Date
}

export interface ICampaignDeliverables {
  id: string
  name: string
  desc: string
  platform: Enum.Platform
  status: Enum.CampaignDeliverableStatus
  link: string | null
  EngagementRate: number | null
  cpv: number | null
  campaignParticipant: ICampaignParticipants
  statsUpdatedAt: Date
  createdAt: Date
  updatedAt: Date
}
