import { PurchaseInvoiceCRUD, SaleInvoiceCRUD } from './crud'
import { PurchaseInvoice, SaleInvoice } from './models'
import { PurchaseInvoiceService, SaleInvoiceService } from './service'

const purchaseInvoiceService = PurchaseInvoiceService.getInstance(
  PurchaseInvoiceCRUD.getInstance(PurchaseInvoice)
)

const saleInvoiceService = SaleInvoiceService.getInstance(
  SaleInvoiceCRUD.getInstance(SaleInvoice)
)

export { purchaseInvoiceService, saleInvoiceService }
