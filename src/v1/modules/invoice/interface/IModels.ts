import { Enum } from '../../../../constants'
import { IAgencyProfile } from '../../brands/interface'
import { ICampaign } from '../../campaign/interface'
import { IInfluencerProfile } from '../../influencer/interface'

export interface ISaleInvoice {
  id: string
  campaign: ICampaign
  gstTin: string
  invoiceNo: string
  invoiceDate: Date
  amount: number
  sgst: number
  cgst: number
  igst: number
  total: number
  tds: number
  received: number
  balanceAmount: number
  month: string
  paymentStatus: Enum.InvoiceStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface IPurchaseInvoice {
  id: string
  campaign: ICampaign
  invoiceNo: string
  pan: string
  amount: number
  igst: number
  cgst: number
  sgst: number
  totalAmount: number
  tds: number
  finalAmount: number
  amountToBeReceived: number
  paymentTerms: string
  paymentStatus: Enum.InvoiceStatus
  file?: string | null
  influencerProfile?: IInfluencerProfile | null
  agencyProfile?: IAgencyProfile | null
  createdAt?: Date
  updatedAt?: Date
}
