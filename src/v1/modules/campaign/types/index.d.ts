import { Enum } from '../../../../constants'

export type AgencyFilters = {
  id: string
  name?: string
  paymentStatus?: Enum.CampaignPaymentStatus
  platform?: Enum.Platform
}

// type CampaignDeliverables = {
//   id: string
//   title: string
//   platform: Enum.Platform
//   status: Enum.CampaignDeliverableStatus
//   link: string | null
//   engagementRate: number | null
//   cpv: number | null
//   name: string
// }

// interface ICampaign {
//   id: string
//   name: string
//   code: string
//   brandName: string
//   startDate: Date
//   endDate: Date
//   commercial: number
//   manager: string
//   status: Enum.CampaignPaymentStatus
//   participants: Array<{
//     id: string
//     influencerProfile: {
//       firstName: string
//       lastName: string | null
//       exclusive: boolean
//     } | null
//     agencyProfile: {
//       name: string
//     } | null
//     invoice: string
//     commercialBrand: number
//     commercialCreator: number
//     toBePaid: number
//     margin: number
//     paymentStatus: string
//     invoiceStatus: string
//     deliverables: ICampaignDeliverables[]
//   }>
// }

// interface IGroupedDeliverables {
//   id: string
//   title: string
//   platform: Enum.Platform
//   status: Enum.CampaignDeliverableStatus
//   deliverableLink: string | null
//   er: number | null
//   cpv: number | null
// }

// interface IInfluencerGroup {
//   id: string
//   name: string
//   deliverables: IGroupedDeliverables[]
// }

// // Function type declarations
// declare class CampaignService {
//   private groupDeliverableByInfluencerName(
//     deliverables: ICampaignDeliverables[]
//   ): IInfluencerGroup[]

//   private campaignsAdminAndEmployeeDTO(data: ICampaign[]): Array<{
//     id: string
//     name: string
//     code: string
//     brandName: string
//     startDate: Date
//     endDate: Date
//     commercial: number
//     incentiveWinner: string
//     status: string
//     participants: Array<{
//       type: 'influencer' | 'agency'
//       id: string
//       name: string
//       invoice: string
//       commercialBrand: number
//       commercialCreator: number
//       toBeGiven: number
//       margin: number
//       paymentStatus: string
//       invoiceStatus: string
//       deliverables?: IGroupedDeliverables[]
//       influencer?: IInfluencerGroup[]
//     }>
//   }>
// }
