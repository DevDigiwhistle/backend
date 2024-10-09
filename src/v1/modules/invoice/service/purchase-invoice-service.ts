import { BaseService } from '../../../../utils'
import {
  IPurchaseInvoice,
  IPurchaseInvoiceCRUD,
  IPurchaseInvoiceService,
} from '../interface'

export class PurchaseInvoiceService
  extends BaseService<IPurchaseInvoice, IPurchaseInvoiceCRUD>
  implements IPurchaseInvoiceService
{
  private static instance: IPurchaseInvoiceService | null = null

  static getInstance = (purchaseInvoiceCRUD: IPurchaseInvoiceCRUD) => {
    if (PurchaseInvoiceService.instance === null) {
      PurchaseInvoiceService.instance = new PurchaseInvoiceService(
        purchaseInvoiceCRUD
      )
    }
    return PurchaseInvoiceService.instance
  }

  private constructor(purchaseInvoiceCRUD: IPurchaseInvoiceCRUD) {
    super(purchaseInvoiceCRUD)
  }
}
