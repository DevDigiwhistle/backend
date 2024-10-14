import { MailerService } from '../../utils'
import { PurchaseInvoiceCRUD, SaleInvoiceCRUD } from './crud'
import { PurchaseInvoice, SaleInvoice } from './models'
import { PurchaseInvoiceService, SaleInvoiceService } from './service'

const purchaseInvoiceService = PurchaseInvoiceService.getInstance(
  PurchaseInvoiceCRUD.getInstance(PurchaseInvoice),
  MailerService.getInstance()
)

const saleInvoiceService = SaleInvoiceService.getInstance(
  SaleInvoiceCRUD.getInstance(SaleInvoice),
  MailerService.getInstance()
)

export { purchaseInvoiceService, saleInvoiceService }
