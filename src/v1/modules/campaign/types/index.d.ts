import { Enum } from '../../../../constants'

export type AgencyFilters = {
  id: string
  name?: string
  paymentStatus?: Enum.CampaignPaymentStatus
  platform?: Enum.Platform
}
