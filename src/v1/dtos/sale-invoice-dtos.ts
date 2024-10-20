import { Enum } from '../../constants'
import {
  ICampaignDeliverables,
  ICampaignParticipants,
} from '../modules/campaign/interface'
import { ISaleInvoice } from '../modules/invoice/interface'

export class SaleInvoiceDTO {
  private static groupDeliverablesByInfluencerName(
    participant: ICampaignParticipants
  ) {
    const deliverables = participant.deliverables
    const mp: Map<string, ICampaignDeliverables[]> = new Map()

    deliverables.map((value) => {
      const data = mp.get(value.name)
      if (data === undefined) {
        mp.set(value.name, [value])
      } else mp.set(value.name, [...data, value])
    })

    const _data: Array<{
      name: string
      deliverables: Array<{
        id: string
        name: string
        desc: string | null
        platform: Enum.Platform
        status: Enum.CampaignDeliverableStatus
      }>
    }> = []

    for (const [key, value] of mp) {
      _data.push({
        name: key,
        deliverables: value.map((deliverable) => {
          return {
            id: deliverable.id,
            name: deliverable.name,
            desc: deliverable.desc,
            platform: deliverable.platform,
            status: deliverable.status,
          }
        }),
      })
    }

    return _data
  }
  static transformationForSaleInvoice(saleInvoice: ISaleInvoice) {
    const participants = saleInvoice.campaign.participants
    const _deliverables: Array<{
      name: string
      deliverables: Array<{
        id: string
        name: string
        desc: string | null
        platform: Enum.Platform
        status: Enum.CampaignDeliverableStatus
      }>
    }> = []

    participants.forEach((participant) => {
      if (participant.influencerProfile !== null) {
        _deliverables.push({
          name:
            participant.influencerProfile.firstName +
            (participant.influencerProfile.lastName !== null
              ? ' ' + participant.influencerProfile.lastName
              : ''),
          deliverables: participant.deliverables.map((deliverable) => {
            return {
              id: deliverable.id,
              name: deliverable.name,
              desc: deliverable.desc,
              platform: deliverable.platform,
              status: deliverable.status,
            }
          }),
        })
      } else {
        const value = this.groupDeliverablesByInfluencerName(participant)
        _deliverables.push(...value)
      }
    })

    return {
      id: saleInvoice.id,
      invoiceNumber: saleInvoice.invoiceNo,
      issueDate: saleInvoice.invoiceDate,
      amount: saleInvoice.total,
      taxableAmount: saleInvoice.amount,
      status: saleInvoice.paymentStatus,
      month: saleInvoice.month,
      gstTin: saleInvoice.gstTin,
      tds: saleInvoice.tds,
      balance: saleInvoice.balanceAmount,
      received: saleInvoice.received,
      brandName: saleInvoice.campaign.brand?.name,
      code: saleInvoice.campaign.code,
      name: saleInvoice.campaign.name,
      campaignDuration:
        saleInvoice.campaign.startDate + ' - ' + saleInvoice.campaign.endDate,
      sgst: saleInvoice.sgst,
      cgst: saleInvoice.cgst,
      igst: saleInvoice.igst,
      total: saleInvoice.total,
      deliverables: _deliverables,
    }
  }
}
