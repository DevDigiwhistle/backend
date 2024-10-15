import { MailerService } from '../../utils'
import { campaignParticipantsService } from '../campaign'
import { PurchaseInvoiceCRUD, SaleInvoiceCRUD } from './crud'
import { PurchaseInvoice, SaleInvoice } from './models'
import { PurchaseInvoiceService, SaleInvoiceService } from './service'

const purchaseInvoiceService = PurchaseInvoiceService.getInstance(
  PurchaseInvoiceCRUD.getInstance(PurchaseInvoice),
  MailerService.getInstance(),
  campaignParticipantsService
)

const saleInvoiceService = SaleInvoiceService.getInstance(
  SaleInvoiceCRUD.getInstance(SaleInvoice),
  MailerService.getInstance()
)

export { purchaseInvoiceService, saleInvoiceService }
