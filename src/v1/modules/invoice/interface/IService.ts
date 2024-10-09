import { IBaseService } from '../../../../utils'
import { IPurchaseInvoiceCRUD, ISaleInvoiceCRUD } from './ICRUD'
import { IPurchaseInvoice, ISaleInvoice } from './IModels'

export interface ISaleInvoiceService
  extends IBaseService<ISaleInvoice, ISaleInvoiceCRUD> {}

export interface IPurchaseInvoiceService
  extends IBaseService<IPurchaseInvoice, IPurchaseInvoiceCRUD> {}
