import { IBaseService } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import { ShareInvoiceRequest } from '../types'
import { IPurchaseInvoiceCRUD, ISaleInvoiceCRUD } from './ICRUD'
import { IPurchaseInvoice, ISaleInvoice } from './IModels'

export interface ISaleInvoiceService
  extends IBaseService<ISaleInvoice, ISaleInvoiceCRUD> {
  getAllSaleInvoices(
    page: number,
    limit: number,
    startDate: Date,
    endDate: Date,
    invoiceNo: string
  ): Promise<PaginatedResponse<ISaleInvoice>>

  shareSaleInvoice(data: ShareInvoiceRequest): Promise<void>
  downloadSaleInvoice(id: string): Promise<string>
  downloadSaleInvoiceReport(startDate: Date, endDate: Date): Promise<string>
}

export interface IPurchaseInvoiceService
  extends IBaseService<IPurchaseInvoice, IPurchaseInvoiceCRUD> {
  getAllPurchaseInvoices(
    page: number,
    limit: number,
    startDate: Date,
    endDate: Date,
    invoiceNo: string,
    influencerProfileId?: string,
    agencyProfileId?: string
  ): Promise<PaginatedResponse<IPurchaseInvoice>>

  sharePurchaseInvoice(data: ShareInvoiceRequest): Promise<void>
  downloadPurchaseInvoice(id: string): Promise<string>
  downloadPurchaseInvoiceReport(startDate: Date, endDate: Date): Promise<string>
}
