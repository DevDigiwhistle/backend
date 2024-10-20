import { IPurchaseInvoice } from '../modules/invoice/interface'

export class PurchaseInvoiceDTO {
  static transformationForInfluencerAndAgency(data: IPurchaseInvoice) {
    return {
      id: data.id,
      invoiceNo: data.invoiceNo,
      campaignCode: data.campaign.code,
      campaignDuration: data.campaign.startDate + ' - ' + data.campaign.endDate,
      campaignName: data.campaign.name,
      brand: data.campaign.brand?.name,
      invoiceDate: data.invoiceDate,
      finalAmount: data.amount,
      totalAmount: data.amount,
      igst: data.igst,
      cgst: data.cgst,
      sgst: data.sgst,
      totalInvoiceAmount: data.totalAmount,
      tds: data.tds,
      amount: data.finalAmount,
      amountToBeReceived: data.amountToBeReceived,
      balanceAmount: data.balanceAmount,
      PaymentStatus: data.paymentStatus,
      paymentTerms: data.paymentTerms,
      panNo:
        data.influencerProfile === null
          ? data.agencyProfile?.panNo
          : data.influencerProfile?.panNo,
      file: data.file,
    }
  }

  static transformationForAdmin(data: IPurchaseInvoice) {
    return {
      id: data.id,
      invoiceNo: data.invoiceNo,
      campaignCode: data.campaign.code,
      campaignDuration: data.campaign.startDate + ' - ' + data.campaign.endDate,
      campaignName: data.campaign.name,
      brand: data.campaign.brand?.name,
      invoiceDate: new Date(data.invoiceDate).toDateString(),
      finalAmount: data.amount,
      totalAmount: data.amount,
      igst: data.igst,
      cgst: data.cgst,
      sgst: data.sgst,
      totalInvoiceAmount: data.totalAmount,
      tds: data.tds,
      tdsPercentage: data.tdsPercentage,
      tdsSection: data.tdsSection,
      amount: data.finalAmount,
      amountToBeReceived: data.amountToBeReceived,
      balanceAmount: data.balanceAmount,
      PaymentStatus: data.paymentStatus,
      paymentTerms: data.paymentTerms,
      category:
        data.influencerProfile === null ? 'Agency Fee' : 'Influencer Fee',
      participantName: data.influencerProfile
        ? data.influencerProfile.firstName +
          (data.influencerProfile.lastName === null
            ? ''
            : ' ' + data.influencerProfile.lastName)
        : data.agencyProfile?.name,
      panNo:
        data.influencerProfile === null
          ? data.agencyProfile?.panNo
          : data.influencerProfile?.panNo,
      file: data.file,
    }
  }
}
