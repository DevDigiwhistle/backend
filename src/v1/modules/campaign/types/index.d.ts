import { Enum } from '../../../../constants'

export type AgencyFilters = {
  id: string
  paymentStatus?: Enum.CampaignPaymentStatus
  platform?: Enum.Platform
}

export type AdminFilters = {
  paymentStatus?: Enum.CampaignPaymentStatus
  influencerType?: string
}

export type BrandFilters = {
  paymentStatus?: Enum.CampaignPaymentStatus
  campaignStatus?: Enum.CampaignDeliverableStatus
  platform?: Enum.Platform
  brand: string
}

export type InfluencerFilters = {
  id: string
  paymentStatus?: Enum.CampaignPaymentStatus
  platform?: Enum.Platform
}

export type CampaignStats = {
  totalRevenue: number
  totalCampaign: string
}

export interface IInfluencerDTO {
  id: string
  type: string
  name: string
  exclusive: boolean
  commercialBrand: number
  commercialCreator: number
  toBeGiven: number
  margin: number
  paymentStatus: Enum.CampaignPaymentStatus
  invoiceStatus: Enum.CampaignInvoiceStatus
  invoice: string | null
  deliverables: [
    {
      id: string
      title: string
      platform: Enum.Platform
      campaignStatus: Enum.CampaignDeliverableStatus
      deliverableLink: string
      er: number | null
      cpv: number | null
      desc: string | null
    },
  ]
}

export interface IAgencyDTO {
  id: string
  type: string
  name: string
  commercialBrand: number
  commercialCreator: number
  toBeGiven: number
  margin: number
  paymentStatus: Enum.CampaignPaymentStatus
  invoiceStatus: Enum.CampaignInvoiceStatus
  invoice: string | null
  influencer: [
    {
      name: string
      deliverables: [
        {
          id: string
          title: string
          platform: Enum.Platform
          campaignStatus: Enum.CampaignDeliverableStatus
          deliverableLink: string
          er: number | null
          cpv: number | null
          desc: string | null
        },
      ]
    },
  ]
}

export interface ICampaignDTO {
  id: string
  name: string
  code: string
  brandName: string
  brand: string
  startDate: Date
  endDate: Date
  commercial: number
  incentiveWinner: string
  status: string
  participants: Array<IInfluencerDTO | IAgencyDTO>
}
