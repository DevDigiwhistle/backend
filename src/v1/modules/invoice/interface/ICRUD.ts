import { ICRUDBase } from '../../../../utils'
import { IPurchaseInvoice, ISaleInvoice } from './IModels'

export interface ISaleInvoiceCRUD extends ICRUDBase<ISaleInvoice> {}
export interface IPurchaseInvoiceCRUD extends ICRUDBase<IPurchaseInvoice> {}
