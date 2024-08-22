import { Enum } from '../../../../constants'
import { IEmployeeProfile } from '../../admin/interface'
import { IInfluencerProfile } from '../../influencer/interface'
import { IUser } from '../../user/interface'

export interface ICampaign {
  name: string
  code: string
  brandName: string
  startDate: Date
  endDate: Date
  revenue: number
  platform: string
  details: string
  status: Enum.CampaignStatus
  manager: IEmployeeProfile
  incentiveWinner: IEmployeeProfile | null
  participants: ICampaignParticipants[]
  cpv: number | null
}

export interface ICampaignParticipants {
  email: string
  profile: IInfluencerProfile
  campaign: ICampaign
  deliverable: string
  platform: string
  toBePaid: number
  margin: number
  invoiceNo: string | null
  deliverableLink: string | null
  cpv: number | null
  status: Enum.CampaignParticipantStatus
}
