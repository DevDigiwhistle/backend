import { BaseService } from '../../../../utils'
import {
  ISaleInvoice,
  ISaleInvoiceCRUD,
  ISaleInvoiceService,
} from '../interface'

export class SaleInvoiceService
  extends BaseService<ISaleInvoice, ISaleInvoiceCRUD>
  implements ISaleInvoiceService
{
  private static instance: ISaleInvoiceService | null = null

  static getInstance = (saleInvoiceCRUD: ISaleInvoiceCRUD) => {
    if (SaleInvoiceService.instance === null) {
      SaleInvoiceService.instance = new SaleInvoiceService(saleInvoiceCRUD)
    }
    return SaleInvoiceService.instance
  }

  private constructor(saleInvoiceCRUD: ISaleInvoiceCRUD) {
    super(saleInvoiceCRUD)
  }
}
